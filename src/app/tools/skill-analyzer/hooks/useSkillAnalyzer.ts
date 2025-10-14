'use client';

/**
 * @file useSkillAnalyzer – 스킬 분석 페이지 전용 훅
 * - 이 파일의 모든 주석은 한글로 작성합니다.
 * - 기능 변경 없이 가독성과 성능(불필요한 재연산/재렌더 최소화)에 초점을 맞춘 최적화 버전입니다.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchRankNames, fetchArmories, CONCURRENCY_ARMORY } from '../api';
import { idbGetAllArmories } from '../cache';
import { buildCoreTooltip, mapPool, norm } from '../utils';
import type {
  AnalysisResult,
  ApiCallbacks,
  PreparedCharacterData,
  ProgressState,
  CoreMeta,
  SkillDetail,
} from '../types';
import { useTestMode } from '../../../hooks/test-mode-context';
import { JOB_DATA } from '../../../../config/jobData';
import type { EnlightenmentTree } from '../../../../config/jobData';
import { prepareCharacterDataFromArmory } from '../services/prepare-character';

// === 상수 ======================================================================

/** 분석 진행 단계를 고정(로그/진행률 표시용) */
const ANALYSIS_STEPS = 4;

// === 훅 본문 ====================================================================

export function useSkillAnalyzer() {
  // --- 폼/필터 상태 ------------------------------------------------------------
  const [job, setJob] = useState('');
  const [enlightenmentTree, setEnlightenmentTree] = useState('');
  const [endRank, setEndRank] = useState('10');
  const [minCombatPower, setMinCombatPower] = useState('0');
  const [maxCombatPower, setMaxCombatPower] = useState('9999');

  // --- 선택/결과 상태 -----------------------------------------------------------
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
  const [preparedData, setPreparedData] = useState<
    (PreparedCharacterData & { skillDetails: Record<string, SkillDetail> })[]
  >([]);
  const [totalRanked, setTotalRanked] = useState<number>(0);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // --- 토큰 대기 배너 상태 ------------------------------------------------------
  const [quotaBanner, setQuotaBanner] = useState<{
    active: boolean;
    shown: number;
    total: number;
  }>({
    active: false,
    shown: 0,
    total: 60,
  });

  // --- 직업 각인/코어 옵션 상태 -------------------------------------------------
  const [enlightenmentOptions, setEnlightenmentOptions] = useState<
    EnlightenmentTree[]
  >([]);
  const [coreOptions, setCoreOptions] = useState<string[]>([]);
  const [coreOptionsByCategory, setCoreOptionsByCategory] = useState<{
    sun: CoreMeta[];
    moon: CoreMeta[];
    star: CoreMeta[];
  }>({
    sun: [],
    moon: [],
    star: [],
  });
  const [selectedCoresByCategory, setSelectedCoresByCategory] = useState<{
    sun?: string;
    moon?: string;
    star?: string;
  }>({});

  // --- 기타 --------------------------------------------------------------------
  const logBoxRef = useRef<HTMLDivElement | null>(null);

  // === 로깅/콜백 묶음 ===========================================================

  /**
   * 로그를 남깁니다. (타임스탬프 포함)
   */
  const log = useCallback(
    (message: string, type: 'info' | 'error' = 'info') => {
      const time = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev, `[${time}] ${message}`]);
      if (type === 'error') console.error(message);
    },
    [],
  );

  /**
   * API 콜백 바인딩 – 토큰 대기 상태를 상위로 노출
   */
  const apiCallbacks: ApiCallbacks = useMemo(
    () => ({
      log,
      startQuotaStatus: (totalSec: number) =>
        setQuotaBanner({ active: true, shown: 0, total: totalSec }),
      updateQuotaStatus: (shownSec: number, totalSec: number) =>
        setQuotaBanner({ active: true, shown: shownSec, total: totalSec }),
      endQuotaStatus: () =>
        setQuotaBanner((prev) => ({ ...prev, active: false })),
    }),
    [log],
  );

  // === UI 하우스키핑 ============================================================

  /**
   * 로그가 추가될 때마다 스크롤을 최신 위치로 이동
   */
  useEffect(() => {
    const el = logBoxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  /**
   * 코어 선택 상태를 초기화
   */
  const resetCoreSelection = useCallback(() => {
    setCoreOptionsByCategory({ sun: [], moon: [], star: [] });
    setCoreOptions([]);
    setSelectedCoresByCategory({});
    setRequiredCores([]);
  }, []);

  // === 의존 옵션 계산 ============================================================

  /**
   * 직업 선택에 따라 직업 각인 옵션을 갱신하고, 코어는 초기화
   */
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

  /**
   * 직업 각인 선택에 따라 코어 옵션(카테고리/툴팁) 갱신
   */
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
   * 코어 토글 (같은 카테고리는 단일 선택)
   */
  const toggleCore = useCallback(
    (core: string) => {
      const inSun = coreOptionsByCategory.sun.some((c) => c.name === core);
      const inMoon = coreOptionsByCategory.moon.some((c) => c.name === core);
      const category: 'sun' | 'moon' | 'star' = inSun
        ? 'sun'
        : inMoon
          ? 'moon'
          : 'star';

      setSelectedCoresByCategory((prev) => ({
        ...prev,
        [category]: prev[category] === core ? undefined : core,
      }));
    },
    [coreOptionsByCategory.sun, coreOptionsByCategory.moon],
  );

  /**
   * 카테고리별 선택 상태를 합쳐 requiredCores로 관리
   */
  useEffect(() => {
    const list = [
      selectedCoresByCategory.sun,
      selectedCoresByCategory.moon,
      selectedCoresByCategory.star,
    ].filter(Boolean) as string[];
    setRequiredCores(list);
  }, [selectedCoresByCategory]);

  /**
   * 분석 작업 시작 전 상태 초기화
   */
  const resetAnalysisState = useCallback(() => {
    setLogs(['데이터 수집을 시작합니다...']);
    setProgress({ current: 0, total: 100, message: '' });
    setSelectedCoresByCategory({});
    setRequiredCores([]);
    setPreparedData([]);
    setResults(null);
  }, []);

  // === 데이터 수집/준비 =========================================================

  /**
   * 캐릭터 Armory 조회 및 화면 모델 준비 (병렬 처리)
   */
  const fetchAndPrepareCharacterData = useCallback(
    async (names: string[], startRank: number) => {
      let completed = 0;

      type Prepared = PreparedCharacterData & {
        rank: number;
        skillDetails: Record<string, SkillDetail>;
      };

      const characterData = await mapPool<string, Prepared | undefined>(
        names,
        CONCURRENCY_ARMORY,
        async (name, i) => {
          const rank = startRank + i;
          try {
            const armory = await fetchArmories(name, apiCallbacks);
            const prepared = prepareCharacterDataFromArmory(name, armory);
            if (prepared.usedSkills.size === 0) {
              log(`[실패] ${name}님의 정보를 가져오지 못했습니다.`);
              return undefined;
            }
            return { ...prepared, rank };
          } catch (error: any) {
            log(
              `[오류] ${rank.toString().padStart(2, '0')}. ${name} - 실패: ${
                error.message
              }`,
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
        },
      );

      const validData = characterData.filter((d): d is Prepared => !!d);

      for (const item of validData) {
        log(
          `[완료] ${String(item.rank).padStart(2, '0')}. ${item.name} - ${item.usedSkills.size}개의 스킬 추출`,
        );
      }

      return validData;
    },
    [apiCallbacks, log],
  );

  /**
   * 랭크/캐릭터 수집 → 캐릭터 Armory 수집/준비 → 상태 갱신
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
   * (테스트 모드) IndexedDB 캐시에서 데이터 로드
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

      const prepared: (PreparedCharacterData & {
        skillDetails: Record<string, SkillDetail>;
      })[] = [];
      let completed = 0;

      for (const armoryData of cachedArmories) {
        const { name, data: armory } = armoryData;
        try {
          const preparedData = prepareCharacterDataFromArmory(name, armory);
          if (preparedData.usedSkills.size > 0) {
            prepared.push(preparedData);
            log(
              `[캐시] ${String(completed + 1).padStart(2, '0')}. ${name} - ${
                preparedData.usedSkills.size
              }개의 스킬 추출`,
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
   * 폼 제출 핸들러 – 테스트 모드/실시간 수집 분기
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

  // === 결과 계산(필터 → 집계) ===================================================

  /**
   * 필수 코어(requiredCores)에 부합하는 캐릭터만 필터링 후, 스킬 사용/상세 행 집계
   */
  useEffect(() => {
    if (!preparedData?.length) {
      setResults(null);
      return;
    }

    const normalizedCores = new Set(requiredCores.map(norm));
    const hasCoreFilter = normalizedCores.size > 0;
    const kept: string[] = [];
    const skillUsageCounter = new Map<string, number>();

    for (const entry of preparedData) {
      const hasAllCores = hasCoreFilter
        ? Array.from(normalizedCores).every((core) =>
            Array.from(entry.arkgridSet).some((s: string) => s.includes(core)),
          )
        : true; // If no cores are selected, include all characters

      if (!hasAllCores) continue;

      kept.push(entry.name);
      entry.usedSkills.forEach((skill: string) => {
        skillUsageCounter.set(skill, (skillUsageCounter.get(skill) || 0) + 1);
      });
    }

    const skillUsageRows = Array.from(skillUsageCounter.entries())
      .map(([skillName, characters]) => ({ skill_name: skillName, characters }))
      .sort((a, b) => b.characters - a.characters);

    setResults({
      skillUsageRows,
      keptCharacters: kept,
      totalCharacters: totalRanked,
    });
  }, [requiredCores, preparedData, totalRanked]);

  /**
   * 캐릭터별 스킬 상세(툴팁 번들 포함) 구조로 변환
   */
  const groupedTripodData = useMemo(() => {
    if (!results?.keptCharacters.length || !preparedData.length) {
      return {};
    }

    const characterDetailsMap = new Map<string, Record<string, SkillDetail>>();
    for (const p of preparedData) {
      characterDetailsMap.set(p.name, p.skillDetails);
    }

    const finalGroupedData: Record<string, Record<string, SkillDetail>> = {};
    for (const charName of results.keptCharacters) {
      const details = characterDetailsMap.get(charName);
      if (details) {
        finalGroupedData[charName] = details;
      }
    }

    return finalGroupedData;
  }, [results, preparedData]);

  /**
   * 선택된 스킬의 세부 통계를 계산(레벨/트라이포드/룬)
   */
  const skillDetailStats = useMemo(() => {
    if (!selectedSkill || !results) return null;

    const skillLevels = new Map<number, number>();
    const tripods = new Map<string, number>();
    const runes = new Map<string, number>();

    const charactersUsingSkill = Object.values(groupedTripodData).filter(
      (skills: any) => (skills as any)[selectedSkill],
    );

    for (const skills of charactersUsingSkill) {
      const skillData = (skills as any)[selectedSkill];
      if (!skillData) continue;

      skillLevels.set(skillData.level, (skillLevels.get(skillData.level) || 0) + 1);

      if (skillData.rune?.name) {
        runes.set(
          skillData.rune.name,
          (runes.get(skillData.rune.name) || 0) + 1,
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
      if (!tripodsByTier.has(tier)) tripodsByTier.set(tier, []);
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

  // === 파생 UI 상태 =============================================================

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

  // === 반환 ====================================================================

  return {
    job,
    setJob,
    enlightenmentTree,
    setEnlightenmentTree,
    endRank,
    setEndRank,
    minCombatPower,
    setMinCombatPower,
    maxCombatPower,
    setMaxCombatPower,
    isAnalyzing,
    progress,
    logs,
    results,
    preparedData,
    selectedSkill,
    setSelectedSkill,
    enlightenmentOptions,
    coreOptions,
    coreOptionsByCategory,
    selectedCoresByCategory,
    logBoxRef,
    toggleCore,
    handleFormSubmit,
    groupedTripodData,
    skillDetailStats,
    coresEnabled,
    isWaiting,
    buttonLabel,
  };
}