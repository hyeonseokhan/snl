import * as React from 'react';
import type { Metadata } from 'next';
import { SiteConfig } from '../config/global';
import { Theme } from '@radix-ui/themes';
import { NextThemeProvider } from './next-theme-provider';
import '@radix-ui/themes/styles.css';
import './globals.css';
import TopNavBar from '../components/TopNavBar';

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
          <Theme asChild accentColor="amber" radius="medium">
            <div id="root">
              <TopNavBar />
              {children}
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}
