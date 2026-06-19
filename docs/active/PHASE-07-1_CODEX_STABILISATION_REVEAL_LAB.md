# Mission Codex — Phase 7.1
## Stabilisation complète, corrections fonctionnelles et finition visuelle du Reveal Lab

## Dépôt

```text
christolosier-ship-it/ZythoHunt-Reveal-Lab
```

## Application concernée

```text
artifacts/zythohunt
```

## Branche demandée

```text
codex/stabilize-reveal-carousel
```

Ne travaille pas directement sur `main`.

---

# 1. Contexte

Le Reveal Lab contient désormais :

- une vue unique ;
- un carrousel limité de neuf cartes ;
- trois véritables styles de bière ;
- six cartes factices ;
- un champ de saisie ;
- un résolveur de styles ;
- un stockage de progression par `cardId` ;
- un moteur de révélation GSAP ;
- un retour de la carte dans le carrousel ;
- un panneau de réglages fusionné.

La Phase 4 est fonctionnelle et le correctif du flou persistant après révélation a déjà été fusionné.

Cette mission ne doit pas reconstruire le prototype.

Elle doit :

1. corriger quatre défauts visuels et fonctionnels constatés sur iPad ;
2. appliquer les corrections techniques de l’audit Phase 7 ;
3. fiabiliser les interactions ;
4. nettoyer les restes de l’ancienne architecture ;
5. ajouter une validation automatique et un déploiement reproductible.

---

# 2. Documents à lire

Avant toute modification, lis les documents présents dans `docs/`, en particulier :

```text
AUDIT_PHASE_07_ZYTHOHUNT_REVEAL_LAB.md
ZYTHOHUNT_CAHIER_INTEGRATION_COLLECTIONS.md
```

Lis également les prompts des phases précédentes s’ils sont toujours présents.

En cas de contradiction :

1. le présent prompt Phase 7.1 est prioritaire ;
2. les choix fonctionnels validés les plus récents priment ;
3. le rendu actuel ne doit pas être dégradé.

Ne supprime pas les documents d’architecture ou d’historique.

---

# 3. Préparation Git

Avant de coder :

```bash
git status
git remote -v
git branch --show-current
git fetch origin
```

Vérifie que le dépôt est propre et à jour.

Puis :

```bash
git checkout main
git pull --ff-only origin main
git checkout -b codex/stabilize-reveal-carousel
```

Si la branche existe déjà, utilise-la sans reset forcé.

Ne fusionne pas automatiquement dans `main`.

---

# 4. Fichiers à inspecter impérativement

```text
artifacts/zythohunt/index.html
artifacts/zythohunt/src/main.js
artifacts/zythohunt/src/styles.css

artifacts/zythohunt/src/components/create-card.js
artifacts/zythohunt/src/components/create-debug-panel.js

artifacts/zythohunt/src/carousel/carousel-controller.js
artifacts/zythohunt/src/carousel/carousel-tokens.js

artifacts/zythohunt/src/reveal/reveal-engine.js
artifacts/zythohunt/src/animation/reveal-timeline.js
artifacts/zythohunt/src/animation/motion-tokens.js

artifacts/zythohunt/src/discovery/discovery-controller.js
artifacts/zythohunt/src/discovery/discovery-store.js
artifacts/zythohunt/src/discovery/beer-resolver.js
artifacts/zythohunt/src/discovery/normalize-text.js

artifacts/zythohunt/src/data/prototype-carousel.js
artifacts/zythohunt/src/data/cards.js
artifacts/zythohunt/src/data/collections.js

artifacts/zythohunt/src/utils/preload-assets.js
artifacts/zythohunt/vite.config.ts
artifacts/zythohunt/tsconfig.json

package.json
pnpm-workspace.yaml
```

Inspecte également la configuration GitHub Pages et les workflows existants.

---

# 5. Règles de non-régression

Ne modifie pas volontairement :

- le nombre de cartes ;
- l’ordre des neuf cartes ;
- les trois styles révélables ;
- les alias validés ;
- le principe de révélation uniquement par saisie ;
- les grandes phases de la révélation ;
- le dos de carte ;
- les illustrations ;
- la direction artistique sombre, cuivre et ambre ;
- le format 63/88 ;
- le stockage par `cardId` ;
- le carrousel limité ;
- GSAP Draggable ;
- le bouton Continuer ;
- la progression limitée à trois vraies cartes.

