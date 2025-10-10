'use client';

import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';

/**
 * 텍스트 라벨 위에 마우스를 올리면 툴팁(HTML)을 보여주는 칩 컴포넌트입니다.
 * - 현 테마 컬러 토큰(var(--gray-*), var(--accent-*)))을 그대로 사용합니다.
 * - html은 내부에서 DOMPurify로 sanitize하며, 동일 문자열일 때 재처리를 피하기 위해 useMemo로 캐싱합니다.
 */
export const TooltipChip = ({
  label,
  html,
  icon,
  disabled = false,
  size = 'sm',
}: {
  label: string;
  html: string;
  icon?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}) => {
  // --- 툴팁 HTML 정제(캐싱) ---------------------------------------------------
  const sanitized = useMemo(() => DOMPurify.sanitize(html || ''), [html]);

  // --- 크기 클래스 캐싱 --------------------------------------------------------
  const px = useMemo(
    () => (size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-3 py-1 text-xs'),
    [size],
  );

  return (
    <div className="group relative inline-flex">
      <button
        type="button"
        disabled={disabled}
        className={`inline-flex items-center gap-1 rounded-full border ${px} transition-all ${
          disabled
            ? 'cursor-not-allowed opacity-50'
            : 'border-[var(--gray-6)] bg-[var(--gray-1)] text-[var(--gray-11)] hover:bg-[var(--gray-4)]'
        }`}
        aria-disabled={disabled}
      >
        {icon ? <img src={icon} alt="" className="h-3.5 w-3.5" /> : null}
        <span className="truncate">{label}</span>
      </button>

      {/* 호버 시 표시되는 툴팁 */}
      {sanitized && (
        <div
          role="tooltip"
          className="pointer-events-none invisible absolute bottom-full left-1/2 z-50 w-[28rem] max-w-[90vw] -translate-x-1/2 -translate-y-2 whitespace-pre-wrap rounded-md border border-[var(--gray-6)] bg-[var(--gray-1)] p-3 text-[var(--gray-12)] opacity-0 shadow-lg transition-opacity duration-200 group-hover:visible group-hover:opacity-100"
        >
          <div
            className="text-[11px] leading-5"
            dangerouslySetInnerHTML={{ __html: sanitized }}
          />
        </div>
      )}
    </div>
  );
};
