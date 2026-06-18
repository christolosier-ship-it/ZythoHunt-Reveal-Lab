# Mission Codex — Phase 4 : fusion du carrousel et du moteur de révélation

## Dépôt

```text
christolosier-ship-it/ZythoHunt-Reveal-Lab
```

## Application concernée

```text
artifacts/zythohunt
```

## Branche de travail demandée

```text
feature/integrate-carousel-reveal
```

Ne travaille pas directement sur `main`.

---

# 1. Contexte

Le dépôt contient désormais deux prototypes validés mais encore séparés :

1. un laboratoire de révélation reposant sur une grille 3×3 ;
2. un laboratoire de carrousel accessible par la navigation inférieure.

Le moteur de révélation a déjà été extrait dans :

```text
artifacts/zythohunt/src/reveal/reveal-engine.js
```

Le carrousel validé existe notamment dans :

```text
artifacts/zythohunt/src/carousel/carousel-controller.js
artifacts/zythohunt/src/carousel/create-carousel-view.js
artifacts/zythohunt/src/carousel/carousel-tokens.js
```

Le code actuel utilise encore deux vues séparées :

```text
Révéler
Collections
```

et quatre boutons de navigation inférieure :

```text
Révéler
Collections
Brassopédie
Profil
```

La phase 4 doit fusionner les deux prototypes en une seule vue.

---

# 2. Documents à lire avant toute modification

Lis intégralement :

```text
docs/architecture/ZYTHOHUNT_CAHIER_INTEGRATION_COLLECTIONS.md
```

Lis également les prompts précédents s’ils sont présents :

```text
docs/prompts/completed/PHASE-02_EXTRACTION_MOTEUR_REVELATION.md
docs/prompts/completed/PHASE-03_CAROUSEL_LAB_REPLIT.md
```

Si les noms ou emplacements diffèrent légèrement, repère les documents équivalents dans `docs/`.

Ces documents sont des références historiques.

Ils ne doivent pas être supprimés.

En cas de contradiction, les règles du présent prompt Phase 4 sont prioritaires.

---

# 3. Mode opératoire Git

Avant toute modification :

```bash
git status
git remote -v
git branch --show-current
git fetch origin
```

Vérifie que :

- le dépôt local est propre ;
- `main` contient bien le moteur extrait ;
- `main` contient bien le carrousel validé ;
- aucun changement utilisateur non commité ne risque d’être écrasé.

Puis :

```bash
git checkout main
git pull --ff-only origin main
git checkout -b feature/integrate-carousel-reveal
```

Si la branche existe déjà :

```bash
git checkout feature/integrate-carousel-reveal
```

Ne force aucun reset.

Ne fusionne pas automatiquement dans `main`.

---

# 4. Objectif unique de la phase 4

Fusionner :

```text
carrousel limité
+
moteur de révélation
+
champ de saisie
```

dans une seule vue de laboratoire.

Le résultat final doit présenter :

- un seul écran ;
- un seul carrousel ;
- neuf cartes ;
- trois vraies cartes révélables ;
- six cartes factices non révélables ;
- un champ de saisie ;
- un bouton de validation ;
- un seul panneau de réglages fusionné ;
- aucune navigation inférieure.

---

# 5. Résultat fonctionnel cible

## 5.1 Écran unique

L’application doit afficher directement :

1. le header ZythoHunt ;
2. une zone de saisie de style de bière ;
3. le carrousel de neuf cartes ;
4. un indicateur de progression ;
5. un bouton unique de réglages dans le header ;
6. l’overlay de révélation lorsqu’une découverte est déclenchée.

Il ne doit plus exister de changement de vue.

Il ne doit plus exister de bouton inférieur.

---

# 6. Suppression de la navigation inférieure

Supprime complètement du DOM et du code :

```text
Révéler
Collections
Brassopédie
Profil
```

Supprime également :

- `#app-nav` ;
- `navRevealBtn` ;
- `navCollBtn` ;
- `switchToRevealLab()` ;
- `switchToCollections()` ;
- `currentView` ;
- toute logique de route de laboratoire devenue inutile ;
- toute réservation de hauteur CSS liée à la navigation inférieure.

Le layout doit être recalculé sans :

```css
--nav-h
```

ou définir temporairement cette variable à zéro uniquement si sa suppression complète provoquerait une refactorisation excessive.

La solution recommandée est de supprimer les dépendances inutiles à `--nav-h`.

---

# 7. Suppression de l’ancienne grille

Supprime de la vue principale :

```text
#grid-container
#card-grid
.grid-glow
```

Supprime du boot principal :

```js
createGrid(...)
createRevealLabController(...)
```

ou remplace leur usage par un nouveau orchestrateur de découverte adapté au carrousel.

Les fichiers historiques peuvent être conservés temporairement s’ils sont encore utiles comme référence, mais ils ne doivent plus être importés ni utilisés dans l’application finale de cette phase.

