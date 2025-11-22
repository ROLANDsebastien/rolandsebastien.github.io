// ==================== iOS-LIKE PORTFOLIO - SIMPLE VERSION ====================

console.log("🎨 Script loaded!");

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM loaded!");

  // Initialize theme
  initTheme();

  // Initialize language
  initLanguage();

  // Set up event listeners
  setupEventListeners();

  // Animate elements
  setTimeout(() => {
    animateProgressBars();
    animateCards();
    setupScrollSpy();
  }, 100);

  console.log("✨ Portfolio ready!");
});

// ==================== THEME MANAGEMENT ====================

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  let theme = savedTheme || (systemPrefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", theme);
  console.log("🎨 Theme set to:", theme);
  updateThemeIcon();
  updateThemeColor();
}

function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  console.log("🌓 Theme toggled to:", newTheme);
  updateThemeIcon();
  updateThemeColor();
}

function updateThemeIcon() {
  const theme = document.documentElement.getAttribute("data-theme");
  const icon = document.querySelector(".theme-toggle i");

  if (icon) {
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
}

function updateThemeColor() {
  const theme = document.documentElement.getAttribute("data-theme");
  const themeColorMeta = document.getElementById("theme-color-meta");

  if (themeColorMeta) {
    const color = theme === "dark" ? "#000000" : "#f5f5f7";
    themeColorMeta.setAttribute("content", color);
  }
}

// ==================== LANGUAGE MANAGEMENT ====================

function initLanguage() {
  const savedLang = localStorage.getItem("language");
  const browserLang = navigator.language || navigator.userLanguage;

  if (savedLang === "fr" || (!savedLang && browserLang.startsWith("fr"))) {
    document.body.classList.add("language-fr");
  }

  updateLanguageButton();
  updateCVLink();
}

function toggleLanguage() {
  document.body.classList.toggle("language-fr");
  const isFrench = document.body.classList.contains("language-fr");
  localStorage.setItem("language", isFrench ? "fr" : "en");

  updateLanguageButton();
  updateCVLink();
}

function updateLanguageButton() {
  const btn = document.getElementById("lang-toggle");
  if (btn) {
    const isFrench = document.body.classList.contains("language-fr");
    btn.textContent = isFrench ? "EN" : "FR";
  }
}

function updateCVLink() {
  const cvLink = document.querySelector(".cv-download");
  if (cvLink) {
    const isFrench = document.body.classList.contains("language-fr");
    cvLink.href = isFrench
      ? "assets/CV_ROLAND_FR.pdf"
      : "assets/CV_ROLAND_EN.pdf";
  }
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
  // Theme toggle
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Language toggle
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", toggleLanguage);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href && href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
}

// ==================== ANIMATIONS ====================

function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.style.width;
          // bar.style.width = "0%";

          setTimeout(() => {
            bar.style.width = width;
          }, 100);

          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 },
  );

  progressBars.forEach((bar) => observer.observe(bar));
}

function animateCards() {
  const cards = document.querySelectorAll(".bento-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add a small delay based on the index of the card in the current view
          // We calculate index relative to the batch of intersecting entries to avoid huge delays
          const delay = index * 100;

          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  cards.forEach((card) => {
    // card.style.opacity = "0";
    // card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
    observer.observe(card);
  });
}

function setupScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
}

// ==================== SYSTEM THEME CHANGES ====================

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      const newTheme = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      updateThemeIcon();
    }
  });

console.log("💡 Tip: Try toggling between light and dark mode!");
