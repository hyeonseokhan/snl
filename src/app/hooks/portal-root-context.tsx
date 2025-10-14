'use client';

/**
 * @file portal-root-context.tsx – 포탈 루트 컨텍스트
 * - 이 파일의 모든 주석은 한글로 작성합니다.
 * - 역할: Floating UI의 Portal이 렌더링될 DOM 노드를 하위 컴포넌트에 제공합니다.
 */

import { createContext, type RefObject } from 'react';

export const PortalRootContext = createContext<RefObject<HTMLElement> | null>(
  null,
);
