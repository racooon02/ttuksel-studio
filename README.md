# 뚝셀 스튜디오 공개 페이지

`site/`만 정적 호스팅에 올리면 된다. 정적 파일로 동작하며 신청은 Formspree로 보낸다. [공개 페이지](https://racooon02.github.io/ttuksel-studio/)

## 동기화

비공개 레포의 `site/`를 기준으로 수정한다. 작업이 끝나면 `site/`의 내용을 공개 레포 `racooon02/ttuksel-studio`의 루트에도 같은 내용으로 반영하고, `main`에 커밋해 푸시한다. `review/`는 비공개 레포에만 보관한다. GitHub Pages는 공개 레포 `main` 브랜치의 루트에서 배포한다.

## 미리 보기

이 README가 있는 폴더에서 `python -m http.server 8765` 실행 후 http://localhost:8765 에 접속한다. `index.html`을 직접 열어도 페이지는 동작하지만, 자동 복사는 HTTPS 또는 localhost에서 사용하는 것을 권장한다. 복사가 막히면 직접 복사할 텍스트를 표시한다.

## 내용 변경

- `data.js`: 모든 PNG 경로, 이웃 소개, 제작 보드. `neighbors[].asset`이 null이면 준비 중 표시.
- `palette.css`: 루트 palette.json에서 가져온 색. 새 색을 추가하지 않았다.
- `assets/`: 기존 PNG의 원본 바이트를 복사했다. 원본 경로와 검증 기록은 비공개 레포의 `site/review/verification.json`에 보관한다.
- 뚝셀은 정식 B 기준본. drafts/base_B_eyes_points 등 미승인 후속 시안은 사용하지 않았다. 달콩은 기존 초안으로 표시했다. 뜨또 설정과 PNG는 레포에 없어 제작하지 않았다.
- 캐릭터는 논리 64px 기준 2배 또는 3배로 표시한다. 달콩 원본은 8배 출력 PNG이므로 128px 표시 시 논리 픽셀은 정확히 2px이다. 배경은 논리 270×480의 1배 또는 2배로 표시하고 창 영역에서 자른다. 유동 너비 확대나 보간은 사용하지 않는다.

## 신청 흐름

입력 → Formspree로 전송 → 접수 완료 및 폼 초기화. 전송 실패 시 입력 내용을 보존한 신청서와 복사·인스타 DM 버튼을 표시한다. `data.js`의 `formEndpoint`에서 제출 주소를 관리한다. nickname, instagram, tool, problem, _subject, _gotcha를 FormData로 전송한다. 실제 전달 여부는 Formspree 대시보드에서 확인한다.

## 확인 결과

ego-browser에서 390px 및 1440px 화면, 이미지 로딩, 가로 넘침 없음, 신청서 생성·내용 유지 수정·복사 성공 문구·새로고침 초기화·DM 링크를 확인했다. 실제 DM 전송은 하지 않았다. PNG 4개가 레포 원본과 바이트 단위로 같고 팔레트 외 색이 없다. 글꼴 가장자리의 브라우저 안티앨리어싱은 PNG 팔레트 검증 대상이 아니다.

- review/mobile-390.png: 모바일 전체 화면
- review/desktop-1440.png: 데스크톱 전체 화면
- review/request-card.png: 신청서 결과
- review/verification.json: 검증 기록

실제 휴대폰·인스타 내장 브라우저 검증은 아직 하지 않았다. 공개 호스팅 시 review/ 폴더는 제외해도 된다.
