/*
 * 뚝셀 스튜디오 — 한/영 언어 전환
 * - 방문자가 상단 토글로 한국어/English를 직접 선택한다.
 * - 선택은 localStorage(ttuksel_lang)에 저장돼 다음 방문에도 유지된다.
 * - 저장된 선택이 없으면 브라우저 언어로 기본값을 정한다 (en → English, 그 외 한국어).
 * - 정적 문구는 index.html의 data-i18n 속성으로, 동적 문구는 app.js가
 *   window.ttukselT(key, vars)를 호출해 가져간다.
 * - 시청자가 올린 제안 제목·내용 같은 사용자 콘텐츠는 번역하지 않는다.
 */
window.TTUKSEL_I18N = {
  ko: {
    pageTitle: "뚝셀 스튜디오 · 뚝딱뚝딱, 직접 만든 도구",
    pageDesc: "뚝딱뚝딱, 직접 만든 도구. 원하는 기능을 제안하고, 투표로 다음 도구를 함께 골라요.",
    skip: "본문으로 가기",
    mascotAlt: "렌치를 든 둥근 큐브 뚝셀 (INFJ)",
    mascotName: "뚝셀 (INFJ)",
    heroTitle: "뚝셀 스튜디오",
    heroTag: "뚝딱뚝딱, 직접 만든 도구",
    statsAria: "스튜디오 현황",
    statProposals: "올라온 제안",
    statVotes: "누적 투표",
    statDone: "완성된 도구",
    step1Title: "기능 제안",
    step1Desc: "원하는 도구를 제안함에 넣기",
    step2Title: "투표",
    step2Desc: "마음에 드는 제안에 한 표",
    step3Title: "제작 + 크레딧",
    step3Desc: "채택되면 영상으로 만들고 이름 공개",
    offlineBanner: "지금은 연결 준비 중이에요. 제안과 투표는 곧 열립니다.",
    tabsAria: "스튜디오 메뉴",
    tabVote: "투표판",
    tabBoard: "제작 보드",
    tabCredits: "크레딧",
    tabAdmin: "관리",
    ideaTitle: "만들었으면 하는 기능, 직접 제안하기",
    ideaNote: "채택돼서 완성되면 영상 엔딩 크레딧에 아래 이름이 그대로 올라가요.",
    titleLabel: "기능 이름",
    titlePh: "예: 인스타 저장 영상 자동 분류기",
    painLabel: "어떤 불편을 해결하나요?",
    optional: "(선택)",
    painPh: "어떤 상황에서, 어떻게 쓰면 좋을지 적어 주세요",
    authorLabel: "이름 또는 인스타그램 아이디",
    creditNote: "(크레딧 표기용)",
    authorPh: "예: @my_id",
    submitIdea: "제안 올리기",
    voteHead: "투표판",
    voteHeadDesc: "투표가 많은 순으로 보여요. 한 기기에서 제안마다 한 표, 다시 누르면 취소돼요.",
    voteEmpty: "아직 올라온 제안이 없어요. 첫 제안을 남겨보세요.",
    boardHead: "제작 보드",
    boardHeadDesc: "투표로 채택돼서 지금 만들고 있는 도구들이에요.",
    boardEmpty: "아직 제작 중인 도구가 없어요.",
    creditsHead: "완성 크레딧",
    creditsHeadDesc: "완성된 도구와, 시작을 함께한 제안자의 이름이에요.",
    creditsEmpty: "아직 완성된 도구가 없어요. 첫 번째 이름을 기다려요.",
    adminHead: "관리",
    adminDesc: "관리자 비밀번호가 필요해요.",
    adminPwLabel: "관리자 비밀번호",
    adminPwPh: "비밀번호 입력",
    unlockBtn: "잠금 풀기",
    pendingHead: "대기 중 제안",
    pendingDesc: "승인하면 투표판에 올라가고, 반려하면 삭제돼요.",
    pendingEmpty: "대기 중인 제안이 없어요.",
    manageHead: "올라온 제안 관리",
    manageDesc: "상태 이동: 투표 중 → 제작 중 → 완성. 삭제는 되돌릴 수 없어요.",
    seedBtn: "기존 보드 데이터 가져오기 (이관)",
    relockBtn: "다시 잠그기",
    footerBrand: "뚝셀 스튜디오",
    footerTag: "작은 불편이, 다음 도구로.",
    footerIg: "인스타그램에서 만나요 ↗",
    noscript: "제안과 투표를 보려면 자바스크립트를 켜주세요.",
    voteBtn: "투표",
    votedBtn: "투표함",
    badgeBuilding: "제작 중",
    badgeDone: "완성",
    statusVoting: "투표 중",
    selfMade: "뚝셀 자체 제작",
    anon: "익명",
    authorBy: "제안 · {name}",
    authorIdea: "아이디어: {name}",
    offlineSubmitMsg: "지금은 연결 준비 중이라 제안을 받을 수 없어요. 조금만 기다려 주세요.",
    connError: "연결에 문제가 있어 목록을 불러오지 못했어요. ({code})",
    sendingMsg: "보내는 중…",
    submitOk: "제안이 도착했어요. 확인 후 투표판에 올라갑니다.",
    submitFail: "전송에 실패했어요. 잠시 후 다시 시도해 주세요. ({code})",
    adminApprove: "승인",
    adminReject: "반려(삭제)",
    adminToBuilding: "제작 중으로",
    adminToDone: "완성으로",
    adminRemove: "삭제",
    confirmDelete: "이 제안을 삭제할까요? 되돌릴 수 없어요.",
    seedDup: "이미 가져온 데이터예요. (중복 없음)",
    seedOk: "기존 보드 데이터 {n}건을 대기 중으로 가져왔어요. 승인 후 제작 중으로 옮겨 주세요.",
    seedFail: "가져오기에 실패했어요. ({code})",
    adminOfflineMsg: "지금은 연결 준비 중이라 로그인할 수 없어요.",
    adminChecking: "확인 중이에요…",
    adminWrongPw: "비밀번호가 맞지 않아요.",
    seedOfflineMsg: "연결 준비 중이라 아직 가져올 수 없어요."
  },
  en: {
    pageTitle: "Ttuksel Studio · Handmade tools, built by Ttuksel",
    pageDesc: "Handmade tools, built one by one. Suggest a feature and vote together on what gets built next.",
    skip: "Skip to content",
    mascotAlt: "Ttuksel (INFJ), a round cube holding a wrench",
    mascotName: "Ttuksel (INFJ)",
    heroTitle: "Ttuksel Studio",
    heroTag: "Handmade tools, built one by one",
    statsAria: "Studio stats",
    statProposals: "Proposals",
    statVotes: "Total votes",
    statDone: "Tools completed",
    step1Title: "Suggest",
    step1Desc: "Drop your tool idea in the box",
    step2Title: "Vote",
    step2Desc: "Vote for the ideas you like",
    step3Title: "Build + Credit",
    step3Desc: "Winners get built on video, with your name in the credits",
    offlineBanner: "We're still getting connected. Proposals and voting open soon.",
    tabsAria: "Studio menu",
    tabVote: "Voting",
    tabBoard: "Build Board",
    tabCredits: "Credits",
    tabAdmin: "Admin",
    ideaTitle: "Suggest a feature you'd like to see",
    ideaNote: "If your idea gets picked and built, the name below goes into the video's end credits.",
    titleLabel: "Feature name",
    titlePh: "e.g. Auto-sorter for saved Instagram videos",
    painLabel: "What problem does it solve?",
    optional: "(optional)",
    painPh: "Tell us when and how you'd use it",
    authorLabel: "Your name or Instagram ID",
    creditNote: "(shown in credits)",
    authorPh: "e.g. @my_id",
    submitIdea: "Submit idea",
    voteHead: "Voting board",
    voteHeadDesc: "Sorted by votes. One vote per idea per device — tap again to undo.",
    voteEmpty: "No proposals yet. Be the first to suggest one.",
    boardHead: "Build board",
    boardHeadDesc: "Tools chosen by vote, now in the making.",
    boardEmpty: "Nothing in the making yet.",
    creditsHead: "Credits",
    creditsHeadDesc: "Finished tools, and the people whose ideas started them.",
    creditsEmpty: "No finished tools yet. Waiting for the first name.",
    adminHead: "Admin",
    adminDesc: "Admin password required.",
    adminPwLabel: "Admin password",
    adminPwPh: "Enter password",
    unlockBtn: "Unlock",
    pendingHead: "Pending proposals",
    pendingDesc: "Approve to send it to the voting board, reject to delete it.",
    pendingEmpty: "No pending proposals.",
    manageHead: "Manage proposals",
    manageDesc: "Move status: Voting → Building → Done. Deletion can't be undone.",
    seedBtn: "Import existing board data",
    relockBtn: "Lock again",
    footerBrand: "Ttuksel Studio",
    footerTag: "Small annoyances become the next tool.",
    footerIg: "Find us on Instagram ↗",
    noscript: "Please enable JavaScript to see proposals and voting.",
    voteBtn: "Vote",
    votedBtn: "Voted",
    badgeBuilding: "Building",
    badgeDone: "Done",
    statusVoting: "Voting",
    selfMade: "Made by Ttuksel",
    anon: "Anonymous",
    authorBy: "Suggested by {name}",
    authorIdea: "Idea: {name}",
    offlineSubmitMsg: "We're still getting connected, so proposals can't be received yet. Please check back soon.",
    connError: "Connection problem — couldn't load the list. ({code})",
    sendingMsg: "Sending…",
    submitOk: "Got it! Your proposal will appear on the voting board after a quick review.",
    submitFail: "Sending failed. Please try again shortly. ({code})",
    adminApprove: "Approve",
    adminReject: "Reject (delete)",
    adminToBuilding: "Move to Building",
    adminToDone: "Mark Done",
    adminRemove: "Delete",
    confirmDelete: "Delete this proposal? This can't be undone.",
    seedDup: "Already imported. (No duplicates)",
    seedOk: "Imported {n} items as pending. Approve them, then move them to Building.",
    seedFail: "Import failed. ({code})",
    adminOfflineMsg: "Still connecting — login isn't available yet.",
    adminChecking: "Checking…",
    adminWrongPw: "Wrong password.",
    seedOfflineMsg: "Still connecting — import isn't available yet."
  }
};