Si un fichier devient totalement inutilisé et sa suppression est sûre, il peut être supprimé.

Ne conserve pas une grille cachée uniquement pour alimenter l’animation.

La révélation doit partir de la vraie carte du carrousel.

---

# 8. Carrousel final du prototype

## 8.1 Nombre de cartes

Le carrousel doit contenir exactement :

```text
9 cartes
```

## 8.2 Répartition

Utilise cet ordre exact :

| Index zéro-based | Position visible | Contenu |
|---:|---:|---|
| 0 | 1 | carte factice |
| 1 | 2 | Stout |
| 2 | 3 | carte factice |
| 3 | 4 | carte factice |
| 4 | 5 | Imperial Stout |
| 5 | 6 | carte factice |
| 6 | 7 | carte factice |
| 7 | 8 | Baltic Porter |
| 8 | 9 | carte factice |

Identifiants des cartes factices :

```text
placeholder-01
placeholder-02
placeholder-03
placeholder-04
placeholder-05
placeholder-06
```

## 8.3 Carte active initiale

Au démarrage, centrer :

```text
imperial-stout
```

soit l’index 4.

## 8.4 Cartes factices

Les six cartes factices :

- utilisent uniquement le dos de carte ;
- ne possèdent aucun nom visible ;
- ne possèdent aucun alias ;
- ne possèdent aucune image de recto ;
- ne peuvent pas être ciblées par le champ de saisie ;
- ne peuvent jamais être révélées ;
- ne peuvent pas être enregistrées comme découvertes ;
- ne doivent pas produire d’erreur si elles sont centrées ;
- ne nécessitent aucun nouvel asset.

Elles peuvent être représentées par des objets de données de laboratoire :

```js
{
  id: "placeholder-01",
  kind: "placeholder",
  revealable: false
}
```

---

# 9. Les trois vraies cartes

Les trois cartes réelles sont :

```text
Stout
Imperial Stout
Baltic Porter
```

Elles utilisent les assets existants de :

```text
artifacts/zythohunt/public/assets/collections/porters-stouts/
```

Elles doivent toutes apparaître face dos au premier lancement si elles ne sont pas encore découvertes.

Elles deviennent face recto après révélation.

---

# 10. Règle de contenu des cartes

## Règle absolue

Le seul texte autorisé sur le recto d’une carte est :

```text
le nom du style de bière
```

Exemples :

```text
Stout
Imperial Stout
Baltic Porter
```

Supprime du rendu de carte :

- le type ;
- le chemin ;
- la tagline ;
- la description ;
- tout sous-titre ;
- tout badge ;
- tout autre texte.

Les données peuvent rester dans le modèle si elles servent plus tard, mais elles ne doivent pas être rendues sur la carte.

---

# 11. Unification du composant carte

## Problème actuel

Le dépôt contient deux structures différentes :

### Structure historique de révélation

```text
.beer-card
.card-back
.card-front
.card-illustration
.card-frame
.card-copy
.card-name
.card-type
.card-path
.card-tagline
.card-specular
.card-glow-behind
```

### Structure actuelle du carrousel

```text
.csl-card
.csl-card-inner
.csl-card-back
.csl-card-front
.csl-ill-img
.csl-frame-img
.csl-card-name
```

Cette duplication doit être supprimée.

## Objectif

Le carrousel et le moteur de révélation doivent utiliser une seule structure de carte.

Le moteur doit pouvoir recevoir directement :

```js
const cardEl = carousel.getCardElement(cardId);
```

sans conversion DOM et sans carte cachée parallèle.

## Approche recommandée

Généralise :

```text
artifacts/zythohunt/src/components/create-card.js
```

pour qu’il puisse créer une carte utilisée dans le carrousel.

API indicative :

```js
createCard({
  cardData,
  cardId,
  variant: "carousel",
  discovered: false,
  placeholder: false
});
```

ou :

```js
createBeerCard({
  card,
  collection,
  discovered,
  context: "carousel"
});
```

Le résultat doit contenir les classes attendues par le moteur :

```text
.beer-card
.card-back
.card-front
.card-illustration
.card-frame
.card-name
.card-specular
.card-glow-behind
```

Les classes `csl-*` peuvent être conservées en complément pour le layout si nécessaire, mais ne doivent plus définir une seconde structure complète indépendante.

## Contraintes

- ne duplique pas le DOM de carte ;
- ne duplique pas la logique de recto ;
- ne duplique pas le chargement des assets ;
- conserve `cloneCardForReveal()` ;
- adapte `cloneCardForReveal()` pour ne créer que le nom ;
- conserve le ratio 63/88 ;
- conserve l’apparence validée du carrousel ;
- conserve l’apparence validée de la révélation.

---

# 12. Simplification du recto

Adapte :

```text
artifacts/zythohunt/src/components/create-card.js
```

Le recto doit contenir :

