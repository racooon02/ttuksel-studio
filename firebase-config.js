/*
 * 뚝셀 스튜디오 — Firebase 설정 (2단계에서 실제 값으로 교체)
 * ---------------------------------------------------------------
 * Firebase 콘솔에서 웹 앱을 만들면 받는 firebaseConfig 값을
 * 아래 자리표시자(REPLACE_...) 자리에 그대로 붙여넣으면 됩니다.
 * 설정이 자리표시자인 동안 사이트는 깨지지 않고 "연결 준비 중"
 * 상태로 열립니다. (목록은 비어 보이고, 제안·투표는 잠시 멈춤)
 *
 * 사용자가 직접 해야 할 일 (2단계):
 *  1) https://console.firebase.google.com 에서 프로젝트 생성
 *  2) 빌드 > Firestore Database > 데이터베이스 만들기 (프로덕션 모드)
 *  3) 프로젝트 설정 > 내 앱 > 웹 앱(</>) 추가 → firebaseConfig 복사
 *  4) 아래 값 교체 + firestore.rules 내용을 콘솔 규칙 탭에 붙여넣고 게시
 */
window.TTUKSEL_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBGG-_wwWQUt3qw2QmTeh2S-jAWDVlmtj0",
  authDomain: "ttuksel-studio.firebaseapp.com",
  projectId: "ttuksel-studio",
  storageBucket: "ttuksel-studio.firebasestorage.app",
  messagingSenderId: "360554854914",
  appId: "1:360554854914:web:5a6423d13db9fdab89851b"
};

/*
 * 관리 탭 잠금 코드.
 * 주의: 이 값은 브라우저에서 누구나 읽을 수 있는 "UI 잠금"일 뿐,
 * 실제 보안이 아닙니다. Firestore 규칙만으로는 관리자 신원을
 * 구분할 수 없어서, 스팸·조작이 실제로 생기면 Firebase Auth
 * (관리자 계정 로그인) 도입이 필요합니다. → README.md 참고.
 * 코드를 바꾸려면 이 상수만 교체하세요.
 */
window.TTUKSEL_ADMIN_CODE = "bobo0713";

/*
 * 기존 Formspree 엔드포인트 (병행 알림용으로 유지).
 * 새 제안이 Firestore에 저장되면 같은 내용을 여기로도 보내서
 * 이메일 알림을 병행할 수 있게 남겨둔 상수입니다.
 * 병행 알림을 끄려면 빈 문자열로 바꾸세요.
 */
window.TTUKSEL_FORMSPREE_ENDPOINT = "https://formspree.io/f/mgakkpwr";

/* 설정이 실제 값으로 교체됐는지 판정 */
window.ttukselFirebaseConfigured = function () {
  var c = window.TTUKSEL_FIREBASE_CONFIG || {};
  return !!(c.apiKey && c.apiKey.indexOf("REPLACE_") !== 0 && c.projectId && c.projectId.indexOf("REPLACE_") !== 0);
};
