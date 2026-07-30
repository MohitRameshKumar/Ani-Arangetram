/**
 * gallery.js — a small, keyboard-accessible lightbox for gallery.html.
 * Reads image data from CONTENT.gallery (via the buttons render.js builds).
 */

function initLightbox() {
  const grid = document.getElementById("gallery-grid");
  const lightbox = document.getElementById("lightbox");
  if (!grid || !lightbox) return;

  const img = document.getElementById("lightbox-image");
  const caption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  let index = 0;
  let lastFocused = null;

  function show(i) {
    const items = CONTENT.gallery;
    index = (i + items.length) % items.length;
    img.src = items[index].image;
    img.alt = items[index].alt;
    caption.textContent = `Photo ${index + 1} of ${items.length}`;
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

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-gallery-index]");
    if (!btn) return;
    open(Number(btn.dataset.galleryIndex));
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
  setTimeout(initLightbox, 0);
});