(function () {
  "use strict";
  var KEY = "ttuksel_lang";

  function detect() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === "ko" || saved === "en") return saved;
    } catch (e) {}
    var nav = (navigator.language || "ko").toLowerCase();
    return nav.indexOf("en") === 0 ? "en" : "ko";
  }

  var lang = detect();

  function t(key, vars) {
    var dict = window.TTUKSEL_I18N[lang] || {};
    var s = dict[key] != null ? dict[key] : (window.TTUKSEL_I18N.ko[key] != null ? window.TTUKSEL_I18N.ko[key] : key);
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.split("{" + k + "}").join(String(vars[k]));
      });
    }
    return s;
  }

  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = t("pageTitle");
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("pageDesc"));
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (n) {
      n.textContent = t(n.getAttribute("data-i18n"));
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-ph]"), function (n) {
      n.setAttribute("placeholder", t(n.getAttribute("data-i18n-ph")));
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-aria]"), function (n) {
      n.setAttribute("aria-label", t(n.getAttribute("data-i18n-aria")));
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-alt]"), function (n) {
      n.setAttribute("alt", t(n.getAttribute("data-i18n-alt")));
    });
    Array.prototype.forEach.call(document.querySelectorAll(".lang-btn"), function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function setLang(next) {
    if (next !== "ko" && next !== "en") return;
    lang = next;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    applyStatic();
    if (typeof window.__ttukselRenderAll === "function") window.__ttukselRenderAll();
  }

  window.ttukselT = t;
  window.ttukselLang = function () { return lang; };
  window.ttukselSetLang = setLang;

  Array.prototype.forEach.call(document.querySelectorAll(".lang-btn"), function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });
  applyStatic();
})();
