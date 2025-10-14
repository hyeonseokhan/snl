'use client';

/**
 * @file TripodTooltip.tsx – 트라이포드 전용 툴팁 컴포넌트
 * - 모든 주석은 한글로 작성합니다.
 * - BaseTooltip을 사용하여 툴팁을 렌더링합니다.
 */

import React from 'react';
import { BaseTooltip } from './common/BaseTooltip';

// === 타입 정의 =================================================================
export interface TripodTooltipProps {
  /** 트라이포드 이름 */
  name: string;
  /** 툴팁 본문 (HTML) */
  body: string;
  /** 아이콘 URL (선택) */
  icon?: string;
  /** 칩 크기 (버튼) */
  size?: 'sm' | 'md';
}

// === 컴포넌트 ==================================================================
/**
 * 트라이포드 정보를 보여주는 칩과, hover 시 상세 정보를 보여주는 툴팁을 렌더링합니다.
 */
export const TripodTooltip: React.FC<TripodTooltipProps> = ({
  name,
  body,
  icon,
  size = 'sm',
}) => {
  const px = size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-3 py-1 text-xs';

  // --- 툴팁 콘텐츠 ---------------------------------------------------------
  const tooltipContent = (
    <>
      {/* 헤더: 트라이포드명(굵게) */}
      <div className="mb-1.5 flex items-end justify-between gap-3">
        <div className="text-left text-[13px] font-bold text-[var(--gray-12)]">
          {name}
        </div>
      </div>

      {/* 구분선 */}
      <div className="my-2 border-t border-[var(--gray-6)]" />

      {/* 본문: 좌측 정렬 */}
      {body ? (
        <div
          className="text-left text-[12px] text-[var(--gray-12)]"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      ) : (
        <div className="text-left text-[12px] text-[var(--gray-9)]">
          설명 데이터를 찾을 수 없습니다.
        </div>
      )}
    </>
  );

  // --- 렌더링 -------------------------------------------------------------
  return (
    <BaseTooltip content={tooltipContent}>
      <button
        type="button"
        className={`inline-flex items-center gap-1 rounded-full border border-[var(--gray-6)] bg-[var(--gray-1)] ${px} text-[var(--gray-11)] hover:bg-[var(--gray-4)]`}
      >
        {icon ? <img src={icon} alt="" className="h-3.5 w-3.5" /> : null}
        <span className="truncate">{name}</span>
      </button>
    </BaseTooltip>
  );
};
