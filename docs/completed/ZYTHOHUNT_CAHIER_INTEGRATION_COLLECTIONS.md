# ZythoHunt
## Cahier d’intégration des collections, carrousels et révélations

**Statut :** cahier technique de référence  
**Version :** 1.0  
**Date :** 18 juin 2026  
**Dépôt analysé :** `christolosier-ship-it/ZythoHunt-Reveal-Lab`  
**Branche analysée :** `main`  
**Prototype de référence :** ZythoHunt Reveal Lab publié sur GitHub Pages  
**Technologies conservées :** HTML, CSS, JavaScript vanilla, Vite, GSAP

---

# 1. Objet du document

Ce document définit l’intégration du prototype actuel de révélation de cartes dans le futur système de collections de ZythoHunt.

Il constitue la référence commune pour :

- la conception fonctionnelle ;
- l’architecture technique ;
- la refactorisation du Reveal Lab ;
- la construction des carrousels de collections ;
- le raccordement du champ de saisie à la bonne carte ;
- l’enregistrement des découvertes ;
- l’agrandissement des cartes révélées ;
- l’accès à la Brassopédie ;
- le travail confié à Codex ;
- les prototypes et réglages réalisés dans Replit ;
- la validation finale.

L’objectif n’est pas de réécrire le prototype. L’objectif est d’en extraire un moteur de révélation autonome, réutilisable et stable, puis de construire autour de lui le parcours complet des collections.

---

# 2. Vision fonctionnelle validée

## 2.1 Principe général

ZythoHunt contient plusieurs collections de cartes.

Chaque collection dispose de son propre carrousel :

- horizontal ;
- limité ;
- non infini ;
- clairement borné par une première et une dernière carte ;
- adapté au tactile, à la souris et au clavier ;
- constitué de cartes face dos ou face recto selon leur état de découverte.

## 2.2 Règle fondamentale de révélation

Une carte non découverte ne peut jamais être révélée par un clic dans le carrousel.

La seule entrée normale pour une nouvelle découverte est la fenêtre dédiée de révélation contenant un champ de saisie.

Le parcours attendu est le suivant :

1. L’utilisateur ouvre la fenêtre de révélation.
2. Il saisit un style de bière.
3. L’application normalise et analyse la saisie.
4. Une carte correspondante est identifiée.
5. La collection de cette carte est ouverte.
6. Le carrousel se déplace automatiquement jusqu’à la carte concernée.
7. La carte est parfaitement centrée.
8. Les interactions du carrousel sont verrouillées.
9. L’animation de révélation existante se déclenche.
10. La carte est enregistrée comme découverte uniquement lorsque le recto a réellement été révélé.
11. La carte revient dans son emplacement du carrousel.
12. Elle reste désormais visible face recto.
13. Elle devient cliquable pour être agrandie.
14. La vue agrandie propose un accès à la Brassopédie.

Flux de référence :

```text
Fenêtre de saisie
        ↓
Résolution du style
        ↓
Identification carte + collection
        ↓
Ouverture de la collection
        ↓
Focus automatique du carrousel
        ↓
Révélation GSAP
        ↓
Enregistrement de la découverte
        ↓
Retour de la carte recto dans le carrousel
        ↓
Agrandissement possible
        ↓
Brassopédie
```

## 2.3 Comportement des cartes non découvertes

Une carte non découverte :

- affiche uniquement son dos ;
- peut être visible dans le carrousel ;
- peut être centrée par navigation ;
- ne révèle aucune donnée cachée ;
- ne peut pas être agrandie ;
- ne donne pas accès à la Brassopédie ;
- ne lance jamais l’animation de révélation par clic ;
- peut produire une micro-réaction visuelle discrète lorsqu’elle est touchée au centre.

La micro-réaction ne doit pas ressembler à un début de révélation. Elle peut prendre la forme d’un léger recul, d’une résistance ou d’une vibration visuelle très courte.

## 2.4 Comportement des cartes découvertes

Une carte découverte :

- affiche son recto dans le carrousel ;
- peut être centrée ;
- peut être ouverte dans une vue agrandie ;
- peut donner accès à la Brassopédie ;
- reste découverte après fermeture ou rechargement de l’application.

## 2.5 Style déjà découvert

Comportement retenu par défaut pour la V1 :

- ne pas rejouer automatiquement la grande animation ;
- ouvrir la bonne collection ;
- centrer la carte ;
- produire un halo ou une pulsation courte ;
- afficher un message discret indiquant que la carte est déjà découverte ;
- permettre son ouverture dans le viewer.

Le rejeu complet de l’animation reste disponible uniquement dans le laboratoire ou dans un éventuel bouton explicite de rejeu ultérieur.

---

# 3. Périmètre

## 3.1 Inclus dans l’intégration

- refactorisation du Reveal Lab ;
- conservation du rendu de révélation validé ;
- création d’un moteur de révélation autonome ;
- nouveau modèle de données des cartes et collections ;
- carrousel limité par collection ;
- navigation tactile, souris et clavier ;
- focus programmatique sur une carte ;
- fenêtre de saisie ;
- résolution des styles et alias ;
- persistance des découvertes par identifiant stable ;
- migration du stockage actuel ;
- retour de la carte révélée dans le carrousel ;
- viewer d’une carte découverte ;
- bouton ou action vers la Brassopédie ;
- gestion des interactions simultanées ;
- accessibilité minimale ;
- mode de mouvement réduit ;
- tests fonctionnels et de non-régression ;
- compatibilité Replit et GitHub Pages.

## 3.2 Hors périmètre de cette intégration

- reconnaissance visuelle d’une bière ;
- scanner de code-barres ou QR code ;
- compte utilisateur ou synchronisation cloud ;
- backend ;
- mode multijoueur ;
- achat ou échange de cartes ;
- carrousel infini ;
- révélation aléatoire ;
- migration vers React ;
- migration vers Three.js ou WebGL ;
- refonte complète de la Brassopédie ;
- création définitive de toutes les collections et de tous leurs assets.

---

# 4. Principes techniques non négociables

1. **Conserver HTML, CSS et JavaScript vanilla.**
2. **Conserver Vite.**
3. **Conserver GSAP comme moteur d’animation.**
4. **Ne pas migrer le projet vers React.**
5. **Ne pas remplacer la timeline validée sans justification.**
6. **Ne pas ajouter une bibliothèque de carrousel externe.**
7. **Ne pas utiliser un index visuel comme identifiant de carte.**
8. **Ne pas déclencher une révélation depuis un clic sur une carte cachée.**
9. **Ne pas utiliser de temporisations arbitraires pour chaîner le parcours.**
10. **Chaque étape asynchrone doit retourner une Promise résolue lorsque son animation est réellement terminée.**
11. **Le carrousel et le moteur de révélation doivent rester indépendants.**
12. **Le moteur de révélation ne doit ni router, ni stocker, ni résoudre un style.**
13. **La progression ne doit pas être codée en dur.**
14. **Les assets doivent utiliser le système `BASE_URL` déjà présent pour rester compatibles avec GitHub Pages.**
15. **Toute modification doit préserver le mode `prefers-reduced-motion`.**

