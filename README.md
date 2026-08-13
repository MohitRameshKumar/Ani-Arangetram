# Layāñjali — Ani's Mridangam Arangetram Website

A plain, static, multi-page website for Ani's mridangam arangetram: hand-written HTML, one CSS design system, and a small amount of vanilla JavaScript. No build step, no framework, no npm install. Everything a non-programmer needs to edit — dates, bios, photos, the song list, guestbook wishes — lives in one file: `js/content.js`.

## On the concept title

The site's name, **Layāñjali** ("An Offering of Rhythm"), comes from *laya* (rhythmic flow) + *añjali* (a cupped-hands offering). Two other candidates were considered:

- **Talavali — The Turn of the Cycle** (*talam* + *aavali*, a series/garland) — points at the repeating 8-beat cycle used as the site's visual motif, but "talavali" is a less commonly attested compound.
- **Naadalaya — Sound Finds Its Tempo** (*naadam* + *laya*) — a nice arc from raw sound to disciplined rhythm, but reads more abstract than an act of offering.

**Before this goes on any invitation, printed program, or banner: confirm the exact wording and connotation with Ani's guru.** The word choice matters more than the sound. Search the codebase for `{{CONFIRM_TITLE_WITH_GURU}}` to find every spot this is flagged.

## Running it locally

No installation needed. From this folder:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. That's it — every page is a plain `.html` file.

## How to edit the site

**Almost everything you'll ever need to change lives in `js/content.js`.** Open it in any text editor (even TextEdit or Notepad, though a code editor like VS Code will help you avoid mistakes). It's one big list of facts — the date, the venue, bios, the song list, guestbook wishes — each with a plain-English key like `event.dateDisplay` or `guru.name`. Change the text between the quotes and save the file; refresh the page in your browser to see the change. You do not need to touch any `.html` or `.css` file to update content.

A few conventions used throughout `content.js` and the `.html` files:

- **`[Text in square brackets]`** is a placeholder — a real fact that hasn't been decided yet (a date, a name, a bio). Replace the whole bracketed instruction with the real text, including removing the brackets.
- **`{{TEXT_LIKE_THIS}}`** marks something that lives directly in an `.html` file instead of `content.js` — search for that exact token across the `.html` files to find and fix it. There's one: `{{CONFIRM_TITLE_WITH_GURU}}` (in `index.html`, a comment near the top of `<main>`).
- Arrays like `programPieces`, `artists`, and `gallery` are lists — copy an existing entry (including its `{` and `}` braces and the comma after it) to add a new one, or delete an entry entirely to remove it. The page rebuilds itself from whatever is in the list; you never need to edit the `.html`. **Wishes are the one exception** — see "Blessings form & moderation" below.

### Example: changing the event date

Open `js/content.js`, find:

```js
event: {
    dateDisplay: "[Date to be finalized — e.g. \"Saturday, March 14, 2026\"]",
```

and change it to:

```js
event: {
    dateDisplay: "Saturday, March 14, 2026",
```

Save, refresh — the new date now appears in the hero, the event strip, the footer, and the About/Contact pages, since they all read from this one value.

### Example: adding a song to the program

In `js/content.js`, find `programPieces: [` and copy one of the existing `{ ... }` entries, paste it as a new item in the list, and fill in its fields. Set `isThani: true` on exactly one piece — the one that should carry the "Ani's Thani Avarthanam" tag on `program.html`.

## Image manifest

All images live in `/assets/images`. Every file currently in that folder is a placeholder — a generated graphic that states its own filename, required pixel dimensions, and (where relevant) that it needs a transparent background. Replace each file with a real photo **using the exact same filename**, and the site will pick it up automatically (no HTML/CSS changes needed).

