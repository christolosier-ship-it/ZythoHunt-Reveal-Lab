# Mission Codex — Extraction du moteur de révélation ZythoHunt

## Contexte

Tu travailles dans le dépôt GitHub :

```text
christolosier-ship-it/ZythoHunt-Reveal-Lab
```

Le prototype actuellement publié est fonctionnel et son animation de révélation est visuellement validée.

Avant toute modification, lis intégralement le document suivant présent dans le dépôt :

```text
docs/architecture/ZYTHOHUNT_CAHIER_INTEGRATION_COLLECTIONS.md
```

Pour cette mission, concentre-toi uniquement sur les sections relatives :

- à l’audit du Reveal Lab actuel ;
- à l’architecture cible ;
- au contrat du moteur de révélation ;
- au Lot 2 : extraction du moteur de révélation ;
- aux critères de non-régression.

Ne réalise pas les autres lots du cahier d’intégration.

---

# Objectif unique de la mission

Transformer l’animation actuelle en un **moteur de révélation autonome, instanciable et déclenchable par une API explicite**, sans modifier son rendu visuel ni son comportement perceptible dans le Reveal Lab.

Le résultat attendu doit permettre de déclencher la révélation depuis un appel JavaScript et non plus depuis une logique directement intégrée au contrôleur actuel.

Le Reveal Lab doit continuer à fonctionner comme aujourd’hui grâce à un contrôleur de laboratoire séparé qui utilise ce nouveau moteur.

---

# Règle absolue de non-régression

La première refactorisation doit être **visuellement neutre**.

Ne modifie pas volontairement :

- les durées ;
- les easings ;
- la perspective ;
- la taille finale de la carte ;
- l’intensité des halos ;
- le reflet spéculaire ;
- les inclinaisons ;
- le flou ;
- les ombres ;
- l’ordre d’apparition du recto ;
- le comportement du bouton Continuer ;
- le comportement du bouton Voir la fiche ;
- le mode `prefers-reduced-motion` ;
- les assets ;
- la direction artistique ;
- la structure visuelle de la carte.

Le laboratoire après refactorisation doit produire la même animation que la version actuelle.

---

# Branche de travail

Ne travaille pas directement sur `main`.

Crée et utilise une branche dédiée :

```text
feature/extract-reveal-engine
```

Si cette branche existe déjà, utilise-la sans écraser des modifications non liées.

Avant de modifier le code :

1. vérifie l’état Git ;
2. identifie le commit de départ ;
3. vérifie qu’aucune modification utilisateur non commitée ne sera écrasée ;
4. inspecte le code actuel concerné.

---

# Fichiers à analyser impérativement

Analyse au minimum :

```text
artifacts/zythohunt/index.html

artifacts/zythohunt/src/main.js

artifacts/zythohunt/src/animation/reveal-controller.js
artifacts/zythohunt/src/animation/reveal-timeline.js
artifacts/zythohunt/src/animation/motion-tokens.js

artifacts/zythohunt/src/components/create-grid.js
artifacts/zythohunt/src/components/create-card.js
artifacts/zythohunt/src/components/create-debug-panel.js

artifacts/zythohunt/src/utils/geometry.js
artifacts/zythohunt/src/utils/preload-assets.js
artifacts/zythohunt/src/utils/asset-url.js

artifacts/zythohunt/src/styles.css

artifacts/zythohunt/package.json
artifacts/zythohunt/vite.config.ts
```

---

# Problèmes actuels à corriger dans cette mission

Le contrôleur actuel mélange plusieurs responsabilités :

- écoute des clics des cartes ;
- verrouillage des interactions ;
- choix entre révélation complète et rapide ;
- lecture de l’état de découverte ;
- écriture dans le stockage ;
- calcul de progression ;
- pilotage de la timeline ;
- création et retour du clone ;
- gestion du panneau de fiche ;
- gestion des boutons ;
- rejeu de laboratoire ;
- écoute clavier globale.

Les variables suivantes sont actuellement globales au module :

```js
let isAnimating = false;
let currentClone = null;
let currentRevealedIndex = null;
let lastRevealedCardData = null;
```

