/**
 * @file Skill Analyzer 페이지의 메인 로직을 담당하는 파일입니다.
 * 이 파일은 다음과 같은 주요 기능들을 포함합니다:
 * - 상태 관리: 직업, 각인, 전투력 등 사용자 입력과 분석 결과, 로그 등 모든 상태를 관리합니다.
 * - 데이터 페칭: 로스트아크 API 또는 IndexedDB 캐시에서 캐릭터 데이터를 가져옵니다.
 * - 데이터 처리: 가져온 데이터를 분석에 적합한 형태로 가공하고, 필터링 및 통계 계산을 수행합니다.
 * - 렌더링: 하위 컴포넌트(검색 폼, 필터, 결과, 로그)에 필요한 데이터와 핸들러를 전달하여 UI를 렌더링합니다.
 */
'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchRankNames, fetchArmories, CONCURRENCY_ARMORY } from './api';
import { idbGetAllArmories } from './cache';
import { mapPool, norm, buildCoreTooltip } from './utils';
import type {
  AnalysisResult,
  ApiCallbacks,
  PreparedCharacterData,
  ProgressState,
  TripodTableRow,
  CoreMeta,
} from './types';
import { useTestMode } from '../../hooks/test-mode-context';
import { JOB_DATA } from '../../../config/jobData';
import type { EnlightenmentTree } from '../../../config/jobData';
import React from 'react';
import { prepareCharacterDataFromArmory } from './services/prepare-character';
import { AnalysisLogs } from './sections/AnalysisLogs';
import { SearchFilters } from './sections/SearchFilters';
import { SearchForm } from './sections/SearchForm';
import { AnalysisResults } from './sections/AnalysisResults';

// === Constants ==============================================================

const ANALYSIS_STEPS = 4;

// === Page Component (default export) =========================================
/**
 * 로스트아크 전투력 랭킹을 기반으로 스킬 및 트라이포드 사용 통계를 분석하는 페이지 컴포넌트입니다.
 * 모든 상태 관리와 핵심 로직 실행을 담당하며, 하위 UI 컴포넌트를 조립합니다.
 */
