/*
 * 뚝셀 스튜디오 — 투표판/제작 보드/크레딧/관리 로직
 * 데이터: Firebase Firestore (무료 티어), 컬렉션 "proposals"
 *   문서 필드: title, pain, author, status, votes, voters[], createdAt
 *   status: "pending"(대기) → "voting"(투표 중) → "building"(제작 중) → "done"(완성)
 *
 * 투표 중복 방지 (한계 명시):
 *   - 브라우저 localStorage에 기기 토큰을 저장하고, 제안 문서의
 *     voters 배열에 토큰이 있으면 1표로 셉니다. (1기기 1표)
 *   - 토큰을 지우거나 다른 브라우저를 쓰면 다시 투표할 수 있습니다.
 *     즉 "완벽한 보안"이 아니라 어뷰징 완화 수준입니다.
 *   - 투표수와 voters 배열은 트랜잭션으로 함께 갱신해 어긋남을 줄입니다.
 *
 * 관리 비밀번호 (한계 명시):
 *   - firebase-config.js의 TTUKSEL_ADMIN_CODE와 비교하는 UI 잠금일 뿐,
 *     코드가 공개돼 있어 실제 보안이 아닙니다. firestore.rules 참고.
 */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };

  /* ---------- 기기 토큰 ---------- */
  function deviceToken() {
    var KEY = "ttuksel_device_token_v1";
    var t = null;
    try { t = localStorage.getItem(KEY); } catch (e) {}
    if (!t) {
      t = "dev-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 12);
      try { localStorage.setItem(KEY, t); } catch (e) {}
    }
    return t;
  }
  var TOKEN = deviceToken();

  /* ---------- 탭 ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
        $("panel-" + t.getAttribute("data-tab")).hidden = !on;
      });
    });
  });

  /* ---------- 오프라인(설정 전) 모드 ---------- */
  var configured = window.ttukselFirebaseConfigured && window.ttukselFirebaseConfigured();
  if (!configured || typeof firebase === "undefined") {
    $("offline-banner").hidden = false;
    $("vote-empty").hidden = false;
    $("board-empty").hidden = false;
    $("credits-empty").hidden = false;
    $("pending-empty").hidden = false;
    var form0 = $("idea-form");
    form0.addEventListener("submit", function (ev) {
      ev.preventDefault();
      $("idea-status").textContent = "지금은 연결 준비 중이라 제안을 받을 수 없어요. 조금만 기다려 주세요.";
    });
    wireAdmin(null); // 잠금 UI만 동작 (데이터 작업은 불가)
    return;
  }

  /* ---------- Firestore 연결 ---------- */
  firebase.initializeApp(window.TTUKSEL_FIREBASE_CONFIG);
  var db = firebase.firestore();
  var col = db.collection("proposals");

  var docs = []; // 전체 제안 스냅샷 (실시간)
  col.onSnapshot(function (snap) {
    docs = snap.docs.map(function (d) {
      var v = d.data();
      v.id = d.id;
      v.voters = v.voters || [];
      v.votes = v.votes || 0;
      return v;
    });
    renderAll();
  }, function (err) {
    var b = $("offline-banner");
    b.hidden = false;
    b.textContent = "연결에 문제가 있어 목록을 불러오지 못했어요. (" + err.code + ")";
  });

  /* 캐릭터 이름이면 "이름 (MBTI)"로 표기 */
  function charLabel(name) {
    var map = window.TTUKSEL_CHARACTERS || {};
    return map[name] ? name + " (" + map[name] + ")" : name;
  }

  /* 자체 제작 표기: author가 이 표지값이면 시청자 제안이 아니라
   * 뚝셀이 직접 낸 아이디어로 만든 도구다. 제작 보드·크레딧에서는
   * "뚝셀 자체 제작"으로만 표시하고 제안자 표기와 섞지 않는다.
   * (보안 규칙상 필드를 늘릴 수 없어 author 값으로 구분한다.) */
  var SELF_LABEL = "뚝셀 자체 제작";
  function isSelfMade(d) { return (d.author || "") === SELF_LABEL; }
  function authorLine(d, creditStyle) {
    if (isSelfMade(d)) return SELF_LABEL;
    var name = charLabel(d.author || "익명");
    return creditStyle ? ("아이디어: " + name) : ("제안 · " + name);
  }
  function byStatus(s) { return docs.filter(function (d) { return d.status === s; }); }
  function tsMillis(d) {
    return d.createdAt && d.createdAt.toMillis ? d.createdAt.toMillis() : 0;
  }

  /* ---------- 렌더링 (사용자 입력은 textContent로만) ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function cardMain(d, badgeText, badgeCls, creditStyle) {
    var main = el("div", "card-main");
    if (badgeText) main.appendChild(el("span", "badge " + (badgeCls || ""), badgeText));
    main.appendChild(el("h3", null, d.title));
    if (d.pain) main.appendChild(el("p", "pain", d.pain));
    main.appendChild(el("p", "author", authorLine(d, creditStyle)));
    return main;
  }
  function fillList(listEl, emptyEl, items, builder) {
    listEl.innerHTML = "";
    items.forEach(function (d) { listEl.appendChild(builder(d)); });
    if (emptyEl) emptyEl.hidden = items.length > 0;
  }

  function renderAll() {
    var voting = byStatus("voting").sort(function (a, b) {
      return (b.votes - a.votes) || (tsMillis(a) - tsMillis(b));
    });
    var building = byStatus("building").sort(function (a, b) { return tsMillis(a) - tsMillis(b); });
    var done = byStatus("done").sort(function (a, b) { return tsMillis(b) - tsMillis(a); });
    var pending = byStatus("pending").sort(function (a, b) { return tsMillis(a) - tsMillis(b); });

    /* 통계: 올라온 제안 = 승인된 전체, 누적 투표 = 승인된 제안의 투표 합 */
    var approved = voting.concat(building, done);
    $("stat-proposals").textContent = approved.length;
    $("stat-votes").textContent = approved.reduce(function (s, d) { return s + (d.votes || 0); }, 0);
    $("stat-done").textContent = done.length;

    fillList($("vote-list"), $("vote-empty"), voting, function (d) {
      var card = el("article", "card");
      card.appendChild(cardMain(d));
      var voted = d.voters.indexOf(TOKEN) >= 0;
      var btn = el("button", "vote-btn" + (voted ? " voted" : ""));
      btn.type = "button";
      btn.appendChild(el("span", "count", String(d.votes)));
      btn.appendChild(document.createTextNode(voted ? "투표함" : "투표"));
      btn.setAttribute("aria-pressed", voted ? "true" : "false");
      btn.addEventListener("click", function () { vote(d.id, btn); });
      card.appendChild(btn);
      return card;
    });

    fillList($("board-list"), $("board-empty"), building, function (d) {
      var card = el("article", "card");
      card.appendChild(cardMain(d, "제작 중", "building", true));
      return card;
    });

    fillList($("credits-list"), $("credits-empty"), done, function (d) {
      var card = el("article", "card");
      card.appendChild(cardMain(d, "완성", "done", true));
      return card;
    });

    fillList($("pending-list"), $("pending-empty"), pending, function (d) {
      var card = el("article", "card");
      var main = cardMain(d);
      main.appendChild(adminActions([
        ["approve", "승인", "primary"],
        ["reject", "반려(삭제)", "danger"]
      ], d.id));
      card.appendChild(main);
      return card;
    });

    fillList($("manage-list"), null, approved, function (d) {
      var label = { voting: "투표 중", building: "제작 중", done: "완성" }[d.status];
      var card = el("article", "card");
      var main = cardMain(d, label, d.status === "done" ? "done" : d.status === "building" ? "building" : "");
      var acts = [];
      if (d.status === "voting") acts.push(["to-building", "제작 중으로", "primary"]);
      if (d.status === "building") acts.push(["to-done", "완성으로", "primary"]);
      acts.push(["remove", "삭제", "danger"]);
      main.appendChild(adminActions(acts, d.id));
      card.appendChild(main);
      return card;
    });
  }

  function adminActions(list, id) {
    var wrap = el("div", "admin-actions");
    list.forEach(function (a) {
      var b = el("button", "button " + a[2], a[1]);
      b.type = "button";
      b.setAttribute("data-action", a[0]);
      b.setAttribute("data-id", id);
      b.addEventListener("click", function () { adminOp(a[0], id); });
      wrap.appendChild(b);
    });
    return wrap;
  }

  /* ---------- 투표 (트랜잭션: 투표수 + 토큰 동시 갱신) ---------- */
  function vote(id, btn) {
    btn.disabled = true;
    var ref = col.doc(id);
    db.runTransaction(function (tx) {
      return tx.get(ref).then(function (snap) {
        if (!snap.exists) throw new Error("gone");
        var v = snap.data();
        var voters = v.voters || [];
        var votes = v.votes || 0;
        if (voters.indexOf(TOKEN) >= 0) {
          tx.update(ref, {
            votes: Math.max(0, votes - 1),
            voters: firebase.firestore.FieldValue.arrayRemove(TOKEN)
          });
        } else {
          tx.update(ref, {
            votes: votes + 1,
            voters: firebase.firestore.FieldValue.arrayUnion(TOKEN)
          });
        }
      });
    }).catch(function (err) {
      console.warn("vote failed", err);
    }).then(function () { btn.disabled = false; });
  }

  /* ---------- 제안 제출 ---------- */
  $("idea-form").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var title = $("idea-title").value.trim();
    var pain = $("idea-pain").value.trim();
    var author = $("idea-author").value.trim();
    if (!title || !author) return;
    var status = $("idea-status");
    status.textContent = "보내는 중…";
    col.add({
      title: title, pain: pain, author: author,
      status: "pending", votes: 0, voters: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function () {
      status.textContent = "제안이 도착했어요. 확인 후 투표판에 올라갑니다.";
      ev.target.reset();
      notifyFormspree(title, pain, author);
    }).catch(function (err) {
      status.textContent = "전송에 실패했어요. 잠시 후 다시 시도해 주세요. (" + err.code + ")";
    });
  });

  /* Formspree 병행 알림 (실패해도 본 제출에는 영향 없음) */
  function notifyFormspree(title, pain, author) {
    var ep = window.TTUKSEL_FORMSPREE_ENDPOINT;
    if (!ep) return;
    try {
      fetch(ep, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ title: title, pain: pain, author: author, _subject: "뚝셀 스튜디오 새 제안(병행 알림)" }),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  /* ---------- 관리 작업 (관리자 경로: 상태 변경·삭제) ---------- */
  function adminOp(action, id) {
    var ref = col.doc(id);
    var doneMsg = function () {};
    if (action === "approve") ref.update({ status: "voting" }).catch(doneMsg);
    else if (action === "to-building") ref.update({ status: "building" }).catch(doneMsg);
    else if (action === "to-done") ref.update({ status: "done" }).catch(doneMsg);
    else if (action === "reject" || action === "remove") {
      if (window.confirm("이 제안을 삭제할까요? 되돌릴 수 없어요.")) ref.delete().catch(doneMsg);
    }
  }

  wireAdmin(col);

  /* 기존 보드 데이터 이관 (seed-data.js) */
  $("seed-import").addEventListener("click", function () {
    var st = $("seed-status");
    var seed = window.TTUKSEL_SEED || [];
    var jobs = seed.filter(function (s) {
      return !docs.some(function (d) { return d.title === s.title; });
    }).map(function (s) { // 보안 규칙상 생성은 pending만 가능 → 승인 후 상태 이동
      return col.add({
        title: s.title, pain: s.pain || "", author: s.author || "",
        status: "pending", votes: 0, voters: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
    if (!jobs.length) { st.textContent = "이미 가져온 데이터예요. (중복 없음)"; return; }
    Promise.all(jobs).then(function () {
      st.textContent = "기존 보드 데이터 " + jobs.length + "건을 대기 중으로 가져왔어요. 승인 후 제작 중으로 옮겨 주세요.";
    }).catch(function (err) {
      st.textContent = "가져오기에 실패했어요. (" + err.code + ")";
    });
  });

  /* ---------- 관리 잠금 UI ---------- */
  function wireAdmin(colRef) {
    var unlocked = false;
    try { unlocked = sessionStorage.getItem("ttuksel_admin") === "1"; } catch (e) {}
    function apply() {
      $("admin-lock").hidden = unlocked;
      $("admin-body").hidden = !unlocked;
    }
    apply();
    $("admin-form").addEventListener("submit", function (ev) {
      ev.preventDefault();
      if ($("admin-code").value === window.TTUKSEL_ADMIN_CODE) {
        unlocked = true;
        try { sessionStorage.setItem("ttuksel_admin", "1"); } catch (e) {}
        $("admin-status").textContent = "";
        apply();
      } else {
        $("admin-status").textContent = "코드가 맞지 않아요.";
      }
    });
    $("admin-lock-btn").addEventListener("click", function () {
      unlocked = false;
      try { sessionStorage.removeItem("ttuksel_admin"); } catch (e) {}
      apply();
    });
    if (!colRef) {
      // 오프라인 모드: 잠금은 풀려도 데이터 작업 버튼이 없으므로 안내만 남긴다.
      $("seed-import").addEventListener("click", function () {
        $("seed-status").textContent = "연결 준비 중이라 아직 가져올 수 없어요.";
      });
    }
  }
})();
