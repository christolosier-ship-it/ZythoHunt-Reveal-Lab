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
  afterReveal,
  currentCollectionId,
  onExternalMatch,
  beforeValidReveal,
  onUnknownReveal,
  onAlreadyDiscoveredReveal,
  onNewDiscoveryReveal,
  onExternalCollectionReveal
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

  async function revealCard(cardId, { focusInput = true } = {}) {
    if (busy || revealEngine.isBusy()) return { status: "busy" };
    const card = byId[cardId];
    if (!card) {
      setFeedback("Carte introuvable dans cette collection.", true);
      return { status: "missing", cardId };
    }

    setBusy(true);
    closeSettings?.();

    try {
      const result = await runRevealCycle({
        card,
        carousel,
        revealEngine,
        store,
        ensureImage,
        beforeReveal,
        afterReveal,
        onAlreadyDiscovered: () => {
          setFeedback("Cette carte est déjà découverte");
          onAlreadyDiscoveredReveal?.({ card, collectionId: currentCollectionId });
        },
        onDiscovered: () => {
          setFeedback("Nouvelle carte révélée");
          updateProgress();
          onNewDiscoveryReveal?.({ card, collectionId: currentCollectionId });
        }
      });
      return result;
    } catch (error) {
      console.error(error);
      setFeedback("La révélation a échoué. Réessaie.", true);
      return { status: "failed", error };
    } finally {
      setBusy(false);
      if (focusInput) inputEl.focus();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy || revealEngine.isBusy()) return;

    const result = resolver.resolve(inputEl.value);
    if (!inputEl.value.trim() || result.status === "unknown") {
      setFeedback("Aucun style reconnu.", true);
      onUnknownReveal?.({ input: inputEl.value });
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

    if (result.collectionId && result.collectionId !== currentCollectionId) {
      beforeValidReveal?.(result);
      onExternalCollectionReveal?.(result);
      setFeedback(`Direction ${result.collectionName || "autre collection"}…`);
      onExternalMatch?.(result);
      return;
    }

    beforeValidReveal?.(result);
    await revealCard(result.cardId);
  }

  function mount() {
    updateProgress();
    realCards.forEach((card) => carousel.setDiscovered(card.id, store.isDiscovered(card.id)));
    formEl.addEventListener("submit", handleSubmit);
  }

  function destroy() {
    formEl.removeEventListener("submit", handleSubmit);
  }

  return { mount, destroy, updateProgress, revealCard };
}