---

# 5. Audit du Reveal Lab actuel

## 5.1 Structure observée

L’application réellement publiée est une application Vite en JavaScript vanilla.

Le package `artifacts/zythohunt` utilise :

- Vite ;
- GSAP ;
- un HTML principal ;
- des modules JavaScript ;
- une feuille CSS centrale ;
- des assets publics ;
- un système d’URL compatible Replit et GitHub Pages.

Le workspace contient de nombreuses dépendances génériques React et Replit, mais elles ne justifient pas une migration de ZythoHunt. Le produit publié charge directement `src/main.js`.

## 5.2 Responsabilités actuelles par fichier

| Fichier actuel | Responsabilité actuelle | Statut pour l’intégration |
|---|---|---|
| `artifacts/zythohunt/index.html` | structure principale, grille, overlay de révélation, panneau de fiche, laboratoire, navigation | à adapter |
| `src/main.js` | boot, préchargement, références DOM, création de grille, contrôleur, ambiance, parallaxe | à alléger fortement |
| `src/data/cards.js` | données des trois cartes du laboratoire | à enrichir |
| `src/components/create-grid.js` | création de la grille 3×3, positionnement 0/4/8, stockage de la progression | à retirer du produit final ou conserver uniquement en laboratoire |
| `src/components/create-card.js` | création du DOM des cartes et des clones | à généraliser |
| `src/components/create-debug-panel.js` | réglage des tokens de mouvement | à conserver en mode laboratoire |
| `src/animation/reveal-controller.js` | clics, verrouillage, animation, stockage, progression, fiche, retour | à scinder |
| `src/animation/reveal-timeline.js` | timeline GSAP principale et révélation rapide | cœur à conserver |
| `src/animation/motion-tokens.js` | valeurs et stockage des réglages d’animation | à conserver et compléter |
| `src/utils/geometry.js` | capture de position et déplacement des voisins de grille | à scinder |
| `src/utils/preload-assets.js` | préchargement du dos, du cadre et de toutes les cartes | à rendre progressif |
| `src/utils/asset-url.js` | résolution des assets avec `BASE_URL` | à conserver |
| `src/styles.css` | tous les styles du laboratoire | à découper progressivement |
| `vite.config.ts` | base dynamique, build et compatibilité Replit | à conserver |

## 5.3 Points forts à préserver

Le prototype contient déjà plusieurs fondations solides :

- carte en deux faces avec `preserve-3d` ;
- clone positionné à partir de la vraie carte ;
- calcul par `getBoundingClientRect()` ;
- timeline GSAP découpée en phases lisibles ;
- tokens de mouvement modifiables ;
- gestion du mouvement réduit ;
- préchargement des assets ;
- utilitaire `assetUrl()` compatible GitHub Pages ;
- séparation partielle entre données, création de carte et animation ;
- overlay de révélation ;
- panneau laboratoire ;
- animation de retour vers l’emplacement d’origine.

Ces éléments ne doivent pas être jetés. Ils doivent être isolés, nettoyés et raccordés au nouveau parcours.

## 5.4 Couplages et limites actuels

### Critique

#### Révélation déclenchée par clic

Le contrôleur attache actuellement un clic à chaque carte révélable et appelle directement la révélation.

Ce comportement est incompatible avec la règle produit validée.

#### Progression stockée par indice de grille

La progression actuelle utilise les indices `0`, `4` et `8`.

Ce stockage devient invalide dès que :

- l’ordre change ;
- une carte est ajoutée ;
- une collection est divisée ;
- le carrousel remplace la grille.

La progression doit être stockée par `cardId`.

#### Géométrie des voisins strictement 3×3

`computeNeighborShifts()` suppose une grille de trois colonnes.

Cette logique ne peut pas être utilisée directement pour un carrousel.

### Important

#### Contrôleur trop chargé

Le contrôleur actuel gère simultanément :

- les interactions ;
- la logique de découverte ;
- le stockage ;
- la progression ;
- la timeline ;
- le retour ;
- la fiche ;
- le rejeu ;
- le clavier.

Il doit être scindé en modules spécialisés.

#### Variables globales d’animation

Les variables d’état du contrôleur sont déclarées au niveau du module.

Cela interdit proprement plusieurs instances et augmente le risque d’état résiduel.

Elles doivent devenir privées à l’instance du moteur.

#### Progression codée en dur

Le texte de progression est construit avec `/ 3`.

Il doit dépendre du nombre réel de cartes de la collection.

#### Préchargement global

Le laboratoire précharge toutes les images de cartes.

Cette méthode ne sera pas acceptable avec plusieurs collections.

Il faudra précharger :

- les assets communs au démarrage ;
- les cartes de la collection ouverte ;
- la carte ciblée avant une révélation ;
- éventuellement les cartes voisines.

#### Écouteurs globaux non destructibles

Les écouteurs `document` et les écouteurs des cartes ne disposent pas tous d’une méthode de nettoyage.

Chaque module montable doit exposer `destroy()`.

### Nettoyage recommandé

Les points suivants devront être vérifiés et nettoyés pendant la refactorisation :

- token `finalScale` actuellement non exploité par la timeline principale ;
- import ou utilitaire `offsetToCenter` non nécessaire dans la timeline actuelle ;
- import `CARD_BACK_URL` inutile dans le contrôleur ;
- variables intermédiaires non utilisées ;
- suivi `touchMoved` actuellement sans effet sur le clic final ;
- `aria-hidden` du recto à mettre à jour après découverte ;
- distinction entre carte décorative, carte cachée et carte découverte ;
- valeur de hauteur disponible actuellement dérivée d’une marge fixe de `120px`.

Le nettoyage ne doit pas modifier le rendu validé pendant le premier lot de refactorisation.

---

# 6. Architecture cible

## 6.1 Vue d’ensemble

```text
App
├── AppNavigation
├── RevealSearch
├── DiscoveryFlow
│   ├── BeerResolver
│   ├── CollectionController
│   │   └── CollectionCarousel
│   ├── RevealEngine
│   ├── DiscoveryStore
│   └── CardViewer
├── BrassopediaRouter
├── CardFactory
├── AssetPreloader
└── MotionTokens
```

## 6.2 Responsabilités

### `DiscoveryFlow`

Orchestrateur unique du parcours.

Il décide dans quel ordre appeler les autres modules, mais ne contient pas la logique interne du carrousel ou de la timeline.

### `BeerResolver`

Transforme une saisie utilisateur en résultat précis :

```js
{
  cardId: "imperial-stout",
  collectionId: "porters-stouts"
}
```

