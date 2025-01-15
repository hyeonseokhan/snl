'use client';

import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { useThemeColors } from '../UseThemeColors';

export const PeopleIcon = ({ viewPage, target }) => {
  return (
    <AccessibleIcon label="PeopleIcon">
      <PeopleIconSVG isActive={viewPage === target} />
    </AccessibleIcon>
  );
};

const PeopleIconSVG = ({ isActive }) => {
  const colors = useThemeColors();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      style={{
        fill: isActive ? colors.activateColor : colors.deactivateColor,
        height: '32px',
        width: '32px',
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
      }}
    >
      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
    </svg>
  );
};
