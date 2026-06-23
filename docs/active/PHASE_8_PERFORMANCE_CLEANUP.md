# PHASE 8 - Performance maximale, nettoyage production et fluidité UI/UX

## Objectif

Optimiser ZythoHunt Reveal Lab pour obtenir une application plus fluide, plus légère, plus stable et plus maintenable.

Cette phase vise :

- suppression du mode labo ;
- valeurs actuelles figées en dur ;
- moins de code spaghetti ;
- moins de DOM inutile ;
- moins de listeners inutiles ;
- moins de localStorage parasite ;
- preload plus propre ;
- réduction des requêtes inutiles sur assets manquants ;
- séparation plus nette des responsabilités ;
- préparation d'une future virtualisation réelle du carrousel.

Aucune image ne doit être ajoutée, générée, convertie, déplacée ou renommée.

---

## Contexte actuel

Le projet possède déjà :

- 9 collections déclarées ;
- une collection Porters & Stouts fonctionnelle ;
- un système multi-collections ;
- un sélecteur de collections ;
- un placeholder `?` pour les assets manquants ;
- une révélation globale inter-collections ;
- des fonds éditoriaux par collection ;
- un carrousel avec fenêtre de rendu logique ;
- un `AssetPreloadQueue` ;
- une Brassopédie ;
- un mode labo encore présent ;
- des tokens dynamiques stockés en localStorage.

Le mode labo a servi à prototyper.  
Il doit maintenant être supprimé pour stabiliser l'app en production.

---

## Règles absolues

1. Ne pas générer d'images.
2. Ne pas convertir d'images.
3. Ne pas déplacer d'assets.
4. Ne pas renommer d'assets.
5. Ne pas modifier les JSON de collection.
6. Ne pas casser Porters & Stouts.
7. Ne pas casser la sélection multi-collections.
8. Ne pas casser le placeholder `?`.
9. Ne pas casser la révélation globale inter-collections.
10. Ne pas casser la Brassopédie.
11. Ne jamais monter plusieurs carrousels DOM simultanément.
12. Ne pas contourner le typecheck.
13. Ne pas supprimer des tests sans les remplacer.
14. Ne pas introduire de dépendance lourde.
15. Ne pas réécrire massivement le carrousel si ce n'est pas nécessaire.

---

# Bloc 1 - Supprimer le mode labo

## Objectif

Retirer tout le panneau laboratoire et ses réglages dynamiques.

## À supprimer du HTML

Dans `index.html`, supprimer :

```text
settings-btn
debug-panel
debug-close
debug-panel-body
debug-panel-footer
debug-reset-col
debug-reset-background
debug-reset-settings
debug-reset-carousel
debug-reset-all
debug-replay
boutons data-focus-card du mode debug
```

Le header doit rester propre, sans bouton réglages laboratoire.

## À supprimer du JS

Supprimer les imports et appels liés à :

```text
src/lab/lab-panel.js
src/components/create-debug-panel.js
createLabPanel
labPanel.mount
labPanel.close
labPanel.render
```

Supprimer tous les listeners liés aux boutons `debug-*`.

## Fichiers potentiellement supprimables

```text
src/lab/lab-panel.js
src/components/create-debug-panel.js
```

Ne les supprimer que si plus aucun import ne les utilise.

## Critères d'acceptation

- plus de bouton réglages labo ;
- plus de panneau labo ;
- plus d'import `createLabPanel` ;
- plus d'import `createDebugPanel` ;
- plus de listeners debug dans `main.js` ;
- l'app démarre sans erreur ;
- la révélation fonctionne encore ;
- le changement de collection fonctionne encore.

---

# Bloc 2 - Figer les valeurs en dur

## Objectif

Transformer les réglages dynamiques actuels en constantes de production.

## Motion tokens

Dans `src/animation/motion-tokens.js`, conserver les valeurs actuelles :

