'use client';

import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { TabNav } from '@radix-ui/themes';
import { SiteConfig } from '../config/global';
import Link from 'next/link';
import TopNavLoginButton from './TopNavLoginButton';
import TopNavSideBarButton from './TopNavSideBarButton';
import TopNavSettingButton from './TopNavSettingButton';

export default function TopNavBar() {
  const pathname = usePathname();
  return (
    <div className="fixed z-30 w-full bg-background">
      {/*Header dark fixed top-0 z-30 hidden w-full bg-background md:block pr-[var(--removed-body-scroll-bar-size)]*/}
      <div className="hidden h-14 flex-wrap items-center justify-between pl-4 pr-5 md:flex">
        {/*hidden h-headerHeight flex-wrap items-center justify-between pl-4 pr-5 md:flex*/}
        <div className="flex items-center gap-1">
          <TopNavSideBarButton />
          <Logo />
          <TabNav.Root>
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
        </div>
        <div className="flex items-center gap-3">
          <TopNavLoginButton />
          <TopNavSettingButton />
        </div>
      </div>
    </div>
  );
}
