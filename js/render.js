/**
 * render.js — reads CONTENT (from content.js) and fills in the parts of each
 * page that are driven by data: the header/footer, the hero, the event strip,
 * the program list, artist cards, and the gallery grid. Blessings are static
 * HTML now (see js/wishes.js and SETUP.md), not rendered from here.
 * Each page's <body data-page="..."> attribute tells this file which nav item
 * to mark current and which section renderers to run.
 */

const NAV_ITEMS = [
  { href: "index.html", label: "Home", page: "home" },
  { href: "about.html", label: "About", page: "about" },
  { href: "guru.html", label: "Guru", page: "guru" },
  { href: "program.html", label: "Program", page: "program" },
  { href: "artists.html", label: "Artists", page: "artists" },
  { href: "gallery.html", label: "Gallery", page: "gallery" },
  { href: "blessings.html", label: "Wishes", page: "blessings" },
  { href: "contact.html", label: "Contact", page: "contact" },
];

function talaRingMarkup(activeIndex) {
  activeIndex = activeIndex || 0;
  let ticks = "";
  for (let i = 0; i < 8; i++) {
    const classes = ["tala-ring__tick"];
    if (i === 0) classes.push("is-sam");
    if (i === activeIndex) classes.push("is-active");
    ticks += `<span class="${classes.join(" ")}"></span>`;
  }
  return `
    <span class="tala-ring" data-count="8" aria-hidden="true">
      <span class="tala-ring__hub"></span>
      ${ticks}
    </span>`;
}

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const page = document.body.getAttribute("data-page");
  const navLinks = NAV_ITEMS.map(
    (item) =>
      `<li><a href="${item.href}"${item.page === page ? ' aria-current="page"' : ""}>${item.label}</a></li>`
  ).join("");
  const livestreamNav = CONTENT.event.livestreamUrl
    ? `<li><a class="is-livestream" href="${CONTENT.event.livestreamUrl}">▶ Livestream</a></li>`
    : "";
  mount.innerHTML = `
    <div class="container header-grid">
      <a class="wordmark" href="index.html">
        <span class="wordmark__mark"></span>
        <span class="wordmark__text">${CONTENT.theme.titleDisplay}</span>
      </a>
      <nav class="nav-drawer" id="nav-drawer" aria-label="Primary">
        <ul class="nav-drawer__list">
          ${navLinks}
          ${livestreamNav}
        </ul>
      </nav>
      <div class="header-actions">
        ${CONTENT.event.livestreamUrl ? `<a class="livestream-pill" href="${CONTENT.event.livestreamUrl}">
          <span class="livestream-pill__dot" aria-hidden="true"></span>
          <span class="livestream-pill__label">Livestream</span>
        </a>` : ""}
        <button class="menu-toggle" id="menu-open" aria-expanded="false" aria-controls="nav-drawer">
          <span class="visually-hidden">Open menu</span>
          <span class="menu-toggle__bars" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  `;
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  mount.innerHTML = `
    <div class="container">
      <a class="wordmark" href="index.html">
        <span class="wordmark__mark"></span>
        <span class="wordmark__text">${CONTENT.theme.titleDisplay}</span>
      </a>
      <p class="footer-signoff">${CONTENT.footerSignOff}</p>
      <div class="footer-grid">
        <div>
          <h4>The Evening</h4>
          <p>${CONTENT.event.dateDisplay}<br>${CONTENT.event.venue.name}</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="guru.html">Guru</a></li>
            <li><a href="program.html">Program</a></li>
            <li><a href="artists.html">Artists</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="blessings.html">Wishes</a></li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li><a href="contact.html">Contact & directions</a></li>
            ${CONTENT.event.livestreamUrl ? `<li><a href="${CONTENT.event.livestreamUrl}">Watch the livestream</a></li>` : ""}
          </ul>
        </div>
      </div>
      <p class="footer-bottom">${CONTENT.theme.titleDisplay} — ${CONTENT.theme.subtitle}. A family website for ${CONTENT.performer.name}'s mridangam arangetram.</p>
    </div>
  `;
}

function renderEventStrip(mountId) {
  const mount = document.getElementById(mountId || "event-strip");
  if (!mount) return;
  mount.innerHTML = `
    <div class="container">
      <div class="event-strip__row">
        <span class="event-strip__label">Date</span>
        <span class="event-strip__value">${CONTENT.event.dateDisplay}</span>
      </div>
      <div class="event-strip__row">
        <span class="event-strip__label">Seating</span>
        <span class="event-strip__value">${CONTENT.event.seatingTime}</span>
      </div>
      <div class="event-strip__row">
        <span class="event-strip__label">Venue</span>
        <span class="event-strip__value">${CONTENT.event.venue.name}, ${CONTENT.event.venue.addressLine2}</span>
      </div>
      <div class="event-strip__actions">
        <a class="btn btn--on-dark" href="${CONTENT.event.venue.mapUrl}">Map ↗</a>
        ${CONTENT.event.livestreamUrl ? `<a class="btn btn--live" href="${CONTENT.event.livestreamUrl}">▶ Livestream</a>` : ""}
      </div>
    </div>
  `;
}

