# Mission Replit — Phase 3 : Carousel Lab ZythoHunt

## Contexte du projet

Tu travailles dans le dépôt GitHub :

```text
christolosier-ship-it/ZythoHunt-Reveal-Lab
```

Le projet est un workspace PNPM contenant l’application principale dans :

```text
artifacts/zythohunt
```

L’application utilise :

- HTML ;
- CSS ;
- JavaScript vanilla ;
- Vite ;
- GSAP ;
- un déploiement compatible Replit et GitHub Pages.

La phase 2 est terminée. Le moteur de révélation a été extrait et se trouve notamment dans :

```text
artifacts/zythohunt/src/reveal/reveal-engine.js
artifacts/zythohunt/src/lab/reveal-lab-controller.js
```

Avant toute modification, lis intégralement :

```text
docs/architecture/ZYTHOHUNT_CAHIER_INTEGRATION_COLLECTIONS.md
```

Concentre-toi particulièrement sur :

- la vision fonctionnelle des collections ;
- le contrat du carrousel ;
- le plan de réalisation du Carousel Lab ;
- les contraintes mobile ;
- les critères d’accessibilité ;
- les critères de performance ;
- les éléments explicitement hors périmètre.

---

# Mode de travail obligatoire

Commence en **Plan Mode**.

Avant de modifier les fichiers :

1. inspecte le dépôt ;
2. vérifie l’état Git ;
3. vérifie la branche active ;
4. vérifie que le clone local contient les dernières modifications de `main` ;
5. vérifie la présence du moteur extrait de phase 2 ;
6. lance l’application actuelle ;
7. teste rapidement le laboratoire de révélation existant ;
8. présente un plan d’implémentation concis ;
9. attends l’approbation du plan avant de passer en Build Mode.

Ne commence pas à coder avant validation du plan.

---

# Sécurité Git avant toute opération

Exécute ou vérifie l’équivalent de :

```bash
git status
git remote -v
git branch --show-current
git fetch origin
```

Si le workspace contient des modifications non commitables ou non identifiées :

- ne les écrase pas ;
- ne lance pas de reset forcé ;
- ne lance pas de pull susceptible de créer un conflit ;
- signale précisément les fichiers concernés ;
- attends une décision.

Si le workspace est propre :

```bash
git checkout main
git pull --ff-only origin main
```

Vérifie ensuite que les fichiers suivants existent :

```text
artifacts/zythohunt/src/reveal/reveal-engine.js
artifacts/zythohunt/src/lab/reveal-lab-controller.js
docs/architecture/ZYTHOHUNT_CAHIER_INTEGRATION_COLLECTIONS.md
```

Crée ou utilise ensuite la branche :

```text
lab/carousel
```

Commande indicative :

```bash
git checkout -b lab/carousel
```

Si la branche existe déjà, utilise-la sans écraser son contenu.

Ne travaille jamais directement sur `main`.

Ne fusionne pas la branche dans `main`.

---

# Objectif unique de la phase 3

Intégrer dans le laboratoire actuel un **Carousel Lab** accessible depuis le bouton inférieur :

```text
Collections
```

Le bouton :

```text
Révéler
```

doit ouvrir ou conserver le laboratoire de révélation existant.

La navigation inférieure devient donc le sélecteur des laboratoires :

```text
Révéler      → laboratoire de révélation existant
Collections  → nouveau Carousel Lab
Brassopédie  → réservé pour une phase ultérieure
Profil       → réservé pour une phase ultérieure
```

Le Carousel Lab doit permettre de concevoir, tester et régler un carrousel de cartes limité avant son raccordement futur au moteur de révélation.

---

# Règle absolue de périmètre

Cette phase porte uniquement sur :

- la navigation entre deux vues de laboratoire ;
- le carrousel limité ;
- les gestes et contrôles du carrousel ;
- les réglages visuels du carrousel ;
- le responsive ;
- la stabilité et le nettoyage du composant.

Cette phase ne doit pas raccorder le carrousel au moteur de révélation.

Une carte cachée ne doit jamais être révélée dans cette phase.

---

