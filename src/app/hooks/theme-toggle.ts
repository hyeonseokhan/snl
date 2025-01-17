import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

export function useThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const toggleTheme = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme === systemTheme ? 'system' : newTheme);
  };
  const isDarkMode =
    theme === 'dark' || (theme === 'system' && systemTheme === 'dark');
  const Icon = isDarkMode ? SunIcon : MoonIcon;
  const label = isDarkMode ? '라이트모드 전환' : '다크모드 전환';
  return { isDarkMode, toggleTheme, Icon, label };
}
