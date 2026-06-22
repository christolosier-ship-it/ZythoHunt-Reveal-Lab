# PHASE 7A - Scaffold des 8 nouvelles collections ZythoHunt

## Objectif

Préparer l'intégration de **8 nouvelles collections** ZythoHunt depuis `docs/active`, pour obtenir **9 collections au total** avec la collection déjà fonctionnelle **Porters & Stouts**.

Cette phase prépare le code, les dossiers, les manifests et la documentation. Elle ne doit pas ajouter d'images binaires.

## Situation de départ

Le projet possède déjà :

- un moteur multi-collections ;
- un `CollectionManager` ;
- un registry `collectionBundles` ;
- un `AssetPreloadQueue` ;
- les champs `thumbImage` et `fullImage` ;
- des `backgroundPreset` par collection ;
- des thumbnails 360x504 pour Porters & Stouts ;
- une collection Porters & Stouts validée.

Cette phase doit étendre l'existant, pas le remplacer.

## Règle performance absolue

Ne jamais monter plusieurs carrousels DOM en même temps.

Le système doit conserver :

```text
1 collection active
1 carrousel DOM actif
1 resolver actif
1 store de découverte actif
1 panneau Brassopédie actif
1 fond animé vivant
```

Les 8 nouvelles collections doivent être déclarées mais non activables tant que leurs assets sont absents.

## Contraintes absolues

1. Ne pas casser Porters & Stouts.
2. Ne pas modifier visuellement Porters & Stouts.
3. Ne pas ajouter d'images.
4. Ne pas générer de PNG, WEBP, JPG ou autre asset binaire.
5. Ne pas déplacer les assets existants.
6. Ne pas supposer que les nouveaux assets existent déjà.
7. Ne pas afficher comme jouable une collection dont les assets sont absents.
8. Ne pas créer de carrousels cachés.
9. Ne pas supprimer les tests existants.
10. Ne pas contourner le typecheck.
11. Ne pas modifier le format des JSON source.

## Source des fichiers

Les fichiers de travail sont dans :

```text
docs/active/
```

Codex doit y lire :

- les JSON de collections ;
- les fichiers de prompts associés, s'ils existent ;
- les noms de collections ;
- les IDs de collections ;
- le nombre de cartes ;
- les aliases ;
- les données Brassopédie.

Si `docs/active/` n'existe pas, arrêter le chantier et produire un compte rendu bloquant.

## Nombre attendu

Cette phase concerne :

```text
8 nouvelles collections
9 collections au total avec Porters & Stouts
```

Si `docs/active/` contient plus ou moins de 8 JSON de collection, Codex doit :

1. l'indiquer clairement ;
2. lister les fichiers trouvés ;
3. ne pas deviner ;
4. demander arbitrage avant intégration.

## Slugs

Pour chaque collection, générer un `slug` stable.

Priorité :

1. `collection.id` si propre ;
2. sinon `collection.nom` slugifié ;
3. sinon nom du fichier JSON slugifié.

Règles :

- minuscules ;
- sans accents ;
- espaces remplacés par `-` ;
- apostrophes supprimées ;
- `&` remplacé par `et` ;
- caractères spéciaux supprimés ;
- pas de doubles tirets ;
- pas de tiret final.

Exemples :

```text
Lagers & fermentations basses -> lagers-et-fermentations-basses
Bières belges -> bieres-belges
IPA modernes -> ipa-modernes
```

## Dossiers publics à préparer

Pour chaque collection `<slug>`, créer :

```text
public/assets/collections/<slug>/
  README.md
  thumb/
    README.md
```

Ne pas ajouter d'image.

Les README doivent documenter les fichiers attendus.

## Convention des assets attendus

### Face et dos

```text
public/assets/collections/<slug>/face-<slug>.webp
public/assets/collections/<slug>/dos-<slug>.webp
public/assets/collections/<slug>/thumb/face-<slug>.webp
public/assets/collections/<slug>/thumb/dos-<slug>.webp
```

### Cartes

```text
public/assets/collections/<slug>/<NN>-<card-id>.webp
public/assets/collections/<slug>/thumb/<NN>-<card-id>.webp
```

Règles :

```text
NN = index de la carte dans le JSON sur 2 chiffres
card-id = id de la carte, slugifié si nécessaire
thumb = 360x504 px, WEBP, même nom que le full
```

Exemple :

```text
01-helles.webp
02-pilsner.webp
03-dunkel.webp
thumb/01-helles.webp
thumb/02-pilsner.webp
thumb/03-dunkel.webp
```

## Statut assetsReady

Porters & Stouts doit rester :

```js
assetsReady: true
```

Les 8 nouvelles collections doivent être :

```js
assetsReady: false
```

Tant que `assetsReady` vaut `false` :