```html
<div class="illustration-window">
  <img class="card-illustration">
</div>

<img class="card-frame">

<div class="card-copy">
  <h2 class="card-name"></h2>
</div>

<div class="card-specular"></div>
<div class="card-glow-behind"></div>
```

Ne crée plus :

```text
.card-type
.card-path
.card-tagline
```

Supprime les sélecteurs et animations associés.

---

# 13. Adaptation de la timeline

Adapte :

```text
artifacts/zythohunt/src/animation/reveal-timeline.js
```

La phase 6 doit désormais construire uniquement :

1. l’illustration ;
2. le cadre ;
3. le nom du style.

Conserve l’ordre et le rythme global :

```text
illustration
cadre
nom
```

Exemple conceptuel :

```js
tl.to(cloneIll, {
  opacity: 1,
  duration: 0.35
}, frontStart)
.to(cloneFrame, {
  opacity: 1,
  duration: 0.25
}, frontStart + 0.1)
.fromTo(cloneName, {
  opacity: 0,
  y: 8
}, {
  opacity: 1,
  y: 0,
  duration: 0.3
}, frontStart + 0.3);
```

Ne modifie pas volontairement :

- la durée d’extraction ;
- la durée du flip ;
- la perspective ;
- les halos ;
- les ombres ;
- la signature lumineuse ;
- le settle.

Adapte également la version `prefers-reduced-motion`.

---

# 14. Champ de saisie

## 14.1 Emplacement

Ajoute une zone de saisie dans la vue unique, au-dessus du carrousel ou dans une zone visuellement intégrée entre le header et le carrousel.

Structure indicative :

```html
<form id="reveal-search-form">
  <label for="reveal-search-input">
    Quel style de bière as-tu identifié ?
  </label>

  <div class="reveal-search-row">
    <input
      id="reveal-search-input"
      type="text"
      autocomplete="off"
      spellcheck="false"
    >

    <button type="submit">
      Révéler
    </button>
  </div>

  <p id="reveal-search-feedback" aria-live="polite"></p>
</form>
```

## 14.2 Interdictions

Ne crée pas :

- de liste déroulante ;
- de datalist ;
- d’autocomplétion visible ;
- de suggestion de styles ;
- de menu exposant les trois réponses ;
- de recherche floue agressive.

---

# 15. Normalisation de la saisie

Créer :

```text
artifacts/zythohunt/src/discovery/normalize-text.js
```

Fonction recommandée :

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

---

# 16. Résolveur de styles

Créer :

```text
artifacts/zythohunt/src/discovery/beer-resolver.js
```

Le résolveur doit être pur.

API :

```js
const resolver = createBeerResolver(realCards);
const result = resolver.resolve(input);
```

Résultat valide :

```js
{
  status: "matched",
  cardId: "imperial-stout"
}
```

Résultat inconnu :

```js
{
  status: "unknown"
}
```

Les cartes factices ne doivent jamais entrer dans le résolveur.

---

# 17. Alias autorisés

## Stout

```text
stout
```

## Imperial Stout

```text
imperial stout
stout imperial
stout impérial
russian imperial stout
```

## Baltic Porter

```text
baltic porter
porter baltique
```

Les noms canoniques sont automatiquement reconnus.

Ne reconnais pas simplement :

```text
porter
```

car cela serait trop ambigu.

---

# 18. Orchestrateur de découverte

Créer :

```text
artifacts/zythohunt/src/discovery/discovery-controller.js
```

ou un nom équivalent.

Il doit coordonner :

```text
saisie
→ résolution
→ focus du carrousel
→ verrouillage
→ révélation
→ stockage
→ retour
→ déverrouillage
```

API indicative :

```js
const discoveryController = createDiscoveryController({
  formEl,
  inputEl,
  feedbackEl,
  carousel,
  revealEngine,
  store,
  resolver
});

discoveryController.mount();
discoveryController.destroy();
```

---

# 19. Parcours d’une nouvelle découverte

Lorsqu’une saisie valide correspond à une carte non découverte :

1. empêcher une seconde soumission ;
2. fermer le panneau de réglages s’il est ouvert ;
3. désactiver temporairement le champ et le bouton ;
4. verrouiller le carrousel ;
5. appeler :

```js
await carousel.focusCard(cardId);
```

6. vérifier que l’image de la carte est chargée ;
7. récupérer :

```js
const cardEl = carousel.getCardElement(cardId);
```

8. créer le `sceneContext` du carrousel ;
9. appeler :

```js
await revealEngine.reveal({
  cardEl,
  cardData,
  sceneContext,
  mode: "full"
});
```

10. afficher le message :

```text
Nouvelle carte révélée
```

11. attendre le clic sur Continuer ;
12. appeler :

```js
await revealEngine.returnToSource(...)
```

13. préparer la carte originale en face recto ;
14. enregistrer `cardId` comme découvert ;
15. mettre à jour la progression ;
16. déverrouiller le carrousel ;
17. réactiver le formulaire ;
18. remettre le focus dans le champ ou sur la carte selon la logique d’accessibilité retenue.

