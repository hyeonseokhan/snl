'use client';

import React, { useState } from 'react';
import { useGoldCalculatorContext } from './gold-calc-context';
import { v4 as uuid } from 'uuid';
import { TrashIcon } from '../../../components/icons/TrashIcon';

export default function GoldCalculator() {
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
  const handleDelete = (key: string) => {
    context.setGoldHistory(
      context.histories.filter((history) => history.key !== key),
    );
  };
  return (
    <div className="flex w-full flex-row gap-x-1">
      <div className="flex w-2/5 flex-col gap-y-1">
        <div className="flex w-full flex-col rounded-lg bg-[var(--gray-3)] p-4">
          <div className="flex w-full flex-row gap-x-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <span className="font-semibold text-[var(--gray-11)]">
                현금 시세
              </span>
              <input
                type="text"
                value={Number(payload.cash).toLocaleString()}
                onFocus={(e) => (e.currentTarget.value = '')}
                onChange={(e) => handleInputData(e, 'cash')}
                className="rounded border border-[var(--gray-4)] px-3 py-1 text-[var(--gray-12)] outline-none focus:border-[var(--gray-10)] focus:transition-all focus:duration-300"
              />
            </div>

            <div className="flex w-1/2 flex-col gap-y-2">
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
          <div className="pt-4">
            <button
              onClick={calculate}
              className="w-full rounded bg-[var(--accent-10)] p-4 text-xl font-bold text-[var(--gray-12)] transition-all duration-300 hover:bg-[var(--accent-8)]"
            >
              계산하기
            </button>
          </div>
        </div>

        <div className="flex w-full flex-row gap-x-1 rounded-lg bg-[var(--gray-3)] p-4">
          <div className="flex w-full flex-col gap-y-2">
            <table className="w-full">
              <thead className="border-b border-[var(--gray-6)]">
                <tr className="font-semibold text-[var(--gray-11)]">
                  <th className="px-2 py-2">평균 현금 시세</th>
                  <th className="px-2 py-2">현금 지출 합계</th>
                  <th className="px-2 py-2">실수령 골드 합계</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr className="text-[var(--gray-11)]">
                  <td className="px-2 py-2">
                    {context.statistics.averageCash}
                  </td>
                  <td className="px-2 py-2">
                    {context.statistics.totalCashExpense}
                  </td>
                  <td className="px-2 py-2">
                    {context.statistics.totalDeductedGold}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex max-h-[500px] w-3/5 flex-col overflow-auto rounded-lg bg-[var(--gray-3)] p-4">
        <div>
          <table className="w-full">
            <thead className="h-12 border-b border-[var(--gray-6)] py-2">
              <tr className="font-semibold text-[var(--gray-11)]">
                <th className="px-2">현금 시세</th>
                <th className="px-2">구매 골드량</th>
                <th className="px-2">현금 지출</th>
                <th className="px-2">실수령 골드</th>
                <th className="px-2">삭제</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {context.histories.map((history) => (
                <tr
                  key={history.key}
                  className="h-12 py-2 text-[var(--gray-11)]"
                >
                  <td className="px-2">
                    {parseFloat(history.cash).toLocaleString()}
                  </td>
                  <td className="px-2">
                    {parseFloat(history.goldAmount).toLocaleString()}
                  </td>
                  <td className="px-2">
                    {parseFloat(history.cashExpense).toLocaleString()}
                  </td>
                  <td className="px-2">
                    {parseFloat(history.deductedGold).toLocaleString()}
                  </td>
                  <td className="px-2 align-middle">
                    <div className="flex h-8 w-full items-center justify-center">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded hover:bg-[var(--gray-6)] hover:transition-colors hover:duration-300"
                        onClick={() => handleDelete(history.key)}
                      >
                        <TrashIcon className="h-4 w-4 fill-[var(--gray-11)]" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
