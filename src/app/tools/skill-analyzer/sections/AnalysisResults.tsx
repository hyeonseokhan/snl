/**
 * @file AnalysisResults – 요약 카드, 스킬 통계, 캐릭터별 스킬 상세 테이블
 * - 이 파일의 모든 주석은 한글로 작성합니다.
 * - 기능 변경 없음: 가독성과 렌더 성능(불필요한 재생성 최소화) 최적화.
 */
'use client';

import React, { Fragment, useMemo } from 'react';
import {
  Section,
  StatCard,
  RuneTooltip,
  TripodTooltip,
  SkillTooltip,
} from '../components';

// === 타입 정의 =================================================================
interface AnalysisResultsProps {
  results: any | null;
  selectedSkill: string | null;
  setSelectedSkill: (
    v: string | null | ((prev: string | null) => string | null),
  ) => void;
  groupedTripodData: Record<string, any>;
  skillDetailStats: any | null;
}

// === 컴포넌트 ==================================================================

/**
 * 분석 결과 섹션 묶음
 * - 요약 카드 / 스킬 사용 통계 / 캐릭터별 스킬 상세 테이블을 순서대로 출력합니다.
 */
export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  results,
  selectedSkill,
  setSelectedSkill,
  groupedTripodData,
  skillDetailStats,
}) => {
  // --- 티어 색상 맵(메모이제이션) ----------------------------------------------
  const tierColorMap = useMemo(
    () => ({
      1: 'text-[var(--blue-9)]',
      2: 'text-[var(--green-9)]',
      3: 'text-[var(--accent-11)]',
    }),
    [],
  );

  // --- 결과 파생값(안전 값) -----------------------------------------------------
  const totalCharacters = results?.totalCharacters ?? 0;
  const keptCharactersLen = results?.keptCharacters?.length ?? 0;
  const skillUsageLen = results?.skillUsageRows?.length ?? 0;

  // --- 결과 요약 카드 -----------------------------------------------------------
  const summaryCards = useMemo(
    () => (
      <div className="grid w-full grid-cols-3 gap-1">
        <StatCard label="분석대상 캐릭터" value={totalCharacters} />
        <StatCard label="조건 부합 캐릭터" value={keptCharactersLen} />
        <StatCard label="고유 스킬" value={skillUsageLen} />
      </div>
    ),
    [totalCharacters, keptCharactersLen, skillUsageLen],
  );

  // --- 스킬 사용 통계(행) -------------------------------------------------------
  const skillUsageRows = useMemo(() => {
    if (!results) return null;
    return results.skillUsageRows.map((row: any) => (
      <Fragment key={row.skill_name}>
        <div
          onClick={() =>
            setSelectedSkill((prev) =>
              prev === row.skill_name ? null : row.skill_name,
            )
          }
          className={`flex h-10 cursor-pointer items-center text-sm text-[var(--gray-11)] hover:bg-[var(--gray-4)] ${
            selectedSkill === row.skill_name ? 'bg-[var(--accent-4)]' : ''
          }`}
        >
          <div className="flex-1 text-center font-medium">{row.skill_name}</div>
          <div className="flex-1 text-center">{row.characters}</div>
          <div className="flex-1 text-center">
            {keptCharactersLen > 0
              ? Math.round((row.characters / keptCharactersLen) * 100)
              : 0}
            %
          </div>
        </div>

        {selectedSkill === row.skill_name && skillDetailStats && (
          <div className="bg-[var(--gray-2)] p-4 text-xs">
            <div className="mb-3 text-sm font-bold text-[var(--gray-12)]">
              세부 통계 (총 {skillDetailStats.total}명 중)
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* 스킬 레벨 통계 */}
              <div>
                <h5 className="mb-1.5 font-semibold text-[var(--gray-12)]">
                  스킬 레벨
                </h5>
                <ul className="space-y-1 text-[var(--gray-11)]">
                  {[...skillDetailStats.skillLevels.entries()].map(
                    ([level, count]: any) => (
                      <li key={level}>
                        - {level}레벨: {count}명 (
                        {((count / skillDetailStats.total) * 100).toFixed(1)}
                        %)
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* 트라이포드 통계 */}
              <div>
                <h5 className="mb-1.5 font-semibold text-[var(--gray-12)]">
                  트라이포드
                </h5>
                <div className="space-y-2">
                  {[...skillDetailStats.tripods.entries()].map(
                    ([tier, tripodList]: any) => (
                      <div key={tier}>
                        <h6
                          className={`font-semibold ${
                            tierColorMap[tier] ?? 'text-[var(--gray-11)]'
                          }`}
                        >
                          {tier}티어
                        </h6>
                        <ul className="space-y-1 pl-2 text-[var(--gray-11)]">
                          {tripodList.map(({ name, count }: any) => (
                            <li key={name}>
                              - {name}: {count}명 (
                              {((count / skillDetailStats.total) * 100).toFixed(
                                1,
                              )}
                              %)
                            </li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* 룬 통계 */}
              <div>
                <h5 className="mb-1.5 font-semibold text-[var(--gray-12)]">
                  룬
                </h5>
                <ul className="space-y-1 text-[var(--gray-11)]">
                  {[...skillDetailStats.runes.entries()].map(
                    ([rune, count]: any) => (
                      <li key={rune}>
                        - {rune}: {count}명 (
                        {((count / skillDetailStats.total) * 100).toFixed(1)}
                        %)
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    ));
  }, [
    results,
    keptCharactersLen,
    selectedSkill,
    setSelectedSkill,
    skillDetailStats,
    tierColorMap,
  ]);

  // --- 캐릭터별 상세 테이블 -----------------------------------------------------
  const characterTable = useMemo(() => {
    if (!results) return null;
    return Object.entries(groupedTripodData).map(
      ([character, skills]: [string, any], characterIndex) => {
        const skillEntries = Object.entries(skills);

        return (
          <div
            key={character}
            className={`flex text-xs text-[var(--gray-11)] ${
              characterIndex > 0 ? 'border-t-2 border-t-[var(--gray-6)]' : ''
            }`}
          >
            {/* 캐릭터명 + 외부 링크 */}
            <div className="flex w-1/5 items-center justify-center border-r border-[var(--gray-4)] p-2 text-sm font-bold">
              <a
                href={`https://kloa.gg/characters/${encodeURIComponent(character)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 decoration-from-font transition-colors hover:text-sky-700 hover:underline dark:text-sky-400 dark:hover:text-sky-300"
              >
                {character}
              </a>
            </div>

            {/* 스킬/레벨/트포/룬 */}
            <div className="w-4/5">
              {skillEntries.map(
                ([skillName, skillData]: [string, any], index) => (
                  <div
                    key={skillName}
                    className={`flex min-h-10 items-center ${
                      index < skillEntries.length - 1
                        ? 'border-b border-[var(--gray-4)]'
                        : ''
                    } ${selectedSkill === skillName ? 'bg-[var(--accent-6)]' : ''}`}
                  >
                    {/* 스킬명 (툴팁 칩) */}
                    <div className="w-3/12 p-2 text-center">
                      <SkillTooltip
                        name={skillName}
                        tooltip={skillData.tooltip}
                        icon={skillData.icon}
                        size="md"
                      />
                    </div>

                    {/* 스킬 레벨 */}
                    <div className="w-2/12 p-2 text-center">
                      {skillData.level}
                    </div>

                    {/* 트라이포드 (툴팁 칩) */}
                    <div className="w-5/12 p-2 text-center text-xs">
                      {Array.isArray(skillData.tripods) &&
                      skillData.tripods.length > 0 ? (
                        <div className="flex flex-col items-center gap-1 xl:flex-row xl:flex-wrap xl:justify-center xl:gap-0.5">
                          {skillData.tripods.map((t: any, idx: number) => (
                            <TripodTooltip
                              key={`${skillName}-tripod-${idx}`}
                              name={t.name || ''}
                              body={t.tooltip?.body || ''}
                              icon={t.icon}
                              size="sm"
                            />
                          ))}
                        </div>
                      ) : (
                        <span>-</span>
                      )}
                    </div>

                    {/* 룬 (커스텀 툴팁 샘플) */}
                    <div className="w-2/12 p-2 text-center">
                      {skillData.rune ? (
                        <RuneTooltip
                          name={skillData.rune.name}
                          grade={skillData.rune.grade}
                          htmlFallback={skillData.rune.tooltip?.body || ''}
                          icon={skillData.rune.icon}
                          size="sm"
                        />
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        );
      },
    );
  }, [results, groupedTripodData, selectedSkill]);

  // --- 렌더 가드(후단) ----------------------------------------------------------
  if (!results) return null;

  // --- 렌더 --------------------------------------------------------------------
  return (
    <>
      <Section
        title="분석 결과 요약"
        description="분석된 데이터의 주요 통계입니다."
      >
        {summaryCards}
      </Section>

      <Section title="스킬 사용 통계" description="랭커들의 스킬 채용률입니다.">
        <div className="w-full rounded-lg border border-dashed border-[var(--gray-8)] p-3">
          <div className="flex border-b border-[var(--gray-5)] pb-3 text-sm text-[var(--gray-11)]">
            <div className="flex-1 text-center">스킬명</div>
            <div className="flex-1 text-center">사용 캐릭터 수</div>
            <div className="flex-1 text-center">사용률</div>
          </div>
          {skillUsageRows}
        </div>
      </Section>

      <Section
        title="캐릭터 스킬 상세"
        description="캐릭터별 스킬, 레벨, 트라이포드, 룬 정보입니다."
      >
        <div className="w-full rounded-lg border border-dashed border-[var(--gray-8)] p-3">
          <div className="flex border-b border-[var(--gray-5)] pb-3 text-xs font-semibold text-[var(--gray-11)]">
            <div className="w-1/5 text-center">캐릭터</div>
            <div className="flex w-4/5">
              <div className="w-3/12 text-center">스킬명</div>
              <div className="w-2/12 text-center">레벨</div>
              <div className="w-5/12 text-center">트라이포드</div>
              <div className="w-2/12 text-center">룬</div>
            </div>
          </div>
          {characterTable}
        </div>
      </Section>
    </>
  );
};
