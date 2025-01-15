'use client';

import { Flex, TabNav } from '@radix-ui/themes';
import TopNavSideBarButton from '../components/TopNavSideBarButton';
import Logo from '../components/Logo';
import { SiteConfig } from '../config/global';
import Link from 'next/link';
import TopNavLoginButton from '../components/TopNavLoginButton';
import TopNavSettingButton from '../components/TopNavSettingButton';
import { usePathname } from 'next/navigation';
import { FooterNav } from '../components/navigation/FooterNav';

export function NavigationBar({ children }) {
  const pathname = usePathname();
  return (
    <Flex direction="column" width="100%">
      {/*상단 네비게이션 바*/}
      <div className="hidden h-14 flex-wrap items-center justify-between pl-4 pr-5 md:flex">
        <Flex align="center" gap="1">
          <TopNavSideBarButton />
          <Logo />
          <TabNav.Root>
            {/*https://www.radix-ui.com/primitives/docs/components/navigation-menu*/}
            {SiteConfig.topNavItems.map((item) => {
              return (
                <TabNav.Link
                  key={item.slug}
                  asChild
                  active={pathname === `/${item.slug}`}
                  className="px-3 py-2"
                >
                  <Link key={item.slug} href={`/${item.slug}`}>
                    <span className="font-bold">{item.name}</span>
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
      <Flex className="bg-blue-600">{children}</Flex>
      <FooterNav />
    </Flex>
  );
}