Elles doivent devenir privées à une instance.

La timeline connaît également une géométrie de grille 3×3 à travers :

```js
allCardEls
cardIndex
computeNeighborShifts(...)
```

Le futur moteur ne doit pas connaître une grille 3×3.

---

# Architecture demandée pour cette mission

Créer au minimum les deux responsabilités suivantes.

## 1. Moteur générique

Créer :

```text
artifacts/zythohunt/src/reveal/reveal-engine.js
```

Ce module doit exposer une fabrique :

```js
export function createRevealEngine(options) {
  // ...
}
```

Le moteur doit être instanciable et ne contenir aucun état global partagé entre plusieurs instances.

API publique minimale attendue :

```js
const revealEngine = createRevealEngine({
  stageEl,
  overlayEl,
  revealOverlay,
  revealActions,
  revealHeadline,
  motionTokens
});

await revealEngine.reveal({
  cardEl,
  cardData,
  sceneContext,
  mode: "full"
});

await revealEngine.returnToSource();

const busy = revealEngine.isBusy();

revealEngine.destroy();
```

Les noms précis peuvent légèrement varier si une meilleure API est justifiée, mais les capacités suivantes sont obligatoires :

- lancer une révélation complète ;
- lancer éventuellement la révélation rapide déjà existante ;
- indiquer si le moteur est occupé ;
- ramener la carte vers sa source ;
- nettoyer complètement l’instance ;
- retourner des Promises fiables ;
- ne pas dépendre d’un index de grille ;
- ne pas gérer lui-même la persistance ;
- ne pas calculer la progression ;
- ne pas attacher lui-même les clics de découverte ;
- ne pas ouvrir lui-même le panneau de fiche.

## 2. Contrôleur spécifique au laboratoire

Créer un contrôleur de laboratoire séparé, par exemple :

```text
artifacts/zythohunt/src/lab/reveal-lab-controller.js
```

Ce contrôleur conserve provisoirement les comportements propres au Reveal Lab :

- attacher les clics sur les cartes du laboratoire ;
- déterminer si la carte est déjà révélée ;
- conserver l’ancien stockage du laboratoire pour cette mission ;
- calculer et afficher la progression actuelle ;
- gérer le bouton Continuer ;
- gérer le bouton Voir la fiche ;
- gérer le panneau de fiche ;
- gérer le rejeu du panneau de debug ;
- construire le contexte de scène de la grille 3×3 ;
- appeler le nouveau moteur.

Ce contrôleur est un adaptateur temporaire entre l’ancien laboratoire et le nouveau moteur.

Il ne doit pas dupliquer la timeline GSAP.

---

# Contrat du `sceneContext`

Le moteur ne doit plus calculer lui-même la géométrie d’une grille 3×3.

Le contrôleur de laboratoire peut encore utiliser :

```js
computeNeighborShifts(...)
```

mais il doit transformer ce résultat en un contexte générique transmis au moteur.

Structure recommandée :

```js
const sceneContext = {
  contentEl: gridContainer,
  chromeEls: [navEl, headerEl],

  neighborMotions: [
    {
      el,
      x,
      y,
      rotation
    }
  ],

  async isolate() {
    // optionnel
  },

  async restore() {
    // optionnel
  }
};
```

Deux approches sont acceptables :

### Approche A, recommandée

Le moteur reçoit une liste générique `neighborMotions` et applique les mouvements dans sa timeline.

Il ne connaît ni les lignes, ni les colonnes, ni les indices de grille.

### Approche B

Le contexte expose des callbacks `isolate()` et `restore()` que le moteur appelle.

Dans les deux cas, le moteur ne doit plus importer directement une fonction supposant trois colonnes.

---

# Timeline GSAP

Conserve autant que possible :

```text
artifacts/zythohunt/src/animation/reveal-timeline.js
```

Tu peux l’adapter pour recevoir un contexte générique.

La timeline doit continuer à gérer les phases existantes :

