document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // 0. PARALLAX EFFECT (NOUVEAU)
  // ============================================
  document.addEventListener("mousemove", (e) => {
    const layers = document.querySelectorAll(".parallax-layer");
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;

    layers.forEach((layer) => {
      const speed = layer.getAttribute("data-speed") || 1;
      const xOffset = x * speed;
      const yOffset = y * speed;
      layer.style.transform = `translateX(${xOffset}px) translateY(${yOffset}px)`;
    });
  });

  // ============================================
  // 1. TÉLÉPHONE & HABIT SWITCHER (AMÉLIORÉ)
  // ============================================
  const successScreen = document.getElementById("successMessage");
  const taskIcon = document.getElementById("taskIcon");
  const taskTitle = document.getElementById("taskTitle");
  const taskSub = document.getElementById("taskSub");

  // Dictionnaire des habitudes
  const habits = {
    run: { title: "Running", icon: "ph-sneaker-move", sub: "30 min / Zone 2" },
    book: { title: "Lecture", icon: "ph-book-open", sub: "20 pages mini" },
    detox: { title: "Détox", icon: "ph-prohibit", sub: "Pas de TikTok" },
    sleep: { title: "Sommeil", icon: "ph-moon-stars", sub: "Couché 23h00" },
  };

  window.switchHabit = function (habitKey, btnElement) {
    // Reset boutons
    document.querySelectorAll(".habit-btn").forEach((b) => {
      b.classList.remove("active", "text-brand-green");
      b.classList.add("text-gray-400");
    });
    // Active bouton actuel
    btnElement.classList.add("active", "text-brand-green");
    btnElement.classList.remove("text-gray-400");

    // Reset écran phone si déjà validé
    successScreen.classList.add("hidden");

    // Mise à jour contenu
    const data = habits[habitKey];
    taskTitle.innerText = data.title;
    taskSub.innerText = data.sub;

    // Petite anim sur l'icône
    taskIcon.className = `ph-fill ${data.icon} text-2xl text-white`;

    // Reset animation
    const card = document.getElementById("taskCard");
    card.classList.remove("fadeIn");
    void card.offsetWidth; // trigger reflow
    card.classList.add("fadeIn");
  };

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
  // 2. CALCULATEUR
  // ============================================
  const slider = document.getElementById("betSlider");
  const betDisplay = document.getElementById("betDisplay");
  const lossDisplay = document.getElementById("lossDisplay");
  const lossEquivalent = document.getElementById("lossEquivalent");

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
      const equiv = getEquivalent(monthlyLoss);
      lossEquivalent.innerHTML = `<span class="text-xl">${equiv.icon}</span> <span>${equiv.text}</span>`;
      lossDisplay.style.transform = "scale(1.1)";
      setTimeout(() => (lossDisplay.style.transform = "scale(1)"), 100);
    });
    // Init
    const initialLoss = slider.value * 30;
    const initialEquiv = getEquivalent(initialLoss);
    lossEquivalent.innerHTML = `<span class="text-xl">${initialEquiv.icon}</span> <span>${initialEquiv.text}</span>`;
  }

  // ============================================
  // 3. WALL OF SHAME
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
  if (shameContainer) {
    shameContainer.innerHTML = [...shameData, ...shameData]
      .map((item) => createShameCard(item))
      .join("");
  }

  // ============================================
  // 4. MODAL
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
      submitBtn.innerHTML = "Pacte Scellé...";
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

  // 5. SCROLL ANIMATION
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});
