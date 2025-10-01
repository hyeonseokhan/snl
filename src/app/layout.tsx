import * as React from 'react';

import type { Metadata } from 'next';
import { NextThemeProvider } from './next-theme-provider';
import { TestModeProvider } from './hooks/test-mode-context';
import { siteConfig } from '../config/global';
import { Navigation } from './navigation';
import '@radix-ui/themes/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
          <TestModeProvider>
            <Navigation>{children}</Navigation>
          </TestModeProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
