/**
 * @file Tooltip 파서 (로스트아크 원문 JSON/HTML → 일관된 HTML)
 * - 이 파일의 모든 주석은 한글로 작성합니다.
 * - 기능 변경 없음: 가독성과 성능(정규식 사전 컴파일, 조기 반환) 최적화.
 * - 역할: JSON/HTML 형태의 툴팁 원문을 일관된 HTML 조각으로 변환합니다.
 */

// === 정규식/상수 (사전 컴파일) ==================================================

/** BR 태그 정규화 */
const RE_BR = /<\s*BR\s*\/?>(?![^<]*>)/gi;
/** 천 단위 숫자 강조 (예: 12,345) */
const RE_NUM = /\b(\d{1,3}(?:,\d{3})+)\b/g;
/** 퍼센트 강조 (예: 12.5%) */
const RE_PCT = /\b(\d+(?:\.\d+)?%)\b/g;

/** 속성 라벨 후보 (툴팁 좌측 라벨 영역) */
const LABELS = [
  '마나',
  '재사용 대기시간',
  '공격 타입',
  '슈퍼아머',
  '카운터',
] as const;
/** 라벨이 <FONT>로 감싸진 경우를 빠르게 판정하기 위한 정규식 배열 */
const LABEL_FONT_REGEX = LABELS.map((L) => new RegExp(`^<FONT[^>]*>${L}`, 'i'));

// === 유틸리티 ===================================================================

/** 문자열 여부 판정 */
const isStr = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0;
/** 문자열 정규화(공백 트림) */
const norm = (v: unknown) => (isStr(v) ? v.trim() : '');
/** BR 태그를 \n과 유사한 역할의 표준 <br/>로 정규화 */
const nl = (v: string) => v.replace(RE_BR, '<br/>');
/** 숫자/퍼센트를 하이라이트 컬러로 강조 */
const emphasize = (v: string) =>
  v
    .replace(
      RE_NUM,
      '<span style="color: var(--accent-11); font-weight:600">$1</span>',
    )
    .replace(
      RE_PCT,
      '<span style="color: var(--green-11); font-weight:600">$1</span>',
    );

// === 내부 파서 ==================================================================

/**
 * JSON 기반(인지형) 툴팁을 HTML로 변환합니다.
 * - 파싱 실패 시 `null`을 반환하여 상위에서 HTML 처리로 폴백합니다.
 */
function parseJsonTooltip(jsonText: string): string | null {
  try {
    const obj = JSON.parse(jsonText) as Record<string, any>;

    let title = '';
    const props: Array<{ label: string; content: string }> = [];
    const body: string[] = [];

    for (const key of Object.keys(obj).sort()) {
      const el = obj[key];
      const type = el?.type ?? '';
      const val = norm(el?.value) || norm(el?.text);

      switch (type) {
        case 'NameTagBox':
        case 'ItemTitle':
          if (val && !title) title = val;
          break;

        case 'ItemPartBox': {
          const els = Array.isArray(el?.elements) ? el.elements : [];
          for (const sub of els) {
            const sv = norm(sub?.value) || norm(sub?.text);
            if (!sv) continue;

            // 라벨 후보 매칭: 1) 앞글자 동일  2) <FONT>로 감싼 라벨
            let matchedLabel: string | undefined;
            for (let i = 0; i < LABELS.length; i++) {
              const L = LABELS[i];
              if (sv.startsWith(L) || LABEL_FONT_REGEX[i].test(sv)) {
                matchedLabel = L;
                break;
              }
            }

            if (matchedLabel) {
              props.push({
                label: matchedLabel,
                content: sv.replace(/^.*?[:：]\s*/, ''),
              });
            } else {
              body.push(sv);
            }
          }
          break;
        }

        case 'ItemExplainBox':
        case 'Description':
          if (val) body.push(val);
          if (Array.isArray(el?.elements)) {
            for (const sub of el.elements) {
              const sv = norm(sub?.value) || norm(sub?.text);
              if (sv) body.push(sv);
            }
          }
          break;

        default:
          if (val) body.push(val);
          break;
      }
    }

    const out: string[] = [];

    // 제목
    if (title) {
      out.push(
        `<div style="font-weight:700; font-size:13px; color:var(--gray-12); margin-bottom:6px;">${title}</div>`,
      );
    }

    // 속성 라벨 영역
    if (props.length) {
      out.push(
        '<div style="font-size:11px; color:var(--gray-12); margin:6px 0;">',
      );
      for (const { label, content } of props) {
        out.push(
          `<div style="display:flex; gap:8px; align-items:baseline; margin:2px 0;">` +
            `<span style="min-width:96px; color:var(--gray-11); font-weight:600;">${label}</span>` +
            `<span style="flex:1;">${emphasize(nl(content))}</span>` +
            `</div>`,
        );
      }
      out.push('</div>');
    }

    // 본문
    if (body.length) {
      out.push(
        '<div style="border-top:1px solid var(--gray-6); margin:6px 0"></div>',
      );
      out.push(
        body
          .map(
            (b) =>
              `<div style="margin:4px 0; line-height:1.5;">${emphasize(nl(b))}</div>`,
          )
          .join(''),
      );
    }

    return out.join('');
  } catch {
    return null;
  }
}

// === 공개 API ==================================================================

/**
 * Tooltip 원문을 일관된 HTML로 변환합니다.
 * - 입력이 JSON 텍스트면 인지형 파서를 먼저 시도하고, 실패하면 HTML로 간주합니다.
 * - 입력이 비어 있거나 문자열이 아니면 빈 문자열을 반환합니다.
 */
export const toHtmlFromLoaTooltip = (raw: unknown): string => {
  if (!raw) return '';
  if (!isStr(raw)) return '';
  const s = raw.trim();
  if (!s) return '';

  // JSON 인지형 파싱 시도 (성공 시 즉시 반환)
  if (s.startsWith('{') && s.endsWith('}')) {
    const parsed = parseJsonTooltip(s);
    if (parsed !== null) return parsed;
  }

  // 이미 HTML로 온 경우: BR 정규화만 적용
  return nl(s);
};
