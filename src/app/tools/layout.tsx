'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { getFilteredLinks } from '../../config/links';
import { SlashIcon } from '../../components/icons/SlashIcon';
import { usePathname } from 'next/navigation';
import Badge from '../../components/Badge';

export default function ToolsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const links = getFilteredLinks(['goldCalc', 'raidAuction']);
  return (
    <div className="flex flex-col px-4 md:px-36">
      <div className={`flex flex-row py-4`}>
        {links.map((link, index) => {
          const isLast = index === links.length - 1;
          return (
            <div key={link.en} className="flex flex-row items-center">
              <Badge isInvisible={link.isNew}>
                <Link
                  href={link.href}
                  className={`text-xl font-bold hover:text-[var(--gray-12)] hover:transition-all hover:duration-200 ${pathname === link.href ? 'text-[var(--gray-12)]' : 'text-[var(--gray-10)]'}`}
                >
                  {link.ko}
                </Link>
              </Badge>
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
