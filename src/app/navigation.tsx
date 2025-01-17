'use client';

import { Flex } from '@radix-ui/themes';
import { MobileNavBar } from '../components/navigation/MobileNavBar';
import { DesktopNavBar } from '../components/navigation/DesktopNavBar';

export function Navigation({ children }) {
  return (
    <Flex direction="column" width="100%">
      <DesktopNavBar />
      <main className="bg-blue-600">{children}</main>
      <MobileNavBar />
    </Flex>
  );
}
