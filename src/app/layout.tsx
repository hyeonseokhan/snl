import * as React from 'react';

import type { Metadata } from 'next';
import { siteConfig } from '../config/global';
import { NextThemeProvider } from './next-theme-provider';
import '@radix-ui/themes/styles.css';
import './globals.css';
import { Navigation } from './navigation';

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
          <Navigation>{children}</Navigation>
        </NextThemeProvider>
      </body>
    </html>
  );
}
