export default function GoldCalculator() {
  return (
    <div className="flex w-full flex-row gap-x-1">
      <div className="flex w-2/5 flex-col gap-y-1">
        <div className="flex w-full flex-col rounded-lg bg-[var(--gray-3)] p-4">
          <div className="flex w-full flex-row gap-x-2">
            <div className="flex w-1/2 flex-col gap-y-2">
              <span className="font-semibold text-[var(--gray-11)]">
                현금 시세
              </span>
              <input className="rounded border border-[var(--gray-4)] px-3 py-1 text-[var(--gray-12)] outline-none focus:border-[var(--gray-10)] focus:transition-all focus:duration-300" />
            </div>

            <div className="flex w-1/2 flex-col gap-y-2">
              <span className="font-semibold text-[var(--gray-11)]">
                구매 골드량
              </span>
              <input className="rounded border border-[var(--gray-4)] px-3 py-1 text-[var(--gray-12)] outline-none focus:border-[var(--gray-10)] focus:transition-all focus:duration-300" />
            </div>
          </div>
          <div className="pt-4">
            <button className="w-full rounded bg-[var(--accent-10)] p-4 text-xl font-bold text-[var(--gray-12)] transition-all duration-300 hover:bg-[var(--accent-8)]">
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
                  <td className="px-2 py-2">0</td>
                  <td className="px-2 py-2">0</td>
                  <td className="px-2 py-2">0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex max-h-[500px] w-3/5 flex-col overflow-auto rounded-lg bg-[var(--gray-3)] p-4">
        <div>
          <table className="w-full">
            <thead className="border-b border-[var(--gray-6)]">
              <tr className="font-semibold text-[var(--gray-11)]">
                <th className="px-2 py-2">현금 시세</th>
                <th className="px-2 py-2">구매 골드량</th>
                <th className="px-2 py-2">현금 지출</th>
                <th className="px-2 py-2">수령 골드</th>
                <th className="px-2 py-2">삭제</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr className="text-[var(--gray-11)]">
                <td className="px-2 py-2">0</td>
                <td className="px-2 py-2">0</td>
                <td className="px-2 py-2">0</td>
                <td className="px-2 py-2">0</td>
                <td className="px-2 py-2">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