N’ajoute aucune nouvelle dépendance d’interface ou d’animation.

N’utilise pas React, Swiper, Embla ou Three.js.

---

# 6. Corrections fonctionnelles demandées par l’utilisateur

# 6.1 Supprimer les deux traits blancs verticaux du cadre

## Constat visuel

Sur iPad, après révélation, deux traits blancs fins apparaissent sur toute la hauteur :

- un sur le bord gauche du cadre ;
- un sur le bord droit du cadre.

Le défaut ressemble à un raccord visible provoqué par un cadre frontal légèrement trop étroit ou insuffisamment débordant.

Le défaut est particulièrement visible sur la carte Stout agrandie.

## Code actuel à examiner

Le cadre utilise actuellement une géométrie proche de :

```css
.card-frame {
  left: -1.25%;
  top: -1.25%;
  width: 102.5%;
  height: 102.5%;
}
```

## Résultat attendu

Le cadre doit légèrement déborder horizontalement afin que :

- aucun trait clair ne soit visible ;
- aucun fond du recto ne transparaisse aux bords ;
- le cadre reste centré ;
- la déformation reste imperceptible ;
- le défaut soit corrigé dans le carrousel et dans le clone de révélation ;
- le résultat soit correct à toutes les échelles.

## Implémentation recommandée

Créer des variables explicites :

```css
:root {
  --card-frame-overscan-x: 2%;
  --card-frame-overscan-y: 1.25%;
}
```

Puis utiliser un débord symétrique :

```css
.card-frame {
  left: calc(-1 * var(--card-frame-overscan-x));
  top: calc(-1 * var(--card-frame-overscan-y));
  width: calc(100% + 2 * var(--card-frame-overscan-x));
  height: calc(100% + 2 * var(--card-frame-overscan-y));
}
```

Une solution par `transform: scaleX(...)` est également acceptable si elle est plus fiable.

## Contraintes

- ne modifie pas le fichier d’asset si le CSS suffit ;
- ne masque pas le problème avec un fond blanc ;
- conserve `overflow: hidden` sur la face ;
- ne coupe pas les ornements du cadre ;
- teste le cadre avec le recto affiché, pendant la révélation et pendant l’inspection légère.

Ajuste les valeurs après vérification visuelle. Ne considère pas `2%` comme obligatoire si une valeur plus précise est meilleure.

---

# 6.2 Clic sur une carte révélée : mise au premier plan légère

## Comportement attendu

Lorsqu’un utilisateur clique ou touche une carte déjà révélée :

- la carte doit d’abord se centrer si elle est latérale ;
- elle doit ensuite venir légèrement au premier plan ;
- l’animation doit rester très discrète ;
- ce n’est pas une nouvelle révélation ;
- ce n’est pas encore un viewer plein écran ;
- aucune Brassopédie ne doit être ajoutée dans cette mission.

## État d’inspection léger

Ajouter un état interne de carrousel, par exemple :

```text
normal
inspecting
locked
```

API recommandée :

```js
await carousel.inspectCard(cardId);
await carousel.closeInspection();
carousel.isInspecting();
```

## Animation recommandée

Sur la véritable `.beer-card` découverte :

- `scale` autour de `1.05` à `1.08` ;
- léger `translateZ`, par exemple `30px` à `60px` ;
- très léger déplacement vertical, maximum quelques pixels ;
- ombre un peu renforcée ;
- wrapper placé au-dessus des autres cartes ;
- durée autour de `0.25s` à `0.35s` ;
- easing doux, par exemple `power2.out`.

Ne crée pas de grosse extraction ni d’overlay sombre.

## Fermeture de l’inspection

L’inspection doit se fermer par :

- second clic sur la carte ;
- clic hors de la carte ;
- touche Escape ;
- déplacement vers une autre carte ;
- démarrage d’une révélation ;
- ouverture des réglages ;
- reset de collection.

Au retour :

- `scale: 1` ;
- `z: 0` sur la carte intérieure ;
- ombre normale ;
- position du wrapper recalculée par le carrousel ;
- `rotateY(180deg)` de la carte découverte conservé.

## Point critique

Ne fais jamais :

```js
clearProps: "transform"
```

sur la `.beer-card` découverte.

Cela supprimerait également son retournement `rotateY(180deg)`.

Anime les propriétés GSAP nécessaires et restaure-les explicitement.

