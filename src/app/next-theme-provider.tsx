'use client';

import * as React from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { Theme } from '@radix-ui/themes';
import { useLocalStorage } from '../utils/use-local-storage';
import { generateRadixColors } from '../utils/generateRadixColors';
import Color from 'colorjs.io';

export function NextThemeProvider({ children }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [lightAccentValue, setLightAccentValue] = useLocalStorage(
    'colors/light/accent',
    '#eb9100',
  );
  const [lightGrayValue, setLightGrayValue] = useLocalStorage(
    'colors/light/gray',
    '#393b44',
  );
  const [lightBgValue, setLightBgValue] = useLocalStorage(
    'colors/light/background',
    '#fafafa',
  );
  const [darkAccentValue, setDarkAccentValue] = useLocalStorage(
    'colors/dark/accent',
    '#f59e0b',
  );
  const [darkGrayValue, setDarkGrayValue] = useLocalStorage(
    'colors/dark/gray',
    '#6b7280',
  );
  const [darkBgValue, setDarkBgValue] = useLocalStorage(
    'colors/dark/background',
    '#141517',
  );

  const lightModeResult = generateRadixColors({
    appearance: 'light',
    accent: lightAccentValue,
    gray: lightGrayValue,
    background: lightBgValue,
  });

  const darkModeResult = generateRadixColors({
    appearance: 'dark',
    accent: darkAccentValue,
    gray: darkGrayValue,
    background: darkBgValue,
  });

  const result = resolvedTheme === 'dark' ? darkModeResult : lightModeResult;
  const accent = getColorName(result.accentScale[8]);
  return (
    <ThemeProvider attribute="class">
      <style
        dangerouslySetInnerHTML={{
          __html: getNewPreviewStyles({
            lightColors: lightModeResult,
            darkColors: darkModeResult,
          }),
        }}
      />
      <Theme
        accentColor={
          accent as React.ComponentPropsWithoutRef<typeof Theme>['accentColor']
        }
        radius="medium"
      >
        {children}
      </Theme>
    </ThemeProvider>
  );
}

const getNewPreviewStyles = ({
  lightColors,
  darkColors,
}: GetNewPreviewStylesParams) => {
  const lightAccentColorsCss = getColorScaleCss({
    isDarkMode: false,
    name: getColorName(lightColors.accentScale[8]),
    contrast: lightColors.accentContrast,
    scale: lightColors.accentScale,
    scaleWideGamut: lightColors.accentScaleWideGamut,
    scaleAlpha: lightColors.accentScaleAlpha,
    scaleAlphaWideGamut: lightColors.accentScaleAlphaWideGamut,
    surface: lightColors.accentSurface,
    surfaceWideGamut: lightColors.accentSurfaceWideGamut,
  });

  const lightGrayColorsCss = getColorScaleCss({
    isDarkMode: false,
    name: 'gray',
    contrast: '#fff',
    scale: lightColors.grayScale,
    scaleWideGamut: lightColors.grayScaleWideGamut,
    scaleAlpha: lightColors.grayScaleAlpha,
    scaleAlphaWideGamut: lightColors.grayScaleAlphaWideGamut,
    surface: lightColors.graySurface,
    surfaceWideGamut: lightColors.graySurfaceWideGamut,
  });

  const darkAccentColorsCss = getColorScaleCss({
    isDarkMode: true,
    name: getColorName(darkColors.accentScale[8]),
    contrast: darkColors.accentContrast,
    scale: darkColors.accentScale,
    scaleWideGamut: darkColors.accentScaleWideGamut,
    scaleAlpha: darkColors.accentScaleAlpha,
    scaleAlphaWideGamut: darkColors.accentScaleAlphaWideGamut,
    surface: darkColors.accentSurface,
    surfaceWideGamut: darkColors.accentSurfaceWideGamut,
  });

  const darkGrayColorsCss = getColorScaleCss({
    isDarkMode: true,
    name: 'gray',
    contrast: '#fff',
    scale: darkColors.grayScale,
    scaleWideGamut: darkColors.grayScaleWideGamut,
    scaleAlpha: darkColors.grayScaleAlpha,
    scaleAlphaWideGamut: darkColors.grayScaleAlphaWideGamut,
    surface: darkColors.graySurface,
    surfaceWideGamut: darkColors.graySurfaceWideGamut,
  });

  const lightBackgroundCss = getBackgroundColorCss({
    isDarkMode: false,
    background: lightColors.background,
  });

  const darkBackgroundCss = getBackgroundColorCss({
    isDarkMode: true,
    background: darkColors.background,
  });

  return `
[data-accent-color='custom'] {
  --accent-1: var(--custom-1);
  --accent-2: var(--custom-2);
  --accent-3: var(--custom-3);
  --accent-4: var(--custom-4);
  --accent-5: var(--custom-5);
  --accent-6: var(--custom-6);
  --accent-7: var(--custom-7);
  --accent-8: var(--custom-8);
  --accent-9: var(--custom-9);
  --accent-10: var(--custom-10);
  --accent-11: var(--custom-11);
  --accent-12: var(--custom-12);

  --accent-a1: var(--custom-a1);
  --accent-a2: var(--custom-a2);
  --accent-a3: var(--custom-a3);
  --accent-a4: var(--custom-a4);
  --accent-a5: var(--custom-a5);
  --accent-a6: var(--custom-a6);
  --accent-a7: var(--custom-a7);
  --accent-a8: var(--custom-a8);
  --accent-a9: var(--custom-a9);
  --accent-a10: var(--custom-a10);
  --accent-a11: var(--custom-a11);
  --accent-a12: var(--custom-a12);

  --accent-contrast: var(--custom-contrast);
  --accent-surface: var(--custom-surface);
  --accent-indicator: var(--custom-indicator);
  --accent-track: var(--custom-track);
}

${lightBackgroundCss}
${lightAccentColorsCss}
${lightGrayColorsCss}
${darkBackgroundCss}
${darkAccentColorsCss}
${darkGrayColorsCss}
  `.trim();
};