# État actuel à préserver

Le laboratoire de révélation existant doit rester fonctionnel.

Ne modifie pas volontairement :

```text
artifacts/zythohunt/src/reveal/reveal-engine.js
artifacts/zythohunt/src/animation/reveal-timeline.js
artifacts/zythohunt/src/animation/motion-tokens.js
```

Ne modifie pas :

- les durées de révélation ;
- les easings de révélation ;
- les halos de révélation ;
- le retournement ;
- le retour vers la grille ;
- le panneau de fiche actuel ;
- les assets actuels ;
- le système de stockage actuel du Reveal Lab.

Une adaptation légère du cycle de vie du contrôleur de laboratoire est autorisée uniquement pour permettre le changement de vue propre.

---

# Résultat fonctionnel attendu

## Au démarrage

L’application démarre sur :

```text
Révéler
```

Le bouton Révéler est actif.

Le laboratoire de révélation actuel est visible et fonctionne comme avant.

Le bouton Collections n’est plus marqué actif par défaut.

## Clic sur Collections

Le clic sur Collections :

1. désactive visuellement Révéler ;
2. active visuellement Collections ;
3. masque proprement la vue de révélation ;
4. affiche le Carousel Lab ;
5. met à jour le sous-titre du header ;
6. met à jour la zone de progression ou d’information ;
7. monte ou active le contrôleur du carrousel ;
8. n’entraîne aucun rechargement de page.

## Retour sur Révéler

Le clic sur Révéler :

1. détruit ou désactive proprement les interactions du carrousel ;
2. retire les écouteurs spécifiques devenus inutiles ;
3. arrête les timelines ambiantes du Carousel Lab ;
4. masque la vue Collections ;
5. affiche la vue Révéler ;
6. restaure le sous-titre et la progression de révélation ;
7. conserve le fonctionnement du laboratoire existant.

## Boutons réservés

Les boutons Brassopédie et Profil restent visibles.

Pour cette phase :

- ils ne montent aucune nouvelle vue ;
- ils ne déclenchent aucune navigation factice ;
- ils peuvent recevoir `aria-disabled="true"` ;
- ils doivent rester visuellement secondaires ;
- ils ne doivent pas être supprimés.

---

# Architecture recommandée

Créer un routeur de laboratoire simple, sans framework.

Arborescence suggérée :

```text
artifacts/zythohunt/src/
├── lab/
│   ├── lab-router.js
│   ├── reveal-lab-controller.js
│   ├── carousel-lab-controller.js
│   └── carousel-lab-data.js
│
├── carousel/
│   ├── carousel-controller.js
│   ├── carousel-layout.js
│   ├── carousel-motion-tokens.js
│   └── carousel-debug-panel.js
│
└── styles/
    └── carousel.css
```

Cette arborescence peut être légèrement adaptée si le projet actuel justifie une variante plus simple.

Ne migre pas massivement tous les fichiers existants.

---

# Contrat du routeur de laboratoire

API indicative :

```js
const labRouter = createLabRouter({
  routes: {
    reveal: revealLabRoute,
    collections: carouselLabRoute
  },
  navEl,
  initialRoute: "reveal"
});

await labRouter.start();
await labRouter.open("collections");
labRouter.destroy();
```

Chaque route ou contrôleur doit fournir un cycle de vie clair.

Format possible :

```js
{
  async mount() {},
  async activate() {},
  async deactivate() {},
  destroy() {}
}
```

ou :

```js
{
  async mount() {
    return {
      deactivate() {},
      destroy() {}
    };
  }
}
```

Le choix exact est libre, mais les exigences suivantes sont obligatoires :

- aucun écouteur dupliqué après plusieurs changements de vue ;
- aucune instance Draggable orpheline ;
- aucune timeline infinie continuant sur une vue cachée ;
- aucune fuite de références DOM ;
- changement de vue sans rechargement ;
- état actif de la navigation correctement mis à jour ;
- `aria-current="page"` uniquement sur le bouton actif.

---

# Adaptation de `main.js`

Le fichier actuel concentre :