1. isolation de la scène ;
2. déplacement des voisins ;
3. extraction de la carte ;
4. tension lumineuse ;
5. retournement 3D ;
6. construction progressive du recto ;
7. signature lumineuse ;
8. stabilisation.

La fonction principale peut évoluer de :

```js
createRevealTimeline({
  cardEl,
  cardData,
  allCardEls,
  cardIndex,
  stageEl,
  overlayEl,
  gridEl,
  navEl,
  headerEl
});
```

vers une API générique de ce type :

```js
createRevealTimeline({
  cardEl,
  cardData,
  stageEl,
  overlayEl,
  sceneContext
});
```

Ne change pas les valeurs d’animation pendant cette mission.

---

# Gestion du retour vers la carte source

Le moteur doit conserver la capacité actuelle à ramener la carte vers son emplacement d’origine.

Au moment du retour :

1. retrouve ou utilise l’élément source ;
2. recalcule son `getBoundingClientRect()` ;
3. ne réutilise pas aveuglément le rectangle capturé au début ;
4. anime le clone vers le rectangle actuel ;
5. permet au contrôleur de laboratoire de préparer l’original en face recto ;
6. restaure l’opacité de l’original ;
7. retire le clone ;
8. restaure la scène ;
9. résout la Promise uniquement lorsque le nettoyage visuel est terminé.

Prévoir un callback ou hook explicite, par exemple :

```js
beforeSourceRestore({ cardEl, cardData })
```

ou :

```js
onPrepareSourceFront({ cardEl, cardData })
```

Le moteur ne doit pas décider comment la progression est enregistrée.

---

# État interne du moteur

Utilise un état privé à l’instance, par exemple :

```js
let state = "idle";
let currentTimeline = null;
let currentClone = null;
let currentSourceEl = null;
let currentCardData = null;
```

États recommandés :

```text
idle
preparing
revealing
complete
returning
destroyed
```

Les appels invalides doivent être gérés proprement.

Exemples :

- un second `reveal()` pendant une animation ne doit pas lancer une deuxième timeline ;
- `returnToSource()` sans révélation active ne doit pas planter ;
- `destroy()` peut être appelé plusieurs fois sans erreur ;
- une erreur doit restaurer autant que possible la carte source et l’overlay.

---

# Promesses et synchronisation

Ne chaîne pas les étapes avec des `setTimeout()` arbitraires.

Les méthodes asynchrones doivent se résoudre à partir de la fin réelle des timelines GSAP.

Exemple attendu :

```js
await revealEngine.reveal(...);
```

Cette Promise se résout lorsque la révélation principale et la stabilisation sont terminées.

```js
await revealEngine.returnToSource();
```

Cette Promise se résout lorsque :

- le clone est revenu ;
- l’original est restauré ;
- le clone est retiré ;
- le contexte visuel est rétabli.

---

# Mouvement réduit

Le comportement existant `prefers-reduced-motion` doit continuer à fonctionner.

Amélioration autorisée sans modifier le rendu normal :

- éviter une constante globale figée au chargement ;
- lire la préférence au moment de lancer la révélation ou utiliser un `MediaQueryList`.

Le mode réduit doit conserver le même résultat fonctionnel :

- carte révélée ;
- recto visible ;
- retour possible ;
- actions disponibles.

---

# Persistance et progression

Pour cette mission uniquement :

- ne migre pas encore le stockage par indices vers le stockage par `cardId` ;
- conserve le comportement actuel du laboratoire ;
- déplace seulement cette responsabilité hors du moteur ;
- le moteur ne doit importer ni `saveRevealedState`, ni `create-grid.js` ;
- le moteur ne doit connaître ni le nombre `3`, ni les positions `0`, `4`, `8`.

La migration du stockage sera traitée dans une mission distincte.

---

# Gestion du panneau de fiche

Le nouveau moteur ne doit pas générer les champs :

```text
Type
Chemin
Description
```

La construction et l’ouverture du panneau de fiche restent dans le contrôleur du laboratoire.

Le moteur peut seulement exposer la carte courante ou retourner le résultat de révélation :

```js
{
  status: "completed",
  cardData
}
```

