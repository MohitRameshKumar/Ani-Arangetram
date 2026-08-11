/**
 * main.js — interactive behavior shared across pages: the mobile nav
 * dropdown and the home page hero carousel (with its tala-ring indicator).
 * Content itself is rendered by render.js; this file only wires up
 * interaction once that content exists.
 */

function initNavDrawer() {
  const drawer = document.getElementById("nav-drawer");
  const openBtn = document.getElementById("menu-open");
  if (!drawer || !openBtn) return;

  function isOpen() {
    return drawer.classList.contains("is-open");
  }
  function open() {
    drawer.classList.add("is-open");
    openBtn.setAttribute("aria-expanded", "true");
    const firstLink = drawer.querySelector("a");
    if (firstLink) firstLink.focus();
  }
  function close({ refocusToggle = false } = {}) {
    drawer.classList.remove("is-open");
    openBtn.setAttribute("aria-expanded", "false");
    if (refocusToggle) openBtn.focus();
  }
  openBtn.addEventListener("click", () => (isOpen() ? close() : open()));
  drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => close()));
  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;
    if (e.key === "Escape") close({ refocusToggle: true });
  });
  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    if (drawer.contains(e.target) || openBtn.contains(e.target)) return;
    close();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 960) close();
  });
}

function initHeroCarousel() {
  const wrap = document.getElementById("hero-slides");
  if (!wrap) return;
  const slides = Array.from(wrap.querySelectorAll(".hero__slide"));
  if (slides.length < 2) return;

  const ring = document.getElementById("hero-tala-ring");
  const pauseBtn = document.getElementById("hero-pause");
  const liveRegion = document.getElementById("hero-live-region");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let index = 0;
  let beat = 0; // which of the 8 talam ticks is lit — advances independently of
                // slide count, one position per transition, so the ring reads
                // as a continuous 8-beat cycle rather than resetting per slide.
  let playing = !prefersReducedMotion;
  let timer = null;

  function paint() {
    slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
    if (ring) {
      ring.querySelectorAll(".tala-ring__tick").forEach((tick, i) => {
        tick.classList.toggle("is-active", i === beat);
      });
    }
    if (liveRegion) {
      liveRegion.textContent = `Slide ${index + 1} of ${slides.length}: ${slides[index].querySelector(".hero__headline").textContent}`;
    }
  }

  function goTo(newIndex, direction) {
    index = (newIndex + slides.length) % slides.length;
    beat = (beat + (direction || 1) + 8) % 8;
    paint();
  }

  function next() { goTo(index + 1, 1); }

  function startTimer() {
    stopTimer();
    if (playing) timer = setInterval(next, 7000);
  }
  function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  if (pauseBtn) {
    pauseBtn.textContent = playing ? "⏸" : "▶";
    pauseBtn.setAttribute("aria-pressed", String(!playing));
    pauseBtn.addEventListener("click", () => {
      playing = !playing;
      pauseBtn.textContent = playing ? "⏸" : "▶";
      pauseBtn.setAttribute("aria-label", playing ? "Pause slideshow" : "Play slideshow");
      pauseBtn.setAttribute("aria-pressed", String(!playing));
      if (playing) startTimer();
      else stopTimer();
    });
  }

  wrap.setAttribute("tabindex", "0");
  wrap.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { next(); stopTimer(); startTimer(); }
    if (e.key === "ArrowLeft") { goTo(index - 1, -1); stopTimer(); startTimer(); }
  });
  wrap.addEventListener("mouseenter", stopTimer);
  wrap.addEventListener("mouseleave", startTimer);

  paint();
  startTimer();
}

document.addEventListener("DOMContentLoaded", () => {
  initNavDrawer();
  initHeroCarousel();
});