---

# 20. Parcours d’une carte déjà découverte

Si la saisie correspond à une carte déjà découverte :

1. fermer le panneau de réglages ;
2. verrouiller brièvement le carrousel ;
3. centrer la carte avec `focusCard(cardId)` ;
4. ne pas rejouer la grande révélation ;
5. jouer une courte pulsation ou un halo sur la carte ;
6. afficher :

```text
Cette carte est déjà découverte
```

7. déverrouiller ;
8. réactiver le formulaire.

La grande animation ne doit pas être rejouée automatiquement.

Un bouton de laboratoire dans les réglages pourra permettre de rejouer une découverte à des fins de test.

---

# 21. Saisie inconnue

Si aucune carte ne correspond :

- ne déplace pas le carrousel ;
- ne révèle rien ;
- ne modifie pas la progression ;
- garde le champ actif ;
- joue une micro-réaction du champ ;
- affiche :

```text
Aucun style reconnu dans ce prototype.
```

Ne révèle pas les réponses possibles.

---

# 22. Verrouillage

Pendant :

- un focus programmatique ;
- une révélation ;
- un retour de carte ;

les actions suivantes doivent être bloquées :

- drag ;
- navigation clavier du carrousel ;
- clic latéral ;
- nouvelle soumission ;
- ouverture du panneau de réglages ;
- reset de collection ;
- rejeu.

Le verrouillage doit toujours être levé dans un `finally`.

---

# 23. Contrat du carrousel à compléter

Le carrousel actuel expose seulement :

```js
mount
destroy
snapTo
refresh
getActiveIndex
```

Complète son API avec :

```js
focusCard(cardId)
getActiveCardId()
getCardElement(cardId)
setDiscovered(cardId, discovered)
isDiscovered(cardId)
lock()
unlock()
createRevealContext(cardId)
highlight(cardId)
```

Les noms peuvent légèrement varier si le contrat reste explicite.

---

# 24. `focusCard(cardId)`

Doit :

- trouver l’index par identifiant ;
- rejeter ou retourner un statut propre si l’identifiant est absent ;
- animer jusqu’à la position cible ;
- résoudre à la fin réelle du tween ;
- mettre à jour l’index actif ;
- mettre à jour les attributs accessibles ;
- ne pas dépendre d’un `setTimeout()`.

---

# 25. `setDiscovered(cardId, true)`

Doit :

- préparer ou compléter le recto ;
- mettre à jour les classes ;
- retourner la carte face recto ;
- mettre à jour l’ARIA ;
- ne pas reconstruire tout le carrousel ;
- ne pas perdre la position active ;
- ne pas recréer Draggable.

---

# 26. Contexte de révélation du carrousel

Créer :

```js
carousel.createRevealContext(cardId)
```

Ce contexte doit être compatible avec le moteur actuel.

Exemple :

```js
{
  contentEl: carouselContainerEl,
  chromeEls: [
    headerEl,
    searchFormEl
  ],
  neighborMotions: [
    {
      el,
      x,
      y,
      rotation
    }
  ],

  async restore() {
    // restaure cartes, filtres et chrome
  }
}
```

## Règles

- la carte ciblée n’est pas incluse dans `neighborMotions` ;
- les cartes voisines s’écartent à partir de leur position courante ;
- les mouvements ne doivent pas détruire la géométrie du carrousel ;
- la restauration doit recalculer ou réappliquer l’état visuel normal ;
- le proxy Draggable ne doit pas être déplacé pendant la révélation ;
- après retour, le carrousel reste centré sur la carte révélée.

---

# 27. Interaction entre transform du carrousel et moteur

Le carrousel anime actuellement :

```text
x
y
z
rotateY
scale
opacity
```

Le moteur clone l’élément source depuis son rectangle visible.

Assure-toi que :

- `getBoundingClientRect()` reflète bien la carte active ;
- la carte active est totalement stabilisée avant le clone ;
- aucun tween de snap ne reste actif ;
- le clone démarre exactement à la position visible ;
- l’original devient invisible sans provoquer de saut ;
- le retour rejoint le rectangle recalculé de la carte active ;
- la géométrie du carrousel est restaurée après le retour.

---

# 28. Stockage de progression V2

## Problème actuel

Le carrousel relit actuellement :

```text
zythohunt_revealed
```

en interprétant le JSON comme un objet, alors que l’ancien laboratoire l’enregistre comme tableau d’indices.

Cette logique est incorrecte et doit être supprimée.

## Nouveau store

Créer :

```text
artifacts/zythohunt/src/discovery/discovery-store.js
```

Clé :

```text
zythohunt_progress_v2
```

Format minimal :

```js
{
  schemaVersion: 2,
  discoveredCardIds: [
    "stout",
    "imperial-stout"
  ]
}
```

ou :

