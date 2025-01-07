'use client';

import { usePathname } from 'next/navigation';
import { HamburgerMenuIcon } from './icons/HamburgerMenuIcon';
import Logo from './Logo';
import { TabNav } from '@radix-ui/themes';
import { SiteConfig } from '../config/global';
import Link from 'next/link';

export default function TopNavBar() {
  const pathname = usePathname();
  return (
    <div className="fixed z-30">
      {' '}
      /*TODO 컨테이너나 다른 박스로 처리가능 여부 확인*/
      {/*class="Header dark fixed top-0 z-30 hidden w-full bg-background md:block pr-[var(--removed-body-scroll-bar-size)]"*/}
      <div className="hidden h-14 flex-wrap items-center justify-between pl-4 pr-5 md:flex">
        <div className="flex items-center gap-1">
          <HamburgerMenuIcon />
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
                    <span className="font-sans font-bold">{item.name}</span>
                  </Link>
                </TabNav.Link>
              );
            })}
          </TabNav.Root>
        </div>
      </div>
    </div>
  );
}
