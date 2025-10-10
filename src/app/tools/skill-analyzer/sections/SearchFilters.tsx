/**
 * @file SearchFilters – 코어 선택 섹션
 * - 이 파일의 모든 주석은 한글로 작성합니다.
 * - 기능 변경 없이 가독성과 성능(불필요한 렌더 최소화)에 초점을 맞춘 프레젠테이션 컴포넌트입니다.
 */
'use client';

import React, { useMemo } from 'react';
import { SectionHeader, CoreCategorySelector } from '../components';
import type { CoreMeta } from '../types';

// === 타입 정의 =================================================================

export interface SearchFiltersProps {
  isAnalyzing: boolean;
  preparedData: any[];
  coreOptions: string[];
  coreOptionsByCategory: {
    sun: CoreMeta[];
    moon: CoreMeta[];
    star: CoreMeta[];
  };
  selectedCoresByCategory: { sun?: string; moon?: string; star?: string };
  toggleCore: (name: string) => void;
  coresEnabled: boolean;
}

// === 컴포넌트 ==================================================================

/**
 * 조건 상세(아크그리드 코어) 선택 섹션
 * - 코어가 있을 때만 섹션을 렌더하고, 옵션 노드들을 useMemo로 캐싱합니다.
 */
export const SearchFilters: React.FC<SearchFiltersProps> = ({
  isAnalyzing,
  preparedData,
  coreOptions,
  coreOptionsByCategory,
  selectedCoresByCategory,
  toggleCore,
  coresEnabled,
}) => {
  // --- 렌더 조건 가드 -----------------------------------------------------------
  const showSection = preparedData.length > 0 && !isAnalyzing;

  // --- 메모이제이션된 뷰 조각 --------------------------------------------------
  const hasCoreOptions = useMemo(
    () => coreOptions.length > 0,
    [coreOptions.length],
  );

  const categoryNodes = useMemo(
    () => (
      <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
        <CoreCategorySelector
          title="질서의 해 코어"
          category="sun"
          cores={coreOptionsByCategory.sun}
          selectedCore={selectedCoresByCategory.sun}
          onToggle={toggleCore}
          disabled={!coresEnabled}
        />
        <CoreCategorySelector
          title="질서의 달 코어"
          category="moon"
          cores={coreOptionsByCategory.moon}
          selectedCore={selectedCoresByCategory.moon}
          onToggle={toggleCore}
          disabled={!coresEnabled}
        />
        <CoreCategorySelector
          title="질서의 별 코어"
          category="star"
          cores={coreOptionsByCategory.star}
          selectedCore={selectedCoresByCategory.star}
          onToggle={toggleCore}
          disabled={!coresEnabled}
        />
      </div>
    ),
    [coreOptionsByCategory, selectedCoresByCategory, toggleCore, coresEnabled],
  );

  // --- 렌더 --------------------------------------------------------------------
  if (!showSection) return null;

  return (
    <div className="block w-full flex-row border-t border-[var(--gray-5)] pb-3 pt-3 md:flex">
      <SectionHeader
        title="조건 상세"
        description="사용 코어를 선택해 조건을 세부 설정합니다."
      />
      <div className="w-full md:w-9/12">
        <div className="inline-flex w-fit max-w-full flex-col gap-3 self-start md:w-auto">
          {hasCoreOptions ? (
            categoryNodes
          ) : (
            <span className="text-sm text-[var(--gray-9)]" aria-live="polite">
              직업 각인을 선택하면 코어가 표시됩니다.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
