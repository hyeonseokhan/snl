'use client';

import { useGoldCalculatorContext } from './gold-calc-context';
import { TrashIcon } from '../../../components/icons/TrashIcon';
import React from 'react';

export default function GoldCalculatorHistory() {
  const context = useGoldCalculatorContext();
  const handleDelete = (key: string) => {
    context.setGoldHistory(
      context.histories.filter((history) => history.key !== key),
    );
  };
  return (
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
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <tr key={index} className="h-12 py-2 text-[var(--gray-11)]">
              <td className="px-2">{parseFloat('42').toLocaleString()}</td>
              <td className="px-2">{parseFloat('10000').toLocaleString()}</td>
              <td className="px-2">{parseFloat('4200').toLocaleString()}</td>
              <td className="px-2">{parseFloat('9500').toLocaleString()}</td>
              <td className="px-2 align-middle">
                <div className="flex h-8 w-full items-center justify-center">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded hover:bg-[var(--gray-6)] hover:transition-colors hover:duration-300"
                    onClick={() => handleDelete(index + '')}
                  >
                    <TrashIcon className="h-4 w-4 fill-[var(--gray-11)]" />
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
        {/*{context.histories.map((history) => (*/}
        {/*  <tr key={history.key} className="h-12 py-2 text-[var(--gray-11)]">*/}
        {/*    <td className="px-2">*/}
        {/*      {parseFloat(history.cash).toLocaleString()}*/}
        {/*    </td>*/}
        {/*    <td className="px-2">*/}
        {/*      {parseFloat(history.goldAmount).toLocaleString()}*/}
        {/*    </td>*/}
        {/*    <td className="px-2">*/}
        {/*      {parseFloat(history.cashExpense).toLocaleString()}*/}
        {/*    </td>*/}
        {/*    <td className="px-2">*/}
        {/*      {parseFloat(history.deductedGold).toLocaleString()}*/}
        {/*    </td>*/}
        {/*    <td className="px-2 align-middle">*/}
        {/*      <div className="flex h-8 w-full items-center justify-center">*/}
        {/*        <div*/}
        {/*          className="flex h-8 w-8 items-center justify-center rounded hover:bg-[var(--gray-6)] hover:transition-colors hover:duration-300"*/}
        {/*          onClick={() => handleDelete(history.key)}*/}
        {/*        >*/}
        {/*          <TrashIcon className="h-4 w-4 fill-[var(--gray-11)]" />*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </td>*/}
        {/*  </tr>*/}
        {/*))}*/}
      </tbody>
    </table>
  );
}