- la collection peut apparaître dans l'interface ;
- elle doit être marquée "Assets à ajouter" ;
- elle ne doit pas être activable ;
- aucun carrousel ne doit être créé pour elle ;
- aucun preload d'image ne doit être lancé pour elle ;
- aucune image cassée ne doit apparaître.

## Factory générique

Créer ou enrichir :

```text
src/data/create-collection-bundle.js
```

Rôle :

- prendre un JSON de collection ;
- prendre un manifest d'assets ;
- produire un bundle compatible `CollectionManager`.

Signature indicative :

```js
export function createCollectionBundle({
  collectionJson,
  collectionId,
  slug,
  subtitle,
  order,
  discoveryKey,
  assets,
  backgroundPreset,
  assetsReady
}) {
  // retourne un bundle
}
```

Bundle attendu :

```js
{
  collection,
  cards,
  cardsById,
  revealableCards,
  validate
}
```

Carte attendue :

```js
{
  id,
  name,
  type,
  path,
  tagline,
  image,
  thumbImage,
  fullImage,
  frame,
  revealable,
  aliases,
  brassopedie
}
```

## Manifests d'assets

Pour chaque nouvelle collection, créer :

```text
src/data/card-assets/<slug>-assets.js
```

Forme attendue :

```js
export const myCollectionCardImages = {
  "helles": "01-helles.webp",
  "pilsner": "02-pilsner.webp"
};

export const myCollectionAssets = {
  basePath: "assets/collections/<slug>",
  cardBack: "dos-<slug>.webp",
  collectionFace: "face-<slug>.webp"
};

export const myCollectionAssetPath = (fileName) =>
  `${myCollectionAssets.basePath}/${fileName}`;

export const myCollectionThumbPath = (fileName) =>
  `${myCollectionAssets.basePath}/thumb/${fileName}`;
```

Le nom JS doit être valide et stable.

## Modules de collection

Pour chaque nouvelle collection, créer :

```text
src/data/<slug>-collection.js
```

Le module doit :

- importer le JSON depuis `docs/active/<file>.json`, ou depuis un emplacement data si le projet impose une copie ;
- importer son manifest d'assets ;
- utiliser la factory générique ;
- définir un `backgroundPreset` provisoire ;
- définir une clé `discoveryKey` unique ;
- définir `assetsReady: false`.

Exemple :

```js
export const lagersEtFermentationsBassesBundle = createCollectionBundle({
  collectionJson,
  collectionId: "lagers-et-fermentations-basses",
  slug: "lagers-et-fermentations-basses",
  subtitle: "Fermentations nettes, blondes, ambrées et noires",
  order: 20,
  discoveryKey: "zythohunt.discovery.lagers-et-fermentations-basses.v1",
  assets,
  backgroundPreset: {
    beerT: 18,
    bubbleDensity: 58,
    foamIntensity: 44
  },
  assetsReady: false
});
```

## Registry

Mettre à jour :

```text
src/data/collections.js
```

Le registry doit contenir :

- Porters & Stouts ;
- les 8 nouvelles collections ;
- 9 collections au total.

Exports attendus :

```js
export const collectionBundles = [...]
export const collections = collectionBundles.map((bundle) => bundle.collection)
export const readyCollectionBundles = collectionBundles.filter((bundle) => bundle.collection.assetsReady)
export const pendingCollectionBundles = collectionBundles.filter((bundle) => !bundle.collection.assetsReady)
```

Tous les IDs, slugs et `discoveryKey` doivent être uniques.

## CollectionManager

Adapter ou vérifier le `CollectionManager`.

Comportement attendu :

```js
manager.setActiveCollection("porters-stouts")
// { status: "active", ... }

manager.setActiveCollection("collection-sans-assets")
// { status: "pending-assets", collectionId }

manager.setActiveCollection("id-inconnu")
// { status: "missing", collectionId }
```

Une collection `assetsReady: false` ne doit pas devenir active.

## UI de sélection collection

Ajouter une UI légère de sélection.

Objectifs :

- afficher la collection active ;
- afficher les 8 nouvelles collections ;
- indiquer "Disponible" ou "Assets à ajouter" ;
- désactiver les collections `assetsReady: false` ;
- ne monter qu'un seul carrousel.

Exemple :

```text
Porters & Stouts                 Disponible
Lagers et fermentations basses   Assets à ajouter
IPA modernes                     Assets à ajouter
Bières belges                    Assets à ajouter
```

## Cycle de changement de collection

Créer une transition propre, même si seule Porters & Stouts est activable pour l'instant.

Le changement doit :

