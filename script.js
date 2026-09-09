// ==========================================================
// 우리반 친구들 — 그리드 렌더링 + 전체화면(무대) 모달
//
// ⚠ 사진 파일 이름은 한글이 아니라 영문 id를 사용합니다.
//   (압축 파일을 풀 때 한글 파일명이 깨지는 경우가 있어서
//    영문 id로 사진을 연결하도록 만들었어요)
//
// 아이를 추가/삭제하려면 아래 KIDS 배열만 수정하면 됩니다.
//   id    : 영문 파일 이름 (사진 파일명과 정확히 같아야 함)
//   label : 화면에 보일 이름표 글자
//
// profile: 그리드에 기본으로 보일 얼굴 사진   -> images/profile/아이디.jpg
// face   : 직접 얼굴만 잘라서 만든 확대샷     -> images/face/아이디.jpg
// full   : 클릭했을 때 보일 전신 사진(gif)    -> images/full/아이디.gif
//
// ※ 아이 사진을 한 번 클릭해서 전체화면으로 열어보면, 그 순간부터
//   그리드 프로필 사진이 자동으로 images/face의 확대샷으로 바뀝니다.
//   단, 이건 지금 열어본 페이지에서만 유지돼요 — 새로고침하면 전부
//   원래 얼굴 jpg로 초기화돼요. images/face에 파일이 아직 없으면
//   클릭해도 조용히 원래 얼굴 jpg 그대로예요.
// ==========================================================

const KIDS = [
  { id: "na-geun", label: "나근" },
  { id: "do-geun", label: "도근" },
  { id: "do-yun", label: "도윤" },
  { id: "dong-woo", label: "동우" },
  { id: "ra-yun", label: "라윤" },
  { id: "min-jun", label: "민준" },
  { id: "seo-yun", label: "서윤" },
  { id: "song-ha", label: "송하" },
  { id: "a-jung", label: "아중" },
  { id: "yeon-woo", label: "연우" },
  { id: "yu-dam", label: "유담" },
  { id: "yu-jun", label: "유준" },
  { id: "ju-hyeong", label: "주형" },
  { id: "ji-min", label: "지민" },
  { id: "ji-yu", label: "지유" },
  { id: "chae-eun", label: "채은" },
  { id: "tae-yul", label: "태율" },
  { id: "ha-yun", label: "하윤" },
].map((kid) => ({
  ...kid,
  profile: `images/profile/${kid.id}.jpg`,
  face: `images/face/${kid.id}.jpg`,
  full: `images/full/${kid.id}.gif`,
}));

const ACCENTS = ["coral", "sky", "sun", "leaf", "berry"];

const grid = document.getElementById("grid");
const stage = document.getElementById("stage");
const stageImg = document.getElementById("stageImg");
const stageName = document.getElementById("stageName");
const stageFallback = document.getElementById("stageFallback");
const stageClose = document.getElementById("stageClose");

// images/face에 그 아이 확대샷이 실제로 있으면 그리드 사진을 그걸로 교체.
// 파일이 없으면 아무 일도 안 일어나고 원래 얼굴 jpg 그대로 남음.
function swapToFace(kid, card) {
  const img = card.querySelector(".card__photo");
  if (img.dataset.faceApplied === "1") return;
  const preload = new Image();
  preload.onload = () => {
    img.style.opacity = "0";
    window.setTimeout(() => {
      img.src = kid.face;
      img.style.opacity = "1";
      img.dataset.faceApplied = "1";
    }, 150);
  };
  preload.src = kid.face;
}

function buildGrid() {
  KIDS.forEach((kid, i) => {
    const accent = ACCENTS[i % ACCENTS.length];

    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.setAttribute("aria-label", `${kid.label} 전체 사진 보기`);

    card.innerHTML = `
      <span class="card__photo-wrap">
        <span class="card__blob" style="background:var(--${accent})"></span>
        <span class="card__pin"></span>
        <span class="card__frame">
          <img class="card__photo" src="${kid.profile}" alt="${kid.label}" loading="lazy">
        </span>
      </span>
      <span class="card__name">${kid.label}</span>
    `;

    card.addEventListener("click", () => {
      openStage(kid);
      swapToFace(kid, card);
    });
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
