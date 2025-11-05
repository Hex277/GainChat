// ===============
// All Entrance Page Scripts
// ===============
function showMessage(message, callback) {
  const overlay = document.getElementById("messageOverlay");
  const messageText = overlay.querySelector("p");
  const okBtn = document.getElementById("okBtn");

  messageText.textContent = message;
  overlay.style.display = "flex";

  okBtn.onclick = () => {
    overlay.style.display = "none";
    if (typeof callback === "function") callback();
  };
}
window.addEventListener("load", () => {
  const el = document.querySelector(".right-part");
  if (el) el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
});


const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://gainchat-backend.onrender.com";


// ===============
// 🧾 Register Page
// ===============
if (window.location.pathname.endsWith("register.html")) {
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const createBtn = document.getElementById("create-btn");
  const verificationInput = document.getElementById("verification");
  const boxes = document.querySelectorAll("#code-boxes span");
  const verifyBtn = document.getElementById("verify-btn");
  const MAX_USERNAME_LENGTH = 20;
  const MIN_PASSWORD_LENGTH = 8;

  // Move focus with Enter key
  usernameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      emailInput.focus();
    }
  });

  emailInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordInput.focus();
    }
  });

  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createBtn.click();
    }
  });

  // Username input restrictions
  usernameInput.addEventListener("input", () => {
    usernameInput.value = usernameInput.value.replace(/\s/g, "");
    if (usernameInput.value.length > MAX_USERNAME_LENGTH) {
      usernameInput.value = usernameInput.value.slice(0, MAX_USERNAME_LENGTH);
    }
    usernameInput.style.border = "1px solid #00FF84";
  });

  // Reset borders when typing
  [emailInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => {
      input.style.border = "1px solid #00FF84";
    });
  });

  // Register button
  createBtn.addEventListener("click", async () => {
    console.log("✅ Create button clicked");
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let hasEmpty = false;

    [usernameInput, emailInput, passwordInput].forEach((input) => {
      input.style.border = "1px solid #00FF84";
    });

    // Empty fields
    if (!username) {
      usernameInput.style.border = "1px solid red";
      hasEmpty = true;
    }
    if (!email) {
      emailInput.style.border = "1px solid red";
      hasEmpty = true;
    }
    if (!password) {
      passwordInput.style.border = "1px solid red";
      hasEmpty = true;
    }

    if (hasEmpty) {
      showMessage("⚠️ Please fill in all fields");
      return;
    }

    // Password length validation
    if (password.length < MIN_PASSWORD_LENGTH) {
      showMessage(`⚠️ Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      passwordInput.style.border = "1px solid red";
      return;
    }

    // Username validation
    if (username.length > MAX_USERNAME_LENGTH) {
      showMessage(`⚠️ Username can't be longer than ${MAX_USERNAME_LENGTH} characters`);
      usernameInput.style.border = "1px solid red";
      return;
    }

    if (/\s/.test(username)) {
      showMessage("⚠️ Username cannot contain spaces");
      usernameInput.style.border = "1px solid red";
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showMessage("⚠️ Please enter a valid email address");
      emailInput.style.border = "1px solid red";
      return;
    }

    // 🔗 Send data to backend
    try {
      console.log("📤 Sending data to backend..."); 
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      console.log("📥 Got response:", response.status);
      const result = await response.json();

      console.log("🧾 Backend returned:", result);

      if (!response.ok) {
        showMessage(`❌ ${result.message || "Registration failed"}`);
        return;
      }

      // ✅ Success: switch to verification view
      const rightPart = document.querySelector(".right-part");
      const verificationPart = document.querySelector(".right-part-verification");

      rightPart.style.display = "none";
      verificationPart.style.display = "flex";
      document.querySelector(".right-part-verification #email").value = email;

      setTimeout(() => verificationInput.focus(), 100);
    } catch (err) {
      console.error("🔥 Register fetch error:", err);
      console.error(err);
      showMessage("❌ Server error. Please try again.");
    }
  });

  // Go back link (one-time bind)
  const goBackLink = document.querySelector('.form-buttons a[href="register.html"]');
  if (goBackLink) {
    goBackLink.addEventListener("click", (e) => {
      e.preventDefault();
      const rightPart = document.querySelector(".right-part");
      const verificationPart = document.querySelector(".right-part-verification");

      verificationPart.style.display = "none";
      rightPart.style.display = "flex";
    });
  }

  // Verification input logic
  document.getElementById("code-boxes").addEventListener("click", () => {
    verificationInput.focus();
  });

  verificationInput.addEventListener("input", () => {
    const value = verificationInput.value.slice(0, 6);
    verificationInput.value = value;
    boxes.forEach((box, i) => {
      box.textContent = value[i] || "";
    });
  });
  if (verifyBtn) {
  verifyBtn.addEventListener("click", async () => {
    const email = document.querySelector(".right-part-verification #email").value.trim();
    const code = document.getElementById("verification").value.trim();

    if (!code) {
      showMessage("⚠️ Please enter your 6-digit code");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const result = await response.json();

      if (!response.ok) {
        showMessage(`❌ ${result.message || "Verification failed"}`);
        return;
      }

      // ✅ Success
      showMessage("✅ Email verified successfully!", () => {
        window.location.href = "/Enterance/login.html";
      });
    } catch (err) {
      console.error(err);
      showMessage("❌ Server error. Please try again.");
    }
  });
  }
}

// ===============
// 🔐 Login Page
// ===============
if (window.location.pathname.endsWith("login.html")) {
  const loginBtn = document.getElementById("login-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        showMessage("⚠️ Please fill in all fields");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          window.location.href = "../Workspace/dashboard.html"; // Redirect to dashboard or home
        } else {
            showMessage("❌ " + data.message);
        }
      } catch (err) {
        console.error("❌ Login error:", err);
        showMessage("Server error, please try again later.");
      }
    });
  }
}