1. fermer la Brassopédie ;
2. fermer l'inspection carrousel ;
3. détruire le carrousel actif ;
4. détruire le contrôleur de découverte actif ;
5. créer le store de la nouvelle collection ;
6. créer le resolver ;
7. créer le panneau Brassopédie ;
8. créer le carrousel ;
9. appliquer le `backgroundPreset` ;
10. précharger les assets initiaux ;
11. mettre à jour le compteur de progression.

Si `createDiscoveryController` n'a pas de méthode `destroy`, l'ajouter avec `AbortController`.

## Background presets

Chaque nouvelle collection doit recevoir un preset provisoire :

```js
{
  beerT: number,
  bubbleDensity: number,
  foamIntensity: number
}
```

Règles :

- `beerT` entre 0 et 100 ;
- `bubbleDensity` entre 35 et 75 ;
- `foamIntensity` entre 30 et 70 ;
- variations progressives ;
- pas de changement visuel violent ;
- pas de recréation complète du fond.

## Documentation assets

Créer :

```text
docs/ASSETS_A_AJOUTER.md
```

Ce fichier doit lister pour chaque nouvelle collection :

- nom ;
- slug ;
- statut `assetsReady: false`;
- dossier cible ;
- face attendue ;
- dos attendu ;
- thumb face attendu ;
- thumb dos attendu ;
- liste des cartes ;
- fichier full attendu ;
- fichier thumb attendu ;
- format thumb : 360x504 WEBP.

Format recommandé :

```md
## Nom de collection

Slug : `<slug>`

Statut : `assetsReady: false`

Dossier cible :

```text
public/assets/collections/<slug>/
```

Fichiers collection :

```text
face-<slug>.webp
dos-<slug>.webp
thumb/face-<slug>.webp
thumb/dos-<slug>.webp
```

Cartes :

| # | ID carte | Full attendu | Thumb attendu |
|---|---|---|---|
| 01 | helles | 01-helles.webp | thumb/01-helles.webp |
```

## README assets

Dans chaque dossier :

```text
public/assets/collections/<slug>/README.md
public/assets/collections/<slug>/thumb/README.md
```

Le README racine doit rappeler :

- les images full vont ici ;
- les fichiers attendus sont dans `docs/ASSETS_A_AJOUTER.md` ;
- le dossier `thumb/` contient les versions 360x504.

Le README `thumb/` doit rappeler :

- format WEBP ;
- taille 360x504 ;
- noms identiques aux fichiers full ;
- inclure aussi face et dos.

## Tests attendus

Garantir par tests :

1. 9 collections au total ;
2. 8 nouvelles collections `assetsReady: false` ;
3. Porters & Stouts `assetsReady: true` ;
4. slugs uniques ;
5. discoveryKeys uniques ;
6. backgroundPreset valide pour chaque collection ;
7. chaque carte a `image`, `thumbImage`, `fullImage` ;
8. une collection sans assets ne peut pas devenir active ;
9. Porters & Stouts reste activable ;
10. le build reste vert.

## Validation obligatoire

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

## Lots

### Lot 1 - Audit docs/active

- lire les JSON ;
- vérifier qu'il y a 8 nouvelles collections ;
- générer les slugs ;
- vérifier doublons ;
- produire un inventaire.

### Lot 2 - Factory et manifests

- créer la factory générique ;
- créer les manifests d'assets ;
- créer les modules de collection ;
- garder `assetsReady: false`.

### Lot 3 - Registry et manager

- intégrer les 8 nouvelles collections ;
- garantir 9 collections au total ;
- empêcher l'activation sans assets ;
- ajouter tests.

### Lot 4 - UI sélection

- ajouter l'interface légère ;
- afficher disponible / assets à ajouter ;
- ne monter qu'un seul carrousel ;
- ajouter destroy propre si nécessaire.

### Lot 5 - Documentation assets

- créer `docs/ASSETS_A_AJOUTER.md` ;
- créer les README ;
- vérifier cohérence des chemins.

## Critères d'acceptation

La phase est acceptée si :

- Porters & Stouts fonctionne comme avant ;
- aucune image binaire n'est ajoutée ;
- 8 nouvelles collections sont déclarées ;
- 9 collections existent au total ;
- les 8 nouvelles collections sont `assetsReady: false` ;
- les collections sans assets sont visibles mais désactivées ;
- aucun asset absent ne provoque d'image cassée ;
- les dossiers publics attendus existent ;
- `docs/ASSETS_A_AJOUTER.md` est complet ;
- les tests passent ;
- le build passe ;
- la PR est en draft.

## PR attendue

Créer une PR brouillon :

```text
[codex] Scaffold active ZythoHunt collections
```

La PR doit contenir :

- résumé des 8 nouvelles collections trouvées ;
- confirmation des 9 collections au total ;
- fichiers créés ;
- collections prêtes et en attente ;
- validations exécutées ;
- instructions pour ajouter les assets manuellement ;
- note claire : aucune image générée.