- le boot ;
- le Reveal Lab ;
- les animations ambiantes ;
- le parallaxe ;
- les contrôles du debug panel.

Réorganise-le suffisamment pour permettre les deux vues, mais sans en faire une refonte générale.

Le code de boot doit au minimum :

1. précharger les assets actuels ;
2. initialiser les références DOM ;
3. créer ou préparer les deux vues ;
4. créer le routeur du laboratoire ;
5. démarrer sur `reveal` ;
6. masquer l’écran de chargement ;
7. afficher l’application.

Les animations ambiantes et le parallaxe du Reveal Lab doivent devenir contrôlables :

```js
const ambientController = createAmbientController(...);

ambientController.start();
ambientController.stop();
ambientController.destroy();
```

Une autre API équivalente est acceptable.

Le parallaxe actuel ne doit pas continuer à animer `#grid-container` lorsque la vue Collections est active.

---

# Structure HTML demandée

Conserver les overlays globaux nécessaires à la révélation.

Créer deux zones de vue distinctes dans la zone centrale.

Exemple :

```html
<main id="lab-content">
  <section
    id="reveal-lab-view"
    class="lab-view"
    data-lab-view="reveal"
  >
    <!-- grille existante -->
  </section>

  <section
    id="carousel-lab-view"
    class="lab-view"
    data-lab-view="collections"
    hidden
  >
    <!-- Carousel Lab -->
  </section>
</main>
```

La structure exacte peut varier, mais :

- les deux vues doivent être clairement séparées ;
- l’overlay de révélation reste global ;
- la navigation inférieure reste fixe ;
- le header reste commun ;
- le Carousel Lab ne doit pas être injecté dans la grille 3×3 existante.

Ajouter des attributs de navigation explicites :

```html
<button data-lab-route="reveal">...</button>
<button data-lab-route="collections">...</button>
```

---

# Contenu du Carousel Lab

## Collection de test unique

Créer une seule collection de laboratoire :

```text
Porters & Stouts
```

Ne crée pas de système multi-collections dans cette phase.

## Nombre de cartes

Créer exactement :

```text
12 emplacements
```

Répartir les trois cartes réelles existantes parmi ces emplacements afin de tester le carrousel sur toute sa longueur.

Répartition recommandée :

```text
index 1  → Stout, découverte
index 5  → Imperial Stout, découverte
index 9  → Baltic Porter, découverte
```

Les neuf autres emplacements sont des cartes cachées de laboratoire.

Identifiants recommandés :

```text
lab-hidden-01
lab-hidden-02
...
lab-hidden-09
```

Les cartes cachées :

- affichent uniquement le dos existant ;
- ne possèdent pas de recto visible ;
- ne doivent pas afficher un nom inventé ;
- ne doivent pas charger une nouvelle illustration ;
- ne doivent pas révéler les noms des cartes réelles ;
- ne doivent pas être persistées dans le stockage final ;
- n’utilisent aucun nouvel asset.

Les trois cartes découvertes utilisent les données et assets déjà présents dans :

```text
artifacts/zythohunt/src/data/cards.js
```

## Carte active initiale

Au premier montage du Carousel Lab, centrer :

```text
imperial-stout
```

---

# Composant de carrousel

Créer une API publique claire.

Exemple :

```js
const carousel = createCarousel({
  containerEl,
  stageEl,
  items,
  initialCardId: "imperial-stout",
  tokens,
  onActiveChange,
  onCardActivate
});

carousel.mount();

await carousel.focusCard("stout");
carousel.previous();
carousel.next();

carousel.lock();
carousel.unlock();

carousel.refresh();
carousel.destroy();
```

Capacités obligatoires :

```text
mount
focusCard
previous
next
getActiveCardId
lock
unlock
refresh
destroy
```

Les noms peuvent varier légèrement si l’API reste explicite.

---

# Carrousel limité

Le carrousel doit être strictement borné.

Il ne doit jamais :

- boucler ;
- cloner les cartes pour simuler l’infini ;
- passer de la dernière carte à la première ;
- passer de la première carte à la dernière.

Les positions limites doivent être calculées à partir :