| File | Used on | Size | Background |
|---|---|---|---|
| `ani-hero-cutout-1.png` | Home hero, slide 1 | 480 × 640 px | **Transparent** — background-removed cutout |
| `ani-hero-cutout-2.png` | Home hero, slide 2 | 480 × 640 px | **Transparent** |
| `ani-hero-cutout-3.png` | Home hero, slide 3 | 480 × 640 px | **Transparent** |
| `ani-hero-cutout-4.png` | Home hero, slide 4 | 480 × 640 px | **Transparent** |
| `welcome-parents.jpg` | Home, parents' welcome note | 600 × 450 px | Opaque, informal family photo |
| `mridangam-detail.jpg` | About page, instrument diagram | 700 × 700 px | Opaque, close-up on syahi/lacing |
| `artist-ani.jpg` | Artists page | 400 × 400 px (square) | Opaque portrait |
| `artist-vocal.jpg` | Artists page | 400 × 400 px (square) | Opaque portrait |
| `artist-violin.jpg` | Artists page | 400 × 400 px (square) | Opaque portrait |
| `artist-ghatam.jpg` | Artists page (delete this artist entry in `content.js` if not performing) | 400 × 400 px (square) | Opaque portrait |
| `guru.jpg` | Guru page | 500 × 600 px | Opaque portrait |
| `chief-guest-1.jpg` | Chief Guest page | 400 × 400 px (square) | Opaque portrait |
| `chief-guest-2.jpg` | Chief Guest page | 400 × 400 px (square) | Opaque portrait |
| `gallery-1.jpg` … `gallery-6.jpg` | Gallery page | 800 × 600 px | Opaque; add/remove entries in `content.js`'s `gallery` list to add/remove photos |

The **hero cutouts are the one real photo-editing task** in this list: they need a photo of Ani with the background removed (transparent PNG), so plan for that step (a phone photo editing app, Photoshop, or a free background-removal tool all work) before the real photos go in.

Every `<img>` tag in the HTML already has the correct `width`, `height`, and `loading="lazy"` attributes matched to these sizes, so dropping in a real photo at roughly the same dimensions won't cause the page to reflow or jump.

## Blessings form & moderation

Guests submit wishes from a "+ Leave a wish" button on `blessings.html`. Nothing they submit appears on the site automatically — it's emailed to the family for Approve/Deny moderation first, and only an approved wish gets committed to the live page.

This is powered by a small Google Apps Script backend (not part of this repo's deployed site — see `apps-script/Code.gs`), plus a Google Sheet used as the pending-submissions queue. **Setting this up is a one-time, non-programmer-friendly process — see [`SETUP.md`](SETUP.md) for the full walkthrough**, including creating the Sheet, deploying the script, generating a scoped GitHub token, and wiring the resulting URL into `js/wish-submit.js`.

Wishes are **not** stored in `content.js` — they're static HTML inside `blessings.html`, between `<!-- WISHES:START -->` and `<!-- WISHES:END -->`. Approving a wish (via the email's Approve button) writes it there directly by committing to GitHub, which GitHub Pages then rebuilds automatically. See `SETUP.md` for how to fix a typo in an already-approved wish, remove one, or shut the whole submission workflow down after the event.

## Deploying

This is a zero-configuration static site — no build command, no environment variables. Any static host works:

- **Netlify**: drag the project folder onto the Netlify dashboard, or connect the git repo with build command left blank and publish directory set to `/` (the project root).
- **GitHub Pages**: push this folder to a repository and enable Pages on the `main` branch, root folder.
- **Cloudflare Pages**: connect the repo with no build command and `/` as the output directory.

In all three cases, `index.html` at the project root is picked up automatically as the homepage.

## File structure

```
index.html, about.html, program.html, artists.html,
guru.html, gallery.html, chief-guest.html,
blessings.html, contact.html      — the pages
css/style.css                     — the whole design system (palette, type, layout)
css/print.css                     — print styles, tuned for program.html
js/content.js                     — EDIT THIS for all text/data changes
js/render.js                      — builds header/footer/nav and content-driven
                                     sections (program list, artist cards, gallery)
                                     from content.js — no edits needed
js/main.js                        — mobile nav drawer + hero carousel behavior
js/gallery.js                     — the photo lightbox
js/wishes.js                      — the wish-reader lightbox + card truncation
js/wish-submit.js                 — the "+ Leave a wish" submission form
apps-script/Code.gs               — wish moderation backend (see SETUP.md)
SETUP.md                          — one-time setup for wish moderation
assets/images/                    — all photos (see manifest above)
```
