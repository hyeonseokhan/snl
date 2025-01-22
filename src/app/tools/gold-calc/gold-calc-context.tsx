'use client';

import React, { useMemo } from 'react';
import { useLocalStorage } from '../../../utils/use-local-storage';

type GoldHistory = {
  key: string;
  cash: string;
  goldAmount: string;
  cashExpense: string;
  deductedGold: string;
};

type GoldHistoryStatistics = {
  averageCash: string;
  totalCashExpense: string;
  totalDeductedGold: string;
};

type GoldCalculatorContextType = {
  histories: GoldHistory[];
  setGoldHistory: React.Dispatch<React.SetStateAction<GoldHistory[]>>;
  statistics: GoldHistoryStatistics;
};

const GoldCalculatorContext = React.createContext<
  GoldCalculatorContextType | undefined
>(undefined);

export function GoldCalculatorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [histories, setGoldHistory] = useLocalStorage<GoldHistory[]>(
    'tools/gold-calculator',
    [],
  );
  const statistics = useMemo(() => {
    if (histories.length === 0) {
      return {
        averageCash: '0',
        totalCashExpense: '0',
        totalDeductedGold: '0',
      };
    }

    const totals = histories.reduce(
      (acc, history) => {
        const cash = parseFloat(history.cash || '0');
        const cashExpense = parseFloat(history.cashExpense || '0');
        const deductedGold = parseFloat(history.deductedGold || '0');

        return {
          cashSum: acc.cashSum + cash,
          expenseSum: acc.expenseSum + cashExpense,
          deductedSum: acc.deductedSum + deductedGold,
        };
      },
      { cashSum: 0, expenseSum: 0, deductedSum: 0 },
    );

    return {
      averageCash: (totals.cashSum / histories.length).toLocaleString(),
      totalCashExpense: totals.expenseSum.toLocaleString(),
      totalDeductedGold: totals.deductedSum.toLocaleString(),
    };
  }, [histories]);

  return (
    <GoldCalculatorContext.Provider
      value={{ histories, setGoldHistory, statistics }}
    >
      {children}
    </GoldCalculatorContext.Provider>
  );
}

export const useGoldCalculatorContext = () => {
  const context = React.useContext(GoldCalculatorContext);
  if (!context) {
    throw new Error(
      'useGoldCalculator must be used within a GoldCalculatorProvider',
    );
  }
  return context;
};
