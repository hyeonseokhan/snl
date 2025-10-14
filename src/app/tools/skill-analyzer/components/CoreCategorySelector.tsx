'use client';

import React from 'react';
import { CoreTooltip } from './CoreTooltip';

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
          {cores.map((core) => (
            <CoreTooltip
              key={core.name}
              name={core.name}
              tooltip={core.tooltip}
              isSelected={selectedCore === core.name}
              disabled={disabled}
              onClick={() => onToggle(core.name)}
            />
          ))}
        </div>
      ) : (
        <div className="text-xs text-[var(--gray-9)]">-</div>
      )}
    </div>
  </div>
);
