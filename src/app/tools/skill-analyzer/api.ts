import { getCachedArmory, setCachedArmory } from './cache';
import { cacheKeyFromName, mapPool } from './utils';
import type { ApiCallbacks, TokenInfo } from './types';

// Constants
const KLOA_BASE = 'https://api.korlark.com';
const RANKING_PATH = '/lostark/ranking/combat-power';
const LA_BASE = 'https://developer-lostark.game.onstove.com';
const LA_FILTERS = 'combat-skills+arkgrid';
const TIMEOUT = 8000;
export const CONCURRENCY_RANK = 4;
export const CONCURRENCY_ARMORY = 8;

// Lost Ark API Token Pool (per-token 100 req/min) ====
const MAX_PER_MIN = 100;
const TOKEN_WINDOW_MS = 60_000;

const ENV_TOKENS = (process.env.NEXT_PUBLIC_LOA_TOKENS ?? '')
  .split(',')
  .map((t) => t.trim())
  .filter(Boolean);

const TOKENS: string[] = ENV_TOKENS;

const tokenPool: TokenInfo[] = TOKENS.map((t) => ({
  token: t,
  used: 0,
  windowStart: 0,
}));

let quotaWaitPromise: Promise<void> | null = null;

/**
 * 토큰 사용량을 기록하는 시간대(window)를 갱신합니다.
 * @param now 현재 타임스탬프 (Date.now())
 */
function refreshWindows(now: number) {
  for (const info of tokenPool) {
    if (now - info.windowStart >= TOKEN_WINDOW_MS) {
      info.windowStart = now;
      info.used = 0;
    }
  }
}

/**
 * 모든 토큰의 사용량 한도가 초기화될 때까지 남은 시간 중 가장 짧은 시간을 밀리초(ms) 단위로 반환합니다.
 * @param now 현재 타임스탬프 (Date.now())
 * @returns 초기화까지 남은 시간 (ms)
 */
function earliestResetMs(now: number): number {
  if (tokenPool.length === 0) return TOKEN_WINDOW_MS;
  return Math.min(
    ...tokenPool.map((i) => Math.max(0, i.windowStart + TOKEN_WINDOW_MS - now)),
  );
}

/**
 * 사용 가능한 API 토큰을 토큰 풀에서 획득합니다.
 * 모든 토큰이 사용 중일 경우, 가장 빨리 초기화될 때까지 대기한 후 다시 시도합니다.
 * @param callbacks UI 피드백을 위한 콜백 함수 객체
 * @returns 사용 가능한 토큰 정보를 담은 Promise
 */
async function acquireTokenInfo(callbacks: ApiCallbacks): Promise<TokenInfo> {
  if (tokenPool.length === 0) {
    throw new Error(
      '공식 API 토큰이 설정되지 않았습니다. NEXT_PUBLIC_LOA_TOKENS 환경변수 또는 TOKENS 배열을 설정하세요.',
    );
  }
  const now = Date.now();
  refreshWindows(now);
  const candidate = tokenPool.find((t) => t.used < MAX_PER_MIN);
  if (candidate) {
    if (candidate.windowStart === 0) candidate.windowStart = now;
    candidate.used += 1; // 예약
    return candidate;
  }

  if (!quotaWaitPromise) {
    const waitMs = earliestResetMs(now) + 10;
    const totalSec = 60;
    quotaWaitPromise = new Promise<void>((resolve) => {
      try {
        callbacks.startQuotaStatus(totalSec);
        let elapsed = 0;
        const interval = setInterval(() => {
          elapsed += 5;
          const shown = Math.min(elapsed, totalSec);
          callbacks.updateQuotaStatus(shown, totalSec);
        }, 5000);
        setTimeout(() => {
          clearInterval(interval);
          resolve();
        }, waitMs);
      } catch {
        resolve();
      }
    }).finally(() => {
      callbacks.endQuotaStatus();
      quotaWaitPromise = null;
    });
  }
  await quotaWaitPromise;
  return acquireTokenInfo(callbacks);
}

/**
 * 인증 헤더를 포함하여 Lost Ark API에 요청을 보냅니다.
 * 429(Too Many Requests) 에러 발생 시, 다른 토큰으로 재시도하는 로직을 포함합니다.
 * @param url 요청을 보낼 URL
 * @param callbacks UI 피드백을 위한 콜백 함수 객체
 * @param options Fetch API에 전달할 추가 옵션
 * @param retries 재시도 횟수
 * @returns Fetch API의 Response 객체를 담은 Promise
 */
async function authorizedFetch(
  url: string,
  callbacks: ApiCallbacks,
  options: RequestInit = {},
  retries = 3,
): Promise<Response> {
  const tokenInfo = await acquireTokenInfo(callbacks);
  const controller = new AbortController();
  const extSignal = options.signal as AbortSignal | undefined;
  const onAbort = () => controller.abort();
  extSignal?.addEventListener('abort', onAbort);
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const headers = {
      accept: 'application/json',
      ...(options.headers || {}),
      authorization: `bearer ${tokenInfo.token}`,
    } as HeadersInit;

    const metaLabel = (options as any)?.metaLabel as string | undefined;
    if (metaLabel) {
      callbacks.log(`[API] ${metaLabel}님의 정보를 조회합니다.`);
    }

    const res = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
      mode: 'cors',
    });

    clearTimeout(timeoutId);
    extSignal?.removeEventListener('abort', onAbort);

    if (res.ok) return res;

    let bodyText = '';
    try {
      bodyText = await res.clone().text();
    } catch {}

    const textLower = bodyText.toLowerCase();
    const quotaHit =
      res.status === 429 ||
      textLower.includes('the quota has been exceeded') ||
      textLower.includes('quota exceeded') ||
      textLower.includes('rate limit');

    if ((quotaHit || res.status === 403 || res.status === 401) && retries > 0) {
      tokenInfo.used = Math.max(tokenInfo.used, MAX_PER_MIN);
      return authorizedFetch(url, callbacks, options, retries - 1);
    }

    return res;
  } catch (e) {
    clearTimeout(timeoutId);
    extSignal?.removeEventListener('abort', onAbort);
    throw e;
  }
}

