'use client';

import { Flex } from '@radix-ui/themes';
import MobileNavBar from '../components/navigation/MobileNavBar';
import DesktopNavBar from '../components/navigation/DesktopNavBar';

export function Navigation({ children }) {
  return (
    <Flex direction="column" width="100%" className="pb-16 md:mb-0">
      <DesktopNavBar />
      <MobileNavBar />
      {children}
    </Flex>
  );
}
