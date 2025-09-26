'use client';

import { useCallback, useEffect, useState } from 'react';

// Constants
const KLOA_BASE = 'https://api.korlark.com';
const RANKING_PATH = '/lostark/ranking/combat-power';
const LA_BASE = 'https://developer-lostark.game.onstove.com';
const JWT_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDA1NjkyODUifQ.hh54P6GUsGwp9hk_coxKFZfDVkEuJKFlsBRh2HeQ7kZvr_bkKCRLWsTGa_lj9CEni0rHQDy1rXe9omuAKpOFUowvQPhUxt53y0-j06PS5Y3i0JAW_q1q6sx7KqJU3ewB4WOCR4qcgNUeM_M_AjgIZajiYPsaKWRrEuF-I4SLY0L2DblvIw6SPVFMv5talP-gvnd3sfKizqCCSusVemtYB5RJ3xq_Ot5Qt3mVHfHhm9y3YHHtPoLZz3iEZpnN2GbihbHLpdeU6hOTm_wBUX7_ns-eOyWcuzN7nIr-p8A7qgjP9tETgRuStDW04fmJpPF6zmW2rxXqh-reP2zPLrlzGA';
const LA_FILTERS = 'combat-skills+arkgrid';
const TIMEOUT = 8000;
const SLEEP_BETWEEN = 250;

import { JOB_DATA } from '../../../config/jobData';

import { EnlightenmentTree } from '../../../config/jobData';

interface AnalysisResult {
  allRows: any[];
  skillUsageRows: any[];
  keptCharacters: string[];
  totalCharacters: number;
}

interface ProgressState {
  current: number;
  total: number;
  message: string;
}

