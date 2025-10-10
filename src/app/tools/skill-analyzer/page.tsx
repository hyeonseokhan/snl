/**
 * @file Skill Analyzer 페이지의 메인 로직을 담당하는 파일입니다.
 * 이 파일은 다음과 같은 주요 기능들을 포함합니다:
 * - 상태 관리: 직업, 각인, 전투력 등 사용자 입력과 분석 결과, 로그 등 모든 상태를 관리합니다.
 * - 데이터 페칭: 로스트아크 API 또는 IndexedDB 캐시에서 캐릭터 데이터를 가져옵니다.
 * - 데이터 처리: 가져온 데이터를 분석에 적합한 형태로 가공하고, 필터링 및 통계 계산을 수행합니다.
 * - 렌더링: 하위 컴포넌트(검색 폼, 필터, 결과, 로그)에 필요한 데이터와 핸들러를 전달하여 UI를 렌더링합니다.
 */
'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  SectionHeader,
  CoreCategorySelector,
  StatCard,
  TooltipChip,
} from './components';
import { fetchRankNames, fetchArmories, CONCURRENCY_ARMORY } from './api';
import { idbGetAllArmories } from './cache';
import {
  aggregateSkillUsageByCharacter,
  deepCleanHtml,
  extractArkgridSlotNameSet,
  extractSelectedRows,
  mapPool,
  norm,
} from './utils';
import type {
  AnalysisResult,
  ApiCallbacks,
  PreparedCharacterData,
  ProgressState,
  TripodTableRow,
  CoreMeta,
} from './types';
import { useTestMode } from '../../hooks/test-mode-context';
import { JOB_DATA } from '../../../config/jobData';
import type { EnlightenmentTree } from '../../../config/jobData';
import React from 'react';

const ANALYSIS_STEPS = 4;

/**
 * 로스트아크 Tooltip 원문(raw string)을 HTML 문자열로 변환합니다.
 * - JSON 문자열(요소 맵)인 경우 내용을 파싱해 line-by-line HTML로 구성합니다.
 * - 그 외에는 이미 HTML로 간주하여 그대로 반환합니다.
 * - 오브젝트/불린 등 비문자열 값은 무시합니다.
 * - 각 라인은 div로 감싸고, 숫자/퍼센트 강조 및 <BR> 정규화, 중복 제거 등 가독성 향상.
 */
const toHtmlFromLoaTooltip = (raw: any): string => {
  if (!raw) return '';
  const s = typeof raw === 'string' ? raw.trim() : '';
  if (!s) return '';

  // helper: string only
  const normalize = (val: any): string =>
    typeof val === 'string' && val.trim() ? val.trim() : '';

  // helper: format one line (numbers/percentages emphasized)
  const formatLine = (line: string): string => {
    let out = line;
    // normalize explicit <BR> variants from source
    out = out.replace(/<\s*BR\s*\/?>/gi, '<br/>');
    // emphasize large numbers (damage etc.)
    out = out.replace(
      /\b(\d{1,3}(?:,\d{3})+)\b/g,
      '<span style="color: var(--accent-11); font-weight:600">$1</span>',
    );
    // emphasize percents
    out = out.replace(
      /\b(\d+(?:\.\d+)?%)/g,
      '<span style="color: var(--green-11); font-weight:600">$1</span>',
    );
    // soften common labels
    out = out.replace(
      /(^|\s)(마나|재사용 대기시간|공격 타입|슈퍼아머|카운터)(\s*[:：])/g,
      '$1<span style="color: var(--gray-11); font-weight:600">$2</span>$3',
    );
    return out;
  };

  if (s.startsWith('{') && s.endsWith('}')) {
    try {
      const obj = JSON.parse(s) as Record<string, any>;
      const parts: string[] = [];

      // iterate in key order for stable output
      for (const key of Object.keys(obj).sort()) {
        const el = (obj as any)[key];
        if (!el) continue;

        // collect known string fields only
        const vals = [
          normalize(el.value),
          normalize(el.tooltip),
          normalize(el.contentStr),
          normalize(el.leftStr0),
          normalize(el.rightStr0),
          normalize(el.text),
        ].filter(Boolean);

        if (vals.length) parts.push(vals.join(' '));

        // nested elements (array): also pick string-like values only
        if (Array.isArray(el.elements)) {
          for (const sub of el.elements) {
            const sv =
              normalize(sub?.value) ||
              normalize(sub?.contentStr) ||
              normalize(sub?.text);
            if (sv) parts.push(sv);
          }
        }
      }

      // de-duplicate consecutive lines & wrap each line in its own block
      const cleaned: string[] = [];
      for (const line of parts) {
        if (!line) continue;
        if (cleaned.length === 0 || cleaned[cleaned.length - 1] !== line) {
          cleaned.push(line);
        }
      }

      return cleaned
        .map(
          (line) =>
            `<div style="margin:3px 0; line-height:1.4">${formatLine(line)}</div>`,
        )
        .join('');
    } catch {
      // if JSON parse fails, fallthrough and treat as HTML
    }
  }

  // treat as HTML already; caller (TooltipChip) will sanitize
  return s.replace(/<\s*BR\s*\/?>/gi, '<br/>');
};

/**
 * 캐릭터의 전투정보실(armory) 데이터를 받아 분석에 필요한 형태로 가공합니다.
 * @param name 캐릭터 이름
 * @param armory API 또는 캐시에서 가져온 캐릭터 데이터
 * @returns 가공된 캐릭터 데이터 객체 (PreparedCharacterData)
 */
