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
const form=document.querySelector("form"),receipt=document.querySelector("#receipt"),status=document.querySelector("#status");let requestText="";
form.addEventListener("submit",event=>{
 event.preventDefault();const values=["nickname","tool","pain"].map(id=>document.getElementById(id).value.trim());
 if(values.some(v=>!v)){status.textContent="빈칸에 내용을 적어주세요.";return;}
 const labels=["닉네임","필요한 도구","어떤 점이 불편한지"],content=document.querySelector("#receipt-content");content.replaceChildren();
 labels.forEach((label,i)=>content.append(el("dt","",label),el("dd","",values[i])));
 requestText="[뚝셀 스튜디오 · 도구 신청]\n"+labels.map((label,i)=>label+": "+values[i]).join("\n\n");
 form.hidden=true;receipt.hidden=false;status.textContent="신청서를 만들었어요. 복사한 뒤 DM으로 보내주세요.";document.querySelector("#copy").focus();
});
document.querySelector("#edit").addEventListener("click",()=>{form.hidden=false;receipt.hidden=true;status.textContent="";document.querySelector("#nickname").focus();});
document.querySelector("#copy").addEventListener("click",async()=>{
 try{await navigator.clipboard.writeText(requestText);status.textContent="복사했어요. 인스타 DM에 붙여넣어 주세요.";}
 catch{const box=el("textarea");box.value=requestText;box.setAttribute("aria-label","복사할 신청서");receipt.append(box);box.focus();box.select();status.textContent="자동 복사가 안 돼요. 선택된 신청서 내용을 직접 복사해 주세요.";}
});
