/* ==========================================================
   hotChicken_sp - main.js
   カスタムカーソル / 背景の火の粉パーティクル / モバイルナビ / ギャラリー・ライトボックス
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initCustomCursor();
  initEmbers();
  initMobileNav();
  initGallery();
  initAvatars();
});

/* ---------- カスタムカーソル ---------- */
function initCustomCursor() {
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  if (!isFinePointer) return;

  document.body.classList.add("custom-cursor-on");

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  document.body.append(dot, ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // リングは少し遅れて追従させ、動きに"粘り"を出す
  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = "a, button, .nav-card, .gallery-item, .link-card, .skill-tag";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.add("is-hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.remove("is-hover");
  });
}

/* ---------- 背景の火の粉パーティクル ---------- */
function initEmbers(count = 26) {
  const wrap = document.createElement("div");
  wrap.className = "embers";
  document.body.prepend(wrap);

  for (let i = 0; i < count; i++) {
    const ember = document.createElement("span");
    ember.className = "ember";
    const left = Math.random() * 100;
    const duration = 6 + Math.random() * 8;
    const delay = Math.random() * 10;
    const drift = (Math.random() - 0.5) * 120;
    ember.style.left = `${left}vw`;
    ember.style.animationDuration = `${duration}s`;
    ember.style.animationDelay = `${delay}s`;
    ember.style.setProperty("--drift", `${drift}px`);
    wrap.appendChild(ember);
  }
}

/* ---------- アイコン画像（TOP / 自己紹介） ----------
   assets/icon.png を置き換えるだけで表示画像を変更できます。
   ファイルが存在しない間はSVGのプレースホルダーが表示されます。
------------------------------------------------------------ */
function initAvatars() {
  document.querySelectorAll("[data-avatar]").forEach((avatar) => {
    const img = avatar.querySelector("[data-avatar-img]");
    if (!img) return;

    img.addEventListener("error", () => {
      avatar.classList.add("is-fallback");
    });
  });
}

/* ---------- モバイルナビ開閉 ---------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("is-open"));
  });
}

/* ---------- イラスト集 & ライトボックス ----------
   ここに自分の作品を追加してください。
   src を assets/illustrations/ 内の画像パスに変えると実際の画像が表示されます。
   src が空のままだと、代わりにナンバー入りのプレースホルダーが表示されます。
------------------------------------------------------------ */
const illustrations = [
  { title: "作品タイトル 1", src: "" },
  { title: "作品タイトル 2", src: "" },
  { title: "作品タイトル 3", src: "" },
  { title: "作品タイトル 4", src: "" },
  { title: "作品タイトル 5", src: "" },
  { title: "作品タイトル 6", src: "" },
];

function initGallery() {
  const grid = document.querySelector("[data-gallery-grid]");
  if (!grid) return;

  illustrations.forEach((item, index) => {
    const cell = document.createElement("div");
    cell.className = "gallery-item";
    cell.tabIndex = 0;

    if (item.src) {
      cell.innerHTML = `<img src="${item.src}" alt="${item.title}">`;
    } else {
      cell.innerHTML = `<span class="placeholder-label">No.${index + 1}</span>`;
    }
    cell.innerHTML += `<span class="caption">${item.title}</span>`;

    const open = () => openLightbox(item);
    cell.addEventListener("click", open);
    cell.addEventListener("keypress", (e) => {
      if (e.key === "Enter") open();
    });

    grid.appendChild(cell);
  });

  const lightbox = document.querySelector("[data-lightbox]");
  const closeBtn = document.querySelector("[data-lightbox-close]");
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

function openLightbox(item) {
  const lightbox = document.querySelector("[data-lightbox]");
  const box = document.querySelector("[data-lightbox-box]");
  const caption = document.querySelector("[data-lightbox-caption]");
  if (!lightbox || !box) return;

  box.innerHTML = item.src
    ? `<img src="${item.src}" alt="${item.title}">`
    : item.title;
  if (caption) caption.textContent = item.title;

  lightbox.classList.add("is-open");
}

function closeLightbox() {
  const lightbox = document.querySelector("[data-lightbox]");
  if (lightbox) lightbox.classList.remove("is-open");
}
