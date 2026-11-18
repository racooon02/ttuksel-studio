# 뚝셀 스튜디오 (공개 사이트 소스)

첫 스튜디오(다크 버전) 구조가 정본입니다: 제안 → 투표판 → 제작 보드 → 크레딧.
호스팅은 GitHub Pages(정적), 데이터는 Firebase Firestore(무료 티어)를 씁니다.
동기화 순서: 이 비공개 레포 `site/` 먼저 수정 → 공개 레포 `racooon02/ttuksel-studio`에 반영.

## 파일 구성
- `index.html` — 헤더/통계/3단계/탭 4개(투표판·제작 보드·크레딧·관리)
- `style.css`, `palette.css` — 남색 픽셀 톤
- `firebase-config.js` — Firebase 설정값 + 관리 코드 상수 + Formspree 엔드포인트 상수
- `app.js` — Firestore 실시간 구독, 투표(트랜잭션), 제안 제출, 관리 작업
- `seed-data.js` — 동네 버전 data.js에서 이관한 기존 보드 데이터
- `data.js` — 폐기된 껍데기 (하위 호환용, 아무도 읽지 않음)
- `firestore.rules` — Firestore 보안 규칙 (콘솔에 붙여넣기)
- `assets/` — 마스코트 등 기존 이미지 (ttuksel.png 등) 재사용

## 2단계에서 할 일 (Firebase 연결 — 사용자가 직접)
1. https://console.firebase.google.com 에서 프로젝트를 만듭니다.
2. 빌드 > Firestore Database > "데이터베이스 만들기" (프로덕션 모드, 지역은 가까운 곳).
3. 프로젝트 설정 > 일반 > "내 앱"에서 웹 앱(`</>`)을 추가하고,
   발급된 `firebaseConfig` 값을 `firebase-config.js`의 자리표시자와 교체합니다.
4. Firestore > 규칙 탭에 `firestore.rules` 내용을 붙여넣고 "게시"합니다.
5. 관리 코드 변경: `firebase-config.js`의 `TTUKSEL_ADMIN_CODE` 상수만 바꾸면 됩니다.
   (기본값은 임시값이니 실제 운영 전에 꼭 바꾸세요.)
6. 이관 데이터 반영: 사이트 관리 탭에서 잠금을 풀고
   "기존 보드 데이터 가져오기"를 한 번 누릅니다. 보안 규칙상 대기로 들어가니,
   승인 → "제작 중으로" 순서로 옮기면 기존 보드와 같아집니다.

설정 전(자리표시자 상태)에는 사이트가 "연결 준비 중" 배너와 함께
빈 목록으로 열립니다. 깨지지 않으니 안심하고 먼저 배포해도 됩니다.

## 데이터 모델 (컬렉션 `proposals`)
`title, pain, author, status, votes, voters[], createdAt`
status 전이: `pending`(대기) → `voting`(투표 중) → `building`(제작 중) → `done`(완성)

## 알려진 한계
- 투표 중복 방지는 기기 토큰(localStorage) + 문서의 voters 배열 방식이라
  토큰을 지우거나 다른 기기를 쓰면 재투표가 가능합니다. 어뷰징 완화 수준입니다.
  voters 배열이 매우 커지면(문서 1MiB 제한) 투표가 막힐 수 있습니다.
- 관리 비밀번호는 공개 코드 속 상수와 비교하는 UI 잠금일 뿐 실제 보안이
  아닙니다. 규칙의 상태 변경·삭제도 신원 확인 없이 열려 있습니다.
  스팸이 생기면 Firebase Auth(관리자 로그인) + 규칙 강화가 필요합니다.
- Formspree 엔드포인트는 병행 알림용 상수로 남아 있습니다
  (`firebase-config.js`의 `TTUKSEL_FORMSPREE_ENDPOINT`, 끄려면 빈 문자열).
