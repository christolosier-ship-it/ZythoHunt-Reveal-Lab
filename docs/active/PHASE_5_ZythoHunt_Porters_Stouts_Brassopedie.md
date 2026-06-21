# PHASE 5 · ZythoHunt Reveal Lab
## Carrousel complet Porters & Stouts + ouverture Brassopédie

> Document à donner à Codex.  
> Objectif : intégrer les 22 cartes de la collection **Porters & Stouts**, remplacer le prototype actuel, puis ouvrir une fiche Brassopédie quand une carte révélée est zoomée.  
> Important : Codex doit travailler sur une branche dédiée et ouvrir une Pull Request brouillon. Ne pas merger automatiquement.

---

# 0. Instruction de lancement pour Codex

Copie-colle ce message dans Codex :

```text
Tu travailles sur le repo GitHub :

christolosier-ship-it/ZythoHunt-Reveal-Lab

Avant de coder :
1. Lis entièrement ce markdown.
2. Inspecte l’état réel du repo.
3. Vérifie que la branche main est saine.
4. Crée une branche dédiée.
5. N’applique aucune refonte globale non demandée.
6. N’effectue aucun nettoyage CSS massif.
7. Ne modifie pas le style général validé du labo sauf ce qui est strictement nécessaire à la Phase 5.
8. À la fin, pousse la branche et ouvre une Pull Request brouillon vers main.

Tu dois intégrer toutes les étapes de la Phase 5 en une seule branche :
- import des données de collection ;
- import des 22 images ;
- carrousel complet ;
- resolver noms + aliases ;
- zoom des cartes révélées ;
- fiche Brassopédie ;
- tests ;
- validation CI.

Ne merge pas automatiquement.
```

---

# 1. Contexte du projet

Le laboratoire actuel est validé sur les points suivants :

- fond animé bière ;
- carrousel prototype ;
- révélation par saisie ;
- cartes face/dos ;
- clic sur carte non révélée = effet lumineux uniquement ;
- clic sur carte révélée = inspection/zoom ;
- police, couleur et centrage des titres de cartes validés ;
- CI avec typecheck, tests, build et installation figée ;
- moteur de révélation stable ;
- fond animé stable.

Cette Phase 5 transforme le prototype en première vraie collection complète.

---

# 2. Ressources fournies

Les fichiers suivants doivent être intégrés au repo :

```text
index.json
collection-03-porters-et-stouts.json
brassopedie.schema.json
README-BRASSOPEDIE-JSON.md
Taxonomie.md
Porters-stouts.zip
```

Le zip contient :

```text
Porters-stouts/dos-porters-et-stouts.webp
Porters-stouts/face-porters-et-stouts.webp

Porters-stouts/01-english-porter.webp
Porters-stouts/02-brown-porter.webp
Porters-stouts/03-robust-porter.webp
Porters-stouts/04-american-porter.webp
Porters-stouts/05-pre-prohibition-porter.webp
Porters-stouts/06-baltic-porter.webp
Porters-stouts/07-american-imperial-porter.webp
Porters-stouts/08-smoke-porter.webp
Porters-stouts/09-dry-stout-irish-dry-stout.webp
Porters-stouts/10-irish-extra-stout.webp
Porters-stouts/11-export-stout-foreign-extra-stout.webp
Porters-stouts/12-tropical-stout.webp
Porters-stouts/13-sweet-milk-cream-stout.webp
Porters-stouts/14-oatmeal-stout.webp
Porters-stouts/15-american-stout.webp
Porters-stouts/16-imperial-stout.webp
Porters-stouts/17-british-imperial-stout.webp
Porters-stouts/18-american-imperial-stout.webp
Porters-stouts/19-porter.webp
Porters-stouts/20-stout.webp
Porters-stouts/21-dessert-pastry-beer.webp
Porters-stouts/22-coffee-stout-or-porter.webp
```

Ignorer tous les fichiers parasites :

```text
__MACOSX
.DS_Store
```

---

# 3. Branche de travail

Créer une branche dédiée depuis `main` :