### `CollectionController`

Ouvre, ferme ou change la collection affichée.

Il fournit l’instance de carrousel active.

### `CollectionCarousel`

Affiche les cartes d’une collection et gère :

- position active ;
- limites ;
- swipe ;
- souris ;
- clavier ;
- focus programmatique ;
- état face dos ou recto ;
- verrouillage temporaire.

### `RevealEngine`

Joue uniquement l’animation de révélation.

Il reçoit :

- l’élément carte source ;
- les données de la carte ;
- la scène ;
- les éléments de contexte à atténuer ;
- des callbacks ou options de contexte.

Il retourne une Promise.

### `DiscoveryStore`

Charge, migre, valide et enregistre la progression.

### `CardViewer`

Agrandit une carte déjà découverte et fournit le bouton Brassopédie.

### `BrassopediaRouter`

Traduit un `brassopediaId` en navigation réelle.

La première intégration peut utiliser un callback ou un routeur temporaire sans coupler le viewer à une URL définitive.

---

# 7. Arborescence cible

```text
artifacts/zythohunt/
├── index.html
├── package.json
├── vite.config.ts
├── public/
│   └── assets/
└── src/
    ├── main.js
    ├── app/
    │   ├── create-app.js
    │   └── app-state.js
    ├── data/
    │   ├── cards.js
    │   ├── collections.js
    │   └── aliases.js
    ├── discovery/
    │   ├── discovery-flow.js
    │   ├── beer-resolver.js
    │   └── discovery-store.js
    ├── collections/
    │   ├── collection-controller.js
    │   └── collection-view.js
    ├── carousel/
    │   ├── carousel-controller.js
    │   ├── carousel-layout.js
    │   └── carousel-input.js
    ├── reveal/
    │   ├── reveal-engine.js
    │   ├── reveal-timeline.js
    │   └── motion-tokens.js
    ├── cards/
    │   ├── create-card.js
    │   └── card-viewer.js
    ├── brassopedia/
    │   └── brassopedia-router.js
    ├── ui/
    │   ├── reveal-search.js
    │   ├── app-navigation.js
    │   └── feedback.js
    ├── utils/
    │   ├── asset-url.js
    │   ├── preload-assets.js
    │   ├── normalize-text.js
    │   └── geometry.js
    └── styles/
        ├── tokens.css
        ├── base.css
        ├── cards.css
        ├── carousel.css
        ├── reveal.css
        ├── viewer.css
        └── lab.css
```

Le découpage CSS peut être réalisé progressivement. Il n’est pas obligatoire de scinder toute la feuille avant le premier prototype fonctionnel.

---

# 8. Modèle de données

## 8.1 Carte

```js
{
  id: "imperial-stout",
  collectionId: "porters-stouts",
  order: 20,

  name: "Imperial Stout",
  type: "Style brassicole",
  path: "Stout › Imperial Stout",
  tagline: "Monumentale, dense et intensément torréfiée.",

  aliases: [
    "imperial stout",
    "stout imperial",
    "stout impérial",
    "russian imperial stout"
  ],

  image: "/assets/collections/porters-stouts/cards/imperial-stout.webp",
  brassopediaId: "imperial-stout",

  revealTheme: "amber"
}
```

### Champs obligatoires

- `id`
- `collectionId`
- `order`
- `name`
- `type`
- `path`
- `tagline`
- `aliases`
- `image`
- `brassopediaId`

### Contraintes

- `id` est unique dans toute l’application ;
- `collectionId` doit référencer une collection existante ;
- `order` détermine la place dans le carrousel ;
- les alias ne doivent pas créer de correspondance ambiguë ;
- aucun nom caché ne doit être rendu dans le DOM d’une carte non découverte ;
- les données de carte peuvent exister en mémoire, mais ne doivent pas être exposées visuellement ou dans les attributs accessibles de la carte cachée.

## 8.2 Collection

```js
{
  id: "porters-stouts",
  name: "Porters & Stouts",
  subtitle: "Noirs, torréfiés et profonds",
  order: 10,

  background: "/assets/collections/porters-stouts/background.webp",
  cardBack: "/assets/collections/porters-stouts/card-back.webp",
  cardFrame: "/assets/collections/porters-stouts/card-front-frame.svg",

  cardIds: [
    "stout",
    "imperial-stout",
    "baltic-porter"
  ]
}
```

### Contraintes

- `id` est unique ;
- `cardIds` ne contient aucun doublon ;
- chaque carte référencée possède le même `collectionId` ;
- l’ordre du carrousel dépend de `order` ou de l’ordre explicite de `cardIds` ;
- la collection fournit ses assets visuels sans les coder en dur dans le moteur de carte.

## 8.3 Progression persistée

Nouvelle clé recommandée :

```text
zythohunt_progress_v2
```

Format :

```js
{
  schemaVersion: 2,

  discovered: {
    "stout": {
      discoveredAt: "2026-06-18T18:42:00.000Z"
    },
    "imperial-stout": {
      discoveredAt: "2026-06-18T18:45:00.000Z"
    }
  },

  activeCardByCollection: {
    "porters-stouts": "imperial-stout"
  },

  lastCollectionId: "porters-stouts"
}
```

### Principes

- la découverte est identifiée par `cardId` ;
- les données inconnues sont ignorées sans faire planter l’application ;
- un schéma versionné permet des migrations ultérieures ;
- l’écriture est centralisée dans `DiscoveryStore` ;
- aucun composant visuel n’écrit directement dans `localStorage`.

## 8.4 Migration du laboratoire

Ancienne clé :

```text
zythohunt_revealed
```

Correspondance actuelle :

```js
{
  0: "stout",
  4: "imperial-stout",
  8: "baltic-porter"
}
```

Migration :

1. lire `zythohunt_progress_v2` ;
2. si valide, l’utiliser ;
3. sinon lire `zythohunt_revealed` ;
4. convertir les indices connus en `cardId` ;
5. écrire le nouveau format ;
6. conserver temporairement l’ancienne clé pendant une version ;
7. supprimer l’ancienne clé dans une version ultérieure.

Les indices inconnus doivent être ignorés.

---

# 9. Résolution des styles

## 9.1 Normalisation

La saisie doit être normalisée avant comparaison :

```js
export function normalizeBeerName(value) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[-_’']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
```

Exemples équivalents :

```text
Imperial Stout
imperial stout
IMPERIAL-STOUT
stout impérial
stout imperial
```

## 9.2 Stratégie de correspondance V1

Ordre recommandé :

1. nom canonique exact après normalisation ;
2. alias exact après normalisation ;
3. aucune reconnaissance floue automatique.

La V1 ne doit pas utiliser une distance de Levenshtein large ou une recherche approximative qui pourrait révéler une mauvaise carte.

## 9.3 Résultat