function renderHero() {
  const slidesMount = document.getElementById("hero-slides");
  if (!slidesMount) return;
  slidesMount.innerHTML = CONTENT.heroSlides
    .map(
      (slide, i) => `
      <div class="hero__slide${i === 0 ? " is-active" : ""}" data-slide-index="${i}">
        <div class="hero__text-col">
          <h1 class="hero__headline">${slide.headline}</h1>
        </div>
        <img class="hero__portrait${slide.wide ? " hero__portrait--wide" : ""}" src="${slide.image}" alt="${slide.alt}" width="${slide.width || (slide.wide ? 1672 : 480)}" height="${slide.height || (slide.wide ? 941 : 640)}" ${i === 0 ? "" : 'loading="lazy"'}>
        <p class="hero__subtitle">${slide.subtitle}</p>
      </div>`
    )
    .join("");

  const ringMount = document.getElementById("hero-tala-ring");
  if (ringMount) ringMount.innerHTML = talaRingMarkup(0);
}

function renderArangetramTeaser() {
  const mount = document.getElementById("arangetram-teaser");
  if (!mount) return;
  const t = CONTENT.arangetramTeaser;
  mount.innerHTML = `
    <p>${t.paragraph1}</p>
    <p>${t.paragraph2}</p>
    <a class="btn" href="about.html">${t.linkText} →</a>
  `;
}

function renderEveningBlocks() {
  const mount = document.getElementById("evening-blocks");
  if (!mount) return;
  const e = CONTENT.event;
  mount.innerHTML = `
    <div class="evening-block">
      <h3>Date &amp; Seating</h3>
      <p>${e.dateDisplay}<br>${e.seatingTime}</p>
    </div>
    <div class="evening-block">
      <h3>Venue</h3>
      <p>${e.venue.name}<br>${e.venue.addressLine1}<br>${e.venue.addressLine2}</p>
      <a href="${e.venue.mapUrl}">Get directions ↗</a>
    </div>
    ${e.chiefGuests.length ? `<div class="evening-block">
      <h3>Chief Guests</h3>
      <p>${e.chiefGuests.join("<br>")}</p>
    </div>` : ""}
  `;
}

function renderParentsWelcome() {
  const mount = document.getElementById("parents-welcome");
  if (!mount) return;
  const w = CONTENT.parentsWelcome;
  mount.innerHTML = `
    <img class="welcome__photo" src="${w.photo}" alt="${w.photoAlt}" width="600" height="450" loading="lazy">
    <div>
      ${w.paragraphs.map((p) => `<blockquote>${p}</blockquote>`).join("")}
      <p class="welcome__signoff">${w.signOff}</p>
    </div>
  `;
}

function renderProgramOrder() {
  const mount = document.getElementById("program-order");
  if (!mount) return;
  mount.innerHTML = CONTENT.programOrder
    .map(
      (step) => `
      <li>
        ${step.time ? `<span class="program-order__time">${step.time}</span>` : ""}
        <span class="program-order__item">${step.item}</span>
        ${step.note ? `<span class="program-order__note">${step.note}</span>` : ""}
      </li>`
    )
    .join("");
}

function renderProgramPieces() {
  const mount = document.getElementById("program-pieces");
  if (!mount) return;
  mount.innerHTML = CONTENT.programPieces
    .map(
      (piece) => `
      <li class="piece${piece.isThani ? " is-thani" : ""}">
        ${piece.isThani ? '<span class="piece__thani-tag">Ani\'s Thani Avarthanam</span>' : ""}
        <h3 class="piece__title">${piece.title}</h3>
        ${piece.ragam || piece.thalam || piece.composer ? `<dl class="piece__meta">
          ${piece.ragam ? `<div><dt>Ragam</dt> <dd>${piece.ragam}</dd></div>` : ""}
          ${piece.thalam ? `<div><dt>Thalam</dt> <dd>${piece.thalam}</dd></div>` : ""}
          ${piece.composer ? `<div><dt>Composer</dt> <dd>${piece.composer}</dd></div>` : ""}
        </dl>` : ""}
        <p class="piece__note">${piece.note}</p>
        ${piece.lyricLine ? `<p class="piece__lyric">${piece.lyricLine}</p>` : ""}
      </li>`
    )
    .join("");
}

function renderGratitude() {
  const mount = document.getElementById("gratitude");
  if (mount) mount.textContent = CONTENT.gratitude;
}

function renderAniStory() {
  const mount = document.getElementById("ani-story");
  if (!mount) return;
  mount.innerHTML = CONTENT.aniStory.paragraphs.map((p) => `<p>${p}</p>`).join("");
}

const PERSON_SNIPPET_LENGTH = 200;