```js
{
  schemaVersion: 2,
  discovered: {
    "stout": {
      discoveredAt: "..."
    }
  }
}
```

La seconde forme est préférable.

## API

```js
const store = createDiscoveryStore();

store.isDiscovered(cardId);
store.markDiscovered(cardId);
store.reset();
store.getDiscoveredIds();
```

Aucun composant visuel ne doit appeler directement `localStorage`.

---

# 29. Migration de l’ancien stockage

Ancienne clé :

```text
zythohunt_revealed
```

Ancien format réel :

```js
[0, 4, 8]
```

Correspondance historique :

```js
{
  0: "stout",
  4: "imperial-stout",
  8: "baltic-porter"
}
```

Migration :

1. lire `zythohunt_progress_v2` ;
2. s’il est valide, l’utiliser ;
3. sinon lire `zythohunt_revealed` ;
4. si c’est un tableau, utiliser les valeurs du tableau ;
5. convertir les indices connus ;
6. écrire le nouveau format ;
7. ignorer les indices inconnus ;
8. ne pas migrer les placeholders ;
9. conserver l’ancienne clé pendant cette phase ;
10. documenter sa suppression future.

---

# 30. Progression

Le header doit afficher :

```text
0 / 3 révélées
1 / 3 révélées
2 / 3 révélées
3 / 3 révélées
```

Le dénominateur est :

```text
3
```

car seules trois vraies cartes sont révélables.

Les six cartes factices ne doivent pas compter dans la progression.

Ne code pas le texte `/ 3` directement dans plusieurs endroits.

Calcule-le depuis le nombre de cartes `revealable`.

---

# 31. Panneau de réglages fusionné

## Suppressions

Supprime :

```text
#carousel-settings-btn
#carousel-debug-panel
#carousel-debug-close
#carousel-debug-body
#carousel-debug-reset
```

Conserve un seul bouton :

```text
#settings-btn
```

Conserve un seul panneau :

```text
#debug-panel
```

## Contenu du panneau

Fusionne deux sections clairement séparées :

### Section Révélation

Conserver les contrôles existants :

- durée d’extraction ;
- durée du retournement ;
- perspective ;
- inclinaison X ;
- inclinaison Z ;
- échelle finale si encore utilisée ;
- déplacement des voisins ;
- flou de fond ;
- lueur ;
- reflet spéculaire.

### Section Carrousel

Conserver les contrôles validés :

- espacement ;
- profondeur ;
- rotation latérale ;
- réduction d’échelle ;
- échelle minimale ;
- réduction d’opacité ;
- opacité minimale ;
- durée du snap.

Si le carrousel validé possède d’autres tokens utiles, conserve-les.

## Actions de laboratoire

Ajouter :

```text
Centrer Stout
Centrer Imperial Stout
Centrer Baltic Porter
Rejouer la révélation de la carte active
Réinitialiser les découvertes
Réinitialiser les réglages de révélation
Réinitialiser les réglages du carrousel
Réinitialiser tous les réglages
```

## Rejouer la révélation

Le bouton de rejeu :

- fonctionne uniquement si la carte active est une vraie carte ;
- peut forcer le mode `full` sans modifier le stockage ;
- ne marque pas une carte factice ;
- sert uniquement au laboratoire ;
- respecte les verrous.

---

# 32. Actions après révélation

Pour ce prototype, simplifie l’overlay de fin.

Conserve :

```text
Continuer
```

Supprime :

```text
Voir la fiche
```

Supprime également :

```text
#data-panel
```

et toute logique associée.

La mention :

```text
Entrée ajoutée à la Brassopédie
```

doit être remplacée par un texte neutre :

```text
Carte ajoutée à la collection
```

Le prototype ne contient pas encore de Brassopédie fonctionnelle.

---

# 33. Header

Conserve :

```text
ZYTHOHUNT
```

Sous-titre recommandé :

```text
Collection Porters & Stouts
```

Le header affiche :

- marque ;
- sous-titre ;
- progression ;
- bouton réglages.

Aucun bouton inférieur.

---

# 34. Layout sans navigation basse

Adapte :

```text
artifacts/zythohunt/src/styles.css
```

ou scinde progressivement les styles.

Le carrousel doit utiliser tout l’espace disponible entre :

- header ;
- formulaire ;
- marge basse sûre.

L’overlay de révélation ne doit plus réserver la hauteur de `--nav-h`.

La position des actions doit utiliser :

```css
bottom: calc(env(safe-area-inset-bottom, 0px) + 24px);
```

ou une valeur équivalente.

---

# 35. Préchargement

Le préchargeur doit charger :

- dos de carte ;
- cadre ;
- images des trois vraies cartes.

Les six placeholders ne nécessitent rien de plus.

Avant la révélation, vérifier que l’image ciblée est décodée.

Utiliser si possible :

```js
await image.decode();
```

avec fallback approprié.

---

# 36. Accessibilité

## Formulaire

