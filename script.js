document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // 1. TÉLÉPHONE & CONFETTIS (L'effet WOW)
  // ============================================
  const successScreen = document.getElementById("successMessage");

  // Fonction appelée par le bouton du téléphone
  window.triggerSuccess = function () {
    // Afficher l'écran vert
    successScreen.classList.remove("hidden");

    // --- LANCER LES CONFETTIS ---
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      // Confettis venant de la gauche
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#00FF94", "#ffffff"],
      });
      // Confettis venant de la droite
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#00FF94", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Reset pour refaire la démo
  window.resetDemo = function () {
    successScreen.classList.add("hidden");
  };

  // ============================================
  // 2. LIVE TICKER (Effet Bourse)
  // ============================================
  const tickerContainer = document.getElementById("tickerContent");
  const tickerClone = document.getElementById("tickerContentClone");

  // Fausses données pour créer la preuve sociale
  const activities = [
    { name: "Thomas", action: "a engagé 10€ sur Running", type: "new" },
    { name: "Sarah", action: "a validé Séance 3/4", type: "success" },
    { name: "Lucas", action: "a perdu 5€ (Oups)", type: "fail" },
    { name: "Emma", action: "a rejoint la Bêta", type: "new" },
    { name: "David", action: "a sauvé 50€ cette semaine", type: "success" },
    { name: "Julie", action: "a validé Détox", type: "success" },
    { name: "Karim", action: "a engagé 5€", type: "new" },
  ];

  function createTickerItem(item) {
    let icon = "";
    let color = "";

    if (item.type === "success") {
      icon = "🔥";
      color = "text-brand-green";
    } else if (item.type === "fail") {
      icon = "💸";
      color = "text-brand-red";
    } else {
      icon = "🔒";
      color = "text-gray-400";
    }

    return `
            <div class="flex items-center gap-2 text-sm font-mono opacity-80">
                <span class="text-xl">${icon}</span>
                <span class="font-bold text-white">${item.name}</span>
                <span class="${color}">${item.action}</span>
            </div>
        `;
  }

  // Remplir les deux conteneurs (pour l'effet infini)
  const tickerHTML = activities.map((item) => createTickerItem(item)).join("");
  if (tickerContainer && tickerClone) {
    tickerContainer.innerHTML = tickerHTML;
    tickerClone.innerHTML = tickerHTML;
  }

  // ============================================
  // 3. CALCULATEUR (Simulateur de douleur)
  // ============================================
  const slider = document.getElementById("betSlider");
  const betDisplay = document.getElementById("betDisplay");
  const lossDisplay = document.getElementById("lossDisplay");

  if (slider) {
    slider.addEventListener("input", (e) => {
      const val = e.target.value;
      const monthlyLoss = val * 30; // Hypothèse: 30 jours ratés

      betDisplay.innerText = val + "€";
      lossDisplay.innerText = "-" + monthlyLoss + "€";

      // Petit effet de "secousse" sur le chiffre rouge
      lossDisplay.style.transform = "scale(1.1)";
      setTimeout(() => (lossDisplay.style.transform = "scale(1)"), 100);
    });
  }

  // ============================================
  // 4. GESTION DU MODAL (Inscription)
  // ============================================
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

  // Listeners
  openBtns.forEach((btn) => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  // Soumission du formulaire
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const originalText = submitBtn.innerHTML;

      // Confettis aussi à l'inscription !
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00FF94", "#ffffff"],
      });

      submitBtn.innerHTML = "Validation...";
      submitBtn.classList.add("opacity-75");

      setTimeout(() => {
        alert("🔥 Bienvenue dans la meute MOVE.");
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove("opacity-75");
        closeModal();
        form.reset();
      }, 1000);
    });
  }
});
