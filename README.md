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
- **`{{TEXT_LIKE_THIS}}`** marks something that lives directly in an `.html` file instead of `content.js` — search for that exact token across the `.html` files to find and fix it. There are two: `{{CONFIRM_TITLE_WITH_GURU}}` (in `index.html`, a comment near the top of `<main>`) and `{{FORMSPREE_ENDPOINT}}` (in `blessings.html` — see "Blessings form" below).
- Arrays like `programPieces`, `artists`, `blessings`, and `gallery` are lists — copy an existing entry (including its `{` and `}` braces and the comma after it) to add a new one, or delete an entry entirely to remove it. The page rebuilds itself from whatever is in the list; you never need to edit the `.html`.

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

`blessings.html` has a real HTML `<form>` that currently points at a placeholder: `action="{{FORMSPREE_ENDPOINT}}"`. To make it actually deliver submissions:

1. Create a free account at [Formspree](https://formspree.io) (or a similar static-form service, e.g. [Basin](https://usebasin.com) or Netlify Forms if you deploy to Netlify).
2. Create a new form and copy the endpoint URL it gives you (something like `https://formspree.io/f/abcd1234`).
3. In `blessings.html`, replace `{{FORMSPREE_ENDPOINT}}` (it appears twice — once in the `action` attribute, once in the note under the button) with that URL.

**This site has no live database**, so there's no automatic way for a submitted wish to appear on the page — that's a deliberate moderation step, not a bug. When someone submits the form:

1. You'll get an email/dashboard notification from Formspree with their name, relation, and message.
2. Read it, and decide whether it's ready to show publicly.
3. Open `js/content.js`, find the `blessings` list, and add a new entry in the same shape as the existing ones (`name`, `relation`, `message`).
4. Save and redeploy (see below) — the new wish now appears on the home page preview and the full Blessings page.

The `blessings` list in `content.js` currently ships with a handful of realistic seeded wishes so the guestbook page never looks empty before the first real submissions come in — replace or supplement them as real wishes arrive.

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
                                     sections (program list, artist cards, gallery,
                                     blessings) from content.js — no edits needed
js/main.js                        — mobile nav drawer + hero carousel behavior
js/gallery.js                     — the photo lightbox
assets/images/                    — all photos (see manifest above)
```
