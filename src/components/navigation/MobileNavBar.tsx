'use client';

import { Flex, Grid, IconButton } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RaidIcon } from '../icons/RaidIcon';
import { PeopleIcon } from '../icons/PeopleIcon';
import { HouseIcon } from '../icons/HouseIcon';
import { CalculatorIcon } from '../icons/CalculatorIcon';
import { useThemeColors } from '../UseThemeColors';
import { HamburgerMenuIcon } from '../icons/HamburgerMenuIcon';
import LogoButton from '../LogoButton';
import { useThemeToggle } from '../../app/hooks/theme-toggle';
import SideBar from '../SideBar';

const MobileNavBar = () => {
  const pathname = usePathname();
  const colors = useThemeColors();
  const { Icon, toggleTheme } = useThemeToggle();
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
        <SideBar.Root>
          <SideBar.Button>
            <HamburgerMenuIcon />
          </SideBar.Button>
          <SideBar.Content position="right">
            <Flex direction="column" width="100%">
              <Flex direction="column" gap="2" width="100%">
                <Flex direction="row" justify="between" align="center">
                  <LogoButton />
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
          </SideBar.Content>
        </SideBar.Root>
      </Grid>
    </div>
  );
};

export default MobileNavBar;