```bash
git checkout main
git pull
git checkout -b feature/porters-stouts-brassopedie
```

Avant toute modification, vérifier :

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
```

Si une commande échoue avant modification :
- s’arrêter ;
- documenter l’erreur ;
- ne pas commencer l’intégration tant que `main` n’est pas saine.

---

# 4. Objectif fonctionnel final

Le labo doit afficher un carrousel complet de **22 cartes Porters & Stouts**.

Toutes les cartes sont initialement non découvertes, sauf si le store local contient déjà des découvertes pour cette collection.

La révélation se fait uniquement via le champ de saisie.

## Saisie reconnue

Quand la saisie correspond à un style ou alias :

1. le carrousel focus la carte correspondante ;
2. l’animation de révélation actuelle se joue ;
3. la carte passe côté face ;
4. le compteur devient `x / 22 révélées`.

## Clic sur carte non révélée

- ne révèle rien ;
- n’ouvre pas la Brassopédie ;
- joue uniquement l’effet lumineux existant ;
- optionnel : feedback discret `Carte non révélée`.

## Clic sur carte révélée

- ouvre une modale premium ;
- affiche la grande carte zoomée ;
- affiche la fiche Brassopédie correspondante ;
- les données viennent du JSON de collection.

---

# 5. Architecture cible recommandée

## Données

Créer ou adapter :

```text
src/data/brassopedie/
  index.json
  collection-03-porters-et-stouts.json

src/data/card-assets/
  porters-stouts-assets.js