```js
{
  status: "matched",
  cardId: "imperial-stout",
  collectionId: "porters-stouts"
}
```

Autres statuts :

```js
{ status: "unknown" }
```

```js
{
  status: "ambiguous",
  candidateIds: ["example-a", "example-b"]
}
```

Une ambiguïté ne doit pas afficher les noms de cartes cachées. Elle doit demander une saisie plus précise.

## 9.4 API recommandée

```js
const resolver = createBeerResolver({ cards });

const result = resolver.resolve(userInput);
```

Le résolveur doit être pur et facilement testable.

---

# 10. Contrat du carrousel

## 10.1 API publique

```js
const carousel = createCarousel({
  containerEl,
  cards,
  discoveryStore,
  onActiveChange,
  onDiscoveredCardOpen
});

carousel.mount();

await carousel.focusCard("imperial-stout", {
  animate: true,
  source: "reveal"
});

carousel.lock();
carousel.unlock();

carousel.setDiscovered("imperial-stout", true);

const cardEl = carousel.getCardElement("imperial-stout");
const activeId = carousel.getActiveCardId();

carousel.destroy();
```

## 10.2 Carrousel limité

Le carrousel :

- possède une borne minimale ;
- possède une borne maximale ;
- ne boucle jamais ;
- applique une résistance visuelle aux extrémités ;
- se verrouille sur la carte la plus proche après un glissement ;
- ne produit jamais un clone infini de cartes.

## 10.3 Disposition visuelle

La carte active :

- est centrée ;
- est la plus grande ;
- est la plus nette ;
- est la plus lumineuse ;
- possède le `z-index` le plus élevé ;
- peut respirer très légèrement lorsqu’aucune interaction n’est en cours.

Les cartes voisines :

- sont décalées horizontalement ;
- reculent en profondeur ;
- diminuent progressivement ;
- s’inclinent vers le centre ;
- perdent légèrement en luminosité ;
- peuvent recevoir un flou limité.

Les cartes éloignées :

- restent présentes uniquement si elles apportent une information de continuité ;
- peuvent être masquées au-delà d’une distance définie ;
- ne doivent pas dégrader les performances.

## 10.4 Géométrie pilotée par distance

```js
function getCardVisualState(index, activeIndex) {
  const distance = index - activeIndex;
  const abs = Math.abs(distance);

  return {
    x: distance * spacing,
    y: abs * verticalDrop,
    z: -abs * depthStep,
    rotateY: distance * -sideRotation,
    scale: Math.max(minScale, 1 - abs * scaleStep),
    opacity: Math.max(minOpacity, 1 - abs * opacityStep)
  };
}
```

Les valeurs finales doivent provenir de tokens centralisés et réglables dans le laboratoire.

## 10.5 Entrées utilisateur

### Tactile et souris

Utiliser GSAP Draggable.

```js
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);
```

La V1 ne dépend pas d’un plugin d’inertie supplémentaire.

Le carrousel peut utiliser :

- une position virtuelle ;
- un proxy invisible ;
- un snap calculé à la fin du drag ;
- des limites en pixels ;
- une résistance aux bords.

### Clavier

- `ArrowLeft` : carte précédente ;
- `ArrowRight` : carte suivante ;
- `Enter` ou `Espace` sur une carte découverte active : ouvrir le viewer ;
- `Enter` ou `Espace` sur une carte cachée : aucune révélation.

### Clic

- carte latérale : centrer ;
- carte centrale cachée : micro-réaction verrouillée ;
- carte centrale découverte : ouvrir le viewer.

## 10.6 Distinction clic et glissement

Le module doit mesurer le déplacement réel.

Exemple :

```js
const DRAG_CLICK_THRESHOLD = 8;
```

Un déplacement supérieur au seuil annule l’ouverture par clic.

Cette logique doit remplacer le suivi tactile actuel incomplet.

## 10.7 Focus programmatique

`focusCard(cardId)` doit :

1. vérifier que la carte appartient au carrousel ;
2. verrouiller les entrées concurrentes ;
3. calculer l’index cible ;
4. animer la position virtuelle ;
5. appliquer le snap exact ;
6. résoudre la Promise uniquement lorsque la carte est réellement centrée ;
7. mettre à jour l’état actif ;
8. laisser le verrouillage général à l’orchestrateur lorsque l’appel vient d’une révélation.

Aucun `setTimeout()` ne doit servir à estimer la fin.

---

# 11. Contrat du moteur de révélation

## 11.1 Objectif

Transformer le contrôleur actuel en moteur autonome.

API recommandée :

```js
const revealEngine = createRevealEngine({
  stageEl,
  overlayEl,
  actionsEl,
  motionTokens
});

const result = await revealEngine.reveal({
  cardEl,
  cardData,
  context: {
    backgroundEl,
    headerEl,
    navEl,
    neighborEls
  }
});
```

Résultat :

```js
{
  status: "completed",
  cardId: "imperial-stout"
}
```

## 11.2 Responsabilités autorisées

Le moteur peut :

- capturer la position de la carte ;
- créer le clone ;
- masquer temporairement l’original ;
- isoler la scène ;
- agrandir la carte ;
- jouer la tension, le reflet, le flip et la construction du recto ;
- stabiliser la carte ;
- afficher les actions de fin ;
- ramener la carte vers son emplacement ;
- restaurer l’original ;
- nettoyer ses timelines et son clone ;
- respecter le mouvement réduit.

## 11.3 Responsabilités interdites

Le moteur ne doit pas :

- écouter les clics des cartes ;
- résoudre un style ;
- changer de collection ;
- déplacer le carrousel jusqu’à une carte ;
- écrire dans `localStorage` ;
- calculer la progression ;
- décider si une carte est déjà découverte ;
- construire une fiche Brassopédie ;
- connaître la totalité des cartes de l’application.

## 11.4 Conservation de la timeline

Les phases actuelles doivent être conservées pendant le premier lot :

1. isolation de la scène ;
2. retrait des éléments voisins ;
3. extraction ;
4. tension lumineuse ;
5. retournement 3D ;
6. construction du recto ;
7. signature lumineuse ;
8. stabilisation.

La première refactorisation doit être visuellement neutre.

Toute évolution de durée, d’easing, de taille ou de halo doit être réalisée dans un lot séparé après validation de la non-régression.

## 11.5 Gestion des voisins

La fonction de grille 3×3 ne doit pas être transférée telle quelle.

Deux responsabilités séparées :

- le carrousel anime le retrait de ses cartes voisines ;
- le moteur anime la carte ciblée.

Le moteur peut appeler des callbacks de contexte :

```js
await context.isolate();
await context.restore();
```

ou recevoir une liste d’éléments avec un mouvement générique indépendant de la grille.

La première solution est recommandée.

## 11.6 Retour dans le carrousel

À la fermeture de la révélation :

