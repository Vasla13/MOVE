document.addEventListener("DOMContentLoaded", () => {
  // 1. TÉLÉPHONE & CONFETTIS
  const successScreen = document.getElementById("successMessage");
  window.triggerSuccess = function () {
    successScreen.classList.remove("hidden");
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00FF94", "#ffffff"],
    });
  };
  window.resetDemo = function () {
    successScreen.classList.add("hidden");
  };

  // ============================================
  // 2. CALCULATEUR AMÉLIORÉ (VISUALISATION)
  // ============================================
  const slider = document.getElementById("betSlider");
  const betDisplay = document.getElementById("betDisplay");
  const lossDisplay = document.getElementById("lossDisplay");
  const lossEquivalent = document.getElementById("lossEquivalent");

  // Base de données des équivalences
  function getEquivalent(amount) {
    if (amount <= 30) return { icon: "🥙", text: "Soit 3 Menus Kebab" };
    if (amount <= 60) return { icon: "🎮", text: "Soit 1 Jeu Vidéo Neuf" };
    if (amount <= 120) return { icon: "🛒", text: "Soit 1 Semaine de Courses" };
    if (amount <= 200)
      return { icon: "👟", text: "Soit 1 Paire de Air Jordan" };
    if (amount <= 300)
      return { icon: "✈️", text: "Soit 1 Billet A/R pour Ibiza" };
    if (amount <= 500)
      return { icon: "📱", text: "Soit 1 iPhone reconditionné" };
    return { icon: "💎", text: "Soit beaucoup trop d'argent" };
  }

  if (slider) {
    slider.addEventListener("input", (e) => {
      const val = e.target.value;
      const monthlyLoss = val * 30;

      betDisplay.innerText = val + "€";
      lossDisplay.innerText = "-" + monthlyLoss + "€";

      // Mise à jour de la visualisation
      const equiv = getEquivalent(monthlyLoss);
      lossEquivalent.innerHTML = `<span class="text-xl">${equiv.icon}</span> <span>${equiv.text}</span>`;

      lossDisplay.style.transform = "scale(1.1)";
      setTimeout(() => (lossDisplay.style.transform = "scale(1)"), 100);
    });
    // Init au chargement
    const initialLoss = slider.value * 30;
    const initialEquiv = getEquivalent(initialLoss);
    lossEquivalent.innerHTML = `<span class="text-xl">${initialEquiv.icon}</span> <span>${initialEquiv.text}</span>`;
  }

  // ============================================
  // 3. WALL OF SHAME (CAROUSEL)
  // ============================================
  const shameContainer = document.getElementById("shameContainer");
  const shameData = [
    { name: "Maxime", loss: "-10€", excuse: "J'avais plus de batterie..." },
    { name: "Chloé", loss: "-5€", excuse: "Il pleuvait, flemme." },
    { name: "Sofiane", loss: "-20€", excuse: "J'ai zappé de cliquer." },
    { name: "Léa", loss: "-15€", excuse: "Netflix a sorti la S4..." },
    { name: "Thomas", loss: "-5€", excuse: "C'était l'anniv de mon chat." },
    { name: "Antoine", loss: "-50€", excuse: "J'ai parié trop gros." },
    { name: "Marie", loss: "-5€", excuse: "J'ai perdu mon tel." },
  ];

  function createShameCard(item) {
    return `
            <div class="w-64 bg-[#151515] border border-white/5 p-5 rounded-2xl flex-shrink-0 hover:border-brand-red/30 transition group">
                <div class="flex justify-between items-start mb-3">
                    <span class="text-gray-500 text-xs font-bold uppercase">${item.name}</span>
                    <span class="text-brand-red font-bold text-sm bg-brand-red/10 px-2 py-1 rounded-md">${item.loss}</span>
                </div>
                <p class="text-gray-300 italic text-sm">"${item.excuse}"</p>
            </div>
        `;
  }

  // On double la liste pour l'effet infini
  const shameHTML = [...shameData, ...shameData]
    .map((item) => createShameCard(item))
    .join("");
  if (shameContainer) shameContainer.innerHTML = shameHTML;

  // 4. MODAL
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

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const originalText = submitBtn.innerHTML;
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
