# Brassopédie — Structure et utilisation des fichiers JSON

## 1. Objectif

La Brassopédie s’appuie sur **neuf fichiers JSON**, un par collection de bières définie dans `Taxonomie.md`.

Ces fichiers ont pour rôle de :

- stocker les données descriptives des **251 cartes** ;
- fournir une structure identique pour chaque entrée ;
- alimenter les fiches de la Brassopédie ;
- permettre la recherche, les filtres et les regroupements ;
- conserver les sources documentaires sans les afficher dans l’interface ;
- garantir une évolution cohérente du modèle de données.

Chaque carte de la taxonomie doit être présente dans un fichier JSON, qu’il s’agisse :

- d’une famille ;
- d’un style ;
- d’un sous-style ;
- d’une catégorie transversale ;
- d’une appellation commerciale ;
- d’une mention réglementaire.

---

## 2. Organisation des fichiers

Un fichier JSON est créé pour chaque collection :

```text
collection-01-lagers-et-fermentations-basses.json
collection-02-pale-ales-bitters-et-ipa.json
collection-03-porters-et-stouts.json
collection-04-traditions-belges-et-francaises.json
collection-05-bieres-de-ble-et-de-seigle.json
collection-06-bieres-acides-sauvages-et-spontanees.json
collection-07-ales-ambrees-brunes-maltees-et-fortes.json
collection-08-styles-singuliers-historiques-et-hybrides.json
collection-09-appellations-commerciales.json
```

Tous les fichiers suivent la même structure.

---

## 3. Structure générale d’un fichier de collection

```json
{
  "schemaVersion": "1.0.0",
  "taxonomyVersion": "1.0.0",
  "collection": {
    "id": 7,
    "slug": "ales-ambrees-brunes-maltees-et-fortes",
    "nom": "Ales ambrées, brunes, maltées et fortes"
  },
  "cartes": []
}
```

### `schemaVersion`

Version de la structure JSON.

Elle doit être modifiée lorsqu’un champ est ajouté, supprimé ou transformé.

### `taxonomyVersion`

Version de la taxonomie utilisée pour produire le fichier.

Elle permet de détecter si les fichiers JSON sont encore synchronisés avec `Taxonomie.md`.

### `collection`

Informations générales sur la collection.

| Champ | Type | Description |
|---|---|---|
| `id` | nombre | Identifiant numérique de la collection |
| `slug` | chaîne | Identifiant technique stable |
| `nom` | chaîne | Nom affiché dans l’application |

### `cartes`

Tableau contenant toutes les fiches de la collection.

---

## 4. Structure standard d’une carte

```json
{
  "id": "altbier",
  "nom": "Altbier",

  "collectionId": 7,
  "nature": "S",
  "parentPrincipalId": "ale",
  "aliases": ["Alt"],

  "paysOrigine": ["Allemagne"],

  "origine": {
    "libelle": "Düsseldorf, Rhénanie-du-Nord-Westphalie",
    "ville": "Düsseldorf",
    "region": "Rhénanie-du-Nord-Westphalie",
    "bassinBrassicole": null
  },

  "alcool": {
    "min": 4.3,
    "max": 5.5,
    "unite": "%",
    "statut": "defini"
  },

  "amertume": {
    "min": 25,
    "max": 50,
    "unite": "IBU",
    "statut": "defini"
  },

  "couleur": {
    "min": 20,
    "max": 35,
    "unite": "EBC",
    "statut": "defini"
  },

  "fermentation": {
    "type": "haute",
    "details": "Fermentation haute conduite à température modérée, suivie d’une maturation à froid."
  },

  "service": {
    "temperatureMin": 7,
    "temperatureMax": 10,
    "uniteTemperature": "°C",
    "verresRecommandes": [
      "Altbierbecher",
      "Verre cylindrique étroit"
    ]
  },

  "description": "",

  "histoireEtOrigines": "",

  "recette": {
    "profilUnique": true,
    "explicationProfil": "",
    "maltsEtCereales": [],
    "houblons": [],
    "levuresEtMicroorganismes": [],
    "ingredientsComplementaires": [],
    "profilEau": "",
    "empatage": "",
    "ebullitionEtHoublonnage": "",
    "fermentation": "",
    "maturation": "",
    "profilRecherche": ""
  },

  "sources": []
}
```

