/* ==========================================================
   hotChicken_sp - main.js
   カスタムカーソル / 背景の火の粉パーティクル / モバイルナビ / アイコン画像 /
   タイプライター / 趣味タブ / ステータスゲージ / ページ遷移フラッシュ
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initCustomCursor();
  initEmbers();
  initMobileNav();
  initAvatars();
  initTypewriter();
  initHobbyTabs();
  initStatBars();
  initPageFlash();
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

  const hoverTargets = "a, button, .nav-card, .link-card";
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

/* ---------- 吹き出しのタイプライター表示 ---------- */
function initTypewriter(speed = 45) {
  const el = document.querySelector("[data-typewriter]");
  if (!el) return;

  const text = el.innerHTML.trim().replace(/\s*<br\s*\/?>\s*/gi, "\n");

  el.innerHTML = '<span class="typewriter-text"></span><span class="typewriter-caret">▌</span>';
  const target = el.querySelector(".typewriter-text");
  const caret = el.querySelector(".typewriter-caret");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    target.innerHTML = text.replace(/\n/g, "<br>");
    caret.textContent = "■";
    return;
  }

  let i = 0;
  function step() {
    if (i >= text.length) {
      caret.textContent = "■";
      return;
    }
    target.innerHTML += text[i] === "\n" ? "<br>" : text[i];
    i++;
    setTimeout(step, speed);
  }
  step();
}

/* ---------- 自己紹介ページ：趣味タブ ----------
   説明文は各タブに対応する [data-hobby-detail] 要素の中に直接HTMLで書けます。
   改行は <br>、段落を分けたいときは <p> を使ってください。
------------------------------------------------------------ */
function initHobbyTabs() {
  const tabs = document.querySelectorAll("[data-hobby-tab]");
  const details = document.querySelectorAll("[data-hobby-detail]");
  if (!tabs.length || !details.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      details.forEach((detail) => {
        detail.hidden = detail.dataset.hobbyDetail !== tab.dataset.target;
      });
    });
  });
}

/* ---------- 自己紹介ページ：ステータスゲージ ----------
   data-value（0〜100）の割合までバーが伸びるアニメーションをかけます。
------------------------------------------------------------ */
function initStatBars() {
  const bars = document.querySelectorAll("[data-stat-fill]");
  if (!bars.length) return;

  requestAnimationFrame(() => {
    bars.forEach((bar) => {
      const value = Math.max(0, Math.min(100, Number(bar.dataset.value) || 0));
      bar.style.width = `${value}%`;
    });
  });
}

/* ---------- ページ遷移フラッシュ ----------
   サイト内ナビ（ヘッダーnav・ロゴ・TOPのコマンド風カード）をクリックすると
   画面を一瞬フラッシュさせてから遷移し、遷移先では逆にフラッシュを引かせます。
------------------------------------------------------------ */
function spiralCellOrder(rows, cols) {
  const order = [];
  let top = 0;
  let bottom = rows - 1;
  let left = 0;
  let right = cols - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) order.push([top, c]);
    top++;
    for (let r = top; r <= bottom; r++) order.push([r, right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) order.push([bottom, c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) order.push([r, left]);
      left++;
    }
  }
  return order;
}

function initPageFlash() {
  const overlay = document.querySelector("[data-page-flash]");
  if (!overlay) return;

  const cols = 14;
  const rows = 8;
  const stepMs = 6;

  overlay.style.setProperty("--flash-cols", cols);
  overlay.style.setProperty("--flash-rows", rows);

  // cells[] は「外周→中心」のスパイラル順（時計回り）。
  const cells = spiralCellOrder(rows, cols).map(([r, c]) => {
    const cell = document.createElement("div");
    cell.className = "flash-cell";
    cell.style.gridRow = String(r + 1);
    cell.style.gridColumn = String(c + 1);
    overlay.appendChild(cell);
    return cell;
  });

  const timers = [];
  function clearTimers() {
    timers.forEach((t) => clearTimeout(t));
    timers.length = 0;
  }

  // covering=true: 外周セル(index 0)から中心へ、時計回りに1マスずつ塗る。
  // covering=false: 中心セルから外周へ、時計回りの逆順で1マスずつ剥がす。
  function sweep(covering, onDone) {
    clearTimers();
    const order = covering ? cells : [...cells].reverse();
    order.forEach((cell, i) => {
      timers.push(
        setTimeout(() => {
          cell.classList.toggle("is-on", covering);
        }, i * stepMs)
      );
    });
    if (onDone) {
      timers.push(setTimeout(onDone, order.length * stepMs));
    }
  }

  if (sessionStorage.getItem("pageFlash") === "1") {
    sessionStorage.removeItem("pageFlash");
    cells.forEach((cell) => cell.classList.add("is-on"));
    sweep(false);
  }

  document.querySelectorAll(".main-nav a, .nav-card, .logo").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      sessionStorage.setItem("pageFlash", "1");
      sweep(true, () => {
        window.location.href = href;
      });
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