- du nombre de cartes ;
- de l’espacement courant ;
- de la position virtuelle.

Prévoir une résistance visuelle aux extrémités.

Après relâchement, la première ou la dernière carte doit revenir exactement dans son point d’arrêt autorisé.

---

# Géométrie visuelle

Utiliser une scène en perspective.

La carte active :

- est centrée ;
- est la plus grande ;
- est nette ;
- est la plus lumineuse ;
- possède le `z-index` le plus élevé ;
- reste lisible ;
- ne doit pas être coupée par le header ou la navigation.

Les cartes latérales :

- se décalent horizontalement ;
- descendent très légèrement ;
- reculent sur l’axe Z ;
- diminuent progressivement ;
- s’inclinent vers le centre ;
- perdent légèrement en opacité ;
- peuvent recevoir un flou discret ;
- ne doivent pas former un cercle complet.

Utiliser une fonction déterministe fondée sur la distance à l’index actif.

Exemple conceptuel :

```js
function getVisualState(index, activePosition, tokens) {
  const distance = index - activePosition;
  const abs = Math.abs(distance);

  return {
    x: distance * tokens.spacing,
    y: abs * tokens.verticalDrop,
    z: -abs * tokens.depthStep,
    rotateY: distance * -tokens.sideRotation,
    scale: Math.max(
      tokens.minScale,
      1 - abs * tokens.scaleStep
    ),
    opacity: Math.max(
      tokens.minOpacity,
      1 - abs * tokens.opacityStep
    ),
    blur: Math.min(
      tokens.maxBlur,
      abs * tokens.blurStep
    )
  };
}
```

Le mouvement pendant un drag doit être continu.

Ne mets pas à jour uniquement des indices entiers pendant le geste.

---

# Tokens initiaux du Carousel Lab

Créer un fichier séparé :

```text
carousel-motion-tokens.js
```

Valeurs initiales recommandées :

```js
const defaults = {
  spacing: 148,
  verticalDrop: 12,
  depthStep: 105,
  sideRotation: 14,
  scaleStep: 0.11,
  minScale: 0.62,
  opacityStep: 0.18,
  minOpacity: 0.28,
  blurStep: 0.65,
  maxBlur: 2.5,
  snapDuration: 0.5,
  focusDuration: 0.75,
  edgeResistance: 0.72,
  perspective: 1400
};
```

Ces valeurs sont des points de départ.

Elles doivent être ajustables via le panneau laboratoire.

Stockage laboratoire autorisé :

```text
zythohunt_carousel_tokens
```

Ce stockage sert uniquement aux réglages du Carousel Lab.

Il ne doit pas être confondu avec la progression des cartes.

---

# GSAP Draggable

Utiliser le plugin fourni par le package GSAP existant.

Import recommandé :

```js
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);
```

Ne crée aucune nouvelle dépendance NPM.

Ne remplace pas GSAP par une bibliothèque de slider.

Ne crée pas de Swiper, Embla ou autre carrousel externe.

## Stratégie recommandée

Utiliser :

- un proxy de drag invisible ou logique ;
- une position virtuelle continue ;
- une conversion position → index flottant ;
- une fonction unique de rendu des cartes ;
- un snap vers l’index le plus proche au relâchement ;
- des bornes précises ;
- une résistance aux extrémités.

L’InertiaPlugin n’est pas requis dans cette phase.

N’ajoute pas une dépendance ou un plugin supplémentaire uniquement pour l’inertie.

---

# Interactions

## Drag tactile et souris

Le drag doit :

- fonctionner au doigt ;
- fonctionner à la souris ;
- déplacer les cartes en continu ;
- ne pas faire défiler horizontalement la page ;
- conserver le scroll vertical naturel hors zone du carrousel ;
- appliquer une résistance aux limites ;
- snapper sur une carte après relâchement.

Utiliser une règle CSS adaptée :

```css
touch-action: pan-y;
```

sur la zone interactive du carrousel.

## Clic sur carte latérale

Un clic sur une carte latérale :

