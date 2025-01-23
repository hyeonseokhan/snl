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
    href: '/tools/gold-calc',
    icon: CalculatorIcon,
  },
  goldCalc: {
    ko: '골드 구매 계산기',
    en: 'gold-calc',
    href: '/tools/gold-calc',
    description: '골드 구매시 시세와 거래 수수료를 계산해 주는 도구',
    isNew: false,
  },
  raidAuction: {
    ko: '레이드 경매 계산기',
    en: 'raid-auction',
    description: '레이드 경매 보상에 대한 적절한 입찰금 계산 도구',
    href: '/tools/raid-auction',
    isNew: true,
  },
} as const;

export interface LinkItem {
  ko: string;
  en: string;
  href: string;
  isNew?: boolean;
  description?: string;
  icon?: React.FC<{ viewPage: string; target: string }>;
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
