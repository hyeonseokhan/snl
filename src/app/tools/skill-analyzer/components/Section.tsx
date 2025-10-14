'use client';

/**
 * @file Section.tsx – 콘텐츠 섹션 레이아웃 컴포넌트
 * - 모든 주석은 한글로 작성합니다.
 * - 좌측에는 SectionHeader, 우측에는 children을 렌더링하는 공통 레이아웃을 제공합니다.
 */
import React from 'react';
import { SectionHeader } from './SectionHeader';

export interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  as?: React.ElementType;
  [key: string]: any; // 나머지 props를 받을 수 있도록 인덱스 시그니처 추가
}

export const Section: React.FC<SectionProps> = ({
  title,
  description,
  children,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className="block w-full flex-row border-t border-[var(--gray-5)] pt-3 md:flex"
      {...props}
    >
      <SectionHeader title={title} description={description} />
      <div className="w-full md:w-9/12">{children}</div>
    </Component>
  );
};