---

# 6.3 Généraliser le feedback de clic à toutes les cartes non révélées

## Constat

Certaines cartes face dos réagissent au clic, tandis que d’autres semblent ne rien faire.

Le comportement doit devenir uniforme.

## Comportement attendu

Tout clic ou tap sur une carte non révélée doit produire un feedback visuel.

Cela concerne :

- les trois vraies cartes encore cachées ;
- les six placeholders ;
- une carte active ;
- une carte latérale.

## Règle

Si la carte est latérale :

1. la centrer ;
2. attendre la fin réelle du snap ;
3. jouer le feedback verrouillé.

Si elle est déjà active :

1. jouer immédiatement le feedback.

## Feedback recommandé

Créer une méthode dédiée :

```js
carousel.playLockedFeedback(cardId);
```

Animation courte :

- léger enfoncement ;
- petit recul ou mouvement vertical ;
- faible lueur cuivrée ou contour chaud ;
- retour immédiat ;
- aucune amorce de retournement ;
- aucune apparition du recto ;
- aucune modification du stockage.

Exemple de sensation :

```text
pression
→ résistance
→ retour
```

Durée totale recommandée :

```text
180 à 300 ms
```

## Corriger la distinction clic / drag

Le comportement irrégulier peut provenir du reset trop rapide de `didDrag`.

Implémente une suppression fiable du clic après drag.

Exemple :

```js
let suppressClickUntil = 0;

onDragEnd() {
  if (didDrag) {
    suppressClickUntil = performance.now() + 180;
  }
}

function shouldIgnoreClick() {
  return performance.now() < suppressClickUntil;
}
```

Ne réactive pas simplement `didDrag = false` dans le premier `requestAnimationFrame` si cela permet au clic synthétique de passer.

## Règles globales de clic

Pour n’importe quelle carte cliquée :

```text
carte latérale révélée
→ centrer
→ inspecter

carte active révélée
→ ouvrir ou fermer l’inspection légère

carte latérale non révélée
→ centrer
→ feedback verrouillé

carte active non révélée
→ feedback verrouillé
```

---

# 6.4 Recentrer et redimensionner le nom dans le cadre inférieur

## Constat visuel

Le nom du style apparaît actuellement trop haut, sur la zone d’illustration.

Il peut également être tronqué ou mal dimensionné.

Le nom doit se trouver dans le cartouche inférieur vide du cadre.

## Résultat attendu

Le nom doit être :

- centré horizontalement ;
- centré verticalement dans le cartouche inférieur ;
- lisible ;
- non tronqué ;
- sans ellipsis ;
- capable d’occuper une ou deux lignes ;
- adapté à `Stout`, `Imperial Stout` et `Baltic Porter` ;
- cohérent dans le carrousel, le clone de révélation et l’inspection légère.

## CSS attendu

Supprime l’override actuel qui replace `.card-copy` avec un simple `bottom: 14%`.

Définis une zone stable correspondant au cartouche inférieur.

Point de départ indicatif :

```css
.card-copy {
  position: absolute;
  left: 16%;
  right: 16%;
  top: 76%;
  bottom: 8%;
  z-index: 4;

  display: grid;
  place-items: center;
  text-align: center;

  overflow: visible;
}
```

Adapte les pourcentages au dessin réel du cadre.

Pour le nom :

```css
.card-name {
  width: 100%;
  margin: 0;
  text-align: center;
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
  overflow-wrap: anywhere;
  line-height: 1.05;
  text-wrap: balance;
}
```

## Redimensionnement robuste

Le texte doit toujours tenir.

Deux approches acceptables :

### Approche CSS

Utiliser un `clamp()` et une taille relative au conteneur, avec deux lignes maximum.

### Approche JavaScript robuste

Créer un helper :

```js
fitCardName(nameEl, containerEl)
```

qui :

1. part d’une taille maximale ;
2. mesure `scrollWidth` et `scrollHeight` ;
3. réduit progressivement la taille ;
4. s’arrête à une taille minimale ;
5. est rappelé après chargement des polices ;
6. est rappelé après resize ;
7. fonctionne sur l’original et le clone.

La seconde approche est recommandée si le CSS seul ne garantit pas l’absence de troncature.

## Interdictions

- pas de `white-space: nowrap` ;
- pas de `text-overflow: ellipsis` ;
- pas de nom rendu sur l’illustration ;
- pas de taille spécifique codée en dur pour chaque bière.

