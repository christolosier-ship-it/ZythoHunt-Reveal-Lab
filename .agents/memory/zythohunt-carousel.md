---
name: ZythoHunt carousel implementation
description: Phase 3 Carousel Lab — GSAP Draggable proxy+trigger pattern, tokens, file layout.
---

## Key pattern: GSAP Draggable with proxy element
- Create invisible proxy el (body-appended, off-screen)
- `Draggable.create(proxyEl, { type:"x", trigger: stageEl, bounds:{minX,maxX}, edgeResistance:0.65 })`
- `onDrag`: read `this.x`, compute `vPos = -this.x / spacing`, update card transforms
- `onDragEnd`: snap via `gsap.to(proxyEl, { x: targetX })` + onUpdate callback
- `didDrag` flag cleared with `requestAnimationFrame(() => { didDrag=false; })` after drag end — prevents click-after-drag

**Why:** Direct Draggable on card elements conflicts with GSAP 3D transforms; proxy keeps drag math clean and decoupled from visual state.

## File layout (Phase 3)
- `src/carousel/carousel-tokens.js` — tokens + localStorage (key: `zythohunt_carousel_tokens`)
- `src/carousel/carousel-controller.js` — createCarousel({containerEl, cards, collection, tokens, onActiveChange})
- `src/carousel/create-carousel-view.js` — createCarouselView({carouselContainerEl, debugBodyEl, onTokenChange})
- `src/data/collections.js` — collection model with cardIds array

## Non-regression contract
- `src/reveal/reveal-engine.js`, `src/lab/reveal-lab-controller.js` untouched.
- Carousel and reveal share no state at Phase 3. discoveredIds read-only from `zythohunt_revealed` localStorage.
- Nav switching: mount carousel on first Collections visit, keep alive across switches.