- label explicite ;
- feedback `aria-live="polite"` ;
- bouton désactivé pendant la révélation ;
- focus visible ;
- message d’erreur non uniquement coloré.

## Cartes factices

Annonce :

```text
Carte non découverte, position X sur 9
```

Ne pas annoncer de nom fictif.

## Vraies cartes non découvertes

Annonce :

```text
Carte non découverte, position X sur 9
```

Ne pas annoncer leur nom avant découverte.

## Cartes découvertes

Annonce :

```text
Imperial Stout, carte découverte, position 5 sur 9
```

## Carte active

Mettre à jour un état accessible :

```text
aria-current="true"
```

ou une solution équivalente.

## Révélation

- dialog modal ;
- focus géré ;
- fermeture uniquement via Continuer ou Escape lorsque l’état le permet ;
- retour du focus cohérent.

---

# 37. Mouvement réduit

Conserve le comportement du moteur.

Pour le carrousel :

- réduire la durée du focus ;
- réduire rotation et profondeur ;
- conserver le snap ;
- conserver le résultat fonctionnel ;
- ne pas supprimer la révélation.

---

# 38. Interactions du carrousel

Conserver :

- drag tactile ;
- drag souris ;
- clic latéral pour centrer ;
- clavier gauche/droite ;
- limites ;
- snap ;
- micro-réaction sur carte non révélable.

Ajouter :

```text
Home
End
```

si cela ne remet pas en cause la mécanique validée.

Pendant la saisie dans l’input, les touches fléchées ne doivent pas piloter le carrousel.

---

# 39. Gestion des clics

## Carte factice active

- aucune révélation ;
- micro-réaction discrète ;
- aucun message révélant un contenu.

## Vraie carte non découverte active

- un clic direct ne révèle rien ;
- micro-réaction discrète ;
- la révélation reste exclusivement liée au champ de saisie.

## Vraie carte découverte active

Pour cette phase :

- pas de viewer ;
- petite pulsation autorisée ;
- aucun nouvel écran ;
- aucune Brassopédie.

---

# 40. Nettoyage du code

Supprime les imports et références devenus morts :

- grille ;
- double debug panel ;
- navigation ;
- fiche ;
- anciennes fonctions de vue ;
- anciens boutons.

Ne laisse pas :

- un contrôleur de Reveal Lab monté mais invisible ;
- un carrousel parallèle ;
- deux systèmes de stockage ;
- deux structures de carte ;
- deux panneaux ;
- des écouteurs liés à des éléments supprimés.

---

# 41. Modules recommandés

Arborescence cible indicative :

```text
artifacts/zythohunt/src/
├── main.js
├── data/
│   ├── cards.js
│   ├── collections.js
│   └── prototype-carousel.js
├── discovery/
│   ├── normalize-text.js
│   ├── beer-resolver.js
│   ├── discovery-store.js
│   └── discovery-controller.js
├── carousel/
│   ├── carousel-controller.js
│   ├── create-carousel-view.js
│   └── carousel-tokens.js
├── reveal/
│   └── reveal-engine.js
├── components/
│   ├── create-card.js
│   └── create-debug-panel.js
└── animation/
    ├── reveal-timeline.js
    └── motion-tokens.js
```

La structure exacte peut varier si elle reste claire.

---

# 42. Fichiers à analyser impérativement

```text
artifacts/zythohunt/index.html
artifacts/zythohunt/src/main.js
artifacts/zythohunt/src/styles.css

artifacts/zythohunt/src/data/cards.js
artifacts/zythohunt/src/data/collections.js

artifacts/zythohunt/src/components/create-card.js
artifacts/zythohunt/src/components/create-debug-panel.js
artifacts/zythohunt/src/components/create-grid.js

artifacts/zythohunt/src/carousel/carousel-controller.js
artifacts/zythohunt/src/carousel/create-carousel-view.js
artifacts/zythohunt/src/carousel/carousel-tokens.js

artifacts/zythohunt/src/reveal/reveal-engine.js
artifacts/zythohunt/src/lab/reveal-lab-controller.js

artifacts/zythohunt/src/animation/reveal-timeline.js
artifacts/zythohunt/src/animation/motion-tokens.js

artifacts/zythohunt/src/utils/preload-assets.js
artifacts/zythohunt/src/utils/geometry.js
artifacts/zythohunt/src/utils/asset-url.js
```

---

# 43. Fichiers autorisés à modifier

```text
artifacts/zythohunt/index.html
artifacts/zythohunt/src/main.js
artifacts/zythohunt/src/styles.css

artifacts/zythohunt/src/data/cards.js
artifacts/zythohunt/src/data/collections.js

artifacts/zythohunt/src/components/create-card.js
artifacts/zythohunt/src/components/create-debug-panel.js

artifacts/zythohunt/src/carousel/carousel-controller.js
artifacts/zythohunt/src/carousel/create-carousel-view.js
artifacts/zythohunt/src/carousel/carousel-tokens.js

artifacts/zythohunt/src/reveal/reveal-engine.js
artifacts/zythohunt/src/animation/reveal-timeline.js

artifacts/zythohunt/src/utils/preload-assets.js
```

