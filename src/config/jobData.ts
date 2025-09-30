export interface ArkgridDetail {
  name: string;
  option: {
    10: string;
    14: string;
    17: string;
    18: string;
    19: string;
    20: string;
  };
}

export interface Arkgrid {
  sun: ArkgridDetail[]; // 질서의 해 코어
  moon: ArkgridDetail[]; // 질서의 달 코어
  star: ArkgridDetail[]; // 질서의 별 코어
}

export interface EnlightenmentTree {
  name: string;
  arkgrid?: Arkgrid; // 기존 문자열 배열 (호환성 유지)
}

export interface Job {
  class: string;
  code: number;
  enlightenmentTree: EnlightenmentTree[];
}

export const JOB_DATA: Job[] = [
  {
    class: '도화가(Artist)',
    code: 81,
    enlightenmentTree: [
      {
        name: '회귀',
        arkgrid: {
          sun: [
            {
              name: '파죽지세',
              option: {
                10: '묵법 : 파죽의 피해량이 <span style="color: var(--green-11)">6.0%</span> 증가한다.',
                14: "'운명' 발동 시 120.0초 동안 '운명: 조화의 시간' 효과를 획득한다. '운명: 조화의 시간' : 조화 게이지 획득량이 <span style=\"color: var(--green-11)\">15.0%</span> 증가한다.",
                17: "'운명' 발동 시 '운명: 파죽지세' 효과를 획득한다. '운명: 파죽지세' : 다음 사용하는 묵법 : 파죽의 피해량이 <span style=\"color: var(--green-11)\">19.5/22.5%</span> 증가한다. 묵법 : 파죽 사용 시 제거된다.",
                18: '묵법 : 파죽의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                19: '묵법 : 파죽의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                20: '묵법 : 파죽의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
              },
            },
            {
              name: '일필휘지',
              option: {
                10: '필법 : 한획긋기의 피해량이 <span style="color: var(--green-11)">10.0%</span> 증가한다.',
                14: "'운명' 발동 시 조화의 구슬이 <span style=\"color: var(--green-11)\">3개</span> 획득하지만, 묵법 : 파죽의 피해량이 <span style=\"color: var(--red-11)\">57.0%</span> 감소한다.",
                17: "'운명' 발동 시 30.0초 동안 '운명: 일필휘지' 효과를 획득한다. '운명: 일필휘지' : 공격속도가 <span style=\"color: var(--green-11)\">10.0%</span>, 마나 회복 속도가 <span style=\"color: var(--green-11)\">10.0%</span>, 치명타 피해가 <span style=\"color: var(--green-11)\">10.0/15.0%</span> 증가한다.",
                18: '필법 : 한획긋기의 피해량이 <span style="color: var(--green-11)">0.65%</span> 증가한다.',
                19: '필법 : 한획긋기의 피해량이 <span style="color: var(--green-11)">0.65%</span> 증가한다.',
                20: '필법 : 한획긋기의 피해량이 <span style="color: var(--green-11)">0.65%</span> 증가한다.',
              },
            },
            {
              name: '묵법화',
              option: {
                10: '묵법 스킬의 피해량이 <span style="color: var(--green-11)">3.0%</span> 증가한다.',
                14: "'운명' 발동 시 주변 24.0m 범위 내에 있는 적들의 모든 방어력을 <span style=\"color: var(--green-11)\">10.0초</span>간 <span style=\"color: var(--green-11)\">12.0%</span> 감소시키고, 묵법 스킬의 피해량이 <span style=\"color: var(--green-11)\">2.0%</span> 증가한다.",
                17: "'운명' 발동 시 '운명: 묵법화' 효과를 5중첩 획득한다. '운명: 묵법화' : 묵법 스킬 사용 시 소모되며, 해당 스킬의 피해량이 <span style=\"color: var(--green-11)\">4.0/6.0%</span> 증가한다.",
                18: '묵법 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                19: '묵법 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                20: '묵법 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
              },
            },
          ],
          moon: [
            {
              name: '조화의 완성',
              option: {
                10: '묵법 : 파죽의 피해량이 <span style="color: var(--green-11)">6.0%</span> 증가한다.',
                14: "조화의 구슬이 3개가 되면 '운명'이 발동한다.",
                17: '떠오르는 달 사용 시 조화 게이지를 고정적으로 <span style="color: var(--green-11)">6.0%</span> 획득하고, 묵법 : 파죽의 피해량이 <span style="color: var(--green-11)">4.5/7.0%</span> 증가한다.',
                18: '묵법 : 파죽의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                19: '묵법 : 파죽의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                20: '묵법 : 파죽의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
              },
            },
            {
              name: '명필',
              option: {
                10: '필법 : 한획긋기 사용 중 피격이상에 면역이 된다.',
                14: "필법 : 한획긋기 사용 시 '운명' 이 발동한다.",
                17: '필법 : 한획긋기의 피해량이 <span style="color: var(--green-11)">36.0/39.0%</span> 증가한다.',
                18: '필법 : 한획긋기의 피해량이 <span style="color: var(--green-11)">0.65%</span> 증가한다.',
                19: '필법 : 한획긋기의 피해량이 <span style="color: var(--green-11)">0.65%</span> 증가한다.',
                20: '필법 : 한획긋기의 피해량이 <span style="color: var(--green-11)">0.65%</span> 증가한다.',
              },
            },
            {
              name: '정월 대보름',
              option: {
                10: '떠오르는 달의 재사용 대기시간이 <span style="color: var(--green-11)">4.0초</span> 감소한다.',
                14: "떠오르는 달 사용 시 '운명' 이 발동한다.",
                17: '묵법 스킬의 피해량이 <span style="color: var(--green-11)">3.5/5.5%</span> 증가한다.',
                18: '묵법 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                19: '묵법 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                20: '묵법 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
              },
            },
          ],
          star: [
            {
              name: '끝없는 파죽',
              option: {
                10: '묵법 : 파죽의 피해량이 <span style="color: var(--green-11)">5.0%</span> 증가한다.',
                14: '묵법 : 파죽 적중 시 조화 게이지를 고정적으로 <span style="color: var(--green-11)">10.0%</span> 획득한다.',
                17: '묵법 : 파죽의 치명타 피해량이 <span style="color: var(--green-11)">50.0/60.0%</span> 증가한다.',
                18: '묵법 : 파죽의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                19: '묵법 : 파죽의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                20: '묵법 : 파죽의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
              },
            },
            {
              name: '재빠른 붓',
              option: {
                10: '필법 : 한획긋기의 시전 속도가 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                14: '필법 : 한획긋기의 재사용 대기시간이 <span style="color: var(--red-11)">5.0초</span> 증가하지만, 피해량이 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                17: "필법 : 한획긋기의 '연속 긋기' 트라이포드 적용 시 피해량이 <span style=\"color: var(--green-11)\">33.0/36.0%</span> 증가한다.",
                18: '필법 : 한획긋기의 피해량이 <span style="color: var(--green-11)">0.65%</span> 증가한다.',
                19: '필법 : 한획긋기의 피해량이 <span style="color: var(--green-11)">0.65%</span> 증가한다.',
                20: '필법 : 한획긋기의 피해량이 <span style="color: var(--green-11)">0.65%</span> 증가한다.',
              },
            },
            {
              name: '쏟아지는 두루미',
              option: {
                10: '묵법 : 달그리기의 시전 속도가 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                14: "묵법 : 달그리기의 '먹물 세례' 트라이포드 적용 시 피해량이 <span style=\"color: var(--green-11)\">120.0%</span> 증가한다.",
                17: '묵법 : 두루미나래의 피해량이 <span style="color: var(--green-11)">14.0/17.0%</span> 증가한다.',
                18: '묵법 : 두루미나래의 피해량이 <span style="color: var(--green-11)">1.3%</span> 증가한다.',
                19: '묵법 : 두루미나래의 피해량이 <span style="color: var(--green-11)">1.3%</span> 증가한다.',
                20: '묵법 : 두루미나래의 피해량이 <span style="color: var(--green-11)">1.3%</span> 증가한다.',
              },
            },
          ],
        },
      },
      {
        name: '만개',
        arkgrid: {
          sun: [
            {
              name: '햇살의 품',
              option: {
                10: '아군 공격력 강화 효과가 <span style="color: var(--green-11)">1.3%</span> 증가한다.',
                14: "'운명' 발동 시 자신의 근처에 동그란 방울이 바닥에 떨어져 8.0초간 유지된다. 방울을 획득하면 자신에게 12.0초간 최대 생명력의 <span style=\"color: var(--green-11)\">6.0%</span>에 해당하는 보호막이 생성된다. 최대 3회 중첩 가능하다.",
                17: "'운명' 발동 시 60.0초 동안 '운명: 햇살의 품' 효과를 획득한다. '운명: 햇살의 품' : 아군 공격력 강화 효과가 <span style=\"color: var(--green-11)\">5.6/8.5%</span> 증가한다.",
                18: '아군 공격력 강화 효과가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                19: '아군 공격력 강화 효과가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                20: '아군 공격력 강화 효과가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
              },
            },
            {
              name: '몽글몽글',
              option: {
                10: '아군 공격력 강화 효과가 <span style="color: var(--green-11)">1.3%</span> 증가한다.',
                14: "'운명' 발동 시 60.0초 동안 '운명: 몽글몽글' 효과를 획득한다. '운명: 몽글몽글' : 최대 생명력이 <span style=\"color: var(--green-11)\">10,000</span> 증가한다.",
                17: "'운명' 발동 시 60.0초 동안 '운명: 온새미르' 효과를 획득한다. '운명: 온새미르' : 묵법 : 미르 새김의 아군 피해량 강화 효과가 <span style=\"color: var(--green-11)\">27.0/40.0%</span> 증가한다.",
                18: '아군 공격력 강화 효과가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                19: '아군 공격력 강화 효과가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                20: '아군 공격력 강화 효과가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
              },
            },
            {
              name: '해님이 지켜줘요',
              option: {
                10: '아군 공격력 강화 효과가 <span style="color: var(--green-11)">1.3%</span> 증가한다.',
                14: "'운명' 발동 시 60.0초 동안 '운명: 해님이 지켜줘요' 효과를 획득한다. '운명: 해님이 지켜줘요' : 떠오르는 해 사용 시 자신 및 24m 범위 내에 있는 파티원에게 4.0초 동안 자신의 최대 생명력의 <span style=\"color: var(--green-11)\">5.0%</span>만큼 보호막을 부여한다.",
                17: "'운명' 발동 시 60.0초 동안 '운명: 밝은 달' 효과를 획득한다. '운명: 밝은 달' : 저무는 달의 아군 피해량 강화 효과가 <span style=\"color: var(--green-11)\">6.5/10.0%</span> 증가한다.",
                18: '아군 공격력 강화 효과가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                19: '아군 공격력 강화 효과가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                20: '아군 공격력 강화 효과가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
              },
            },
          ],
          moon: [
            {
              name: '따뜻한 해',
              option: {
                10: '아군 피해량 강화 효과가 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "묵법 : 해그리기 사용 시 '운명'이 발동한다.",
                17: '아군 공격력 강화 효과가 <span style="color: var(--green-11)">5.6/8.5%</span> 증가한다.',
                18: '아군 피해량 강화 효과가 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
                19: '아군 피해량 강화 효과가 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
                20: '아군 피해량 강화 효과가 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
              },
            },
            {
              name: '환영문짝',
              option: {
                10: '아군 피해량 강화 효과가 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "묵법 : 환영의 문 사용 시 '운명'이 발동한다.",
                17: '묵법 : 미르 새김의 아군 피해량 강화 효과가 <span style="color: var(--green-11)">27.0/40.0%</span> 증가한다.',
                18: '아군 피해량 강화 효과가 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
                19: '아군 피해량 강화 효과가 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
                20: '아군 피해량 강화 효과가 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
              },
            },
            {
              name: '달이 내린 예언',
              option: {
                10: '아군 피해량 강화 효과가 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "저무는 달 사용 시 '운명'이 발동한다.",
                17: '저무는 달의 아군 피해량 강화 효과가 <span style="color: var(--green-11)">6.5/10.0%</span> 증가한다.',
                18: '아군 피해량 강화 효과가 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
                19: '아군 피해량 강화 효과가 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
                20: '아군 피해량 강화 효과가 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
              },
            },
          ],
          star: [
            {
              name: '붓 콩콩',
              option: {
                10: '필법 : 콩콩이의 시전 속도가 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                14: '필법 : 콩콩이 사용 중 피격이상에 면역이 된다.',
                17: "필법 : 콩콩이 적중 시 조화 게이지 회복량이 <span style=\"color: var(--green-11)\">6.0/9.0%</span> 증가하고, '노란색 먹물' 트라이포드 적용 시 부여되는 보호막 지속시간이 <span style=\"color: var(--green-11)\">0.5초</span> 증가한다. 동시에 '먹물 강화' 트라이포드 적용 시 부여되는 보호막 지속시간이 <span style=\"color: var(--green-11)\">1.0초</span> 증가한다.",
                18: '필법 : 콩콩이의 재사용 대기시간이 <span style="color: var(--green-11)">1.0%</span> 감소한다.',
                19: '필법 : 콩콩이의 재사용 대기시간이 <span style="color: var(--green-11)">1.0%</span> 감소한다.',
                20: '필법 : 콩콩이의 재사용 대기시간이 <span style="color: var(--green-11)">1.0%</span> 감소한다.',
              },
            },
            {
              name: '차원의 문',
              option: {
                10: '묵법 : 환영의 문의 마나 소모량이 <span style="color: var(--green-11)">70.0%</span> 감소한다.',
                14: '묵법 : 환영의 문 스킬 사용 시 조화 게이지를 고정적으로 <span style="color: var(--green-11)">4.0%</span> 획득한다.',
                17: '묵법 : 환영의 문의 재사용 대기시간이 <span style="color: var(--green-11)">7.0/10.0%</span> 감소하고, 환영의 문으로 부여되는 보호막 효과가 <span style="color: var(--green-11)">50.0%</span> 증가한다.',
                18: '묵법 : 환영의 문의 재사용 대기시간이 <span style="color: var(--green-11)">1.0%</span> 감소한다.',
                19: '묵법 : 환영의 문의 재사용 대기시간이 <span style="color: var(--green-11)">1.0%</span> 감소한다.',
                20: '묵법 : 환영의 문의 재사용 대기시간이 <span style="color: var(--green-11)">1.0%</span> 감소한다.',
              },
            },
            {
              name: '먹물 뿌리기',
              option: {
                10: '필법 : 흩뿌리기의 마나 소모량이 <span style="color: var(--green-11)">70.0%</span> 감소한다.',
                14: '필법 : 흩뿌리기의 시전 속도가 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                17: '필법 : 흩뿌리기 적중 시 조화 게이지 회복량이 <span style="color: var(--green-11)">24.0/36.0%</span> 증가한다.',
                18: '필법 : 흩뿌리기 적중 시 조화 게이지 회복량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                19: '필법 : 흩뿌리기 적중 시 조화 게이지 회복량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                20: '필법 : 흩뿌리기 적중 시 조화 게이지 회복량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
              },
            },
          ],
        },
      },
    ],
  },
  {
    class: '기상술사(Aeromancer)',
    code: 82,
    enlightenmentTree: [
      {
        name: '질풍노도',
        arkgrid: {
          sun: [
            {
              name: '비연참',
              option: {
                10: '우산 스킬의 피해량이 <span style="color: var(--green-11)">2.0%</span> 증가한다.',
                14: "'운명' 발동 시 '운명: 비연참' 효과를 획득한다. '운명: 비연참' : 다음 사용하는 회오리 걸음, 몰아치기, 바람송곳, 칼바람의 피해량이 <span style=\"color: var(--green-11)\">5.0%</span> 증가한다.",
                17: '\'운명\' 발동 시 4.0초 동안 지속되는 기류 보호막이 생성된다. 우산 스킬의 피해량이 <span style="color: var(--green-11)">0/1.0%</span> 증가한다.',
                18: '우산 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '우산 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '우산 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '기류 조절',
              option: {
                10: '기류 보호막 버프의 지속시간이 2배로 증가하고, 적에게 주는 피해가 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "'운명' 발동 시 30.0초 동안 '운명: 기류 조절' 효과를 획득한다. '운명: 기류 조절' : 마나 회복 속도가 <span style=\"color: var(--green-11)\">20.0%</span> 증가하고, 기류 보호막 보유 중 적에게 주는 피해가 <span style=\"color: var(--green-11)\">10.0%</span> 증가한다.",
                17: '기류 보호막의 보호막 수치가 <span style="color: var(--green-11)">20.0%</span> 증가하고, 기류 보호막 및 \'운명: 기류 조절\' 효과 보유 중 적에게 주는 피해가 <span style="color: var(--green-11)">4.0/5.0%</span> 증가한다.',
                18: '기류 보호막 보유 중 적에게 주는 피해가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                19: '기류 보호막 보유 중 적에게 주는 피해가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                20: '기류 보호막 보유 중 적에게 주는 피해가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
              },
            },
            {
              name: '바람의 칼날',
              option: {
                10: '칼바람의 피해량이 <span style="color: var(--green-11)">8.0%</span> 증가한다.',
                14: "'운명' 발동 시 '운명: 바람의 칼날' 효과를 획득한다. '운명: 바람의 칼날' : 다음 사용하는 칼바람의 피해량이 <span style=\"color: var(--green-11)\">25.0%</span> 증가한다. 칼바람 사용 시 버프는 제거된다.",
                17: "'운명' 발동 시 다음 사용하는 칼바람 시전 시 피격이상에 면역이 되고, '운명: 바람의 칼날' 효과의 피해 증가량을 <span style=\"color: var(--green-11)\">37.0/40.0%</span>로 변경한다.",
                18: '칼바람의 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
                19: '칼바람의 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
                20: '칼바람의 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
              },
            },
          ],
          moon: [
            {
              name: '우산의 춤',
              option: {
                10: '우산 스킬의 피해량이 <span style="color: var(--green-11)">2.0%</span> 증가한다.',
                14: "회오리 걸음, 몰아치기, 바람송곳, 칼바람 사용 시 '운명'이 발동한다.",
                17: '회오리 걸음, 몰아치기의 피해량이 <span style="color: var(--green-11)">8.0/12.0%</span> 증가한다.',
                18: '우산 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '우산 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '우산 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '상승기류',
              option: {
                10: '기류 보호막 보유 중 적에게 주는 피해가 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "여우비 상태 진입 시 '운명' 이 발동한다.",
                17: '기류 보호막 보유 중 치명타 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">3.0/4.0%</span> 증가한다.',
                18: '기류 보호막 보유 중 적에게 주는 피해가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                19: '기류 보호막 보유 중 적에게 주는 피해가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                20: '기류 보호막 보유 중 적에게 주는 피해가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
              },
            },
            {
              name: '쾌속',
              option: {
                10: '칼바람의 피해량이 <span style="color: var(--green-11)">8.0%</span> 증가한다.',
                14: "칼바람 사용 시 '운명' 이 발동한다.",
                17: '우산 스킬 사용 시 칼바람의 재사용 대기시간이 <span style="color: var(--green-11)">0.2초</span> 감소한다. 칼바람의 피해량이 <span style="color: var(--green-11)">0/3.0%</span> 증가한다.',
                18: '칼바람의 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
                19: '칼바람의 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
                20: '칼바람의 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
              },
            },
          ],
          star: [
            {
              name: '휘몰아치기',
              option: {
                10: '회오리 걸음의 피해량이 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                14: '회오리 걸음의 피해량이 <span style="color: var(--green-11)">30.0%</span> 증가한다.',
                17: '몰아치기의 피해량이 <span style="color: var(--green-11)">12.0/18.0%</span> 증가한다.',
                18: '회오리 걸음, 몰아치기의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
                19: '회오리 걸음, 몰아치기의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
                20: '회오리 걸음, 몰아치기의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
              },
            },
            {
              name: '일점돌파',
              option: {
                10: '바람송곳의 시전 속도가 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                14: '바람송곳의 피해량이 <span style="color: var(--green-11)">10.0%</span> 증가한다.',
                17: '바람송곳의 \'관통\' 트라이포드 적용 시 피해량이 <span style="color: var(--green-11)">15.0/20.0%</span> 증가한다.',
                18: '바람송곳의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
                19: '바람송곳의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
                20: '바람송곳의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
              },
            },
            {
              name: '강풍일섬',
              option: {
                10: '칼바람의 시전 속도가 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                14: '칼바람의 재사용 대기시간이 <span style="color: var(--red-11)">5.0초</span> 증가하지만, 피해량이 <span style="color: var(--green-11)">30.0%</span> 증가한다.',
                17: '칼바람의 피해량이 <span style="color: var(--green-11)">6.0/9.0%</span> 증가한다.',
                18: '칼바람의 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
                19: '칼바람의 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
                20: '칼바람의 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
              },
            },
          ],
        },
      },
      {
        name: '이슬비',
        arkgrid: {
          sun: [
            {
              name: '싸라기눈',
              option: {
                10: '여우비 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "'운명' 발동 후, 다음에 사용하는 여우비 기본 공격 사용 시 빗방울 게이지가 <span style=\"color: var(--green-11)\">80.0%</span> 증가한다.",
                17: "'운명' 발동 시 30.0초 동안 '운명: 싸라기눈' 효과를 획득한다. '운명: 싸라기눈' : 여우비 상태에서 사용하는 기본 공격의 피해량이 <span style=\"color: var(--green-11)\">10.0%</span> 증가하고, 기상 스킬의 피해량이 <span style=\"color: var(--green-11)\">1.5/2.5%</span> 증가한다.",
                18: '여우비 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                19: '여우비 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                20: '여우비 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
              },
            },
            {
              name: '마른 하늘에 날벼락',
              option: {
                10: '여우비의 피해량이 <span style="color: var(--green-11)">12.0%</span> 증가한다.',
                14: "'운명' 발동 시 30.0초 동안 '운명: 마른 하늘에 날벼락' 효과를 획득한다. '운명: 마른 하늘에 날벼락' : 여우비 공격 적중 시 낙뢰가 1회 떨어지며 111의 피해를 주고, 낙뢰 적중 시 소나기의 재사용 대기시간이 <span style=\"color: var(--green-11)\">0.8초</span> 감소한다.",
                17: "'운명' 발동 시 '운명: 국지성 소나기' 효과를 2중첩 획득한다. '운명: 국지성 소나기' : 다음 사용하는 소나기의 피해량이 <span style=\"color: var(--green-11)\">24.0/32.0%</span> 증가한다.",
                18: '소나기 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                19: '소나기 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                20: '소나기 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
              },
            },
            {
              name: '해와 바람',
              option: {
                10: '싹쓸바람, 뙤약볕의 피해량이 <span style="color: var(--green-11)">4.0%</span> 증가한다.',
                14: "'운명' 발동 시 '운명: 해와 바람' 효과를 획득한다. '운명: 해와 바람' : 다음 사용하는 싹쓸바람의 피해량이 <span style=\"color: var(--green-11)\">35.0%</span> 증가한다. 싹쓸바람 사용 시 버프는 제거된다.",
                17: "'운명: 해와 바람' 효과의 피해 증가량을 <span style=\"color: var(--green-11)\">60.0/67.0%</span>로 변경한다.",
                18: '싹쓸바람의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
                19: '싹쓸바람의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
                20: '싹쓸바람의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
              },
            },
          ],
          moon: [
            {
              name: '비바람이 치던 바다',
              option: {
                10: '여우비 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "센바람 사용 시 '운명'이 발동한다.",
                17: '여우비 상태에서 기상 스킬의 피해량이 <span style="color: var(--green-11)">2.5/3.5%</span> 증가한다.',
                18: '여우비 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                19: '여우비 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                20: '여우비 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
              },
            },
            {
              name: '가랑비',
              option: {
                10: '이동기 및 기상기 재사용 대기시간이 <span style="color: var(--green-11)">20.0%</span> 감소하고, 여우비의 피해량이 <span style="color: var(--green-11)">12.0%</span> 증가한다.',
                14: "여우비 상태 진입 시 '운명' 이 발동한다.",
                17: '여우비의 피해량이 <span style="color: var(--green-11)">35.0/45.0%</span> 증가한다.',
                18: '여우비의 피해량이 <span style="color: var(--green-11)">1.2%</span> 증가한다.',
                19: '여우비의 피해량이 <span style="color: var(--green-11)">1.2%</span> 증가한다.',
                20: '여우비의 피해량이 <span style="color: var(--green-11)">1.2%</span> 증가한다.',
              },
            },
            {
              name: '뜨거운 햇볕',
              option: {
                10: '기상 스킬의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "뙤약볕 사용 시 '운명' 이 발동한다.",
                17: '기상 스킬 사용 시 싹쓸바람, 뙤약볕의 재사용 대기시간이 <span style="color: var(--green-11)">0.5초</span> 감소한다. 싹쓸바람, 뙤약볕의 피해량이 <span style="color: var(--green-11)">0/2.0%</span> 증가한다.',
                18: '뙤약볕의 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                19: '뙤약볕의 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                20: '뙤약볕의 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
              },
            },
          ],
          star: [
            {
              name: '눈에 돌넣기',
              option: {
                10: '센바람의 피해량이 <span style="color: var(--green-11)">8.0%</span> 증가한다.',
                14: '센바람의 피해량이 <span style="color: var(--green-11)">12.0%</span> 증가한다.',
                17: '여우비 기본 공격의 시전 속도가 <span style="color: var(--green-11)">20.0%</span> 증가하고, 피해량이 <span style="color: var(--green-11)">200.0/300.0%</span> 증가한다.',
                18: '여우비 기본 공격의 피해량이 <span style="color: var(--green-11)">4.0%</span> 증가한다.',
                19: '여우비 기본 공격의 피해량이 <span style="color: var(--green-11)">4.0%</span> 증가한다.',
                20: '여우비 기본 공격의 피해량이 <span style="color: var(--green-11)">4.0%</span> 증가한다.',
              },
            },
            {
              name: '우르릉 쾅쾅쾅',
              option: {
                10: '여우비의 피해량이 <span style="color: var(--green-11)">12.0%</span> 증가한다.',
                14: '소나기의 피해량이 <span style="color: var(--green-11)">8.0%</span> 증가한다.',
                17: "소나기의 '낙뢰주의보' 트라이포드 적용 시 피해량이 <span style=\"color: var(--green-11)\">12.0/18.0%</span> 증가한다.",
                18: '소나기의 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                19: '소나기의 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                20: '소나기의 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
              },
            },
            {
              name: '나그네의 외투를 벗긴건',
              option: {
                10: '싹쓸바람, 뙤약볕의 피해량이 <span style="color: var(--green-11)">3.0%</span> 증가한다.',
                14: "뙤약볕의 '빛의 부름' 트라이포드 적용 시 피해량이 <span style=\"color: var(--green-11)\">20.0%</span> 증가한다.",
                17: '싹쓸바람, 뙤약볕의 재사용 대기시간이 <span style="color: var(--red-11)">3.0초</span> 증가하지만, 피해량이 <span style="color: var(--green-11)">20.0/25.0%</span> 증가한다.',
                18: '싹쓸바람, 뙤약볕의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                19: '싹쓸바람, 뙤약볕의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                20: '싹쓸바람, 뙤약볕의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
              },
            },
          ],
        },
      },
    ],
  },
  {
    class: '아르카나(Arcanist)',
    code: 63,
    enlightenmentTree: [
      {
        name: '황후의 은총',
        arkgrid: {
          sun: [
            {
              name: '엣지 오브 페이트',
              option: {
                10: '공격이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">2.0%</span> 증가한다.',
                14: "'운명' 발동 시 '운명: 엣지 오브 페이트' 효과를 3중첩 획득한다. '운명: 엣지 오브 페이트' : 루인 스킬 사용 시 '운명: 엣지 오브 페이트' 효과를 1중첩 소모하여 피해량이 <span style=\"color: var(--green-11)\">8.0%</span> 증가한다.",
                17: "'운명: 엣지 오브 페이트' 효과 획득량을 5중첩으로 변경하고, 루인 스킬의 피해 증가량을 <span style=\"color: var(--green-11)\">10.0/11.0%</span>로 변경한다.",
                18: '공격이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '공격이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '공격이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '인피니티 덱',
              option: {
                10: '루인 스킬의 피해량이 <span style="color: var(--green-11)">1.6%</span> 증가한다.',
                14: "'운명' 발동 시 아이덴티티 카드를 1장 획득한다.",
                17: '심판 카드 사용 시 6.0초 뒤 루인 스킬의 재사용 대기시간이 <span style="color: var(--green-11)">15.0%</span> 즉시 감소한다. 균형 카드 사용 시 30.0초 동안 루인 스킬의 피해량이 <span style="color: var(--green-11)">2.0/3.0%</span> 증가한다.',
                18: '루인 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                19: '루인 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                20: '루인 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
              },
            },
            {
              name: '루인 서브셋',
              option: {
                10: '초각성 스킬을 제외한 루인 스킬의 피해량이 <span style="color: var(--green-11)">2.8%</span> 증가한다.',
                14: "'운명' 발동 시 10.0초 동안 '운명: 루인 서브셋' 효과를 획득한다. '운명: 루인 서브셋' : 재사용 대기시간이 <span style=\"color: var(--green-11)\">8.0%</span> 감소한다.",
                17: "'운명: 루인 서브셋' 효과에 초각성 스킬을 제외한 루인 스킬의 피해량 <span style=\"color: var(--green-11)\">7.0/9.0%</span> 증가 효과를 추가한다.",
                18: '초각성 스킬을 제외한 루인 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '초각성 스킬을 제외한 루인 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '초각성 스킬을 제외한 루인 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
          ],
          moon: [
            {
              name: '엣지 콤보',
              option: {
                10: '공격이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">2.0%</span> 증가한다.',
                14: "스트림 오브 엣지 사용 시 '운명'이 발동한다.",
                17: '스트림 오브 엣지 사용 시 8.0초 동안 루인 스킬의 피해량이 <span style="color: var(--green-11)">5.0/6.0%</span> 증가한다.',
                18: '공격이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '공격이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '공격이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '체인 드로우',
              option: {
                10: '루인 스킬의 피해량이 <span style="color: var(--green-11)">1.6%</span> 증가한다.',
                14: "아이덴티티 카드 사용 시 <span style=\"color: var(--green-11)\">25.0%</span> 확률로 '운명'이 발동한다.",
                17: '스킬 적중으로 획득하는 덱 게이지가 <span style="color: var(--green-11)">15.0/17.0%</span> 증가한다.',
                18: '루인 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                19: '루인 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                20: '루인 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
              },
            },
            {
              name: '루인 풀셋',
              option: {
                10: '초각성 스킬을 제외한 루인 스킬의 피해량이 <span style="color: var(--green-11)">2.8%</span> 증가한다.',
                14: "루인 스킬 4회 적중 시 '운명'이 발동한다",
                17: '마나를 사용하는 스킬의 피해량이 <span style="color: var(--green-11)">3.5/4.5%</span> 증가한다.',
                18: '초각성 스킬을 제외한 루인 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '초각성 스킬을 제외한 루인 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '초각성 스킬을 제외한 루인 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
          ],
          star: [
            {
              name: '스트림 오브 엣지',
              option: {
                10: '스트림 오브 엣지 사용 시 8.0초 동안 공격 속도가 <span style="color: var(--green-11)">8.0%</span> 증가한다.',
                14: '셀레스티얼 레인의 피해량이 <span style="color: var(--green-11)">8.0%</span> 증가한다.',
                17: "스트림 오브 엣지의 '다크니스 엣지' 트라이포드 적용 시 획득하는 치명타 적중률 증가 버프 중첩 당 치명타 피해량이 <span style=\"color: var(--green-11)\">1.6/2.2%</span> 증가한다.",
                18: '셀레스티얼 레인의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
                19: '셀레스티얼 레인의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
                20: '셀레스티얼 레인의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
              },
            },
            {
              name: '페이탈 핸드',
              option: {
                10: '뒤틀린 운명 카드의 지속 시간이 <span style="color: var(--green-11)">2.0초</span> 증가한다.',
                14: '도태 카드의 치명타 피해량 증가 효과가 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                17: '부식 카드 효과로 적에게 부여하는 자신에게 받는 피해 증가량을 <span style="color: var(--green-11)">12.0/13.0%</span>로 변경한다.',
                18: '루인 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                19: '루인 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
                20: '루인 스킬의 피해량이 <span style="color: var(--green-11)">0.15%</span> 증가한다.',
              },
            },
            {
              name: '루인 마이너셋',
              option: {
                10: '스파이럴 엣지의 재사용 대기시간이 <span style="color: var(--green-11)">2.0초</span> 감소한다.',
                14: '세렌디피티의 시전 속도가 <span style="color: var(--green-11)">15.0%</span> 증가하고, 피해량이 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                17: '포카드의 피해량이 <span style="color: var(--green-11)">20.0/30.0%</span> 증가한다.',
                18: '포카드의 피해량이 <span style="color: var(--green-11)">2.0%</span> 증가한다.',
                19: '포카드의 피해량이 <span style="color: var(--green-11)">2.0%</span> 증가한다.',
                20: '포카드의 피해량이 <span style="color: var(--green-11)">2.0%</span> 증가한다.',
              },
            },
          ],
        },
      },
      {
        name: '황제의 칙령',
        arkgrid: {
          sun: [
            {
              name: '하이 템포',
              option: {
                10: '마나를 사용하는 스킬의 피해량이 <span style="color: var(--green-11)">2.0%</span> 증가한다.',
                14: "'운명' 발동 시 15.0초 동안 '운명: 하이 템포' 효과를 획득한다. '운명: 하이 템포' : 마나를 사용하는 스킬의 재사용 대기시간이 <span style=\"color: var(--green-11)\">8.0%</span> 감소한다.",
                17: "'운명: 하이 템포' 효과에 마나를 사용하는 스킬의 피해량 <span style=\"color: var(--green-11)\">4.0/5.0%</span> 증가 효과를 추가한다.",
                18: '마나를 사용하는 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '마나를 사용하는 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '마나를 사용하는 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '노말 인핸스',
              option: {
                10: '일반 스킬의 피해량이 <span style="color: var(--green-11)">1.7%</span> 증가한다.',
                14: "'운명' 발동 시 스택트 스킬과 일반 스킬의 재사용 대기시간이 <span style=\"color: var(--green-11)\">10.0%</span> 즉시 감소한다.",
                17: "'운명' 발동 시 16.0초 동안 '운명: 노말 인핸스' 효과를 획득한다. '운명: 노말 인핸스' : 일반 스킬의 피해량이 <span style=\"color: var(--green-11)\">3.8/5.0%</span> 증가한다.",
                18: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                19: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                20: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
              },
            },
            {
              name: '임팩트 메이트',
              option: {
                10: '체크메이트의 피해량이 <span style="color: var(--green-11)">12.0%</span> 증가한다.',
                14: "'운명' 발동 시 5.0초 동안 '운명: 임팩트 메이트' 효과를 획득한다. '운명: 임팩트 메이트' : 적에게 주는 피해가 <span style=\"color: var(--green-11)\">15.0%</span> 증가한다.",
                17: "'운명: 임팩트 메이트' 효과의 적에게 주는 피해 증가량을 <span style=\"color: var(--green-11)\">20.0/22.0%</span>로 변경한다.",
                18: '체크메이트의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
                19: '체크메이트의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
                20: '체크메이트의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
              },
            },
          ],
          moon: [
            {
              name: '황제의 심장',
              option: {
                10: '마나를 사용하는 스킬의 피해량이 <span style="color: var(--green-11)">2.0%</span> 증가한다.',
                14: "스택트 스킬과 일반 스킬 사용 시 <span style=\"color: var(--green-11)\">18.0%</span> 확률로 '운명'이 발동한다.",
                17: '황제 카드의 피해량이 <span style="color: var(--green-11)">20.0/25.0%</span> 증가한다.',
                18: '마나를 사용하는 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '마나를 사용하는 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '마나를 사용하는 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '스택 홀드',
              option: {
                10: '일반 스킬의 피해량이 <span style="color: var(--green-11)">1.7%</span> 증가한다.',
                14: "아이덴티티 카드 3회 사용 시 '운명'이 발동한다",
                17: '스택트 4중첩인 적에게 주는 일반 스킬의 피해량이 <span style="color: var(--green-11)">3.8/5.0%</span> 증가한다.',
                18: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                19: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                20: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
              },
            },
            {
              name: '다크 메이트',
              option: {
                10: '체크메이트의 피해량이 <span style="color: var(--green-11)">12.0%</span> 증가한다.',
                14: "체크메이트 사용 시 '운명'이 발동한다.",
                17: '다크 리저렉션의 피해량이 <span style="color: var(--green-11)">20.0/25.0%</span> 증가한다.',
                18: '체크메이트의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
                19: '체크메이트의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
                20: '체크메이트의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
              },
            },
          ],
          star: [
            {
              name: '다크 콜렉션',
              option: {
                10: '다크 리저렉션의 피해량이 <span style="color: var(--green-11)">6.0%</span> 증가한다.',
                14: "다크 리저렉션의 '죽음의 공포' 트라이포드 적용 시 중독 피해량이 <span style=\"color: var(--green-11)\">70.0%</span> 증가한다.",
                17: '이보크의 피해량이 <span style="color: var(--green-11)">15.0/20.0%</span> 증가한다.',
                18: '이보크의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                19: '이보크의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                20: '이보크의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
              },
            },
            {
              name: '셔플 댄스',
              option: {
                10: '댄싱 오브 스파인플라워의 재사용 대기시간이 <span style="color: var(--red-11)">20.0초</span> 증가하지만, 피해량이 <span style="color: var(--green-11)">80.0%</span> 증가한다.',
                14: "댄싱 오브 스파인플라워의 '페이크 플립' 트라이포드 적용 후 치명적 가시 공격이 적중 시 <span style=\"color: var(--green-11)\">33.0%</span> 확률로 아이덴티티 카드를 1장을 획득한다.",
                17: '언리미티드 셔플의 재사용 대기시간이 <span style="color: var(--red-11)">20.0초</span> 증가하지만, 피해량이 <span style="color: var(--green-11)">90.0/100.0%</span> 증가한다.',
                18: '댄싱 오브 스파인플라워의 피해량이 <span style="color: var(--green-11)">1.6%</span> 증가한다.',
                19: '댄싱 오브 스파인플라워의 피해량이 <span style="color: var(--green-11)">1.6%</span> 증가한다.',
                20: '댄싱 오브 스파인플라워의 피해량이 <span style="color: var(--green-11)">1.6%</span> 증가한다.',
              },
            },
            {
              name: '스피드 메이트',
              option: {
                10: '체크메이트의 홀딩 속도가 <span style="color: var(--green-11)">30.0%</span> 증가한다.',
                14: "이보크의 재사용 대기 시간이 <span style=\"color: var(--red-11)\">10.0초</span> 증가하지만, '마나 중독' 트라이포드 적용 시 마나 중독 피해량이 <span style=\"color: var(--green-11)\">100%</span> 증가한다.",
                17: '체크메이트의 피해량이 <span style="color: var(--green-11)">16.0/20.0%</span> 증가한다.',
                18: '체크메이트의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
                19: '체크메이트의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
                20: '체크메이트의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
              },
            },
          ],
        },
      },
    ],
  },
  {
    class: '창술사(Glaivier)',
    code: 34,
    enlightenmentTree: [
      {
        name: '절정',
        arkgrid: {
          sun: [
            {
              name: '적룡의 기운',
              option: {
                10: '집중 스킬의 피해량이 <span style="color: var(--green-11)">1.8%</span> 증가한다.',
                14: "'운명' 발동 시 10.0초 동안 적에게 주는 피해량이 <span style=\"color: var(--green-11)\">2.5%</span> 증가한다.",
                17: "'운명' 발동 시 다음 사용하는 적룡포의 피해량이 1회 동안 <span style=\"color: var(--green-11)\">10.0%</span> 증가하고 어떤 곳에서 적중해도 백어택으로 적중된다. 적에게 주는 피해량이 <span style=\"color: var(--green-11)\">0/1.0%</span> 증가한다.",
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '적룡연격',
              option: {
                10: '난무 스킬의 피해량이 <span style="color: var(--red-11)">20.0%</span> 감소하지만 집중 스킬의 피해량이 <span style="color: var(--green-11)">5.0%</span> 증가한다.',
                14: "'운명' 발동 시 초각성 스킬을 제외한 집중 스킬의 재사용 대기시간이 <span style=\"color: var(--green-11)\">60.0%</span> 만큼 감소하지만, 적에게 주는 피해가 <span style=\"color: var(--red-11)\">15.0%</span> 감소한다.",
                17: "'운명' 발동 시 다음 사용하는 난무, 집중 스킬의 피해량이 3회 동안 <span style=\"color: var(--green-11)\">5.0%</span> 증가한다. 집중 스킬의 피해량이 <span style=\"color: var(--green-11)\">0/1.0%</span> 증가한다.",
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '연가 창식',
              option: {
                10: '적에게 주는 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "'운명' 발동 시 '운명: 연가 창식' 효과를 획득한다. '운명: 연가 창식' : 다음 사용하는 집중 스킬의 피해량이 2회 동안 <span style=\"color: var(--green-11)\">5.0%</span> 증가한다.",
                17: "'운명'이 종료되거나 '운명: 연가 창식' 효과 적용 중에 '운명' 발동 시 '운명: 연가 난무' 효과를 획득한다. '운명: 연가 난무' : 10.0초 동안 난무 스킬의 피해량이 <span style=\"color: var(--green-11)\">15.0/20.0%</span> 증가한다.",
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
          ],
          moon: [
            {
              name: '일점 집중',
              option: {
                10: '집중 스킬의 피해량이 <span style="color: var(--green-11)">1.8%</span> 증가한다.',
                14: "연가심공 1회 사용 시 '운명'이 발동한다.",
                17: '적룡포의 피해량이 <span style="color: var(--green-11)">17.0/20.0%</span> 증가한다.',
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '집중 강화',
              option: {
                10: '난무 스킬의 피해량이 <span style="color: var(--red-11)">20.0%</span> 감소하지만 집중 스킬의 피해량이 <span style="color: var(--green-11)">5.0%</span> 증가한다.',
                14: "연가심공 1회 사용 시 '운명'이 발동한다.",
                17: '집중 스킬의 무력화 피해량이 <span style="color: var(--green-11)">20.0%</span> 증가하고 피해량이 <span style="color: var(--green-11)">6.0/7.0%</span> 증가한다.',
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '청룡기',
              option: {
                10: '적에게 주는 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "청룡진 1회 사용 시 '운명'이 발동한다.",
                17: '난무 스킬의 시전 속도가 <span style="color: var(--green-11)">10.0%</span> 증가하고 집중 스킬의 피해량이 <span style="color: var(--green-11)">6.0/7.0%</span> 증가한다.',
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
          ],
          star: [
            {
              name: '진화의 끝',
              option: {
                10: '적룡포의 피해량이 <span style="color: var(--green-11)">5.0%</span> 증가한다.',
                14: "적룡포의 '진화하는 창술' 트라이포드 적용 시 시전 속도가 <span style=\"color: var(--green-11)\">50.0%</span> 증가한다.",
                17: "적룡포의 '진화하는 창술' 트라이포드 적용 시 피해량이 <span style=\"color: var(--red-11)\">30.0%</span> 감소하지만 치명타 확률이 <span style=\"color: var(--green-11)\">100.0%</span> 증가한다. 집중 스킬의 피해량이 <span style=\"color: var(--green-11)\">0/1.0%</span> 증가한다.",
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '한 점 돌파',
              option: {
                10: '난무 스킬의 피해량이 <span style="color: var(--red-11)">20.0%</span> 감소하지만 집중 스킬의 피해량이 <span style="color: var(--green-11)">3.0%</span> 증가한다.',
                14: '사두룡격, 굉열파의 피해량이 <span style="color: var(--green-11)">7.0%</span> 증가한다.',
                17: '유성강천, 적룡포의 피해량이 <span style="color: var(--green-11)">5.0/8.0%</span> 증가한다.',
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '창의 바람',
              option: {
                10: '적에게 주는 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                14: "반월섬의 '강풍 베기' 트라이포드 적용 시 피해량이 <span style=\"color: var(--green-11)\">20.0%</span> 증가한다.",
                17: '적에게 주는 피해량이 <span style="color: var(--green-11)">0/1.0%</span> 증가한다. 반월섬의 피해량이 <span style="color: var(--green-11)">30.0%</span> 증가한다.',
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
          ],
        },
      },
      {
        name: '절제',
        arkgrid: {
          sun: [
            {
              name: '질풍연격',
              option: {
                10: '난무 스킬의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "'운명' 발동 시 15.0초 동안 적에게 주는 피해량이 <span style=\"color: var(--green-11)\">2.4%</span> 증가한다.",
                17: "'운명' 발동 시 다음 사용하는 맹룡열파, 반월섬의 피해량이 2회 동안 <span style=\"color: var(--green-11)\">15.0%</span> 증가한다. 난무 스킬의 피해량이 <span style=\"color: var(--green-11)\">0/1.0%</span> 증가한다.",
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '연가일섬',
              option: {
                10: '난무 스킬의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "'운명' 발동 시 연가비기의 재사용 대기시간이 <span style=\"color: var(--green-11)\">10.0%</span> 감소하고 12.0초 동안 적에게 주는 피해량이 <span style=\"color: var(--green-11)\">2.0%</span> 증가한다.",
                17: "'운명' 발동 시 다음 사용하는 연가비기의 피해량이 1회 동안 <span style=\"color: var(--green-11)\">5.0%</span> 증가한다. 적에게 주는 피해량이 <span style=\"color: var(--green-11)\">0/1.0%</span> 증가한다.",
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '질서의 해 코어 : 맹룡오격 (절제 전용)',
              option: {
                10: '난무 스킬의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "'운명' 발동 시 12.0초 동안 적에게 주는 피해량이 <span style=\"color: var(--green-11)\">2.0%</span> 증가하고 전체 아이덴티티 게이지의 <span style=\"color: var(--green-11)\">10.0%</span>만큼 회복한다.",
                17: "'운명' 발동 시 다음 사용하는 콤보 타입 스킬의 피해량이 4회 동안 <span style=\"color: var(--green-11)\">20.0%</span> 증가한다. 난무 스킬의 피해량이 <span style=\"color: var(--green-11)\">0/1.0%</span> 증가한다.",
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
          ],
          moon: [
            {
              name: '맹룡의 기운',
              option: {
                10: '난무 스킬의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "연가비기 1회 사용 시 '운명'이 발동한다.",
                17: '적에게 주는 피해량이 <span style="color: var(--green-11)">5.0/6.0%</span> 증가한다. 난무 스킬의 마나 소모량이 <span style="color: var(--green-11)">15.0%</span> 감소한다.',
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '궁신탄영',
              option: {
                10: '난무 스킬의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "탄영 1회 사용 시 '운명'이 발동한다.",
                17: '탄영의 재사용 대기시간이 <span style="color: var(--green-11)">1.0%초</span> 감소한다. 연가비기의 피해량이 <span style="color: var(--green-11)">15.0/18.0%</span> 증가한다.',
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '연환 타격',
              option: {
                10: '난무 스킬의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "이동기, 기상기, 스탠스 변경 스킬을 제외한 스킬 4회 사용 시 '운명'이 발동한다.",
                17: '콤보 타입 스킬의 피해량이 <span style="color: var(--green-11)">10.0/12.0%</span> 증가하고 난무 스킬의 시전 속도가 <span style="color: var(--green-11)">15.0%</span> 증가한다.',
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
          ],
          star: [
            {
              name: '이중 비기',
              option: {
                10: '난무 스킬의 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                14: '맹룡열파의 피해량이 <span style="color: var(--green-11)">10.0%</span> 증가한다.',
                17: '적에게 주는 피해량이 <span style="color: var(--green-11)">0/1.0%</span> 증가한다. 반월섬의 피해량이 <span style="color: var(--green-11)">10.0%</span> 증가한다.',
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '환영',
              option: {
                10: '연가비기의 피해량이 <span style="color: var(--green-11)">5.0%</span> 증가한다.',
                14: "청룡출수의 '환영 출수' 트라이포드 적용 시 피해량이 <span style=\"color: var(--green-11)\">18.0%</span> 증가한다.",
                17: "적에게 주는 피해량이 <span style=\"color: var(--green-11)\">0/1.0%</span> 증가한다. 선풍참흔의 '협력 강화' 트라이포드 적용 시 피해량이 <span style=\"color: var(--green-11)\">20.0%</span> 증가한다.",
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '연격 난무',
              option: {
                10: '이연격의 재사용 대기시간이 <span style="color: var(--red-11)">10.0초</span> 증가하지만 피해량이 <span style="color: var(--green-11)">250.0%</span> 증가한다.',
                14: '공의연무의 재사용 대기시간이 <span style="color: var(--red-11)">10.0초</span> 증가하지만 피해량이 <span style="color: var(--green-11)">250.0%</span> 증가한다.',
                17: "적에게 주는 피해량이 <span style=\"color: var(--green-11)\">0/1.0%</span> 증가한다. 맹룡열파의 '추가 베기' 트라이포드 적용 시 피해량이 <span style=\"color: var(--green-11)\">10.0%</span> 증가한다.",
                18: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '적에게 주는 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
          ],
        },
      },
    ],
  },
  {
    class: '배틀마스터(Battlemaster)',
    code: 31,
    enlightenmentTree: [
      {
        name: '초심',
        arkgrid: {
          sun: [
            {
              name: '연격강타',
              option: {
                10: '일반 스킬이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">1.8%</span> 증가한다.',
                14: "'운명' 발동 시 16.0초 동안 '운명: 연격강타' 효과가 적용된다. 운명: 연격강타 : 치명타 적중률이 <span style=\"color: var(--green-11)\">20.0%</span> 증가한다. 해당 효과는 용맹의 포효 치명타 적중률 증가 효과와 중복 적용되지 않는다.",
                17: "'운명: 연격강타' 효과 보유 중 추가로 초풍각, 선풍용류각의 피해량이 <span style=\"color: var(--green-11)\">7.0/10.0%</span> 증가한다.",
                18: '초풍각 스킬의 피해량이 <span style="color: var(--green-11)">1.3%</span> 증가한다.',
                19: '초풍각 스킬의 피해량이 <span style="color: var(--green-11)">1.3%</span> 증가한다.',
                20: '초풍각 스킬의 피해량이 <span style="color: var(--green-11)">1.3%</span> 증가한다.',
              },
            },
            {
              name: '극의귀원',
              option: {
                10: '일반 스킬의 피해량이 <span style="color: var(--green-11)">1.6%</span> 증가한다.',
                14: "'운명' 발동 시 '운명: 천격' 효과가 적용된다. '운명: 천격' : 다음 사용하는 방천격의 피해량이 <span style=\"color: var(--green-11)\">15.0%</span> 증가한다.",
                17: "'운명' 발동 시 20.0초 동안 '운명: 극의귀원' 효과가 적용된다. 운명: 극의귀원 : 보유하고 있는 근원의 엘리멘탈 구슬 수가 3개일 때 적에게 주는 피해가 <span style=\"color: var(--green-11)\">15.0/16.0%</span> 증가한다.",
                18: '방천격 스킬의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
                19: '방천격 스킬의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
                20: '방천격 스킬의 피해량이 <span style="color: var(--green-11)">0.8%</span> 증가한다.',
              },
            },
            {
              name: '삼문 개방',
              option: {
                10: '일반 스킬의 피해량이 <span style="color: var(--green-11)">1.6%</span> 증가한다.',
                14: "'운명' 발동 시 60.0초 동안 최대 3중첩이 가능한 '운명: 삼문 개방' 효과를 획득한다. 운명: 삼문 개방 : 3중첩 시 근원의 엘리멘탈 게이지를 모두 회복한다.",
                17: "'운명' 발동 시 12.0초 동안 '운명: 개전' 효과가 적용된다. 운명: 개전 : 적에게 주는 피해가 <span style=\"color: var(--green-11)\">3.0/4.0%</span> 증가한다.",
                18: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                19: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                20: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
              },
            },
          ],
          moon: [
            {
              name: '초강풍각',
              option: {
                10: '일반 스킬의 치명타 피해량이 <span style="color: var(--green-11)">3.0%</span> 증가한다.',
                14: "바람의 속삭임 사용 시 '운명'이 발동한다.",
                17: "치명타 피해량이 <span style=\"color: var(--green-11)\">4.0/8.0%</span> 증가한다. 초풍각 '분노의 회축' 트라이포드를 적용하지 않은 상태에서 회전 타격 시 마다 적에게 주는 피해가 <span style=\"color: var(--green-11)\">2.0%</span> 씩 최대 <span style=\"color: var(--green-11)\">28.0%</span> 증가한다.",
                18: '일반 스킬이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '일반 스킬이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '일반 스킬이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '귀원화신',
              option: {
                10: '일반 스킬의 피해량이 <span style="color: var(--green-11)">1.6%</span> 증가한다.',
                14: "바람의 속삭임 사용 시 '운명'이 발동한다.",
                17: '보유하고 있는 근원의 엘리멘탈 구슬이 3개일 때 방천격의 피해량이 <span style="color: var(--green-11)">15.0/19.0%</span> 증가한다.',
                18: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                19: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                20: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
              },
            },
            {
              name: '초순환',
              option: {
                10: '일반 스킬의 치명타 피해량이 <span style="color: var(--green-11)">3.0%</span> 증가한다.',
                14: "근원의 엘리멘탈 사용 시 '운명'이 발동한다.",
                17: '용맹의 포효, 바람의 속삭임 사용 시 근원의 엘리멘탈 구슬을 <span style="color: var(--green-11)">0.8개</span>씩 추가로 획득하며, 일반 스킬의 피해량이 <span style="color: var(--green-11)">0/1.0%</span> 증가한다.',
                18: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                19: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                20: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
              },
            },
          ],
          star: [
            {
              name: '극선풍각',
              option: {
                10: '초풍각 피해량이 <span style="color: var(--green-11)">7.0%</span> 증가한다.',
                14: "초풍각 '재빠른 발놀림' 트라이포드 적용 시 적에게 주는 피해가 <span style=\"color: var(--green-11)\">35.0%</span> 증가한다.",
                17: "선풍용류각 '선풍' 트라이포드 적용 시 적에게 주는 피해가 <span style=\"color: var(--green-11)\">25.0/31.0%</span> 증가한다.",
                18: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                19: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                20: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
              },
            },
            {
              name: '파천격',
              option: {
                10: '일반 스킬이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">1.2%</span> 증가한다.',
                14: '섬열란아 치명타 피해량이 <span style="color: var(--green-11)">25.0%</span> 증가한다.',
                17: '방천격 피해량이 <span style="color: var(--green-11)">10.0/14.0%</span> 증가한다.',
                18: '일반 스킬의 치명타 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
                19: '일반 스킬의 치명타 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
                20: '일반 스킬의 치명타 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
              },
            },
            {
              name: '용류 강화',
              option: {
                10: '일반 스킬의 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                14: '방천격 피해량이 <span style="color: var(--green-11)">6.0%</span> 증가한다.',
                17: '선풍용류각 피해량이 <span style="color: var(--green-11)">10.0/15.0%</span> 증가한다.',
                18: '선풍용류각 치명타 피해량이 <span style="color: var(--green-11)">2.5%</span> 증가한다.',
                19: '선풍용류각 치명타 피해량이 <span style="color: var(--green-11)">2.5%</span> 증가한다.',
                20: '선풍용류각 치명타 피해량이 <span style="color: var(--green-11)">2.5%</span> 증가한다.',
              },
            },
          ],
        },
      },
      {
        name: '오의 강화',
        arkgrid: {
          sun: [
            {
              name: '패황불패',
              option: {
                10: '오의 : 창룡패황권의 피해량이 <span style="color: var(--green-11)">3.5%</span> 증가한다.',
                14: "'운명' 발동 시 6.0초 동안 '운명: 패황불패' 효과가 적용된다. 운명: 패황불패 : 오의 스킬 사용 시 바람의 속삭임 공격 준비 효과와 용맹의 포효 치명타 적중률 증가 효과가 <span style=\"color: var(--green-11)\">1.0초</span>씩 증가한다.",
                17: '운명: 패황불패 효과 보유 중 오의 : 풍신초래 사용 시 오의 : 창룡패황권의 재사용 대기시간이 <span style="color: var(--green-11)">8.0초</span> 감소한다. 풍신초래 및 창룡패황권의 피해량이 <span style="color: var(--green-11)">10.0/12.0%</span> 증가한다.',
                18: '오의 스킬 피해량이 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
                19: '오의 스킬 피해량이 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
                20: '오의 스킬 피해량이 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
              },
            },
            {
              name: '화룡순환',
              option: {
                10: '오의 스킬 피해량이 <span style="color: var(--green-11)">1.55%</span> 증가한다.',
                14: "'운명' 발동 시 16.0초 동안 '운명: 화룡순환' 효과가 적용된다. 운명: 화룡순환 : 치명타 적중률이 <span style=\"color: var(--green-11)\">20.0%</span> 증가한다. 해당 효과 보유 중 용맹의 포효 치명타 적중률 증가 효과는 적용되지 않는다.",
                17: "'운명: 화룡순환' 효과 보유 중 오의 : 화룡천상 스킬 사용 시 엘리멘탈 구슬 2개를 즉시 회복하고, 오의 : 화룡천상의 피해량이 <span style=\"color: var(--green-11)\">0/3.0%</span> 증가한다.",
                18: '오의 스킬 피해량이 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
                19: '오의 스킬 피해량이 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
                20: '오의 스킬 피해량이 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
              },
            },
            {
              name: '오기강체',
              option: {
                10: '오의 스킬 피해량이 <span style="color: var(--green-11)">1.55%</span> 증가한다.',
                14: "'운명' 발동 시 16.0초 동안 '운명: 오기강체' 효과가 적용된다. 운명: 오기강체 : 오의 스킬 피해량이 <span style=\"color: var(--green-11)\">3.5%</span> 증가한다.",
                17: "'운명: 오기강체' 효과 보유 중 오의 : 창룡패황권 사용 시 엘리멘탈 구슬 1개를 획득하고, '운명: 오기강체' 효과의 피해 증가량을 <span style=\"color: var(--green-11)\">5.0/6.0%</span>로 변경한다.",
                18: '오의 스킬 피해량이 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
                19: '오의 스킬 피해량이 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
                20: '오의 스킬 피해량이 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
              },
            },
          ],
          moon: [
            {
              name: '패황지도',
              option: {
                10: '오의 스킬의 치명타 피해량이 <span style="color: var(--green-11)">4.0%</span> 증가한다.',
                14: "오의 : 창룡패황권 사용 시 '운명'이 발동한다.",
                17: '오의 : 창룡패황권의 재사용 대기시간이 <span style="color: var(--green-11)">45.0%</span> 감소하지만, 적에게 주는 피해가 <span style="color: var(--red-11)">35.0/33.0%</span> 감소한다.',
                18: '오의 : 창룡패황권 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                19: '오의 : 창룡패황권 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                20: '오의 : 창룡패황권 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
              },
            },
            {
              name: '화룡진천',
              option: {
                10: '오의 스킬의 피해량이 <span style="color: var(--green-11)">1.55%</span> 증가한다.',
                14: "바람의 속삭임 사용 시 '운명'이 발동한다.",
                17: '붕천퇴 사용 시 오의 : 화룡천상 재사용 대기시간이 <span style="color: var(--green-11)">6초</span> 감소하지만, 적에게 주는 피해가 <span style="color: var(--red-11)">25/22%</span> 감소한다.',
                18: '오의 : 화룡천상 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                19: '오의 : 화룡천상 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                20: '오의 : 화룡천상 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
              },
            },
            {
              name: '심안',
              option: {
                10: '오의 스킬의 피해량이 <span style="color: var(--green-11)">1.55%</span> 증가한다.',
                14: "용맹의 포효 사용 시 '운명'이 발동한다.",
                17: '오의 스킬 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">4.0/5.0%</span> 증가한다.',
                18: '오의 스킬 치명타 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
                19: '오의 스킬 치명타 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
                20: '오의 스킬 치명타 피해량이 <span style="color: var(--green-11)">0.5%</span> 증가한다.',
              },
            },
          ],
          star: [
            {
              name: '창풍극의',
              option: {
                10: '오의 : 창룡패황권의 치명타 적중률이 <span style="color: var(--green-11)">10.0%</span> 증가한다.',
                14: '오의 : 창룡패황권 피해량이 <span style="color: var(--green-11)">5.0%</span> 증가한다.',
                17: '오의 : 풍신초래 피해량이 <span style="color: var(--green-11)">15.0/20.0%</span> 증가한다.',
                18: '오의 : 풍신초래 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                19: '오의 : 풍신초래 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                20: '오의 : 풍신초래 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
              },
            },
            {
              name: '폭룡천상',
              option: {
                10: '오의 스킬의 피해량이 <span style="color: var(--green-11)">1.05%</span> 증가한다.',
                14: "오의 : 화룡천상 '폭풍의 눈' 트라이포드 적용 시 재사용 대기시간이 <span style=\"color: var(--green-11)\">8.0초</span> 감소하지만, 적에게 주는 피해가 <span style=\"color: var(--red-11)\">30.0%</span> 감소한다.",
                17: "오의 : 화룡천상 '폭풍의 눈' 트라이포드 적용 시 적에게 주는 피해가 <span style=\"color: var(--green-11)\">12.0/15.0%</span> 증가한다.",
                18: '오의 : 화룡천상의 치명타 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                19: '오의 : 화룡천상의 치명타 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                20: '오의 : 화룡천상의 치명타 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
              },
            },
            {
              name: '패황권',
              option: {
                10: '오의 : 창룡패황권의 치명타 적중률이 <span style="color: var(--green-11)">10.0%</span> 증가한다.',
                14: '오의 : 나선경 피해량이 <span style="color: var(--green-11)">15.0%</span> 증가한다.',
                17: '오의 : 창룡패황권 피해량이 <span style="color: var(--green-11)">7.0/10.0%</span> 증가한다.',
                18: '오의 스킬의 피해량이 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
                19: '오의 스킬의 피해량이 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
                20: '오의 스킬의 피해량이 <span style="color: var(--green-11)">0.17%</span> 증가한다.',
              },
            },
          ],
        },
      },
    ],
  },
  {
    class: '브레이커(Breaker)',
    code: 22,
    enlightenmentTree: [
      {
        name: '권왕파천무',
        arkgrid: {
          sun: [
            {
              name: '진 권왕',
              option: {
                10: '권왕태세 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "'운명' 발동 시 '운명: 진 권왕' 효과를 4중첩 획득한다. '운명: 진 권왕' : 다음 사용하는 충격 스킬의 피해량이 <span style=\"color: var(--green-11)\">3.0%</span> 증가한다. 충격 스킬 사용 시 버프는 1중첩 소모된다.",
                17: "'운명' 발동 시 '운명: 바람의 파도' 효과를 획득한다. '운명: 바람의 파도' : 다음 사용하는 권왕십이식 : 풍랑의 피해량이 <span style=\"color: var(--green-11)\">20.0/28.0%</span> 증가한다. 권왕십이식 : 풍랑 사용 시 제거된다.",
                18: '권왕태세 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '권왕태세 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '권왕태세 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '파천경',
              option: {
                10: '파천섬광의 피해량이 <span style="color: var(--green-11)">3.0%</span> 증가한다.',
                14: "'운명' 발동 시 30.0초 동안 '운명: 파천경' 효과를 획득한다. '운명: 파천경' : 기력 스킬 사용 시 파천섬광의 재사용 대기시간이 <span style=\"color: var(--green-11)\">1.0초</span> 감소한다.",
                17: "'운명' 발동 시 '운명: 극 파천' 효과를 획득한다. '운명: 극 파천' : 다음 사용하는 파천섬광의 피해량이 <span style=\"color: var(--green-11)\">15.0/18.0%</span> 증가한다. 파천섬광 사용 시 제거된다.",
                18: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                19: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                20: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
              },
            },
            {
              name: '충전된 충격',
              option: {
                10: '충격 스킬의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "'운명' 발동 시 60.0초 동안 '운명: 투지' 효과를 획득한다. '운명: 투지' : 일반 상태에서 기력 스킬 사용 시 기력 에너지가 10 생성되고, 투지 에너지가 고정적으로 <span style=\"color: var(--green-11)\">6.0%</span> 증가한다.",
                17: "'운명' 발동 시 60.0초 동안 '운명: 충전된 충격' 효과를 획득한다. '운명: 충전된 충격' : 충격 스킬 사용 종료 시 충격 에너지가 100 생성되고, 충격 스킬의 피해량이 <span style=\"color: var(--green-11)\">3.0/4.0%</span> 증가한다.",
                18: '충격 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '충격 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '충격 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
          ],
          moon: [
            {
              name: '권왕태세',
              option: {
                10: '권왕태세 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "권왕태세 상태 진입 시 '운명'이 발동한다.",
                17: '권왕십이식 : 낙화의 피해량이 <span style="color: var(--green-11)">15.0/20.0%</span> 증가한다.',
                18: '권왕태세 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '권왕태세 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '권왕태세 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '진 파천섬광',
              option: {
                10: '파천섬광의 피해량이 <span style="color: var(--green-11)">3.0%</span> 증가한다.',
                14: "기력 스킬 4회 사용 시 '운명' 이 발동한다.",
                17: '충격 스킬의 피해량이 <span style="color: var(--red-11)">10.0%</span> 감소하지만, 기력 스킬의 공격 적중 시 투지 에너지 획득량이 <span style="color: var(--green-11)">50.0%</span> 증가하고, 파천섬광이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">8.0/11.0%</span> 증가한다.',
                18: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                19: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                20: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
              },
            },
            {
              name: '충격 충전',
              option: {
                10: '충격 스킬의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "권왕태세 상태 진입 시 '운명'이 발동한다.",
                17: '충격 스킬의 피해량이 <span style="color: var(--red-11)">20.0/18.0%</span> 감소하지만, 권왕태세 상태 진입 시 충격 스킬의 재사용 대기시간이 <span style="color: var(--green-11)">10초</span> 감소한다.',
                18: '충격 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '충격 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '충격 스킬의 피해량이 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
          ],
          star: [
            {
              name: '권왕십이식',
              option: {
                10: '권왕태세 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                14: '권왕십이식 : 낙화 및 권왕십이식 : 풍랑의 시전 속도가 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                17: '권왕십이식 : 낙화 및 권왕십이식 : 풍랑의 피해량이 <span style="color: var(--green-11)">8.0/11.0%</span> 증가한다.',
                18: '권왕태세 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                19: '권왕태세 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
                20: '권왕태세 상태에서 적에게 주는 피해가 <span style="color: var(--green-11)">0.2%</span> 증가한다.',
              },
            },
            {
              name: '파천 돌파',
              option: {
                10: '파천섬광의 피해량이 <span style="color: var(--green-11)">2.0%</span> 증가한다.',
                14: "백렬권의 '다재다능' 트라이포드 적용 시 투지 에너지 획득량이 <span style=\"color: var(--green-11)\">100.0%</span> 증가한다.",
                17: "파천섬광의 '한계 돌파' 트라이포드 적용 시 피해량이 <span style=\"color: var(--green-11)\">8.0/12.0%</span> 증가한다.",
                18: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                19: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
                20: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.4%</span> 증가한다.',
              },
            },
            {
              name: '포스 건틀릿',
              option: {
                10: '청월난무, 연의붕권, 천기심권의 재사용 대기시간이 <span style="color: var(--red-11)">6.0초</span> 증가하지만, 피해량이 <span style="color: var(--green-11)">12.0%</span> 증가한다.',
                14: '청월난무의 피해량이 <span style="color: var(--green-11)">60.0%</span> 증가한다.',
                17: "연의붕권의 시전 속도가 <span style=\"color: var(--green-11)\">20.0%</span> 증가하고, '결정타' 트라이포드 적용 시 피해량이 <span style=\"color: var(--green-11)\">20.0/24.0%</span> 증가한다.",
                18: '연의붕권의 피해량이 <span style="color: var(--green-11)">2.0%</span> 증가한다.',
                19: '연의붕권의 피해량이 <span style="color: var(--green-11)">2.0%</span> 증가한다.',
                20: '연의붕권의 피해량이 <span style="color: var(--green-11)">2.0%</span> 증가한다.',
              },
            },
          ],
        },
      },
      {
        name: '수라의 길',
        arkgrid: {
          sun: [
            {
              name: '파천기',
              option: {
                10: '파천섬광의 피해량이 <span style="color: var(--green-11)">8.0%</span> 증가한다.',
                14: "'운명' 발동 시 수라 에너지가 고정적으로 <span style=\"color: var(--green-11)\">20.0%</span> 증가한다.",
                17: "'운명' 발동 시 '운명: 파천기' 효과를 획득한다. '운명: 파천기' : 다음 사용하는 충격 스킬의 피해량이 <span style=\"color: var(--green-11)\">20.0/30.0%</span> 증가한다. 충격 스킬 사용 시 제거된다.",
                18: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
                19: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
                20: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
              },
            },
            {
              name: '수라안',
              option: {
                10: '수라결 기본 공격의 피해량이 <span style="color: var(--green-11)">3.0%</span> 증가한다.',
                14: "수라결 기본 공격의 피해량이 <span style=\"color: var(--green-11)\">4.0%</span> 증가하고, '운명' 발동 시 6.0초 동안 '운명: 수라강기' 효과를 획득한다. '운명: 수라강기' : 최대 생명력의 <span style=\"color: var(--green-11)\">20.0%</span>에 해당하는 보호막이 생성된다.",
                17: "'운명' 발동 시 6.0초 동안 '운명: 수라안' 효과를 획득한다. '운명: 수라안' : 수라결 기본 공격의 피해량이 <span style=\"color: var(--green-11)\">6.0/7.5%</span> 증가한다.",
                18: '수라결 기본 공격의 피해량이 <span style="color: var(--green-11)">0.3%</span> 증가한다.',
                19: '수라결 기본 공격의 피해량이 <span style="color: var(--green-11)">0.3%</span> 증가한다.',
                20: '수라결 기본 공격의 피해량이 <span style="color: var(--green-11)">0.3%</span> 증가한다.',
              },
            },
            {
              name: '그림자 주먹',
              option: {
                10: '기력 스킬의 피해량이 <span style="color: var(--green-11)">8.0%</span> 증가한다.',
                14: "'운명' 발동 시 기력 및 충격 에너지가 50 생성된다.",
                17: "'운명' 발동 시 30.0초 동안 '운명: 그림자 주먹' 효과를 획득한다. '운명: 그림자 주먹' : 수라결 기본 공격의 연타 공격 적중 시 그림자가 나타나 공격해 1,111의 피해를 주고, 공격 적중 시 기력 스킬의 재사용 대기시간이 <span style=\"color: var(--green-11)\">0.5초</span> 감소된다.",
                18: '기력 스킬의 피해량이 <span style="color: var(--green-11)">0.9%</span> 증가한다.',
                19: '기력 스킬의 피해량이 <span style="color: var(--green-11)">0.9%</span> 증가한다.',
                20: '기력 스킬의 피해량이 <span style="color: var(--green-11)">0.9%</span> 증가한다.',
              },
            },
          ],
          moon: [
            {
              name: '개 파천섬광',
              option: {
                10: '파천섬광의 피해량이 <span style="color: var(--green-11)">8.0%</span> 증가한다.',
                14: "파천섬광 사용 시 '운명'이 발동한다.",
                17: '파천섬광이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">25.0/32.0%</span> 증가한다.',
                18: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
                19: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
                20: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
              },
            },
            {
              name: '수라결',
              option: {
                10: '수라결 기본 공격의 피해량이 <span style="color: var(--green-11)">3.0%</span> 증가한다.',
                14: "수라 상태 진입 시 '운명' 이 발동한다.",
                17: '수라결 기본 공격의 연타 공격 피해량이 <span style="color: var(--green-11)">10.0/12.0%</span> 증가한다.',
                18: '수라결 기본 공격의 피해량이 <span style="color: var(--green-11)">0.3%</span> 증가한다.',
                19: '수라결 기본 공격의 피해량이 <span style="color: var(--green-11)">0.3%</span> 증가한다.',
                20: '수라결 기본 공격의 피해량이 <span style="color: var(--green-11)">0.3%</span> 증가한다.',
              },
            },
            {
              name: '종횡무진',
              option: {
                10: '기력 스킬의 피해량이 <span style="color: var(--green-11)">8.0%</span> 증가한다.',
                14: "징벌의 파도 사용 시 '운명' 이 발동한다.",
                17: '징벌의 파도 사용 시 충격 스킬의 재사용 대기시간이 <span style="color: var(--green-11)">3.0초</span> 감소하고, 징벌의 파도의 피해량이 <span style="color: var(--green-11)">30.0/36.0%</span> 증가한다.',
                18: '기력 스킬의 피해량이 <span style="color: var(--green-11)">0.9%</span> 증가한다.',
                19: '기력 스킬의 피해량이 <span style="color: var(--green-11)">0.9%</span> 증가한다.',
                20: '기력 스킬의 피해량이 <span style="color: var(--green-11)">0.9%</span> 증가한다.',
              },
            },
          ],
          star: [
            {
              name: '전천극',
              option: {
                10: '파천섬광의 시전 속도가 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                14: '파천섬광의 피해량이 <span style="color: var(--green-11)">8.0%</span> 증가한다.',
                17: "파천섬광의 '전천극' 트라이포드 적용 시 피해량이 <span style=\"color: var(--green-11)\">12.0/15.0%</span> 증가한다.",
                18: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
                19: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
                20: '파천섬광의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
              },
            },
            {
              name: '수라',
              option: {
                10: '수라결 기본 공격 중 받는 피해가 <span style="color: var(--green-11)">50.0%</span> 감소한다.',
                14: '수라결 기본 공격의 피해량이 <span style="color: var(--green-11)">4.0%</span> 증가한다.',
                17: '수라결 기본 공격이 치명타로 적중 시 적에게 주는 피해가 <span style="color: var(--green-11)">4.0/5.5%</span> 증가한다.',
                18: '수라결 기본 공격의 피해량이 <span style="color: var(--green-11)">0.3%</span> 증가한다.',
                19: '수라결 기본 공격의 피해량이 <span style="color: var(--green-11)">0.3%</span> 증가한다.',
                20: '수라결 기본 공격의 피해량이 <span style="color: var(--green-11)">0.3%</span> 증가한다.',
              },
            },
            {
              name: '징벌',
              option: {
                10: '징벌의 파도의 시전 속도가 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                14: '징벌의 파도의 재사용 대기시간이 <span style="color: var(--green-11)">4.0초</span> 감소하고, 피해량이 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                17: "징벌의 파도의 '암영결' 트라이포드 적용 시 피해량이 <span style=\"color: var(--green-11)\">20.0/30.0%</span> 증가한다.",
                18: '징벌의 파도의 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                19: '징벌의 파도의 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                20: '징벌의 파도의 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
              },
            },
          ],
        },
      },
    ],
  },
  {
    class: '블래스터(Blaster)',
    code: 42,
    enlightenmentTree: [
      {
        name: '포격 강화',
        arkgrid: {
          sun: [
            {
              name: '폭격',
              option: {
                10: '포격 스킬의 피해량이 <span style="color: var(--green-11)">2.1%</span> 증가한다.',
                14: "'운명' 발동 시 10.0초 동안 '운명: 폭격' 효과를 획득한다. '운명: 폭격' : 포격 스킬의 피해량이 <span style=\"color: var(--green-11)\">5.0%</span> 증가한다.",
                17: "'운명: 폭격' 효과의 포격 스킬의 피해 증가량이 <span style=\"color: var(--green-11)\">8.0/9.5%</span>로 변경된다.",
                18: '포격 스킬의 피해량이 <span style="color: var(--green-11)">0.23%</span> 증가한다.',
                19: '포격 스킬의 피해량이 <span style="color: var(--green-11)">0.23%</span> 증가한다.',
                20: '포격 스킬의 피해량이 <span style="color: var(--green-11)">0.23%</span> 증가한다.',
              },
            },
            {
              name: '슛 앤 스쿳',
              option: {
                10: '포격 스킬의 피해량이 <span style="color: var(--green-11)">2.1%</span> 증가한다.',
                14: "'운명' 발동 시 30.0초 동안 '운명: 슛 앤 스쿳' 효과를 획득한다. '운명: 슛 앤 스쿳' : 포격: 집중포화, 포격: 에너지 포의 피해량이 <span style=\"color: var(--red-11)\">90.0%</span> 감소하지만, 포격: 곡사포를 사용하면 초각성 스킬 제외 일반 스킬의 재사용 대기시간이 <span style=\"color: var(--green-11)\">5.0초</span> 감소하고, A.C.T 의 피해량이 <span style=\"color: var(--green-11)\">40.0%</span>, 포격: 곡사포의 피해량이 <span style=\"color: var(--green-11)\">140.0%</span> 증가한다.",
                17: "'운명: 슛 앤 스쿳' 효과를 보유 중일 때 A.C.T 의 피해량이 <span style=\"color: var(--green-11)\">16.0/20.0%</span> 증가한다.",
                18: '포격: 곡사포의 피해량이 <span style="color: var(--green-11)">0.45%</span> 증가한다.',
                19: '포격: 곡사포의 피해량이 <span style="color: var(--green-11)">0.45%</span> 증가한다.',
                20: '포격: 곡사포의 피해량이 <span style="color: var(--green-11)">0.45%</span> 증가한다.',
              },
            },
            {
              name: '포화 전차',
              option: {
                10: '포격 스킬의 피해량이 <span style="color: var(--green-11)">2.1%</span> 증가한다.',
                14: "'운명' 발동 시 20.0초 동안 '운명: 포화 전차' 효과를 획득한다. '운명: 포화 전차' : 포격: 에너지 포의 피해량이 <span style=\"color: var(--red-11)\">30.0%</span> 감소하지만, 포격: 곡사포를 사용 시 포격: 집중포화의 재사용 대기시간을 <span style=\"color: var(--green-11)\">28.0초</span> 감소시킨다.",
                17: "'운명: 포화 전차' 효과를 보유 중일 때 포격: 절대 영역의 효과를 받고 있다면, 포격: 집중포화의 피해량이 <span style=\"color: var(--green-11)\">10.0/12.0%</span> 증가한다.",
                18: '포격: 집중포화의 피해량이 <span style="color: var(--green-11)">0.43%</span> 증가한다.',
                19: '포격: 집중포화의 피해량이 <span style="color: var(--green-11)">0.43%</span> 증가한다.',
                20: '포격: 집중포화의 피해량이 <span style="color: var(--green-11)">0.43%</span> 증가한다.',
              },
            },
          ],
          moon: [
            {
              name: '래피드 탱크',
              option: {
                10: '포격 스킬의 피해량이 <span style="color: var(--green-11)">2.1%</span> 증가한다.',
                14: "포격 모드 진입 시 '운명' 이 발동한다.",
                17: '포격 모드 진입 시 공격 속도가 <span style="color: var(--green-11)">12.0%</span> 증가하며 포격 스킬의 피해량이 <span style="color: var(--green-11)">2.5/4.0%</span> 증가한다.',
                18: '포격 스킬의 피해량이 <span style="color: var(--green-11)">0.23%</span> 증가한다.',
                19: '포격 스킬의 피해량이 <span style="color: var(--green-11)">0.23%</span> 증가한다.',
                20: '포격 스킬의 피해량이 <span style="color: var(--green-11)">0.23%</span> 증가한다.',
              },
            },
            {
              name: '과열된 포탄',
              option: {
                10: '포격 스킬의 피해량이 <span style="color: var(--green-11)">2.1%</span> 증가한다.',
                14: "포격 모드 진입 시 '운명' 이 발동한다.",
                17: '포격 모드 진입 시 다음 사용하는 포격: 곡사포의 피해량이 <span style="color: var(--green-11)">15.0/18.0%</span> 증가한다.',
                18: '포격: 곡사포의 피해량이 <span style="color: var(--green-11)">0.45%</span> 증가한다.',
                19: '포격: 곡사포의 피해량이 <span style="color: var(--green-11)">0.45%</span> 증가한다.',
                20: '포격: 곡사포의 피해량이 <span style="color: var(--green-11)">0.45%</span> 증가한다.',
              },
            },
            {
              name: '세이프 존',
              option: {
                10: '포격 스킬의 피해량이 <span style="color: var(--green-11)">2.1%</span> 증가한다.',
                14: "포격 모드 진입 시 '운명' 이 발동한다.",
                17: '포격: 절대 영역 상태에서 포격: 집중 포화의 피해량이 <span style="color: var(--green-11)">10.0/12.0%</span> 증가한다.',
                18: '포격: 집중포화의 피해량이 <span style="color: var(--green-11)">0.43%</span> 증가한다.',
                19: '포격: 집중포화의 피해량이 <span style="color: var(--green-11)">0.43%</span> 증가한다.',
                20: '포격: 집중포화의 피해량이 <span style="color: var(--green-11)">0.43%</span> 증가한다.',
              },
            },
          ],
          star: [
            {
              name: '시 오브 파이어',
              option: {
                10: '포격 스킬의 피해량이 <span style="color: var(--green-11)">1.4%</span> 증가한다.',
                14: '포격: 집중포화의 피해량이 <span style="color: var(--green-11)">8.0%</span> 증가한다.',
                17: '포격: 에너지 포의 피해량이 <span style="color: var(--green-11)">10.0/12.0%</span> 증가한다.',
                18: '포격 스킬의 피해량이 <span style="color: var(--green-11)">0.23%</span> 증가한다.',
                19: '포격 스킬의 피해량이 <span style="color: var(--green-11)">0.23%</span> 증가한다.',
                20: '포격 스킬의 피해량이 <span style="color: var(--green-11)">0.23%</span> 증가한다.',
              },
            },
            {
              name: '타임 온 타겟',
              option: {
                10: '포격: 곡사포의 피해량이 <span style="color: var(--green-11)">8.0%</span> 증가한다.',
                14: 'A.C.T 의 피해량이 <span style="color: var(--green-11)">15.0%</span> 증가한다.',
                17: '포격: 곡사포의 피해량이 <span style="color: var(--green-11)">15.0/18.0%</span> 증가한다.',
                18: '포격: 곡사포의 피해량이 <span style="color: var(--green-11)">0.45%</span> 증가한다.',
                19: '포격: 곡사포의 피해량이 <span style="color: var(--green-11)">0.45%</span> 증가한다.',
                20: '포격: 곡사포의 피해량이 <span style="color: var(--green-11)">0.45%</span> 증가한다.',
              },
            },
            {
              name: '초토화',
              option: {
                10: '포격: 집중포화의 피해량이 <span style="color: var(--green-11)">3.0%</span> 증가한다.',
                14: '포격: 집중포화의 피해량이 <span style="color: var(--green-11)">5.0%</span> 증가한다.',
                17: '포격: 집중포화의 피해량이 <span style="color: var(--green-11)">7.0/9.0%</span> 증가한다.',
                18: '포격: 집중포화의 피해량이 <span style="color: var(--green-11)">0.43%</span> 증가한다.',
                19: '포격: 집중포화의 피해량이 <span style="color: var(--green-11)">0.43%</span> 증가한다.',
                20: '포격: 집중포화의 피해량이 <span style="color: var(--green-11)">0.43%</span> 증가한다.',
              },
            },
          ],
        },
      },
      {
        name: '화력 강화',
        arkgrid: {
          sun: [
            {
              name: '탄약 수집가',
              option: {
                10: '일반 스킬의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "'운명' 발동 시 10.0초 동안 '운명: 탄약 수집가' 효과를 획득한다. '운명: 탄약 수집가' : 치명타 적중률이 <span style=\"color: var(--green-11)\">5.0%</span> 증가한다.",
                17: "'운명' 발동 시 10.0초 동안 '운명: 숙련된 용병' 효과를 획득한다. '운명: 숙련된 용병' : 공격 속도, 이동 속도가 <span style=\"color: var(--green-11)\">10.0%</span> 증가하고 포화 공격의 피해량이 <span style=\"color: var(--green-11)\">10.0/15.0%</span> 증가한다.",
                18: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                19: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                20: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
              },
            },
            {
              name: '데몬 파이어',
              option: {
                10: '일반 스킬의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "'운명' 발동 시 30.0초 동안 '운명: 데몬 파이어' 효과를 획득한다. '운명: 데몬 파이어' : 네이팜탄, 화염방사기의 피해량이 <span style=\"color: var(--green-11)\">10.0%</span> 증가한다.",
                17: "'운명: 데몬 파이어' 효과가 있을 때 화염방사기를 적중할 때마다 '운명: 지옥불' 효과를 1중첩 획득한다. (최대 50중첩) '운명: 지옥불' : 네이팜탄 사용 시 효과를 소모하여 중첩 당 피해량이 <span style=\"color: var(--green-11)\">3.0/3.4%</span> 증가한다.",
                18: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                19: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                20: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
              },
            },
            {
              name: '점핑맨',
              option: {
                10: '공격 속도가 <span style="color: var(--green-11)">20.0%</span> 증가한다.',
                14: "'운명' 발동 시 20.0초 동안 '운명: 점핑맨' 효과를 획득한다. '운명: 점핑맨' : 일반 스킬 사용 시 점프 포격의 재사용 대기시간이 <span style=\"color: var(--green-11)\">20.0%</span> 감소하고, 점프 포격 사용 시 고압열탄, 다연장로켓포의 재사용 대기시간이 <span style=\"color: var(--green-11)\">20.0%</span> 감소한다.",
                17: "'운명' 발동 시 다음 사용하는 고압열탄 또는 다연장로켓포의 피해량이 <span style=\"color: var(--green-11)\">35.0/38.0%</span> 증가한다.",
                18: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                19: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                20: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
              },
            },
          ],
          moon: [
            {
              name: '질풍 포병',
              option: {
                10: '일반 스킬의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "일반 스킬을 2회 사용 시 '운명'이 발동한다.",
                17: '일반 스킬의 시전 속도가 <span style="color: var(--green-11)">10.0%</span> 증가하며, 일반 스킬의 피해량이 <span style="color: var(--green-11)">0/1.0%</span> 증가한다.',
                18: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                19: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                20: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
              },
            },
            {
              name: '무한 연소',
              option: {
                10: '일반 스킬의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "강화탄 사용 시 '운명'이 발동한다.",
                17: '화염방사기를 제외한 일반 스킬을 사용 시 화염방사기의 재사용 대기시간이 <span style="color: var(--green-11)">2.0초</span> 감소한다. 적에게 주는 피해량이 <span style="color: var(--green-11)">0/1.0%</span> 증가한다.',
                18: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                19: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                20: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
              },
            },
            {
              name: '도약의 순간',
              option: {
                10: '일반 스킬의 피해량이 <span style="color: var(--green-11)">1.5%</span> 증가한다.',
                14: "점프 포격 사용 시 '운명'이 발동한다.",
                17: '점프 포격 사용 시 이동속도가 12.0초 동안 <span style="color: var(--green-11)">20.0%</span> 증가한다. 적에게 주는 피해량이 <span style="color: var(--green-11)">0/1.0%</span> 증가한다.',
                18: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                19: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
                20: '일반 스킬의 피해량이 <span style="color: var(--green-11)">0.16%</span> 증가한다.',
              },
            },
          ],
          star: [
            {
              name: '아이언 샤워',
              option: {
                10: '포화 공격의 피해량이 <span style="color: var(--green-11)">7.0%</span> 증가한다.',
                14: '포화 공격의 피해량이 <span style="color: var(--green-11)">10.0%</span> 증가한다.',
                17: '포화 공격의 시전속도가 <span style="color: var(--green-11)">20.0%</span> 증가하고, 피해량이 <span style="color: var(--green-11)">10.0/15.0%</span> 증가한다.',
                18: '포화 공격의 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                19: '포화 공격의 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
                20: '포화 공격의 피해량이 <span style="color: var(--green-11)">1.0%</span> 증가한다.',
              },
            },
            {
              name: '웰던맨',
              option: {
                10: '화염방사기의 피해량이 <span style="color: var(--green-11)">10.0%</span> 증가한다.',
                14: '화염방사기의 시전 속도가 <span style="color: var(--green-11)">30.0%</span> 증가하고, 스킬 시전 중 이동 속도가 <span style="color: var(--green-11)">50.0%</span> 증가한다.',
                17: "네이팜탄의 '연쇄 폭발' 트라이포드 적용 시 피해량이 <span style=\"color: var(--green-11)\">50.0/65.0%</span> 증가한다.",
                18: '네이팜탄의 피해량이 <span style="color: var(--green-11)">1.2%</span> 증가한다.',
                19: '네이팜탄의 피해량이 <span style="color: var(--green-11)">1.2%</span> 증가한다.',
                20: '네이팜탄의 피해량이 <span style="color: var(--green-11)">1.2%</span> 증가한다.',
              },
            },
            {
              name: '오토 락온',
              option: {
                10: '고압열탄의 피해량이 <span style="color: var(--green-11)">5.0%</span> 증가한다.',
                14: '다연장로켓포의 시전 속도가 <span style="color: var(--green-11)">30.0%</span> 증가하고, 피해량이 <span style="color: var(--green-11)">15.0%</span> 증가한다.',
                17: "고압열탄의 '신속 포격' 트라이포드 적용 시 피해량이 <span style=\"color: var(--green-11)\">90.0/100.0%</span> 증가한다.",
                18: '고압열탄의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
                19: '고압열탄의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
                20: '고압열탄의 피해량이 <span style="color: var(--green-11)">0.7%</span> 증가한다.',
              },
            },
          ],
        },
      },
    ],
  },
];
