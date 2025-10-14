'use client';

/**
 * @file SkillTooltip.tsx – 스킬 전용 툴팁 컴포넌트
 * - 모든 주석은 한글로 작성합니다.
 * - BaseTooltip을 사용하여 툴팁을 렌더링합니다.
 */

import React from 'react';
import { BaseTooltip } from './common/BaseTooltip';

// === 타입 정의 =================================================================
export interface SkillTooltipProps {
  /** 스킬 이름 */
  name: string;
  /** 아이콘 URL (선택) */
  icon?: string;
  /** 툴팁 데이터 객체 */
  tooltip: {
    header_1: string;
    header_2: string;
    body_1: string;
    body_2: string[];
  };
  /** 칩 크기 (버튼) */
  size?: 'sm' | 'md';
}

// === 컴포넌트 ==================================================================
/**
 * 스킬 정보를 보여주는 칩과, hover 시 상세 정보를 보여주는 툴팁을 렌더링합니다.
 */
export const SkillTooltip: React.FC<SkillTooltipProps> = ({
  name,
  icon,
  tooltip,
  size = 'md',
}) => {
  const px = size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-3 py-1 text-xs';

  // --- 툴팁 콘텐츠 ---------------------------------------------------------
  const tooltipContent = (
    <>
      {/* 헤더: 좌측 스킬명(굵게), 우측 타입/분류 */}
      <div className="flex items-end justify-between gap-3">
        <div className="text-left text-[13px] font-bold text-[var(--gray-12)]">
          {name}
        </div>
        <div className="flex flex-row gap-1 text-right text-[11px]">
          <span className="text-[var(--gray-12)]">{tooltip.header_1}</span>
          <span className="text-[var(--blue-11)]">{tooltip.header_2}</span>
        </div>
      </div>

      {/* 본문: body_1과 body_2를 함께 렌더링 */}
      <div className="text-left text-[12px] text-[var(--gray-12)]">
        {tooltip.body_1 && (
          <>
            <div className="my-2 border-t border-[var(--gray-6)]" />
            <div>{tooltip.body_1}</div>
          </>
        )}

        {tooltip.body_2 && tooltip.body_2.length > 0 && (
          <>
            <div className="my-2 border-t border-[var(--gray-6)]" />
            <div className="text-[var(--accent-9)]">
              {tooltip.body_2.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );

  // --- 렌더링 -------------------------------------------------------------
  return (
    <BaseTooltip content={tooltipContent}>
      <button
        type="button"
        className={`inline-flex items-center gap-1 rounded-full border border-[var(--gray-6)] bg-[var(--gray-1)] ${px} text-[var(--gray-11)] hover:bg-[var(--gray-4)]`}
      >
        {icon ? <img src={icon} alt="" className="h-4 w-4" /> : null}
        <span className="truncate">{name}</span>
      </button>
    </BaseTooltip>
  );
};
