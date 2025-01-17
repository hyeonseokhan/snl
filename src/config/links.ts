import * as React from 'react';
import { HouseIcon } from '../components/icons/HouseIcon';
import { RaidIcon } from '../components/icons/RaidIcon';
import { PeopleIcon } from '../components/icons/PeopleIcon';
import { CalculatorIcon } from '../components/icons/CalculatorIcon';

export const links: Links = {
  home: {
    ko: '홈',
    en: 'home',
    href: '/',
    icon: HouseIcon,
  },
  todo: {
    ko: '내 숙제',
    en: 'todo',
    href: '/todo',
    icon: RaidIcon,
  },
  community: {
    ko: '커뮤니티',
    en: 'community',
    href: '/community',
    icon: PeopleIcon,
  },
  tools: {
    ko: '도구모음',
    en: 'tools',
    href: '/tools',
    icon: CalculatorIcon,
  },
} as const;

interface LinkItem {
  ko: string;
  en: string;
  href: string;
  icon: React.FC<{ viewPage: string; target: string }>;
}

type Links = Record<string, LinkItem>;

export function getLink(key: keyof typeof links): LinkItem {
  return links[key];
}

export function getFilteredLinks(
  keys: (keyof typeof links)[],
): (typeof links)[keyof typeof links][] {
  return keys.filter((key) => key in links).map((key) => links[key]);
}