export default function SkillAnalyzer() {
  const [job, setJob] = useState('');
  const [enlightenmentTree, setEnlightenmentTree] = useState('');
  const [endRank, setEndRank] = useState('10');
  const [minCombatPower, setMinCombatPower] = useState('0');
  const [maxCombatPower, setMaxCombatPower] = useState('9999');
  const [requiredCores, setRequiredCores] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { isTestMode } = useTestMode();
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
    sun: CoreMeta[];
    moon: CoreMeta[];
    star: CoreMeta[];
  }>({ sun: [], moon: [], star: [] });
  const [selectedCoresByCategory, setSelectedCoresByCategory] = useState<{
    sun?: string;
    moon?: string;
    star?: string;
  }>({});
  const logBoxRef = useRef<HTMLDivElement | null>(null);

  // --- Logging & API Callback Wiring -----------------------------------------

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

  // --- Effects (UI housekeeping) ---------------------------------------------
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
        sun?: { name: string; option?: Record<string, string> }[];
        moon?: { name: string; option?: Record<string, string> }[];
        star?: { name: string; option?: Record<string, string> }[];
      };
      const sun: CoreMeta[] =
        grid.sun?.map((c) => ({
          name: c.name,
          tooltip: buildCoreTooltip(c.option),
        })) ?? [];
      const moon: CoreMeta[] =
        grid.moon?.map((c) => ({
          name: c.name,
          tooltip: buildCoreTooltip(c.option),
        })) ?? [];
      const star: CoreMeta[] =
        grid.star?.map((c) => ({
          name: c.name,
          tooltip: buildCoreTooltip(c.option),
        })) ?? [];
      setCoreOptionsByCategory({ sun, moon, star });
      setCoreOptions([...sun, ...moon, ...star].map((c) => c.name));
      setRequiredCores([]);
      setSelectedCoresByCategory({});
    } else {
      resetCoreSelection();
    }
  }, [enlightenmentTree, enlightenmentOptions, resetCoreSelection]);

  /**
   * 코어 선택 버튼을 토글(선택/해제)하는 함수입니다.
   * @param core 선택할 코어 이름
   */
  const toggleCore = (core: string) => {
    const inSun = coreOptionsByCategory.sun.some((c) => c.name === core);
    const inMoon = coreOptionsByCategory.moon.some((c) => c.name === core);
    const category: 'sun' | 'moon' | 'star' = inSun
      ? 'sun'
      : inMoon
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
  /**
   * 캐릭터 이름 목록을 받아, 각 캐릭터의 상세 정보를 API로 조회하고 분석에 필요한 형태로 가공합니다.
   */
  const fetchAndPrepareCharacterData = useCallback(
    async (names: string[], startRank: number) => {
      let completed = 0;

      const characterData = await mapPool<
        string,
        (PreparedCharacterData & { rank: number }) | undefined
      >(names, CONCURRENCY_ARMORY, async (name, i) => {
        const rank = startRank + i;
        try {
          const armory = await fetchArmories(name, apiCallbacks);
          const prepared = prepareCharacterDataFromArmory(name, armory);
          if (prepared.rows.length === 0) {
            log(`[실패] ${name}님의 정보를 가져오지 못했습니다.`);
            return undefined;
          }
          return { ...prepared, rank };
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

      const validData = characterData.filter(
        (d): d is PreparedCharacterData & { rank: number } => !!d,
      );

      for (const item of validData) {
        log(
          `[완료] ${String(item.rank).padStart(2, '0')}. ${item.name} - ${
            item.rows.length
          }개의 트라이포드 추출`,
        );
      }

      return validData;
    },
    [apiCallbacks, log],
  );

  /**
   * API를 통해 랭커 목록 조회부터 캐릭터별 상세 정보 조회까지 데이터 수집의 전체 과정을 담당합니다.
   */
  const acquireRankAndCharacters = useCallback(
    async (
      startRank: number,
      endRankNum: number,
      jobCode: string,
      treeName: string,
      minCP: number,
      maxCP: number,
    ) => {
      log(
        `설정: 직업=${jobCode}, 직업 각인=${treeName}, 랭크=${startRank}-${endRankNum}, 전투력=${minCP}-${maxCP}`,
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
        minCP,
        maxCP,
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

  /**
   * 테스트 모드 시, IndexedDB에 캐시된 모든 캐릭터 데이터를 불러와 분석을 준비합니다.
   */
  const loadDataFromCache = useCallback(async () => {
    log('테스트 모드: IndexedDB에서 데이터 로드를 시작합니다.');
    setIsAnalyzing(true);
    resetAnalysisState();

    try {
      const cachedArmories = await idbGetAllArmories();
      if (!cachedArmories || cachedArmories.length === 0) {
        log(
          '캐시된 데이터가 없습니다. API를 통해 먼저 데이터를 수집해주세요.',
          'error',
        );
        alert('IndexedDB에 캐시된 데이터가 없습니다.');
        setIsAnalyzing(false);
        return;
      }

      log(`캐시 데이터 로드 완료: ${cachedArmories.length}명`);
      setTotalRanked(cachedArmories.length);
      setProgress({
        current: 1,
        total: ANALYSIS_STEPS,
        message: '캐릭터 데이터 처리 중...',
      });

      const prepared: PreparedCharacterData[] = [];
      let completed = 0;

      for (const armoryData of cachedArmories) {
        const { name, data: armory } = armoryData;
        try {
          const preparedData = prepareCharacterDataFromArmory(name, armory);
          if (preparedData.rows.length > 0) {
            prepared.push(preparedData);
            log(
              `[캐시] ${String(completed + 1).padStart(2, '0')}. ${name} - ${
                preparedData.rows.length
              }개의 트라이포드 추출`,
            );
          } else {
            log(`[실패] ${name}님의 정보가 캐시에 비어있습니다.`);
          }
        } catch (error: any) {
          log(
            `[오류] ${String(completed + 1).padStart(2, '0')}. ${name} - 실패: ${
              error.message
            }`,
            'error',
          );
        } finally {
          completed += 1;
          setProgress({
            current: completed,
            total: cachedArmories.length,
            message: `캐릭터 데이터 처리 중... (${completed}/${cachedArmories.length})`,
          });
        }
      }

      setPreparedData(prepared);
      setProgress({ current: 4, total: ANALYSIS_STEPS, message: '완료' });
      log(
        '캐시 데이터 처리가 완료되었습니다. 조건을 선택하면 통계를 즉시 갱신합니다.',
      );
    } catch (error: any) {
      log(`테스트 모드 오류: ${error.message}`, 'error');
      alert(`테스트 모드 실행 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  }, [log, resetAnalysisState]);

  /**
   * 사용자가 '검색 시작' 버튼을 눌렀을 때 폼 제출을 처리하는 메인 이벤트 핸들러입니다.
   * 테스트 모드 여부에 따라 `loadDataFromCache` 또는 `acquireRankAndCharacters`를 호출합니다.
   */
  const handleFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (isTestMode) {
        await loadDataFromCache();
        return;
      }

      if (!job || !enlightenmentTree) {
        alert('직업과 직업 각인을 모두 선택해주세요.');
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
          parseInt(minCombatPower, 10) || 0,
          parseInt(maxCombatPower, 10) || 9999,
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
      minCombatPower,
      maxCombatPower,
      resetAnalysisState,
      acquireRankAndCharacters,
      log,
      isTestMode,
      loadDataFromCache,
    ],
  );

  // --- Derived Results & Selectors -------------------------------------------
  // `preparedData` 또는 `requiredCores`가 변경될 때마다 실시간으로 통계 결과를 필터링하고 계산합니다。
  useEffect(() => {
    if (!preparedData?.length || !requiredCores.length) {
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

  // --- Grouped Tripod Data (table model) -------------------------------------
  // 최종 분석 결과를 캐릭터별, 스킬별로 그룹화하여 상세 테이블에 표시하기 쉽게 가공합니다.
  const groupedTripodData = useMemo(() => {
    if (!results) return {};
    // 1) 캐릭터/스킬 기본 집계
    const base = results.allRows.reduce((acc, row) => {
      const charKey = row.character;
      const skillKey = row.skill_name;
      if (!acc[charKey]) acc[charKey] = {};
      if (!acc[charKey][skillKey]) {
        acc[charKey][skillKey] = {
          skill_level: row.skill_level,
          rune_name: row.rune_name,
          tripods: [] as any[],
        };
      }
      if (row.tripod_name)
        acc[charKey][skillKey].tripods.push({
          tier: row.tripod_tier,
          name: row.tripod_name,
        });
      return acc;
    }, {} as any);

    // 2) 준비된 데이터에서 tooltip/icon 병합
    const byChar: Record<string, Record<string, any>> = {};
    for (const p of preparedData) {
      const bundles = (p as any).tooltipBySkill || {};
      byChar[p.name] = bundles;
    }

    for (const [charName, skills] of Object.entries(base)) {
      const b = byChar[charName] || {};
      for (const [skillName, skillData] of Object.entries(
        skills as Record<string, any>,
      )) {
        const bundle = b[skillName];
        if (!bundle) continue;
        skillData.skillTooltipHtml = bundle.skillHtml || '';
        skillData.skillIcon = bundle.skillIcon || '';
        skillData.runeTooltipHtml = bundle.runeHtml || '';
        skillData.runeIcon = bundle.runeIcon || '';
        if (Array.isArray(skillData.tripods)) {
          skillData.tripods = skillData.tripods.map((t: any) => {
            const tb = bundle.tripods?.[t.name];
            return {
              ...t,
              tooltipHtml: tb?.html || '',
              icon: tb?.icon,
              tier: typeof t.tier === 'number' ? t.tier : (tb?.tier ?? t.tier),
            };
          });
        }
      }
    }

    return base;
  }, [results, preparedData]);

  // --- Selected Skill Detail Stats -------------------------------------------
  const skillDetailStats = useMemo(() => {
    if (!selectedSkill || !results) {
      return null;
    }

    const skillLevels = new Map<number, number>();
    const tripods = new Map<string, number>();
    const runes = new Map<string, number>();

    const charactersUsingSkill = Object.values(groupedTripodData).filter(
      (skills: any) => skills[selectedSkill],
    );

    for (const skills of charactersUsingSkill) {
      const skillData = (skills as any)[selectedSkill];
      if (!skillData) continue;

      skillLevels.set(
        skillData.skill_level,
        (skillLevels.get(skillData.skill_level) || 0) + 1,
      );

      if (skillData.rune_name) {
        runes.set(
          skillData.rune_name,
          (runes.get(skillData.rune_name) || 0) + 1,
        );
      }

      for (const tripod of skillData.tripods) {
        const tripodKey = `${tripod.tier + 1}T-${tripod.name}`;
        tripods.set(tripodKey, (tripods.get(tripodKey) || 0) + 1);
      }
    }

    const sortedSkillLevels = new Map(
      [...skillLevels.entries()].sort((a, b) => b[1] - a[1]),
    );
    const sortedTripods = new Map(
      [...tripods.entries()].sort((a, b) => b[1] - a[1]),
    );
    const sortedRunes = new Map(
      [...runes.entries()].sort((a, b) => b[1] - a[1]),
    );

    const tripodsByTier = new Map<number, { name: string; count: number }[]>();
    for (const [tripodKey, count] of sortedTripods.entries()) {
      const tier = parseInt(tripodKey.charAt(0), 10);
      const name = tripodKey.substring(3);

      if (!tripodsByTier.has(tier)) {
        tripodsByTier.set(tier, []);
      }
      tripodsByTier.get(tier)!.push({ name, count });
    }
    const sortedTripodsByTier = new Map(
      [...tripodsByTier.entries()].sort((a, b) => a[0] - b[0]),
    );

    return {
      skillLevels: sortedSkillLevels,
      tripods: sortedTripodsByTier,
      runes: sortedRunes,
      total: charactersUsingSkill.length,
    };
  }, [selectedSkill, results, groupedTripodData]);

  const coresEnabled = useMemo(
    () => preparedData.length > 0,
    [preparedData.length],
  );
  const isWaiting = useMemo(() => quotaBanner.active, [quotaBanner.active]);
  const waitingPct = useMemo(() => {
    if (!isWaiting) return 0;
    return Math.min(
      100,
      Math.round((quotaBanner.shown / Math.max(1, quotaBanner.total)) * 100),
    );
  }, [isWaiting, quotaBanner.shown, quotaBanner.total]);
  const buttonLabel = useMemo(() => {
    if (isWaiting) return `토큰 대기 중(${waitingPct}%)`;
    if (isAnalyzing) return '검색 중...';
    return '검색 시작';
  }, [isWaiting, waitingPct, isAnalyzing]);

  // --- Render ----------------------------------------------------------------
  return (
    <div className="flex w-full flex-col gap-y-4 rounded-lg bg-[var(--gray-3)] p-5">
      <SearchForm
        handleFormSubmit={handleFormSubmit}
        job={job}
        jobOptions={JOB_DATA.map((j) => ({
          code: String(j.code),
          name: j.class,
        }))}
        setJob={setJob}
        enlightenmentTree={enlightenmentTree}
        setEnlightenmentTree={setEnlightenmentTree}
        enlightenmentOptions={enlightenmentOptions}
        minCombatPower={minCombatPower}
        setMinCombatPower={setMinCombatPower}
        maxCombatPower={maxCombatPower}
        setMaxCombatPower={setMaxCombatPower}
        endRank={endRank}
        setEndRank={setEndRank}
        isAnalyzing={isAnalyzing}
        isWaiting={isWaiting}
        buttonLabel={buttonLabel}
        progress={progress}
      />

      <SearchFilters
        isAnalyzing={isAnalyzing}
        preparedData={preparedData}
        coreOptions={coreOptions}
        coreOptionsByCategory={coreOptionsByCategory}
        selectedCoresByCategory={selectedCoresByCategory}
        toggleCore={toggleCore}
        coresEnabled={coresEnabled}
      />

      <AnalysisResults
        results={results}
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
        groupedTripodData={groupedTripodData}
        skillDetailStats={skillDetailStats}
      />

      <AnalysisLogs logs={logs} logBoxRef={logBoxRef} />
    </div>
  );
}