- centre cette carte ;
- ne lance aucune autre action ;
- utilise `focusCard(cardId)` ;
- respecte les limites.

## Clic sur carte active cachée

Un clic sur la carte active cachée :

- ne la révèle jamais ;
- ne lance pas le moteur de révélation ;
- joue uniquement une micro-réaction verrouillée très courte.

Exemple de sensation :

- léger recul sur Z ;
- petit mouvement horizontal ;
- retour immédiat ;
- aucune lueur de révélation.

## Clic sur carte active découverte

Dans cette phase :

- ne crée pas encore de viewer ;
- ne lance pas la révélation ;
- joue une pulsation ou un halo discret ;
- peut mettre à jour une zone d’information de laboratoire ;
- prépare un callback `onCardActivate` pour la phase suivante.

## Distinction clic et drag

Mesurer le déplacement total.

Seuil recommandé :

```js
const DRAG_CLICK_THRESHOLD = 8;
```

Au-delà du seuil :

- annuler l’action de clic ;
- ne pas ouvrir ;
- ne pas recentrer par le gestionnaire de clic.

---

# Contrôles complémentaires

## Boutons précédent et suivant

Ajouter deux contrôles sobres et accessibles :

```text
Précédente
Suivante
```

Ils peuvent utiliser des chevrons SVG.

Ils doivent :

- appeler `previous()` et `next()` ;
- être désactivés aux limites ;
- posséder des libellés accessibles ;
- ne pas masquer les cartes.

## Clavier

Lorsque le Carousel Lab est actif :

```text
ArrowLeft  → carte précédente
ArrowRight → carte suivante
Home       → première carte
End        → dernière carte
Enter      → activation de la carte active
Space      → activation de la carte active
```

Ne capte pas ces touches lorsque :

- un champ ou contrôle du panneau debug possède le focus ;
- la vue Révéler est active ;
- le carrousel est verrouillé.

---

# Focus programmatique

La méthode :

```js
await carousel.focusCard(cardId);
```

doit :

1. vérifier l’existence de la carte ;
2. calculer sa position cible ;
3. animer la position virtuelle ;
4. mettre à jour toutes les cartes pendant l’animation ;
5. résoudre la Promise lorsque le snap exact est terminé ;
6. mettre à jour l’index actif ;
7. mettre à jour les contrôles ;
8. mettre à jour la zone d’information.

Aucun `setTimeout()` arbitraire.

Utiliser la fin réelle de la tween GSAP.

---

# Informations affichées dans le Carousel Lab

Le header commun devient :

```text
ZYTHOHUNT
Laboratoire des collections
```

La zone de progression ou d’information affiche :

```text
3 / 12 découvertes
```

Sous le carrousel ou dans une zone discrète, afficher :

```text
Carte 6 sur 12
Imperial Stout
```

Pour une carte cachée :

```text
Carte 4 sur 12
Non découverte
```

Ne jamais afficher un nom caché.

---

# Panneau de réglage du Carousel Lab

Le bouton de paramètres existant doit devenir contextuel.

## Vue Révéler

Il ouvre le panneau de réglage de révélation existant.

## Vue Collections

Il ouvre un panneau propre au carrousel.

Créer par exemple :

```text
artifacts/zythohunt/src/carousel/carousel-debug-panel.js
```

Contrôles minimaux :

```text
Espacement
Descente verticale
Profondeur
Rotation latérale
Réduction d’échelle
Échelle minimale
Perte d’opacité
Opacité minimale
Flou par distance
Flou maximal
Durée du snap
Durée du focus
Résistance aux bords
Perspective
```

Chaque modification :

- met à jour le token ;
- actualise immédiatement le carrousel ;
- persiste le réglage de laboratoire ;
- ne recrée pas inutilement tous les éléments.

Ajouter les actions :

```text
Centrer Stout
Centrer Imperial Stout
Centrer Baltic Porter
Réinitialiser les réglages
```

Les boutons de centrage utilisent obligatoirement :

```js
focusCard(cardId)
```

Ils servent de banc de test pour la phase suivante.

---

# Carte et DOM

Réutilise autant que possible les fonctions existantes de création de carte.

