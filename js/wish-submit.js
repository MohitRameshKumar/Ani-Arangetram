/**
 * wish-submit.js — the "+ Leave a wish" modal on blessings.html.
 *
 * Submits to a Google Apps Script web app (see /apps-script/Code.gs and
 * SETUP.md). Nothing here writes to the page directly — the wish sits
 * pending until the family approves it by email, at which point the
 * Apps Script itself commits the wish into blessings.html.
 *
 * The POST body is sent as Content-Type: text/plain containing a JSON
 * string, not application/json. That's deliberate: a JSON content-type
 * triggers a CORS preflight (OPTIONS request) that Apps Script web apps
 * do not answer, which would make every submission fail. text/plain is
 * a "simple" request per the Fetch spec, so no preflight is sent, and
 * the Apps Script side parses the body itself with JSON.parse.
 */

// Set this to your deployed Apps Script web app URL (ends in /exec). See SETUP.md.
const WISH_SUBMIT_URL = "https://script.google.com/macros/s/AKfycbyqaanHaGQpjkDnFpledtrky-bEOOQNzJ4Nuq-U5fW67kBuW_5OTfbyeebwTZF6mtoo3A/exec";

// Optional: shown as a "email it instead" link if a submission fails to send.
// Leave blank to fall back to a copy-to-clipboard button instead, since this
// address would otherwise be exposed to spam scrapers on a public page.
const WISH_FALLBACK_EMAIL = "";

const WISH_LIMITS = { name: 60, relationship: 60, message: 600 };

function initWishSubmit() {
  const modal = document.getElementById("wish-submit");
  const openBtn = document.getElementById("wish-add-open");
  if (!modal || !openBtn) return;

  const closeBtn = document.getElementById("wish-submit-close");
  const form = document.getElementById("wish-submit-form");
  const nameInput = document.getElementById("wish-name");
  const relationshipInput = document.getElementById("wish-relationship");
  const messageInput = document.getElementById("wish-message");
  const websiteInput = document.getElementById("wish-website");
  const countEl = document.getElementById("wish-message-count");
  const statusEl = document.getElementById("wish-submit-status");
  const submitBtn = document.getElementById("wish-submit-button");

  let lastFocused = null;
  let openedAt = 0;

  function focusableEls() {
    return Array.from(
      modal.querySelectorAll('button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])')
    ).filter((el) => !el.disabled && el.offsetParent !== null);
  }

  function open() {
    lastFocused = document.activeElement;
    openedAt = Date.now();
    modal.hidden = false;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    nameInput.focus();
  }

  function close() {
    modal.classList.remove("is-open");
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function setStatus(message, kind) {
    statusEl.textContent = message || "";
    statusEl.classList.remove("is-error", "is-success");
    if (kind) statusEl.classList.add(kind === "error" ? "is-error" : "is-success");
  }

  function updateCount() {
    const remaining = WISH_LIMITS.message - messageInput.value.length;
    countEl.textContent = String(Math.max(0, remaining));
  }

  function showFallback() {
    setStatus("", null);
    statusEl.classList.add("is-error");
    const name = nameInput.value.trim();
    const relationship = relationshipInput.value.trim();
    const message = messageInput.value.trim();
    const bodyText = `From: ${name} (${relationship})\n\n${message}`;

    if (WISH_FALLBACK_EMAIL) {
      statusEl.appendChild(document.createTextNode("Something went wrong sending your wish. Nothing was lost — "));
      const link = document.createElement("a");
      link.href =
        "mailto:" +
        encodeURIComponent(WISH_FALLBACK_EMAIL) +
        "?subject=" +
        encodeURIComponent("A wish for Ani") +
        "&body=" +
        encodeURIComponent(bodyText);
      link.textContent = "email it to us instead";
      statusEl.appendChild(link);
      statusEl.appendChild(document.createTextNode("."));
    } else {
      statusEl.appendChild(
        document.createTextNode(
          "Something went wrong sending your wish. Nothing was lost — copy it below and send it to the family another way."
        )
      );
    }
    if (!WISH_FALLBACK_EMAIL) {
      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className = "btn";
      copyBtn.style.marginTop = "0.75rem";
      copyBtn.textContent = "Copy my wish";
      copyBtn.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const relationship = relationshipInput.value.trim();
        const message = messageInput.value.trim();
        const text = `From: ${name} (${relationship})\n\n${message}`;
        navigator.clipboard
          .writeText(text)
          .then(() => {
            copyBtn.textContent = "Copied";
          })
          .catch(() => {
            copyBtn.textContent = "Couldn't copy — select the text manually";
          });
      });
      statusEl.appendChild(copyBtn);
    }
  }

  function validate() {
    const name = nameInput.value.trim();
    const relationship = relationshipInput.value.trim();
    const message = messageInput.value.trim();
    if (!name || name.length > WISH_LIMITS.name) {
      return { ok: false, error: "Please enter your name (60 characters or fewer)." };
    }
    if (!relationship || relationship.length > WISH_LIMITS.relationship) {
      return { ok: false, error: "Please enter your relationship to Ani (60 characters or fewer)." };
    }
    if (!message || message.length > WISH_LIMITS.message) {
      return { ok: false, error: "Please enter a wish between 1 and 600 characters." };
    }
    return { ok: true, name, relationship, message };
  }

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key === "Tab") {
      const focusable = focusableEls();
      if (!focusable.length) return;
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

  messageInput.addEventListener("input", updateCount);
  updateCount();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const result = validate();
    if (!result.ok) {
      setStatus(result.error, "error");
      return;
    }
    if (!WISH_SUBMIT_URL) {
      setStatus("This form isn't connected yet — see SETUP.md.", "error");
      return;
    }

    submitBtn.disabled = true;
    setStatus("Sending…", null);

    const payload = {
      name: result.name,
      relationship: result.relationship,
      message: result.message,
      website: websiteInput.value,
      elapsedMs: Date.now() - openedAt,
    };

    fetch(WISH_SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    })
      .then((r) =>
        r.text().then((text) => {
          if (!r.ok) {
            console.error("Wish submission: HTTP " + r.status + " response:", text);
            throw new Error("wish_submit_http_" + r.status);
          }
          try {
            return JSON.parse(text);
          } catch (parseErr) {
            console.error("Wish submission: response was not valid JSON:", text);
            throw parseErr;
          }
        })
      )
      .then((data) => {
        submitBtn.disabled = false;
        if (data && data.ok) {
          form.reset();
          updateCount();
          setStatus("Thank you — your wish will appear once the family has approved it.", "success");
        } else {
          console.error("Wish submission: server reported failure:", data);
          showFallback();
        }
      })
      .catch((err) => {
        console.error("Wish submission failed:", err);
        submitBtn.disabled = false;
        showFallback();
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initWishSubmit, 0);
});