---

## 5. Définition des champs

## 5.1 Identité

### `id`

Identifiant technique unique de la carte.

Règles :

- minuscules ;
- sans accent ;
- sans espace ;
- mots séparés par des tirets ;
- ne doit pas changer après publication.

Exemple :

```json
"id": "imperial-stout"
```

### `nom`

Nom principal affiché dans l’application.

Le contenu est en français, tout en conservant le nom historique ou original lorsqu’il est d’usage.

### `collectionId`

Identifiant de la collection contenant la carte.

### `nature`

Nature taxonomique de l’entrée.

Valeurs autorisées :

| Code | Signification |
|---|---|
| `F` | Famille |
| `S` | Style |
| `SS` | Sous-style |
| `T` | Catégorie transversale |
| `A` | Appellation commerciale |
| `R` | Mention réglementaire ou encadrée |

### `parentPrincipalId`

Identifiant du parent principal dans la taxonomie.

Valeur `null` pour une racine sans parent.

### `aliases`

Noms alternatifs, noms historiques, traductions ou graphies courantes.

Exemple :

```json
"aliases": [
  "Alt",
  "Düsseldorfer Altbier"
]
```

---

## 5.2 Origine géographique

### `paysOrigine`

Liste des pays historiquement associés au style.

Exemple :

```json
"paysOrigine": ["Belgique", "France"]
```

Lorsque l’origine nationale n’est pas spécifique :

```json
"paysOrigine": ["International"]
```

### `origine`

Précision géographique complémentaire.

| Champ | Description |
|---|---|
| `libelle` | Texte synthétique affichable |
| `ville` | Ville d’origine |
| `region` | Région historique ou administrative |
| `bassinBrassicole` | Zone brassicole spécifique |

Les champs non applicables utilisent `null`.

---

## 5.3 Plages numériques

L’alcool, l’amertume et la couleur utilisent une plage `min` / `max`.

### Alcool

```json
"alcool": {
  "min": 4.3,
  "max": 5.5,
  "unite": "%",
  "statut": "defini"
}
```

### Amertume

```json
"amertume": {
  "min": 25,
  "max": 50,
  "unite": "IBU",
  "statut": "defini"
}
```

### Couleur

```json
"couleur": {
  "min": 20,
  "max": 35,
  "unite": "EBC",
  "statut": "defini"
}
```

### Statuts autorisés

| Statut | Usage |
|---|---|
| `defini` | Plage reconnue et relativement stable |
| `large` | Plage très étendue selon les variantes |
| `variable` | Valeur dépendante du produit ou de la recette |
| `non_applicable` | Donnée sans pertinence pour cette entrée |
| `a_documenter` | Valeur temporaire pendant la production des données |

Aucun fichier final ne doit conserver le statut `a_documenter`.

Pour une valeur variable :

```json
"alcool": {
  "min": null,
  "max": null,
  "unite": "%",
  "statut": "variable"
}
```

---

## 5.4 Fermentation

```json
"fermentation": {
  "type": "hybride",
  "details": "Fermentation haute conduite à basse température, suivie d’une maturation prolongée à froid."
}
```

### Types autorisés

```text
haute
basse
spontanee
mixte
hybride
variable
non_applicable
```

Le champ `details` apporte les nuances techniques nécessaires.

---

## 5.5 Service

```json
"service": {
  "temperatureMin": 7,
  "temperatureMax": 10,
  "uniteTemperature": "°C",
  "verresRecommandes": [
    "Altbierbecher",
    "Verre cylindrique étroit"
  ]
}
```

### Température

La température de service est exprimée sous forme de plage.

Lorsque la température varie fortement :

```json
"temperatureMin": null,
"temperatureMax": null
```

### Verres recommandés

Le champ est un tableau afin de permettre plusieurs recommandations.

Les noms doivent rester descriptifs et compréhensibles en français, tout en conservant les noms traditionnels pertinents.

---

## 5.6 Description

Le champ `description` décrit le style tel qu’il est généralement rencontré aujourd’hui.

Il peut présenter :