Créer les modules de découverte nécessaires.

---

# 44. Modifications à limiter

Le moteur de révélation peut être adapté uniquement pour :

- fonctionner avec le carrousel ;
- gérer proprement le nouveau contexte ;
- simplifier les actions de fin ;
- corriger le retour ;
- exposer un hook nécessaire.

Ne réécris pas son architecture.

Ne modifie pas volontairement les tokens de révélation validés.

---

# 45. Aucune nouvelle dépendance

Ne rajoute pas :

- React ;
- Vue ;
- Svelte ;
- Swiper ;
- Embla ;
- Three.js ;
- moteur de state externe ;
- bibliothèque fuzzy search ;
- bibliothèque de formulaire ;
- nouvelle dépendance d’animation.

Utilise :

- JavaScript vanilla ;
- GSAP ;
- GSAP Draggable ;
- Vite ;
- les outils déjà présents.

---

# 46. Gestion des erreurs

Toute erreur pendant une découverte doit :

1. tuer les tweens concernés ;
2. restaurer l’original ;
3. restaurer le carrousel ;
4. restaurer l’overlay ;
5. lever tous les verrous ;
6. réactiver le formulaire ;
7. afficher un retour utilisateur ;
8. ne pas marquer la carte comme découverte.

Utilise `try / catch / finally`.

---

# 47. Cas limites à gérer

- saisie vide ;
- style inconnu ;
- double soumission ;
- carte déjà découverte ;
- carte factice active ;
- changement d’orientation pendant le focus ;
- changement d’orientation pendant la révélation ;
- image non chargée ;
- stockage inaccessible ;
- ancien stockage corrompu ;
- appel `focusCard()` avec ID inconnu ;
- fermeture via Escape ;
- reset pendant animation ;
- replay sur placeholder ;
- mouvement réduit.

---

# 48. Vérifications techniques

Exécute :

```bash
pnpm --filter @workspace/zythohunt run typecheck
pnpm --filter @workspace/zythohunt run build
```

Si nécessaire depuis le dossier :

```bash
cd artifacts/zythohunt
pnpm run typecheck
pnpm run build
```

---

# 49. Vérifications manuelles obligatoires

## Chargement

- [ ] L’application s’ouvre sans navigation inférieure.
- [ ] Le carrousel apparaît directement.
- [ ] Il contient 9 cartes.
- [ ] Imperial Stout est centrée.
- [ ] Les 9 cartes sont face dos si le stockage est vierge.
- [ ] Le header affiche `0 / 3 révélées`.

## Carrousel

- [ ] Drag tactile fonctionnel.
- [ ] Drag souris fonctionnel.
- [ ] Snap fonctionnel.
- [ ] Première limite fonctionnelle.
- [ ] Dernière limite fonctionnelle.
- [ ] Pas de boucle.
- [ ] Clic latéral centre.
- [ ] Clic sur carte cachée ne révèle rien.
- [ ] Le clavier fonctionne hors champ.
- [ ] Le clavier ne déplace pas le carrousel pendant la saisie.

## Stout

- [ ] Saisir `Stout`.
- [ ] La carte index 1 se centre.
- [ ] La révélation complète se joue.
- [ ] Seul `Stout` apparaît comme texte sur la carte.
- [ ] Continuer ramène la carte.
- [ ] La carte reste recto.
- [ ] Progression `1 / 3`.

## Imperial Stout

- [ ] Saisir `Imperial Stout`.
- [ ] La carte index 4 se centre.
- [ ] Révélation complète.
- [ ] Seul `Imperial Stout` apparaît.
- [ ] Progression mise à jour.

## Baltic Porter

- [ ] Saisir `porter baltique`.
- [ ] La carte index 7 se centre.
- [ ] Révélation complète.
- [ ] Seul `Baltic Porter` apparaît.
- [ ] Progression mise à jour.

## Alias

- [ ] `stout impérial` cible Imperial Stout.
- [ ] `russian imperial stout` cible Imperial Stout.
- [ ] accents ignorés.
- [ ] casse ignorée.
- [ ] espaces multiples ignorés.
- [ ] tirets normalisés.

## Inconnu

- [ ] Saisie inconnue.
- [ ] Aucun déplacement.
- [ ] Aucune révélation.
- [ ] Message discret.
- [ ] Progression inchangée.

## Déjà découverte

- [ ] Saisir un style déjà découvert.
- [ ] Carte centrée.
- [ ] Pas de grande révélation.
- [ ] Halo court.
- [ ] Message approprié.
- [ ] Progression inchangée.

## Reset

- [ ] Reset des découvertes.
- [ ] Les 3 vraies cartes reviennent face dos.
- [ ] Les 6 placeholders restent face dos.
- [ ] Progression `0 / 3`.
- [ ] Aucun rechargement obligatoire si possible.

