/* =========================================================================
   MANUAL SETUP — search for "TODO" for every spot you still need to edit.
   ========================================================================= */
const CONFIG = {
  GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwbpd96Qth9A-Ua9YAnMegtSKeVW8jG7GQZVcdxgYmjzKeAVhd3ZgjCbgGJ9upGrkev9A/exec",
  WHATSAPP_NUMBER: "917499817978",
  // TODO: any random string — must match what your Apps Script checks (optional hardening, not required to work)
  SHARED_SECRET: "PASTE_RANDOM_SECRET_TOKEN_HERE",
  CONTACT_EMAIL: "support@washatcomfort.com",
  // From your Cloudinary Dashboard:
  CLOUDINARY_CLOUD_NAME: "fcbmiqyq",
  // TODO: replace with the exact preset name you typed and saved in Cloudinary
  CLOUDINARY_UPLOAD_PRESET: "washatcomfort_uploads",
};

/* ---------------- tiny inline icon set (no external icon library) ---------------- */
const ICONS = {
  pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  camera:
    '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  shield:
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  sparkle:
    '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
  users:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  wrench:
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  clock:
    '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  upload:
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  linkedin:
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  instagram:
    '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  badge:
    '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
  alert:
    '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
};
function renderIcons() {
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (!ICONS[name]) return;
    el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="100%" height="100%">${ICONS[name]}</svg>`;
  });
}

/* ---------------- theme toggle (safe no-op if the button isn't on the page) ---------------- */
const root = document.documentElement;
function applyTheme(t) {
  root.setAttribute("data-theme", t);
  try {
    localStorage.setItem("wac_theme", t);
  } catch (e) { }
  const btn = document.getElementById("themeToggle");
  if (btn) btn.innerHTML = `<span data-icon="${t === "dark" ? "sun" : "moon"}" class="icon"></span>`;
  renderIcons();
}
(function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem("wac_theme");
  } catch (e) { }
  const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(saved || system);
})();
const themeToggleBtn = document.getElementById("themeToggle");
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
}

/* ---------------- mobile menu ---------------- */
const menuToggle = document.getElementById("menuToggle");
const mobilePanel = document.getElementById("mobilePanel");
menuToggle.innerHTML = `<span data-icon="menu" class="icon"></span>`;
let menuOpen = false;
menuToggle.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobilePanel.style.display = menuOpen ? "flex" : "none";
  menuToggle.innerHTML = `<span data-icon="${menuOpen ? "close" : "menu"}" class="icon"></span>`;
  renderIcons();
});

/* ---------------- smooth scroll nav ---------------- */
document.querySelectorAll("[data-nav]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-nav");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    menuOpen = false;
    mobilePanel.style.display = "none";
    menuToggle.innerHTML = `<span data-icon="menu" class="icon"></span>`;
    renderIcons();
  });
});

/* ---------------- legal modal ---------------- */
const LEGAL = {
  terms: {
    kicker: "Legal • Terms",
    title: "Terms &amp; Conditions",
    body: `
      <div class="card" style="background:var(--info-bg); border-color:var(--info-border); color:var(--info); padding:12px; font-size:12px">
        <b>Effective:</b> [TODO: date] • <b>Entity:</b> WashAtComfort — student-run intermediary platform, Pune, India •
        <b>Jurisdiction:</b> Pune, Maharashtra • <b>Contact:</b> ${CONFIG.CONTACT_EMAIL}
      </div>
      <h4>1. Platform nature — intermediary only</h4>
      <p>WashAtComfort connects customers with independent, verified local car washers in Pune. <b>We do not provide car-washing services ourselves</b> — the wash is carried out by an independent washer, not by WashAtComfort as a company or employer.</p>
      <h4>2. Booking via photos</h4>
      <p>Submitting the form with car photos is only for quote estimation. The final quote is shared within 2 hours on WhatsApp. No payment is collected on this website.</p>
      <h4>3. Payment terms</h4>
      <ul>
        <li><b>One-time wash:</b> payment is directly between customer and washer (UPI/cash) after the customer inspects the work.</li>
        <li><b>Monthly packages:</b> a direct arrangement between customer and washer after the first wash.</li>
      </ul>
      <h4>4. Cancellation &amp; rescheduling</h4>
      <ul>
        <li>Customers may cancel or reschedule up to 2 hours before the slot via WhatsApp, at no charge.</li>
        <li>If a washer does not show up, we will try to arrange an alternate washer the same day.</li>
      </ul>
      <h4>5. For washers / partners</h4>
      <p>Anyone joining our washer network must provide their full name, a working phone number, and a valid photo ID before being introduced to customers. Washers agree to arrive on time, use their own basic cleaning kit, and behave professionally at customer premises.</p>
      <p>Any complaint of theft, damage, harassment, or other misconduct by a washer will be investigated, may result in immediate removal from the network, and may be reported to the police where warranted. WashAtComfort keeps a record of washer contact and ID details to support any such complaint, but — as an intermediary rather than the washer's employer — does not itself guarantee or insure the outcome of any individual wash.</p>
      <h4>6. Reporting a problem</h4>
      <p>If something goes wrong with a booking on either side, email ${CONFIG.CONTACT_EMAIL} or message us on WhatsApp within 24 hours with the customer/washer name, date, and area. We will look into it and take appropriate action, which may include removing a washer from the network.</p>
    `,
  },
  privacy: {
    kicker: "Legal • Privacy",
    title: "Privacy Policy",
    body: `
      <div class="card" style="background:var(--success-bg); border-color:var(--success-border); color:var(--success); padding:12px; font-size:12px">
        <b>Data controller:</b> WashAtComfort owner, Pune • <b>Contact:</b> ${CONFIG.CONTACT_EMAIL} / WhatsApp
      </div>
      <h4>1. What we collect from customers</h4>
      <ul>
        <li><b>Personal:</b> name, mobile number (WhatsApp), area in Pune</li>
        <li><b>Location:</b> society name and parking slot</li>
        <li><b>Car:</b> car type, service type, preferred date/time</li>
        <li><b>Photos:</b> up to 3 car photos, used only for quoting</li>
      </ul>
      <h4>2. What we collect from washers</h4>
      <p>Name, phone number, and photo ID, collected before a washer is added to our network. This is used to verify identity and to support any complaint investigation — not shared publicly.</p>
      <h4>3. Why we collect it</h4>
      <p>To give an accurate quote from your car's photos, connect you with a verified nearby washer, and schedule the visit at your parking spot.</p>
      <h4>4. Sharing &amp; deletion</h4>
      <p>Customer data is shared only with the specific washer assigned to that job. We never sell data to third parties. You can request deletion of your data at any time via WhatsApp or email to ${CONFIG.CONTACT_EMAIL}.</p>
    `,
  },
  disclaimer: {
    kicker: "Legal • Disclaimer",
    title: "Disclaimer &amp; Copyright",
    body: `
      <div class="card" style="background:var(--danger-bg); border-color:var(--danger-border); color:var(--danger); padding:12px; font-size:12px">
        <b>Important:</b> WashAtComfort is an intermediary connecting you with independent, verified washers — it is not itself the car-wash service provider.
      </div>
      <h4>No liability for washer service</h4>
      <p>WashAtComfort does not carry out the wash itself; the service is delivered by an independent local washer. Customers should inspect their vehicle before and after service, and are encouraged to be present or have someone present during the wash where possible.</p>
      <h4>Copyright © [TODO: year] WashAtComfort</h4>
      <p>All content on this website belongs to WashAtComfort. No reproduction without written permission. For permission requests, contact ${CONFIG.CONTACT_EMAIL}.</p>
    `,
  },
};
const modalBackdrop = document.getElementById("modalBackdrop");
const modalTitle = document.getElementById("modalTitle");
const modalKicker = document.getElementById("modalKicker");
const modalBody = document.getElementById("modalBody");
function openModal(key) {
  const m = LEGAL[key];
  if (!m) return;
  modalKicker.textContent = m.kicker;
  modalTitle.innerHTML = m.title;
  modalBody.innerHTML = m.body;
  modalBackdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modalBackdrop.classList.remove("open");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-modal]").forEach((btn) =>
  btn.addEventListener("click", () => openModal(btn.getAttribute("data-modal")))
);
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOk").addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ---------------- WhatsApp helpers ---------------- */
function waLink(text) {
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
document.getElementById("heroWaBtn").href = waLink(
  "Hi WashAtComfort, I want a car wash quote for my society parking"
);
document.getElementById("storyWaBtn").href = waLink(
  "Hi WashAtComfort, I want to book a car wash"
);
document.getElementById("footerWaBtn").href = waLink("Hi WashAtComfort");

/* ---------------- booking form ---------------- */
const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
let photoFiles = [];
const photoStrip = document.getElementById("photoStrip");
const photoAddBtn = document.getElementById("photoAddBtn");
const photoInput = document.getElementById("photoInput");
const errPhoto = document.getElementById("err-photo");

function renderPhotoStrip() {
  photoStrip.querySelectorAll(".photo-thumb").forEach((n) => n.remove());
  photoFiles.forEach((file, i) => {
    const thumb = document.createElement("div");
    thumb.className = "photo-thumb";
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    const rm = document.createElement("button");
    rm.type = "button";
    rm.innerHTML = "&times;";
    rm.addEventListener("click", () => {
      photoFiles.splice(i, 1);
      renderPhotoStrip();
    });
    thumb.appendChild(img);
    thumb.appendChild(rm);
    photoStrip.insertBefore(thumb, photoAddBtn);
  });
  photoAddBtn.style.display = photoFiles.length >= MAX_PHOTOS ? "none" : "flex";
}

/* ---------------- Cloudinary upload (replaces the old Google-Drive approach) ----------------
   No backend, no OAuth, no permission prompts — the browser uploads straight
   to Cloudinary using an "unsigned" preset, and we get back a permanent link. */
function uploadPhotosToCloudinary() {
  const endpoint = `https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY_CLOUD_NAME}/image/upload`;
  return Promise.all(
    photoFiles.map(async (file) => {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", CONFIG.CLOUDINARY_UPLOAD_PRESET);
      const res = await fetch(endpoint, { method: "POST", body: fd });
      if (!res.ok) {
        const errBody = await res.text().catch(() => "");
        throw new Error("Cloudinary upload failed: " + errBody);
      }
      const json = await res.json();
      return json.secure_url;
    })
  );
}

photoInput.addEventListener("change", (e) => {
  errPhoto.style.display = "none";
  const incoming = Array.from(e.target.files || []);
  if (photoFiles.length + incoming.length > MAX_PHOTOS) {
    errPhoto.textContent = `Max ${MAX_PHOTOS} photos allowed.`;
    errPhoto.style.display = "flex";
  }
  for (const file of incoming) {
    if (photoFiles.length >= MAX_PHOTOS) break;
    if (!file.type.startsWith("image/")) {
      errPhoto.textContent = `"${file.name}" is not an image.`;
      errPhoto.style.display = "flex";
      continue;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      errPhoto.textContent = `"${file.name}" is too large. Max 5MB per photo.`;
      errPhoto.style.display = "flex";
      continue;
    }
    photoFiles.push(file);
  }
  photoInput.value = "";
  renderPhotoStrip();
});
renderPhotoStrip();

function sanitize(s) {
  return (s || "").replace(/[<>]/g, "").trim();
}
function hasHtml(s) {
  return /<[^>]*>/.test(s || "") || /[<>]/.test(s || "");
}
function validMobile(s) {
  return /^[6-9]\d{9}$/.test(s || "");
}

const MAX_REQUESTS_PER_HOUR = 10;
function checkRateLimit() {
  try {
    const key = "wac_submissions_v1";
    const now = Date.now();
    const hourAgo = now - 3600000;
    let log = JSON.parse(localStorage.getItem(key) || "[]").filter((t) => t > hourAgo);
    if (log.length >= MAX_REQUESTS_PER_HOUR) {
      const waitMs = log[0] + 3600000 - now;
      const mins = Math.max(1, Math.ceil(waitMs / 60000));
      return { ok: false, message: `You've reached the request limit. Please try again in ${mins} minute(s).` };
    }
    log.push(now);
    localStorage.setItem(key, JSON.stringify(log.slice(-10)));
    return { ok: true };
  } catch (e) {
    return { ok: true };
  }
}