1. récupérer à nouveau l’élément original ;
2. recalculer son `getBoundingClientRect()` ;
3. animer le clone vers ce nouveau rectangle ;
4. préparer l’original en face recto ;
5. rendre l’original visible ;
6. retirer le clone ;
7. restaurer la scène ;
8. résoudre la Promise de fermeture ;
9. déverrouiller le parcours.

Le rectangle ne doit pas être réutilisé depuis le début de l’animation, car l’orientation ou la disposition peut avoir changé.

## 11.7 État interne

Les variables suivantes doivent être privées à l’instance :

```js
let state = "idle";
let currentTimeline = null;
let currentClone = null;
let currentCardId = null;
```

États minimaux :

```text
idle
preparing
revealing
complete
returning
destroyed
```

## 11.8 Nettoyage

Le moteur expose :

```js
revealEngine.destroy();
```

Cette méthode doit :

- tuer les timelines ;
- retirer le clone ;
- restaurer l’original ;
- nettoyer les écouteurs ;
- restaurer l’overlay ;
- remettre l’état à `destroyed`.

---

# 12. Orchestrateur de découverte

## 12.1 API

```js
const flow = createDiscoveryFlow({
  resolver,
  collectionController,
  revealEngine,
  discoveryStore,
  viewer,
  feedback
});

await flow.submit(userInput);
```

## 12.2 Algorithme

```js
async function submit(input) {
  if (state !== "idle") return;

  state = "resolving";

  const result = resolver.resolve(input);

  if (result.status === "unknown") {
    feedback.showUnknownStyle();
    state = "idle";
    return;
  }

  if (result.status === "ambiguous") {
    feedback.showAmbiguousStyle();
    state = "idle";
    return;
  }

  const card = getCard(result.cardId);

  lockApplication();

  try {
    await revealSearch.close();

    state = "opening-collection";
    const carousel = await collectionController.open(card.collectionId);

    state = "focusing";
    await carousel.focusCard(card.id, { animate: true, source: "reveal" });

    if (discoveryStore.isDiscovered(card.id)) {
      await carousel.highlight(card.id);
      feedback.showAlreadyDiscovered(card);
      state = "idle";
      unlockApplication();
      return;
    }

    state = "revealing";

    const cardEl = carousel.getCardElement(card.id);

    await revealEngine.reveal({
      cardEl,
      cardData: card,
      context: carousel.createRevealContext(card.id)
    });

    discoveryStore.markDiscovered(card.id);
    carousel.setDiscovered(card.id, true);

    state = "complete";
    feedback.showDiscoveryComplete(card);
  } finally {
    state = "idle";
    unlockApplication();
  }
}
```

## 12.3 Verrouillage global

Pendant le parcours :

- le champ ne peut pas être soumis une seconde fois ;
- la navigation de collection est bloquée ;
- le carrousel est bloqué pendant la révélation ;
- le viewer ne peut pas s’ouvrir ;
- la navigation principale ne doit pas interrompre la timeline ;
- les doubles clics sont ignorés.

Le verrouillage doit être levé dans un `finally` afin d’éviter une application bloquée après une erreur.

---

# 13. Viewer de carte découverte

## 13.1 Fonction

Le viewer n’est pas la révélation.

Il sert à consulter calmement une carte déjà découverte.

## 13.2 API

```js
const viewer = createCardViewer({
  overlayEl,
  stageEl,
  onBrassopediaRequest
});

await viewer.open({
  cardEl,
  cardData
});

await viewer.close();
```

## 13.3 GSAP Flip

GSAP Flip est recommandé pour le viewer, pas pour remplacer la timeline de révélation.

```js
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);
```

Parcours :

1. capturer l’état de la carte ;
2. transférer ou cloner la carte dans le viewer ;
3. agrandir avec Flip ;
4. afficher les contrôles ;
5. retourner à sa position à la fermeture.

## 13.4 Contenu

Le viewer affiche au minimum :

- la carte en grand ;
- un bouton fermer ;
- un bouton ou lien `Brassopédie`.

Il ne doit pas dupliquer toute la fiche encyclopédique.

## 13.5 Accessibilité

- rôle dialog ;
- titre accessible ;
- focus placé dans le viewer ;
- focus piégé tant que le viewer est ouvert ;
- fermeture par `Escape` ;
- retour du focus vers la carte source ;
- aucune ouverture pour une carte cachée.

---

# 14. Brassopédie

## 14.1 Découplage

Le viewer appelle :

```js
brassopediaRouter.open(card.brassopediaId);
```

Il ne construit pas lui-même une URL.

## 14.2 API temporaire

```js
export function createBrassopediaRouter({ navigate }) {
  return {
    open(entryId) {
      navigate({ screen: "brassopedia", entryId });
    }
  };
}
```

Cette abstraction permet de changer ultérieurement :

- le système de routes ;
- la structure de la Brassopédie ;
- les paramètres d’URL ;
- le comportement PWA.

---

# 15. Assets et préchargement

## 15.1 Assets communs

À précharger au démarrage :

- dos de carte générique ou dos de la collection par défaut ;
- cadre de carte ;
- assets d’interface indispensables ;
- fond initial.

## 15.2 Assets de collection

À précharger lors de l’ouverture d’une collection :

- fond de collection ;
- dos et cadre spécifiques ;
- rectos des cartes déjà découvertes ;
- recto de la carte ciblée par une révélation ;
- éventuellement une ou deux cartes voisines.

## 15.3 Carte ciblée

Avant de lancer la timeline :

```js
await assetPreloader.ensureCardReady(card);
```

La révélation ne commence pas avec une image encore en téléchargement.

## 15.4 Erreur d’asset

En cas d’échec :

- ne pas laisser la scène bloquée ;
- utiliser un visuel de secours ;
- enregistrer l’erreur en console en développement ;
- permettre à l’utilisateur de revenir à l’interface ;
- ne pas enregistrer la carte comme découverte avant une fin de révélation valide.

## 15.5 Compatibilité GitHub Pages

Toutes les URLs publiques doivent continuer à passer par :

```js
assetUrl(path)
```

Aucune URL ne doit supposer que l’application est hébergée à la racine du domaine.

---

# 16. Styles et responsive

## 16.1 Conservation de la direction artistique

Conserver :

- fond brun très sombre ;
- lumière ambrée ;
- cuivre patiné ;
- typographies Cinzel et Crimson Text ;
- grain discret ;
- halos chauds ;
- profondeur de la carte ;
- format `63 / 88`.

## 16.2 Variables CSS

Créer ou conserver des tokens :

```css
:root {
  --card-aspect: 63 / 88;
  --card-radius: 10px;

  --carousel-spacing: 156px;
  --carousel-depth-step: 110px;
  --carousel-rotation-step: 14deg;
  --carousel-scale-step: 0.11;
  --carousel-min-scale: 0.62;

  --reveal-overlay-opacity: 0.55;
  --reveal-max-height: 460px;
}
```

