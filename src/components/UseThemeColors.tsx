'use client';

import { useTheme } from 'next-themes';

export const useThemeColors = () => {
  const { resolvedTheme } = useTheme();

  const darkBgValue =
    localStorage.getItem('colors/dark/background') ?? '#212121';
  const lightBgValue =
    localStorage.getItem('colors/light/background') ?? '#F6F3EF';
  const backgroundColor = resolvedTheme === 'dark' ? darkBgValue : lightBgValue;

  const darkGrayValue = localStorage.getItem('colors/dark/gray') ?? '#8B8D98';
  const lightGrayValue = localStorage.getItem('colors/light/gray') ?? '#787982';
  const grayColor = resolvedTheme === 'dark' ? darkGrayValue : lightGrayValue;

  const darkAccentValue =
    localStorage.getItem('colors/dark/accent') ?? '#DD7C3C';
  const lightAccentValue =
    localStorage.getItem('colors/light/accent') ?? '#DD7C3C';
  const accentColor =
    resolvedTheme === 'dark' ? darkAccentValue : lightAccentValue;

  const activateColor = resolvedTheme === 'dark' ? lightBgValue : darkBgValue;
  const deactivateColor =
    resolvedTheme === 'dark' ? lightGrayValue : darkGrayValue;

  return {
    backgroundColor,
    grayColor,
    accentColor,
    activateColor,
    deactivateColor,
  };
};
