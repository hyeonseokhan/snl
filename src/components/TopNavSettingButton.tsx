'use client';

import { Button, DropdownMenu } from '@radix-ui/themes';
import { TreeDotVerticalIcon } from './icons/TreeDotVertical';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

export default function TopNavSettingButton() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button size="1" variant="ghost" color="gray" radius="full">
          <TreeDotVerticalIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2" className="w-60">
        <ThemeToggleItem />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function ThemeToggleItem() {
  const { theme, systemTheme, setTheme } = useTheme();
  const toggleTheme = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const newTheme = currentTheme == 'dark' ? 'light' : 'dark';
    setTheme(newTheme === systemTheme ? 'system' : newTheme);
  };
  const Icon = theme === 'system' ? SunIcon : MoonIcon;
  const label = theme === 'system' ? '라이트모드 전환' : '다크모드 전환';
  return (
    <DropdownMenu.Item onClick={toggleTheme}>
      <div className="flex items-center gap-x-2 py-1">
        <Icon />
        {label}
      </div>
    </DropdownMenu.Item>
  );
}
