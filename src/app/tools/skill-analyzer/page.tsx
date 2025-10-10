/**
 * @file Skill Analyzer 페이지의 메인 로직을 담당하는 파일입니다.
 * 이 파일은 다음과 같은 주요 기능들을 포함합니다:
 * - 상태 관리: 직업, 각인, 전투력 등 사용자 입력과 분석 결과, 로그 등 모든 상태를 관리합니다.
 * - 데이터 페칭: 로스트아크 API 또는 IndexedDB 캐시에서 캐릭터 데이터를 가져옵니다.
 * - 데이터 처리: 가져온 데이터를 분석에 적합한 형태로 가공하고, 필터링 및 통계 계산을 수행합니다.
 * - 렌더링: 하위 컴포넌트(검색 폼, 필터, 결과, 로그)에 필요한 데이터와 핸들러를 전달하여 UI를 렌더링합니다.
 */
'use client';

import React from 'react';
import { JOB_DATA } from '../../../config/jobData';
import { AnalysisLogs } from './sections/AnalysisLogs';
import { SearchFilters } from './sections/SearchFilters';
import { SearchForm } from './sections/SearchForm';
import { AnalysisResults } from './sections/AnalysisResults';
import { useSkillAnalyzer } from './hooks/useSkillAnalyzer';

// === Page Component (default export) =========================================
/**
 * 로스트아크 전투력 랭킹을 기반으로 스킬 및 트라이포드 사용 통계를 분석하는 페이지 컴포넌트입니다.
 * 모든 상태 관리와 핵심 로직 실행을 담당하며, 하위 UI 컴포넌트를 조립합니다.
 */
export default function SkillAnalyzer() {
  const {
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
    isWaiting,
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
    buttonLabel,
  } = useSkillAnalyzer();

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
