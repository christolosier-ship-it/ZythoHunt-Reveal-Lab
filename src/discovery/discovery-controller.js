import { runRevealCycle } from "./reveal-cycle.js";

export function createDiscoveryController({
  formEl,
  inputEl,
  feedbackEl,
  submitEl,
  carousel,
  revealEngine,
  store,
  resolver,
  cards,
  progressEl,
  closeSettings,
  beforeReveal,
  afterReveal
}) {
  let busy = false;
  const realCards = cards.filter((card) => card.revealable);
  const byId = Object.fromEntries(realCards.map((card) => [card.id, card]));
  const progressText = () => `${store.getDiscoveredIds().filter((id) => byId[id]).length} / ${realCards.length} révélées`;

  const setFeedback = (text, error = false) => {
    feedbackEl.textContent = text;
    feedbackEl.classList.toggle("is-error", error);
  };

  const setBusy = (value) => {
    busy = value;
    inputEl.disabled = value;
    submitEl.disabled = value;
  };

  function updateProgress() {
    progressEl.textContent = progressText();
  }

  async function ensureImage(card) {
    const img = carousel.getCardElement(card.id)?.querySelector(".card-illustration");
    if (img?.decode) {
      try {
        await img.decode();
      } catch {}
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy || revealEngine.isBusy()) return;

    const result = resolver.resolve(inputEl.value);
    if (!inputEl.value.trim() || result.status === "unknown") {
      setFeedback("Aucun style reconnu dans ce prototype.", true);
      inputEl.animate?.(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-5px)" },
          { transform: "translateX(5px)" },
          { transform: "translateX(0)" }
        ],
        { duration: 180 }
      );
      return;
    }

    const card = byId[result.cardId];
    setBusy(true);
    closeSettings?.();

    try {
      await runRevealCycle({
        card,
        carousel,
        revealEngine,
        store,
        ensureImage,
        beforeReveal,
        afterReveal,
        onAlreadyDiscovered: () => setFeedback("Cette carte est déjà découverte"),
        onDiscovered: () => {
          setFeedback("Nouvelle carte révélée");
          updateProgress();
        }
      });
    } catch (error) {
      console.error(error);
      setFeedback("La révélation a échoué. Réessaie.", true);
    } finally {
      setBusy(false);
      inputEl.focus();
    }
  }

  function mount() {
    updateProgress();
    realCards.forEach((card) => carousel.setDiscovered(card.id, store.isDiscovered(card.id)));
    formEl.addEventListener("submit", handleSubmit);
  }

  function destroy() {
    formEl.removeEventListener("submit", handleSubmit);
  }

  return { mount, destroy, updateProgress };
}
