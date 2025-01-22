'use client';

import { useGoldCalculatorContext } from './gold-calc-context';

type StatisticRowType = {
  title: string;
  description: string;
  value: string;
};

const StatisticRow = ({ title, description, value }: StatisticRowType) => {
  return (
    <div className="flex w-full flex-row gap-x-2 p-2">
      <div className="flex w-1/2 flex-col">
        <div className="text-left font-semibold text-[var(--gray-11)]">
          {title}
        </div>
        <div className="text-left text-sm text-[var(--gray-8)]">
          {description}
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center text-lg text-[var(--gray-11)]">
        {value}
      </div>
    </div>
  );
};

export default function GoldCalculatorStatistics() {
  const context = useGoldCalculatorContext();
  return (
    <div className="w-full rounded-lg bg-[var(--gray-3)] p-3">
      <StatisticRow
        title="평균 현금 시세"
        description="계산된 내역의 '현금 시세'의 평균값"
        value={context.statistics.averageCash}
      />
      <StatisticRow
        title="현금 지출 합계"
        description="계산된 내역의 '현금 지출'의 합계값"
        value={context.statistics.totalCashExpense}
      />
      <StatisticRow
        title="실수령 골드 합계"
        description="계산된 내역의 '실수령 골드'의 합계값"
        value={context.statistics.totalDeductedGold}
      />
    </div>
  );
}