/**
 * 특정 직업 및 각인의 전투력 순위 내 캐릭터 이름 목록을 조회합니다.
 * @param startRank 조회 시작 순위
 * @param endRank 조회 종료 순위
 * @param job 직업 코드
 * @param enlightenmentTree 각인 이름
 * @param callbacks UI 피드백을 위한 콜백 함수 객체
 * @returns 캐릭터 이름 배열을 담은 Promise
 */
export async function fetchRankNames(
  startRank: number,
  endRank: number,
  job: string,
  enlightenmentTree: string,
  callbacks: ApiCallbacks,
): Promise<string[]> {
  if (startRank < 1 || endRank < startRank) return [];
  const limit = 50;
  const firstPage = Math.floor((startRank - 1) / limit) + 1;
  const lastPage = Math.floor((endRank - 1) / limit) + 1;
  const pages = Array.from(
    { length: lastPage - firstPage + 1 },
    (_, i) => firstPage + i,
  );

  const pageResults = await mapPool<number, string[]>(
    pages,
    CONCURRENCY_RANK,
    async (page) => {
      const params = new URLSearchParams({
        job,
        enlightenment_tree: enlightenmentTree,
        limit: limit.toString(),
        page: page.toString(),
      });
      const url = `${KLOA_BASE}${RANKING_PATH}?${params}`;
      callbacks.log(`랭킹 데이터 요청: ${url}`);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
        const response = await fetch(url, {
          signal: controller.signal,
          mode: 'cors',
          headers: { Accept: 'application/json' },
        });
        clearTimeout(timeoutId);
        if (!response.ok)
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        const data = await response.json();
        callbacks.log(`랭킹 데이터 수신(page=${page}): ${data.length}개 항목`);
        const local: string[] = [];
        data.forEach((row: any) => {
          if (row.name) local.push(cacheKeyFromName(row.name));
        });
        return local;
      } catch (error: any) {
        if (error.name === 'AbortError') {
          callbacks.log(`랭킹 데이터 요청 시간초과: ${url}`, 'error');
          throw new Error(
            '요청 시간이 초과되었습니다. 네트워크 상태를 확인해주세요.',
          );
        } else if (error.message?.includes?.('CORS')) {
          callbacks.log(`CORS 에러: ${error.message}`, 'error');
          throw new Error(
            'CORS 정책으로 인해 API 요청이 차단되었습니다. 브라우저 확장 프로그램을 비활성화하거나 다른 브라우저를 시도해보세요.',
          );
        } else {
          callbacks.log(`랭킹 데이터 요청 실패: ${error.message}`, 'error');
          return [];
        }
      }
    },
  );

  const merged = ([] as string[]).concat(
    ...(pageResults.filter(Boolean) as string[][]),
  );
  return merged.slice(startRank - 1, endRank);
}

/**
 * 특정 캐릭터의 전투 장비, 스킬, 아크 그리드 정보를 조회합니다.
 * 조회 전 캐시를 먼저 확인하고, 캐시된 데이터가 없으면 API를 호출합니다.
 * @param name 조회할 캐릭터 이름
 * @param callbacks UI 피드백을 위한 콜백 함수 객체
 * @returns 캐릭터 정보를 담은 Promise
 */
export async function fetchArmories(
  name: string,
  callbacks: ApiCallbacks,
): Promise<any> {
  const cacheKey = cacheKeyFromName(name);
  const cached = await getCachedArmory(cacheKey);
  if (cached) {
    callbacks.log(`[캐시:IndexedDB] ${name}님의 정보를 사용합니다.`);
    return cached;
  }

  const encName = encodeURIComponent(name);
  const url = `${LA_BASE}/armories/characters/${encName}?filters=${LA_FILTERS}`;

  try {
    const response = await authorizedFetch(url, callbacks, {
      metaLabel: name,
    } as any);
    if (!response.ok)
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    const data = await response.json();
    callbacks.log(`캐릭터 데이터 수신: ${name}`);
    const slim = { ArmorySkills: data.ArmorySkills, ArkGrid: data.ArkGrid };
    await setCachedArmory(cacheKey, slim);
    return slim;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      callbacks.log(`캐릭터 데이터 요청 시간초과: ${name}`, 'error');
      throw new Error(`요청 시간이 초과되었습니다: ${name}`);
    } else if (error.message?.includes?.('CORS')) {
      callbacks.log(`CORS 에러: ${name} - ${error.message}`, 'error');
      throw new Error(`CORS 정책으로 인해 API 요청이 차단되었습니다: ${name}`);
    } else {
      callbacks.log(
        `캐릭터 데이터 요청 실패: ${name} - ${error.message}`,
        'error',
      );
      throw error;
    }
  }
}
