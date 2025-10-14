'use client';

import React from 'react';

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
  <div className="flex w-full flex-col pb-4 xl:w-1/5 xl:gap-y-3 xl:pb-0 xl:pr-8">
    <div className="text-[var(--gray-12)]">{title}</div>
    <div className="text-sm text-[var(--gray-9)]">{description}</div>
  </div>
);
