// ===============================
// 🌙 THEME TOGGLE (CLEAN)
// ===============================
const themeToggle = document.getElementById("themeToggle");

function setTheme(mode) {
    document.body.classList.toggle("dark", mode === "dark");
    localStorage.setItem("theme", mode);
}

themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
});

// Load theme
window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
});


// ===============================
// 🔗 SMOOTH SCROLL + ACTIVE LINK
// ===============================
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Active section highlight
window.addEventListener("scroll", () => {
    let current = "";

    document.querySelectorAll("section").forEach(section => {
        const top = section.offsetTop;
        if (scrollY >= top - 100) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});


// ===============================
// ✨ SCROLL REVEAL ANIMATION
// ===============================
const sections = document.querySelectorAll(".section");

function revealSections() {
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            sec.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);


// ===============================
// 📩 CONTACT FORM
// ===============================
const form = document.getElementById("contactForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim(),
        time: new Date().toLocaleString()
    };

    clearMessage();

    if (!validateEmail(data.email)) {
        return showMessage("Invalid email address ❌", "red");
    }

    if (!data.name || !data.message) {
        return showMessage("All fields are required ⚠️", "red");
    }

    saveMessage(data);
    showMessage("Message sent successfully ✅", "green");

    form.reset();
});


// ===============================
// 💾 LOCAL STORAGE FUNCTIONS
// ===============================
function getMessages() {
    return JSON.parse(localStorage.getItem("messages")) || [];
}

function saveMessage(msg) {
    const messages = getMessages();
    messages.push(msg);
    localStorage.setItem("messages", JSON.stringify(messages));
}


// ===============================
// 📊 ADMIN PANEL
// ===============================
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

loginBtn.addEventListener("click", () => {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (user === "admin" && pass === "1234") {
        showAdminPanel();
        loadMessages();
    } else {
        showTempMessage("Invalid credentials ❌", "red");
    }
});

logoutBtn?.addEventListener("click", () => {
    toggleAdmin(false);
});

function toggleAdmin(show) {
    document.getElementById("loginBox").style.display = show ? "none" : "block";
    document.getElementById("adminPanel").style.display = show ? "block" : "none";
}

function showAdminPanel() {
    toggleAdmin(true);
}


// ===============================
// 📬 LOAD MESSAGES (UPGRADED)
// ===============================
function loadMessages() {
    const container = document.getElementById("messages");
    const messages = getMessages();

    container.innerHTML = "";

    if (!messages.length) {
        container.innerHTML = "<p>No messages yet.</p>";
        return;
    }

    // Show count
    document.querySelector("#adminPanel h3").textContent =
        `Messages (${messages.length})`;

    messages.slice().reverse().forEach((msg, index) => {
        const card = document.createElement("div");
        card.className = "message-card";

        card.innerHTML = `
            <h4>${msg.name}</h4>
            <p><strong>Email:</strong> ${msg.email}</p>
            <p>${msg.message}</p>
            <span>${msg.time}</span>
            <button onclick="deleteMessage(${index})" style="margin-top:10px;">Delete</button>
        `;

        container.appendChild(card);
    });
}


// ===============================
// 🗑 DELETE MESSAGE
// ===============================
function deleteMessage(index) {
    const messages = getMessages();
    messages.splice(messages.length - 1 - index, 1);
    localStorage.setItem("messages", JSON.stringify(messages));
    loadMessages();
}


// ===============================
// 🧠 HELPERS
// ===============================
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(text, color) {
    errorMsg.style.color = color;
    errorMsg.textContent = text;

    setTimeout(clearMessage, 2000);
}

function clearMessage() {
    errorMsg.textContent = "";
}

function showTempMessage(text, color) {
    const msg = document.createElement("p");
    msg.textContent = text;
    msg.style.color = color;
    msg.style.textAlign = "center";

    document.getElementById("admin").prepend(msg);

    setTimeout(() => msg.remove(), 2000);
}