---

# 7. Corrections issues de l’audit Phase 7

# 7.1 Corriger `prefers-reduced-motion`

## Problème

La CSS contient encore des règles visant les anciennes classes :

```text
.csl-card-front
.csl-card-back
```

Le composant unifié utilise désormais :

```text
.card-front
.card-back
.beer-card
.beer-card--discovered
```

Une règle applique également :

```css
.csl-card-inner {
  transform: none !important;
}
```

Ce qui peut annuler `rotateY(180deg)`.

## Correction

Réécris complètement la section réduisant les mouvements.

Le mode réduit doit :

- conserver une carte découverte face recto ;
- conserver une carte cachée face dos ;
- réduire les durées ;
- réduire profondeur et rotation du carrousel ;
- supprimer les flottements ou pulsations continues ;
- conserver le snap ;
- conserver le feedback verrouillé sous une forme très courte ;
- conserver l’inspection légère sous forme de simple accent visuel ;
- conserver la révélation simplifiée.

Ne neutralise pas le transform qui gère la face de la carte.

---

# 7.2 Sécuriser le verrou global des animations

## Problème

Le moteur ne considère pas actuellement l’état `complete` comme occupé, alors qu’il attend encore le clic sur Continuer.

Le bouton de rejeu utilise directement le moteur et peut entrer en concurrence avec le formulaire.

Le contrôleur de découverte ne vérifie pas systématiquement le statut retourné par `reveal()`.

## Correction

Dans le moteur :

```js
function isBusy() {
  return [
    STATES.PREPARING,
    STATES.REVEALING,
    STATES.COMPLETE,
    STATES.RETURNING
  ].includes(state);
}
```

Dans le contrôleur de découverte :

```js
const result = await revealEngine.reveal(...);

if (result.status !== "completed") {
  return;
}
```

Crée un verrou d’interaction unique partagé par :

- soumission du formulaire ;
- rejeu laboratoire ;
- inspection de carte ;
- reset ;
- ouverture des réglages.

## Obligations

Pendant une révélation ou un rejeu :

- formulaire désactivé ;
- bouton paramètres désactivé ;
- Draggable désactivé ;
- clavier carrousel désactivé ;
- inspection fermée ;
- resets désactivés ;
- seconde révélation impossible.

Le verrou doit être relâché dans un `finally`.

---

# 7.3 Corriger l’ordre stockage / accessibilité

## Problème

Le code fait actuellement :

```js
carousel.setDiscovered(card.id, true);
store.markDiscovered(card.id);
```

Or `setDiscovered()` met à jour les libellés ARIA en lisant le store.

## Correction

Faire :

```js
store.markDiscovered(card.id);
carousel.setDiscovered(card.id, true);
```

ou modifier l’API pour que `setDiscovered()` mette à jour l’ARIA sans dépendre du store.

Le libellé doit devenir immédiatement :

```text
Stout, carte découverte, position 2 sur 9
```

---

# 7.4 Corriger `aria-current`

Ne crée pas un attribut vide.

Utilise :

```js
if (active) {
  wrapper.setAttribute("aria-current", "true");
} else {
  wrapper.removeAttribute("aria-current");
}
```

---

# 7.5 Améliorer la navigation clavier des cartes

## Objectif

Éviter neuf éléments simultanément tabulables et rendre la sémantique cohérente.

## Roving tabindex

- seule la carte active reçoit `tabindex="0"` ;
- les autres reçoivent `tabindex="-1"` ;
- le tabindex est recalculé à chaque changement de carte active.

## Activation

Sur la carte active :

```text
Enter / Espace sur carte révélée
→ inspection légère

Enter / Espace sur carte cachée
→ feedback verrouillé
```

Les flèches restent inactives lorsque le focus est dans :

- input ;
- textarea ;
- range ;
- select ;
- bouton du panneau.

## Sémantique

Le conteneur doit avoir une sémantique cohérente :

- `role="list"` avec cartes `listitem`, ou
- une autre structure justifiée.

N’annonce pas un placeholder comme un bouton offrant une action inexistante.

Si le feedback est considéré comme une action, documente-le clairement dans l’ARIA.

---

# 7.6 Connecter le token `maxNeighborShift`

Le curseur « Déplacement voisins » doit modifier réellement l’écartement pendant la révélation.

