document.addEventListener("DOMContentLoaded", () => {
  // --- 0. INITIALISATION DES CONFETTIS ---

  // Instance Global (Pour la Bêta) - Plein écran
  const globalCanvas = document.getElementById("global-confetti");
  const myConfetti = confetti.create(globalCanvas, { resize: true });

  // Instance Locale (Pour le Téléphone) - Confiné à l'écran du tel
  const phoneCanvas = document.getElementById("phone-confetti");
  const phoneConfetti = confetti.create(phoneCanvas, { resize: true });

  // --- 1. PARALLAX ---
  document.addEventListener("mousemove", (e) => {
    const layers = document.querySelectorAll(".parallax-layer");
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    layers.forEach((layer) => {
      const speed = layer.getAttribute("data-speed") || 1;
      layer.style.transform = `translateX(${x * speed}px) translateY(${
        y * speed
      }px)`;
    });
  });

  // --- 2. LOGIQUE TÉLÉPHONE ---
  const successScreen = document.getElementById("successMessage");
  const taskIcon = document.getElementById("taskIcon");
  const taskTitle = document.getElementById("taskTitle");
  const taskSub = document.getElementById("taskSub");
  const habits = {
    run: { title: "Running", icon: "ph-sneaker-move", sub: "30 min / Zone 2" },
    book: { title: "Lecture", icon: "ph-book-open", sub: "20 pages mini" },
    detox: { title: "Détox", icon: "ph-prohibit", sub: "Pas de TikTok" },
    sleep: { title: "Sommeil", icon: "ph-moon-stars", sub: "Couché 23h00" },
  };

  window.switchHabit = function (habitKey, btnElement) {
    document.querySelectorAll(".habit-btn").forEach((b) => {
      b.classList.remove("active", "text-brand-green");
      b.classList.add("text-gray-400");
    });
    btnElement.classList.add("active", "text-brand-green");
    btnElement.classList.remove("text-gray-400");
    successScreen.classList.add("hidden");
    const data = habits[habitKey];
    taskTitle.innerText = data.title;
    taskSub.innerText = data.sub;
    taskIcon.className = `ph-fill ${data.icon} text-2xl text-white`;
    const card = document.getElementById("taskCard");
    card.classList.remove("fadeIn");
    void card.offsetWidth;
    card.classList.add("fadeIn");
  };

  window.triggerSuccess = function () {
    successScreen.classList.remove("hidden");

    // CONFETTIS DANS LE TÉLÉPHONE UNIQUEMENT
    // On lance une explosion depuis le bas de l'écran du téléphone
    phoneConfetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 }, // Part du bas de l'écran du tel
      colors: ["#00FF94", "#ffffff"],
      scalar: 0.8, // Confettis un peu plus petits pour l'échelle du tel
    });
  };

  window.resetDemo = function () {
    successScreen.classList.add("hidden");
  };

  // --- 3. CALCULATEUR ---
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
    const initialLoss = slider.value * 30;
    const initialEquiv = getEquivalent(initialLoss);
    lossEquivalent.innerHTML = `<span class="text-xl">${initialEquiv.icon}</span> <span>${initialEquiv.text}</span>`;
  }

  // --- 4. WALL OF SHAME ---
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
    return `<div class="w-64 bg-[#151515] border border-white/5 p-5 rounded-2xl flex-shrink-0 hover:border-brand-red/30 transition group">
                <div class="flex justify-between items-start mb-3"><span class="text-gray-500 text-xs font-bold uppercase">${item.name}</span><span class="text-brand-red font-bold text-sm bg-brand-red/10 px-2 py-1 rounded-md">${item.loss}</span></div>
                <p class="text-gray-300 italic text-sm">"${item.excuse}"</p></div>`;
  }
  if (shameContainer)
    shameContainer.innerHTML = [...shameData, ...shameData]
      .map((item) => createShameCard(item))
      .join("");

  // --- 5. MODAL (INSCRIPTION / SIMULATION) ---

  // Helper pour afficher une belle modale interne au lieu de alert()
  function showCustomModal(title, message) {
    // Création du conteneur
    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 z-[300] flex items-center justify-center p-4";

    // Fond sombre flouté
    const backdrop = document.createElement("div");
    backdrop.className =
      "absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300 opacity-0";
    modal.appendChild(backdrop);

    // Contenu de la carte
    const content = document.createElement("div");
    content.className =
      "relative bg-[#121212] border border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl transform scale-95 opacity-0 transition-all duration-300";

    content.innerHTML = `
            <div class="text-center">
                <div class="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-green text-2xl">
                    <i class="ph-bold ph-info"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">${title}</h3>
                <p class="text-sm text-gray-400 leading-relaxed mb-6">${message}</p>
                <button class="w-full bg-brand-green text-black font-bold py-3 rounded-xl hover:bg-white transition">
                    C'est compris
                </button>
            </div>
        `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Animation d'entrée
    requestAnimationFrame(() => {
      backdrop.classList.remove("opacity-0");
      content.classList.remove("scale-95", "opacity-0");
      content.classList.add("scale-100", "opacity-100");
    });

    // Logique de fermeture
    const btn = content.querySelector("button");
    const close = () => {
      backdrop.classList.add("opacity-0");
      content.classList.remove("scale-100", "opacity-100");
      content.classList.add("scale-95", "opacity-0");
      setTimeout(() => modal.remove(), 300);
    };

    btn.onclick = close;
    backdrop.onclick = close;
  }

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

      // Suppression des confettis ici

      submitBtn.innerHTML = "Simulation en cours...";
      submitBtn.classList.add("opacity-75");
      setTimeout(() => {
        // Message de simulation clair via la modale personnalisée
        showCustomModal(
          "Simulation Terminée",
          "Merci de votre intérêt !<br><br>Ceci est une démonstration technique. Aucune transaction n'a été effectuée et aucune donnée n'a été enregistrée."
        );

        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove("opacity-75");
        closeModal();
        form.reset();
      }, 1000);
    });
  }

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