src/data/porters-stouts-collection.js
```

## Assets images

Placer les images dans :

```text
public/assets/cards/porters-et-stouts/
```

Utiliser `assetUrl` si l’utilitaire existe déjà dans le repo, afin que GitHub Pages fonctionne avec le `BASE_PATH`.

## Manifest d’images obligatoire

Créer un mapping explicite `id → image`.

Ne jamais baser la logique sur l’ordre numérique des images.

```js
export const porterStoutCardImages = {
  "english-porter": "01-english-porter.webp",
  "brown-porter": "02-brown-porter.webp",
  "robust-porter": "03-robust-porter.webp",
  "american-porter": "04-american-porter.webp",
  "pre-prohibition-porter": "05-pre-prohibition-porter.webp",
  "baltic-porter": "06-baltic-porter.webp",
  "american-imperial-porter": "07-american-imperial-porter.webp",
  "smoke-porter": "08-smoke-porter.webp",
  "dry-stout-irish-dry-stout": "09-dry-stout-irish-dry-stout.webp",
  "irish-extra-stout": "10-irish-extra-stout.webp",
  "export-stout-foreign-extra-stout": "11-export-stout-foreign-extra-stout.webp",
  "tropical-stout": "12-tropical-stout.webp",
  "sweet-milk-cream-stout": "13-sweet-milk-cream-stout.webp",
  "oatmeal-stout": "14-oatmeal-stout.webp",
  "american-stout": "15-american-stout.webp",
  "imperial-stout": "16-imperial-stout.webp",
  "british-imperial-stout": "17-british-imperial-stout.webp",
  "american-imperial-stout": "18-american-imperial-stout.webp",
  "porter": "19-porter.webp",
  "stout": "20-stout.webp",
  "dessert-pastry-beer": "21-dessert-pastry-beer.webp",
  "coffee-stout-or-porter": "22-coffee-stout-or-porter.webp"
};
```

Ajouter aussi la configuration :

```js
export const porterStoutCollectionAssets = {
  basePath: "assets/cards/porters-et-stouts",
  cardBack: "dos-porters-et-stouts.webp",
  collectionFace: "face-porters-et-stouts.webp"
};
```

---

# 6. Étape 1 · Import propre des données

Créer un module :

```text
src/data/porters-stouts-collection.js
```

Il doit exposer :

```js
export const porterStoutCollection;
export const porterStoutCards;
export const porterStoutCardsById;
export const revealablePorterStoutCards;
```

Chaque carte générée doit contenir au minimum :

```js
{
  id,
  name,
  image,
  revealable: true,
  brassopedie: originalJsonEntry
}
```

Toutes les 22 cartes sont révélables dans ce prototype.

## Validations runtime légères

Créer une fonction de validation :

```js
validatePorterStoutCollection()
```

Elle vérifie :

- exactement 22 cartes ;
- IDs uniques ;
- chaque carte possède une image ;
- chaque image du mapping correspond à un ID existant ;
- les fichiers dos et face sont déclarés.

En mode dev, logguer clairement les erreurs.

Éviter de bloquer l’app en production par une exception, sauf import totalement impossible.

---

# 7. Étape 2 · Remplacer le prototype actuel

Remplacer les 9 cartes actuelles par les 22 cartes issues du JSON.

Le carrousel doit suivre **l’ordre du JSON**, pas l’ordre numérique des images.

Conserver :

- fond animé ;
- dos de carte de collection ;
- cadre de carte actuel ;
- typo validée ;
- animation de révélation ;
- comportement clic carte non révélée ;
- réglages laboratoire.

Le compteur doit passer à :

```text
0 / 22 révélées
```

puis évoluer selon le store.

## Store local

Utiliser une clé versionnée par collection, par exemple :

```js
zythohunt.discovery.porters-et-stouts.v1
```

Objectif :
- éviter que les découvertes du prototype 3 cartes polluent la nouvelle collection ;
- permettre de repartir proprement ;
- conserver les découvertes de cette collection entre les rechargements.

---

# 8. Étape 3 · Resolver complet noms + aliases

Adapter ou remplacer le resolver pour travailler depuis le JSON.

Il doit reconnaître :

- `nom`;
- `aliases`;
- éventuellement `id` comme aide de debug.

## Normalisation obligatoire

- casse ignorée ;
- accents ignorés ;
- apostrophes typographiques et droites harmonisées ;
- slash `/` toléré ;
- tirets et espaces normalisés ;
- espaces multiples supprimés ;
- ponctuation mineure ignorée.

## Exemples attendus

```text
Stout → stout
Porter → porter
Imperial Stout → imperial-stout
Russian Imperial Stout → imperial-stout
Smoke Porter → smoke-porter
Smoked Porter → smoke-porter
Dry Stout → dry-stout-irish-dry-stout
Irish Dry Stout → dry-stout-irish-dry-stout
Sweet Stout → sweet-milk-cream-stout
Milk Stout → sweet-milk-cream-stout
Cream Stout → sweet-milk-cream-stout
Coffee Stout → coffee-stout-or-porter
Coffee Porter → coffee-stout-or-porter
```

## Protections importantes

Ne pas faire de fuzzy agressif.

Ces deux cartes doivent rester strictement distinctes :

```text
american-imperial-porter
american-imperial-stout
```

Ne jamais révéler automatiquement un parent ou un enfant.

Exemples :

```text
Saisie "Porter" → révèle uniquement Porter
Saisie "Stout" → révèle uniquement Stout
Saisie "English Porter" → révèle uniquement English Porter
Saisie "Dry Stout" → révèle uniquement Dry Stout / Irish Dry Stout
Saisie "American Imperial Porter" → révèle American Imperial Porter
Saisie "American Imperial Stout" → révèle American Imperial Stout
```

Messages :

```text
Aucun style reconnu dans cette collection.
Cette carte est déjà découverte.
```

---

# 9. Étape 4 · Zoom des cartes révélées

Créer une vraie interaction Brassopédie.

## Carte non révélée

Au clic :

- pas de zoom ;
- pas de fiche ;
- pas de révélation ;
- effet lumineux existant.

## Carte révélée

Au clic :

- ouvrir une modale ou overlay premium ;
- afficher la carte en grand ;
- afficher la fiche Brassopédie à côté ou dessous selon l’écran.

## Fermeture

- bouton `×`;
- touche `Échap`;
- clic sur le voile de fond ;
- ne pas fermer si clic dans le contenu.

## Animation

GSAP autorisé.

Effet attendu :

- carte qui vient au premier plan ;
- fiche en fade/slide doux ;
- rien d’excessif ;
- respecter `prefers-reduced-motion`.

Ne pas perturber le cycle de révélation existant.

---

# 10. Étape 5 · Fiche Brassopédie

Créer des modules dédiés :

```text
src/brassopedie/brassopedie-panel.js
src/brassopedie/brassopedie-panel.css
src/brassopedie/brassopedie-formatters.js
```

## Layout

Sur tablette / desktop paysage :

```text
[ Grande carte ] [ Fiche Brassopédie scrollable ]
```

Sur mobile / portrait :

```text
[ Grande carte ]
[ Fiche Brassopédie scrollable ]
```

## En-tête fiche

Afficher :

- nom du style ;
- nature lisible ;
- origine courte ;
- parent si `parentPrincipalId` existe.

Traduction nature :

```js
F  → Famille
S  → Style
SS → Sous-style
T  → Catégorie transversale
A  → Appellation commerciale
R  → Dénomination ou certification
```

Si parent :

```text
Parent : Stout
```

## Badges profil

Afficher sous forme de badges :

- alcool ;
- amertume ;
- couleur ;
- fermentation ;
- service.

Formats attendus :

```text
Alcool : 8.0–12.0 %
IBU : 50–90
EBC : 60–120
Fermentation : haute
Service : 11–15 °C
```

Si `min` ou `max` est `null` :

```text
Variable
```

Si statut :

- `defini` → valeur normale ;
- `large` → ajouter `plage large` ;
- `variable` → afficher `variable`.

---

# 11. Sections de la fiche

Afficher dans cet ordre :

1. Description
2. Histoire & origines
3. Service
4. Recette typique
5. Sources

## Description

Champ :

```js
description
```

## Histoire & origines

Champ :

```js
histoireEtOrigines
```

## Service

Afficher :

- température ;
- verres recommandés.

## Recette typique

Depuis `recette`.

Si :

```js
profilUnique === false
```

afficher :

```text
Profil variable selon le sous-style ou l’interprétation.
```

Afficher ensuite si présents :

- `explicationProfil`;
- malts et céréales ;
- houblons ;
- levures et microorganismes ;
- ingrédients complémentaires ;
- profil eau ;
- empâtage ;
- ébullition et houblonnage ;
- fermentation ;
- maturation ;
- profil recherché.

Ne pas afficher les listes vides.

## Sources

Les sources doivent être présentes mais discrètes :

- accordéon fermé par défaut ;
- afficher organisme ;
- édition ;
- référence ;
- type.

Ne pas créer de liens si le JSON ne contient pas d’URL.

---

# 12. Contraintes visuelles

Ne pas modifier :

- fond animé ;
- animation de révélation ;
- style général du carrousel ;
- réglages validés ;
- police et centrage des titres sauf nécessité absolue ;
- structure générale de la page.

La fiche Brassopédie doit respecter l’ambiance :

- sombre ;
- cuivre ;
- ivoire ;
- premium ;
- lisible ;
- non administratif.

Éviter les gros tableaux bruts.

Préférer :

- badges ;
- sections ;
- blocs éditoriaux ;
- accordéons discrets.

---

# 13. Accessibilité

Respecter :

- `aria-modal="true"` sur l’overlay fiche ;
- bouton de fermeture avec label clair ;
- `Échap` ferme la fiche ;
- focus sur la fiche à l’ouverture si possible ;
- ne pas rendre l’arrière-plan cliquable pendant l’ouverture ;
- ne pas fermer si clic dans le contenu ;
- `prefers-reduced-motion`.

---

# 14. Performance

22 cartes WEBP 1060×1484 sont acceptables, mais :

- éviter de cloner inutilement toutes les images ;
- éviter les reflows lourds à chaque drag ;
- ne pas recalculer les fiches en boucle ;
- ne rendre la fiche Brassopédie que pour la carte ouverte ;
- lazy loading possible si cohérent avec le code existant.

---

# 15. Tests obligatoires

Ajouter ou compléter les tests existants.

## Données

- la collection contient exactement 22 cartes ;
- chaque carte a un ID unique ;
- chaque carte a une image associée ;
- le mapping image ne contient aucun ID inconnu ;
- les fichiers dos et face sont déclarés.

## Resolver

Tester :

```text
Stout → stout
Porter → porter
Russian Imperial Stout → imperial-stout
Smoked Porter → smoke-porter
Coffee Porter → coffee-stout-or-porter
American Imperial Porter → american-imperial-porter
American Imperial Stout → american-imperial-stout
```

Tester aussi :

```text
Porter ne révèle pas English Porter
Stout ne révèle pas Dry Stout / Irish Dry Stout
American Imperial Porter et American Imperial Stout ne sont pas confondus
```

## Brassopédie formatters

Tester :

- format plage alcool ;
- format variable ;
- traduction nature ;
- récupération parent ;
- filtrage listes vides ;
- format service.

## Cycle carte / ouverture fiche

Si test DOM complet raisonnable :

- carte non révélée : clic ne déclenche pas fiche ;
- carte révélée : clic déclenche ouverture fiche ;
- fermeture fiche restaure l’état.

Si DOM trop lourd :

- isoler la logique dans des fonctions pures testables.

---

# 16. Validation manuelle attendue

Après implémentation, vérifier :

1. la page charge sans erreur ;
2. le compteur affiche `0 / 22 révélées` sur store neuf ;
3. les 22 cartes sont présentes dans le carrousel ;
4. `Stout` révèle la bonne carte ;
5. `Porter` révèle la bonne carte ;
6. `Imperial Stout` révèle la bonne carte ;
7. `American Imperial Porter` révèle la bonne carte ;
8. `American Imperial Stout` révèle la bonne carte ;
9. ces deux cartes ne sont jamais confondues ;
10. une carte non révélée ne s’ouvre pas ;
11. une carte révélée s’ouvre en zoom + fiche ;
12. la fiche affiche les bonnes données JSON ;
13. Échap ferme la fiche ;
14. le clic voile ferme la fiche ;
15. le clic dans la fiche ne ferme pas ;
16. la fermeture restaure le carrousel ;
17. `pnpm install --frozen-lockfile` passe ;
18. `pnpm typecheck` passe ;
19. `pnpm test` passe ;
20. `pnpm build` passe.

---

# 17. Commandes de fin

À la fin :

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
```

