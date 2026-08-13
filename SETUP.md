# Setting up wish moderation

This turns on the "+ Leave a wish" form on the Wishes page. Guests submit a
wish, you get an email with **Approve** and **Deny** buttons, and approving
publishes the wish to the live site automatically within a minute or two.
Nothing appears on the site until you approve it.

You do not need to know how to code to do this — you're mostly pasting
values into boxes. It takes about 20–30 minutes the first time. Do this
once, well before the event, and test it with a real submission (steps at
the end) before trusting it.

## What you're building

- A **Google Sheet** that holds the queue of submitted wishes (pending / approved / denied). You can always open this sheet and look at it directly if something seems wrong.
- A **Google Apps Script** project (attached to that Sheet) that receives submissions, emails you, and — when you click Approve — writes the wish onto the live website by committing to GitHub.
- One line of configuration in the website itself, pointing the "Leave a wish" form at your Apps Script.

Nothing here costs money and nothing needs a credit card.

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet. Name it something like **Ani Arangetram — Wishes**.
2. Rename the first sheet tab (bottom-left) from "Sheet1" to **Wishes** (exact spelling, capital W).
3. In row 1, add these column headers, one per cell, A through G:

   ```
   token | status | name | relationship | message | submittedAt | actionAt
   ```

That's it for the Sheet — the script fills in rows automatically. You never type into this Sheet yourself, but you can look at it any time to see the queue, and you can edit a row's `status` cell by hand (to `denied`, for example) if you ever need to override the script.

## Step 2 — Create the Apps Script project

1. In the Sheet, go to **Extensions → Apps Script**. This opens a script editor already attached to your Sheet.
2. Delete whatever is in the default `Code.gs` file (usually a `function myFunction() {}` stub).
3. Open `apps-script/Code.gs` from this repository, copy its entire contents, and paste it into the Apps Script editor.
4. Click the disk/save icon (or Ctrl/Cmd+S).
5. Rename the project (top-left, "Untitled project") to something like **Ani Wishes Backend**.

## Step 3 — Set Script Properties

This is where the secrets live — never in the website's code.

1. In the Apps Script editor, click the gear icon **Project Settings** on the left.
2. Scroll to **Script Properties** and click **Add script property**. Add each of these (all values are plain text, no quotes):

   | Property | Value |
   |---|---|
   | `MODERATOR_EMAIL` | the Gmail address you're doing all this under (e.g. `mohit10rk@gmail.com`) |
   | `GITHUB_OWNER` | `MohitRameshKumar` |
   | `GITHUB_REPO` | `Arangetram-Website` |
   | `GITHUB_BRANCH` | `main` |
   | `GITHUB_FILE_PATH` | `blessings.html` |
   | `GITHUB_TOKEN` | *(see Step 4 — come back and fill this in)* |

## Step 4 — Create a fine-grained GitHub token

This token is what lets the script commit an approved wish to your repo. It must be scoped as narrowly as possible — if it ever leaked, the damage should be limited to "someone can edit this one repo," not your whole GitHub account.

1. Go to **github.com → your profile photo → Settings → Developer settings → Personal access tokens → Fine-grained tokens**.
2. Click **Generate new token**.
3. **Token name**: something recognizable, e.g. `arangetram-wishes-bot`.
4. **Expiration**: pick a date safely after the event (e.g. 90 days out). You can always generate a new one later.
5. **Repository access**: choose **Only select repositories**, and select **Arangetram-Website** only. Do not choose "All repositories."
6. **Permissions → Repository permissions**: find **Contents** and set it to **Read and write**. Leave every other permission at "No access." You don't need Issues, Pull requests, Actions, Metadata write, or anything else — Contents is the only one this script uses (Metadata read-only is auto-included and fine).
7. Click **Generate token**, then **copy the token immediately** — GitHub only shows it once.
8. Back in the Apps Script Script Properties (Step 3), paste it as the value for `GITHUB_TOKEN`.

## Step 5 — Deploy the web app

