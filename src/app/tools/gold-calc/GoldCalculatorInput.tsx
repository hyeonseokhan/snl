'use client';

import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useGoldCalculatorContext } from './gold-calc-context';

export default function GoldCalculatorInput() {
  const [payload, setPayload] = useState({
    cash: '',
    goldAmount: '',
    cashExpense: '',
    deductedGold: '',
  });
  const context = useGoldCalculatorContext();
  const handleInputData = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const input = event.currentTarget.value;
    if (/[^0-9,]/.test(input)) {
      return;
    }
    const number = input.replace(/,/g, '');
    setPayload({ ...payload, [key]: number });
  };
  const calculate = () => {
    if (!payload.cash || !payload.goldAmount) {
      // openModal('입력값 오류', '계산에 필요한 모든 값을 입력해 주세요 🙏');
      return;
    }
    const pricePerGold = parseFloat(payload.cash) / parseFloat('100');
    const cashExpense = Math.floor(
      parseFloat(payload.goldAmount) * pricePerGold,
    );
    const deductedGold = parseFloat(payload.goldAmount) * 0.95;
    const updateData = {
      ...payload,
      key: uuid(),
      cashExpense: cashExpense.toString(),
      deductedGold: deductedGold.toString(),
    };
    context.setGoldHistory([...context.histories, updateData]);
    setPayload({
      ...updateData,
      goldAmount: '',
      cashExpense: '',
      deductedGold: '',
    });
  };
  return (
    <div className="flex w-full flex-col rounded-lg bg-[var(--gray-3)] p-4">
      <div className="flex w-full flex-row">
        <div className="flex w-1/2 flex-col gap-y-2 px-1">
          <span className="font-semibold text-[var(--gray-11)]">현금 시세</span>
          <input
            type="text"
            value={Number(payload.cash).toLocaleString()}
            onFocus={(e) => (e.currentTarget.value = '')}
            onChange={(e) => handleInputData(e, 'cash')}
            className="rounded border border-[var(--gray-4)] px-3 py-1 text-[var(--gray-12)] outline-none focus:border-[var(--gray-10)] focus:transition-all focus:duration-300"
          />
        </div>

        <div className="flex w-1/2 flex-col gap-y-2 px-1">
          <span className="font-semibold text-[var(--gray-11)]">
            구매 골드량
          </span>
          <input
            type="text"
            value={Number(payload.goldAmount).toLocaleString()}
            onFocus={(e) => (e.currentTarget.value = '')}
            onChange={(e) => handleInputData(e, 'goldAmount')}
            className="rounded border border-[var(--gray-4)] px-3 py-1 text-[var(--gray-12)] outline-none focus:border-[var(--gray-10)] focus:transition-all focus:duration-300"
          />
        </div>
      </div>
      <div className="px-1 pt-3">
        <button
          onClick={calculate}
          className="w-full rounded bg-[var(--accent-10)] p-4 text-xl font-bold text-[var(--gray-1)] transition-all active:bg-[var(--accent-8)]"
        >
          계산하기
        </button>
      </div>
    </div>
  );
}
