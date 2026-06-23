import gsap from "gsap";
import { preloadAssets } from "../utils/preload-assets.js";
import { createAssetPreloadQueue } from "../utils/asset-preload-queue.js";
import { carouselTokens } from "../carousel/carousel-tokens.js";
import { createCarousel } from "../carousel/carousel-controller.js";
import { createDiscoveryStore } from "../discovery/discovery-store.js";
import { createDiscoveryController } from "../discovery/discovery-controller.js";
import { createGlobalBeerResolver } from "../discovery/global-beer-resolver.js";
import { createRevealEngine } from "../reveal/reveal-engine.js";
import { motionTokens } from "../animation/motion-tokens.js";
import { createBrassopediePanel, shouldOpenBrassopedie } from "../brassopedie/brassopedie-panel.js";

export async function mountCollectionSession({ bundle, elements, background, collectionBundles, onExternalMatch, pendingReveal }) {
  const { collection, cards, cardsById } = bundle;
  const assetQueue = createAssetPreloadQueue({ collection, cards });

  await preloadAssets((progress) => gsap.to(elements.loadingBar, {
    width: `${progress * 100}%`,
    duration: 0.3,
    ease: "power2.out"
  }), { collection, cards });

  const store = createDiscoveryStore({ key: collection.discoveryKey });
  const brassopediePanel = createBrassopediePanel({
    cardsById,
    onOpen: () => background.pause(),
    onClose: () => background.resume()
  });
  const carousel = createCarousel({
    containerEl: elements.carouselContainer,
    cards,
    collection,
    tokens: carouselTokens,
    store,
    onActiveChange: (index) => { void assetQueue.preloadAround(index, { purpose: "thumb" }); },
    onInspect: (cardId) => {
      void assetQueue.preloadCard(cardId, { purpose: "full" });
      if (shouldOpenBrassopedie({ cardId, isDiscovered: store.isDiscovered })) brassopediePanel.open(cardId);
    }
  });
  carousel.mount();
  void assetQueue.preloadAround(4, { purpose: "thumb" });

  const revealEngine = createRevealEngine({
    stageEl: elements.revealStage,
    overlayEl: elements.sceneOverlay,
    revealOverlay: elements.revealOverlay,
    revealActions: elements.revealActions,
    revealHeadline: elements.revealHeadline,
    btnContinue: elements.btnContinue,
    motionTokens
  });

  const discovery = createDiscoveryController({
    formEl: elements.revealSearchForm,
    inputEl: elements.revealSearchInput,
    submitEl: elements.revealSearchSubmit,
    feedbackEl: elements.revealSearchFeedback,
    carousel,
    revealEngine,
    store,
    resolver: createGlobalBeerResolver(collectionBundles, collection.id),
    cards,
    progressEl: elements.progressDisplay,
    closeSettings: () => {},
    beforeReveal: () => background.pause(),
    afterReveal: () => background.resume(),
    currentCollectionId: collection.id,
    onExternalMatch
  });
  discovery.mount();

  if (pendingReveal?.collectionId === collection.id) {
    requestAnimationFrame(() => { void discovery.revealCard(pendingReveal.cardId, { focusInput: false }); });
  }

  return {
    collection,
    carousel,
    discovery,
    revealEngine,
    brassopediePanel,
    assetQueue,
    destroy() {
      carousel.destroy?.();
      brassopediePanel.close?.();
    }
  };
}