```js
export const motionTokens = Object.freeze({
  extractionDuration: 1.2,
  flipDuration: 0.78,
  settleDuration: 0.35,
  perspective: 1400,
  finalScale: 1,
  maxNeighborShift: 21,
  backgroundBlur: 7,
  tiltX: -4,
  tiltZ: 1.2,
  glowIntensity: 0.45,
  specularIntensity: 0.45
});
```

Supprimer :

```text
STORAGE_KEY
load
save
updateToken
resetTokens
getDefaults si inutilisé
```

## Carousel tokens

Dans `src/carousel/carousel-tokens.js`, conserver :

```js
export const carouselTokens = Object.freeze({
  spacing: 128,
  depthStep: 170,
  rotationStep: 28,
  scaleStep: 0.06,
  minScale: 0.62,
  opacityStep: 0.15,
  minOpacity: 0.55,
  snapDuration: 0.55,
  renderWindow: 8
});
```

Supprimer :

```text
STORAGE_KEY
load
save
updateCarouselToken
resetCarouselTokens
getCarouselDefaults si inutilisé
```

## Background settings

Dans `src/background/background-settings.js`, figer les valeurs actuelles par défaut.

Supprimer :

```text
STORAGE_KEY
load
save
updateBackgroundSetting
resetBackgroundSettings
```

Les presets éditoriaux par collection restent gérés par :

```text
src/background/editorial-background-presets.js
```

## Critères d'acceptation

- aucun réglage labo ne lit localStorage ;
- aucun réglage labo n'écrit localStorage ;
- les animations gardent leur comportement validé ;
- les imports inutiles sont supprimés ;
- typecheck OK.

---

# Bloc 3 - Preload collection-aware

## Objectif

Supprimer le couplage historique du preload avec Porters & Stouts.

## Problème à corriger

`src/utils/preload-assets.js` ne doit plus importer directement :

```js
porterStoutCards
porterStoutCollection
```

## API attendue

Créer une API du type :

```js
getInitialPreloadUrls({
  collection,
  cards,
  activeIndex,
  radius
})
```

Puis :

```js
preloadAssets(onProgress, {
  collection,
  cards,
  activeIndex,
  radius
})
```

Les URLs initiales doivent venir de :

```text
collection.cardBack
collection.cardFrame
cards autour de activeIndex avec thumbImage
```

## Collections sans assets complets

Si `collection.assetsReady === false`, éviter de lancer une pluie de 404.

Comportement recommandé :

```text
assetsReady true
→ preload normal

assetsReady false
→ preload minimal
→ pas de preload massif des images de cartes
→ les cartes affichent le placeholder ?
```

## Critères d'acceptation

- `preload-assets.js` n'importe plus Porters & Stouts ;
- preload basé sur la collection active ;
- pas de régression sur Porters & Stouts ;
- moins de 404 inutiles ;
- chargement plus fluide.

---

# Bloc 4 - Placeholder performant pour assets manquants

## Objectif

Limiter les requêtes réseau inutiles vers des fichiers image absents.

## Situation actuelle

Le placeholder `?` fonctionne via erreur de chargement image.  
C'est robuste, mais cela peut provoquer des 404 quand beaucoup d'assets sont absents.

## Stratégie recommandée

Ajouter une décision de rendu :

```js
shouldAttemptImageLoad(collection, card, purpose)
```

Comportement :

```text
collection complète
→ charger les images normalement

collection incomplète
→ afficher directement le placeholder ?
→ ne pas tenter inutilement toutes les images
```

Ne pas supprimer les chemins attendus des manifests.  
Ils servent encore pour l'ajout manuel futur.

## Critères d'acceptation

- pas d'icône image cassée ;
- placeholder `?` toujours visible ;
- moins de requêtes 404 ;
- collections sans assets restent utilisables ;
- assets futurs restent compatibles.

---

# Bloc 5 - Extraire le resolver global

## Objectif

Sortir la fonction globale de résolution de `main.js`.

## À créer

```text
src/discovery/global-beer-resolver.js
```

## API

```js
export function createGlobalBeerResolver(collectionBundles, preferredCollectionId) {}
```

## Responsabilités

