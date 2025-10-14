export type CoreMeta = { name: string; tooltip: string };

export interface SkillUsageRow {
  skill_name: string;
  characters: number;
}

export interface PreparedCharacterData {
  name: string;
  usedSkills: Set<string>;
  arkgridSet: Set<string>;
}

export interface AnalysisResult {
  skillUsageRows: SkillUsageRow[];
  keptCharacters: string[];
  totalCharacters: number;
}

export interface ProgressState {
  current: number;
  total: number;
  message: string;
}

export type TokenInfo = { token: string; used: number; windowStart: number };

export interface ApiCallbacks {
  log: (message: string, type?: 'info' | 'error') => void;
  startQuotaStatus: (totalSec: number) => void;
  updateQuotaStatus: (shownSec: number, totalSec: number) => void;
  endQuotaStatus: () => void;
}

// 1단계 리팩토링으로 추가된 타입
export interface SkillDetail {
  icon: string;
  level: number;
  tooltip: {
    header_1: string;
    header_2: string;
    body_1: string;
    body_2: string[];
  };
  tripods: {
    icon: string;
    tier: number;
    name: string;
    tooltip: {
      body: string;
    };
  }[];
  rune: {
    icon: string;
    name: string;
    grade: string;
    tooltip: {
      body: string;
    };
  } | null;
}
