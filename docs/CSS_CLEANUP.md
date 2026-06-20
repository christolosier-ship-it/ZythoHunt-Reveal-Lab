# Architecture CSS active

Le laboratoire utilise désormais trois feuilles complémentaires :

- `src/styles.css` : interface, cartes, carrousel, révélation, panneau laboratoire et responsive.
- `src/background/beer-background.css` : moteur visuel du liquide, de la mousse et des particules.
- `src/background/background-integration.css` : intégration du fond avec l’interface.

Les anciens styles de grille 3×3, navigation basse, panneau de données et anciens prototypes de carrousel ont été supprimés.

La préférence de mouvement réduit est détectée dans `src/main.js` et représentée par la classe racine `reduce-motion`. Le fond animé conserve l’unique requête média native afin de ralentir ses animations dès le chargement.
