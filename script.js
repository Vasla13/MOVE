document.addEventListener("DOMContentLoaded", () => {
  // === 1. LOGIQUE DU TÉLÉPHONE INTERACTIF ===
  const demoBtn = document.getElementById("demoBtn");
  const successScreen = document.getElementById("successMessage");
  const phoneScreen = document.getElementById("phoneScreen");

  // Fonction globale pour être appelée par le onclick HTML
  window.triggerSuccess = function () {
    // 1. Jouer un son léger ? (Optionnel, non inclus pour autoplay policy)

    // 2. Afficher l'écran de succès
    successScreen.classList.remove("hidden");

    // 3. Changer légèrement la couleur de fond
    // On laisse l'animation CSS faire le pop
  };

  window.resetDemo = function () {
    successScreen.classList.add("hidden");
  };

  // === 2. LOGIQUE DU CALCULATEUR DE DOULEUR ===
  const slider = document.getElementById("betSlider");
  const betDisplay = document.getElementById("betDisplay");
  const lossDisplay = document.getElementById("lossDisplay");
  const dynamicLoss = document.getElementById("dynamicLoss");

  if (slider) {
    slider.addEventListener("input", (e) => {
      const val = e.target.value;
      const monthlyLoss = val * 30; // Hypothèse brute : 30 jours ratés

      betDisplay.innerText = val + "€";

      // Animation des chiffres (compteur simple)
      lossDisplay.innerText = "-" + monthlyLoss + "€";
      dynamicLoss.innerText = "-" + monthlyLoss + "€";
    });
  }

  // === 3. MODAL CLASSIQUE (INSCRIPTION) ===
  const modal = document.getElementById("modal");
  const openBtns = document.querySelectorAll(".open-modal-btn");
  const closeBtn = document.getElementById("closeModalBtn");
  const backdrop = document.getElementById("modalBackdrop");
  const form = document.getElementById("pacteForm");
  const submitBtn = document.getElementById("submitBtn");

  function openModal() {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  openBtns.forEach((btn) => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden"))
      closeModal();
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = "Validation...";
      submitBtn.classList.add("opacity-75");

      setTimeout(() => {
        alert("🔥 Bienvenue dans la liste d'attente MOVE.");
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove("opacity-75");
        closeModal();
        form.reset();
      }, 1000);
    });
  }
});