Évite de dupliquer intégralement le DOM des faces.

Une généralisation limitée de :

```text
artifacts/zythohunt/src/components/create-card.js
```

est autorisée si elle :

- préserve la grille actuelle ;
- préserve l’animation de révélation ;
- permet de créer une carte de carrousel ;
- permet de choisir l’état initial face dos ou recto ;
- ne modifie pas les assets ;
- ne casse pas `cloneCardForReveal()`.

Si la généralisation présente trop de risque, crée un adaptateur propre au Carousel Lab utilisant les mêmes classes CSS.

Ne duplique pas le code de la carte dans plusieurs gros blocs presque identiques.

---

# Accessibilité

Le Carousel Lab doit être une région nommée :

```html
<section aria-label="Carrousel de la collection Porters et Stouts">
```

La carte active doit être identifiable.

Pour une carte cachée :

```text
Carte non découverte, position 4 sur 12
```

Pour une carte découverte :

```text
Imperial Stout, carte découverte, position 6 sur 12
```

Règles :

- ne pas annoncer le vrai nom d’une carte cachée ;
- `aria-current` ou un état équivalent pour la carte active ;
- boutons précédent et suivant correctement désactivés ;
- focus visible ;
- navigation clavier ;
- zone `aria-live="polite"` pour annoncer le changement de carte ;
- aucune carte latérale inaccessible ne doit recevoir un ordre de tabulation parasite.

---

# Mouvement réduit

Respecter :

```css
@media (prefers-reduced-motion: reduce)
```

En mouvement réduit :

- réduire fortement la durée du focus ;
- supprimer les flottements ambiants ;
- réduire l’inclinaison dynamique ;
- conserver un snap compréhensible ;
- ne pas supprimer la navigation ;
- ne pas faire disparaître les cartes.

Lire la préférence au montage ou via un `MediaQueryList`.

---

# Responsive

## Mobile portrait

Priorité absolue.

La carte active doit :

- rester entièrement visible ;
- conserver le ratio `63 / 88` ;
- ne pas toucher le header ;
- ne pas toucher la navigation ;
- rester suffisamment grande pour être lisible.

Les cartes voisines doivent dépasser partiellement sur les côtés sans créer de scroll horizontal de page.

## iPad

Afficher davantage de profondeur et d’espace sans agrandir excessivement la carte active.

## Desktop

Conserver une carte active raisonnable.

Ne pas étirer le carrousel sur toute la largeur comme une galerie plate.

## Paysage et petite hauteur

Adapter :

- la hauteur de la carte ;
- la marge supérieure ;
- la zone d’information ;
- le positionnement des contrôles.

Utiliser `100dvh` avec fallback si nécessaire.

---

# Performance

Le carrousel doit rester fluide avec 12 cartes.

Exigences :

- privilégier `transform` et `opacity` ;
- éviter de recalculer le DOM complet à chaque mouvement ;
- utiliser `gsap.quickSetter()`, `gsap.quickTo()` ou une stratégie équivalente lorsque pertinent ;
- limiter le blur ;
- retirer `will-change` lorsqu’il n’est plus nécessaire ;
- ne pas créer une nouvelle tween lourde pour chaque pixel du drag ;
- tuer toutes les tweens du carrousel au démontage ;
- détruire l’instance Draggable ;
- annuler les écouteurs avec `AbortController` ou références nommées ;
- recalculer la géométrie sur resize et orientationchange avec debounce ou `requestAnimationFrame`.

---

# Style visuel

Conserver la direction artistique actuelle :

- brasserie sombre ;
- ambre ;
- cuivre ;
- grain ;
- Cinzel ;
- Crimson Text ;
- ombres profondes ;
- halos chauds ;
- sensation premium.

Le carrousel ne doit pas ressembler à :

- un slider e-commerce ;
- une rangée de miniatures ;
- une roue foraine ;
- un cylindre complet ;
- un composant générique de framework.

Le centre doit donner une impression de scène.

Les côtés doivent donner une impression de réserve ou de collection en profondeur.

---

# Ce qui est strictement hors périmètre

