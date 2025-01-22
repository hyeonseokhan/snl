'use client';

import React from 'react';
import GoldCalculatorInput from './GoldCalculatorInput';
import GoldCalculatorStatistics from './GoldCalculatorStatistics';
import GoldCalculatorHistory from './GoldCalculatorHistory';

export default function GoldCalculator() {
  return (
    <div className="flex w-full flex-col gap-y-1 md:flex-row md:gap-x-1">
      <div className="flex w-full flex-col gap-y-1 md:w-2/5">
        <GoldCalculatorInput />
        <GoldCalculatorStatistics />
      </div>
      <div className="max-h-[500px] w-full overflow-auto rounded-lg bg-[var(--gray-3)] p-4 md:w-3/5">
        <GoldCalculatorHistory />
      </div>
    </div>
  );
}
