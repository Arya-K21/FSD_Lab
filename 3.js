// ============================================================
//  Experiment 3 - Enhanced JavaScript Form Validation
//  File: 3.js
// ============================================================

// ── Show / Hide Password Toggle ──────────────────────────────
const EYE_OPEN = `
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
  <circle cx="12" cy="12" r="3"/>`;

const EYE_CLOSED = `
  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
  <line x1="1" y1="1" x2="23" y2="23"/>`;

function togglePassword(inputId, btnId) {
  const input = document.getElementById(inputId);
  const icon  = document.getElementById(btnId + "-icon");
  const isHidden = input.type === "password";

  // Toggle input type
  input.type = isHidden ? "text" : "password";

  // Swap the SVG icon
  icon.innerHTML = isHidden ? EYE_CLOSED : EYE_OPEN;

  // Subtle scale pop on the icon for feedback
  icon.style.transition = "transform 0.15s ease";
  icon.style.transform  = "scale(1.35)";
  setTimeout(() => { icon.style.transform = "scale(1)"; }, 150);
}

// ── Step 2: Attach validation to form submit event ──────────
document.getElementById("regForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid = validateForm();

  if (isValid) {
    // Step 6: All validations pass — show success
    const successMsg = document.getElementById("successMsg");
    successMsg.classList.add("show");
    this.reset();
    clearAllValidations();
    updateProgressSteps(0); // reset steps
    document.getElementById("strengthWrap").classList.remove("show");
  } else {
    // Shake the button to signal failure
    const btn = document.getElementById("submitBtn");
    btn.classList.remove("shake");
    void btn.offsetWidth; // reflow trick to re-trigger animation
    btn.classList.add("shake");
    // Hide success if previously shown
    document.getElementById("successMsg").classList.remove("show");
  }
});

// Ripple effect on button click
document.getElementById("submitBtn").addEventListener("click", function (e) {
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
  ripple.style.top  = (e.clientY - rect.top  - size / 2) + "px";
  this.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
});

// ── Step 4 & 5: Check each field, show/hide errors ──────────
function validateForm() {
  // Step 3: Fetch input values via DOM
  const fullName        = document.getElementById("fullName").value.trim();
  const email           = document.getElementById("email").value.trim();
  const mobile          = document.getElementById("mobile").value.trim();
  const age             = document.getElementById("age").value.trim();
  const gender          = document.getElementById("gender").value;
  const password        = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  let isValid = true;

  // 1. Full Name — letters + spaces, min 3 chars
  if (!/^[A-Za-z\s]{3,}$/.test(fullName)) {
    setInvalid("fullName", "nameError"); isValid = false;
  } else {
    setValid("fullName", "nameError");
  }

  // 2. Email — standard format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setInvalid("email", "emailError"); isValid = false;
  } else {
    setValid("email", "emailError");
  }

  // 3. Mobile — 10 digits starting with 6–9
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    setInvalid("mobile", "mobileError"); isValid = false;
  } else {
    setValid("mobile", "mobileError");
  }

  // 4. Age — integer 18–100
  const ageNum = parseInt(age, 10);
  if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
    setInvalid("age", "ageError"); isValid = false;
  } else {
    setValid("age", "ageError");
  }

  // 5. Gender — must pick a value
  if (!gender) {
    setInvalid("gender", "genderError"); isValid = false;
  } else {
    setValid("gender", "genderError");
  }

  // 6. Password — min 8 chars, ≥1 digit, ≥1 special char
  const pwdRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~\-]).{8,}$/;
  if (!pwdRegex.test(password)) {
    setInvalid("password", "passwordError"); isValid = false;
  } else {
    setValid("password", "passwordError");
  }

  // 7. Confirm Password — must match
  if (!confirmPassword || confirmPassword !== password) {
    setInvalid("confirmPassword", "confirmPasswordError"); isValid = false;
  } else {
    setValid("confirmPassword", "confirmPasswordError");
  }

  return isValid;
}