// Utility functions
function cleanText(s: any): string {
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

function norm(s: any): string {
  if (typeof s !== 'string') return s;
  return s.toLowerCase().replace(/\s+/g, '');
}

function deepCleanHtml(obj: any): any {
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

// Section Header Component
const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex w-full flex-col pb-4 md:w-3/12 md:gap-y-3 md:pb-0 md:pr-8">
    <div className="text-[var(--gray-12)]">{title}</div>
    <div className="text-sm text-[var(--gray-9)]">{description}</div>
  </div>
);

// Main Component
export default function SkillAnalyzer() {
  const [job, setJob] = useState('');
  const [enlightenmentTree, setEnlightenmentTree] = useState('');
  const [endRank, setEndRank] = useState('10');
  const [requiredCores, setRequiredCores] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState<ProgressState>({
    current: 0,
    total: 0,
    message: '',
  });
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const [enlightenmentOptions, setEnlightenmentOptions] = useState<
    EnlightenmentTree[]
  >([]);
  const [coreOptions, setCoreOptions] = useState<string[]>([]);

  const log = useCallback(
    (message: string, type: 'info' | 'error' = 'info') => {
      const time = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev, `[${time}] ${message}`]);
      if (type === 'error') console.error(message);
      else console.log(message);
    },
    [],
  );

  useEffect(() => {
    const selectedJobData = JOB_DATA.find((j) => j.code.toString() === job);
    if (selectedJobData) {
      setEnlightenmentOptions(selectedJobData.enlightenmentTree);
      setEnlightenmentTree('');
      setCoreOptions([]);
      setRequiredCores([]);
    } else {
      setEnlightenmentOptions([]);
      setCoreOptions([]);
    }
  }, [job]);

  useEffect(() => {
    const selectedTreeData = enlightenmentOptions.find(
      (t) => t.name === enlightenmentTree,
    );
    if (selectedTreeData) {
      setCoreOptions(selectedTreeData.arkgrid);
      setRequiredCores([]);
    } else {
      setCoreOptions([]);
    }
  }, [enlightenmentTree, enlightenmentOptions]);

  const toggleCore = (core: string) => {
    setRequiredCores((prev) =>
      prev.includes(core) ? prev.filter((c) => c !== core) : [...prev, core],
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job || !enlightenmentTree) {
      alert('직업과 각성 트리를 모두 선택해주세요.');
      return;
    }
    if (requiredCores.length === 0) {
      alert('하나 이상의 사용 코어를 선택해주세요.');
      return;
    }

    setIsAnalyzing(true);
    setLogs(['분석을 시작합니다...']);
    setResults(null);
    setProgress({ current: 0, total: 100, message: '' });

    try {
      await runAnalysis(
        1,
        parseInt(endRank),
        job,
        enlightenmentTree,
        requiredCores,
      );
      log('분석이 완료되었습니다!');
    } catch (error: any) {
      log(`분석 중 오류 발생: ${error.message}`, 'error');
      alert(`분석 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  async function runAnalysis(
    startRank: number,
    endRank: number,
    job: string,
    enlightenmentTree: string,
    requiredCores: string[],
  ) {
    log(
      `설정: 직업=${job}, 각성트리=${enlightenmentTree}, 랭크=${startRank}-${endRank}, 필수코어=${requiredCores.join(', ')}`,
    );
    const normalizedCores = new Set(requiredCores.map(norm));

    setProgress({ current: 0, total: 4, message: '랭킹 데이터 수집 중...' });
    log('실제 API를 사용하여 랭킹 데이터를 수집합니다.');
    const names = await fetchRankNames(
      startRank,
      endRank,
      job,
      enlightenmentTree,
    );
    log(`랭킹 데이터 수집 완료: ${names.length}명`);

    setProgress({ current: 1, total: 4, message: '캐릭터 데이터 수집 중...' });
    log('캐릭터 데이터 수집을 시작합니다...');
    const { kept, allRows, skillUsageCounter } =
      await fetchAndFilterCharacterData(names, startRank, normalizedCores);

    setProgress({ current: 2, total: 4, message: '결과 처리 중...' });
    const skillUsageRows = Array.from(skillUsageCounter.entries())
      .map(([skillName, characters]) => ({ skill_name: skillName, characters }))
      .sort((a, b) => b.characters - a.characters);
    log(
      `캐릭터 데이터 수집 완료: 필터 통과 ${kept.length}명 / 총 추출 행 ${allRows.length}개 / 스킬 집계 ${skillUsageRows.length}개`,
    );

    setProgress({ current: 3, total: 4, message: '결과 표시 중...' });
    setResults({
      allRows,
      skillUsageRows,
      keptCharacters: kept,
      totalCharacters: names.length,
    });
    setProgress({ current: 4, total: 4, message: '완료' });
  }

  async function fetchRankNames(
    startRank: number,
    endRank: number,
    job: string,
    enlightenmentTree: string,
  ): Promise<string[]> {
    if (startRank < 1 || endRank < startRank) return [];
    const names: string[] = [];
    const limit = 50;
    const firstPage = Math.floor((startRank - 1) / limit) + 1;
    const lastPage = Math.floor((endRank - 1) / limit) + 1;

    for (let page = firstPage; page <= lastPage; page++) {
      const params = new URLSearchParams({
        job,
        enlightenment_tree: enlightenmentTree,
        limit: limit.toString(),
        page: page.toString(),
      });
      const url = `${KLOA_BASE}${RANKING_PATH}?${params}`;
      console.log(`랭킹 데이터 요청: ${url}`);
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
        console.log(`랭킹 데이터 수신: ${data.length}개 항목`);
        data.forEach((row: any) => {
          if (row.name) names.push(row.name);
        });
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log(`랭킹 데이터 요청 시간초과: ${url}`);
          throw new Error(
            '요청 시간이 초과되었습니다. 네트워크 상태를 확인해주세요.',
          );
        } else if (error.message.includes('CORS')) {
          console.log(`CORS 에러: ${error.message}`);
          throw new Error(
            'CORS 정책으로 인해 API 요청이 차단되었습니다. 브라우저 확장 프로그램을 비활성화하거나 다른 브라우저를 시도해보세요.',
          );
        } else {
          console.log(`랭킹 데이터 요청 실패: ${error.message}`);
          throw error;
        }
      }
    }
    return names.slice(startRank - 1, endRank);
  }

  async function fetchArmories(name: string): Promise<any> {
    const headers = {
      accept: 'application/json',
      authorization: `bearer ${JWT_TOKEN}`,
    };
    const encName = encodeURIComponent(name);
    const url = `${LA_BASE}/armories/characters/${encName}?filters=${LA_FILTERS}`;
    console.log(`캐릭터 데이터 요청: ${name}`);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
      const response = await fetch(url, {
        headers,
        signal: controller.signal,
        mode: 'cors',
      });
      clearTimeout(timeoutId);
      if (!response.ok)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      console.log(`캐릭터 데이터 수신: ${name}`);
      return data;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log(`캐릭터 데이터 요청 시간초과: ${name}`);
        throw new Error(`요청 시간이 초과되었습니다: ${name}`);
      } else if (error.message.includes('CORS')) {
        console.log(`CORS 에러: ${name} - ${error.message}`);
        throw new Error(
          `CORS 정책으로 인해 API 요청이 차단되었습니다: ${name}`,
        );
      } else {
        console.log(`캐릭터 데이터 요청 실패: ${name} - ${error.message}`);
        throw error;
      }
    }
  }

  function hasCoresInArkGridSlots(
    armory: any,
    normalizedCores: Set<string>,
  ): boolean {
    if (!armory || !armory.ArkGrid || !armory.ArkGrid.Slots) return false;
    const foundCores = new Set<string>();
    for (const slot of armory.ArkGrid.Slots) {
      if (!slot || typeof slot.Name !== 'string') continue;
      const slotNameNorm = norm(slot.Name);
      for (const coreNorm of Array.from(normalizedCores)) {
        // Changed to Array.from()
        if (slotNameNorm.includes(coreNorm)) foundCores.add(coreNorm);
      }
    }
    return foundCores.size === normalizedCores.size;
  }

  function extractSelectedRows(character: string, skillsClean: any[]): any[] {
    const rows: any[] = [];
    if (!Array.isArray(skillsClean)) return rows;
    for (const item of skillsClean) {
      try {
        const level = item.Level || 0;
        if (typeof level !== 'number' || level <= 1) continue;
        const skillName = cleanText(item.Name || '');
        const rune = item.Rune || {};
        const runeName = cleanText(rune.Name || '');
        const tripods = item.Tripods || [];
        for (const tp of tripods) {
          if (tp?.IsSelected) {
            rows.push({
              character,
              skill_name: skillName,
              skill_level: level,
              tripod_tier: tp.Tier,
              tripod_name: cleanText(tp.Name || ''),
              rune_name: runeName,
            });
          }
        }
      } catch (error: any) {
        console.log(`트라이포드 추출 중 오류: ${error.message}`);
      }
    }
    return rows;
  }

  function aggregateSkillUsageByCharacter(skillsClean: any[]): Set<string> {
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

  async function fetchAndFilterCharacterData(
    names: string[],
    startRank: number,
    normalizedCores: Set<string>,
  ) {
    const kept: string[] = [];
    const allRows: any[] = [];
    const skillUsageCounter = new Map<string, number>();
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const rank = startRank + i;
      try {
        const armory = await fetchArmories(name);
        if (!hasCoresInArkGridSlots(armory, normalizedCores)) {
          console.log(
            `[SKIP] ${rank.toString().padStart(2, '0')}. ${name} - ArkGrid Slots에 사용 코어 미포함`,
          );
          continue;
        }
        kept.push(name);
        const skillsClean = deepCleanHtml(armory.ArmorySkills || []);
        const rows = extractSelectedRows(name, skillsClean);
        const usedSkills = aggregateSkillUsageByCharacter(skillsClean);
        usedSkills.forEach((skillName) =>
          skillUsageCounter.set(
            skillName,
            (skillUsageCounter.get(skillName) || 0) + 1,
          ),
        );
        allRows.push(...rows);
        console.log(
          `[OK] ${rank.toString().padStart(2, '0')}. ${name} - 추출행 ${rows.length}`,
        );
      } catch (error: any) {
        console.log(
          `[WARN] ${rank.toString().padStart(2, '0')}. ${name} - 실패: ${error.message}`,
        );
      } finally {
        setProgress({
          current: i + 1,
          total: names.length,
          message: `캐릭터 데이터 수집 중... (${i + 1}/${names.length})`,
        });
        await new Promise((resolve) => setTimeout(resolve, SLEEP_BETWEEN));
      }
    }
    return { kept, allRows, skillUsageCounter };
  }

  const groupedTripodData = results?.allRows.reduce((acc, row) => {
    const charKey = row.character;
    const skillKey = row.skill_name;
    if (!acc[charKey]) acc[charKey] = {};
    if (!acc[charKey][skillKey]) {
      acc[charKey][skillKey] = {
        skill_level: row.skill_level,
        rune_name: row.rune_name,
        tripods: [],
      };
    }
    if (row.tripod_name)
      acc[charKey][skillKey].tripods.push({
        tier: row.tripod_tier,
        name: row.tripod_name,
      });
    return acc;
  }, {} as any);

  return (
    <div className="flex w-full flex-col gap-y-4 rounded-lg bg-[var(--gray-3)] p-5">
      {/* Input Section */}
      <form
        onSubmit={handleFormSubmit}
        className="block w-full flex-row border-b border-[var(--gray-5)] pb-3 md:flex"
      >
        <SectionHeader
          title="분석 정보 입력"
          description="직업, 각성 트리, 사용 코어 등 분석에 필요한 정보를 입력합니다."
        />
        <div className="flex w-full flex-col gap-y-4 md:w-9/12">
          <div className="flex flex-col gap-4 md:flex-row">
            <div>
              <label
                htmlFor="job"
                className="mb-2 block text-sm text-[var(--gray-11)]"
              >
                직업 선택
              </label>
              <select
                id="job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                required
                className="rounded border border-[var(--gray-4)] px-3 py-1.5 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300"
              >
                <option value="">직업을 선택하세요</option>
                {JOB_DATA.map((j) => (
                  <option key={j.code} value={j.code}>
                    {j.class}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="enlightenmentTree"
                className="mb-2 block text-sm text-[var(--gray-11)]"
              >
                각성 트리
              </label>
              <select
                id="enlightenmentTree"
                value={enlightenmentTree}
                onChange={(e) => setEnlightenmentTree(e.target.value)}
                required
                disabled={!job}
                className="rounded border border-[var(--gray-4)] px-3 py-1.5 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300 disabled:bg-[var(--gray-1)]"
              >
                <option value="">직업을 먼저 선택하세요</option>
                {enlightenmentOptions.map((tree) => (
                  <option key={tree.name} value={tree.name}>
                    {tree.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm text-[var(--gray-11)]">
              사용 코어 (다중 선택)
            </label>
            <div className="inline-flex max-w-full flex-wrap gap-2 rounded-md border border-dashed border-[var(--gray-8)] p-3">
              {coreOptions.length > 0 ? (
                coreOptions.map((core) => (
                  <button
                    key={core}
                    type="button"
                    onClick={() => toggleCore(core)}
                    className={`rounded-full border px-3 py-1 text-xs transition-all ${requiredCores.includes(core) ? 'border-[var(--accent-10)] bg-[var(--accent-9)] text-white' : 'border-[var(--gray-6)] bg-[var(--gray-1)] text-[var(--gray-11)] hover:bg-[var(--gray-4)]'}`}
                  >
                    {core}
                  </button>
                ))
              ) : (
                <span className="text-sm text-[var(--gray-9)]">
                  각성 트리를 선택하면 코어가 표시됩니다.
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-4 md:flex-row">
            <div>
              <label
                htmlFor="endRank"
                className="mb-2 block text-sm text-[var(--gray-11)]"
              >
                분석할 상위 랭커 수
              </label>
              <select
                id="endRank"
                value={endRank}
                onChange={(e) => setEndRank(e.target.value)}
                required
                className="rounded border border-[var(--gray-4)] px-3 py-1.5 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300"
              >
                <option value="10">상위 10명</option>
                <option value="30">상위 30명</option>
                <option value="50">상위 50명</option>
                <option value="100">상위 100명</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isAnalyzing}
              className="h-9 rounded border border-[var(--gray-8)] px-6 text-[var(--gray-12)] transition-all active:bg-[var(--accent-6)] disabled:cursor-not-allowed disabled:bg-[var(--gray-5)]"
            >
              {isAnalyzing ? '분석 중...' : '분석 시작'}
            </button>
          </div>
        </div>
      </form>

      {isAnalyzing && (
        <div className="my-4 rounded-lg bg-[var(--gray-2)] p-4">
          <div className="mb-2 text-sm text-[var(--gray-11)]">
            {progress.message}
          </div>
          <div className="h-2 w-full rounded-full bg-[var(--gray-5)]">
            <div
              className="h-2 rounded-full bg-[var(--accent-9)] transition-all duration-500"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {results && (
        <>
          <div className="block w-full flex-row border-b border-[var(--gray-5)] pb-3 md:flex">
            <SectionHeader
              title="분석 결과 요약"
              description="분석된 데이터의 주요 통계입니다."
            />
            <div className="grid w-full grid-cols-2 gap-4 md:w-9/12 md:grid-cols-4">
              <StatCard
                label="분석대상 캐릭터"
                value={results.totalCharacters}
              />
              <StatCard
                label="조건 부합 캐릭터"
                value={results.keptCharacters.length}
              />
              <StatCard
                label="추출된 트라이포드"
                value={results.allRows.length}
              />
              <StatCard
                label="고유 스킬"
                value={results.skillUsageRows.length}
              />
            </div>
          </div>

          <div className="block w-full flex-row border-b border-[var(--gray-5)] pb-3 md:flex">
            <SectionHeader
              title="스킬 사용 통계"
              description="랭커들의 스킬 채용률입니다."
            />
            <div className="w-full md:w-9/12">
              <div className="w-full rounded-lg border border-dashed border-[var(--gray-8)] p-3">
                <div className="flex border-b border-[var(--gray-5)] pb-3 text-sm text-[var(--gray-11)]">
                  <div className="flex-1 text-center">스킬명</div>
                  <div className="flex-1 text-center">사용 캐릭터 수</div>
                  <div className="flex-1 text-center">사용률</div>
                </div>
                {results.skillUsageRows.map((row) => (
                  <div
                    key={row.skill_name}
                    onClick={() => setSelectedSkill(row.skill_name)}
                    className={`flex h-10 cursor-pointer items-center text-sm text-[var(--gray-11)] hover:bg-[var(--gray-4)] ${selectedSkill === row.skill_name ? 'bg-[var(--accent-3)]' : ''}`}
                  >
                    <div className="flex-1 text-center font-medium">
                      {row.skill_name}
                    </div>
                    <div className="flex-1 text-center">{row.characters}</div>
                    <div className="flex-1 text-center">
                      {results.keptCharacters.length > 0
                        ? Math.round(
                            (row.characters / results.keptCharacters.length) *
                              100,
                          )
                        : 0}
                      %
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="block w-full flex-row pb-3 md:flex">
            <SectionHeader
              title="캐릭터 스킬 상세"
              description="캐릭터별 스킬, 레벨, 트라이포드, 룬 정보입니다."
            />
            <div className="w-full md:w-9/12">
              <div className="w-full rounded-lg border border-dashed border-[var(--gray-8)] p-3">
                <div className="flex border-b border-[var(--gray-5)] pb-3 text-xs font-semibold text-[var(--gray-11)]">
                  <div className="w-1/5 text-center">캐릭터</div>
                  <div className="flex w-4/5">
                    <div className="w-3/12 text-center">스킬명</div>
                    <div className="w-2/12 text-center">레벨</div>
                    <div className="w-5/12 text-center">트라이포드</div>
                    <div className="w-2/12 text-center">룬</div>
                  </div>
                </div>
                {Object.entries(groupedTripodData).map(
                  ([character, skills]: [string, any]) => {
                    const skillEntries = Object.entries(skills);
                    return (
                      <div
                        key={character}
                        className={`flex border-b border-[var(--gray-4)] text-xs text-[var(--gray-11)] last:border-b-0`}
                      >
                        <div className="flex w-1/5 items-center justify-center border-r border-[var(--gray-4)] p-2 font-bold">
                          {character}
                        </div>
                        <div className="w-4/5">
                          {skillEntries.map(
                            ([skillName, skillData]: [string, any], index) => (
                              <div
                                key={skillName}
                                className={`flex min-h-10 items-center ${index < skillEntries.length - 1 ? 'border-b border-[var(--gray-4)]' : ''} ${selectedSkill === skillName ? 'bg-[var(--accent-3)]' : ''}`}
                              >
                                <div className="w-3/12 p-2 text-center">
                                  {skillName}
                                </div>
                                <div className="w-2/12 p-2 text-center">
                                  {skillData.skill_level}
                                </div>
                                <div className="w-5/12 p-2 text-center text-xs">
                                  {skillData.tripods
                                    ?.map(
                                      (t: any) =>
                                        `${(t.tier ?? 0) + 1}T-${t.name || ''}`,
                                    )
                                    .join(' / ') || '-'}
                                </div>
                                <div className="w-2/12 p-2 text-center">
                                  {skillData.rune_name || '-'}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {logs.length > 1 && (
        <div className="block w-full flex-row border-t border-[var(--gray-5)] pt-3 md:flex">
          <SectionHeader
            title="분석 로그"
            description="API 요청 및 데이터 처리 과정의 로그입니다."
          />
          <div className="w-full md:w-9/12">
            <div className="max-h-60 overflow-y-auto rounded-lg bg-[var(--gray-1)] p-4 font-mono text-xs text-[var(--gray-11)]">
              {logs.map((logMsg, i) => (
                <div key={i}>{logMsg}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-[var(--gray-5)] bg-[var(--gray-1)] p-4">
    <div className="text-2xl font-bold text-[var(--accent-10)]">{value}</div>
    <div className="mt-1 text-xs text-[var(--gray-11)]">{label}</div>
  </div>
);
