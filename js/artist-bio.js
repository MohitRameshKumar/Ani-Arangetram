/**
 * artist-bio.js — a small, keyboard-accessible full-screen reader for an
 * artist's bio, opened from a person card's "Read more" button. Mirrors
 * wishes.js / gallery.js. Reads straight from CONTENT.artists (unlike
 * wishes, artist bios are still data-driven, not static HTML).
 */

function initPersonLightbox() {
  const lightbox = document.getElementById("person-lightbox");
  if (!lightbox) return;

  const nameEl = document.getElementById("person-lightbox-name");
  const instrumentEl = document.getElementById("person-lightbox-instrument");
  const bioEl = document.getElementById("person-lightbox-bio");
  const closeBtn = document.getElementById("person-lightbox-close");
  const prevBtn = document.getElementById("person-lightbox-prev");
  const nextBtn = document.getElementById("person-lightbox-next");

  let index = 0;
  let lastFocused = null;

  function show(i) {
    const items = CONTENT.artists;
    index = (i + items.length) % items.length;
    const a = items[index];
    nameEl.textContent = a.name;
    instrumentEl.textContent = `${a.instrument} — ${a.role}`;
    bioEl.innerHTML = a.bio
      .split(/\n+/)
      .map((para) => `<p>${para}</p>`)
      .join("");
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
    const btn = e.target.closest("button[data-artist-index]");
    if (!btn) return;
    open(Number(btn.dataset.artistIndex));
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
  setTimeout(initPersonLightbox, 0);
});
