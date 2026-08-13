/**
 * Code.gs — the wish moderation backend for the Layāñjali site.
 *
 * This file is NOT served by GitHub Pages and is not loaded by the site.
 * It lives here for version control only. To actually use it, paste it
 * into a Google Apps Script project bound to a Google Sheet — see
 * SETUP.md at the repo root for the full non-programmer walkthrough.
 *
 * Flow:
 *   1. doPost() receives a public wish submission (JSON in the raw body,
 *      sent as Content-Type: text/plain to dodge Apps Script's lack of a
 *      CORS preflight response), validates it, stores it as a "pending"
 *      row in the Sheet, and emails the moderator an Approve/Deny email.
 *   2. Clicking a link in that email is a GET — doGet() renders a
 *      confirmation page but takes no action, because mail scanners and
 *      link-preview bots fetch email links automatically and a GET that
 *      performed the action would let a bot publish or discard wishes.
 *   3. The confirmation page's own button does a real POST back to this
 *      same web app, which is when the action actually happens.
 *   4. On approve, the wish is escaped and inserted into blessings.html
 *      on GitHub between the <!-- WISHES:START --> / <!-- WISHES:END -->
 *      sentinel comments, newest first, via the GitHub Contents API.
 *
 * Script Properties this file expects (Project Settings > Script Properties):
 *   GITHUB_TOKEN        fine-grained PAT, Contents: Read and write, this repo only
 *   GITHUB_OWNER        e.g. "MohitRameshKumar"
 *   GITHUB_REPO         e.g. "Arangetram-Website"
 *   GITHUB_BRANCH       e.g. "main"
 *   GITHUB_FILE_PATH    e.g. "blessings.html"
 *   MODERATOR_EMAIL     the Gmail address this script is deployed under
 */

var SHEET_NAME = "Wishes";
var MAX_NAME_LEN = 60;
var MAX_RELATIONSHIP_LEN = 60;
var MAX_MESSAGE_LEN = 600;
var MIN_FORM_MS = 3000;
var RATE_LIMIT_MAX = 15; // max submissions per window, across all senders
var RATE_LIMIT_WINDOW_SECONDS = 600; // 10 minutes
var WISHES_START_MARKER = "<!-- WISHES:START -->";
var WISHES_END_MARKER = "<!-- WISHES:END -->";

// ---------------------------------------------------------------------
// Entry points
// ---------------------------------------------------------------------

function doGet(e) {
  var token = e.parameter.token;
  var action = e.parameter.action;

  if (!token || !action || (action !== "approve" && action !== "deny")) {
    return htmlResponse_(pageShell_("Invalid link", "<p>This link is missing information and can't be used.</p>"));
  }

  var row = findRow_(token);
  if (!row) {
    return htmlResponse_(pageShell_("Link not found", "<p>This link doesn't match any pending wish. It may have already been used, or the queue may have been edited by hand.</p>"));
  }

  if (row.status !== "pending") {
    return htmlResponse_(alreadyHandledPage_(row));
  }

  return htmlResponse_(confirmPage_(row, token, action));
}

function doPost(e) {
  try {
    if (e.parameter && e.parameter.token && e.parameter.action) {
      return handleModerationAction_(e.parameter.token, e.parameter.action);
    }
    return handlePublicSubmission_(e);
  } catch (err) {
    notifyError_("doPost threw", err);
    return jsonResponse_({ ok: false, error: "server_error" });
  }
}

// ---------------------------------------------------------------------
// Public submission (called from the site's fetch(), text/plain body)
// ---------------------------------------------------------------------

