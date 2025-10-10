/**
 * @file Armory → 화면 모델 변환 서비스
 * - 이 파일의 모든 주석은 한글로 작성합니다.
 * - 기능 변경 없이 가독성과 안정성 향상에 초점을 둔 최적화 버전입니다.
 * - 역할: Armory 원천 데이터에서 화면 렌더에 필요한 구조(rows/usedSkills/arkgridSet/툴팁 번들)를 생성합니다.
 */

import {
  aggregateSkillUsageByCharacter,
  deepCleanHtml,
  extractArkgridSlotNameSet,
  extractSelectedRows,
} from '../utils';
import type { PreparedCharacterData } from '../types';
import { toHtmlFromLoaTooltip } from '../parsers/tooltip';

// === 내부 타입 ==================================================================

/**
 * 트라이포드 툴팁 정보
 */
interface TooltipTripod {
  html: string;
  icon?: string;
  tier?: number;
}

/**
 * 스킬 단위 툴팁 번들(스킬/룬/트포)
 */
interface TooltipBundle {
  skillHtml?: string;
  skillIcon?: string;
  runeHtml?: string;
  runeIcon?: string;
  tripods: Record<string, TooltipTripod>;
}

// === 헬퍼 함수 ==================================================================

/**
 * 주어진 스킬 객체에서 툴팁 번들을 생성합니다.
 * - JSON/HTML 툴팁은 `toHtmlFromLoaTooltip`으로 정규화합니다.
 * - 빈 값/누락 필드는 안전하게 처리합니다.
 */
function buildTooltipBundleFromSkill(skill: any): TooltipBundle {
  // 스킬 기본 정보 처리
  const skillHtml = toHtmlFromLoaTooltip(skill?.Tooltip);
  const skillIcon = skill?.Icon;

  // 룬 정보 처리(없으면 undefined 유지)
  const rune = skill?.Rune;
  const runeHtml = rune ? toHtmlFromLoaTooltip(rune?.Tooltip) : undefined;
  const runeIcon = rune?.Icon;

  // 트라이포드 정보 처리(이름이 없는 항목은 건너뜀)
  const tripods: Record<string, TooltipTripod> = {};
  if (Array.isArray(skill?.Tripods)) {
    for (const t of skill.Tripods) {
      const name: string = t?.Name || '';
      if (!name) continue;
      tripods[name] = {
        html: toHtmlFromLoaTooltip(t?.Tooltip),
        icon: t?.Icon,
        tier: typeof t?.Tier === 'number' ? t.Tier : undefined,
      };
    }
  }

  return { skillHtml, skillIcon, runeHtml, runeIcon, tripods };
}

// === 메인 변환 함수 ==============================================================

/**
 * Armory 원천 데이터를 화면 모델로 변환합니다.
 * @param name 캐릭터명
 * @param armory Armory 전체 객체
 * @returns rows/usedSkills/arkgridSet 및 스킬별 툴팁 번들
 */
export const prepareCharacterDataFromArmory = (
  name: string,
  armory: any,
): PreparedCharacterData & {
  tooltipBySkill?: Record<string, TooltipBundle>;
} => {
  // Armory가 비어 있으면 안전한 초기값 반환
  if (!armory) {
    return { name, rows: [], usedSkills: new Set(), arkgridSet: new Set() };
  }

  // --- ArmorySkills 정규화 ------------------------------------------------------
  const skillsClean: any[] = deepCleanHtml(armory.ArmorySkills || []);

  // --- 화면에 필요한 1차 구조 생성 --------------------------------------------
  const rows = extractSelectedRows(name, skillsClean);
  const usedSkills = aggregateSkillUsageByCharacter(skillsClean);
  const arkgridSet = extractArkgridSlotNameSet(armory);

  // --- 스킬별 툴팁 번들 생성 ----------------------------------------------------
  const tooltipBySkill: Record<string, TooltipBundle> = {};
  for (const s of skillsClean) {
    const key: string = s?.Name;
    if (!key) continue; // 이름이 없으면 건너뜀(안전 처리)
    tooltipBySkill[key] = buildTooltipBundleFromSkill(s);
  }

  // --- 반환 --------------------------------------------------------------------
  return { name, rows, usedSkills, arkgridSet, tooltipBySkill };
};
