'use client';

/**
 * @file BaseTooltip.tsx – floating-ui 기반의 범용 툴팁 컴포넌트
 * - 이 파일의 모든 주석은 한글로 작성합니다.
 * - 역할: 툴팁의 위치를 동적으로 계산하고 화면을 벗어나지 않도록 처리하는 로직을 캡슐화합니다.
 */

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react';
import { useState, useMemo, cloneElement } from 'react';
import type { Placement } from '@floating-ui/react';
import type { FC, ReactNode, ReactElement } from 'react';

// === 타입 정의 =================================================================
export interface BaseTooltipProps {
  /** 툴팁을 트리거할 React 엘리먼트 (children) */
  children: ReactElement;
  /** 툴팁에 표시될 내용 (React 노드) */
  content: ReactNode;
  /** 툴팁의 기본 위치 (기본값: 'top') */
  placement?: Placement;
}

// === 컴포넌트 ==================================================================
/**
 * floating-ui를 사용하여 동적으로 위치가 조절되는 범용 툴팁 컴포넌트입니다.
 * @param {ReactElement} children - 툴팁을 여는 트리거 엘리먼트입니다.
 * @param {ReactNode} content - 툴팁 내부에 표시될 콘텐츠입니다.
 * @param {Placement} [placement='top'] - 툴팁이 표시될 기본 위치입니다.
 */
export const BaseTooltip: FC<BaseTooltipProps> = ({
  children,
  content,
  placement = 'top',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // --- floating-ui 설정 ----------------------------------------------------
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    // 툴팁이 화면 밖에 있을 때 자동으로 업데이트
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10), // 트리거 엘리먼트와의 간격
      flip({ fallbackAxisSideDirection: 'start' }), // 화면에서 벗어날 경우 반대편으로 플립
      shift(), // 화면 안에 있도록 위치 조정
    ],
  });

  // --- 인터랙션 설정 ------------------------------------------------------
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' }); // 스크린 리더를 위한 역할 설정

  // 모든 인터랙션을 병합하여 props getter 생성
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  // --- 렌더링 -------------------------------------------------------------
  // children(트리거)에 참조 props를 복제하여 전달
  const trigger = useMemo(
    () => cloneElement(children, getReferenceProps({ ref: refs.setReference })),
    [children, getReferenceProps, refs.setReference],
  );

  return (
    <>
      {trigger}
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-50 w-max max-w-[80vw] whitespace-pre-wrap rounded-xl border border-[var(--gray-6)] bg-[var(--gray-2)] p-3 text-[var(--gray-12)] shadow-lg"
          >
            {content}
          </div>
        )}
      </FloatingPortal>
    </>
  );
};
