import { Box, Button, DropdownMenu, Flex } from '@radix-ui/themes';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SideBar from '../SideBar';
import LogoButton from '../LogoButton';
import { getFilteredLinks } from '../../config/links';
import { SideBarIcon } from '../icons/SideBarIcon';
import { DiscordIcon } from '../icons/DiscordIcon';
import { TreeDotVerticalIcon } from '../icons/TreeDotVertical';
import { useThemeToggle } from '../../app/hooks/theme-toggle';

const DesktopNavBar = () => {
  const pathname = usePathname();
  const links = getFilteredLinks(['todo', 'community', 'tools']);
  const { toggleTheme, Icon, label } = useThemeToggle();
  return (
    <div className="hidden h-14 flex-wrap items-center justify-between pl-4 pr-5 md:flex">
      <Flex align="center" gap="1">
        <SideBar.Root>
          <SideBar.Button>
            <SideBarIcon />
          </SideBar.Button>
          <SideBar.Content position="left">
            <div>Hello World</div>
          </SideBar.Content>
        </SideBar.Root>
        <LogoButton />
        <Flex direction="row">
          {links.map((link) => {
            return (
              <Box
                key={link.en}
                asChild
                className={`rounded-md px-3 py-2 transition-all duration-200 hover:bg-[var(--gray-5)] hover:bg-opacity-10 hover:text-[var(--gray-12)] ${pathname === link.href ? 'text-[var(--gray-12)]' : 'text-[var(--gray-10)]'}`}
              >
                <Link href={link.href} className="font-bold">
                  {link.ko}
                </Link>
              </Box>
            );
          })}
        </Flex>
      </Flex>
      <Flex align="center" gap="3">
        <Button size="2" variant="soft" color="gray" radius="full">
          <DiscordIcon />
          <span className="font-bold">디스코드 로그인</span>
        </Button>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button size="1" variant="ghost" color="gray" radius="full">
              <TreeDotVerticalIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            size="2"
            className="w-60"
            color="gray"
            variant="soft"
          >
            <DropdownMenu.Item onClick={toggleTheme}>
              <div className="flex items-center gap-x-2 py-1">
                <Icon />
                {label}
              </div>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </div>
  );
};

export default DesktopNavBar;