Ne conserve pas une valeur `18` codée en dur.

Approches acceptables :

```js
carousel.createRevealContext(cardId, {
  neighborShift: motionTokens.maxNeighborShift
});
```

ou injection des tokens au carrousel.

La valeur doit être lue au moment de la révélation afin que les modifications du panneau soient immédiatement prises en compte.

---

# 7.7 Traiter le token mort `finalScale`

Le réglage « Échelle finale » doit :

- être réellement utilisé dans la timeline, ou
- être supprimé du panneau et des tokens.

Préférence :

Utiliser le token si cela n’altère pas la géométrie du retour.

La valeur par défaut `1` doit conserver le rendu actuel.

Aucune commande visible ne doit être inopérante.

---

# 7.8 Rendre le dialog de révélation réellement modal

## À ajouter

- mémorisation du focus précédent ;
- focus sur Continuer quand l’animation est terminée ;
- Escape équivalent à Continuer uniquement quand l’état est `complete` ;
- blocage d’Escape pendant l’animation critique ;
- piège de focus minimal ;
- restauration du focus après retour ;
- contenu arrière rendu temporairement `inert`.

Éléments arrière concernés :

```text
#app-header
#reveal-search-form
#carousel-container
#debug-panel
```

Ne rends pas `#reveal-overlay` inert par accident.

Nettoie tous les écouteurs après fermeture ou destruction.

---

# 7.9 Corriger les resets du panneau

Créer une seule fonction :

```js
rebuildDebugPanel()
```

Elle doit toujours reconstruire :

1. titre Révélation ;
2. contrôles Révélation ;
3. titre Carrousel ;
4. contrôles Carrousel.

Utilise-la après :

- reset révélation ;
- reset carrousel ;
- reset global.

Ne reconstruis pas plusieurs fois le panneau pendant une seule action.

---

# 7.10 Corriger `aria-expanded`

Chaque fois que le panneau est fermé, y compris par :

- bouton fermer ;
- révélation ;
- rejeu ;
- clic extérieur éventuel ;
- Escape ;

mettre :

```text
aria-expanded="false"
```

sur `#settings-btn`.

---

# 7.11 Adapter le responsive à Safari iOS

Utiliser :

```css
height: 100vh;
height: 100dvh;
```

avec fallback.

Évite de calculer toute la zone du carrousel uniquement avec une constante fixe.

Pour la cible de révélation :

- mesurer le header ;
- mesurer le formulaire ;
- tenir compte de la safe area ;
- calculer la hauteur réellement disponible ;
- recalculer le rectangle de retour après rotation d’écran.

Le bouton Continuer doit rester visible en portrait et paysage.

---

# 7.12 Nettoyer la CSS historique

Supprime les règles devenues mortes, après vérification :

```text
#grid-container
#card-grid
.grid-glow
#app-nav
.nav-btn
#data-panel
#collections-view
.carousel-settings-btn
#carousel-debug-panel
.csl-card-face
.csl-card-back
.csl-card-front
.csl-ill-window
.csl-ill-img
.csl-frame-img
.csl-card-copy
.csl-card-name
.beer-card--revealed
```

Attention :

Conserve les classes encore réellement utilisées :

```text
.csl-card
.csl-card-inner
.carousel-stage
.carousel-anchor
```

Supprime également :

- les media queries propres à l’ancienne grille ;
- `--nav-h` si plus aucun code n’en dépend ;
- les overrides qui ne servent qu’à masquer l’ancien DOM.

Le nettoyage doit préserver visuellement le rendu.

---

# 7.13 Aligner la classe découverte

Le code utilise :

```text
beer-card--discovered
```

La CSS historique utilise encore :

```text
beer-card--revealed
```

Utilise uniquement :

```text
beer-card--discovered
```

Une carte découverte ne doit plus conserver la pulsation continue des cartes révélables.

Exemple :

```css
.beer-card--discovered {
  animation: none;
}
```

---

# 8. Fiabiliser la création de carte

## Objectif

Éviter les écarts entre :

- carte du carrousel ;
- clone de révélation ;
- carte inspectée.

## Refactor recommandé

Extraire un helper partagé pour construire le recto :

```js
createCardFront({
  cardData,
  frameUrl
});
```

Il doit créer une seule fois la structure :

```text
illustration-window
card-illustration
card-frame
card-copy
card-name
card-specular
card-glow-behind
```