- l’apparence ;
- la couleur ;
- la mousse ;
- les arômes ;
- les saveurs ;
- le corps ;
- la texture ;
- l’équilibre ;
- les caractéristiques distinctives.

La description ne doit pas répéter l’historique.

---

## 5.7 Histoire et origines

Le champ `histoireEtOrigines` contient :

- le lieu et la période d’apparition ;
- le contexte culturel ou économique ;
- l’origine du nom ;
- les méthodes historiques ;
- les évolutions du style ;
- les périodes de déclin ou de renouveau ;
- les liens avec une tradition régionale.

---

## 5.8 Profil typique de recette

La recette représente un **profil typique du style**.

Elle ne constitue pas une recette complète chiffrée pour un volume de brassage précis.

```json
"recette": {
  "profilUnique": true,
  "explicationProfil": "",
  "maltsEtCereales": [],
  "houblons": [],
  "levuresEtMicroorganismes": [],
  "ingredientsComplementaires": [],
  "profilEau": "",
  "empatage": "",
  "ebullitionEtHoublonnage": "",
  "fermentation": "",
  "maturation": "",
  "profilRecherche": ""
}
```

### `profilUnique`

Indique si l’entrée possède un profil de recette suffisamment cohérent.

```json
"profilUnique": true
```

Pour une famille, une catégorie large ou une appellation commerciale :

```json
"profilUnique": false
```

### `explicationProfil`

Lorsque `profilUnique` vaut `false`, ce champ doit expliquer clairement pourquoi aucune recette unique ne peut être proposée.

Exemple :

```json
"explicationProfil": "L’appellation Blonde décrit principalement une couleur et une présentation commerciale. Elle peut couvrir des lagers, des ales, des bières de blé ou des recettes fortement différentes. Aucun profil de recette unique ne peut donc être considéré comme représentatif."
```

Dans ce cas, les autres champs de recette peuvent rester vides ou décrire uniquement des tendances générales clairement identifiées comme telles.

### `maltsEtCereales`

Liste des malts et céréales typiques.

### `houblons`

Familles ou origines de houblons courantes.

### `levuresEtMicroorganismes`

Levures, bactéries ou cultures mixtes typiquement utilisées.

### `ingredientsComplementaires`

Fruits, épices, sucres, bois, céréales non maltées ou autres ajouts.

### `profilEau`

Profil général de l’eau recherché.

### `empatage`

Logique générale de l’empâtage.

### `ebullitionEtHoublonnage`

Organisation typique de l’ébullition et des ajouts de houblon.

### `fermentation`

Déroulement général de la fermentation.

### `maturation`

Garde, lagering, affinage, élevage ou refermentation.

### `profilRecherche`

Résumé du résultat recherché.

---

## 5.9 Sources

Les sources restent présentes dans le JSON mais ne sont pas affichées dans la Brassopédie.

```json
"sources": [
  {
    "organisme": "BJCP",
    "edition": "2021",
    "reference": "7B Altbier",
    "type": "guide_de_style"
  },
  {
    "organisme": "Brewers Association",
    "edition": "2026",
    "reference": "German-Style Altbier",
    "type": "guide_de_style"
  }
]
```

### Types de sources suggérés

```text
guide_de_style
ouvrage_historique
source_institutionnelle
source_reglementaire
publication_scientifique
source_professionnelle
```

---

## 6. Cas particuliers

## 6.1 Famille générale

Exemple : `Ale`.

Une famille peut regrouper des styles très différents.

```json
"recette": {
  "profilUnique": false,
  "explicationProfil": "La famille Ale regroupe de nombreux styles utilisant des fermentations hautes, mais dont les céréales, le houblonnage, la couleur, la force et la maturation peuvent varier considérablement.",
  "maltsEtCereales": [],
  "houblons": [],
  "levuresEtMicroorganismes": [],
  "ingredientsComplementaires": [],
  "profilEau": "",
  "empatage": "",
  "ebullitionEtHoublonnage": "",
  "fermentation": "Fermentation généralement réalisée avec une levure de fermentation haute.",
  "maturation": "",
  "profilRecherche": ""
}
```

## 6.2 Appellation commerciale

Exemple : `Blonde`.