const prepareCharacterDataFromArmory = (
  name: string,
  armory: any,
): PreparedCharacterData & { tooltipBySkill?: Record<string, any> } => {
  if (!armory) {
    return { name, rows: [], usedSkills: new Set(), arkgridSet: new Set() };
  }
  const skillsClean = deepCleanHtml(armory.ArmorySkills || []);
  const rows = extractSelectedRows(name, skillsClean);
  const usedSkills = aggregateSkillUsageByCharacter(skillsClean);
  const arkgridSet = extractArkgridSlotNameSet(armory);

  // --- Tooltip/아이콘 수집: 스킬/트포/룬 ---
  const tooltipBySkill: Record<
    string,
    {
      skillHtml?: string;
      skillIcon?: string;
      runeHtml?: string;
      runeIcon?: string;
      tripods: Record<string, { html: string; icon?: string; tier?: number }>;
    }
  > = {};

  for (const s of skillsClean) {
    const key = s.Name;
    const bundle = {
      skillHtml: toHtmlFromLoaTooltip(s.Tooltip),
      skillIcon: s.Icon,
      runeHtml: s.Rune ? toHtmlFromLoaTooltip(s.Rune.Tooltip) : undefined,
      runeIcon: s.Rune?.Icon,
      tripods: {} as Record<
        string,
        { html: string; icon?: string; tier?: number }
      >,
    };
    if (Array.isArray(s.Tripods)) {
      for (const t of s.Tripods) {
        const tName = t?.Name || '';
        if (!tName) continue;
        bundle.tripods[tName] = {
          html: toHtmlFromLoaTooltip(t.Tooltip),
          icon: t.Icon,
          tier: typeof t.Tier === 'number' ? t.Tier : undefined,
        };
      }
    }
    tooltipBySkill[key] = bundle;
  }

  return { name, rows, usedSkills, arkgridSet, tooltipBySkill };
};

/**
 * 검색 폼 UI를 렌더링하는 컴포넌트입니다.
 * 직업, 각인, 전투력, 순위 등 검색 조건을 입력받습니다.
 */
