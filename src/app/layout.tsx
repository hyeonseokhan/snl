import type { Metadata } from 'next';
import { NextThemeProvider } from '@/app/next-theme-provider';
import { SiteConfig } from '@/config/global';
import '@radix-ui/themes/styles.css';
import { ThemeToggle } from '@/app/test';

export const metadata: Metadata = {
  title: {
    default: SiteConfig.name,
    template: `%s - ${SiteConfig.name}`,
  },
  description: SiteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          {/*<Theme asChild>*/}
          {/*  <div id="root">*/}
          {/*<ThemeTogglePanel />*/}
          {/*<Flex*/}
          {/*  height="100vh"*/}
          {/*  width="100vw"*/}
          {/*  align="center"*/}
          {/*  justify="center"*/}
          {/*>*/}
          {/*  <ThemeToggle />*/}
          {/*</Flex>*/}
          <ThemeToggle />
          {children}
          {/*</div>*/}
          {/*</Theme>*/}
        </NextThemeProvider>
      </body>
    </html>
  );
}
