/*
 * 기존(동네 버전) data.js에서 이관한 데이터.
 * - board.working  → status "building" 제안으로 이관
 * - board.completed / credits → 비어 있어서 이관 대상 없음
 * - neighbors(뚝셀·달콩)는 새 구조(투표판 중심)에 자리가 없어 이관하지 않음
 *
 * 실제 반영 방법: 관리 탭에서 잠금을 풀고
 * "기존 보드 데이터 가져오기" 버튼을 한 번 누르면 Firestore에 기록됩니다.
 * (제목이 같은 문서가 이미 있으면 중복으로 만들지 않습니다.)
 */
window.TTUKSEL_SEED = [
  {
    title: "무신사 체험단 신청 도우미",
    pain: "반복되는 신청 과정을 조금 더 편하게.",
    author: "뚝셀 스튜디오 (기존 보드 이관)",
    status: "building"
  }
];

/*
 * 캐릭터 표기 규칙: 캐릭터를 소개하는 표기에는 이름 옆에 MBTI를
 * 괄호로 붙입니다. 예) 뚝셀 (INFJ)
 * 캐릭터 소개 영역이 생기거나, 크레딧·보드에서 캐릭터 이름이
 * 표기될 때 이 맵을 사용하세요. (app.js의 charLabel이 자동 적용)
 */
window.TTUKSEL_CHARACTERS = {
  "뚝셀": "INFJ",
  "뜨또": "ENTP",
  "달콩": "ISTP",
  "두부": "ISFP",
  "라떼": "ESFJ",
  "원서": "INFP"
};
