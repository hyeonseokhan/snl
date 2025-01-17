export const links: Links = {
  home: {
    ko: '홈',
    en: 'home',
    href: '/',
  },
  todo: {
    ko: '내 숙제',
    en: 'todo',
    href: '/todo',
  },
  community: {
    ko: '커뮤니티',
    en: 'community',
    href: '/community',
  },
  tools: {
    ko: '도구모음',
    en: 'tools',
    href: '/tools',
  },
} as const;

interface LinkItem {
  ko: string;
  en: string;
  href: string;
}

type Links = Record<string, LinkItem>;

export function getLink(key: keyof typeof links): LinkItem {
  return links[key];
}

export function getFilteredLinks(
  keys: (keyof typeof links)[],
): (typeof links)[keyof typeof links][] {
  return Object.entries(links)
    .filter(([key]) => keys.includes(key as keyof typeof links))
    .map(([, value]) => value);
}
