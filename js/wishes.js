/**
 * wishes.js — a small, keyboard-accessible full-screen reader for wishes,
 * opened from a blessing card's "Read full wish" button. Mirrors gallery.js.
 */

function initWishLightbox() {
  const lightbox = document.getElementById("wish-lightbox");
  if (!lightbox) return;

  const textEl = document.getElementById("wish-lightbox-text");
  const citeEl = document.getElementById("wish-lightbox-cite");
  const closeBtn = document.getElementById("wish-lightbox-close");
  const prevBtn = document.getElementById("wish-lightbox-prev");
  const nextBtn = document.getElementById("wish-lightbox-next");

  let index = 0;
  let lastFocused = null;

  function show(i) {
    const items = CONTENT.blessings;
    index = (i + items.length) % items.length;
    textEl.textContent = `“${items[index].message}”`;
    citeEl.textContent = items[index].name;
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
    const btn = e.target.closest("button[data-blessing-index]");
    if (!btn) return;
    open(Number(btn.dataset.blessingIndex));
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
  setTimeout(initWishLightbox, 0);
});
