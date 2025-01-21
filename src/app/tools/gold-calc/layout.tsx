import React from 'react';
import { GoldCalculatorProvider } from './gold-calc-context';

export default function GoldCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GoldCalculatorProvider>{children}</GoldCalculatorProvider>;
}
