'use client';

import { useTheme } from 'next-themes';
import { IconButton, ThemePanel } from '@radix-ui/themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

export function ThemeTogglePanel() {
  const { systemTheme, setTheme } = useTheme();
  return (
    <ThemePanel
      onAppearanceChange={(newTheme) => {
        const newThemeMatchesSystem = newTheme === systemTheme;
        setTheme(
          newThemeMatchesSystem ? 'system' : (newTheme as 'light' | 'dark'),
        );
      }}
    />
  );
}

export function ThemeToggle({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof IconButton>) {
  const { theme, systemTheme, setTheme } = useTheme();

  return (
    <>
      <style>{`
        :root, .light, .light-theme {
          --theme-toggle-sun-icon-display: block;
          --theme-toggle-moon-icon-display: none;
        }
        .dark, .dark-theme {
          --theme-toggle-sun-icon-display: none;
          --theme-toggle-moon-icon-display: block;
        }
      `}</style>

      <IconButton
        size="3"
        variant="ghost"
        color="gray"
        onClick={() => {
          // Set 'system' theme if the next theme matches the system theme
          const resolvedTheme = theme === 'system' ? systemTheme : theme;
          const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
          const newThemeMatchesSystem = newTheme === systemTheme;
          setTheme(newThemeMatchesSystem ? 'system' : newTheme);
        }}
        {...props}
      >
        <SunIcon
          width="16"
          height="16"
          style={{ display: 'var(--theme-toggle-sun-icon-display)' }}
        />
        <MoonIcon
          width="16"
          height="16"
          style={{ display: 'var(--theme-toggle-moon-icon-display)' }}
        />
      </IconButton>
    </>
  );
}