function handlePublicSubmission_(e) {
  if (!e.postData || !e.postData.contents) {
    return jsonResponse_({ ok: false, error: "invalid" });
  }

  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse_({ ok: false, error: "invalid" });
  }

  if (isRateLimited_()) {
    return jsonResponse_({ ok: false, error: "rate_limited" });
  }

  // Honeypot: bots fill every field, including this hidden one. Return a
  // normal-looking success so the bot has no signal it was rejected, but
  // never touch the Sheet or send an email.
  if (body.website) {
    return jsonResponse_({ ok: true });
  }

  // Minimum time-on-form: a real person takes at least a few seconds to
  // write a wish. Same treatment — silent, no error shown to the sender.
  if (!body.elapsedMs || Number(body.elapsedMs) < MIN_FORM_MS) {
    return jsonResponse_({ ok: true });
  }

  var name = sanitizeOrReject_(body.name, MAX_NAME_LEN);
  var relationship = sanitizeOrReject_(body.relationship, MAX_RELATIONSHIP_LEN);
  var message = sanitizeOrReject_(body.message, MAX_MESSAGE_LEN);

  if (!name || !relationship || !message) {
    return jsonResponse_({ ok: false, error: "invalid" });
  }

  var token = generateToken_();
  var sheet = getSheet_();
  sheet.appendRow([token, "pending", name, relationship, message, new Date(), ""]);

  sendModerationEmail_(token, name, relationship, message);

  return jsonResponse_({ ok: true });
}

/** Strips HTML tags, trims, and rejects (returns null) if empty or over the cap. */
function sanitizeOrReject_(raw, maxLen) {
  if (typeof raw !== "string") return null;
  var noTags = raw.replace(/<[^>]*>/g, "").trim();
  if (!noTags || noTags.length > maxLen) return null;
  return noTags;
}

function isRateLimited_() {
  var cache = CacheService.getScriptCache();
  var bucket = "wishrate_" + Math.floor(Date.now() / (RATE_LIMIT_WINDOW_SECONDS * 1000));
  var current = Number(cache.get(bucket) || "0");
  if (current >= RATE_LIMIT_MAX) return true;
  cache.put(bucket, String(current + 1), RATE_LIMIT_WINDOW_SECONDS);
  return false;
}

function generateToken_() {
  return Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "");
}

// ---------------------------------------------------------------------
// Moderation action (approve / deny), triggered by the confirmation page's POST
// ---------------------------------------------------------------------

function handleModerationAction_(token, action) {
  var row = findRow_(token);
  if (!row) {
    return htmlResponse_(pageShell_("Link not found", "<p>This link doesn't match any pending wish.</p>"));
  }

  // Idempotency: a repeat click (double-submit, browser back button, or a
  // second click on an already-answered email) must not act twice.
  if (row.status !== "pending") {
    return htmlResponse_(alreadyHandledPage_(row));
  }

  if (action === "approve") {
    try {
      commitWishToGitHub_(row);
      setRowStatus_(row.rowIndex, "approved");
      return htmlResponse_(pageShell_("Wish approved", "<p><strong>" + escapeHtml_(row.name) + "</strong>'s wish has been published. It should appear on the site within a minute or two.</p>"));
    } catch (err) {
      notifyError_("Approve failed for token " + token, err);
      return htmlResponse_(pageShell_("Something went wrong", "<p>The wish was <strong>not</strong> published. You've been emailed the error — the row is still pending in the Sheet, so you can try the Approve link again.</p>"));
    }
  }

  if (action === "deny") {
    setRowStatus_(row.rowIndex, "denied");
    return htmlResponse_(pageShell_("Wish denied", "<p><strong>" + escapeHtml_(row.name) + "</strong>'s wish was discarded. Nothing was published.</p>"));
  }

  return htmlResponse_(pageShell_("Unknown action", "<p>Unrecognized action.</p>"));
}

// ---------------------------------------------------------------------
// GitHub commit
// ---------------------------------------------------------------------

