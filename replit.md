# ZythoHunt Reveal Lab

A mobile-first premium card reveal prototype for the ZythoHunt beer collection app. Tests a cinematic GSAP animation for revealing playing cards representing beer styles.

## Run & Operate

- `pnpm --filter @workspace/zythohunt run dev` — run the prototype (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, Vite 7
- Frontend: Vanilla HTML5 + CSS3 + JavaScript (ES modules)
- Animation: GSAP (installed as npm dependency)
- No React, no TypeScript on the client, no backend, no database
- Build: Vite (no React plugin — plain static bundle)

## Where things live

- `artifacts/zythohunt/` — the ZythoHunt Reveal Lab prototype
- `artifacts/zythohunt/public/assets/collections/porters-stouts/` — card assets (card-back.webp, card-front-frame.svg)
- `artifacts/zythohunt/public/assets/collections/porters-stouts/cards/` — card illustrations (stout.webp, imperial-stout.webp, baltic-porter.webp)
- `artifacts/zythohunt/src/data/cards.js` — card data (3 beer styles)
- `artifacts/zythohunt/src/animation/motion-tokens.js` — central animation parameters (persisted to localStorage)
- `artifacts/zythohunt/src/animation/reveal-timeline.js` — GSAP reveal timeline (8 phases)
- `artifacts/zythohunt/src/animation/reveal-controller.js` — interaction controller
- `artifacts/zythohunt/src/components/` — card DOM builders
- `artifacts/zythohunt/src/utils/` — preload + geometry helpers

## Architecture decisions

- Pure vanilla JS (no framework) so the prototype can be copy-pasted into an existing HTML/CSS/JS PWA
- GSAP used exclusively for all animations — no CSS keyframe animations for anything interactive
- Card front built from 3 independent layers (illustration WebP + SVG frame + HTML text) for flexibility
- Motion tokens centralized in `motion-tokens.js` and persisted to localStorage so the lab panel survives page reloads
- Clone card approach: original card becomes invisible ghost, a fixed-position clone runs the animation, then clone returns to grid position and original is replaced with the revealed front

## Product

ZythoHunt Reveal Lab is a visual laboratory for testing premium card reveal animations. It shows a 3×3 grid of face-down cards in a dark brewery atmosphere. Three cards (Stout, Imperial Stout, Baltic Porter) are revealable — clicking them triggers an 8-phase GSAP animation: scene isolation → neighbor reaction → 3D extraction → copper sheen tension → 3D flip → front construction → signature glow → stabilization. A debug panel lets you tweak all animation parameters in real time.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- vite.config.ts has NO React plugin — this is intentional (vanilla JS prototype)
- The tsconfig.json still exists but is not used for the client build — Vite bundles .js directly
- Always run `pnpm --filter @workspace/zythohunt add <pkg>` to add new deps (not workspace root)
- Assets MUST live in `public/` — Vite copies them verbatim; the `src/` alias does NOT serve binary assets

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