---

# Gestion des boutons

Le bouton `Continuer` doit appeler le retour du moteur depuis le contrôleur du laboratoire.

Exemple :

```js
btnContinue.addEventListener("click", async () => {
  await revealEngine.returnToSource();
});
```

Le bouton `Voir la fiche` reste géré par le contrôleur du laboratoire.

Évite que le moteur attache plusieurs fois les mêmes écouteurs si le laboratoire est remonté.

---

# Nettoyage et cycle de vie

Le moteur doit exposer :

```js
destroy()
```

Cette méthode doit :

- tuer toute timeline active ;
- retirer le clone actif ;
- restaurer l’élément source ;
- restaurer l’overlay ;
- restaurer les éléments de scène ;
- retirer ses éventuels écouteurs ;
- rendre les appels ultérieurs inoffensifs ou explicitement invalides ;
- éviter toute fuite d’état.

Le contrôleur de laboratoire doit également exposer :

```js
destroy()
```

Il doit retirer :

- les clics de cartes ;
- les événements clavier ;
- les événements des boutons ;
- les événements du panneau de fiche ;
- les événements de debug qu’il possède.

Utilise des références de fonctions ou un `AbortController` pour faciliter le nettoyage.

---

# Fichiers autorisés à modifier

Tu peux modifier les fichiers strictement nécessaires parmi :

```text
artifacts/zythohunt/src/main.js

artifacts/zythohunt/src/animation/reveal-controller.js
artifacts/zythohunt/src/animation/reveal-timeline.js

artifacts/zythohunt/src/components/create-grid.js
artifacts/zythohunt/src/components/create-card.js

artifacts/zythohunt/src/utils/geometry.js

artifacts/zythohunt/src/styles.css
```

Tu peux créer :

```text
artifacts/zythohunt/src/reveal/reveal-engine.js
artifacts/zythohunt/src/lab/reveal-lab-controller.js
```

Tu peux proposer une légère variante d’arborescence si elle est plus cohérente, mais ne déplace pas massivement tous les fichiers dans cette mission.

---

# Fichiers et comportements à ne pas modifier

Ne modifie pas, sauf nécessité technique démontrée :

```text
artifacts/zythohunt/src/data/cards.js
artifacts/zythohunt/src/animation/motion-tokens.js
artifacts/zythohunt/src/components/create-debug-panel.js
artifacts/zythohunt/src/utils/preload-assets.js
artifacts/zythohunt/src/utils/asset-url.js
artifacts/zythohunt/public/assets/
artifacts/zythohunt/vite.config.ts
```

Ne réalise pas :

- le carrousel ;
- la fenêtre de saisie finale ;
- le résolveur de styles ;
- les collections multiples ;
- la migration du stockage ;
- le viewer final ;
- GSAP Flip ;
- GSAP Draggable ;
- la Brassopédie ;
- une refonte CSS ;
- une migration React ;
- une nouvelle dépendance.

---

# Nettoyages permis

Tu peux supprimer ou corriger pendant cette mission les éléments manifestement morts si cela ne modifie pas le rendu :

- imports inutilisés ;
- variables inutilisées ;
- commentaires devenus faux ;
- état global remplacé par l’état d’instance ;
- écouteurs non nettoyables ;
- import direct du stockage depuis le moteur ;
- import direct de la géométrie 3×3 depuis le moteur.

Ne transforme pas cette mission en nettoyage général du projet.

---

# Compatibilité attendue

Le projet doit continuer à fonctionner :

- en développement Vite ;
- dans Replit ;
- après build Vite ;
- sur GitHub Pages avec un `BASE_PATH` non racine ;
- sur Safari iPhone ;
- sur Safari iPad ;
- sur Chrome desktop.

Ne remplace pas l’utilitaire `assetUrl()`.

---

# Vérifications obligatoires

Exécute au minimum :

```bash
pnpm --filter @workspace/zythohunt run typecheck
pnpm --filter @workspace/zythohunt run build
```

Si le filtre exact ne fonctionne pas depuis l’environnement courant, exécute les scripts équivalents depuis :

