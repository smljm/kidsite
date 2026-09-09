// ==========================================================
// 우리반 친구들 — 그리드 렌더링 + 전체화면(무대) 모달
//
// ⚠ 사진 파일 이름은 한글이 아니라 영문 id를 사용합니다.
//   (압축 파일을 풀 때 한글 파일명이 깨지는 경우가 있어서
//    영문 id로 사진을 연결하도록 만들었어요)
//
// 아이를 추가/삭제하려면 아래 KIDS 배열만 수정하면 됩니다.
//   id        : 영문 파일 이름 (사진 파일명과 정확히 같아야 함)
//   label     : 화면에 보일 이름표 글자
//   confirmed : 전신 gif를 확인했으면 true로 바꿔주세요.
//               true인 아이는 그리드 프로필 사진이 얼굴 확대된 gif로 바뀝니다.
//   facePos   : (선택) confirmed일 때 얼굴이 위치한 부분을 다시 맞추고 싶으면
//               "가로% 세로%" 형태로 넣어주세요. 기본값은 "50% 15%" (거의 맨 위).
//
// profile: 그리드에 보일 얼굴 사진 -> images/profile/아이디.jpg
// full   : 클릭했을 때 보일 전신 사진 -> images/full/아이디.gif
// ==========================================================

const KIDS = [
  { id: "na-geun", label: "나근", confirmed: true },
  { id: "do-geun", label: "도근", confirmed: false },
  { id: "do-yun", label: "도윤", confirmed: true },
  { id: "dong-woo", label: "동우", confirmed: false },
  { id: "ra-yun", label: "라윤", confirmed: false },
  { id: "min-jun", label: "민준", confirmed: false },
  { id: "seo-yun", label: "서윤", confirmed: false },
  { id: "song-ha", label: "송하", confirmed: false },
  { id: "a-jung", label: "아중", confirmed: false },
  { id: "yeon-woo", label: "연우", confirmed: false },
  { id: "yu-dam", label: "유담", confirmed: false },
  { id: "yu-jun", label: "유준", confirmed: false },
  { id: "ju-hyeong", label: "주형", confirmed: false },
  { id: "ji-min", label: "지민", confirmed: false },
  { id: "ji-yu", label: "지유", confirmed: false },
  { id: "chae-eun", label: "채은", confirmed: false },
  { id: "tae-yul", label: "태율", confirmed: false },
  { id: "ha-yun", label: "하윤", confirmed: false },
].map((kid) => ({
  ...kid,
  profile: `images/profile/${kid.id}.jpg`,
  full: `images/full/${kid.id}.gif`,
}));

const ACCENTS = ["coral", "sky", "sun", "leaf", "berry"];

const grid = document.getElementById("grid");
const stage = document.getElementById("stage");
const stageImg = document.getElementById("stageImg");
const stageName = document.getElementById("stageName");
const stageFallback = document.getElementById("stageFallback");
const stageClose = document.getElementById("stageClose");

function buildGrid() {
  KIDS.forEach((kid, i) => {
    const accent = ACCENTS[i % ACCENTS.length];
    const thumbSrc = kid.confirmed ? kid.full : kid.profile;
    const zoomClass = kid.confirmed ? " card__photo--zoom" : "";
    const facePos = kid.facePos || "50% 15%";

    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.setAttribute("aria-label", `${kid.label} 전체 사진 보기`);

    card.innerHTML = `
      <span class="card__photo-wrap">
        <span class="card__blob" style="background:var(--${accent})"></span>
        <span class="card__pin"></span>
        <span class="card__frame">
          <img class="card__photo${zoomClass}" src="${thumbSrc}" alt="${kid.label}" style="object-position:${facePos}" loading="lazy">
        </span>
      </span>
      <span class="card__name">${kid.label}</span>
    `;

    card.addEventListener("click", () => openStage(kid));
    grid.appendChild(card);
  });
}

function openStage(kid) {
  stage.classList.remove("has-error");
  stage.classList.add("is-loading");
  stageImg.hidden = false;
  stageImg.src = ""; // 이전 사진과 같은 주소여도 항상 load/error 이벤트가 다시 발생하도록 초기화
  stageImg.src = kid.full;
  stageImg.alt = `${kid.label} 전신 사진`;
  stageName.textContent = kid.label;

  stage.classList.add("is-open");
  stage.setAttribute("aria-hidden", "false");
  stageClose.focus();
  document.body.style.overflow = "hidden";
}

function closeStage() {
  stage.classList.remove("is-open");
  stage.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// 전신 사진 다운로드가 끝나면 로딩 표시를 감추고 사진을 보여줌
stageImg.addEventListener("load", () => {
  stage.classList.remove("is-loading");
});

// 전신 gif가 아직 없을 때(images/full 폴더에 파일이 없을 때) 안내 문구 표시
stageImg.addEventListener("error", () => {
  if (!stageImg.src) return;
  stage.classList.remove("is-loading");
  stage.classList.add("has-error");
  stageImg.hidden = true;
});

stageClose.addEventListener("click", closeStage);

stage.addEventListener("click", (e) => {
  if (e.target === stage) closeStage();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && stage.classList.contains("is-open")) closeStage();
});

buildGrid();
