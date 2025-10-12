// Removed scroll animations

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
    : "assets/CV_ROLAND_EN.pdf";
}

document.getElementById("lang-toggle").addEventListener("click", function () {
  document.body.classList.toggle("lang-fr");
  this.textContent = document.body.classList.contains("lang-fr") ? "EN" : "FR";
  updateCVLink();
});

// Initial CV link based on detected language
updateCVLink();

// Removed parallax to prevent overlap