Utilise ce helper dans :

```js
createCard()
cloneCardForReveal()
```

Cela garantit que :

- cadre débordant identique ;
- position du texte identique ;
- classes identiques ;
- futur ajustement appliqué partout.

Ne crée pas une troisième structure pour l’inspection légère.

---

# 9. Interaction de l’inspection avec le carrousel

## API minimale

Le carrousel doit exposer :

```js
inspectCard(cardId)
closeInspection()
isInspecting()
playLockedFeedback(cardId)
```

## Cycle de vie

`focusCard()` doit fermer une inspection précédente avant de déplacer le carrousel.

`lock()` doit fermer l’inspection ou empêcher son ouverture.

`destroy()` doit :

- tuer la timeline d’inspection ;
- tuer la timeline de feedback ;
- restaurer les styles ;
- retirer les écouteurs extérieurs ;
- retirer l’écouteur Escape.

## Résistance aux actions répétées

- double clic rapide sur une carte révélée : état stable ;
- clic sur une autre carte pendant fermeture : pas de saut ;
- swipe pendant inspection : fermer avant de dragger ou ignorer proprement ;
- révélation lancée pendant inspection : inspection fermée avant clone ;
- reset pendant inspection : fermeture préalable.

---

# 10. Typecheck réel du JavaScript

## Problème

Le script `typecheck` actuel peut réussir sans vérifier les fichiers `.js`.

## Objectif

Faire vérifier réellement :

```text
artifacts/zythohunt/src/**/*.js
```

## Solution recommandée