function commitWishToGitHub_(row) {
  var props = PropertiesService.getScriptProperties();
  var token = requireProperty_(props, "GITHUB_TOKEN");
  var owner = requireProperty_(props, "GITHUB_OWNER");
  var repo = requireProperty_(props, "GITHUB_REPO");
  var branch = props.getProperty("GITHUB_BRANCH") || "main";
  var path = props.getProperty("GITHUB_FILE_PATH") || "blessings.html";

  var contentsUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + encodeURIComponent(path);
  var cardHtml = buildCardHtml_(row);

  for (var attempt = 0; attempt < 2; attempt++) {
    var getResp = UrlFetchApp.fetch(contentsUrl + "?ref=" + encodeURIComponent(branch), {
      method: "get",
      headers: githubHeaders_(token),
      muteHttpExceptions: true,
    });
    if (getResp.getResponseCode() !== 200) {
      throw new Error("GitHub GET failed (" + getResp.getResponseCode() + "): " + getResp.getContentText());
    }
    var fileData = JSON.parse(getResp.getContentText());
    var currentContent = Utilities.newBlob(Utilities.base64Decode(fileData.content.replace(/\n/g, ""))).getDataAsString("UTF-8");

    var startIdx = currentContent.indexOf(WISHES_START_MARKER);
    if (startIdx === -1) {
      throw new Error("Sentinel " + WISHES_START_MARKER + " not found in " + path);
    }
    var insertAt = startIdx + WISHES_START_MARKER.length;
    var newContent = currentContent.slice(0, insertAt) + "\n        " + cardHtml + currentContent.slice(insertAt);

    var putResp = UrlFetchApp.fetch(contentsUrl, {
      method: "put",
      headers: githubHeaders_(token),
      contentType: "application/json",
      muteHttpExceptions: true,
      payload: JSON.stringify({
        message: "Add wish from " + row.name,
        content: Utilities.base64Encode(Utilities.newBlob(newContent).getBytes()),
        sha: fileData.sha,
        branch: branch,
      }),
    });
    var putCode = putResp.getResponseCode();
    if (putCode === 200 || putCode === 201) return;
    if (putCode === 409 && attempt === 0) continue; // someone else committed in between — refetch sha and retry once
    throw new Error("GitHub PUT failed (" + putCode + "): " + putResp.getContentText());
  }

  throw new Error("GitHub PUT failed after a 409 conflict retry.");
}

function githubHeaders_(token) {
  return {
    Authorization: "Bearer " + token,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function requireProperty_(props, key) {
  var value = props.getProperty(key);
  if (!value) throw new Error("Missing Script Property: " + key);
  return value;
}

/** Builds the exact <li class="blessing-card"> markup, all fields HTML-escaped. */
function buildCardHtml_(row) {
  var name = escapeHtml_(row.name);
  var relationship = escapeHtml_(row.relationship);
  var message = escapeHtml_(row.message);
  return (
    '<li class="blessing-card">\n' +
    "          <p>&ldquo;" + message + "&rdquo;</p>\n" +
    "          <cite>" + name + " — " + relationship + "</cite>\n" +
    "        </li>"
  );
}

/** Escapes &, <, >, ", ' — the standard five HTML-unsafe characters. */
function escapeHtml_(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------------------------------------------------------------------
// Sheet access
// ---------------------------------------------------------------------

function getSheet_() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error('No sheet named "' + SHEET_NAME + '" found. See SETUP.md.');
  }
  return sheet;
}

/** Returns {rowIndex, token, status, name, relationship, message} or null. */
function findRow_(token) {
  var sheet = getSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  var values = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] === token) {
      return {
        rowIndex: i + 2,
        token: values[i][0],
        status: values[i][1],
        name: values[i][2],
        relationship: values[i][3],
        message: values[i][4],
      };
    }
  }
  return null;
}

function setRowStatus_(rowIndex, status) {
  var sheet = getSheet_();
  sheet.getRange(rowIndex, 2).setValue(status);
  sheet.getRange(rowIndex, 7).setValue(new Date());
}

// ---------------------------------------------------------------------
// Email
// ---------------------------------------------------------------------

