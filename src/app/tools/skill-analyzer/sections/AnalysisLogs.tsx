/**
 * @file AnalysisLogs – 처리 로그 섹션
 * - 이 파일의 모든 주석은 한글로 작성합니다.
 * - 기능 변경 없음: 가독성과 렌더 성능(불필요한 재생성 최소화) 최적화.
 */
'use client';

import React, { useMemo } from 'react';
import { SectionHeader } from '../components';

// === 타입 정의 =================================================================

export interface AnalysisLogsProps {
  logs: string[];
  logBoxRef: React.RefObject<HTMLDivElement | null>;
}

// === 컴포넌트 ==================================================================

/**
 * 분석 로그 섹션
 * - API 요청 및 데이터 처리 과정을 표시합니다.
 * - 로그 라인 노드를 useMemo로 캐싱하여 불필요한 재생성을 줄입니다.
 */
export const AnalysisLogs: React.FC<AnalysisLogsProps> = ({
  logs,
  logBoxRef,
}) => {
  // --- 메모이제이션된 로그 노드 -------------------------------------------------
  const logNodes = useMemo(
    () => logs.map((logMsg, i) => <div key={i}>{logMsg}</div>),
    [logs],
  );

  // --- 렌더 가드(후단) ----------------------------------------------------------
  if (logs.length <= 1) return null;

  // --- 렌더 --------------------------------------------------------------------
  return (
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
          {logNodes}
        </div>
      </div>
    </div>
  );
};
