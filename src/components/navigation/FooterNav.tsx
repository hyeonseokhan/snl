'use client';

import { Box, Flex, Grid, IconButton } from '@radix-ui/themes';
import Link from 'next/link';
import { RaidIcon } from '../icons/RaidIcon';
import { PeopleIcon } from '../icons/PeopleIcon';
import { HouseIcon } from '../icons/HouseIcon';
import { CalculatorIcon } from '../icons/CalculatorIcon';
import { usePathname } from 'next/navigation';
import { useThemeColors } from '../UseThemeColors';
import { useEffect, useRef, useState } from 'react';
import { HamburgerMenuIcon } from '../icons/HamburgerMenuIcon';
import Logo from '../Logo';
import { useThemeToggle } from '../hooks/theme-toggle';

export function FooterNav() {
  const pathname = usePathname();
  const colors = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);
  const target = useRef<HTMLDivElement>(null);
  const { Icon, toggleTheme } = useThemeToggle();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (target.current && !target.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);
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
        <Box className="relative">
          <Flex
            align="center"
            py="2"
            justify="center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <HamburgerMenuIcon />
          </Flex>
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ${
              isOpen ? 'opacity-30' : 'pointer-events-none opacity-0'
            } z-40`}
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={target}
            className={`fixed right-0 top-0 z-50 h-full w-3/4 transform p-5 shadow-lg transition-transform duration-300 ${
              isOpen
                ? 'translate-x-0 opacity-100'
                : 'translate-x-full opacity-0'
            }`}
            style={{
              transitionProperty: 'transform, opacity',
              backgroundColor: colors.backgroundColor,
            }}
          >
            <Flex direction="column" width="100%">
              <Flex direction="column" gap="2" width="100%">
                <Flex direction="row" justify="between" align="center">
                  <Logo />
                  <IconButton
                    size="2"
                    color="gray"
                    variant="surface"
                    onClick={toggleTheme}
                  >
                    <Icon />
                  </IconButton>
                </Flex>
                <hr className="border-t-[0.5px] border-gray-400 px-1 opacity-30" />
              </Flex>
            </Flex>
          </div>
        </Box>
      </Grid>
    </div>
  );
}