Le resolver doit :

- indexer toutes les cartes révélables ;
- intégrer noms et aliases ;
- utiliser `normalizeBeerName`;
- privilégier la collection active en cas de doublon ;
- retourner `collectionId`, `collectionName`, `cardId`, `cardName`;
- retourner `unknown` si rien ne correspond.

## Tests à ajouter

Créer :

```text
src/discovery/global-beer-resolver.test.js
```

Tests minimum :

1. trouve une carte locale ;
2. trouve une carte dans une autre collection ;
3. privilégie la collection active ;
4. retourne `unknown`;
5. gère les aliases.

## Critères d'acceptation

- `main.js` n'a plus de resolver global inline ;
- tests dédiés OK ;
- révélation inter-collections OK.

---

# Bloc 6 - Extraire les stockages app-level

## Objectif

Sortir le localStorage de `main.js`.

## À créer

```text
src/app/active-collection-storage.js
src/app/pending-reveal-storage.js
```

## active-collection-storage.js

```js
export function getStoredActiveCollectionId() {}
export function setStoredActiveCollectionId(collectionId) {}
export function clearStoredActiveCollectionId() {}
```

Clé :

```text
zythohunt.activeCollectionId.v1
```

## pending-reveal-storage.js

```js
export function setPendingReveal(match) {}
export function takePendingReveal() {}
export function clearPendingReveal() {}
```

Clé :

```text
zythohunt.pendingReveal.v1
```

## Critères d'acceptation

- `main.js` n'appelle plus directement localStorage ;
- la révélation globale fonctionne encore ;
- la collection active persiste encore.

---

# Bloc 7 - Créer une session de collection

## Objectif

Réduire `main.js` en regroupant tout ce qui concerne la collection active.

## À créer

```text
src/app/collection-session.js
```

## Responsabilités

La session doit gérer :

- bundle actif ;
- store de découverte ;
- resolver ;
- Brassopédie ;
- carrousel ;
- revealEngine ;
- discoveryController ;
- assetQueue ;
- preload ;
- destroy propre.

## API indicative

```js
export async function mountCollectionSession({
  bundle,
  elements,
  background,
  collectionBundles,
  onSwitchCollection
}) {
  return {
    collection,
    carousel,
    discovery,
    revealEngine,
    brassopediePanel,
    destroy()
  };
}
```

## Objectif final

`main.js` doit devenir beaucoup plus court :

```js
const app = await createAppController();
app.mount();
```

Ou au minimum :

```js
const background = mountBackground();
const manager = createCollectionManager(...);
await mountCollectionSession(...);
```

## Critères d'acceptation

- `main.js` est plus lisible ;
- les responsabilités sont séparées ;
- une session est démontable ;
- une seule collection reste montée ;
- pas de régression.

---

# Bloc 8 - Alléger le fond animé

## Objectif

Garder le rendu premium mais réduire le coût mobile/tablette.

## Optimisations possibles

1. Réduire légèrement les caps mobile dans `particle-profile.js`.
2. Réduire les grosses bulles floutées sur `sm` et `md`.
3. Éviter les rebuilds de particules inutiles.
4. Garder seulement transform/opacity dans les animations CSS.
5. Ne pas reconstruire le fond au changement de collection.
6. Mettre à jour les variables CSS seulement quand les valeurs changent réellement.

## Attention

Ne pas appauvrir le rendu.  
Optimisation invisible uniquement.

## Critères d'acceptation

- fond toujours premium ;
- pas de saccade au changement de collection ;
- pause toujours active pendant révélation et Brassopédie ;
- pas de rebuild inutile.

---

# Bloc 9 - Préparer la virtualisation réelle du carrousel

## Objectif

Préparer le terrain pour une vraie virtualisation DOM, sans lancer un chantier risqué si la PR est déjà grosse.

## État actuel

Le carrousel masque les cartes hors fenêtre, mais crée encore tout le DOM au montage.

## Cible future

Pool limité :

```text
activeIndex ± renderWindow
```

Au lieu de toutes les cartes.

