'use client';

/**
 * @file CoreTooltip.tsx – 아크 그리드 코어 전용 툴팁 컴포넌트
 * - 모든 주석은 한글로 작성합니다.
 */

import React from 'react';
import DOMPurify from 'dompurify';
import { BaseTooltip } from './common/BaseTooltip';

export interface CoreTooltipProps {
  /** 코어 이름 (버튼 라벨) */
  name: string;
  /** 툴팁 내용 (HTML) */
  tooltip: string;
  /** 현재 선택된 코어인지 여부 */
  isSelected: boolean;
  /** 비활성화 여부 */
  disabled: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick: () => void;
}

/**
 * 아크 그리드 코어 아이템과 툴팁을 함께 렌더링하는 컴포넌트
 */
export const CoreTooltip: React.FC<CoreTooltipProps> = ({
  name,
  tooltip,
  isSelected,
  disabled,
  onClick,
}) => {
  const sanitizedTooltip = DOMPurify.sanitize(tooltip);

  const tooltipContent = (
    <>
      <div className="text-left text-[13px] font-bold text-[var(--gray-12)]">
        상세 효과
      </div>
      <div className="my-2 border-t border-[var(--gray-6)]" />
      <div
        className="text-left text-[11px] leading-5"
        dangerouslySetInnerHTML={{ __html: sanitizedTooltip }}
      />
    </>
  );

  return (
    <BaseTooltip content={tooltipContent}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`rounded-full border px-3 py-1 text-xs transition-all ${
          isSelected
            ? 'border-[var(--accent-10)] bg-[var(--accent-9)] text-white'
            : 'border-[var(--gray-6)] bg-[var(--gray-1)] text-[var(--gray-11)] hover:bg-[var(--gray-4)]'
        } ${!disabled ? '' : 'cursor-not-allowed opacity-50'}`}
      >
        {name}
      </button>
    </BaseTooltip>
  );
};