Puis commit :

```bash
git add .
git commit -m "feat(collection): add full Porters and Stouts carousel with Brassopedie panel"
git push -u origin feature/porters-stouts-brassopedie
```

Créer une Pull Request brouillon vers `main`.

Titre :

```text
[codex] Add full Porters & Stouts carousel and Brassopédie panel
```

Description :

```markdown
## Phase 5 · Collection Porters & Stouts + Brassopédie

### Ajouté
- intégration des 22 cartes Porters & Stouts depuis le JSON de collection
- intégration des images WEBP de la collection
- carrousel complet généré depuis les données
- resolver basé sur noms officiels et aliases
- révélation par saisie pour toute la collection
- zoom des cartes révélées
- fiche Brassopédie liée à la carte ouverte
- formatage des profils, service, recette et sources
- tests données, resolver, formatters et cycle d’ouverture

### Préservé
- fond animé
- animation de révélation
- comportement des cartes non révélées
- style général du carrousel
- typographie validée des cartes
- CI figée

### Validation
- pnpm install --frozen-lockfile
- pnpm typecheck
- pnpm test
- pnpm build
```

Ne pas merger automatiquement.

Laisser la PR en brouillon pour contrôle visuel sur iPad.

---

# 18. Interdits explicites

Ne pas faire :

- refonte UI globale ;
- nettoyage CSS massif ;
- suppression de `card-presentation.css` ;
- changement du fond animé ;
- changement du moteur de révélation sauf nécessité stricte ;
- révélation par clic ;
- fuzzy matching agressif ;
- logique basée sur le numéro des images ;
- merge automatique dans `main`.

Point de vigilance absolu :

```text
La logique doit mapper par ID JSON, jamais par ordre de fichier image.
```
