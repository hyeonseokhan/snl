export interface SkillUsageRow {
  skill_name: string;
  characters: number;
}

export interface TripodTableRow {
  character: string;
  skill_name: string;
  skill_level: number;
  tripod_tier: number;
  tripod_name: string;
  rune_name: string;
}

export interface PreparedCharacterData {
  name: string;
  rows: TripodTableRow[];
  usedSkills: Set<string>;
  arkgridSet: Set<string>;
}

export interface AnalysisResult {
  allRows: TripodTableRow[];
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