## Dans cette phase

Ne faire que si simple :

- isoler les points d'entrée ;
- documenter le futur pool ;
- ne pas réécrire le carrousel si trop risqué.

## Critères d'acceptation

- aucune régression carrousel ;
- a11y conservée ;
- révélation conservée ;
- inspection conservée.

---

# Bloc 10 - Nettoyage HTML et CSS

## Objectif

Supprimer les restes visuels et CSS du mode labo.

## HTML

Supprimer les éléments debug listés dans le bloc 1.

## CSS

Supprimer si inutilisés :

```text
debug-panel
debug-row
debug-input-row
debug-range
debug-action-btn
debug-close
settings-btn
```

Vérifier avant suppression.

## Critères d'acceptation

- HTML plus léger ;
- CSS plus propre ;
- UI finale inchangée sauf disparition du labo ;
- pas de sélecteur CSS mort critique.

---

# Validation obligatoire

Après chaque lot :

```bash
pnpm typecheck
pnpm test
pnpm build
```

Validation finale :

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
```

---

# Découpage PR recommandé

Si tout faire en une seule PR devient trop risqué, découper.

## PR 1

```text
[codex] Remove lab mode and freeze production tokens
```

Contenu :

- suppression labo ;
- tokens figés ;
- HTML nettoyé ;
- imports nettoyés ;
- tests/build.

## PR 2

```text
[codex] Clean preload and missing asset handling
```

Contenu :

- preload collection-aware ;
- moins de 404 ;
- placeholder optimisé ;
- suppression du couplage Porters & Stouts.

## PR 3

```text
[codex] Extract app orchestration modules
```

Contenu :

- resolver global extrait ;
- storage extrait ;
- collection session ;
- `main.js` allégé.

## PR future séparée

```text
[codex] Virtualize carousel DOM pool
```

À faire plus tard si nécessaire.

---

# Tests manuels obligatoires

Vérifier :

```text
1. chargement initial
2. Porters & Stouts OK
3. bouton labo disparu
4. panneau labo inaccessible
5. changement vers Lagers
6. changement vers une collection sans assets
7. placeholder ? visible
8. aucune image cassée
9. recherche locale
10. recherche Stout depuis Lagers
11. bascule automatique vers Porters & Stouts
12. révélation automatique
13. ouverture Brassopédie
14. fermeture Brassopédie
15. reload page
16. restauration de la dernière collection active
17. test mobile/tablette si possible
```

---

# Prompt d'activation Codex

Tu vas exécuter la phase décrite dans :

```text
docs/active/PHASE_8_PERFORMANCE_CLEANUP.md
```

Objectif :

- améliorer les performances globales ;
- supprimer le mode labo ;
- figer les valeurs actuelles en dur ;
- réduire le spaghetti ;
- améliorer la fluidité UI/UX ;
- préparer une base saine pour les futures collections.

Règles :

- aucune image générée ;
- aucun asset déplacé ou renommé ;
- ne casse pas Porters & Stouts ;
- ne casse pas le placeholder `?` ;
- ne casse pas la révélation globale ;
- ne monte jamais plusieurs carrousels DOM simultanément ;
- ne contourne pas le typecheck ;
- travaille par lots.

Commence par :

1. supprimer le mode labo ;
2. figer les tokens ;
3. nettoyer le HTML et les imports ;
4. rendre le preload collection-aware ;
5. extraire resolver global et storage ;
6. alléger `main.js`.

Si la phase devient trop grosse, découpe en plusieurs PR brouillon dans cet ordre :

```text
[codex] Remove lab mode and freeze production tokens
[codex] Clean preload and missing asset handling
[codex] Extract app orchestration modules
```

Après chaque lot :

```bash
pnpm typecheck
pnpm test
pnpm build
```

Validation finale :

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
```

Livrable :

- une ou plusieurs PR brouillon ;
- rapport clair des optimisations ;
- liste des fichiers supprimés ;
- liste des modules extraits ;
- validations exécutées ;
- points de test manuel.
