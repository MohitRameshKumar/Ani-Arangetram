/**
 * wishes.js — a small, keyboard-accessible full-screen reader for wishes,
 * opened from a blessing card's "Read full wish" button. Mirrors gallery.js.
 *
 * Blessing cards are plain static HTML (see the <!-- WISHES:START --> block
 * in blessings.html and the preview cards in index.html) — there is no
 * data array behind them. Long wishes are shown in full in the markup so
 * the page works with JavaScript disabled; this script visually truncates
 * them on load and stashes the full text on the card for the lightbox.
 */

const WISH_SNIPPET_LENGTH = 120;

function truncateWishCards() {
  document.querySelectorAll(".blessing-card").forEach((card) => {
    if (card.querySelector(".blessing-card__open")) return;
    const p = card.querySelector("p");
    if (!p) return;
    const full = p.textContent.replace(/^[“"]/, "").replace(/[”"]$/, "");
    if (full.length <= WISH_SNIPPET_LENGTH) return;
    card.dataset.message = full;
    const cut = full.slice(0, WISH_SNIPPET_LENGTH);
    const snippet = cut.slice(0, cut.lastIndexOf(" ")) + "…";
    p.textContent = `“${snippet}”`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "blessing-card__open";
    btn.textContent = "Read full wish";
    card.appendChild(btn);
  });
}

function initWishLightbox() {
  const lightbox = document.getElementById("wish-lightbox");
  if (!lightbox) return;

  const textEl = document.getElementById("wish-lightbox-text");
  const citeEl = document.getElementById("wish-lightbox-cite");
  const closeBtn = document.getElementById("wish-lightbox-close");
  const prevBtn = document.getElementById("wish-lightbox-prev");
  const nextBtn = document.getElementById("wish-lightbox-next");

  const cards = Array.from(document.querySelectorAll(".blessing-card"));
  let index = 0;
  let lastFocused = null;

  function show(i) {
    if (!cards.length) return;
    index = (i + cards.length) % cards.length;
    const card = cards[index];
    const p = card.querySelector("p");
    const cite = card.querySelector("cite");
    const message = card.dataset.message || (p ? p.textContent.replace(/^[“"]/, "").replace(/[”"]$/, "") : "");
    textEl.textContent = `“${message}”`;
    citeEl.textContent = cite ? cite.textContent : "";
  }

  function open(i) {
    lastFocused = document.activeElement;
    show(i);
    lightbox.classList.add("is-open");
    closeBtn.focus();
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".blessing-card__open");
    if (!btn) return;
    const card = btn.closest(".blessing-card");
    const i = cards.indexOf(card);
    if (i === -1) return;
    open(i);
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => show(index - 1));
  nextBtn.addEventListener("click", () => show(index + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(index + 1);
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "Tab") {
      const focusable = [closeBtn, prevBtn, nextBtn];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  truncateWishCards();
  setTimeout(initWishLightbox, 0);
});
