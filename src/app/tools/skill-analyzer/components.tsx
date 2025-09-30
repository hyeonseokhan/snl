'use client';

import DOMPurify from 'dompurify';

/**
 * 페이지의 각 구역(Section) 제목을 표시하는 컴포넌트입니다.
 * @param {string} title - 구역의 제목
 * @param {string} description - 구역에 대한 설명
 */
export const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex w-full flex-col pb-4 md:w-3/12 md:gap-y-3 md:pb-0 md:pr-8">
    <div className="text-[var(--gray-12)]">{title}</div>
    <div className="text-sm text-[var(--gray-9)]">{description}</div>
  </div>
);

/**
 * 아크 그리드의 코어(해, 달, 별)를 선택하는 UI를 렌더링하는 컴포넌트입니다. (툴팁 지원)
 * @param {string} title - 코어 카테고리 제목 (e.g., "질서의 해 코어")
 * @param {'sun' | 'moon' | 'star'} category - 코어 카테고리
 * @param {{ name: string; tooltip: string }[]} cores - 해당 카테고리의 코어 배열
 * @param {string} [selectedCore] - 현재 선택된 코어
 * @param {(core: string) => void} onToggle - 코어 버튼 클릭 시 호출될 함수
 * @param {boolean} disabled - 컴포넌트 비활성화 여부
 */
export const CoreCategorySelector = ({
  title,
  category,
  cores,
  selectedCore,
  onToggle,
  disabled,
}: {
  title: string;
  category: 'sun' | 'moon' | 'star';
  cores: { name: string; tooltip: string }[];
  selectedCore?: string;
  onToggle: (core: string) => void;
  disabled: boolean;
}) => (
  <div className="inline-flex min-w-0 flex-col gap-1">
    <div className="text-xs font-semibold text-[var(--red-9)]">{title}</div>
    <div className="flex min-h-12 items-center rounded-md border border-dashed border-[var(--gray-7)] p-2">
      {cores.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {cores.map((core) => {
            const sanitizedTooltip = DOMPurify.sanitize(core.tooltip);
            return (
              <div key={`${category}-${core.name}`} className="group relative">
                <button
                  type="button"
                  onClick={() => onToggle(core.name)}
                  disabled={disabled}
                  className={`rounded-full border px-3 py-1 text-xs transition-all ${
                    selectedCore === core.name
                      ? 'border-[var(--accent-10)] bg-[var(--accent-9)] text-white'
                      : 'border-[var(--gray-6)] bg-[var(--gray-1)] text-[var(--gray-11)] hover:bg-[var(--gray-4)]'
                  } ${!disabled ? '' : 'cursor-not-allowed opacity-50'}`}
                >
                  {core.name}
                </button>
                <div
                  role="tooltip"
                  className="pointer-events-none invisible absolute bottom-full left-1/2 z-50 w-80 -translate-x-1/2 -translate-y-2 whitespace-pre-wrap rounded-md border border-[var(--gray-6)] bg-[var(--gray-1)] p-3 text-[var(--gray-12)] opacity-0 shadow-lg transition-opacity duration-300 group-hover:visible group-hover:opacity-100"
                >
                  <div className="mb-1 text-xs font-semibold text-[var(--gray-11)]">
                    상세 효과
                  </div>
                  <div
                    className="text-[11px] leading-5"
                    dangerouslySetInnerHTML={{ __html: sanitizedTooltip }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-xs text-[var(--gray-9)]">-</div>
      )}
    </div>
  </div>
);

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
  <div className="flex flex-col items-center justify-center rounded-lg border border-[var(--gray-5)] bg-[var(--gray-1)] p-4">
    <div className="text-2xl font-bold text-[var(--accent-10)]">{value}</div>
    <div className="mt-1 text-xs text-[var(--gray-11)]">{label}</div>
  </div>
);
