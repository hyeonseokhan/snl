'use client';

import { Button, DropdownMenu } from '@radix-ui/themes';
import { TreeDotVerticalIcon } from './icons/TreeDotVertical';
import { useThemeToggle } from './hooks/theme-toggle';

export default function TopNavSettingButton() {
  const { isDarkMode, toggleTheme, Icon, label } = useThemeToggle();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button size="1" variant="ghost" color="gray" radius="full">
          <TreeDotVerticalIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2" className="w-60">
        <DropdownMenu.Item onClick={toggleTheme}>
          <div className="flex items-center gap-x-2 py-1">
            <Icon />
            {label}
          </div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