Ne réalise pas pendant cette phase :

- raccordement au moteur de révélation ;
- déclenchement d’une révélation depuis le carrousel ;
- fenêtre de saisie ;
- reconnaissance d’un style de bière ;
- stockage définitif des découvertes ;
- migration des indices vers les `cardId` ;
- plusieurs collections ;
- changement de fond par collection ;
- viewer de carte ;
- GSAP Flip ;
- Brassopédie ;
- profil ;
- backend ;
- base de données ;
- PWA ;
- notification ;
- nouveau framework ;
- React ;
- Three.js ;
- Swiper ;
- Embla ;
- nouvelles images ;
- nouvelle carte réelle ;
- nouvelle dépendance NPM.

---

# Fichiers protégés

Ne modifie pas volontairement :

```text
artifacts/zythohunt/src/reveal/reveal-engine.js
artifacts/zythohunt/src/animation/reveal-timeline.js
artifacts/zythohunt/src/animation/motion-tokens.js
artifacts/zythohunt/src/data/cards.js
artifacts/zythohunt/public/assets/
```

Si une modification de l’un de ces fichiers semble indispensable :

1. arrête l’implémentation concernée ;
2. explique la raison ;
3. propose une solution alternative ;
4. ne modifie pas sans approbation.

---

# Fichiers probablement modifiables

```text
artifacts/zythohunt/index.html
artifacts/zythohunt/src/main.js
artifacts/zythohunt/src/styles.css
artifacts/zythohunt/src/components/create-card.js
artifacts/zythohunt/src/lab/reveal-lab-controller.js
```

Créer les nouveaux modules nécessaires dans :

```text
artifacts/zythohunt/src/lab/
artifacts/zythohunt/src/carousel/
artifacts/zythohunt/src/styles/
```

---

# Configuration et lancement

Le projet possède déjà une configuration Replit et PNPM workspace.

N’ajoute pas de nouveau gestionnaire de paquets.

Installation :

```bash
pnpm install
```

Lancement recommandé depuis la racine :

```bash
PORT=8080 pnpm --filter @workspace/zythohunt run dev
```

Ou utilise le workflow Replit existant s’il lance correctement l’application.

Vérifications :

```bash
pnpm --filter @workspace/zythohunt run typecheck
pnpm --filter @workspace/zythohunt run build
```

Ne modifie pas `.replit` si le workflow existant fonctionne.

Ne modifie pas `vite.config.ts` sans nécessité démontrée.

---

# Vérifications manuelles obligatoires

## Reveal Lab

- [ ] L’application démarre sur Révéler.
- [ ] La grille actuelle est visible.
- [ ] La révélation complète fonctionne.
- [ ] La révélation rapide fonctionne.
- [ ] Le bouton Continuer fonctionne.
- [ ] Le bouton Voir la fiche fonctionne.
- [ ] Le panneau debug de révélation fonctionne.
- [ ] Le retour vers la grille fonctionne.
- [ ] Aucune erreur console bloquante.

## Navigation

- [ ] Révéler devient actif au démarrage.
- [ ] Collections ouvre le Carousel Lab.
- [ ] `aria-current` suit la vue active.
- [ ] Le header change correctement.
- [ ] Le compteur change correctement.
- [ ] Brassopédie et Profil restent réservés.
- [ ] Vingt allers-retours entre Révéler et Collections ne dupliquent pas les événements.

## Carousel Lab

- [ ] 12 cartes sont présentes.
- [ ] 3 cartes sont face recto.
- [ ] 9 cartes sont face dos.
- [ ] Imperial Stout est active au premier montage.
- [ ] Le drag tactile fonctionne.
- [ ] Le drag souris fonctionne.
- [ ] Le snap fonctionne.
- [ ] Les limites fonctionnent.
- [ ] Le carrousel ne boucle pas.
- [ ] Les chevrons fonctionnent.
- [ ] Le clavier fonctionne.
- [ ] Home et End fonctionnent.
- [ ] Un clic latéral centre la carte.
- [ ] Un drag ne déclenche pas un clic.
- [ ] Une carte cachée active ne se révèle pas.
- [ ] Une carte découverte active ne lance pas la révélation.
- [ ] `focusCard("stout")` fonctionne.
- [ ] `focusCard("imperial-stout")` fonctionne.
- [ ] `focusCard("baltic-porter")` fonctionne.
- [ ] Le panneau de réglage actualise immédiatement le rendu.
- [ ] La réinitialisation des tokens fonctionne.
- [ ] Le resize recalcule correctement le carrousel.
- [ ] Le paysage reste utilisable.
- [ ] Le mouvement réduit reste utilisable.

