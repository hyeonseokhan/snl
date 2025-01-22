'use client';

import React, { useState } from 'react';
import { TrashIcon } from '../../../components/icons/TrashIcon';
import { useGoldCalculatorContext } from './gold-calc-context';
import { v4 as uuid } from 'uuid';

type HeaderCardType = {
  title: string;
  description: string;
};

const GoldCalculatorHeader = ({ title, description }: HeaderCardType) => {
  return (
    <div
      className={`flex w-full flex-col pb-4 md:w-3/12 md:gap-y-3 md:pb-0 md:pr-8`}
    >
      <div className="text-[var(--gray-12)]">{title}</div>
      <div className="text-sm text-[var(--gray-9)]">{description}</div>
    </div>
  );
};

type StatisticRowType = {
  title: string;
  description: string;
  value: string;
};

const StatisticRow = ({ title, description, value }: StatisticRowType) => {
  return (
    <div className={`flex w-full flex-col md:w-60 md:gap-y-3`}>
      <div className={`flex flex-row`}>
        <div className={`pr-4 text-[var(--gray-11)]`}>{`${title}:`}</div>
        <span className={`text-[var(--accent-10)]`}>{value}</span>
      </div>
      <span className={`text-sm text-[var(--gray-8)]`}>{description}</span>
    </div>
  );
};

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
    <div className="flex w-full flex-col gap-y-4 rounded-lg bg-[var(--gray-3)] p-5">
      <div
        aria-label="input"
        className="block w-full flex-row border-b border-[var(--gray-5)] pb-3 md:flex"
      >
        <GoldCalculatorHeader
          title="구매정보 입력"
          description="골드시세와 구매수량을 입력"
        />
        <div
          className={`flex w-full flex-col gap-y-1 md:w-9/12 md:flex-row md:gap-x-2 md:gap-y-0`}
        >
          <div
            className={`flex w-full flex-row items-center justify-between gap-x-2 md:w-40 md:flex-col md:items-start md:justify-start md:gap-x-0 md:gap-y-3`}
          >
            <div className="text-[var(--gray-11)]">현금 시세</div>
            <input
              type="text"
              value={Number(payload.cash).toLocaleString()}
              onFocus={(e) => (e.currentTarget.value = '')}
              onChange={(e) => handleInputData(e, 'cash')}
              className="rounded border border-[var(--gray-4)] px-3 py-1 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300 md:w-40"
            />
          </div>
          <div
            className={`flex w-full flex-row items-center justify-between gap-x-2 md:w-40 md:flex-col md:items-start md:justify-start md:gap-x-0 md:gap-y-3`}
          >
            <div className="text-[var(--gray-11)]">구매 골드량</div>
            <input
              type="text"
              value={Number(payload.goldAmount).toLocaleString()}
              onFocus={(e) => (e.currentTarget.value = '')}
              onChange={(e) => handleInputData(e, 'goldAmount')}
              className="rounded border border-[var(--gray-4)] px-3 py-1 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300 md:w-40"
            />
          </div>
          <div
            className={`flex w-full flex-row items-center justify-between gap-x-2 pt-1 md:w-40 md:flex-col md:items-start md:justify-start md:gap-x-0 md:gap-y-3 md:pt-0`}
          >
            <div aria-label="blank" className="h-6" />
            <button
              className="h-8 w-20 rounded border border-[var(--gray-8)] text-[var(--gray-12)] transition-all active:bg-[var(--accent-6)]"
              onClick={calculate}
            >
              계산
            </button>
          </div>
        </div>
      </div>
      <div
        aria-label="statistic"
        className="block w-full flex-row border-b border-[var(--gray-5)] pb-3 md:flex"
      >
        <GoldCalculatorHeader
          title="계산내역 통계"
          description="골드구매 내역의 통계정보"
        />
        <div
          className={`flex w-full flex-col gap-y-1 md:w-9/12 md:flex-row md:gap-x-2 md:gap-y-0`}
        >
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
      </div>
      <div aria-label="history" className="block w-full flex-row pb-3 md:flex">
        <GoldCalculatorHeader
          title="골드구매내역"
          description="골드구매 내역정보"
        />
        <div className={`flex w-full md:w-9/12 md:flex-row`}>
          <div className="w-full rounded-lg border border-dashed border-[var(--gray-8)] p-3">
            <div
              className={`flex ${context.histories.length > 0 ? 'border-b border-[var(--gray-5)] pb-3' : ''} text-[var(--gray-11)] md:text-nowrap`}
            >
              <div className="flex-1 text-center">현금시세</div>
              <div className="flex-1 text-center">구매골드</div>
              <div className="flex-1 text-center">현금지출</div>
              <div className="flex-1 text-center">수령골드</div>
              <div className="flex-1 text-center">삭제</div>
            </div>
            {context.histories.map((history) => (
              <div
                key={history.key}
                className="flex h-12 items-center text-[var(--gray-11)]"
              >
                <div className="flex-1 text-center">
                  {parseFloat(history.cash).toLocaleString()}
                </div>
                <div className="flex-1 text-center">
                  {parseFloat(history.goldAmount).toLocaleString()}
                </div>
                <div className="flex-1 text-center">
                  {parseFloat(history.cashExpense).toLocaleString()}
                </div>
                <div className="flex-1 text-center">
                  {parseFloat(history.deductedGold).toLocaleString()}
                </div>
                <div className="flex-1 text-center">
                  <div className="flex h-8 w-full items-center justify-center">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded hover:bg-[var(--gray-6)] hover:transition-colors hover:duration-300"
                      onClick={() => handleDelete(history.key)}
                    >
                      <TrashIcon className="h-4 w-4 fill-[var(--gray-11)]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
