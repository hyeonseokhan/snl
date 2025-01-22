import React from 'react';
import { GoldCalculatorProvider } from './gold-calc-context';

const title = '골드구매 계산기';
export const metadata = {
  title,
  openGraph: {
    title,
  },
};

export default function GoldCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GoldCalculatorProvider>{children}</GoldCalculatorProvider>;
}
