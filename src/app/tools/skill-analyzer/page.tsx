'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SectionHeader, CoreCategorySelector, StatCard } from './components';
import { fetchRankNames, fetchArmories, CONCURRENCY_ARMORY } from './api';
import {
  aggregateSkillUsageByCharacter,
  deepCleanHtml,
  extractArkgridSlotNameSet,
  extractSelectedRows,
  mapPool,
  norm,
} from './utils';
import type {
  AnalysisResult,
  ApiCallbacks,
  PreparedCharacterData,
  ProgressState,
  TripodTableRow,
} from './types';
import { JOB_DATA } from '../../../config/jobData';
import type { EnlightenmentTree } from '../../../config/jobData';

const ANALYSIS_STEPS = 4;

/**
 * 로스트아크 전투력 랭킹을 기반으로 스킬 및 트라이포드 사용 통계를 분석하는 페이지 컴포넌트입니다.
 */
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
  const [preparedData, setPreparedData] = useState<PreparedCharacterData[]>([]);
  const [totalRanked, setTotalRanked] = useState<number>(0);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const [quotaBanner, setQuotaBanner] = useState<{
    active: boolean;
    shown: number;
    total: number;
  }>({ active: false, shown: 0, total: 60 });

  const [enlightenmentOptions, setEnlightenmentOptions] = useState<
    EnlightenmentTree[]
  >([]);
  const [coreOptions, setCoreOptions] = useState<string[]>([]);
  const [coreOptionsByCategory, setCoreOptionsByCategory] = useState<{
    sun: string[];
    moon: string[];
    star: string[];
  }>({ sun: [], moon: [], star: [] });
  const [selectedCoresByCategory, setSelectedCoresByCategory] = useState<{
    sun?: string;
    moon?: string;
    star?: string;
  }>({});
  const logBoxRef = useRef<HTMLDivElement | null>(null);

  // 분석 과정을 기록하고 화면에 표시하기 위한 로그 함수
  const log = useCallback(
    (message: string, type: 'info' | 'error' = 'info') => {
      const time = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev, `[${time}] ${message}`]);
      if (type === 'error') console.error(message);
    },
    [],
  );

  // API 모듈에 전달하여 UI 상태(로딩, 쿼터 대기 등)를 업데이트하기 위한 콜백 함수 객체
  const apiCallbacks: ApiCallbacks = useMemo(
    () => ({
      log,
      startQuotaStatus: (totalSec: number) => {
        setQuotaBanner({ active: true, shown: 0, total: totalSec });
      },
      updateQuotaStatus: (shownSec: number, totalSec: number) => {
        setQuotaBanner({ active: true, shown: shownSec, total: totalSec });
      },
      endQuotaStatus: () => {
        setQuotaBanner((prev) => ({ ...prev, active: false }));
      },
    }),
    [log],
  );

  // 로그가 추가될 때마다 로그 박스를 맨 아래로 스크롤합니다.
  useEffect(() => {
    const el = logBoxRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [logs]);

  // 직업 변경 시, 선택된 코어 및 관련 옵션을 초기화하는 함수
  const resetCoreSelection = useCallback(() => {
    setCoreOptionsByCategory({ sun: [], moon: [], star: [] });
    setCoreOptions([]);
    setSelectedCoresByCategory({});
    setRequiredCores([]);
  }, []);

  // 직업(job) 선택이 변경되면 해당 직업의 각인 목록을 설정합니다.
  useEffect(() => {
    const selectedJobData = JOB_DATA.find((j) => j.code.toString() === job);
    if (selectedJobData) {
      setEnlightenmentOptions(selectedJobData.enlightenmentTree);
      setEnlightenmentTree('');
      resetCoreSelection();
    } else {
      setEnlightenmentOptions([]);
      resetCoreSelection();
    }
  }, [job, resetCoreSelection]);

  // 직업 각인(enlightenmentTree) 선택이 변경되면 해당 각인의 코어 목록을 설정합니다.
  useEffect(() => {
    const selectedTreeData = enlightenmentOptions.find(
      (t) => t.name === enlightenmentTree,
    );
    if (selectedTreeData && (selectedTreeData as any).arkgrid) {
      const grid = (selectedTreeData as any).arkgrid as {
        sun?: { name: string }[];
        moon?: { name: string }[];
        star?: { name: string }[];
      };
      const sun = grid.sun?.map((c) => c.name) ?? [];
      const moon = grid.moon?.map((c) => c.name) ?? [];
      const star = grid.star?.map((c) => c.name) ?? [];
      setCoreOptionsByCategory({ sun, moon, star });
      setCoreOptions([...sun, ...moon, ...star]);
      setRequiredCores([]);
      setSelectedCoresByCategory({});
    } else {
      resetCoreSelection();
    }
  }, [enlightenmentTree, enlightenmentOptions, resetCoreSelection]);

  /**
   * 코어 선택 버튼을 토글(선택/해제)하는 함수입니다.
   * @param {string} core - 선택된 코어의 이름
   */
  const toggleCore = (core: string) => {
    const category = coreOptionsByCategory.sun.includes(core)
      ? 'sun'
      : coreOptionsByCategory.moon.includes(core)
        ? 'moon'
        : 'star';
    setSelectedCoresByCategory((prev) => ({
      ...prev,
      [category]:
        prev[category as 'sun' | 'moon' | 'star'] === core ? undefined : core,
    }));
  };

  // 사용자가 선택한 카테고리별 코어를 하나의 배열로 통합합니다.
  useEffect(() => {
    const list = [
      selectedCoresByCategory.sun,
      selectedCoresByCategory.moon,
      selectedCoresByCategory.star,
    ].filter(Boolean) as string[];
    setRequiredCores(list);
  }, [selectedCoresByCategory]);

  // 새로운 분석 시작 시, 이전 상태(로그, 진행률, 결과 등)를 모두 초기화하는 함수
  const resetAnalysisState = useCallback(() => {
    setLogs(['데이터 수집을 시작합니다...']);
    setProgress({ current: 0, total: 100, message: '' });
    setSelectedCoresByCategory({});
    setRequiredCores([]);
    setPreparedData([]);
    setResults(null);
  }, []);

  /**
   * 캐릭터 이름 목록을 받아, 각 캐릭터의 상세 정보를 API로 조회하고 분석에 필요한 형태로 가공합니다.
   * @param {string[]} names - 캐릭터 이름 배열
   * @param {number} startRank - 분석 시작 순위 (로그 표기용)
   * @returns {Promise<PreparedCharacterData[]>} - 가공된 캐릭터 데이터 배열을 담은 Promise
   */
  const fetchAndPrepareCharacterData = useCallback(
    async (names: string[], startRank: number) => {
      const prepared: PreparedCharacterData[] = [];
      let completed = 0;

      const results = await mapPool<
        string,
        (PreparedCharacterData & { rank: number }) | undefined
      >(names, CONCURRENCY_ARMORY, async (name, i) => {
        const rank = startRank + i;
        try {
          const armory = await fetchArmories(name, apiCallbacks);
          if (!armory) {
            log(`[실패] ${name}님의 정보를 가져오지 못했습니다.`);
            return undefined;
          }
          const skillsClean = deepCleanHtml(armory.ArmorySkills || []);
          const rows = extractSelectedRows(name, skillsClean);
          const usedSkills = aggregateSkillUsageByCharacter(skillsClean);
          const arkgridSet = extractArkgridSlotNameSet(armory);
          return { name, rows, usedSkills, arkgridSet, rank };
        } catch (error: any) {
          log(
            `[오류] ${rank.toString().padStart(2, '0')}. ${name} - 실패: ${error.message}`,
            'error',
          );
          return undefined;
        } finally {
          completed += 1;
          setProgress({
            current: completed,
            total: names.length,
            message: `캐릭터 데이터 수집 중... (${completed}/${names.length})`,
          });
        }
      });

      for (const item of results) {
        if (item) {
          prepared.push({
            name: item.name,
            rows: item.rows,
            usedSkills: item.usedSkills,
            arkgridSet: item.arkgridSet,
          });
          log(
            `[완료] ${String(item.rank).padStart(2, '0')}. ${item.name} - ${item.rows.length}개의 트라이포드 추출`,
          );
        }
      }

      return prepared;
    },
    [apiCallbacks, log],
  );

  // 폼 제출 시 실행되는 메인 로직: 랭커 목록 조회 > 캐릭터별 상세 정보 조회의 순서로 데이터를 수집합니다.
  const acquireRankAndCharacters = useCallback(
    async (
      startRank: number,
      endRankNum: number,
      jobCode: string,
      treeName: string,
    ) => {
      log(
        `설정: 직업=${jobCode}, 각성트리=${treeName}, 랭크=${startRank}-${endRankNum}`,
      );
      setProgress({
        current: 0,
        total: ANALYSIS_STEPS,
        message: '랭킹 데이터 수집 중...',
      });
      const names = await fetchRankNames(
        startRank,
        endRankNum,
        jobCode,
        treeName,
        apiCallbacks,
      );
      setTotalRanked(names.length);
      log(`랭킹 데이터 수집 완료: ${names.length}명`);

      setProgress({
        current: 1,
        total: ANALYSIS_STEPS,
        message: '캐릭터 데이터 수집 중...',
      });
      log('캐릭터 데이터 수집을 시작합니다...');
      const prepared = await fetchAndPrepareCharacterData(names, startRank);

      setProgress({
        current: 3,
        total: ANALYSIS_STEPS,
        message: '결과 준비 중...',
      });
      setPreparedData(prepared);
      setProgress({ current: 4, total: ANALYSIS_STEPS, message: '완료' });
    },
    [apiCallbacks, log, fetchAndPrepareCharacterData],
  );

  // 사용자가 '검색 시작' 버튼을 눌렀을 때 폼 제출을 처리하는 이벤트 핸들러입니다.
  const handleFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!job || !enlightenmentTree) {
        alert('직업과 직업 각인를 모두 선택해주세요.');
        return;
      }

      setIsAnalyzing(true);
      resetAnalysisState();
      try {
        await acquireRankAndCharacters(
          1,
          parseInt(endRank),
          job,
          enlightenmentTree,
        );
        log(
          '검색 데이터 수집이 완료되었습니다. 조건을 선택하면 통계를 즉시 갱신합니다.',
        );
      } catch (error: any) {
        log(`검색 중 오류 발생: ${error.message}`, 'error');
        alert(`검색 중 오류가 발생했습니다: ${error.message}`);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [
      job,
      enlightenmentTree,
      endRank,
      resetAnalysisState,
      acquireRankAndCharacters,
      log,
    ],
  );

  // 준비된 데이터(preparedData)나 필요 코어(requiredCores)가 변경될 때마다 실시간으로 통계 결과를 필터링하고 계산합니다.
  useEffect(() => {
    if (!preparedData || preparedData.length === 0) {
      setResults(null);
      return;
    }
    if (requiredCores.length === 0) {
      setResults(null);
      return;
    }
    const normalizedCores = new Set(requiredCores.map(norm));
    const kept: string[] = [];
    const allRows: TripodTableRow[] = [];
    const skillUsageCounter = new Map<string, number>();

    for (const entry of preparedData) {
      const hasAll = Array.from(normalizedCores).every((core) =>
        Array.from(entry.arkgridSet).some((s: string) => s.includes(core)),
      );
      if (!hasAll) continue;
      kept.push(entry.name);
      allRows.push(...entry.rows);
      entry.usedSkills.forEach((skill: string) => {
        skillUsageCounter.set(skill, (skillUsageCounter.get(skill) || 0) + 1);
      });
    }

    const skillUsageRows = Array.from(skillUsageCounter.entries())
      .map(([skillName, characters]) => ({ skill_name: skillName, characters }))
      .sort((a, b) => b.characters - a.characters);

    setResults({
      allRows,
      skillUsageRows,
      keptCharacters: kept,
      totalCharacters: totalRanked,
    });
  }, [requiredCores, preparedData, totalRanked]);

  // 최종 분석 결과를 캐릭터별, 스킬별로 그룹화하여 상세 테이블에 표시하기 쉽게 가공합니다.
  const groupedTripodData = useMemo(() => {
    if (!results) return {};
    return results.allRows.reduce((acc, row) => {
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
  }, [results]);

  const coresEnabled = preparedData.length > 0;
  const isWaiting = quotaBanner.active;
  const waitingPct = isWaiting
    ? Math.min(
        100,
        Math.round((quotaBanner.shown / Math.max(1, quotaBanner.total)) * 100),
      )
    : 0;
  const buttonLabel = isWaiting
    ? `토큰 대기 중(${waitingPct}%)`
    : isAnalyzing
      ? '검색 중...'
      : '검색 시작';

  return (
    <div className="flex w-full flex-col gap-y-4 rounded-lg bg-[var(--gray-3)] p-5">
      <form
        onSubmit={handleFormSubmit}
        className="block w-full flex-row border-b border-[var(--gray-5)] pb-3 md:flex"
      >
        <SectionHeader
          title="검색 정보 입력"
          description="직업, 각인, 대상 수 등을 설정합니다."
        />
        <div className="flex w-full flex-wrap items-end gap-4 md:w-9/12">
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
              className="w-auto rounded border border-[var(--gray-4)] px-3 py-1.5 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300"
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
              직업 각인
            </label>
            <select
              id="enlightenmentTree"
              value={enlightenmentTree}
              onChange={(e) => setEnlightenmentTree(e.target.value)}
              required
              disabled={!job}
              className="w-auto rounded border border-[var(--gray-4)] px-3 py-1.5 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300 disabled:bg-[var(--gray-1)]"
            >
              <option value="">직업을 먼저 선택하세요</option>
              {enlightenmentOptions.map((tree) => (
                <option key={tree.name} value={tree.name}>
                  {tree.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="endRank"
              className="mb-2 block text-sm text-[var(--gray-11)]"
            >
              분석 대상
            </label>
            <select
              id="endRank"
              value={endRank}
              onChange={(e) => setEndRank(e.target.value)}
              required
              className="w-auto rounded border border-[var(--gray-4)] px-3 py-1.5 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300"
            >
              <option value="10">상위 10명</option>
              <option value="30">상위 30명</option>
              <option value="50">상위 50명</option>
              <option value="100">상위 100명</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isAnalyzing || isWaiting}
              className={`${
                isWaiting
                  ? 'h-9 w-auto animate-pulse cursor-wait rounded border border-[var(--accent-10)] bg-[var(--accent-10)] px-6 text-white transition-all'
                  : 'h-9 w-auto rounded border border-[var(--gray-8)] px-6 text-[var(--gray-12)] transition-all active:bg-[var(--accent-6)]'
              } disabled:cursor-not-allowed disabled:bg-[var(--gray-5)]`}
              aria-live="polite"
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      </form>

      {(isAnalyzing || preparedData.length > 0) && (
        <>
          <div className="block w-full flex-row pb-3 pt-3 md:flex">
            <SectionHeader
              title="조건 상세"
              description="사용 코어를 선택해 조건을 세부 설정합니다."
            />
            <div className="w-full md:w-9/12">
              <div className="inline-flex w-fit max-w-full flex-col gap-3 self-start md:w-auto">
                {coreOptions.length > 0 ? (
                  <>
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                      <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
                        <CoreCategorySelector
                          title="질서의 해 코어"
                          category="sun"
                          cores={coreOptionsByCategory.sun}
                          selectedCore={selectedCoresByCategory.sun}
                          onToggle={toggleCore}
                          disabled={!coresEnabled}
                        />
                        <CoreCategorySelector
                          title="질서의 달 코어"
                          category="moon"
                          cores={coreOptionsByCategory.moon}
                          selectedCore={selectedCoresByCategory.moon}
                          onToggle={toggleCore}
                          disabled={!coresEnabled}
                        />
                        <CoreCategorySelector
                          title="질서의 별 코어"
                          category="star"
                          cores={coreOptionsByCategory.star}
                          selectedCore={selectedCoresByCategory.star}
                          onToggle={toggleCore}
                          disabled={!coresEnabled}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <span className="text-sm text-[var(--gray-9)]">
                    직업 각인를 선택하면 코어가 표시됩니다.
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}

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
                    className={`flex h-10 cursor-pointer items-center text-sm text-[var(--gray-11)] hover:bg-[var(--gray-4)] ${
                      selectedSkill === row.skill_name
                        ? 'bg-[var(--accent-6)]'
                        : ''
                    }`}
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
                        <div className="flex w-1/5 items-center justify-center border-r border-[var(--gray-4)] p-2 text-sm font-bold md:text-base">
                          <a
                            href={`https://kloa.gg/characters/${encodeURIComponent(character)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-600 underline decoration-from-font underline-offset-2 transition-colors hover:text-sky-700 hover:underline dark:text-sky-400 dark:hover:text-sky-300"
                          >
                            {character}
                          </a>
                        </div>
                        <div className="w-4/5">
                          {skillEntries.map(
                            ([skillName, skillData]: [string, any], index) => (
                              <div
                                key={skillName}
                                className={`flex min-h-10 items-center ${
                                  index < skillEntries.length - 1
                                    ? 'border-b border-[var(--gray-4)]'
                                    : ''
                                } ${
                                  selectedSkill === skillName
                                    ? 'bg-[var(--accent-6)]'
                                    : ''
                                }`}
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
            <div
              ref={logBoxRef}
              className="max-h-60 overflow-y-auto rounded-lg bg-[var(--gray-1)] p-4 font-mono text-xs text-[var(--gray-11)]"
            >
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
