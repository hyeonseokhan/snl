'use client';

import React from 'react';

const toggle = false;

type HeaderCardType = {
  title: string;
  description: string;
};

const GoldCalculatorHeader = ({ title, description }: HeaderCardType) => {
  return (
    <div
      className={`flex w-full flex-col pb-4 ${toggle ? 'bg-gray-800' : ''} md:w-3/12 md:gap-y-3 md:pb-0 md:pr-8`}
    >
      <div className="text-[var(--gray-12)]">{title}</div>
      <div className="text-sm text-[var(--gray-9)]">{description}</div>
    </div>
  );
};

export default function RaidAction() {
  return (
    <div className="flex w-full flex-col rounded-lg bg-[var(--gray-3)] p-5">
      <div className="block w-full flex-row md:flex">
        <GoldCalculatorHeader
          title="구매정보 입력"
          description="골드 구매를 위한 골드시세와 구매수량을 입력합니다"
        />
        <div
          className={`flex w-full flex-col gap-y-1 ${toggle ? 'bg-emerald-600' : ''} md:w-9/12 md:flex-row md:gap-x-2 md:gap-y-0`}
        >
          <div
            className={`flex w-full flex-row items-center justify-between gap-x-2 md:w-40 md:flex-col md:items-start md:justify-start md:gap-x-0 md:gap-y-3 ${toggle ? 'bg-amber-800' : ''}`}
          >
            <div className="text-[var(--gray-11)]">현금 시세</div>
            <input
              type="text"
              className="rounded border border-[var(--gray-4)] px-3 py-1 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300 md:w-40"
            />
          </div>
          <div
            className={`flex w-full flex-row items-center justify-between gap-x-2 md:w-40 md:flex-col md:items-start md:justify-start md:gap-x-0 md:gap-y-3 ${toggle ? 'bg-amber-800' : ''}`}
          >
            <div className="text-[var(--gray-11)]">구매 골드량</div>
            <input
              type="text"
              className="rounded border border-[var(--gray-4)] px-3 py-1 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300 md:w-40"
            />
          </div>
          <div
            className={`flex w-full flex-row items-center justify-between gap-x-2 pt-1 md:w-40 md:flex-col md:items-start md:justify-start md:gap-x-0 md:gap-y-3 md:pt-0 md:${toggle ? 'bg-amber-800' : ''}`}
          >
            <div aria-label="blank" className="h-6" />
            <button className="h-8 w-20 rounded border border-[var(--gray-8)] text-[var(--gray-12)] transition-all active:bg-[var(--accent-6)]">
              계산
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
