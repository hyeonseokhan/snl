'use client';

import { Flex, Grid } from '@radix-ui/themes';
import Link from 'next/link';
import { RaidIcon } from '../icons/RaidIcon';
import { PeopleIcon } from '../icons/PeopleIcon';
import { HouseIcon } from '../icons/HouseIcon';
import { CalculatorIcon } from '../icons/CalculatorIcon';
import { HamburgerMenuIcon } from '../icons/HamburgerMenuIcon';
import { usePathname } from 'next/navigation';
import { useThemeColors } from '../UseThemeColors';

export function FooterNav() {
  const pathname = usePathname();
  const colors = useThemeColors();
  return (
    <div className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-center md:hidden">
      <Grid
        columns="5"
        rows="1"
        width="100%"
        align="center"
        height="100%"
        px="2"
        style={{
          backgroundColor: colors.backgroundColor,
        }}
      >
        <Flex align="center" py="2" justify="center">
          <Link href="/raid">
            <RaidIcon viewPage={pathname} target="/raid" />
          </Link>
        </Flex>
        <Flex align="center" py="2" justify="center">
          <Link href="/community">
            <PeopleIcon viewPage={pathname} target="/community" />
          </Link>
        </Flex>
        <Flex align="center" py="2" justify="center">
          <Link href="/">
            <HouseIcon viewPage={pathname} target="/" />
          </Link>
        </Flex>
        <Flex align="center" py="2" justify="center">
          <Link href="/tools">
            <CalculatorIcon viewPage={pathname} target="/tools" />
          </Link>
        </Flex>
        <Flex align="center" py="2" justify="center">
          <HamburgerMenuIcon />
        </Flex>
      </Grid>
    </div>
  );
}