const form = document.getElementById("bookingForm");
const submitBtn = document.getElementById("submitBtn");
const topError = document.getElementById("formTopError");

function setFieldError(id, msg) {
  const el = document.getElementById("f-" + id);
  const err = document.getElementById("err-" + id);
  if (msg) {
    el.classList.add("error");
    err.textContent = msg;
    err.style.display = "flex";
  } else {
    el.classList.remove("error");
    err.style.display = "none";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  topError.style.display = "none";

  // honeypot — if a bot filled this, silently "succeed" without sending anything
  if (document.getElementById("website").value.trim() !== "") {
    showSuccess({ name: "", area: "", carType: "", photoUrls: [] });
    return;
  }

  const name = sanitize(document.getElementById("f-name").value);
  const mobile = document.getElementById("f-mobile").value.trim();
  const area = document.getElementById("f-area").value;
  const address = sanitize(document.getElementById("f-address").value);
  const carType = document.getElementById("f-cartype").value;
  const service = document.getElementById("f-service").value;
  const date = document.getElementById("f-date").value;
  const time = document.getElementById("f-time").value;
  const notes = document.getElementById("f-notes").value;
  const consent = document.getElementById("f-consent").checked;

  let ok = true;
  if (!name || name.length < 3 || hasHtml(document.getElementById("f-name").value) || !/^[a-zA-Z\s.'-]+$/.test(name)) {
    setFieldError("name", "Please enter your full name");
    ok = false;
  } else setFieldError("name", null);
  if (!validMobile(mobile) || hasHtml(mobile)) {
    setFieldError("mobile", "Enter a valid 10-digit mobile number");
    ok = false;
  } else setFieldError("mobile", null);
  if (!area) {
    setFieldError("area", "Please select your area");
    ok = false;
  } else setFieldError("area", null);
  if (!address || address.length < 10 || hasHtml(document.getElementById("f-address").value)) {
    setFieldError("address", "Please enter society name + parking slot (10+ characters)");
    ok = false;
  } else setFieldError("address", null);
  if (hasHtml(notes) || notes.length > 300) {
    setFieldError("notes", "Notes must be under 300 characters with no special symbols");
    ok = false;
  } else setFieldError("notes", null);
  if (!consent) {
    setFieldError("consent", "Please accept to get your quote");
    ok = false;
  } else setFieldError("consent", null);
  if (!ok) return;

  const rl = checkRateLimit();
  if (!rl.ok) {
    topError.innerHTML = `<span data-icon="alert" class="icon" style="flex-shrink:0"></span> ${rl.message}`;
    topError.style.display = "flex";
    renderIcons();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span data-icon="clock" class="icon"></span> Uploading photos...`;
  renderIcons();

  let photoUrls = [];
  try {
    photoUrls = await uploadPhotosToCloudinary();
  } catch (error) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `Get Quote on WhatsApp <span data-icon="arrow" class="icon"></span>`;
    topError.textContent = "We could not upload your photos. Please check your connection and try again.";
    topError.style.display = "flex";
    renderIcons();
    return;
  }

  submitBtn.innerHTML = `<span data-icon="clock" class="icon"></span> Sending request...`;
  renderIcons();

  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const dateTime = `${date || "Not set"} ${time || ""}`.trim();
  const payload = {
    name,
    mobile,
    area,
    address,
    carType,
    serviceType: service,
    dateTime,
    date,
    time,
    notes: sanitize(notes),
    timestamp,
    photosCount: photoFiles.length,
    photoUrls,
    consent,
    source: "WashAtComfort Website",
    token: CONFIG.SHARED_SECRET,
  };

  if (CONFIG.GOOGLE_SCRIPT_URL && CONFIG.GOOGLE_SCRIPT_URL.startsWith("https://")) {
    try {
      await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      /* no-cors means we can't read the response either way */
    }
  }

  showSuccess(payload);
});

function buildWaMessage(p) {
  const links = (p.photoUrls || []).map((u, i) => `Photo ${i + 1}: ${u}`).join("\n");
  return `*NEW WashAtComfort Lead*\n\n*Name:* ${p.name}\n*Mobile:* ${p.mobile}\n*Area:* ${p.area}\n*Address:* ${p.address}\n*Car:* ${p.carType}\n*Service:* ${p.serviceType}\n*DateTime:* ${p.dateTime}\n*Notes:* ${p.notes || "None"}\n*Timestamp:* ${p.timestamp}\n\n${links || "No photos attached"}`;
}

function showSuccess(p) {
  form.style.display = "none";
  const successState = document.getElementById("successState");
  successState.style.display = "block";
  document.getElementById("successMsg").textContent =
    `Hi ${p.name || "there"} — we'll WhatsApp you a fixed quote for your ${p.carType || "car"} in ${p.area || "your area"} within 2 hours.`;

  const submittedData = document.getElementById("submittedData");
  const photoUrls = p.photoUrls || [];
  const submittedPhotos = photoUrls
    .map(
      (url) =>
        `<img src="${url}" alt="Submitted car photo" style="width:80px;height:80px;object-fit:cover;border-radius:10px;border:1px solid var(--border, #ddd);margin:4px" />`
    )
    .join("");
  submittedData.innerHTML = p.name
    ? `
    <div style="text-align:left; margin-top:16px; font-size:12.5px; color:var(--ink-soft, #555)">
      ${photoUrls.length ? `<div style="display:flex; flex-wrap:wrap; margin-top:8px">${submittedPhotos}</div>` : `<p>No photos were attached.</p>`}
    </div>
  `
    : "";

  document.getElementById("successWaBtn").href = waLink(buildWaMessage(p));
}

document.getElementById("bookAnotherBtn").addEventListener("click", () => {
  form.reset();
  photoFiles = [];
  renderPhotoStrip();
  document.getElementById("submittedData").innerHTML = "";
  document.getElementById("successState").style.display = "none";
  form.style.display = "block";
  submitBtn.disabled = false;
  submitBtn.innerHTML = `Get Quote on WhatsApp <span data-icon="arrow" class="icon"></span>`;
  renderIcons();
});

document.getElementById("yearNow").textContent = new Date().getFullYear();
renderIcons();
