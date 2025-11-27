// On attend que le DOM soit chargé pour attacher les événements
document.addEventListener("DOMContentLoaded", () => {
  // --- SÉLECTION DES ÉLÉMENTS ---
  const modal = document.getElementById("modal");
  const openBtns = document.querySelectorAll(".open-modal-btn"); // Tous les boutons "Je m'engage"
  const navCta = document.getElementById("navCta"); // Le bouton du menu
  const closeBtn = document.getElementById("closeModalBtn");
  const backdrop = document.getElementById("modalBackdrop");
  const form = document.getElementById("pacteForm");
  const submitBtn = document.getElementById("submitBtn");

  // --- FONCTIONS ---

  // Fonction pour ouvrir le modal
  function openModal() {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Empêche le scroll derrière
  }

  // Fonction pour fermer le modal
  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = ""; // Réactive le scroll
  }

  // Fonction pour gérer la soumission du formulaire
  function handleSubmit(e) {
    e.preventDefault(); // Empêche le rechargement de page

    const originalText = submitBtn.innerHTML;

    // Feedback visuel (Loading)
    submitBtn.innerHTML =
      '<i class="ph-bold ph-spinner animate-spin"></i> Initialisation...';
    submitBtn.classList.add("opacity-75", "cursor-not-allowed");

    // Simulation d'appel serveur (1.5 secondes)
    setTimeout(() => {
      // C'est ICI qu'on mettra la vraie redirection Stripe plus tard
      // window.location.href = "TON_LIEN_STRIPE";

      alert(
        "🚀 DÉMO VALIDÉE !\n\nL'utilisateur serait maintenant redirigé vers Stripe Checkout pour enregistrer sa carte (SetupIntent)."
      );

      // Reset du bouton et fermeture
      submitBtn.innerHTML = originalText;
      submitBtn.classList.remove("opacity-75", "cursor-not-allowed");
      closeModal();
      form.reset(); // Vide le formulaire
    }, 1500);
  }

  // --- ÉCOUTEURS D'ÉVÉNEMENTS (LISTENERS) ---

  // Attacher l'ouverture à tous les boutons concernés
  openBtns.forEach((btn) => btn.addEventListener("click", openModal));
  if (navCta) navCta.addEventListener("click", openModal);

  // Fermeture (Bouton X et clic en dehors)
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  // Fermeture avec la touche ECHAP
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Soumission du formulaire
  if (form) form.addEventListener("submit", handleSubmit);
});