```json
"alcool": {
  "min": null,
  "max": null,
  "unite": "%",
  "statut": "variable"
},
"recette": {
  "profilUnique": false,
  "explicationProfil": "L’appellation Blonde décrit principalement l’apparence de la bière et non une méthode de brassage unique.",
  "maltsEtCereales": [],
  "houblons": [],
  "levuresEtMicroorganismes": [],
  "ingredientsComplementaires": [],
  "profilEau": "",
  "empatage": "",
  "ebullitionEtHoublonnage": "",
  "fermentation": "",
  "maturation": "",
  "profilRecherche": ""
}
```

## 6.3 Mention réglementaire

Une mention réglementaire peut ne pas avoir de profil sensoriel ou technique propre.

Dans ce cas :

- utiliser `non_applicable` lorsque le champ n’a aucun sens ;
- utiliser `variable` lorsque la valeur dépend entièrement du produit ;
- expliquer la nature de la mention dans la description et l’historique.

---

## 7. Utilisation dans la Brassopédie

## 7.1 Chargement des fichiers

L’application charge les neuf fichiers au démarrage ou à l’ouverture de la Brassopédie.

Exemple JavaScript :

```js
const COLLECTION_FILES = [
  "collection-01-lagers-et-fermentations-basses.json",
  "collection-02-pale-ales-bitters-et-ipa.json",
  "collection-03-porters-et-stouts.json",
  "collection-04-traditions-belges-et-francaises.json",
  "collection-05-bieres-de-ble-et-de-seigle.json",
  "collection-06-bieres-acides-sauvages-et-spontanees.json",
  "collection-07-ales-ambrees-brunes-maltees-et-fortes.json",
  "collection-08-styles-singuliers-historiques-et-hybrides.json",
  "collection-09-appellations-commerciales.json"
];

async function loadBrassopedie() {
  const collections = await Promise.all(
    COLLECTION_FILES.map(async (file) => {
      const response = await fetch(`./data/brassopedie/${file}`);

      if (!response.ok) {
        throw new Error(`Impossible de charger ${file}`);
      }

      return response.json();
    })
  );

  return collections;
}
```

## 7.2 Création d’un index global

```js
function buildBeerIndex(collections) {
  const byId = new Map();

  for (const collectionFile of collections) {
    for (const carte of collectionFile.cartes) {
      if (byId.has(carte.id)) {
        throw new Error(`Identifiant dupliqué : ${carte.id}`);
      }

      byId.set(carte.id, carte);
    }
  }

  return byId;
}
```

Cet index permet de retrouver rapidement une carte par son identifiant.

## 7.3 Affichage d’une plage

```js
function formatRange(data) {
  if (!data) return "—";

  if (data.statut === "non_applicable") {
    return "Non applicable";
  }

  if (data.statut === "variable") {
    return "Variable";
  }

  if (data.min == null && data.max == null) {
    return "—";
  }

  if (data.min === data.max || data.max == null) {
    return `${data.min} ${data.unite}`;
  }

  return `${data.min}–${data.max} ${data.unite}`;
}
```

## 7.4 Affichage de l’origine

```js
function formatOrigin(carte) {
  const country = carte.paysOrigine?.join(", ") || "—";
  const detail = carte.origine?.libelle;

  return detail ? `${country} · ${detail}` : country;
}
```

## 7.5 Affichage du service

```js
function formatServing(service) {
  const temperature =
    service.temperatureMin != null && service.temperatureMax != null
      ? `${service.temperatureMin}–${service.temperatureMax} ${service.uniteTemperature}`
      : "Température variable";

  const glasses =
    service.verresRecommandes?.length > 0
      ? service.verresRecommandes.join(", ")
      : "Verre non spécifié";

  return {
    temperature,
    glasses
  };
}
```

## 7.6 Recette sans profil unique

Lorsque `profilUnique` vaut `false`, la Brassopédie doit afficher prioritairement `explicationProfil`.

```js
function renderRecipe(recipe) {
  if (!recipe.profilUnique) {
    return {
      title: "Profil de recette variable",
      explanation: recipe.explicationProfil
    };
  }

  return {
    title: "Profil typique de recette",
    explanation: recipe.profilRecherche
  };
}
```