## Réglages

- [ ] Un seul bouton de réglages.
- [ ] Un seul panneau.
- [ ] Section Révélation fonctionnelle.
- [ ] Section Carrousel fonctionnelle.
- [ ] Reset révélation fonctionnel.
- [ ] Reset carrousel fonctionnel.
- [ ] Reset global fonctionnel.
- [ ] Rejeu fonctionne sur vraie carte.
- [ ] Rejeu refusé proprement sur placeholder.

## Responsive

- [ ] iPhone portrait.
- [ ] iPhone paysage.
- [ ] iPad portrait.
- [ ] iPad paysage.
- [ ] Desktop.
- [ ] Pas de scroll horizontal parasite.
- [ ] Actions visibles sans navigation basse.

---

# 50. Critères d’acceptation

La phase 4 est terminée uniquement si :

## Vue unique

- [ ] Les quatre boutons du bas sont supprimés.
- [ ] Une seule vue reste.
- [ ] La grille 3×3 n’est plus utilisée.
- [ ] Le carrousel est l’unique source des cartes.

## Carrousel

- [ ] Exactement 9 cartes.
- [ ] 3 vraies.
- [ ] 6 factices.
- [ ] Vraies cartes aux index 1, 4 et 7.
- [ ] Imperial Stout active au démarrage.
- [ ] Carrousel limité.
- [ ] Draggable conservé.
- [ ] `focusCard(cardId)` existe.
- [ ] `getCardElement(cardId)` existe.
- [ ] `setDiscovered(cardId)` existe.
- [ ] `lock()` et `unlock()` existent.

## Révélation

- [ ] Déclenchement uniquement par saisie.
- [ ] Aucune révélation par clic.
- [ ] Révélation depuis la vraie carte du carrousel.
- [ ] Retour vers la vraie carte du carrousel.
- [ ] Carte recto persistante après retour.
- [ ] Carte déjà découverte non révélée à nouveau automatiquement.

## Carte

- [ ] Une seule structure DOM principale.
- [ ] Illustration conservée.
- [ ] Cadre conservé.
- [ ] Seul le nom du style est affiché.
- [ ] Type supprimé du rendu.
- [ ] Chemin supprimé du rendu.
- [ ] Tagline supprimée du rendu.

## Saisie

- [ ] Résolveur pur.
- [ ] Normalisation correcte.
- [ ] Alias corrects.
- [ ] Aucun autocomplete révélant les réponses.
- [ ] Inconnu géré proprement.
- [ ] Placeholders exclus.

## Stockage

- [ ] Nouveau stockage par `cardId`.
- [ ] Migration de l’ancien tableau d’indices.
- [ ] Progression calculée sur 3 cartes.
- [ ] Aucun accès direct au stockage depuis le carrousel.

## Réglages

- [ ] Un seul panneau.
- [ ] Révélation et carrousel fusionnés.
- [ ] Actions de laboratoire présentes.
- [ ] Ancien panneau carrousel supprimé.

## Nettoyage

- [ ] Navigation supprimée.
- [ ] Fiche supprimée.
- [ ] Imports morts supprimés.
- [ ] Contrôleurs invisibles supprimés.
- [ ] Aucune seconde structure de carte.
- [ ] Aucune nouvelle dépendance.

## Qualité

- [ ] Typecheck réussi.
- [ ] Build réussi.
- [ ] Aucune erreur console bloquante.
- [ ] Aucun tween orphelin.
- [ ] Aucun Draggable orphelin.
- [ ] Mouvement réduit fonctionnel.
- [ ] GitHub Pages compatible.

---

# 51. Livrable final demandé

À la fin :

1. résume l’architecture finale ;
2. liste les fichiers créés ;
3. liste les fichiers modifiés ;
4. liste les fichiers supprimés ;
5. explique l’unification du composant carte ;
6. explique le parcours de découverte ;
7. explique la migration du stockage ;
8. explique le contexte de révélation du carrousel ;
9. donne les résultats du typecheck ;
10. donne les résultats du build ;
11. signale les défauts connus ;
12. signale les éléments reportés ;
13. crée un commit logique.

Message recommandé :

```text
feat(lab): integrate carousel with reveal flow
```

Pousse la branche :

```text
feature/integrate-carousel-reveal
```

Ne fusionne pas dans `main`.

---

# 52. Interdictions finales

Ne crée pas :

- plusieurs collections ;
- viewer de carte ;
- Brassopédie ;
- profil ;
- backend ;
- compte utilisateur ;
- synchronisation cloud ;
- QR code ;
- scan photo ;
- nouvelle image ;
- nouvelle carte réelle ;
- système de rareté ;
- score ;
- animation sonore ;
- framework.

La phase 4 doit uniquement produire un prototype cohérent de :

```text
saisie
→ carrousel
→ focus
→ révélation
→ retour
→ progression
```
