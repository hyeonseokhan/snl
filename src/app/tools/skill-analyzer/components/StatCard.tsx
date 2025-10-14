'use client';

import React from 'react';

/**
 * 분석 결과의 주요 통계 수치를 표시하는 카드 컴포넌트입니다.
 * @param {string} label - 통계 항목의 이름
 * @param {string | number} value - 통계 수치
 */
export const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-[var(--gray-7)] p-2">
    <div className="text-2xl font-bold text-[var(--accent-10)]">{value}</div>
    <div className="mt-1 text-xs text-[var(--gray-11)]">{label}</div>
  </div>
);
