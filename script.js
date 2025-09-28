// Modern effects: Particles and scroll animations

// Particle background
const canvas = document.createElement("canvas");
canvas.id = "particle-canvas";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "-1";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const numParticles = Math.floor(window.innerWidth / 10);
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    });
  }
}

function updateParticles() {
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(102, 126, 234, ${p.opacity})`;
    ctx.fill();
  });
}

function animateParticles() {
  updateParticles();
  drawParticles();
  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
animateParticles();

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Language detection and toggle
const userLang = navigator.language || navigator.userLanguage;
if (userLang.startsWith("fr")) {
  document.body.classList.add("lang-fr");
  document.getElementById("lang-toggle").textContent = "EN";
} else {
  document.getElementById("lang-toggle").textContent = "FR";
}

function updateCVLink() {
  const cvLink = document.querySelector(".cv-download");
  const isFrench = document.body.classList.contains("lang-fr");
  cvLink.href = isFrench
    ? "assets/CV_ROLAND_FR.pdf"
    : "assets/CV_Roland_EN.pdf";
}

document.getElementById("lang-toggle").addEventListener("click", function () {
  document.body.classList.toggle("lang-fr");
  this.textContent = document.body.classList.contains("lang-fr") ? "EN" : "FR";
  updateCVLink();
});

// Initial CV link based on detected language
updateCVLink();

// Parallax effect for header
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".parallax-header");
  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});