const getColorName = (value: string) => {
  const color = new Color(value).to('hsl');

  if (color.coords[1] < 25) {
    return 'custom';
  }
  if (color.coords[0] >= 0 && color.coords[0] < 20) {
    return 'red';
  }
  if (color.coords[0] >= 20 && color.coords[0] < 40) {
    return 'orange';
  }
  if (color.coords[0] >= 40 && color.coords[0] < 65) {
    return 'yellow';
  }
  if (color.coords[0] >= 65 && color.coords[0] < 100) {
    return 'lime';
  }
  if (color.coords[0] >= 100 && color.coords[0] < 165) {
    return 'green';
  }
  if (color.coords[0] >= 165 && color.coords[0] < 190) {
    return 'teal';
  }
  if (color.coords[0] >= 190 && color.coords[0] < 240) {
    return 'blue';
  }
  if (color.coords[0] >= 240 && color.coords[0] < 270) {
    return 'violet';
  }
  if (color.coords[0] >= 270 && color.coords[0] < 320) {
    return 'purple';
  }
  if (color.coords[0] >= 320 && color.coords[0] < 340) {
    return 'pink';
  }

  return 'red';
};

const getColorScaleCss = ({
  isDarkMode,
  name,
  scale,
  scaleWideGamut,
  scaleAlpha,
  scaleAlphaWideGamut,
  contrast,
  surface,
  surfaceWideGamut,
}: GetColorScaleCssParams) => {
  const selector = isDarkMode
    ? '.dark, .dark-theme'
    : ':root, .light, .light-theme';

  return `
${selector} {
  ${scale.map((value, index) => `--${name}-${index + 1}: ${value};`).join('\n  ')}

  ${scaleAlpha.map((value, index) => `--${name}-a${index + 1}: ${value};`).join('\n  ')}

  --${name}-contrast: ${contrast};
  --${name}-surface: ${surface};
  --${name}-indicator: ${scale[8]};
  --${name}-track: ${scale[8]};
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    ${selector} {
      ${scaleWideGamut.map((value, index) => `--${name}-${index + 1}: ${value};`).join('\n      ')}

      ${scaleAlphaWideGamut
        .map((value, index) => `--${name}-a${index + 1}: ${value};`)
        .join('\n      ')}

      --${name}-contrast: ${contrast};
      --${name}-surface: ${surfaceWideGamut};
      --${name}-indicator: ${scaleWideGamut[8]};
      --${name}-track: ${scaleWideGamut[8]};
    }
  }
}
  `.trim();
};

type GeneratedColors = ReturnType<typeof generateRadixColors>;

interface GetColorScaleCssParams {
  isDarkMode: boolean;
  name: string;
  scale: GeneratedColors['accentScale'];
  scaleWideGamut: GeneratedColors['accentScaleWideGamut'];
  scaleAlpha: GeneratedColors['accentScaleAlpha'];
  scaleAlphaWideGamut: GeneratedColors['accentScaleAlphaWideGamut'];
  contrast: GeneratedColors['accentContrast'];
  surface: GeneratedColors['accentSurface'];
  surfaceWideGamut: GeneratedColors['accentSurfaceWideGamut'];
}

const getBackgroundColorCss = ({
  isDarkMode,
  background,
}: {
  isDarkMode: boolean;
  background: string;
}) => {
  if (isDarkMode) {
    return `
.dark, .dark-theme, :is(.dark, .dark-theme) :where(.radix-themes:not(.light, .light-theme)) {
  --color-background: ${background};
}
html, body {
  background-color: ${background};
}
    `.trim();
  }

  return `
:root, .light, .light-theme, .radix-themes {
  --color-background: ${background};
}
html, body {
  background-color: ${background};
}
  `.trim();
};

interface GetNewPreviewStylesParams {
  selector?: string;
  lightColors: GeneratedColors;
  darkColors: GeneratedColors;
}
