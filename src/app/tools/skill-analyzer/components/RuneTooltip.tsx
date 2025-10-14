'use client';

/**
 * @file RuneTooltip – 룬 전용 툴팁 컴포넌트
 * - 모든 주석은 한글로 작성합니다.
 * - 디자인 요구사항: 좌측 룬 명(볼드), 우측 등급(하단 정렬, 컬러), 구분선 아래 설명.
 * - 희귀/고급/일반까지 등급 컬러 확장.
 */

import React from 'react';

export interface RuneTooltipProps {
  /** 룬 이름 (ArmorySkills.Tripods.Rune.Name) */
  name: string;
  /** 룬 등급 (ArmorySkills.Tripods.Rune.Grade) – 예: 전설/영웅/희귀/고급/일반 */
  grade?: string;
  /** JSON 원문에서 꺼낸 설명 (ArmorySkills.Tripods.Rune.Tooltip.Element_003.value.Element_001) */
  rawDesc?: string;
  /** HTML 폴백(원래 툴팁이 HTML로 제공되는 경우) */
  htmlFallback?: string;
  /** 아이콘 URL (선택) */
  icon?: string;
  /** 칩 크기 (버튼) */
  size?: 'sm' | 'md';
}

/** 등급 → 색상 매핑 */
const gradeColorOf = (grade?: string) => {
  switch (grade?.trim()) {
    case '전설':
      return '#F99200';
    case '영웅':
      return '#ce43fc';
    case '희귀':
      return 'var(--blue-10)';
    case '고급':
      return 'var(--green-10)';
    case '일반':
      return 'var(--gray-10)';
    default:
      return 'var(--gray-11)';
  }
};

/**
 * 룬 전용 툴팁
 * - hover 시 카드형 툴팁을 노출합니다.
 */
export const RuneTooltip: React.FC<RuneTooltipProps> = ({
  name,
  grade,
  rawDesc,
  htmlFallback,
  icon,
  size = 'sm',
}) => {
  const px = size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-3 py-1 text-xs';
  const suffix = grade ? `${grade.trim()} 룬` : '';
  const gradeColor = gradeColorOf(grade);

  return (
    <div className="group relative inline-flex">
      {/* 트리거 버튼(칩) */}
      <button
        type="button"
        className={`inline-flex items-center gap-1 rounded-full border border-[var(--gray-6)] bg-[var(--gray-1)] ${px} text-[var(--gray-11)] hover:bg-[var(--gray-4)]`}
      >
        {icon ? <img src={icon} alt="" className="h-3.5 w-3.5" /> : null}
        <span className="truncate">{name}</span>
      </button>

      {/* 툴팁 카드 (hover) */}
      <div
        role="tooltip"
        className="invisible absolute bottom-full left-1/2 z-50 w-[15rem] max-w-[80vw] -translate-x-1/2 -translate-y-2 rounded-xl border border-[var(--gray-6)] bg-[var(--gray-2)] p-3 text-[var(--gray-12)] opacity-0 shadow-lg transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
      >
        {/* 헤더: 좌측 룬명(굵게), 우측 등급(하단 정렬) */}
        <div className="mb-1.5 flex items-end justify-between gap-3">
          <div className="text-[13px] font-bold text-[var(--gray-12)]">
            {name}
          </div>
          {suffix ? (
            <div
              className="text-right text-[11px]"
              style={{ color: gradeColor }}
            >
              {suffix}
            </div>
          ) : null}
        </div>

        {/* 구분선(은은하게) */}
        <div className="my-2 border-t border-[var(--gray-6)]" />

        {/* 본문: 좌측 정렬 / JSON → HTML 폴백 순서 */}
        {rawDesc ? (
          <div className="whitespace-pre-wrap text-left text-[12px] text-[var(--gray-12)]">
            {rawDesc}
          </div>
        ) : htmlFallback ? (
          <div
            className="text-left text-[12px] text-[var(--gray-12)]"
            dangerouslySetInnerHTML={{ __html: htmlFallback }}
          />
        ) : (
          <div className="text-left text-[12px] text-[var(--gray-9)]">
            설명 데이터를 찾을 수 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