```text
artifacts/zythohunt
```

Vérifie également manuellement ou avec le navigateur disponible :

1. chargement du laboratoire ;
2. révélation d’une carte non découverte ;
3. apparition du message de fin ;
4. ouverture de la fiche ;
5. fermeture de la fiche ;
6. bouton Continuer ;
7. retour exact vers la grille ;
8. carte restant face recto ;
9. révélation rapide d’une carte déjà découverte ;
10. touche `Escape` ;
11. panneau debug ;
12. rejeu ;
13. réinitialisation ;
14. mouvement réduit ;
15. absence d’erreur bloquante en console.

---

# Critères d’acceptation obligatoires

La mission est terminée uniquement si tous les points suivants sont vrais.

## Architecture

- [ ] `createRevealEngine()` existe.
- [ ] Le moteur est instanciable.
- [ ] L’état critique est privé à l’instance.
- [ ] Le moteur expose une méthode de révélation.
- [ ] Le moteur expose une méthode de retour.
- [ ] Le moteur expose `isBusy()` ou un équivalent.
- [ ] Le moteur expose `destroy()`.
- [ ] Le laboratoire utilise le moteur via un adaptateur séparé.
- [ ] La timeline principale n’est pas dupliquée.

## Découplage

- [ ] Le moteur n’attache pas les clics des cartes.
- [ ] Le moteur n’écrit pas dans `localStorage`.
- [ ] Le moteur n’importe pas `saveRevealedState`.
- [ ] Le moteur ne calcule pas la progression.
- [ ] Le moteur ne génère pas le panneau de fiche.
- [ ] Le moteur ne dépend pas d’un index de grille.
- [ ] Le moteur ne dépend pas du nombre total de cartes.
- [ ] Le moteur ne calcule pas lui-même une géométrie 3×3.

## Fonctionnel

- [ ] La révélation complète fonctionne.
- [ ] La révélation rapide fonctionne.
- [ ] Le retour fonctionne.
- [ ] L’original est restauré correctement.
- [ ] Le clone est toujours supprimé.
- [ ] L’overlay est restauré.
- [ ] Les voisins sont restaurés.
- [ ] Les interactions sont réactivées.
- [ ] Les doubles déclenchements sont bloqués.
- [ ] `Escape` fonctionne comme avant.
- [ ] Le panneau de fiche fonctionne comme avant.
- [ ] Le panneau de debug fonctionne comme avant.
- [ ] Le mode mouvement réduit fonctionne.

## Non-régression

- [ ] Les durées n’ont pas changé volontairement.
- [ ] Les easings n’ont pas changé volontairement.
- [ ] La taille de la carte n’a pas changé volontairement.
- [ ] La perspective n’a pas changé volontairement.
- [ ] Les halos et ombres n’ont pas changé volontairement.
- [ ] L’ordre des phases reste identique.
- [ ] Les assets restent identiques.
- [ ] Le build réussit.
- [ ] Aucune nouvelle dépendance n’a été ajoutée.

---

# Livrable attendu de Codex

À la fin de la mission :

1. fournis un résumé clair de l’architecture créée ;
2. liste les fichiers créés ;
3. liste les fichiers modifiés ;
4. explique les responsabilités du moteur ;
5. explique les responsabilités du contrôleur de laboratoire ;
6. indique les commandes de test exécutées ;
7. indique leurs résultats ;
8. signale toute différence visuelle ou fonctionnelle restante ;
9. signale tout point reporté à la mission suivante ;
10. fournis le commit ou prépare un commit logique unique.

Message de commit recommandé :

```text
refactor(reveal): extract standalone reveal engine
```

---

# Interdiction de dérive de périmètre

N’implémente aucun carrousel dans cette mission.

N’implémente aucune collection multiple.

N’implémente aucun champ de reconnaissance.

N’implémente aucune nouvelle fonctionnalité produit.

Le seul but est de séparer proprement le moteur de révélation du laboratoire actuel tout en conservant une démonstration strictement fonctionnelle et visuellement identique.
