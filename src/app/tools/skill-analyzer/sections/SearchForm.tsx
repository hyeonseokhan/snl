/**
 * @file SearchForm – 검색 폼(직업/각인/전투력/대상수) + 진행바
 * - 컨벤션: 파일 상단 @file, 섹션 구분 주석, 컴포넌트/함수 JSDoc
 * - 기능 변경 없음: 렌더 최적화(useMemo) 및 핸들러 정리(useCallback)만 적용
 */
'use client';

import React, { useCallback, useMemo } from 'react';
import { SectionHeader } from '../components';

// === Types ====================================================================

type Progress = { current: number; total: number; message: string };

/**
 * SearchForm Props
 * - UI 전용 프레젠테이션 컴포넌트이므로 모든 데이터는 상위에서 주입받습니다.
 */
export interface SearchFormProps {
  handleFormSubmit: (e: React.FormEvent) => Promise<void> | void;
  job: string;
  jobOptions?: { code: string; name: string }[];
  setJob: (v: string) => void;
  enlightenmentTree: string;
  setEnlightenmentTree: (v: string) => void;
  enlightenmentOptions: { name: string }[];
  minCombatPower: string;
  setMinCombatPower: (v: string) => void;
  maxCombatPower: string;
  setMaxCombatPower: (v: string) => void;
  endRank: string;
  setEndRank: (v: string) => void;
  isAnalyzing: boolean;
  isWaiting: boolean;
  buttonLabel: string;
  progress: Progress;
}

// === Component =================================================================

/**
 * 검색 정보 입력 폼
 * - 직업 선택, 직업 각인, 전투력 범위, 분석 대상 수, 진행 바 표시
 * - 렌더 최적화: options map을 useMemo로 캐싱
 * - 이벤트 핸들러: useCallback으로 생성(안정적인 참조 유지)
 */
export const SearchForm: React.FC<SearchFormProps> = ({
  handleFormSubmit,
  job,
  jobOptions = [],
  setJob,
  enlightenmentTree,
  setEnlightenmentTree,
  enlightenmentOptions,
  minCombatPower,
  setMinCombatPower,
  maxCombatPower,
  setMaxCombatPower,
  endRank,
  setEndRank,
  isAnalyzing,
  isWaiting,
  buttonLabel,
  progress,
}) => {
  // --- Memoized option nodes ---------------------------------------------------
  const jobOptionNodes = useMemo(
    () =>
      jobOptions.map((opt) => (
        <option key={opt.code} value={opt.code}>
          {opt.name}
        </option>
      )),
    [jobOptions],
  );

  const engraveOptionNodes = useMemo(
    () =>
      enlightenmentOptions.map((tree) => (
        <option key={tree.name} value={tree.name}>
          {tree.name}
        </option>
      )),
    [enlightenmentOptions],
  );

  // --- Stable handlers ---------------------------------------------------------
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleFormSubmit(e);
    },
    [handleFormSubmit],
  );

  const onChangeJob = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => setJob(e.target.value),
    [setJob],
  );

  const onChangeEngrave = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setEnlightenmentTree(e.target.value),
    [setEnlightenmentTree],
  );

  const onChangeMinCP = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setMinCombatPower(e.target.value),
    [setMinCombatPower],
  );

  const onChangeMaxCP = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setMaxCombatPower(e.target.value),
    [setMaxCombatPower],
  );

  const onChangeEndRank = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => setEndRank(e.target.value),
    [setEndRank],
  );

  // --- Render ------------------------------------------------------------------
  return (
    <form onSubmit={onSubmit} className="block w-full flex-row pb-3 md:flex">
      <SectionHeader
        title="검색 정보 입력"
        description="직업, 각인, 대상 수 등을 설정합니다."
      />

      <div className="flex w-full flex-col gap-4 md:w-9/12">
        {/* Row 1 */}
        <div className="flex flex-wrap items-end gap-4">
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
              onChange={onChangeJob}
              required
              className="h-9 w-auto rounded border border-[var(--gray-4)] px-3 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300"
              aria-label="직업 선택"
            >
              <option value="">직업을 선택하세요</option>
              {jobOptionNodes}
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
              onChange={onChangeEngrave}
              required
              disabled={!job}
              className="h-9 w-auto rounded border border-[var(--gray-4)] px-3 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300 disabled:bg-[var(--gray-1)]"
              aria-label="직업 각인 선택"
            >
              <option value="">직업을 먼저 선택하세요</option>
              {engraveOptionNodes}
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label
              htmlFor="minCombatPower"
              className="mb-2 block text-sm text-[var(--gray-11)]"
            >
              최소 전투력
            </label>
            <input
              id="minCombatPower"
              type="number"
              value={minCombatPower}
              onChange={onChangeMinCP}
              className="h-9 w-24 rounded border border-[var(--gray-4)] px-3 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300"
              placeholder="0"
              inputMode="numeric"
            />
          </div>

          <div>
            <label
              htmlFor="maxCombatPower"
              className="mb-2 block text-sm text-[var(--gray-11)]"
            >
              최대 전투력
            </label>
            <input
              id="maxCombatPower"
              type="number"
              value={maxCombatPower}
              onChange={onChangeMaxCP}
              className="h-9 w-24 rounded border border-[var(--gray-4)] px-3 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300"
              placeholder="9999"
              inputMode="numeric"
            />
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
              onChange={onChangeEndRank}
              required
              className="h-9 w-auto rounded border border-[var(--gray-4)] px-3 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300"
              aria-label="분석 대상 수 선택"
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
              aria-busy={isWaiting}
            >
              {buttonLabel}
            </button>
          </div>
        </div>

        {/* 진행 바 */}
        {isAnalyzing && (
          <div className="rounded-lg bg-[var(--gray-2)] p-4">
            <div className="mb-2 text-sm text-[var(--gray-11)]">
              {progress.message}
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--gray-5)]">
              <div
                className="h-2 rounded-full bg-[var(--accent-9)] transition-all duration-500"
                style={{
                  width: `${(progress.current / progress.total) * 100}%`,
                }}
                aria-valuenow={(progress.current / progress.total) * 100}
                aria-valuemin={0}
                aria-valuemax={100}
                role="progressbar"
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};