// ── Helper: mark field invalid ───────────────────────────────
function setInvalid(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  const icon  = document.getElementById("si-" + fieldId);

  field.classList.add("invalid");
  field.classList.remove("valid");
  error.classList.add("visible");   // Step 5: show error message
  if (icon) { icon.textContent = "✗"; icon.style.color = "var(--error)"; }
}

// ── Helper: mark field valid ─────────────────────────────────
function setValid(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  const icon  = document.getElementById("si-" + fieldId);

  field.classList.remove("invalid");
  field.classList.add("valid");
  error.classList.remove("visible");
  if (icon) { icon.textContent = "✓"; icon.style.color = "var(--success)"; }
}

// ── Helper: clear all validation styles ─────────────────────
function clearAllValidations() {
  const ids = ["fullName", "email", "mobile", "age", "gender", "password", "confirmPassword"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove("valid", "invalid");
    const icon = document.getElementById("si-" + id);
    if (icon) icon.textContent = "";
  });
  document.querySelectorAll(".error-msg").forEach(e => e.classList.remove("visible"));
}

// ── Password Strength Meter ──────────────────────────────────
document.getElementById("password").addEventListener("input", function () {
  const val  = this.value;
  const wrap = document.getElementById("strengthWrap");
  const fill = document.getElementById("strengthFill");
  const lbl  = document.getElementById("strengthLabel");

  if (val.length === 0) {
    wrap.classList.remove("show");
    return;
  }
  wrap.classList.add("show");

  let strength = 0;
  if (val.length >= 8)                    strength++;
  if (/[A-Z]/.test(val))                  strength++;
  if (/\d/.test(val))                     strength++;
  if (/[!@#$%^&*()_+\-={}[\]|;:,.<>?]/.test(val)) strength++;
  if (val.length >= 12)                   strength++;

  const levels = [
    { pct: "15%",  color: "#f87171", text: "Very Weak" },
    { pct: "35%",  color: "#fb923c", text: "Weak" },
    { pct: "55%",  color: "#fbbf24", text: "Fair" },
    { pct: "75%",  color: "#34d399", text: "Strong" },
    { pct: "100%", color: "#10b981", text: "Very Strong" },
  ];
  const idx = Math.max(0, Math.min(strength - 1, 4));
  fill.style.width      = levels[idx].pct;
  fill.style.background = levels[idx].color;
  lbl.textContent       = levels[idx].text;
  lbl.style.color       = levels[idx].color;
});

// ── Live blur validation ─────────────────────────────────────
document.getElementById("fullName").addEventListener("blur", function () {
  /^[A-Za-z\s]{3,}$/.test(this.value.trim())
    ? setValid("fullName", "nameError")
    : setInvalid("fullName", "nameError");
});

document.getElementById("email").addEventListener("blur", function () {
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value.trim())
    ? setValid("email", "emailError")
    : setInvalid("email", "emailError");
});

document.getElementById("mobile").addEventListener("blur", function () {
  /^[6-9]\d{9}$/.test(this.value.trim())
    ? setValid("mobile", "mobileError")
    : setInvalid("mobile", "mobileError");
});

document.getElementById("age").addEventListener("blur", function () {
  const v = parseInt(this.value.trim(), 10);
  (!isNaN(v) && v >= 18 && v <= 100)
    ? setValid("age", "ageError")
    : setInvalid("age", "ageError");
});

document.getElementById("gender").addEventListener("change", function () {
  this.value
    ? setValid("gender", "genderError")
    : setInvalid("gender", "genderError");
});

document.getElementById("password").addEventListener("blur", function () {
  const reg = /^(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~\-]).{8,}$/;
  reg.test(this.value)
    ? setValid("password", "passwordError")
    : setInvalid("password", "passwordError");
});

document.getElementById("confirmPassword").addEventListener("blur", function () {
  const pass = document.getElementById("password").value;
  (this.value && this.value === pass)
    ? setValid("confirmPassword", "confirmPasswordError")
    : setInvalid("confirmPassword", "confirmPasswordError");
});

// ── Remove shake class after animation ends ──────────────────
document.getElementById("submitBtn").addEventListener("animationend", function () {
  this.classList.remove("shake");
});
