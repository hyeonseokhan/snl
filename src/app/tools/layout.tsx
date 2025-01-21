'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { getFilteredLinks, getLink } from '../../config/links';
import { SlashIcon } from '../../components/icons/SlashIcon';
import { usePathname } from 'next/navigation';

export default function ToolsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const toolsPath = getLink('tools');
  const links = getFilteredLinks(['goldCalc', 'raidAuction']);
  return (
    <div className="flex flex-col px-4 md:px-36">
      <div
        className={`${toolsPath.href === pathname ? 'hidden' : ''} flex flex-row py-4`}
      >
        {links.map((link, index) => {
          const isLast = index === links.length - 1;
          return (
            <div key={link.en} className="flex flex-row items-center">
              <Link
                href={link.href}
                className={`text-xl font-bold hover:text-[var(--gray-12)] hover:transition-all hover:duration-200 ${pathname === link.href ? 'text-[var(--gray-12)]' : 'text-[var(--gray-10)]'}`}
              >
                {link.ko}
              </Link>
              {link.isNew ? (
                <span className="px-2 text-sm font-semibold text-red-700">
                  new
                </span>
              ) : null}
              {!isLast && (
                <span className="px-2">
                  <SlashIcon />
                </span>
              )}
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
}