Activer dans la configuration dédiée à l’application :

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
  }
}
```

Ajoute les annotations JSDoc nécessaires sur les interfaces principales :

- carte ;
- collection ;
- store ;
- carrousel ;
- contexte de révélation ;
- résultat du résolveur ;
- états du moteur.

Ne masque pas toutes les erreurs avec :

```text
// @ts-nocheck
any généralisé
skip supplémentaire
```

Une exception locale doit être justifiée.

## Scripts

Le script suivant doit vérifier le vrai code :

```bash
pnpm --filter @workspace/zythohunt run typecheck
```

---

# 11. Tests automatisés minimaux

Ajoute des tests sans introduire une usine à gaz.

Tester au minimum :

## Normalisation

```text
Imperial Stout
imperial-stout
stout impérial
stout imperial
espaces multiples
apostrophes
```

## Résolveur

- noms canoniques ;
- alias ;
- valeur inconnue ;
- placeholder jamais reconnu ;
- `porter` seul refusé.

## Store

- nouvelle progression ;
- mark discovered ;
- reset ;
- migration de `[0, 4, 8]` ;
- données corrompues sans crash.

Si Vitest est déjà disponible dans le workspace, utilise-le.

Sinon utilise le runner natif Node si cela évite une nouvelle dépendance.

---

# 12. CI et déploiement GitHub Pages

## Constat

Le dépôt ne possède pas actuellement de workflow :

```text
.github/workflows/deploy.yml
```

## Créer un workflow reproductible

Le workflow doit :

1. se déclencher sur push vers `main` ;
2. permettre `workflow_dispatch` ;
3. installer PNPM ;
4. installer les dépendances avec lockfile ;
5. exécuter le typecheck réel ;
6. exécuter les tests ;
7. exécuter le build ;
8. définir :

```text
BASE_PATH=/ZythoHunt-Reveal-Lab/
```

9. publier :

```text
artifacts/zythohunt/dist/public
```

10. déployer sur GitHub Pages.

## Permissions

Configurer uniquement les permissions nécessaires à Pages.

## Concurrence

Annuler le déploiement précédent si un nouveau push arrive.

## Ne pas casser Replit

Le workflow ne doit pas modifier :

- `.replit` ;
- le workflow de développement local ;
- le port de développement ;
- la base `/` utilisée hors GitHub Pages.

---

# 13. Performance

## Carrousel

- ne recrée pas le DOM à chaque clic ;
- ne recrée pas Draggable ;
- ne lance pas plusieurs tweens de feedback en parallèle ;
- utilise `overwrite: "auto"` ou tue la timeline précédente ;
- limite `will-change` aux phases utiles.

## Inspection

- animation uniquement sur transform et ombre ;
- aucune image supplémentaire ;
- pas de blur plein écran ;
- pas de clone si inutile.

## Resize

Utilise un `ResizeObserver` ou une stratégie debouncée pour :

- recentrer le carrousel ;
- recalculer le texte ;
- conserver la carte active ;
- fermer proprement l’inspection si nécessaire.

---

# 14. Accessibilité du texte et du cadre

Le nom du style est le seul texte de la carte.

Il doit rester lisible lorsque :

- zoom navigateur ;
- mouvement réduit ;
- iPhone portrait ;
- iPad paysage ;
- desktop ;
- carte centrale ;
- carte latérale ;
- clone agrandi ;
- inspection légère.

Le texte ne doit pas dépendre uniquement d’une taille fixe en pixels.

---

# 15. Gestion des erreurs

Toute erreur pendant une révélation doit :

1. tuer les timelines actives ;
2. retirer le clone ;
3. restaurer la source ;
4. restaurer le filtre ;
5. restaurer le chrome ;
6. fermer l’inspection ;
7. lever le verrou ;
8. réactiver le formulaire ;
9. restaurer le focus ;
10. ne pas enregistrer de découverte.

Toute erreur pendant l’inspection doit simplement restaurer la carte dans son état normal.

---

# 16. Vérifications manuelles obligatoires

# 16.1 Cadre

Sur Stout, Imperial Stout et Baltic Porter :

- [ ] aucun trait blanc à gauche ;
- [ ] aucun trait blanc à droite ;
- [ ] carrousel central ;
- [ ] carte latérale ;
- [ ] clone de révélation ;
- [ ] inspection légère ;
- [ ] iPad paysage ;
- [ ] iPhone portrait ;
- [ ] desktop.

# 16.2 Texte

- [ ] Stout centré dans le cartouche inférieur ;
- [ ] Imperial Stout centré et non tronqué ;
- [ ] Baltic Porter centré et non tronqué ;
- [ ] une ou deux lignes propres ;
- [ ] aucun ellipsis ;
- [ ] aucun texte sur la zone d’image ;
- [ ] même position dans le clone.

# 16.3 Clic cartes cachées

Pour chacune des neuf positions, après reset :

- [ ] clic latéral centre la carte ;
- [ ] feedback joué après centrage ;
- [ ] clic actif joue le feedback ;
- [ ] aucune révélation ;
- [ ] aucun stockage modifié ;
- [ ] drag ne déclenche pas de feedback parasite.

# 16.4 Clic cartes découvertes

Après révélation :

- [ ] clic latéral centre et inspecte ;
- [ ] clic actif inspecte ;
- [ ] animation légère ;
- [ ] carte au premier plan ;
- [ ] second clic ferme ;
- [ ] Escape ferme ;
- [ ] clic extérieur ferme ;
- [ ] rotation recto conservée ;
- [ ] changement de carte ferme proprement ;
- [ ] révélation suivante fonctionne.

# 16.5 Révélation

- [ ] Stout ;
- [ ] Imperial Stout ;
- [ ] Baltic Porter ;
- [ ] alias ;
- [ ] saisie inconnue ;
- [ ] carte déjà découverte ;
- [ ] seconde révélation après la première ;
- [ ] replay laboratoire ;
- [ ] aucune course entre replay et formulaire ;
- [ ] flou restauré ;
- [ ] header restauré ;
- [ ] formulaire restauré.

# 16.6 Mouvement réduit

Activer `prefers-reduced-motion` :

- [ ] cartes cachées face dos ;
- [ ] cartes découvertes face recto ;
- [ ] révélation simplifiée ;
- [ ] retour fonctionnel ;
- [ ] inspection discrète ;
- [ ] aucun transform annulant le recto.

# 16.7 Clavier

- [ ] flèches naviguent hors du formulaire ;
- [ ] flèches ne naviguent pas dans l’input ;
- [ ] Home et End fonctionnent ;
- [ ] Enter/Espace activent la carte active ;
- [ ] Escape ferme inspection ;
- [ ] Escape continue la révélation seulement quand autorisé ;
- [ ] roving tabindex ;
- [ ] focus restauré.

# 16.8 Réglages

- [ ] un seul panneau ;
- [ ] titre Révélation présent après reset ;
- [ ] titre Carrousel présent après reset ;
- [ ] maxNeighborShift fonctionnel ;
- [ ] finalScale fonctionnel ou supprimé ;
- [ ] aria-expanded correct ;
- [ ] panneau inaccessible pendant révélation.

# 16.9 Responsive

- [ ] iPhone portrait ;
- [ ] iPhone paysage ;
- [ ] iPad portrait ;
- [ ] iPad paysage ;
- [ ] desktop ;
- [ ] barre Safari ouverte et fermée ;
- [ ] bouton Continuer toujours visible ;
- [ ] aucun scroll horizontal.

---

# 17. Vérifications automatiques obligatoires

Exécute :

```bash
pnpm install --frozen-lockfile
pnpm --filter @workspace/zythohunt run typecheck
pnpm --filter @workspace/zythohunt run test
pnpm --filter @workspace/zythohunt run build
```

Si le script `test` n’existe pas encore, ajoute-le.

Exécute également un build GitHub Pages local :

```bash
BASE_PATH=/ZythoHunt-Reveal-Lab/ pnpm --filter @workspace/zythohunt run build
```

Vérifie que les URLs générées contiennent la bonne base.

---

# 18. Critères d’acceptation

La mission est terminée uniquement si tous les points suivants sont vrais.

## Corrections utilisateur

- [ ] aucun trait blanc vertical ;
- [ ] carte révélée inspectable au premier plan ;
- [ ] inspection légère et réversible ;
- [ ] feedback généralisé à toutes les cartes cachées ;
- [ ] clic après drag correctement supprimé ;
- [ ] texte centré dans le cartouche inférieur ;
- [ ] texte non tronqué ;
- [ ] texte responsive.

## Stabilité

- [ ] état `complete` considéré occupé ;
- [ ] résultat `reveal()` vérifié ;
- [ ] replay et formulaire utilisent le même verrou ;
- [ ] aucune double révélation ;
- [ ] aucune mauvaise carte enregistrée ;
- [ ] flou toujours restauré.

## Accessibilité

- [ ] ordre store / ARIA corrigé ;
- [ ] `aria-current="true"` ;
- [ ] roving tabindex ;
- [ ] Enter et Espace ;
- [ ] dialog réellement modal ;
- [ ] focus restauré ;
- [ ] mouvement réduit fonctionnel.

## Réglages

- [ ] maxNeighborShift branché ;
- [ ] aucun token visible inopérant ;
- [ ] resets reconstruisent correctement le panneau ;
- [ ] aria-expanded cohérent.

## Code

- [ ] une structure de recto partagée ;
- [ ] CSS historique nettoyée ;
- [ ] classe `beer-card--discovered` unique ;
- [ ] aucun selector mort important ;
- [ ] aucun nouveau framework ;
- [ ] aucun nouveau système de carrousel.

## Qualité

- [ ] JavaScript réellement typechecké ;
- [ ] tests unitaires critiques ;
- [ ] build standard réussi ;
- [ ] build GitHub Pages réussi ;
- [ ] workflow CI/Pages ajouté ;
- [ ] aucune erreur console bloquante.

---

# 19. Livrable Codex

À la fin :

1. résume les corrections ;
2. liste les fichiers créés ;
3. liste les fichiers modifiés ;
4. liste les fichiers supprimés ;
5. explique le mécanisme d’inspection légère ;
6. explique le feedback uniforme des cartes cachées ;
7. indique les valeurs finales du débord du cadre ;
8. explique le mécanisme de redimensionnement du texte ;
9. explique les corrections de concurrence ;
10. explique le mode mouvement réduit ;
11. donne les résultats du typecheck ;
12. donne les résultats des tests ;
13. donne les résultats des deux builds ;
14. indique le workflow créé ;
15. signale tout défaut restant ;
16. crée un commit logique ;
17. pousse la branche sans fusion automatique.

Message de commit recommandé :

```text
fix(lab): stabilize carousel reveal interactions
```

Titre de PR recommandé :

```text
[fix] Stabilize carousel reveal lab
```

---

# 20. Interdictions finales

Ne crée pas dans cette mission :

- Brassopédie ;
- viewer plein écran ;
- plusieurs collections ;
- compte utilisateur ;
- synchronisation cloud ;
- backend ;
- sons ;
- haptique ;
- QR code ;
- scan photo ;
- nouvelles cartes ;
- nouveaux assets ;
- raretés ;
- score ;
- framework.

La carte révélée doit seulement bénéficier d’une inspection légère dans le carrousel.

Le but de cette mission est de transformer la Phase 4 en référence stable, propre et déployable.
