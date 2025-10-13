/**
 * @file Armory → 화면 모델 변환 서비스
 * - 이 파일의 모든 주석은 한글로 작성합니다.
 * - 역할: Armory 원천 데이터에서 화면 렌더에 필요한 구조(rows/usedSkills/arkgridSet/스킬상세)를 생성합니다.
 */

import {
  aggregateSkillUsageByCharacter,
  extractArkgridSlotNameSet,
  extractSelectedRows,
} from '../utils';
import type { PreparedCharacterData, SkillDetail } from '../types';

// === 헬퍼 함수 ==================================================================

/**
 * 툴팁 데이터에 포함된 HTML 문자열에서 스타일 태그(<font> 등)를 제거하고 줄바꿈(<br>)만 유지합니다.
 * @param html 원본 HTML 문자열
 * @returns 정제된 HTML 문자열
 */
function sanitizeHtml(html: string | undefined): string {
  if (!html) return '';
  // <br> 태그는 유지하고 나머지 HTML 태그는 모두 제거합니다.
  return html.replace(/<(?!br\s*\/?)[^>]+>/gi, '');
}

/**
 * 스킬 데이터(ArmorySkills의 개별 요소)를 새로운 상세 정보 구조로 변환합니다.
 * @param skill Armory의 스킬 객체
 * @returns SkillDetail 구조에 맞는 객체
 */
function buildSkillDetail(skill: any): [string, SkillDetail] | null {
  if (!skill || !skill.Name || skill.Level <= 1) {
    return null;
  }

  const skillName = skill.Name;
  let skillTooltip: any = {};
  let runeTooltip: any = {};

  try {
    if (typeof skill.Tooltip === 'string') {
      skillTooltip = JSON.parse(skill.Tooltip);
    }
  } catch {
    // JSON 파싱 실패 시 빈 객체 유지
  }

  try {
    if (skill.Rune && typeof skill.Rune.Tooltip === 'string') {
      runeTooltip = JSON.parse(skill.Rune.Tooltip);
    }
  } catch {
    // JSON 파싱 실패 시 빈 객체 유지
  }

  const detail: SkillDetail = {
    icon: skill.Icon,
    level: skill.Level,
    tooltip: {
      header_1: sanitizeHtml(skillTooltip.Element_001?.value?.name),
      header_2: sanitizeHtml(skillTooltip.Element_001?.value?.level),
      body: sanitizeHtml(skillTooltip.Element_005?.value),
    },
    tripods: (skill.Tripods || [])
      .filter((t: any) => t.IsSelected)
      .map((t: any) => ({
        icon: t.Icon,
        tier: t.Tier,
        name: t.Name,
        tooltip: {
          body: sanitizeHtml(t.Tooltip),
        },
      })),
    rune: skill.Rune
      ? {
          icon: skill.Rune.Icon,
          name: skill.Rune.Name,
          grade: skill.Rune.Grade,
          tooltip: {
            body: sanitizeHtml(runeTooltip.Element_003?.value?.Element_001),
          },
        }
      : null,
  };

  return [skillName, detail];
}

// === 메인 변환 함수 =============================================================

/**
 * Armory 원천 데이터를 화면 모델로 변환합니다.
 * @param name 캐릭터명
 * @param armory Armory 전체 객체
 * @returns rows/usedSkills/arkgridSet 및 스킬별 상세 정보
 */
export const prepareCharacterDataFromArmory = (
  name: string,
  armory: any,
): PreparedCharacterData & {
  skillDetails: Record<string, SkillDetail>;
} => {
  // Armory가 비어 있으면 안전한 초기값 반환
  if (!armory) {
    return {
      name,
      rows: [],
      usedSkills: new Set(),
      arkgridSet: new Set(),
      skillDetails: {},
    };
  }

  // --- ArmorySkills 데이터 추출 (정제 과정은 여기서 불필요) --------------------
  const skills = armory.ArmorySkills || [];

  // --- 화면에 필요한 1차 구조 생성 --------------------------------------------
  const rows = extractSelectedRows(name, skills);
  const usedSkills = aggregateSkillUsageByCharacter(skills);
  const arkgridSet = extractArkgridSlotNameSet(armory);

  // --- 스킬별 상세 정보(SkillDetail) 생성 ------------------------------------
  const skillDetails: Record<string, SkillDetail> = {};
  for (const s of skills) {
    const detailTuple = buildSkillDetail(s);
    if (detailTuple) {
      const [skillName, skillDetail] = detailTuple;
      skillDetails[skillName] = skillDetail;
    }
  }

  // --- 반환 --------------------------------------------------------------------
  return { name, rows, usedSkills, arkgridSet, skillDetails };
};