1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `v1`
   - **Execute as**: **Me** (your Gmail account) — this is what makes emails send from and to the same account, with no extra setup.
   - **Who has access**: **Anyone** — this must be "Anyone," not "Anyone with a Google account." If you pick the wrong one, submissions from guests (who aren't logged into a Google account tied to this project) will fail or hang.
4. Click **Deploy**.
5. The first time, Google will ask you to authorize the script (it needs permission to send email and access the Sheet). Click through **Authorize access → (your account) → Advanced → Go to (project name) → Allow**. This warning appears because it's a script you (not Google) wrote — that's expected.
6. Copy the **Web app URL** it gives you. It looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## Step 6 — Wire the URL into the site

1. Open `js/wish-submit.js` in this repository.
2. Find this line near the top:
   ```js
   const WISH_SUBMIT_URL = "";
   ```
3. Paste your web app URL between the quotes:
   ```js
   const WISH_SUBMIT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
4. Optional: if you want a failed-submission fallback to offer a "email it instead" link (instead of a "copy my wish" button), also fill in:
   ```js
   const WISH_FALLBACK_EMAIL = "mohit10rk@gmail.com";
   ```
   Leave it blank if you'd rather not put your email address in the page source, where spam bots can scrape it.
5. Save, commit, and push this one-line change to `main` like any other site edit. GitHub Pages will rebuild and the form will go live.

## ⚠️ The #1 thing people forget: redeploying after an edit

**Apps Script always serves the last thing you *deployed*, not the last thing you *saved*.** If you ever open the script again and change even one line — fixing a typo in the email template, adjusting the rate limit, anything — saving it is not enough. You must:

1. **Deploy → Manage deployments**.
2. Click the pencil (edit) icon on your existing deployment.
3. Under **Version**, choose **New version**.
4. Click **Deploy**.

The web app URL stays the same, so you don't need to update `wish-submit.js` again — but skipping this step means your edits silently do nothing, and the old behavior keeps running indefinitely.

## Step 7 — Test it end to end before the event

1. Go to `blessings.html` on your live site (or run it locally — see the main README).
2. Click **+ Leave a wish**, fill in a test name/relationship/message, submit.
3. You should see "Thank you — your wish will appear once the family has approved it."
4. Check the Sheet — a new row should appear with `status = pending`.
5. Check your email — you should get a message with the wish and Approve/Deny buttons.
6. Click **Approve**. You'll land on a confirmation page — click the **Confirm Approve** button there (the email link alone does nothing, on purpose).
7. Within a minute or two, refresh the live Wishes page — your test wish should appear.
8. **Delete your test wish** afterward (see below) so it doesn't sit on the real site.

---

## Fixing a typo in an already-approved wish

There's no edit-before-approve step by design — wishes go up exactly as written. If a wish is approved and *then* someone notices a typo:

1. Go to the repository on **github.com** and open `blessings.html`.
2. Click the **pencil (edit) icon** in the top-right of the file view.
3. Find the wish inside the `<!-- WISHES:START -->` / `<!-- WISHES:END -->` block and fix the text directly.
4. Scroll down, add a short commit message (e.g. "Fix typo in [name]'s wish"), and click **Commit changes**.
5. GitHub Pages rebuilds automatically — the fix is live within a minute or two.

## Removing a wish that was already approved

Same process as above: open `blessings.html` on github.com, click the pencil icon, delete that wish's entire `<li class="blessing-card">...</li>` block, and commit. If it also appears in the hand-picked preview on `index.html` (only a couple of wishes are shown there), remove it from there too.

## Shutting the whole thing down after the event

The site has zero ongoing dependency on Apps Script once wishes stop needing moderation — every approved wish is permanent static HTML in `blessings.html`. To turn the submission workflow off cleanly:

1. In `blessings.html`, delete the **+ Leave a wish** button (`<button ... id="wish-add-open">`) and the `<div class="wish-submit" id="wish-submit">...</div>` modal block, and remove the `<script src="js/wish-submit.js"></script>` line. Commit and push.
2. (Optional cleanup) Delete `js/wish-submit.js` and the `apps-script/` folder from the repo.
3. In the Apps Script editor, go to **Deploy → Manage deployments** and click **Archive** on the deployment (or delete the whole project from [script.google.com](https://script.google.com)).
4. You can also delete the Google Sheet, or just leave it — it costs nothing sitting idle and has no connection to the live site once the script is gone.

After this, the site is back to being a plain static site with no external services, and every wish that was approved before shutdown stays exactly where it is.