Les valeurs importantes du carrousel doivent être centralisées.

## 16.3 iPhone et iPad

Vérifier particulièrement :

- `viewport-fit=cover` ;
- safe areas ;
- hauteur dynamique ;
- barre Safari ;
- orientation portrait et paysage ;
- `100dvh` avec fallback ;
- absence de scroll horizontal parasite ;
- absence de sélection d’image ;
- `touch-action` spécifique au carrousel ;
- stabilité de `backface-visibility` ;
- fluidité des filtres et du blur.

## 16.4 Taille de révélation

Remplacer la marge fixe de `120px` par une mesure réelle ou des variables :

```js
const chromeHeight =
  headerEl.getBoundingClientRect().height +
  navEl.getBoundingClientRect().height;

const availableHeight = window.innerHeight - chromeHeight - safeMargin;
```

## 16.5 Performance

- ne pas animer simultanément trop de propriétés coûteuses ;
- limiter les filtres sur les grands conteneurs ;
- utiliser `transform` et `opacity` en priorité ;
- activer `will-change` uniquement pendant les animations ;
- le retirer après stabilisation ;
- utiliser `requestAnimationFrame` pour les mises à jour fréquentes ;
- éviter un `gsap.to()` non maîtrisé à chaque pixel si un `quickSetter` ou `quickTo` est plus adapté ;
- ne pas conserver de timelines ambiantes sur des cartes hors écran ;
- tuer les animations lors d’un changement de collection.

---

# 17. Accessibilité

## 17.1 Cartes cachées

- ne pas utiliser `role="button"` si aucun clic utile n’est proposé ;
- utiliser une étiquette générique ;
- ne pas annoncer le nom réel ;
- ne pas rendre le recto accessible ;
- ne pas exposer le texte caché dans le DOM accessible.

## 17.2 Cartes découvertes

- rôle bouton uniquement lorsqu’elles peuvent ouvrir le viewer ;
- `aria-label="Ouvrir la carte Imperial Stout"` ;
- recto retiré de `aria-hidden` ;
- dos placé en `aria-hidden`.

## 17.3 Carrousel

- région nommée ;
- indication de position, par exemple `Carte 3 sur 12` ;
- navigation clavier ;
- annonce discrète du changement de carte active ;
- boutons précédent et suivant avec libellés accessibles si présents.

## 17.4 Révélation

- dialogue modal ;
- focus contrôlé ;
- aucune fermeture accidentelle pendant la phase critique ;
- message de fin annoncé ;
- retour du focus cohérent.

## 17.5 Mouvement réduit

Le mode réduit doit :

- éviter la grande extraction complexe ;
- centrer rapidement la carte ;
- effectuer un retournement court ou un fondu ;
- révéler les informations ;
- conserver le même résultat fonctionnel ;
- ne pas supprimer la découverte ou le retour au carrousel.

La préférence doit idéalement être lue via un `MediaQueryList` pouvant réagir à un changement, et pas seulement une constante évaluée au chargement.

---

# 18. Gestion des erreurs

## 18.1 États d’erreur prévus

- saisie vide ;
- style inconnu ;
- alias ambigu ;
- collection introuvable ;
- carte introuvable ;
- élément DOM de carte absent ;
- asset non chargé ;
- animation interrompue ;
- stockage inaccessible ;
- données persistées invalides ;
- changement d’orientation ;
- destruction d’un composant pendant une animation.

## 18.2 Règle générale

Toute erreur doit :

1. être capturée ;
2. nettoyer les timelines ;
3. restaurer l’interface ;
4. lever les verrous ;
5. afficher un retour compréhensible ;
6. ne pas marquer une carte comme découverte par erreur.

## 18.3 Stockage indisponible

Si `localStorage` est indisponible :

- l’application reste utilisable pendant la session ;
- un stockage mémoire prend le relais ;
- un avertissement discret peut être enregistré en console ;
- aucune exception ne doit bloquer le parcours.

---

# 19. Plan de réalisation

## Lot 0 : figer la référence

### Actions

- créer un tag ou une branche de référence ;
- noter le commit exact du laboratoire validé ;
- conserver la version GitHub Pages actuelle ;
- enregistrer une courte vidéo de référence sur mobile et desktop ;
- relever les tokens de mouvement actuels.

### Critères d’acceptation

- le prototype actuel reste accessible ;
- un retour arrière est possible ;
- la référence visuelle est documentée.

---

## Lot 1 : modèle de données et stockage V2

### Actions

- enrichir `cards.js` ;
- créer `collections.js` ;
- ajouter les alias ;
- créer `discovery-store.js` ;
- migrer les indices actuels vers les `cardId` ;
- supprimer toute écriture directe depuis `create-grid.js` ou le contrôleur.

### Critères d’acceptation

- la progression survit à un rechargement ;
- l’ordre des cartes peut changer sans perdre les découvertes ;
- les trois cartes du laboratoire sont correctement migrées ;
- les données invalides ne bloquent pas l’application.

---

## Lot 2 : extraction du moteur de révélation

### Actions

- créer `reveal-engine.js` ;
- déplacer l’état global dans l’instance ;
- conserver `reveal-timeline.js` ;
- retirer les écouteurs de clic du moteur ;
- retirer le stockage et le calcul de progression ;
- exposer `reveal()` et `destroy()` ;
- faire retourner des Promises fiables ;
- conserver le laboratoire comme client temporaire du moteur.

### Critères d’acceptation

- le laboratoire rejoue exactement la même animation ;
- aucun changement visuel notable ;
- le moteur peut être déclenché par un appel JavaScript ;
- le moteur n’écrit plus dans le stockage ;
- le moteur ne connaît plus les indices 0/4/8 ;
- aucune variable d’état critique n’est globale au module.

---

## Lot 3 : Carousel Lab isolé

### Actions

- créer une page ou un mode laboratoire dédié ;
- afficher une collection de cartes factices ou les trois cartes actuelles ;
- intégrer GSAP Draggable ;
- créer la position virtuelle ;
- ajouter snap et limites ;
- ajouter les tokens de géométrie ;
- gérer tactile, souris et clavier ;
- ajouter un panneau de réglage.

### Critères d’acceptation

- carrousel non infini ;
- première et dernière carte respectées ;
- snap exact ;
- aucun clic accidentel après drag ;
- carte active clairement identifiable ;
- fonctionnement iPhone, iPad et desktop ;
- aucune révélation depuis une carte cachée.

---

## Lot 4 : contrôleur de collections

### Actions

- créer `collection-controller.js` ;
- monter une collection ;
- démonter proprement l’ancienne ;
- restaurer la dernière carte active ;
- précharger les assets utiles ;
- fournir le carrousel actif.

### Critères d’acceptation

