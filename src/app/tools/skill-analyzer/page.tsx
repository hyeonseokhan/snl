'use client';

import React from 'react';
import { JOB_DATA } from '../../../config/jobData';
import { SearchForm } from './sections/SearchForm';
import { useSkillAnalyzer } from './hooks/useSkillAnalyzer';
import { AnalysisLogs } from './sections/AnalysisLogs';

/**
 * 1단계 리팩토링 결과 확인용 임시 페이지입니다.
 * - groupedTripodData의 최종 구조를 JSON 형태로 출력합니다.
 */
export default function SkillAnalyzerTempPage() {
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
    logBoxRef,
    handleFormSubmit,
    groupedTripodData,
    buttonLabel,
    enlightenmentOptions,
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

      {/* 수정된 객체 출력 부 */}
      <div className="mt-4 w-full rounded-lg border border-dashed border-[var(--gray-8)] bg-[var(--gray-1)] p-4">
        <h2 className="mb-2 text-lg font-bold text-[var(--gray-12)]">
          `groupedTripodData` (JSON 결과)
        </h2>
        <pre className="overflow-x-auto whitespace-pre-wrap break-all bg-[var(--gray-2)] p-3 text-xs text-[var(--gray-11)]">
          <code>{JSON.stringify(groupedTripodData, null, 2)}</code>
        </pre>
      </div>

      <AnalysisLogs logs={logs} logBoxRef={logBoxRef} />
    </div>
  );
}
