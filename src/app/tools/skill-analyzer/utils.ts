/**
 * 비동기 작업을 병렬로 실행하되, 동시 실행 개수를 제한하는 유틸리티 함수입니다.
 * @template T 입력 아이템의 타입
 * @template U 결과 아이템의 타입
 * @param {T[]} items - 비동기 작업을 적용할 아이템 배열
 * @param {number} limit - 최대 동시 실행 개수
 * @param {(item: T, index: number) => Promise<U | undefined>} worker - 각 아이템에 적용할 비동기 작업 함수
 * @returns {Promise<(U | undefined)[]>} - 작업 결과를 담은 배열을 반환하는 Promise
 */
export async function mapPool<T, U>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<U | undefined>,
): Promise<(U | undefined)[]> {
  const results: (U | undefined)[] = new Array(items.length);
  let nextIndex = 0;
  async function run() {
    while (true) {
      const i = nextIndex++;
      if (i >= items.length) return;
      try {
        results[i] = await worker(items[i], i);
      } catch (e) {
        results[i] = undefined;
      }
    }
  }
  const workers = Array.from({ length: Math.min(limit, items.length) }, () =>
    run(),
  );
  await Promise.all(workers);
  return results;
}

/**
 * 캐릭터 이름을 정규화하여 캐시 키로 사용 가능한 문자열을 생성합니다.
 * @param {string} s - 정규화할 캐릭터 이름
 * @returns {string} - 정규화된 문자열
 */
export function cacheKeyFromName(s: string): string {
  if (!s) return s;
  try {
    return s.trim().normalize('NFC');
  } catch {
    return s.trim();
  }
}

/**
 * 문자열에서 HTML 태그와 엔티티를 제거하고, 여러 공백을 하나로 합칩니다.
 * @param {*} s - 정리할 문자열
 * @returns {string} - 정리된 문자열
 */
export function cleanText(s: any): string {
  if (typeof s !== 'string') return s;
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[^;]+;/g, (match) => {
      const entities: { [key: string]: string } = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&nbsp;': ' ',
      };
      return entities[match] || match;
    })
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 문자열을 소문자로 변환하고 모든 공백을 제거하여 정규화합니다.
 * @param {*} s - 정규화할 문자열
 * @returns {string} - 정규화된 문자열
 */
export function norm(s: any): string {
  if (typeof s !== 'string') return s;
  return s.toLowerCase().replace(/\s+/g, '');
}

/**
 * 객체나 배열에 포함된 모든 문자열 값에 대해 `cleanText` 함수를 재귀적으로 적용합니다.
 * @param {*} obj - HTML을 정리할 객체 또는 배열
 * @returns {*} - 모든 문자열이 정리된 새로운 객체 또는 배열
 */
export function deepCleanHtml(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(deepCleanHtml);
  }
  if (obj && typeof obj === 'object') {
    const result: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = deepCleanHtml(value);
    }
    return result;
  }
  if (typeof obj === 'string') {
    return cleanText(obj);
  }
  return obj;
}

/**
 * 캐릭터의 전투정보실 데이터에서 아크 그리드 슬롯 이름들을 추출하여 Set으로 반환합니다.
 * @param {*} armory - 캐릭터의 전투정보실 데이터 객체
 * @returns {Set<string>} - 정규화된 아크 그리드 슬롯 이름 Set
 */
export function extractArkgridSlotNameSet(armory: any): Set<string> {
  const set = new Set<string>();
  if (!armory || !armory.ArkGrid || !Array.isArray(armory.ArkGrid.Slots))
    return set;
  for (const slot of armory.ArkGrid.Slots) {
    if (slot && typeof slot.Name === 'string') set.add(norm(slot.Name));
  }
  return set;
}

/**
 * 캐릭터가 실제로 사용하는 스킬(레벨 1 초과)의 이름들을 집계하여 Set으로 반환합니다.
 * @param {any[]} skillsClean - 정리된 스킬 정보 배열
 * @returns {Set<string>} - 사용된 스킬 이름 Set
 */
export function aggregateSkillUsageByCharacter(
  skillsClean: any[],
): Set<string> {
  const used = new Set<string>();
  if (!Array.isArray(skillsClean)) return used;
  for (const item of skillsClean) {
    if (
      typeof item.Name === 'string' &&
      typeof item.Level === 'number' &&
      item.Level > 1
    ) {
      used.add(cleanText(item.Name));
    }
  }
  return used;
}

/**
 * 옵션 객체를 툴팁 문자열로 변환합니다.
 * - 존재하는 키를 숫자 오름차순으로 정렬하여 "[키P] 설명" 포맷으로 나열합니다.
 */
export function buildCoreTooltip(
  optionObj: Record<string, string> | undefined,
): string {
  if (!optionObj) return '';
  const orderedKeys = Object.keys(optionObj).sort(
    (a, b) => Number(a) - Number(b),
  );
  const lines = orderedKeys
    .map((k) =>
      optionObj[k]
        ? `<span style="color: var(--accent-11)">[${k}P]</span> ${optionObj[k]}`
        : undefined,
    )
    .filter((v): v is string => Boolean(v));
  return lines.join('\n');
}