function personSnippet(bio) {
  const flat = bio.replace(/\n+/g, " ");
  if (flat.length <= PERSON_SNIPPET_LENGTH) return null;
  const cut = flat.slice(0, PERSON_SNIPPET_LENGTH);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

function renderArtists() {
  const mount = document.getElementById("artist-cards");
  if (!mount) return;
  mount.innerHTML = CONTENT.artists
    .map((a, i) => {
      const snippet = personSnippet(a.bio);
      return `
      <li class="person-card" data-artist-index="${i}">
        <div class="person-card__photo-frame${a.photo ? "" : " person-card__photo-frame--blank"}">
          ${a.photo ? `<img class="person-card__photo" src="${a.photo}" alt="${a.photoAlt}" width="640" height="640" loading="lazy">` : ""}
        </div>
        <h3>${a.name}</h3>
        <p class="person-card__instrument">${a.instrument} — ${a.role}</p>
        <p>${snippet || a.bio}</p>
        ${snippet ? `<button type="button" class="person-card__open" data-artist-index="${i}">Read more</button>` : ""}
      </li>`;
    })
    .join("");
}

function renderGuru() {
  const mount = document.getElementById("guru-content");
  if (!mount) return;
  const g = CONTENT.guru;
  mount.innerHTML = `
    <div class="guru-hero">
      <div class="guru-hero__photo-stack">
        <img class="guru-hero__photo" src="${g.photo}" alt="${g.photoAlt}" width="1200" height="1550" loading="lazy">
        ${g.photo2 ? `<img class="guru-hero__photo" src="${g.photo2}" alt="${g.photo2Alt}" width="1600" height="1067" loading="lazy">` : ""}
      </div>
      <div>
        <h2>${g.name}</h2>
        <h3>Lineage</h3>
        <p>${g.lineageParagraph}</p>
        <h3>Teaching</h3>
        <p>${g.teachingParagraph}</p>
      </div>
    </div>
    ${(CONTENT.secondaryGurus || [])
      .map(
        (sg) => `
    <div class="guru-hero guru-hero--secondary">
      <img class="guru-hero__photo" src="${sg.photo}" alt="${sg.photoAlt}" width="1200" height="1662" loading="lazy">
      <div>
        <h2>${sg.name}</h2>
        ${sg.bioParagraphs.map((para) => `<p>${para}</p>`).join("")}
      </div>
    </div>`
      )
      .join("")}
    <div class="guru-quote">
      <h3>${g.wordsAboutStudentHeading}</h3>
      <p>${g.wordsAboutStudent}</p>
    </div>
  `;
}

function renderChiefGuests() {
  const mount = document.getElementById("chief-guest-cards");
  if (!mount) return;
  if (!CONTENT.chiefGuestProfiles.length) {
    mount.innerHTML = '<li class="card"><p>No chief guest profiles have been announced for this program.</p></li>';
    return;
  }
  mount.innerHTML = CONTENT.chiefGuestProfiles
    .map(
      (p) => `
      <li class="person-card">
        <img class="person-card__photo" src="${p.photo}" alt="${p.photoAlt}" width="200" height="200" loading="lazy">
        <p class="person-card__instrument">${p.role}</p>
        <h3>${p.name}</h3>
        <p>${p.bio}</p>
      </li>`
    )
    .join("");
}

function renderGallery() {
  const mount = document.getElementById("gallery-grid");
  if (!mount) return;
  mount.innerHTML = CONTENT.gallery
    .map(
      (g, i) => `
      <button type="button" data-gallery-index="${i}" aria-label="Open photo ${i + 1} of ${CONTENT.gallery.length}: ${g.alt}">
        <img src="${g.image}" alt="${g.alt}" width="400" height="300" loading="lazy">
      </button>`
    )
    .join("");
}

function renderContact() {
  const mount = document.getElementById("contact-content");
  if (!mount) return;
  const c = CONTENT.contact;
  mount.innerHTML = `
    <div class="evening-block">
      <h3>Directions</h3>
      <p>${CONTENT.event.venue.name}<br>${CONTENT.event.venue.addressLine1}<br>${CONTENT.event.venue.addressLine2}</p>
      <p>${c.directionsNote}</p>
      <a class="btn" href="${CONTENT.event.venue.mapUrl}">Open in Maps ↗</a>
    </div>
    <div class="evening-block">
      <h3>Parking</h3>
      <p>${c.parkingNote}</p>
    </div>
    <div class="evening-block">
      <h3>Accessibility</h3>
      <p>${c.accessibilityNote}</p>
    </div>
    ${c.email ? `<p>Questions before the day? Email <a href="mailto:${c.email}">${c.email}</a>.</p>` : ""}
  `;
}

function renderAll() {
  renderHeader();
  renderFooter();
  renderHero();
  renderEventStrip();
  renderArangetramTeaser();
  renderEveningBlocks();
  renderParentsWelcome();
  renderProgramOrder();
  renderProgramPieces();
  renderGratitude();
  renderAniStory();
  renderArtists();
  renderGuru();
  renderChiefGuests();
  renderGallery();
  renderContact();
}

document.addEventListener("DOMContentLoaded", renderAll);