function sendModerationEmail_(token, name, relationship, message) {
  var props = PropertiesService.getScriptProperties();
  var moderatorEmail = requireProperty_(props, "MODERATOR_EMAIL");
  var webAppUrl = ScriptApp.getService().getUrl();

  var approveUrl = webAppUrl + "?token=" + encodeURIComponent(token) + "&action=approve";
  var denyUrl = webAppUrl + "?token=" + encodeURIComponent(token) + "&action=deny";

  var html =
    "<p>A new wish was submitted for Ani's arangetram site:</p>" +
    '<blockquote style="border-left:3px solid #c9a227;padding-left:1em;font-style:italic;">' +
    "&ldquo;" + escapeHtml_(message) + "&rdquo;" +
    "</blockquote>" +
    "<p><strong>" + escapeHtml_(name) + "</strong> &mdash; " + escapeHtml_(relationship) + "</p>" +
    "<p style=\"margin-top:2em;\">" +
    '<a href="' + approveUrl + '" style="background:#a9642b;color:#fff;padding:0.75em 1.5em;text-decoration:none;border-radius:4px;margin-right:1em;">Approve</a>' +
    '<a href="' + denyUrl + '" style="background:#9e2b25;color:#fff;padding:0.75em 1.5em;text-decoration:none;border-radius:4px;">Deny</a>' +
    "</p>" +
    "<p style=\"color:#666;font-size:0.85em;margin-top:2em;\">Clicking a button opens a confirmation page — nothing is published or discarded until you confirm there.</p>";

  MailApp.sendEmail({
    to: moderatorEmail,
    subject: "New wish from " + name + " — approve or deny",
    htmlBody: html,
  });
}

function notifyError_(context, err) {
  try {
    var props = PropertiesService.getScriptProperties();
    var moderatorEmail = props.getProperty("MODERATOR_EMAIL");
    if (!moderatorEmail) return;
    MailApp.sendEmail({
      to: moderatorEmail,
      subject: "Wishes moderation error",
      body: context + "\n\n" + (err && err.stack ? err.stack : String(err)),
    });
  } catch (e2) {
    // If even the error email fails, there's nothing further we can do here.
  }
}

// ---------------------------------------------------------------------
// HTML pages (doGet confirmation screen, already-handled screen, result screen)
// ---------------------------------------------------------------------

function confirmPage_(row, token, action) {
  var verb = action === "approve" ? "Approve" : "Deny";
  var body =
    '<blockquote style="border-left:3px solid #c9a227;padding-left:1em;font-style:italic;">' +
    "&ldquo;" + escapeHtml_(row.message) + "&rdquo;" +
    "</blockquote>" +
    "<p><strong>" + escapeHtml_(row.name) + "</strong> — " + escapeHtml_(row.relationship) + "</p>" +
    '<form method="POST" action="' + ScriptApp.getService().getUrl() + '">' +
    '<input type="hidden" name="token" value="' + escapeHtml_(token) + '">' +
    '<input type="hidden" name="action" value="' + escapeHtml_(action) + '">' +
    '<button type="submit" style="background:' + (action === "approve" ? "#a9642b" : "#9e2b25") + ';color:#fff;padding:0.75em 1.5em;border:none;border-radius:4px;font-size:1em;cursor:pointer;">Confirm ' + verb + "</button>" +
    "</form>";
  return pageShell_(verb + " this wish?", body);
}

function alreadyHandledPage_(row) {
  return pageShell_(
    "Already handled",
    "<p>This wish was already <strong>" + escapeHtml_(row.status) + "</strong>. No action was taken.</p>"
  );
}

function pageShell_(title, bodyHtml) {
  return (
    "<!doctype html><html><head><meta charset=\"utf-8\">" +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    "<title>" + escapeHtml_(title) + "</title>" +
    '<style>body{font-family:Georgia,serif;max-width:34rem;margin:3rem auto;padding:0 1.5rem;color:#14100c;}' +
    "h1{font-size:1.4rem;}</style></head><body>" +
    "<h1>" + escapeHtml_(title) + "</h1>" +
    bodyHtml +
    "</body></html>"
  );
}

// ---------------------------------------------------------------------
// Response helpers
// ---------------------------------------------------------------------

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function htmlResponse_(html) {
  return HtmlService.createHtmlOutput(html);
}