---

# Tests techniques obligatoires

Exécute :

```bash
pnpm --filter @workspace/zythohunt run typecheck
pnpm --filter @workspace/zythohunt run build
```

Signale clairement :

- la commande exécutée ;
- le résultat ;
- les erreurs ;
- les avertissements ;
- les éventuels tests impossibles dans l’environnement Replit.

---

# Critères d’acceptation

La mission est terminée uniquement si :

## Navigation

- [ ] Le laboratoire actuel contient deux vues.
- [ ] Révéler ouvre la vue existante.
- [ ] Collections ouvre le Carousel Lab.
- [ ] Le changement de vue ne recharge pas la page.
- [ ] Les contrôleurs ont un cycle de vie propre.
- [ ] Aucun écouteur n’est dupliqué.

## Carrousel

- [ ] Le carrousel est limité.
- [ ] Il contient 12 emplacements.
- [ ] Il utilise GSAP Draggable.
- [ ] Il n’utilise aucune bibliothèque de slider.
- [ ] Il possède une position virtuelle continue.
- [ ] Il snap correctement.
- [ ] Il respecte ses limites.
- [ ] Il expose `focusCard(cardId)`.
- [ ] Il expose `previous()` et `next()`.
- [ ] Il expose `destroy()`.
- [ ] Il fonctionne tactile, souris et clavier.
- [ ] Il distingue clic et drag.
- [ ] Les cartes cachées ne sont jamais révélées.

## Laboratoire

- [ ] Les tokens sont réglables.
- [ ] Les valeurs sont persistées séparément.
- [ ] Trois boutons testent le focus programmatique.
- [ ] Le reset des tokens fonctionne.
- [ ] La vue révèle reste intacte.

## Qualité

- [ ] Le moteur de révélation n’a pas été modifié.
- [ ] La timeline de révélation n’a pas été modifiée.
- [ ] Aucun asset n’a été ajouté.
- [ ] Aucune dépendance NPM n’a été ajoutée.
- [ ] Le build réussit.
- [ ] Le typecheck réussit.
- [ ] Aucun scroll horizontal parasite.
- [ ] Aucun Draggable orphelin après démontage.
- [ ] Aucune timeline infinie active sur une vue cachée.
- [ ] Le code est commenté uniquement lorsque nécessaire.
- [ ] Les responsabilités sont séparées.

---

# Livrable final demandé

À la fin :

1. résume l’architecture créée ;
2. liste les fichiers créés ;
3. liste les fichiers modifiés ;
4. indique les valeurs finales des tokens du carrousel ;
5. explique le fonctionnement du drag et du snap ;
6. explique le cycle de vie au changement de vue ;
7. donne les résultats du typecheck ;
8. donne les résultats du build ;
9. signale tout défaut connu ;
10. signale tout point volontairement reporté ;
11. crée un commit logique sur `lab/carousel`.

Message de commit recommandé :

```text
feat(lab): add bounded carousel prototype
```

Après validation et commit :

- pousse la branche `lab/carousel` vers GitHub si l’authentification est disponible ;
- ne crée pas de merge automatique ;
- ne fusionne pas dans `main` ;
- indique le SHA du commit ;
- indique si le push a réussi.

---

# Rappel final

Le but n’est pas encore de révéler une carte depuis le carrousel.

Le but est de construire un banc d’essai premium, réglable et stable pour la mécanique du futur carrousel de collections.

La révélation sera raccordée dans une phase ultérieure, lorsque le mouvement du carrousel aura été validé.