const SearchForm = ({
  handleFormSubmit,
  job,
  setJob,
  enlightenmentTree,
  setEnlightenmentTree,
  enlightenmentOptions,
  minCombatPower,
  setMinCombatPower,
  maxCombatPower,
  setMaxCombatPower,
  endRank,
  setEndRank,
  isAnalyzing,
  isWaiting,
  buttonLabel,
  progress,
}) => (
  <form
    onSubmit={handleFormSubmit}
    className="block w-full flex-row pb-3 md:flex"
  >
    <SectionHeader
      title="검색 정보 입력"
      description="직업, 각인, 대상 수 등을 설정합니다."
    />
    <div className="flex w-full flex-col gap-4 md:w-9/12">
      {/* Row 1 */}
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label
            htmlFor="job"
            className="mb-2 block text-sm text-[var(--gray-11)]"
          >
            직업 선택
          </label>
          <select
            id="job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
            className="h-9 w-auto rounded border border-[var(--gray-4)] px-3 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300"
          >
            <option value="">직업을 선택하세요</option>
            {JOB_DATA.map((j) => (
              <option key={j.code} value={j.code}>
                {j.class}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="enlightenmentTree"
            className="mb-2 block text-sm text-[var(--gray-11)]"
          >
            직업 각인
          </label>
          <select
            id="enlightenmentTree"
            value={enlightenmentTree}
            onChange={(e) => setEnlightenmentTree(e.target.value)}
            required
            disabled={!job}
            className="h-9 w-auto rounded border border-[var(--gray-4)] px-3 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300 disabled:bg-[var(--gray-1)]"
          >
            <option value="">직업을 먼저 선택하세요</option>
            {enlightenmentOptions.map((tree) => (
              <option key={tree.name} value={tree.name}>
                {tree.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label
            htmlFor="minCombatPower"
            className="mb-2 block text-sm text-[var(--gray-11)]"
          >
            최소 전투력
          </label>
          <input
            id="minCombatPower"
            type="number"
            value={minCombatPower}
            onChange={(e) => setMinCombatPower(e.target.value)}
            className="h-9 w-24 rounded border border-[var(--gray-4)] px-3 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300"
            placeholder="0"
          />
        </div>

        <div>
          <label
            htmlFor="maxCombatPower"
            className="mb-2 block text-sm text-[var(--gray-11)]"
          >
            최대 전투력
          </label>
          <input
            id="maxCombatPower"
            type="number"
            value={maxCombatPower}
            onChange={(e) => setMaxCombatPower(e.target.value)}
            className="h-9 w-24 rounded border border-[var(--gray-4)] px-3 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300"
            placeholder="9999"
          />
        </div>

        <div>
          <label
            htmlFor="endRank"
            className="mb-2 block text-sm text-[var(--gray-11)]"
          >
            분석 대상
          </label>
          <select
            id="endRank"
            value={endRank}
            onChange={(e) => setEndRank(e.target.value)}
            required
            className="h-9 w-auto rounded border border-[var(--gray-4)] px-3 text-[var(--gray-12)] outline-none focus:border-[var(--accent-10)] focus:transition-all focus:duration-300"
          >
            <option value="10">상위 10명</option>
            <option value="30">상위 30명</option>
            <option value="50">상위 50명</option>
            <option value="100">상위 100명</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={isAnalyzing || isWaiting}
            className={`${
              isWaiting
                ? 'h-9 w-auto animate-pulse cursor-wait rounded border border-[var(--accent-10)] bg-[var(--accent-10)] px-6 text-white transition-all'
                : 'h-9 w-auto rounded border border-[var(--gray-8)] px-6 text-[var(--gray-12)] transition-all active:bg-[var(--accent-6)]'
            } disabled:cursor-not-allowed disabled:bg-[var(--gray-5)]`}
            aria-live="polite"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
      <AnalysisProgress isAnalyzing={isAnalyzing} progress={progress} />
    </div>
  </form>
);

/**
 * 분석 진행 상태를 보여주는 프로그레스 바 컴포넌트입니다.
 */
const AnalysisProgress = ({ isAnalyzing, progress }) => (
  <>
    {isAnalyzing && (
      <div className="rounded-lg bg-[var(--gray-2)] p-4">
        <div className="mb-2 text-sm text-[var(--gray-11)]">
          {progress.message}
        </div>
        <div className="h-2 w-full rounded-full bg-[var(--gray-5)]">
          <div
            className="h-2 rounded-full bg-[var(--accent-9)] transition-all duration-500"
            style={{ width: `${(progress.current / progress.total) * 100}%` }}
          ></div>
        </div>
      </div>
    )}
  </>
);

/**
 * 상세 필터링을 위한 코어 선택 UI를 렌더링하는 컴포넌트입니다.
 */
const SearchFilters = ({
  isAnalyzing,
  preparedData,
  coreOptions,
  coreOptionsByCategory,
  selectedCoresByCategory,
  toggleCore,
  coresEnabled,
}) => (
  <>
    {!isAnalyzing && preparedData.length > 0 && (
      <>
        <div className="block w-full flex-row border-t border-[var(--gray-5)] pb-3 pt-3 md:flex">
          <SectionHeader
            title="조건 상세"
            description="사용 코어를 선택해 조건을 세부 설정합니다."
          />
          <div className="w-full md:w-9/12">
            <div className="inline-flex w-fit max-w-full flex-col gap-3 self-start md:w-auto">
              {coreOptions.length > 0 ? (
                <>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                    <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
                      <CoreCategorySelector
                        title="질서의 해 코어"
                        category="sun"
                        cores={coreOptionsByCategory.sun}
                        selectedCore={selectedCoresByCategory.sun}
                        onToggle={toggleCore}
                        disabled={!coresEnabled}
                      />
                      <CoreCategorySelector
                        title="질서의 달 코어"
                        category="moon"
                        cores={coreOptionsByCategory.moon}
                        selectedCore={selectedCoresByCategory.moon}
                        onToggle={toggleCore}
                        disabled={!coresEnabled}
                      />
                      <CoreCategorySelector
                        title="질서의 별 코어"
                        category="star"
                        cores={coreOptionsByCategory.star}
                        selectedCore={selectedCoresByCategory.star}
                        onToggle={toggleCore}
                        disabled={!coresEnabled}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <span className="text-sm text-[var(--gray-9)]">
                  직업 각인를 선택하면 코어가 표시됩니다.
                </span>
              )}
            </div>
          </div>
        </div>
      </>
    )}
  </>
);

/**
 * 분석 결과를 요약, 스킬 통계, 캐릭터별 상세 정보로 나누어 렌더링하는 컴포넌트입니다.
 */
const AnalysisResults = ({
  results,
  selectedSkill,
  setSelectedSkill,
  groupedTripodData,
  skillDetailStats,
}) => {
  const tierColorMap = {
    1: 'text-[var(--blue-9)]',
    2: 'text-[var(--green-9)]',
    3: 'text-[var(--accent-11)]',
  };

  return (
    <>
      {results && (
        <>
          <div className="block w-full flex-row border-t border-[var(--gray-5)] pt-3 md:flex">
            <SectionHeader
              title="분석 결과 요약"
              description="분석된 데이터의 주요 통계입니다."
            />
            <div className="grid w-full grid-cols-2 gap-4 md:w-9/12 md:grid-cols-4">
              <StatCard
                label="분석대상 캐릭터"
                value={results.totalCharacters}
              />
              <StatCard
                label="조건 부합 캐릭터"
                value={results.keptCharacters.length}
              />
              <StatCard
                label="추출된 트라이포드"
                value={results.allRows.length}
              />
              <StatCard
                label="고유 스킬"
                value={results.skillUsageRows.length}
              />
            </div>
          </div>

          <div className="block w-full flex-row border-t border-[var(--gray-5)] pt-3 md:flex">
            <SectionHeader
              title="스킬 사용 통계"
              description="랭커들의 스킬 채용률입니다."
            />
            <div className="w-full md:w-9/12">
              <div className="w-full rounded-lg border border-dashed border-[var(--gray-8)] p-3">
                <div className="flex border-b border-[var(--gray-5)] pb-3 text-sm text-[var(--gray-11)]">
                  <div className="flex-1 text-center">스킬명</div>
                  <div className="flex-1 text-center">사용 캐릭터 수</div>
                  <div className="flex-1 text-center">사용률</div>
                </div>
                {results.skillUsageRows.map((row) => (
                  <React.Fragment key={row.skill_name}>
                    <div
                      onClick={() =>
                        setSelectedSkill((prev) =>
                          prev === row.skill_name ? null : row.skill_name,
                        )
                      }
                      className={`flex h-10 cursor-pointer items-center text-sm text-[var(--gray-11)] hover:bg-[var(--gray-4)] ${
                        selectedSkill === row.skill_name
                          ? 'bg-[var(--accent-4)]'
                          : ''
                      }`}
                    >
                      <div className="flex-1 text-center font-medium">
                        {row.skill_name}
                      </div>
                      <div className="flex-1 text-center">{row.characters}</div>
                      <div className="flex-1 text-center">
                        {results.keptCharacters.length > 0
                          ? Math.round(
                              (row.characters / results.keptCharacters.length) *
                                100,
                            )
                          : 0}
                        %
                      </div>
                    </div>
                    {selectedSkill === row.skill_name && skillDetailStats && (
                      <div className="bg-[var(--gray-1)] p-4 text-xs">
                        <div className="mb-3 text-sm font-bold text-[var(--gray-12)]">
                          세부 통계 (총 {skillDetailStats.total}명 중)
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                          <div>
                            <h5 className="mb-1.5 font-semibold text-[var(--gray-12)]">
                              스킬 레벨
                            </h5>
                            <ul className="space-y-1 text-[var(--gray-11)]">
                              {[...skillDetailStats.skillLevels.entries()].map(
                                ([level, count]) => (
                                  <li key={level}>
                                    - {level}레벨: {count}명 (
                                    {(
                                      (count / skillDetailStats.total) *
                                      100
                                    ).toFixed(1)}
                                    %)
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                          <div>
                            <h5 className="mb-1.5 font-semibold text-[var(--gray-12)]">
                              트라이포드
                            </h5>
                            <div className="space-y-2">
                              {[...skillDetailStats.tripods.entries()].map(
                                ([tier, tripodList]) => (
                                  <div key={tier}>
                                    <h6
                                      className={`font-semibold ${
                                        tierColorMap[tier]
                                          ? tierColorMap[tier]
                                          : 'text-[var(--gray-11)]'
                                      }`}
                                    >
                                      {tier}티어
                                    </h6>
                                    <ul className="space-y-1 pl-2 text-[var(--gray-11)]">
                                      {tripodList.map(({ name, count }) => (
                                        <li key={name}>
                                          - {name}: {count}명 (
                                          {(
                                            (count / skillDetailStats.total) *
                                            100
                                          ).toFixed(1)}
                                          %)
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                          <div>
                            <h5 className="mb-1.5 font-semibold text-[var(--gray-12)]">
                              룬
                            </h5>
                            <ul className="space-y-1 text-[var(--gray-11)]">
                              {[...skillDetailStats.runes.entries()].map(
                                ([rune, count]) => (
                                  <li key={rune}>
                                    - {rune}: {count}명 (
                                    {(
                                      (count / skillDetailStats.total) *
                                      100
                                    ).toFixed(1)}
                                    %)
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="block w-full flex-row border-t border-[var(--gray-5)] pt-3 md:flex">
            <SectionHeader
              title="캐릭터 스킬 상세"
              description="캐릭터별 스킬, 레벨, 트라이포드, 룬 정보입니다."
            />
            <div className="w-full md:w-9/12">
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
                {Object.entries(groupedTripodData).map(
                  ([character, skills]: [string, any], characterIndex) => {
                    const skillEntries = Object.entries(skills);
                    return (
                      <div
                        key={character}
                        className={`flex text-xs text-[var(--gray-11)] ${
                          characterIndex > 0
                            ? 'border-t-2 border-t-[var(--gray-6)]'
                            : ''
                        }`}
                      >
                        <div className="flex w-1/5 items-center justify-center border-r border-[var(--gray-4)] p-2 text-sm font-bold">
                          <a
                            href={`https://kloa.gg/characters/${encodeURIComponent(
                              character,
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-600 decoration-from-font transition-colors hover:text-sky-700 hover:underline dark:text-sky-400 dark:hover:text-sky-300"
                          >
                            {character}
                          </a>
                        </div>
                        <div className="w-4/5">
                          {skillEntries.map(
                            ([skillName, skillData]: [string, any], index) => (
                              <div
                                key={skillName}
                                className={`flex min-h-10 items-center ${
                                  index < skillEntries.length - 1
                                    ? 'border-b border-[var(--gray-4)]'
                                    : ''
                                } ${
                                  selectedSkill === skillName
                                    ? 'bg-[var(--accent-6)]'
                                    : ''
                                }`}
                              >
                                <div className="w-3/12 p-2 text-center">
                                  <TooltipChip
                                    label={skillName}
                                    html={skillData.skillTooltipHtml || ''}
                                    icon={skillData.skillIcon}
                                    size="md"
                                  />
                                </div>
                                <div className="w-2/12 p-2 text-center">
                                  {skillData.skill_level}
                                </div>
                                <div className="w-5/12 p-2 text-center text-xs">
                                  {Array.isArray(skillData.tripods) &&
                                  skillData.tripods.length > 0 ? (
                                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                                      {skillData.tripods.map(
                                        (t: any, idx: number) => (
                                          <TooltipChip
                                            key={`${skillName}-tripod-${idx}`}
                                            label={t.name || ''}
                                            html={t.tooltipHtml || ''}
                                            icon={t.icon}
                                            size="sm"
                                          />
                                        ),
                                      )}
                                    </div>
                                  ) : (
                                    <span>-</span>
                                  )}
                                </div>
                                <div className="w-2/12 p-2 text-center">
                                  {skillData.rune_name ? (
                                    <TooltipChip
                                      label={skillData.rune_name}
                                      html={skillData.runeTooltipHtml || ''}
                                      icon={skillData.runeIcon}
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
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

/**
 * 데이터 처리 과정에서 발생하는 로그를 표시하는 컴포넌트입니다.
 */
const AnalysisLogs = ({ logs, logBoxRef }) => (
  <>
    {logs.length > 1 && (
      <div className="block w-full flex-row border-t border-[var(--gray-5)] pt-3 md:flex">
        <SectionHeader
          title="분석 로그"
          description="API 요청 및 데이터 처리 과정의 로그입니다."
        />
        <div className="w-full md:w-9/12">
          <div
            ref={logBoxRef}
            className="max-h-60 overflow-y-auto rounded-lg bg-[var(--gray-1)] p-4 font-mono text-xs text-[var(--gray-11)]"
          >
            {logs.map((logMsg, i) => (
              <div key={i}>{logMsg}</div>
            ))}
          </div>
        </div>
      </div>
    )}
  </>
);

/**
 * 로스트아크 전투력 랭킹을 기반으로 스킬 및 트라이포드 사용 통계를 분석하는 페이지 컴포넌트입니다.
 */
/**
 * 로스트아크 전투력 랭킹을 기반으로 스킬 및 트라이포드 사용 통계를 분석하는 페이지 컴포넌트입니다.
 * 모든 상태 관리와 핵심 로직 실행을 담당하며, 하위 UI 컴포넌트를 조립합니다.
 */
export default function SkillAnalyzer() {
  const [job, setJob] = useState('');
  const [enlightenmentTree, setEnlightenmentTree] = useState('');
  const [endRank, setEndRank] = useState('10');
  const [minCombatPower, setMinCombatPower] = useState('0');
  const [maxCombatPower, setMaxCombatPower] = useState('9999');
  const [requiredCores, setRequiredCores] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { isTestMode } = useTestMode();
  const [progress, setProgress] = useState<ProgressState>({
    current: 0,
    total: 0,
    message: '',
  });
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [preparedData, setPreparedData] = useState<PreparedCharacterData[]>([]);
  const [totalRanked, setTotalRanked] = useState<number>(0);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const [quotaBanner, setQuotaBanner] = useState<{
    active: boolean;
    shown: number;
    total: number;
  }>({ active: false, shown: 0, total: 60 });

  const [enlightenmentOptions, setEnlightenmentOptions] = useState<
    EnlightenmentTree[]
  >([]);
  const [coreOptions, setCoreOptions] = useState<string[]>([]);
  const [coreOptionsByCategory, setCoreOptionsByCategory] = useState<{
    sun: CoreMeta[];
    moon: CoreMeta[];
    star: CoreMeta[];
  }>({ sun: [], moon: [], star: [] });
  const [selectedCoresByCategory, setSelectedCoresByCategory] = useState<{
    sun?: string;
    moon?: string;
    star?: string;
  }>({});
  const logBoxRef = useRef<HTMLDivElement | null>(null);

  // 분석 과정을 기록하고 화면에 표시하기 위한 로그 함수
  const log = useCallback(
    (message: string, type: 'info' | 'error' = 'info') => {
      const time = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev, `[${time}] ${message}`]);
      if (type === 'error') console.error(message);
    },
    [],
  );

  // API 모듈에 전달하여 UI 상태(로딩, 쿼터 대기 등)를 업데이트하기 위한 콜백 함수 객체
  const apiCallbacks: ApiCallbacks = useMemo(
    () => ({
      log,
      startQuotaStatus: (totalSec: number) => {
        setQuotaBanner({ active: true, shown: 0, total: totalSec });
      },
      updateQuotaStatus: (shownSec: number, totalSec: number) => {
        setQuotaBanner({ active: true, shown: shownSec, total: totalSec });
      },
      endQuotaStatus: () => {
        setQuotaBanner((prev) => ({ ...prev, active: false }));
      },
    }),
    [log],
  );

  // 로그가 추가될 때마다 로그 박스를 맨 아래로 스크롤합니다.
  useEffect(() => {
    const el = logBoxRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [logs]);

  // 직업 변경 시, 선택된 코어 및 관련 옵션을 초기화하는 함수
  const resetCoreSelection = useCallback(() => {
    setCoreOptionsByCategory({ sun: [], moon: [], star: [] });
    setCoreOptions([]);
    setSelectedCoresByCategory({});
    setRequiredCores([]);
  }, []);

  /**
   * 옵션 객체(예: { '10': '...', '14': '...', ... })를 툴팁 문자열로 변환합니다.
   * - 존재하는 모든 키를 숫자 오름차순으로 정렬하여 "[키P] 설명" 형식으로 한 줄씩 나열합니다.
   * - 예) 10, 14, 17, 18 ... 순으로 정렬되며, 특정 키(14/17 등)를 우선하지 않습니다.
   * @param optionObj 각 코어의 포인트별 설명 맵 (키는 숫자 문자열, 값은 설명)
   * @returns 개행(\n)으로 연결된 툴팁 문자열. 값이 없거나 optionObj가 없으면 빈 문자열
   */
  const buildCoreTooltip = (optionObj: Record<string, string> | undefined) => {
    if (!optionObj) return '';
    const orderedKeys = Object.keys(optionObj).sort(
      (a, b) => Number(a) - Number(b),
    );
    const lines = orderedKeys
      .map((k) =>
        optionObj[k]
          ? `<span style="color: var(--accent-11)">[${k}P]</span> ${optionObj[k]}`
          : undefined,
      )
      .filter((v): v is string => Boolean(v));
    return lines.join('\n');
  };

  // 직업(job) 선택이 변경되면 해당 직업의 각인 목록을 설정합니다.
  useEffect(() => {
    const selectedJobData = JOB_DATA.find((j) => j.code.toString() === job);
    if (selectedJobData) {
      setEnlightenmentOptions(selectedJobData.enlightenmentTree);
      setEnlightenmentTree('');
      resetCoreSelection();
    } else {
      setEnlightenmentOptions([]);
      resetCoreSelection();
    }
  }, [job, resetCoreSelection]);

  // 직업 각인(enlightenmentTree) 선택이 변경되면 해당 각인의 코어 목록을 설정합니다.
  useEffect(() => {
    const selectedTreeData = enlightenmentOptions.find(
      (t) => t.name === enlightenmentTree,
    );
    if (selectedTreeData && (selectedTreeData as any).arkgrid) {
      const grid = (selectedTreeData as any).arkgrid as {
        sun?: { name: string; option?: Record<string, string> }[];
        moon?: { name: string; option?: Record<string, string> }[];
        star?: { name: string; option?: Record<string, string> }[];
      };
      const sun: CoreMeta[] =
        grid.sun?.map((c) => ({
          name: c.name,
          tooltip: buildCoreTooltip(c.option),
        })) ?? [];
      const moon: CoreMeta[] =
        grid.moon?.map((c) => ({
          name: c.name,
          tooltip: buildCoreTooltip(c.option),
        })) ?? [];
      const star: CoreMeta[] =
        grid.star?.map((c) => ({
          name: c.name,
          tooltip: buildCoreTooltip(c.option),
        })) ?? [];
      setCoreOptionsByCategory({ sun, moon, star });
      setCoreOptions([...sun, ...moon, ...star].map((c) => c.name));
      setRequiredCores([]);
      setSelectedCoresByCategory({});
    } else {
      resetCoreSelection();
    }
  }, [enlightenmentTree, enlightenmentOptions, resetCoreSelection]);

  /**
   * 코어 선택 버튼을 토글(선택/해제)하는 함수입니다.
   * @param {string} core - 선택된 코어의 이름
   */
  /**
   * 코어 선택 버튼을 토글(선택/해제)하는 함수입니다.
   */
  const toggleCore = (core: string) => {
    const inSun = coreOptionsByCategory.sun.some((c) => c.name === core);
    const inMoon = coreOptionsByCategory.moon.some((c) => c.name === core);
    const category: 'sun' | 'moon' | 'star' = inSun
      ? 'sun'
      : inMoon
        ? 'moon'
        : 'star';
    setSelectedCoresByCategory((prev) => ({
      ...prev,
      [category]:
        prev[category as 'sun' | 'moon' | 'star'] === core ? undefined : core,
    }));
  };

  // 사용자가 선택한 카테고리별 코어를 하나의 배열로 통합합니다.
  useEffect(() => {
    const list = [
      selectedCoresByCategory.sun,
      selectedCoresByCategory.moon,
      selectedCoresByCategory.star,
    ].filter(Boolean) as string[];
    setRequiredCores(list);
  }, [selectedCoresByCategory]);

  // 새로운 분석 시작 시, 이전 상태(로그, 진행률, 결과 등)를 모두 초기화하는 함수
  const resetAnalysisState = useCallback(() => {
    setLogs(['데이터 수집을 시작합니다...']);
    setProgress({ current: 0, total: 100, message: '' });
    setSelectedCoresByCategory({});
    setRequiredCores([]);
    setPreparedData([]);
    setResults(null);
  }, []);

  /**
   * 캐릭터 이름 목록을 받아, 각 캐릭터의 상세 정보를 API로 조회하고 분석에 필요한 형태로 가공합니다.
   * @param {string[]} names - 캐릭터 이름 배열
   * @param {number} startRank - 분석 시작 순위 (로그 표기용)
   * @returns {Promise<PreparedCharacterData[]>} - 가공된 캐릭터 데이터 배열을 담은 Promise
   */
  /**
   * 캐릭터 이름 목록을 받아, 각 캐릭터의 상세 정보를 API로 조회하고 분석에 필요한 형태로 가공합니다.
   */
  const fetchAndPrepareCharacterData = useCallback(
    async (names: string[], startRank: number) => {
      let completed = 0;

      const characterData = await mapPool<
        string,
        (PreparedCharacterData & { rank: number }) | undefined
      >(names, CONCURRENCY_ARMORY, async (name, i) => {
        const rank = startRank + i;
        try {
          const armory = await fetchArmories(name, apiCallbacks);
          const prepared = prepareCharacterDataFromArmory(name, armory);
          if (prepared.rows.length === 0) {
            log(`[실패] ${name}님의 정보를 가져오지 못했습니다.`);
            return undefined;
          }
          return { ...prepared, rank };
        } catch (error: any) {
          log(
            `[오류] ${rank.toString().padStart(2, '0')}. ${name} - 실패: ${error.message}`,
            'error',
          );
          return undefined;
        } finally {
          completed += 1;
          setProgress({
            current: completed,
            total: names.length,
            message: `캐릭터 데이터 수집 중... (${completed}/${names.length})`,
          });
        }
      });

      const validData = characterData.filter(
        (d): d is PreparedCharacterData & { rank: number } => !!d,
      );

      for (const item of validData) {
        log(
          `[완료] ${String(item.rank).padStart(2, '0')}. ${item.name} - ${
            item.rows.length
          }개의 트라이포드 추출`,
        );
      }

      return validData;
    },
    [apiCallbacks, log],
  );

  /**
   * API를 통해 랭커 목록 조회부터 캐릭터별 상세 정보 조회까지 데이터 수집의 전체 과정을 담당합니다.
   */
  const acquireRankAndCharacters = useCallback(
    async (
      startRank: number,
      endRankNum: number,
      jobCode: string,
      treeName: string,
      minCP: number,
      maxCP: number,
    ) => {
      log(
        `설정: 직업=${jobCode}, 각성트리=${treeName}, 랭크=${startRank}-${endRankNum}, 전투력=${minCP}-${maxCP}`,
      );
      setProgress({
        current: 0,
        total: ANALYSIS_STEPS,
        message: '랭킹 데이터 수집 중...',
      });
      const names = await fetchRankNames(
        startRank,
        endRankNum,
        jobCode,
        treeName,
        minCP,
        maxCP,
        apiCallbacks,
      );
      setTotalRanked(names.length);
      log(`랭킹 데이터 수집 완료: ${names.length}명`);

      setProgress({
        current: 1,
        total: ANALYSIS_STEPS,
        message: '캐릭터 데이터 수집 중...',
      });
      log('캐릭터 데이터 수집을 시작합니다...');
      const prepared = await fetchAndPrepareCharacterData(names, startRank);

      setProgress({
        current: 3,
        total: ANALYSIS_STEPS,
        message: '결과 준비 중...',
      });
      setPreparedData(prepared);
      setProgress({ current: 4, total: ANALYSIS_STEPS, message: '완료' });
    },
    [apiCallbacks, log, fetchAndPrepareCharacterData],
  );

  /**
   * 테스트 모드 시, IndexedDB에 캐시된 모든 캐릭터 데이터를 불러와 분석을 준비합니다.
   */
  const loadDataFromCache = useCallback(async () => {
    log('테스트 모드: IndexedDB에서 데이터 로드를 시작합니다.');
    setIsAnalyzing(true);
    resetAnalysisState();

    try {
      const cachedArmories = await idbGetAllArmories();
      if (!cachedArmories || cachedArmories.length === 0) {
        log(
          '캐시된 데이터가 없습니다. API를 통해 먼저 데이터를 수집해주세요.',
          'error',
        );
        alert('IndexedDB에 캐시된 데이터가 없습니다.');
        setIsAnalyzing(false);
        return;
      }

      log(`캐시 데이터 로드 완료: ${cachedArmories.length}명`);
      setTotalRanked(cachedArmories.length);
      setProgress({
        current: 1,
        total: ANALYSIS_STEPS,
        message: '캐릭터 데이터 처리 중...',
      });

      const prepared: PreparedCharacterData[] = [];
      let completed = 0;

      for (const armoryData of cachedArmories) {
        const { name, data: armory } = armoryData;
        try {
          const preparedData = prepareCharacterDataFromArmory(name, armory);
          if (preparedData.rows.length > 0) {
            prepared.push(preparedData);
            log(
              `[캐시] ${String(completed + 1).padStart(2, '0')}. ${name} - ${
                preparedData.rows.length
              }개의 트라이포드 추출`,
            );
          } else {
            log(`[실패] ${name}님의 정보가 캐시에 비어있습니다.`);
          }
        } catch (error: any) {
          log(
            `[오류] ${String(completed + 1).padStart(2, '0')}. ${name} - 실패: ${
              error.message
            }`,
            'error',
          );
        } finally {
          completed += 1;
          setProgress({
            current: completed,
            total: cachedArmories.length,
            message: `캐릭터 데이터 처리 중... (${completed}/${cachedArmories.length})`,
          });
        }
      }

      setPreparedData(prepared);
      setProgress({ current: 4, total: ANALYSIS_STEPS, message: '완료' });
      log(
        '캐시 데이터 처리가 완료되었습니다. 조건을 선택하면 통계를 즉시 갱신합니다.',
      );
    } catch (error: any) {
      log(`테스트 모드 오류: ${error.message}`, 'error');
      alert(`테스트 모드 실행 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  }, [log, resetAnalysisState]);

  /**
   * 사용자가 '검색 시작' 버튼을 눌렀을 때 폼 제출을 처리하는 메인 이벤트 핸들러입니다.
   * 테스트 모드 여부에 따라 `loadDataFromCache` 또는 `acquireRankAndCharacters`를 호출합니다.
   */
  const handleFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (isTestMode) {
        await loadDataFromCache();
        return;
      }

      if (!job || !enlightenmentTree) {
        alert('직업과 직업 각인를 모두 선택해주세요.');
        return;
      }

      setIsAnalyzing(true);
      resetAnalysisState();
      try {
        await acquireRankAndCharacters(
          1,
          parseInt(endRank),
          job,
          enlightenmentTree,
          parseInt(minCombatPower, 10) || 0,
          parseInt(maxCombatPower, 10) || 9999,
        );
        log(
          '검색 데이터 수집이 완료되었습니다. 조건을 선택하면 통계를 즉시 갱신합니다.',
        );
      } catch (error: any) {
        log(`검색 중 오류 발생: ${error.message}`, 'error');
        alert(`검색 중 오류가 발생했습니다: ${error.message}`);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [
      job,
      enlightenmentTree,
      endRank,
      minCombatPower,
      maxCombatPower,
      resetAnalysisState,
      acquireRankAndCharacters,
      log,
      isTestMode,
      loadDataFromCache,
    ],
  );

  // `preparedData` 또는 `requiredCores`가 변경될 때마다 실시간으로 통계 결과를 필터링하고 계산합니다。
  useEffect(() => {
    if (!preparedData || preparedData.length === 0) {
      setResults(null);
      return;
    }
    if (requiredCores.length === 0) {
      setResults(null);
      return;
    }
    const normalizedCores = new Set(requiredCores.map(norm));
    const kept: string[] = [];
    const allRows: TripodTableRow[] = [];
    const skillUsageCounter = new Map<string, number>();

    for (const entry of preparedData) {
      const hasAll = Array.from(normalizedCores).every((core) =>
        Array.from(entry.arkgridSet).some((s: string) => s.includes(core)),
      );
      if (!hasAll) continue;
      kept.push(entry.name);
      allRows.push(...entry.rows);
      entry.usedSkills.forEach((skill: string) => {
        skillUsageCounter.set(skill, (skillUsageCounter.get(skill) || 0) + 1);
      });
    }

    const skillUsageRows = Array.from(skillUsageCounter.entries())
      .map(([skillName, characters]) => ({ skill_name: skillName, characters }))
      .sort((a, b) => b.characters - a.characters);

    setResults({
      allRows,
      skillUsageRows,
      keptCharacters: kept,
      totalCharacters: totalRanked,
    });
  }, [requiredCores, preparedData, totalRanked]);

  // 최종 분석 결과를 캐릭터별, 스킬별로 그룹화하여 상세 테이블에 표시하기 쉽게 가공합니다.
  const groupedTripodData = useMemo(() => {
    if (!results) return {};
    // 1) 캐릭터/스킬 기본 집계
    const base = results.allRows.reduce((acc, row) => {
      const charKey = row.character;
      const skillKey = row.skill_name;
      if (!acc[charKey]) acc[charKey] = {};
      if (!acc[charKey][skillKey]) {
        acc[charKey][skillKey] = {
          skill_level: row.skill_level,
          rune_name: row.rune_name,
          tripods: [] as any[],
        };
      }
      if (row.tripod_name)
        acc[charKey][skillKey].tripods.push({
          tier: row.tripod_tier,
          name: row.tripod_name,
        });
      return acc;
    }, {} as any);

    // 2) 준비된 데이터에서 tooltip/icon 병합
    const byChar: Record<string, Record<string, any>> = {};
    for (const p of preparedData) {
      const bundles = (p as any).tooltipBySkill || {};
      byChar[p.name] = bundles;
    }

    for (const [charName, skills] of Object.entries(base)) {
      const b = byChar[charName] || {};
      for (const [skillName, skillData] of Object.entries(
        skills as Record<string, any>,
      )) {
        const bundle = b[skillName];
        if (!bundle) continue;
        skillData.skillTooltipHtml = bundle.skillHtml || '';
        skillData.skillIcon = bundle.skillIcon || '';
        skillData.runeTooltipHtml = bundle.runeHtml || '';
        skillData.runeIcon = bundle.runeIcon || '';
        if (Array.isArray(skillData.tripods)) {
          skillData.tripods = skillData.tripods.map((t: any) => {
            const tb = bundle.tripods?.[t.name];
            return {
              ...t,
              tooltipHtml: tb?.html || '',
              icon: tb?.icon,
              tier: typeof t.tier === 'number' ? t.tier : (tb?.tier ?? t.tier),
            };
          });
        }
      }
    }

    return base;
  }, [results, preparedData]);

  const skillDetailStats = useMemo(() => {
    if (!selectedSkill || !results) {
      return null;
    }

    const skillLevels = new Map<number, number>();
    const tripods = new Map<string, number>();
    const runes = new Map<string, number>();

    const charactersUsingSkill = Object.values(groupedTripodData).filter(
      (skills: any) => skills[selectedSkill],
    );

    for (const skills of charactersUsingSkill) {
      const skillData = (skills as any)[selectedSkill];
      if (!skillData) continue;

      skillLevels.set(
        skillData.skill_level,
        (skillLevels.get(skillData.skill_level) || 0) + 1,
      );

      if (skillData.rune_name) {
        runes.set(
          skillData.rune_name,
          (runes.get(skillData.rune_name) || 0) + 1,
        );
      }

      for (const tripod of skillData.tripods) {
        const tripodKey = `${tripod.tier + 1}T-${tripod.name}`;
        tripods.set(tripodKey, (tripods.get(tripodKey) || 0) + 1);
      }
    }

    const sortedSkillLevels = new Map(
      [...skillLevels.entries()].sort((a, b) => b[1] - a[1]),
    );
    const sortedTripods = new Map(
      [...tripods.entries()].sort((a, b) => b[1] - a[1]),
    );
    const sortedRunes = new Map(
      [...runes.entries()].sort((a, b) => b[1] - a[1]),
    );

    const tripodsByTier = new Map<number, { name: string; count: number }[]>();
    for (const [tripodKey, count] of sortedTripods.entries()) {
      const tier = parseInt(tripodKey.charAt(0), 10);
      const name = tripodKey.substring(3);

      if (!tripodsByTier.has(tier)) {
        tripodsByTier.set(tier, []);
      }
      tripodsByTier.get(tier)!.push({ name, count });
    }
    const sortedTripodsByTier = new Map(
      [...tripodsByTier.entries()].sort((a, b) => a[0] - b[0]),
    );

    return {
      skillLevels: sortedSkillLevels,
      tripods: sortedTripodsByTier,
      runes: sortedRunes,
      total: charactersUsingSkill.length,
    };
  }, [selectedSkill, results, groupedTripodData]);

  const coresEnabled = preparedData.length > 0;
  const isWaiting = quotaBanner.active;
  const waitingPct = isWaiting
    ? Math.min(
        100,
        Math.round((quotaBanner.shown / Math.max(1, quotaBanner.total)) * 100),
      )
    : 0;
  const buttonLabel = isWaiting
    ? `토큰 대기 중(${waitingPct}%)`
    : isAnalyzing
      ? '검색 중...'
      : '검색 시작';

  return (
    <div className="flex w-full flex-col gap-y-4 rounded-lg bg-[var(--gray-3)] p-5">
      <SearchForm
        handleFormSubmit={handleFormSubmit}
        job={job}
        setJob={setJob}
        enlightenmentTree={enlightenmentTree}
        setEnlightenmentTree={setEnlightenmentTree}
        enlightenmentOptions={enlightenmentOptions}
        minCombatPower={minCombatPower}
        setMinCombatPower={setMinCombatPower}
        maxCombatPower={maxCombatPower}
        setMaxCombatPower={setMaxCombatPower}
        endRank={endRank}
        setEndRank={setEndRank}
        isAnalyzing={isAnalyzing}
        isWaiting={isWaiting}
        buttonLabel={buttonLabel}
        progress={progress}
      />

      <SearchFilters
        isAnalyzing={isAnalyzing}
        preparedData={preparedData}
        coreOptions={coreOptions}
        coreOptionsByCategory={coreOptionsByCategory}
        selectedCoresByCategory={selectedCoresByCategory}
        toggleCore={toggleCore}
        coresEnabled={coresEnabled}
      />

      <AnalysisResults
        results={results}
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
        groupedTripodData={groupedTripodData}
        skillDetailStats={skillDetailStats}
      />

      <AnalysisLogs logs={logs} logBoxRef={logBoxRef} />
    </div>
  );
}
