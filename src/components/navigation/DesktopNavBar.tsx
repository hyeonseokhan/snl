import { Flex, TabNav } from '@radix-ui/themes';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoButton from '../LogoButton';
import TopNavLoginButton from '../TopNavLoginButton';
import TopNavSettingButton from '../TopNavSettingButton';
import { getFilteredLinks } from '../../config/links';
import { SideBarIcon } from '../icons/SideBarIcon';
import SideBar from '../SideBar';

export function DesktopNavBar() {
  const pathname = usePathname();
  const links = getFilteredLinks(['todo', 'community', 'tools']);
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
        <TabNav.Root>
          {/*https://www.radix-ui.com/primitives/docs/components/navigation-menu*/}
          {links.map((link) => {
            return (
              <TabNav.Link
                key={link.en}
                asChild
                active={pathname === link.href}
                className="px-3 py-2"
              >
                <Link key={link.en} href={link.href}>
                  <span className="font-bold">{link.ko}</span>
                </Link>
              </TabNav.Link>
            );
          })}
        </TabNav.Root>
      </Flex>
      <Flex align="center" gap="3">
        <TopNavLoginButton />
        <TopNavSettingButton />
      </Flex>
    </div>
  );
}