- changement de collection sans fuite d’écouteurs ;
- fond et cartes correctement chargés ;
- progression calculée dynamiquement ;
- dernière position restaurée ;
- aucune animation ambiante de l’ancienne collection ne reste active.

---

## Lot 5 : raccordement carrousel et révélation

### Actions

- ajouter `focusCard(cardId)` ;
- créer le contexte de révélation du carrousel ;
- verrouiller le carrousel ;
- isoler les cartes voisines ;
- appeler `revealEngine.reveal()` ;
- recalculer la cible au retour ;
- basculer l’original en face recto ;
- déverrouiller.

### Critères d’acceptation

- la carte ciblée est centrée avant le début ;
- le focus visuel ne saute pas ;
- la grande animation reste conforme au laboratoire ;
- le retour rejoint exactement l’emplacement du carrousel ;
- la carte reste face recto ;
- les voisins reprennent leur place ;
- aucun double déclenchement.

---

## Lot 6 : fenêtre de saisie et orchestrateur

### Actions

- créer `reveal-search.js` ;
- créer `normalize-text.js` ;
- créer `beer-resolver.js` ;
- créer `discovery-flow.js` ;
- chaîner fermeture, collection, focus, révélation et stockage ;
- gérer inconnu, ambigu et déjà découvert.

### Critères d’acceptation

- nom exact reconnu ;
- casse ignorée ;
- accents ignorés ;
- espaces et tirets normalisés ;
- alias reconnus ;
- saisie inconnue sans révélation ;
- carte déjà découverte sans grande révélation ;
- aucune suggestion ne dévoile les cartes cachées ;
- verrou global libéré même après erreur.

---

## Lot 7 : viewer et Brassopédie

### Actions

- créer `card-viewer.js` ;
- intégrer GSAP Flip ;
- ajouter fermeture et focus ;
- ajouter `brassopedia-router.js` ;
- ouvrir uniquement les cartes découvertes.

### Critères d’acceptation

- carte découverte agrandie sans rupture ;
- carte cachée non ouvrable ;
- fermeture fluide ;
- bouton Brassopédie fonctionnel via adaptateur ;
- clavier et focus corrects.

---

## Lot 8 : généralisation multi-collections

### Actions

- ajouter au moins deux collections de test ;
- vérifier le ciblage inter-collections ;
- adapter le préchargement ;
- adapter la progression ;
- gérer les assets propres à chaque collection.

### Critères d’acceptation

- une saisie ouvre la bonne collection ;
- le bon carrousel est monté ;
- la bonne carte est centrée ;
- aucune confusion d’identifiants ;
- les découvertes sont indépendantes de l’ordre visuel.

---

## Lot 9 : durcissement et livraison

### Actions

- tests de régression ;
- tests mobiles ;
- nettoyage des imports et variables ;
- séparation CSS utile ;
- vérification du build ;
- vérification GitHub Pages ;
- documentation des modules ;
- suppression des mécanismes temporaires.

### Critères d’acceptation

- build Vite réussi ;
- aucune erreur console bloquante ;
- aucun asset cassé sur GitHub Pages ;
- navigation stable ;
- expérience fluide sur mobile ;
- code documenté ;
- laboratoire conservé ou isolé du produit.

---

# 20. Répartition des outils

## 20.1 Codex

Codex réalise le code de production :

- refactorisation multi-fichiers ;
- extraction du moteur ;
- stockage V2 ;
- modèle de données ;
- carrousel final ;
- orchestrateur ;
- viewer ;
- tests ;
- nettoyage ;
- build.

Chaque mission Codex doit rester limitée à un lot ou sous-lot.

Codex ne doit pas recevoir une demande globale du type :

```text
Intègre toutes les collections.
```

Il doit recevoir une mission précise avec fichiers autorisés, contraintes et critères d’acceptation.

## 20.2 Replit

Replit sert de laboratoire sensoriel :

- Carousel Lab ;
- réglage des distances ;
- rotation ;
- profondeur ;
- snap ;
- rythme ;
- micro-interactions ;
- tests rapides responsive ;
- comparaison visuelle.

Les valeurs validées dans Replit sont ensuite intégrées proprement par Codex.

Replit ne doit pas modifier simultanément la même branche de production que Codex.

## 20.3 Assistant de conception

Le rôle d’architecture et de contrôle couvre :

- rédaction des cahiers ;
- découpage des missions ;
- analyse du dépôt ;
- revue des modifications ;
- recherche de régressions ;
- validation fonctionnelle ;
- mise à jour de la documentation.

---

# 21. Stratégie Git

## 21.1 Branches

```text
main
└── version stable publiée

feature/collections-integration
└── chantier principal Codex

lab/carousel
└── prototype Replit

reference/reveal-lab-stable
└── référence immuable de l’animation validée
```

## 21.2 Règles

- aucun travail direct sur `main` ;
- une mission Codex par commit logique ;
- aucun mélange entre refactorisation neutre et évolution visuelle ;
- merge du laboratoire uniquement après nettoyage ;
- possibilité de reprendre uniquement les tokens et principes du laboratoire ;
- pull request avec checklist du lot ;
- build obligatoire avant fusion.

## 21.3 Commits recommandés

```text
refactor(reveal): extract standalone reveal engine
feat(data): add collection model and card id persistence
feat(carousel): add bounded GSAP carousel
feat(discovery): add beer style resolver and discovery flow
feat(viewer): add discovered card viewer
test(discovery): cover resolver and persistence migration
fix(a11y): update card face accessibility states
```

---

# 22. Tests

## 22.1 Tests unitaires

Modules prioritaires :

- `normalizeBeerName()` ;
- `BeerResolver` ;
- migration de progression ;
- validation des collections ;
- calcul d’index cible ;
- calcul des limites ;
- calcul de progression.

Un framework léger comme Vitest peut être ajouté, ou des tests JavaScript purs peuvent utiliser le runner Node si l’environnement reste simple.

## 22.2 Tests d’intégration

### Saisie valide

- saisir `Imperial Stout` ;
- ouvrir `porters-stouts` ;
- centrer `imperial-stout` ;
- lancer la révélation ;
- persister ;
- afficher le recto.

### Alias

- saisir `stout impérial` ;
- obtenir la même carte.

### Saisie invalide

- rester dans la fenêtre ;
- afficher un message ;
- ne pas changer de collection ;
- ne pas enregistrer de découverte.

### Carte déjà découverte

- ouvrir la collection ;
- centrer ;
- mettre en évidence ;
- ne pas rejouer la grande animation.

### Clic sur carte cachée

- aucune révélation ;
- aucune modification du stockage.

### Clic sur carte découverte

- ouverture du viewer ;
- bouton Brassopédie présent.

### Drag

- glisser ;
- snap ;
- aucun viewer ouvert accidentellement.

### Changement de collection

- démonter l’ancien carrousel ;
- monter le nouveau ;
- aucune fuite d’écouteurs.