---

## 8. Recherche et filtres

Les champs suivants peuvent alimenter la recherche :

- `nom` ;
- `aliases` ;
- `paysOrigine` ;
- `origine.libelle` ;
- `description` ;
- `histoireEtOrigines` ;
- ingrédients de la recette.

Les filtres peuvent utiliser :

- collection ;
- nature ;
- pays ;
- type de fermentation ;
- plage d’alcool ;
- plage d’IBU ;
- plage d’EBC ;
- température de service ;
- verre recommandé.

---

## 9. Règles de validation

Avant intégration, chaque fichier doit être contrôlé.

### Règles minimales

- chaque `id` est unique dans l’ensemble des neuf fichiers ;
- chaque carte de `Taxonomie.md` existe dans un JSON ;
- aucune carte supplémentaire non prévue ne doit apparaître ;
- `collectionId` correspond au fichier ;
- `parentPrincipalId` référence un identifiant existant ou vaut `null` ;
- les valeurs `min` sont inférieures ou égales aux valeurs `max` ;
- les unités sont cohérentes ;
- aucune entrée finale ne conserve `a_documenter` ;
- `explicationProfil` est obligatoire lorsque `profilUnique` vaut `false` ;
- les champs textuels sont en français ;
- les alias originaux de la taxonomie sont conservés ;
- les sources sont renseignées lorsque des données précises sont fournies.

### Validation JavaScript simplifiée

```js
function validateCard(carte, knownIds) {
  const errors = [];

  if (!carte.id) errors.push("Identifiant manquant");
  if (!carte.nom) errors.push("Nom manquant");

  if (
    carte.parentPrincipalId &&
    !knownIds.has(carte.parentPrincipalId)
  ) {
    errors.push(`Parent inconnu : ${carte.parentPrincipalId}`);
  }

  for (const key of ["alcool", "amertume", "couleur"]) {
    const value = carte[key];

    if (
      value?.min != null &&
      value?.max != null &&
      value.min > value.max
    ) {
      errors.push(`${key} : min supérieur à max`);
    }

    if (value?.statut === "a_documenter") {
      errors.push(`${key} reste à documenter`);
    }
  }

  if (
    carte.recette?.profilUnique === false &&
    !carte.recette.explicationProfil
  ) {
    errors.push("Explication du profil variable manquante");
  }

  return errors;
}
```

---

## 10. Arborescence recommandée

```text
data/
└── brassopedie/
    ├── collection-01-lagers-et-fermentations-basses.json
    ├── collection-02-pale-ales-bitters-et-ipa.json
    ├── collection-03-porters-et-stouts.json
    ├── collection-04-traditions-belges-et-francaises.json
    ├── collection-05-bieres-de-ble-et-de-seigle.json
    ├── collection-06-bieres-acides-sauvages-et-spontanees.json
    ├── collection-07-ales-ambrees-brunes-maltees-et-fortes.json
    ├── collection-08-styles-singuliers-historiques-et-hybrides.json
    ├── collection-09-appellations-commerciales.json
    └── README-BRASSOPEDIE-JSON.md
```

---

## 11. Principes éditoriaux

Les fiches doivent rester :

- factuelles ;
- accessibles ;
- homogènes ;
- suffisamment détaillées sans devenir encyclopédiques ;
- prudentes lorsque les sources divergent ;
- explicites lorsqu’une catégorie ne possède pas de définition technique unique.

Aucune valeur ne doit être inventée pour remplir artificiellement une case.

Lorsqu’un champ ne peut pas être déterminé avec sérieux, utiliser le statut approprié et expliquer la raison dans le texte concerné.

---

## 12. Résumé des décisions validées

- un fichier JSON par collection ;
- couverture complète des 251 cartes ;
- textes en français ;
- conservation des noms et alias historiques ;
- plages `min` et `max` pour alcool, IBU et EBC ;
- pays séparé de la ville, région ou du bassin brassicole ;
- fermentation structurée avec type et détails ;
- verre recommandé et température de service ;
- recette sous forme de profil typique ;
- explication explicite lorsqu’aucun profil unique n’existe ;
- sources conservées dans le JSON mais non affichées ;
- structure identique pour toutes les collections.
