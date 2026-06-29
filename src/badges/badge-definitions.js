export const BADGE_FAMILIES = {
  global: "Progression",
  collection: "Collections",
  balanced: "Exploration",
  reveal: "Révéler",
  secret: "Secrets"
};

export const BADGE_DEFINITIONS = [
  {
    "number": 1,
    "numberLabel": "001",
    "id": "global-premiere-gorgee-du-destin",
    "family": "global",
    "name": "Première gorgée du destin",
    "description": "Découvrir 1 carte dans ZythoHunt.",
    "hidden": false,
    "condition": {
      "type": "totalDiscoveredAtLeast",
      "count": 1
    },
    "iconFile": "001.webp"
  },
  {
    "number": 2,
    "numberLabel": "002",
    "id": "global-debut-de-descente-controlee",
    "family": "global",
    "name": "Début de descente contrôlée",
    "description": "Découvrir 10 cartes dans ZythoHunt.",
    "hidden": false,
    "condition": {
      "type": "totalDiscoveredAtLeast",
      "count": 10
    },
    "iconFile": "002.webp"
  },
  {
    "number": 3,
    "numberLabel": "003",
    "id": "global-chasseur-de-capsules",
    "family": "global",
    "name": "Chasseur de capsules",
    "description": "Découvrir 25 cartes dans ZythoHunt.",
    "hidden": false,
    "condition": {
      "type": "totalDiscoveredAtLeast",
      "count": 25
    },
    "iconFile": "003.webp"
  },
  {
    "number": 4,
    "numberLabel": "004",
    "id": "global-palais-en-rodage",
    "family": "global",
    "name": "Palais en rodage",
    "description": "Découvrir 50 cartes dans ZythoHunt.",
    "hidden": false,
    "condition": {
      "type": "totalDiscoveredAtLeast",
      "count": 50
    },
    "iconFile": "004.webp"
  },
  {
    "number": 5,
    "numberLabel": "005",
    "id": "global-foie-en-beta-test",
    "family": "global",
    "name": "Foie en bêta-test",
    "description": "Découvrir 75 cartes dans ZythoHunt.",
    "hidden": false,
    "condition": {
      "type": "totalDiscoveredAtLeast",
      "count": 75
    },
    "iconFile": "005.webp"
  },
  {
    "number": 6,
    "numberLabel": "006",
    "id": "global-brassophile-semi-pro",
    "family": "global",
    "name": "Brassophile semi-pro",
    "description": "Découvrir 100 cartes dans ZythoHunt.",
    "hidden": false,
    "condition": {
      "type": "totalDiscoveredAtLeast",
      "count": 100
    },
    "iconFile": "006.webp"
  },
  {
    "number": 7,
    "numberLabel": "007",
    "id": "global-mi-fut-mi-homme",
    "family": "global",
    "name": "Mi-fût, mi-homme",
    "description": "Découvrir 125 cartes dans ZythoHunt.",
    "hidden": false,
    "condition": {
      "type": "totalDiscoveredAtLeast",
      "count": 125
    },
    "iconFile": "007.webp"
  },
  {
    "number": 8,
    "numberLabel": "008",
    "id": "global-moine-du-malt-turbulent",
    "family": "global",
    "name": "Moine du malt turbulent",
    "description": "Découvrir 150 cartes dans ZythoHunt.",
    "hidden": false,
    "condition": {
      "type": "totalDiscoveredAtLeast",
      "count": 150
    },
    "iconFile": "008.webp"
  },
  {
    "number": 9,
    "numberLabel": "009",
    "id": "global-explorateur-des-trefonds-houblonnes",
    "family": "global",
    "name": "Explorateur des tréfonds houblonnés",
    "description": "Découvrir 175 cartes dans ZythoHunt.",
    "hidden": false,
    "condition": {
      "type": "totalDiscoveredAtLeast",
      "count": 175
    },
    "iconFile": "009.webp"
  },
  {
    "number": 10,
    "numberLabel": "010",
    "id": "global-gardien-du-grand-casier",
    "family": "global",
    "name": "Gardien du Grand Casier",
    "description": "Découvrir 200 cartes dans ZythoHunt.",
    "hidden": false,
    "condition": {
      "type": "totalDiscoveredAtLeast",
      "count": 200
    },
    "iconFile": "010.webp"
  },
  {
    "number": 11,
    "numberLabel": "011",
    "id": "global-legende-locale-du-comptoir",
    "family": "global",
    "name": "Légende locale du comptoir",
    "description": "Découvrir 225 cartes dans ZythoHunt.",
    "hidden": false,
    "condition": {
      "type": "totalDiscoveredAtLeast",
      "count": 225
    },
    "iconFile": "011.webp"
  },
  {
    "number": 12,
    "numberLabel": "012",
    "id": "global-il-n-en-reste-presque-plus-patron",
    "family": "global",
    "name": "Il n’en reste presque plus, patron",
    "description": "Découvrir 250 cartes dans ZythoHunt.",
    "hidden": false,
    "condition": {
      "type": "totalDiscoveredAtLeast",
      "count": 250
    },
    "iconFile": "012.webp"
  },
  {
    "number": 13,
    "numberLabel": "013",
    "id": "global-zythohunt-maitre-absolu-du-brassivers",
    "family": "global",
    "name": "ZythoHunt : Maître absolu du Brassivers",
    "description": "Découvrir 251 cartes dans ZythoHunt.",
    "hidden": false,
    "condition": {
      "type": "totalDiscoveredEquals",
      "count": 251
    },
    "iconFile": "013.webp"
  },
  {
    "number": 14,
    "numberLabel": "014",
    "id": "lagers-et-fermentations-basses-1",
    "family": "collection",
    "collectionId": "lagers-et-fermentations-basses",
    "name": "Premier demi bien droit",
    "description": "Découvrir 1 carte dans la collection Lagers et fermentations basses.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "lagers-et-fermentations-basses",
      "count": 1
    },
    "iconFile": "014.webp"
  },
  {
    "number": 15,
    "numberLabel": "015",
    "id": "lagers-et-fermentations-basses-5",
    "family": "collection",
    "collectionId": "lagers-et-fermentations-basses",
    "name": "Casier de blondettes",
    "description": "Découvrir 5 cartes dans la collection Lagers et fermentations basses.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "lagers-et-fermentations-basses",
      "count": 5
    },
    "iconFile": "015.webp"
  },
  {
    "number": 16,
    "numberLabel": "016",
    "id": "lagers-et-fermentations-basses-10",
    "family": "collection",
    "collectionId": "lagers-et-fermentations-basses",
    "name": "Pils sur la piste",
    "description": "Découvrir 10 cartes dans la collection Lagers et fermentations basses.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "lagers-et-fermentations-basses",
      "count": 10
    },
    "iconFile": "016.webp"
  },
  {
    "number": 17,
    "numberLabel": "017",
    "id": "lagers-et-fermentations-basses-15",
    "family": "collection",
    "collectionId": "lagers-et-fermentations-basses",
    "name": "Fermentation sous contrôle",
    "description": "Découvrir 15 cartes dans la collection Lagers et fermentations basses.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "lagers-et-fermentations-basses",
      "count": 15
    },
    "iconFile": "017.webp"
  },
  {
    "number": 18,
    "numberLabel": "018",
    "id": "lagers-et-fermentations-basses-20",
    "family": "collection",
    "collectionId": "lagers-et-fermentations-basses",
    "name": "Frigo diplômé",
    "description": "Découvrir 20 cartes dans la collection Lagers et fermentations basses.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "lagers-et-fermentations-basses",
      "count": 20
    },
    "iconFile": "018.webp"
  },
  {
    "number": 19,
    "numberLabel": "019",
    "id": "lagers-et-fermentations-basses-25",
    "family": "collection",
    "collectionId": "lagers-et-fermentations-basses",
    "name": "Gardien du froid sacré",
    "description": "Découvrir 25 cartes dans la collection Lagers et fermentations basses.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "lagers-et-fermentations-basses",
      "count": 25
    },
    "iconFile": "019.webp"
  },
  {
    "number": 20,
    "numberLabel": "020",
    "id": "lagers-et-fermentations-basses-30",
    "family": "collection",
    "collectionId": "lagers-et-fermentations-basses",
    "name": "Lagernaute certifié",
    "description": "Découvrir 30 cartes dans la collection Lagers et fermentations basses.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "lagers-et-fermentations-basses",
      "count": 30
    },
    "iconFile": "020.webp"
  },
  {
    "number": 21,
    "numberLabel": "021",
    "id": "lagers-et-fermentations-basses-35",
    "family": "collection",
    "collectionId": "lagers-et-fermentations-basses",
    "name": "Moine du freezer",
    "description": "Découvrir 35 cartes dans la collection Lagers et fermentations basses.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "lagers-et-fermentations-basses",
      "count": 35
    },
    "iconFile": "021.webp"
  },
  {
    "number": 22,
    "numberLabel": "022",
    "id": "lagers-et-fermentations-basses-40",
    "family": "collection",
    "collectionId": "lagers-et-fermentations-basses",
    "name": "Grand pingouin de la mousse",
    "description": "Découvrir 40 cartes dans la collection Lagers et fermentations basses.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "lagers-et-fermentations-basses",
      "count": 40
    },
    "iconFile": "022.webp"
  },
  {
    "number": 23,
    "numberLabel": "023",
    "id": "lagers-et-fermentations-basses-complete",
    "family": "collection",
    "collectionId": "lagers-et-fermentations-basses",
    "name": "Empereur des basses températures",
    "description": "Compléter la collection Lagers et fermentations basses.",
    "hidden": false,
    "condition": {
      "type": "collectionComplete",
      "collectionId": "lagers-et-fermentations-basses"
    },
    "iconFile": "023.webp"
  },
  {
    "number": 24,
    "numberLabel": "024",
    "id": "pale-ales-bitters-et-ipa-1",
    "family": "collection",
    "collectionId": "pale-ales-bitters-et-ipa",
    "name": "Premier houblon dans l’œil",
    "description": "Découvrir 1 carte dans la collection Pale Ales, Bitters et IPA.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "pale-ales-bitters-et-ipa",
      "count": 1
    },
    "iconFile": "024.webp"
  },
  {
    "number": 25,
    "numberLabel": "025",
    "id": "pale-ales-bitters-et-ipa-5",
    "family": "collection",
    "collectionId": "pale-ales-bitters-et-ipa",
    "name": "Pif en agrumes",
    "description": "Découvrir 5 cartes dans la collection Pale Ales, Bitters et IPA.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "pale-ales-bitters-et-ipa",
      "count": 5
    },
    "iconFile": "025.webp"
  },
  {
    "number": 26,
    "numberLabel": "026",
    "id": "pale-ales-bitters-et-ipa-10",
    "family": "collection",
    "collectionId": "pale-ales-bitters-et-ipa",
    "name": "Amertume apprivoisée",
    "description": "Découvrir 10 cartes dans la collection Pale Ales, Bitters et IPA.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "pale-ales-bitters-et-ipa",
      "count": 10
    },
    "iconFile": "026.webp"
  },
  {
    "number": 27,
    "numberLabel": "027",
    "id": "pale-ales-bitters-et-ipa-15",
    "family": "collection",
    "collectionId": "pale-ales-bitters-et-ipa",
    "name": "Cascadeur de Cascade",
    "description": "Découvrir 15 cartes dans la collection Pale Ales, Bitters et IPA.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "pale-ales-bitters-et-ipa",
      "count": 15
    },
    "iconFile": "027.webp"
  },
  {
    "number": 28,
    "numberLabel": "028",
    "id": "pale-ales-bitters-et-ipa-20",
    "family": "collection",
    "collectionId": "pale-ales-bitters-et-ipa",
    "name": "Dompteur d’IBU",
    "description": "Découvrir 20 cartes dans la collection Pale Ales, Bitters et IPA.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "pale-ales-bitters-et-ipa",
      "count": 20
    },
    "iconFile": "028.webp"
  },
  {
    "number": 29,
    "numberLabel": "029",
    "id": "pale-ales-bitters-et-ipa-25",
    "family": "collection",
    "collectionId": "pale-ales-bitters-et-ipa",
    "name": "Trompette à houblon",
    "description": "Découvrir 25 cartes dans la collection Pale Ales, Bitters et IPA.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "pale-ales-bitters-et-ipa",
      "count": 25
    },
    "iconFile": "029.webp"
  },
  {
    "number": 30,
    "numberLabel": "030",
    "id": "pale-ales-bitters-et-ipa-30",
    "family": "collection",
    "collectionId": "pale-ales-bitters-et-ipa",
    "name": "Grand prêtre de la résine",
    "description": "Découvrir 30 cartes dans la collection Pale Ales, Bitters et IPA.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "pale-ales-bitters-et-ipa",
      "count": 30
    },
    "iconFile": "030.webp"
  },
  {
    "number": 31,
    "numberLabel": "031",
    "id": "pale-ales-bitters-et-ipa-35",
    "family": "collection",
    "collectionId": "pale-ales-bitters-et-ipa",
    "name": "Dernier zeste avant impact",
    "description": "Découvrir 35 cartes dans la collection Pale Ales, Bitters et IPA.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "pale-ales-bitters-et-ipa",
      "count": 35
    },
    "iconFile": "031.webp"
  },
  {
    "number": 32,
    "numberLabel": "032",
    "id": "pale-ales-bitters-et-ipa-complete",
    "family": "collection",
    "collectionId": "pale-ales-bitters-et-ipa",
    "name": "Seigneur des IPA et autres morsures vertes",
    "description": "Compléter la collection Pale Ales, Bitters et IPA.",
    "hidden": false,
    "condition": {
      "type": "collectionComplete",
      "collectionId": "pale-ales-bitters-et-ipa"
    },
    "iconFile": "032.webp"
  },
  {
    "number": 33,
    "numberLabel": "033",
    "id": "porters-stouts-1",
    "family": "collection",
    "collectionId": "porters-stouts",
    "name": "Première ombre dans le verre",
    "description": "Découvrir 1 carte dans la collection Porters & Stouts.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "porters-stouts",
      "count": 1
    },
    "iconFile": "033.webp"
  },
  {
    "number": 34,
    "numberLabel": "034",
    "id": "porters-stouts-5",
    "family": "collection",
    "collectionId": "porters-stouts",
    "name": "Café dans la moustache",
    "description": "Découvrir 5 cartes dans la collection Porters & Stouts.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "porters-stouts",
      "count": 5
    },
    "iconFile": "034.webp"
  },
  {
    "number": 35,
    "numberLabel": "035",
    "id": "porters-stouts-10",
    "family": "collection",
    "collectionId": "porters-stouts",
    "name": "Torréfaction suspecte",
    "description": "Découvrir 10 cartes dans la collection Porters & Stouts.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "porters-stouts",
      "count": 10
    },
    "iconFile": "035.webp"
  },
  {
    "number": 36,
    "numberLabel": "036",
    "id": "porters-stouts-15",
    "family": "collection",
    "collectionId": "porters-stouts",
    "name": "Chevalier du malt noir",
    "description": "Découvrir 15 cartes dans la collection Porters & Stouts.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "porters-stouts",
      "count": 15
    },
    "iconFile": "036.webp"
  },
  {
    "number": 37,
    "numberLabel": "037",
    "id": "porters-stouts-20",
    "family": "collection",
    "collectionId": "porters-stouts",
    "name": "Caveau presque vidé",
    "description": "Découvrir 20 cartes dans la collection Porters & Stouts.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "porters-stouts",
      "count": 20
    },
    "iconFile": "037.webp"
  },
  {
    "number": 38,
    "numberLabel": "038",
    "id": "porters-stouts-complete",
    "family": "collection",
    "collectionId": "porters-stouts",
    "name": "Baron du goudron délicieux",
    "description": "Compléter la collection Porters & Stouts.",
    "hidden": false,
    "condition": {
      "type": "collectionComplete",
      "collectionId": "porters-stouts"
    },
    "iconFile": "038.webp"
  },
  {
    "number": 39,
    "numberLabel": "039",
    "id": "traditions-belges-et-francaises-1",
    "family": "collection",
    "collectionId": "traditions-belges-et-francaises",
    "name": "Premier clocher qui mousse",
    "description": "Découvrir 1 carte dans la collection Traditions belges et françaises.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "traditions-belges-et-francaises",
      "count": 1
    },
    "iconFile": "039.webp"
  },
  {
    "number": 40,
    "numberLabel": "040",
    "id": "traditions-belges-et-francaises-5",
    "family": "collection",
    "collectionId": "traditions-belges-et-francaises",
    "name": "Abbaye de poche",
    "description": "Découvrir 5 cartes dans la collection Traditions belges et françaises.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "traditions-belges-et-francaises",
      "count": 5
    },
    "iconFile": "040.webp"
  },
  {
    "number": 41,
    "numberLabel": "041",
    "id": "traditions-belges-et-francaises-10",
    "family": "collection",
    "collectionId": "traditions-belges-et-francaises",
    "name": "Levure en sabots",
    "description": "Découvrir 10 cartes dans la collection Traditions belges et françaises.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "traditions-belges-et-francaises",
      "count": 10
    },
    "iconFile": "041.webp"
  },
  {
    "number": 42,
    "numberLabel": "042",
    "id": "traditions-belges-et-francaises-15",
    "family": "collection",
    "collectionId": "traditions-belges-et-francaises",
    "name": "Pèlerin du terroir liquide",
    "description": "Découvrir 15 cartes dans la collection Traditions belges et françaises.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "traditions-belges-et-francaises",
      "count": 15
    },
    "iconFile": "042.webp"
  },
  {
    "number": 43,
    "numberLabel": "043",
    "id": "traditions-belges-et-francaises-complete",
    "family": "collection",
    "collectionId": "traditions-belges-et-francaises",
    "name": "Grand notaire des traditions fermentées",
    "description": "Compléter la collection Traditions belges et françaises.",
    "hidden": false,
    "condition": {
      "type": "collectionComplete",
      "collectionId": "traditions-belges-et-francaises"
    },
    "iconFile": "043.webp"
  },
  {
    "number": 44,
    "numberLabel": "044",
    "id": "bieres-de-ble-et-de-seigle-1",
    "family": "collection",
    "collectionId": "bieres-de-ble-et-de-seigle",
    "name": "Moustache de blé",
    "description": "Découvrir 1 carte dans la collection Bières de blé et de seigle.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "bieres-de-ble-et-de-seigle",
      "count": 1
    },
    "iconFile": "044.webp"
  },
  {
    "number": 45,
    "numberLabel": "045",
    "id": "bieres-de-ble-et-de-seigle-5",
    "family": "collection",
    "collectionId": "bieres-de-ble-et-de-seigle",
    "name": "Banane réglementaire",
    "description": "Découvrir 5 cartes dans la collection Bières de blé et de seigle.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "bieres-de-ble-et-de-seigle",
      "count": 5
    },
    "iconFile": "045.webp"
  },
  {
    "number": 46,
    "numberLabel": "046",
    "id": "bieres-de-ble-et-de-seigle-10",
    "family": "collection",
    "collectionId": "bieres-de-ble-et-de-seigle",
    "name": "Clou de girofle dans le guidon",
    "description": "Découvrir 10 cartes dans la collection Bières de blé et de seigle.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "bieres-de-ble-et-de-seigle",
      "count": 10
    },
    "iconFile": "046.webp"
  },
  {
    "number": 47,
    "numberLabel": "047",
    "id": "bieres-de-ble-et-de-seigle-complete",
    "family": "collection",
    "collectionId": "bieres-de-ble-et-de-seigle",
    "name": "Sorcier du pain qui pétille",
    "description": "Compléter la collection Bières de blé et de seigle.",
    "hidden": false,
    "condition": {
      "type": "collectionComplete",
      "collectionId": "bieres-de-ble-et-de-seigle"
    },
    "iconFile": "047.webp"
  },
  {
    "number": 48,
    "numberLabel": "048",
    "id": "bieres-acides-sauvages-et-spontanees-1",
    "family": "collection",
    "collectionId": "bieres-acides-sauvages-et-spontanees",
    "name": "Premier citron diplomatique",
    "description": "Découvrir 1 carte dans la collection Bières acides, sauvages et spontanées.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "bieres-acides-sauvages-et-spontanees",
      "count": 1
    },
    "iconFile": "048.webp"
  },
  {
    "number": 49,
    "numberLabel": "049",
    "id": "bieres-acides-sauvages-et-spontanees-5",
    "family": "collection",
    "collectionId": "bieres-acides-sauvages-et-spontanees",
    "name": "Grimace élégante",
    "description": "Découvrir 5 cartes dans la collection Bières acides, sauvages et spontanées.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "bieres-acides-sauvages-et-spontanees",
      "count": 5
    },
    "iconFile": "049.webp"
  },
  {
    "number": 50,
    "numberLabel": "050",
    "id": "bieres-acides-sauvages-et-spontanees-10",
    "family": "collection",
    "collectionId": "bieres-acides-sauvages-et-spontanees",
    "name": "Brett dans la cabane",
    "description": "Découvrir 10 cartes dans la collection Bières acides, sauvages et spontanées.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "bieres-acides-sauvages-et-spontanees",
      "count": 10
    },
    "iconFile": "050.webp"
  },
  {
    "number": 51,
    "numberLabel": "051",
    "id": "bieres-acides-sauvages-et-spontanees-15",
    "family": "collection",
    "collectionId": "bieres-acides-sauvages-et-spontanees",
    "name": "Acidonaute instable",
    "description": "Découvrir 15 cartes dans la collection Bières acides, sauvages et spontanées.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "bieres-acides-sauvages-et-spontanees",
      "count": 15
    },
    "iconFile": "051.webp"
  },
  {
    "number": 52,
    "numberLabel": "052",
    "id": "bieres-acides-sauvages-et-spontanees-20",
    "family": "collection",
    "collectionId": "bieres-acides-sauvages-et-spontanees",
    "name": "Presque avalé par le lambic",
    "description": "Découvrir 20 cartes dans la collection Bières acides, sauvages et spontanées.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "bieres-acides-sauvages-et-spontanees",
      "count": 20
    },
    "iconFile": "052.webp"
  },
  {
    "number": 53,
    "numberLabel": "053",
    "id": "bieres-acides-sauvages-et-spontanees-complete",
    "family": "collection",
    "collectionId": "bieres-acides-sauvages-et-spontanees",
    "name": "Duc du vinaigre noble",
    "description": "Compléter la collection Bières acides, sauvages et spontanées.",
    "hidden": false,
    "condition": {
      "type": "collectionComplete",
      "collectionId": "bieres-acides-sauvages-et-spontanees"
    },
    "iconFile": "053.webp"
  },
  {
    "number": 54,
    "numberLabel": "054",
    "id": "ales-ambrees-brunes-maltees-et-fortes-1",
    "family": "collection",
    "collectionId": "ales-ambrees-brunes-maltees-et-fortes",
    "name": "Premier caramel de combat",
    "description": "Découvrir 1 carte dans la collection Ales ambrées, brunes, maltées et fortes.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "ales-ambrees-brunes-maltees-et-fortes",
      "count": 1
    },
    "iconFile": "054.webp"
  },
  {
    "number": 55,
    "numberLabel": "055",
    "id": "ales-ambrees-brunes-maltees-et-fortes-5",
    "family": "collection",
    "collectionId": "ales-ambrees-brunes-maltees-et-fortes",
    "name": "Malt sur les bottes",
    "description": "Découvrir 5 cartes dans la collection Ales ambrées, brunes, maltées et fortes.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "ales-ambrees-brunes-maltees-et-fortes",
      "count": 5
    },
    "iconFile": "055.webp"
  },
  {
    "number": 56,
    "numberLabel": "056",
    "id": "ales-ambrees-brunes-maltees-et-fortes-10",
    "family": "collection",
    "collectionId": "ales-ambrees-brunes-maltees-et-fortes",
    "name": "Ambré mais dangereux",
    "description": "Découvrir 10 cartes dans la collection Ales ambrées, brunes, maltées et fortes.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "ales-ambrees-brunes-maltees-et-fortes",
      "count": 10
    },
    "iconFile": "056.webp"
  },
  {
    "number": 57,
    "numberLabel": "057",
    "id": "ales-ambrees-brunes-maltees-et-fortes-15",
    "family": "collection",
    "collectionId": "ales-ambrees-brunes-maltees-et-fortes",
    "name": "Brune dans le brouillard",
    "description": "Découvrir 15 cartes dans la collection Ales ambrées, brunes, maltées et fortes.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "ales-ambrees-brunes-maltees-et-fortes",
      "count": 15
    },
    "iconFile": "057.webp"
  },
  {
    "number": 58,
    "numberLabel": "058",
    "id": "ales-ambrees-brunes-maltees-et-fortes-20",
    "family": "collection",
    "collectionId": "ales-ambrees-brunes-maltees-et-fortes",
    "name": "Biscuit de guerre",
    "description": "Découvrir 20 cartes dans la collection Ales ambrées, brunes, maltées et fortes.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "ales-ambrees-brunes-maltees-et-fortes",
      "count": 20
    },
    "iconFile": "058.webp"
  },
  {
    "number": 59,
    "numberLabel": "059",
    "id": "ales-ambrees-brunes-maltees-et-fortes-25",
    "family": "collection",
    "collectionId": "ales-ambrees-brunes-maltees-et-fortes",
    "name": "Presque roi du malt costaud",
    "description": "Découvrir 25 cartes dans la collection Ales ambrées, brunes, maltées et fortes.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "ales-ambrees-brunes-maltees-et-fortes",
      "count": 25
    },
    "iconFile": "059.webp"
  },
  {
    "number": 60,
    "numberLabel": "060",
    "id": "ales-ambrees-brunes-maltees-et-fortes-complete",
    "family": "collection",
    "collectionId": "ales-ambrees-brunes-maltees-et-fortes",
    "name": "Maréchal des degrés sournois",
    "description": "Compléter la collection Ales ambrées, brunes, maltées et fortes.",
    "hidden": false,
    "condition": {
      "type": "collectionComplete",
      "collectionId": "ales-ambrees-brunes-maltees-et-fortes"
    },
    "iconFile": "060.webp"
  },
  {
    "number": 61,
    "numberLabel": "061",
    "id": "styles-singuliers-historiques-et-hybrides-1",
    "family": "collection",
    "collectionId": "styles-singuliers-historiques-et-hybrides",
    "name": "Premier truc pas net",
    "description": "Découvrir 1 carte dans la collection Styles singuliers, historiques et hybrides.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "styles-singuliers-historiques-et-hybrides",
      "count": 1
    },
    "iconFile": "061.webp"
  },
  {
    "number": 62,
    "numberLabel": "062",
    "id": "styles-singuliers-historiques-et-hybrides-5",
    "family": "collection",
    "collectionId": "styles-singuliers-historiques-et-hybrides",
    "name": "Musée des curiosités liquides",
    "description": "Découvrir 5 cartes dans la collection Styles singuliers, historiques et hybrides.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "styles-singuliers-historiques-et-hybrides",
      "count": 5
    },
    "iconFile": "062.webp"
  },
  {
    "number": 63,
    "numberLabel": "063",
    "id": "styles-singuliers-historiques-et-hybrides-10",
    "family": "collection",
    "collectionId": "styles-singuliers-historiques-et-hybrides",
    "name": "Archéologue du demi bizarre",
    "description": "Découvrir 10 cartes dans la collection Styles singuliers, historiques et hybrides.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "styles-singuliers-historiques-et-hybrides",
      "count": 10
    },
    "iconFile": "063.webp"
  },
  {
    "number": 64,
    "numberLabel": "064",
    "id": "styles-singuliers-historiques-et-hybrides-15",
    "family": "collection",
    "collectionId": "styles-singuliers-historiques-et-hybrides",
    "name": "Fouille-mousse confirmé",
    "description": "Découvrir 15 cartes dans la collection Styles singuliers, historiques et hybrides.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "styles-singuliers-historiques-et-hybrides",
      "count": 15
    },
    "iconFile": "064.webp"
  },
  {
    "number": 65,
    "numberLabel": "065",
    "id": "styles-singuliers-historiques-et-hybrides-20",
    "family": "collection",
    "collectionId": "styles-singuliers-historiques-et-hybrides",
    "name": "Gardien des recettes oubliées",
    "description": "Découvrir 20 cartes dans la collection Styles singuliers, historiques et hybrides.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "styles-singuliers-historiques-et-hybrides",
      "count": 20
    },
    "iconFile": "065.webp"
  },
  {
    "number": 66,
    "numberLabel": "066",
    "id": "styles-singuliers-historiques-et-hybrides-25",
    "family": "collection",
    "collectionId": "styles-singuliers-historiques-et-hybrides",
    "name": "Hybrideur imprudent",
    "description": "Découvrir 25 cartes dans la collection Styles singuliers, historiques et hybrides.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "styles-singuliers-historiques-et-hybrides",
      "count": 25
    },
    "iconFile": "066.webp"
  },
  {
    "number": 67,
    "numberLabel": "067",
    "id": "styles-singuliers-historiques-et-hybrides-30",
    "family": "collection",
    "collectionId": "styles-singuliers-historiques-et-hybrides",
    "name": "Historien qui sent la cave",
    "description": "Découvrir 30 cartes dans la collection Styles singuliers, historiques et hybrides.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "styles-singuliers-historiques-et-hybrides",
      "count": 30
    },
    "iconFile": "067.webp"
  },
  {
    "number": 68,
    "numberLabel": "068",
    "id": "styles-singuliers-historiques-et-hybrides-35",
    "family": "collection",
    "collectionId": "styles-singuliers-historiques-et-hybrides",
    "name": "Cartographe du n’importe quoi noble",
    "description": "Découvrir 35 cartes dans la collection Styles singuliers, historiques et hybrides.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "styles-singuliers-historiques-et-hybrides",
      "count": 35
    },
    "iconFile": "068.webp"
  },
  {
    "number": 69,
    "numberLabel": "069",
    "id": "styles-singuliers-historiques-et-hybrides-complete",
    "family": "collection",
    "collectionId": "styles-singuliers-historiques-et-hybrides",
    "name": "Conservateur suprême des bières cheloues",
    "description": "Compléter la collection Styles singuliers, historiques et hybrides.",
    "hidden": false,
    "condition": {
      "type": "collectionComplete",
      "collectionId": "styles-singuliers-historiques-et-hybrides"
    },
    "iconFile": "069.webp"
  },
  {
    "number": 70,
    "numberLabel": "070",
    "id": "appellations-commerciales-1",
    "family": "collection",
    "collectionId": "appellations-commerciales",
    "name": "Première étiquette qui claque",
    "description": "Découvrir 1 carte dans la collection Appellations commerciales.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "appellations-commerciales",
      "count": 1
    },
    "iconFile": "070.webp"
  },
  {
    "number": 71,
    "numberLabel": "071",
    "id": "appellations-commerciales-5",
    "family": "collection",
    "collectionId": "appellations-commerciales",
    "name": "Marketing en sous-bock",
    "description": "Découvrir 5 cartes dans la collection Appellations commerciales.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "appellations-commerciales",
      "count": 5
    },
    "iconFile": "071.webp"
  },
  {
    "number": 72,
    "numberLabel": "072",
    "id": "appellations-commerciales-10",
    "family": "collection",
    "collectionId": "appellations-commerciales",
    "name": "Rayon grande surface apprivoisé",
    "description": "Découvrir 10 cartes dans la collection Appellations commerciales.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "appellations-commerciales",
      "count": 10
    },
    "iconFile": "072.webp"
  },
  {
    "number": 73,
    "numberLabel": "073",
    "id": "appellations-commerciales-15",
    "family": "collection",
    "collectionId": "appellations-commerciales",
    "name": "Nom vendeur, palais méfiant",
    "description": "Découvrir 15 cartes dans la collection Appellations commerciales.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "appellations-commerciales",
      "count": 15
    },
    "iconFile": "073.webp"
  },
  {
    "number": 74,
    "numberLabel": "074",
    "id": "appellations-commerciales-20",
    "family": "collection",
    "collectionId": "appellations-commerciales",
    "name": "Collectionneur de slogans mousseux",
    "description": "Découvrir 20 cartes dans la collection Appellations commerciales.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "appellations-commerciales",
      "count": 20
    },
    "iconFile": "074.webp"
  },
  {
    "number": 75,
    "numberLabel": "075",
    "id": "appellations-commerciales-25",
    "family": "collection",
    "collectionId": "appellations-commerciales",
    "name": "Grand lecteur d’étiquettes",
    "description": "Découvrir 25 cartes dans la collection Appellations commerciales.",
    "hidden": false,
    "condition": {
      "type": "collectionDiscoveredAtLeast",
      "collectionId": "appellations-commerciales",
      "count": 25
    },
    "iconFile": "075.webp"
  },
  {
    "number": 76,
    "numberLabel": "076",
    "id": "appellations-commerciales-complete",
    "family": "collection",
    "collectionId": "appellations-commerciales",
    "name": "PDG du rayon bière",
    "description": "Compléter la collection Appellations commerciales.",
    "hidden": false,
    "condition": {
      "type": "collectionComplete",
      "collectionId": "appellations-commerciales"
    },
    "iconFile": "076.webp"
  },
  {
    "number": 77,
    "numberLabel": "077",
    "id": "balanced-touriste-integral-du-houblon",
    "family": "balanced",
    "name": "Touriste intégral du houblon",
    "description": "Au moins 1 carte dans chaque collection.",
    "hidden": false,
    "condition": {
      "type": "allCollectionsDiscoveredAtLeast",
      "count": 1
    },
    "iconFile": "077.webp"
  },
  {
    "number": 78,
    "numberLabel": "078",
    "id": "balanced-casiers-alignes-au-cordeau",
    "family": "balanced",
    "name": "Casiers alignés au cordeau",
    "description": "Au moins 5 cartes dans chaque collection.",
    "hidden": false,
    "condition": {
      "type": "allCollectionsDiscoveredAtLeast",
      "count": 5
    },
    "iconFile": "078.webp"
  },
  {
    "number": 79,
    "numberLabel": "079",
    "id": "balanced-decathlon-de-la-mousse",
    "family": "balanced",
    "name": "Décathlon de la mousse",
    "description": "Au moins 10 cartes dans chaque collection.",
    "hidden": false,
    "condition": {
      "type": "allCollectionsDiscoveredAtLeast",
      "count": 10
    },
    "iconFile": "079.webp"
  },
  {
    "number": 80,
    "numberLabel": "080",
    "id": "balanced-palais-panoramique",
    "family": "balanced",
    "name": "Palais panoramique",
    "description": "Au moins 50 % de chaque collection découverte.",
    "hidden": false,
    "condition": {
      "type": "allCollectionsRatioAtLeast",
      "ratio": 0.5
    },
    "iconFile": "080.webp"
  },
  {
    "number": 81,
    "numberLabel": "081",
    "id": "balanced-grand-equilibriste-du-comptoir",
    "family": "balanced",
    "name": "Grand équilibriste du comptoir",
    "description": "Au moins 75 % de chaque collection découverte.",
    "hidden": false,
    "condition": {
      "type": "allCollectionsRatioAtLeast",
      "ratio": 0.75
    },
    "iconFile": "081.webp"
  },
  {
    "number": 82,
    "numberLabel": "082",
    "id": "reveal-ca-n-existe-pas-chef",
    "family": "reveal",
    "name": "Ça n’existe pas, chef",
    "description": "1 nom inexistant tapé dans le champ Révéler.",
    "hidden": false,
    "condition": {
      "type": "unknownAttemptsAtLeast",
      "count": 1
    },
    "iconFile": "082.webp"
  },
  {
    "number": 83,
    "numberLabel": "083",
    "id": "reveal-brasseur-de-chimeres",
    "family": "reveal",
    "name": "Brasseur de chimères",
    "description": "10 noms inexistants tapés dans le champ Révéler.",
    "hidden": false,
    "condition": {
      "type": "unknownAttemptsAtLeast",
      "count": 10
    },
    "iconFile": "083.webp"
  },
  {
    "number": 84,
    "numberLabel": "084",
    "id": "reveal-catalogue-du-n-importe-quoi",
    "family": "reveal",
    "name": "Catalogue du n’importe quoi",
    "description": "25 noms inexistants tapés dans le champ Révéler.",
    "hidden": false,
    "condition": {
      "type": "unknownAttemptsAtLeast",
      "count": 25
    },
    "iconFile": "084.webp"
  },
  {
    "number": 85,
    "numberLabel": "085",
    "id": "reveal-inventeur-de-bieres-imaginaires",
    "family": "reveal",
    "name": "Inventeur de bières imaginaires",
    "description": "50 noms inexistants tapés dans le champ Révéler.",
    "hidden": false,
    "condition": {
      "type": "unknownAttemptsAtLeast",
      "count": 50
    },
    "iconFile": "085.webp"
  },
  {
    "number": 86,
    "numberLabel": "086",
    "id": "reveal-grand-mythomalt",
    "family": "reveal",
    "name": "Grand mythomalt",
    "description": "100 noms inexistants tapés dans le champ Révéler.",
    "hidden": false,
    "condition": {
      "type": "unknownAttemptsAtLeast",
      "count": 100
    },
    "iconFile": "086.webp"
  },
  {
    "number": 87,
    "numberLabel": "087",
    "id": "reveal-le-clavier-a-soif-pas-toi",
    "family": "reveal",
    "name": "Le clavier a soif, pas toi",
    "description": "5 erreurs d’affilée dans le champ Révéler.",
    "hidden": false,
    "condition": {
      "type": "unknownStreakAtLeast",
      "count": 5
    },
    "iconFile": "087.webp"
  },
  {
    "number": 88,
    "numberLabel": "088",
    "id": "reveal-le-mur-repond-mieux-que-toi",
    "family": "reveal",
    "name": "Le mur répond mieux que toi",
    "description": "10 erreurs d’affilée dans le champ Révéler.",
    "hidden": false,
    "condition": {
      "type": "unknownStreakAtLeast",
      "count": 10
    },
    "iconFile": "088.webp"
  },
  {
    "number": 89,
    "numberLabel": "089",
    "id": "reveal-deja-bu-deja-vu",
    "family": "reveal",
    "name": "Déjà bu, déjà vu",
    "description": "1 carte déjà découverte retapée dans le champ Révéler.",
    "hidden": false,
    "condition": {
      "type": "alreadyDiscoveredAttemptsAtLeast",
      "count": 1
    },
    "iconFile": "089.webp"
  },
  {
    "number": 90,
    "numberLabel": "090",
    "id": "reveal-radoteur-de-comptoir",
    "family": "reveal",
    "name": "Radoteur de comptoir",
    "description": "10 cartes déjà découvertes retapées dans le champ Révéler.",
    "hidden": false,
    "condition": {
      "type": "alreadyDiscoveredAttemptsAtLeast",
      "count": 10
    },
    "iconFile": "090.webp"
  },
  {
    "number": 91,
    "numberLabel": "091",
    "id": "reveal-vieille-mousse-vieux-reflexe",
    "family": "reveal",
    "name": "Vieille mousse, vieux réflexe",
    "description": "25 cartes déjà découvertes retapées dans le champ Révéler.",
    "hidden": false,
    "condition": {
      "type": "alreadyDiscoveredAttemptsAtLeast",
      "count": 25
    },
    "iconFile": "091.webp"
  },
  {
    "number": 92,
    "numberLabel": "092",
    "id": "reveal-tir-trans-casier",
    "family": "reveal",
    "name": "Tir trans-casier",
    "description": "1 bière trouvée dans une autre collection dans le champ Révéler.",
    "hidden": false,
    "condition": {
      "type": "externalCollectionMatchesAtLeast",
      "count": 1
    },
    "iconFile": "092.webp"
  },
  {
    "number": 93,
    "numberLabel": "093",
    "id": "reveal-gps-de-cave-humide",
    "family": "reveal",
    "name": "GPS de cave humide",
    "description": "5 bascules vers une autre collection dans le champ Révéler.",
    "hidden": false,
    "condition": {
      "type": "externalCollectionMatchesAtLeast",
      "count": 5
    },
    "iconFile": "093.webp"
  },
  {
    "number": 94,
    "numberLabel": "094",
    "id": "reveal-cartographe-du-mauvais-rayon",
    "family": "reveal",
    "name": "Cartographe du mauvais rayon",
    "description": "10 bascules vers une autre collection dans le champ Révéler.",
    "hidden": false,
    "condition": {
      "type": "externalCollectionMatchesAtLeast",
      "count": 10
    },
    "iconFile": "094.webp"
  },
  {
    "number": 95,
    "numberLabel": "095",
    "id": "secret-position-de-degustation-avancee",
    "family": "secret",
    "name": "Position de dégustation avancée",
    "description": "Atteindre exactement 69 cartes découvertes.",
    "hidden": true,
    "condition": {
      "type": "totalDiscoveredEquals",
      "count": 69
    },
    "iconFile": "095.webp"
  },
  {
    "number": 96,
    "numberLabel": "096",
    "id": "secret-le-dernier-bouchon-saute",
    "family": "secret",
    "name": "Le dernier bouchon saute",
    "description": "Révéler la dernière carte manquante d’une collection.",
    "hidden": true,
    "condition": {
      "type": "lastCardInCollection"
    },
    "iconFile": "096.webp"
  },
  {
    "number": 97,
    "numberLabel": "097",
    "id": "secret-la-lumiere-a-quitte-le-verre",
    "family": "secret",
    "name": "La lumière a quitté le verre",
    "description": "Compléter Porters & Stouts.",
    "hidden": true,
    "condition": {
      "type": "collectionComplete",
      "collectionId": "porters-stouts"
    },
    "iconFile": "097.webp"
  },
  {
    "number": 98,
    "numberLabel": "098",
    "id": "secret-champion-de-la-grimace-noble",
    "family": "secret",
    "name": "Champion de la grimace noble",
    "description": "Compléter Bières acides, sauvages et spontanées.",
    "hidden": true,
    "condition": {
      "type": "collectionComplete",
      "collectionId": "bieres-acides-sauvages-et-spontanees"
    },
    "iconFile": "098.webp"
  },
  {
    "number": 99,
    "numberLabel": "099",
    "id": "secret-directeur-du-musee-des-mauvaises-idees",
    "family": "secret",
    "name": "Directeur du musée des mauvaises idées",
    "description": "Compléter Styles singuliers, historiques et hybrides.",
    "hidden": true,
    "condition": {
      "type": "collectionComplete",
      "collectionId": "styles-singuliers-historiques-et-hybrides"
    },
    "iconFile": "099.webp"
  },
  {
    "number": 100,
    "numberLabel": "100",
    "id": "secret-redemption-en-pression",
    "family": "secret",
    "name": "Rédemption en pression",
    "description": "Faire 3 erreurs puis trouver une bonne réponse.",
    "hidden": true,
    "condition": {
      "type": "unknownStreakThenValid",
      "count": 3
    },
    "iconFile": "100.webp"
  },
  {
    "number": 101,
    "numberLabel": "101",
    "id": "secret-retour-au-vieux-demi",
    "family": "secret",
    "name": "Retour au vieux demi",
    "description": "Retaper une carte déjà découverte juste après une nouvelle découverte.",
    "hidden": true,
    "condition": {
      "type": "alreadyDiscoveredAfterNewDiscovery"
    },
    "iconFile": "101.webp"
  },
  {
    "number": 102,
    "numberLabel": "102",
    "id": "secret-nyctalope-du-houblon",
    "family": "secret",
    "name": "Nyctalope du houblon",
    "description": "Révéler une carte après minuit.",
    "hidden": true,
    "condition": {
      "type": "revealedAfterMidnight"
    },
    "iconFile": "102.webp"
  },
  {
    "number": 103,
    "numberLabel": "103",
    "id": "secret-petit-dej-de-champion-douteux",
    "family": "secret",
    "name": "Petit-déj de champion douteux",
    "description": "Révéler une carte le matin avant 8h.",
    "hidden": true,
    "condition": {
      "type": "revealedBeforeHour",
      "hour": 8
    },
    "iconFile": "103.webp"
  },
  {
    "number": 104,
    "numberLabel": "104",
    "id": "secret-le-revenant-du-frigo",
    "family": "secret",
    "name": "Le revenant du frigo",
    "description": "Revenir après 7 jours sans découverte puis révéler une carte.",
    "hidden": true,
    "condition": {
      "type": "backAfterDaysWithoutDiscovery",
      "days": 7
    },
    "iconFile": "104.webp"
  },
  {
    "number": 105,
    "numberLabel": "105",
    "id": "secret-papillon-de-brasserie",
    "family": "secret",
    "name": "Papillon de brasserie",
    "description": "Révéler une carte dans 3 collections différentes sur une même session.",
    "hidden": true,
    "condition": {
      "type": "collectionsInSessionAtLeast",
      "count": 3
    },
    "iconFile": "105.webp"
  },
  {
    "number": 106,
    "numberLabel": "106",
    "id": "secret-tournee-generale-cosmique",
    "family": "secret",
    "name": "Tournée générale cosmique",
    "description": "Révéler une carte dans chaque collection sur une même session.",
    "hidden": true,
    "condition": {
      "type": "allCollectionsInSession"
    },
    "iconFile": "106.webp"
  },
  {
    "number": 107,
    "numberLabel": "107",
    "id": "secret-fin-de-chasse-debut-de-legende",
    "family": "secret",
    "name": "Fin de chasse, début de légende",
    "description": "Révéler la dernière carte totale du jeu.",
    "hidden": true,
    "condition": {
      "type": "finalCardDiscovered"
    },
    "iconFile": "107.webp"
  }
];

export function validateBadgeDefinitions(definitions = BADGE_DEFINITIONS) {
  const warnings = [];
  const numbers = new Set();
  const ids = new Set();
  if (definitions.length !== 107) warnings.push(`107 badges attendus, ${definitions.length} trouvés.`);
  for (let index = 1; index <= 107; index += 1) {
    if (!definitions.some((badge) => badge.number === index)) warnings.push(`Badge ${String(index).padStart(3, "0")} manquant.`);
  }
  definitions.forEach((badge) => {
    if (numbers.has(badge.number)) warnings.push(`Numéro de badge dupliqué: ${badge.numberLabel}.`);
    if (ids.has(badge.id)) warnings.push(`Id de badge dupliqué: ${badge.id}.`);
    numbers.add(badge.number); ids.add(badge.id);
    if (!badge.condition) warnings.push(`Condition manquante: ${badge.id}.`);
    if (!badge.name) warnings.push(`Nom manquant: ${badge.id}.`);
    if (!badge.iconFile) warnings.push(`Icône manquante: ${badge.id}.`);
  });
  return warnings;
}

if (import.meta.env?.DEV) {
  const warnings = validateBadgeDefinitions();
  if (warnings.length) console.warn("Définitions de badges ZythoHunt invalides", warnings);
}