### Rechargement

- conserver les découvertes ;
- conserver la bonne face ;
- restaurer la dernière collection selon la règle retenue.

## 22.3 Tests de non-régression de révélation

Comparer avec le laboratoire :

- position de départ ;
- assombrissement ;
- extraction ;
- taille finale ;
- flip ;
- halo ;
- apparition des textes ;
- stabilisation ;
- boutons ;
- retour.

Aucun changement visuel ne doit être intégré silencieusement pendant le lot d’extraction.

## 22.4 Matrice appareils

| Appareil | Navigateur | Orientation | Priorité |
|---|---|---|---|
| iPhone récent | Safari PWA et Safari | portrait | critique |
| iPhone récent | Safari | paysage | haute |
| iPad | Safari | portrait | critique |
| iPad | Safari | paysage | haute |
| Desktop Windows | Chrome | large | haute |
| Desktop Windows | Firefox | large | moyenne |
| macOS | Safari | large | moyenne |

## 22.5 Scénarios de résistance

- double clic sur valider ;
- swipe pendant focus automatique ;
- changement d’orientation pendant révélation ;
- fermeture rapide du viewer ;
- asset manquant ;
- stockage refusé ;
- données anciennes corrompues ;
- collection vide ;
- carte référencée mais absente ;
- 1 seule carte dans une collection ;
- 20 cartes dans une collection ;
- mouvement réduit activé.

---

# 23. Budgets de performance

Objectifs indicatifs :

- animation principale perçue fluide ;
- aucune longue tâche JavaScript visible pendant le drag ;
- pas de chargement de tous les rectos de toutes les collections au démarrage ;
- pas de fuite de timeline après changement de collection ;
- pas de croissance continue du nombre d’écouteurs ;
- aucune image en pleine résolution inutilement décodée hors écran ;
- interaction disponible rapidement après chargement des assets communs.

Le carrousel doit être testé avec un nombre de cartes supérieur au laboratoire, au minimum 12 cartes.

---

# 24. Journalisation de développement

En mode développement uniquement, prévoir des messages structurés :

```js
console.debug("[DiscoveryFlow] matched", { cardId, collectionId });
console.debug("[Carousel] focused", { cardId, index });
console.debug("[RevealEngine] completed", { cardId });
console.warn("[DiscoveryStore] invalid persisted data, reset applied");
```

Aucune donnée sensible n’est concernée.

Les logs doivent être silencieux ou réduits en production.

---

# 25. Critères de livraison finale

L’intégration est considérée terminée lorsque :

- chaque collection possède un carrousel limité ;
- les cartes non découvertes restent face dos ;
- aucun clic sur une carte cachée ne la révèle ;
- le champ de saisie est la seule entrée normale de découverte ;
- une saisie valide ouvre la bonne collection ;
- la bonne carte est centrée ;
- l’animation validée se joue ;
- la découverte est persistée par `cardId` ;
- la carte revient face recto dans le carrousel ;
- une carte découverte peut être agrandie ;
- le bouton Brassopédie utilise un routeur découplé ;
- le carrousel fonctionne au toucher, à la souris et au clavier ;
- les limites sont respectées ;
- le mouvement réduit fonctionne ;
- GitHub Pages charge tous les assets ;
- le build réussit ;
- aucune régression majeure n’est observée sur le Reveal Lab ;
- les modules exposent une méthode de nettoyage ;
- les tests critiques passent.

---

# 26. Décisions de conception retenues

| Sujet | Décision |
|---|---|
| Stack | HTML, CSS, JavaScript vanilla, Vite, GSAP |
| Carrousel | limité, non infini |
| Révélation par clic | interdite pour une carte cachée |
| Déclencheur | fenêtre de saisie dédiée |
| Identification | nom canonique et alias exacts après normalisation |
| Stockage | `cardId`, schéma versionné |
| Timeline | conservation du prototype actuel |
| GSAP Draggable | utilisé pour le carrousel |
| GSAP Flip | utilisé principalement pour le viewer |
| Bibliothèque de slider | aucune |
| React | non |
| Three.js | non |
| Carte déjà découverte | focus + mise en évidence, pas de grande révélation automatique |
| Préchargement | progressif par collection et cible |
| Brassopédie | routeur ou adaptateur découplé |

---

# 27. Décisions encore ajustables sans casser l’architecture

Les points suivants peuvent être réglés plus tard :

- nombre de cartes visibles autour de la carte active ;
- espacement horizontal ;
- rotation latérale ;
- profondeur ;
- niveau de flou ;
- présence de boutons précédent et suivant ;
- message exact d’une saisie inconnue ;
- ouverture automatique ou non du viewer pour une carte déjà découverte ;
- animation de la transition entre deux collections ;
- ambiance sonore ;
- vibration haptique ;
- affichage exact du compteur ;
- position du bouton Brassopédie.

Ces décisions ne doivent pas modifier les contrats principaux.

---

# 28. Première mission recommandée pour Codex

La première mission doit porter uniquement sur l’extraction du moteur.

## Objectif

Transformer le Reveal Lab actuel pour que la révélation soit déclenchable par une API explicite, sans modifier son rendu.

## Autorisé

- créer `src/reveal/reveal-engine.js` ;
- déplacer ou adapter `reveal-controller.js` ;
- adapter `main.js` ;
- ajouter une commande de laboratoire ;
- rendre l’état interne local à l’instance ;
- ajouter `destroy()` ;
- nettoyer les imports manifestement inutiles.

## Interdit dans cette mission

- créer le carrousel ;
- modifier la direction artistique ;
- modifier les durées ;
- changer les easings ;
- changer les assets ;
- créer plusieurs collections ;
- ajouter la fenêtre de saisie finale ;
- migrer vers React ;
- remplacer la timeline.

## Critères d’acceptation

- le Reveal Lab affiche le même résultat ;
- l’animation se lance depuis un appel explicite ;
- le moteur ne gère pas la persistance ;
- le moteur ne calcule pas la progression ;
- le moteur n’attache pas lui-même le clic de découverte ;
- l’état n’est plus global au module ;
- le build réussit ;
- le mode mouvement réduit fonctionne.

---

# 29. Conclusion

Le prototype actuel est une bonne base de production pour l’animation elle-même.

La difficulté principale n’est pas GSAP. Elle réside dans le découplage des responsabilités :

- la saisie identifie ;
- l’orchestrateur coordonne ;
- le contrôleur de collections ouvre ;
- le carrousel centre ;
- le moteur révèle ;
- le stockage mémorise ;
- le viewer agrandit ;
- le routeur ouvre la Brassopédie.

En respectant cette séparation et l’ordre des lots, ZythoHunt pourra conserver sa révélation premium tout en l’intégrant dans un système de collections évolutif, tactile, maintenable et compatible avec les futurs contenus.
