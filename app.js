const data = window.STUDIO;
for (const img of document.querySelectorAll("[data-asset]")) img.src = data.assets[img.dataset.asset];
function el(tag, cls, text) { const node = document.createElement(tag); if(cls) node.className=cls; if(text!==undefined) node.textContent=text; return node; }
for(const person of data.neighbors){
 const card=el("article","neighbor"), portrait=el("div","portrait");
 if(person.asset){ const img=el("img","sprite");img.src=data.assets[person.asset];img.alt=person.name+" 픽셀 캐릭터";img.width=128;img.height=128;portrait.append(img); }
 else portrait.append(el("div","placeholder","준비 중"));
 card.append(portrait,el("h3","",person.name),el("p","role",person.role));
 if(person.note) card.append(el("span","note",person.note));
 card.append(el("p","",person.text));document.querySelector("#neighbors-grid").append(card);
}
for(const [key,id,count] of [["working","working","working-count"],["completed","completed","done-count"]]){
 const items=data.board[key];document.getElementById(count).textContent=String(items.length).padStart(2,"0");
 const target=document.getElementById(id);
 if(!items.length)target.append(el("p","empty","아직 완성된 도구가 없어요. 첫 번째 도구를 차근차근 만들고 있어요."));
 for(const item of items){const card=el("div","project");card.append(el("h4","",item.name),el("p","",item.text));target.append(card);}
}
const form = document.querySelector("#request-form");
const receipt = document.querySelector("#receipt");
const success = document.querySelector("#success");
const status = document.querySelector("#status");
const submitButton = form.querySelector("button[type=submit]");
let requestText = "";
let submitting = false;

form.addEventListener("submit", async event => {
  event.preventDefault();
  if (submitting) return;

  const fieldIds = ["nickname", "instagram", "tool", "pain"];
  for (const id of fieldIds) {
    const field = document.getElementById(id);
    field.value = field.value.trim();
  }
  if (!form.reportValidity()) return;

  const payload = new FormData(form);
  const labels = ["닉네임", "인스타그램 아이디", "필요한 도구", "불편한 점"];
  const values = fieldIds.map(id => document.getElementById(id).value);
  const content = document.querySelector("#receipt-content");
  content.replaceChildren();
  labels.forEach((label, i) => content.append(el("dt", "", label), el("dd", "", values[i])));
  requestText = "[뚝셀 스튜디오 · 도구 신청]\n" +
    labels.map((label, i) => label + ": " + values[i]).join("\n\n");

  submitting = true;
  submitButton.disabled = true;
  submitButton.textContent = "보내는 중…";
  form.setAttribute("aria-busy", "true");
  status.textContent = "신청 내용을 보내고 있어요.";
  receipt.hidden = true;
  success.hidden = true;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(data.formEndpoint, {
      method: "POST",
      body: payload,
      headers: { Accept: "application/json" },
      signal: controller.signal
    });
    if (!response.ok) throw new Error("Submission failed");
    form.reset();
    form.hidden = true;
    success.hidden = false;
    status.textContent = "접수 완료";
    success.focus();
  } catch {
    form.hidden = true;
    receipt.hidden = false;
    status.textContent = "전송을 확인하지 못했어요. 복사·DM으로 보내거나 다시 시도해 주세요.";
    document.querySelector("#copy").focus();
  } finally {
    clearTimeout(timeout);
    submitting = false;
    submitButton.disabled = false;
    submitButton.textContent = "신청 보내기 →";
    form.removeAttribute("aria-busy");
  }
});

function showForm() {
  form.hidden = false;
  receipt.hidden = true;
  success.hidden = true;
  status.textContent = "";
  document.querySelector("#nickname").focus();
}
document.querySelector("#edit").addEventListener("click", showForm);
document.querySelector("#new-request").addEventListener("click", showForm);
document.querySelector("#copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(requestText);
    status.textContent = "복사했어요. 인스타 DM에 붙여넣어 주세요.";
  } catch {
    let box = document.querySelector("#manual-copy");
    if (!box) {
      box = el("textarea");
      box.id = "manual-copy";
      box.setAttribute("aria-label", "복사할 신청서");
      receipt.append(box);
    }
    box.value = requestText;
    box.focus();
    box.select();
    status.textContent = "선택된 신청서 내용을 직접 복사해 주세요.";
  }
});
