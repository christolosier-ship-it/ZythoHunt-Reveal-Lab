# Prompt Codex — Réécriture éditoriale Collection 07 : Ales ambrées, brunes, maltées et fortes

## Objectif

Intégrer dans `collection-07-ales-ambrees-brunes-maltees-et-fortes.json` les textes éditoriaux validés pour la collection 07.

Le fichier source contient 27 cartes dans la collection `ales-ambrees-brunes-maltees-et-fortes`.

## Règles impératives

- Modifier uniquement les champs suivants :
  - `description`
  - `histoireEtOrigines`
  - `recette.profilRecherche`
- Ne modifier aucun autre champ.
- Ne modifier aucun identifiant.
- Ne modifier aucun `nom`, `collectionId`, `nature`, `parentPrincipalId`, `aliases`, `paysOrigine`, `origine`, `alcool`, `amertume`, `couleur`, `fermentation`, `service`, `recette.explicationProfil`, `recette.maltsEtCereales`, `recette.houblons`, `recette.levuresEtMicroorganismes`, `recette.ingredientsComplementaires`, `recette.profilEau`, `recette.empatage`, `recette.ebullitionEtHoublonnage`, `recette.fermentation`, `recette.maturation`, `sources`.
- Ne pas reformuler les textes ci-dessous.
- Ne pas corriger la ponctuation.
- Ne pas remplacer les apostrophes typographiques.
- Ne pas ajouter de sources.
- Ne pas supprimer de cartes.
- Ne pas réordonner les cartes.
- Utiliser l’`id` de chaque carte comme clé de correspondance.
- Après modification, vérifier que le JSON reste valide.
- Après modification, vérifier que la collection contient toujours exactement 27 cartes.
- Afficher un résumé des IDs modifiés.

---

# Textes validés à intégrer

## 1. `ale` — Ale

### `description`

L’Ale est la grande famille des fermentations hautes : malt, levure, esters, chaleur douce, fruits, pain, caramel ou houblon selon les branches. Ici, elle sert de tronc commun aux bières brunes, ambrées, écossaises, irlandaises et fortes, là où la fermentation donne souvent plus de rondeur et d’expression qu’une lager.

### `histoireEtOrigines`

Bien avant les catégories modernes, “ale” désignait surtout une bière de fermentation haute, par opposition progressive aux lagers et aux bières fortement houblonnées. La famille s’est ensuite fragmentée en traditions nationales : milds anglaises, brown ales, Scottish ales, red ales, strong ales et barley wines.

### `recette.profilRecherche`

une ale de fermentation haute, maltée et expressive, capable d’aller du pub léger à la bière forte de garde

---

## 2. `mild-ale` — Mild Ale

### `description`

La Mild Ale est une bière de pub discrète mais pas vide : faible alcool, malt doux, caramel, pain, noix, chocolat léger ou fruits secs selon la couleur. Elle ne cherche ni l’amertume ni la puissance ; elle cherche la pinte qui disparaît sans faire de bruit.

### `histoireEtOrigines`

Historiquement, “mild” désignait une bière jeune, non vieillie, par opposition aux bières de garde plus âgées ou plus houblonnées. Les milds modernes descendent surtout des ales X anglaises du XIXe siècle, devenues plus sombres après la Première Guerre mondiale, puis associées à des bières faibles en alcool et peu amères.

### `recette.profilRecherche`

une ale anglaise de session, douce et maltée, avec peu de houblon et beaucoup de buvabilité

---

## 3. `brown-ale` — Brown Ale

### `description`

La Brown Ale construit son charme dans le brun : noisette, caramel, pain grillé, biscuit, cacao doux ou fruits secs. Elle peut être anglaise et ronde, américaine et plus houblonnée, faible et sucrée ou plus sèche et robuste, mais son centre reste le malt brun.

### `histoireEtOrigines`

Le terme brown ale est ancien en Angleterre, puis il revient fortement avec les bières brunes embouteillées du XXe siècle. La famille moderne se divise surtout entre les versions anglaises, plus maltées et souvent plus douces, et les versions américaines, plus sèches, plus amères et plus houblonnées.

### `recette.profilRecherche`

une ale brune maltée, entre noisette, caramel et pain grillé, avec une intensité variable selon l’école

---

## 4. `amber-ale` — Amber Ale

### `description`

L’Amber Ale est le point d’équilibre entre malt caramelisé et houblon : cuivre, caramel sec, pain grillé, agrumes, fleurs ou résine selon l’origine. Elle n’est pas une pale ale rougie par accident, mais une bière où la couleur annonce une vraie présence maltée.

### `histoireEtOrigines`

La notion moderne d’Amber Ale vient surtout de la scène américaine, où elle occupe l’espace entre American Pale Ale et Brown Ale. Le BJCP décrit l’American Amber comme une ale ambrée houblonnée mais maltée, avec caramel en soutien et houblon américain souvent présent.

### `recette.profilRecherche`

une ale ambrée équilibrée, avec caramel sec, malt toasté et houblon présent sans écraser la base

---

## 5. `red-ale` — Red Ale

### `description`

La Red Ale met la couleur au service du malt : cuivre rouge, caramel doux, biscuit, toast léger, parfois houblon floral, terreux ou américain. Selon l’école, elle peut être irlandaise et douce, américaine et plus amère, ou moderne et franchement houblonnée.

### `histoireEtOrigines`

La famille Red Ale rassemble plusieurs lectures : Irish Red traditionnelle, American Red/Amber plus craft, et versions modernes renforcées. La clé commune reste une base maltée rouge ou cuivrée, avec une amertume qui varie beaucoup selon le pays et l’époque.

### `recette.profilRecherche`

une ale rouge maltée, toastée et équilibrée, avec caramel sec et amertume adaptée à son école

---

## 6. `strong-ale` — Strong Ale

### `description`

La Strong Ale est la famille des ales qui épaississent le rideau : alcool sensible, malt riche, caramel, fruits secs, noix, pain, esters et parfois chaleur douce. Elle doit être profonde sans devenir collante, puissante sans sentir le solvant.

### `histoireEtOrigines`

Le BJCP traite la British Strong Ale comme une catégorie d’entrée plus qu’un style strict : elle couvre des bières fortes britanniques variées, entre bières courantes et barley wines, sans imposer une origine unique. La force alcoolique devient ici le trait fédérateur.

### `recette.profilRecherche`

une ale forte, riche et chaleureuse, avec malt profond, fruits secs et alcool intégré

---

## 7. `barley-wine` — Barley Wine

### `description`

Le Barley Wine est une ale qui regarde le vin droit dans le verre : très forte, dense, maltée, fruitée, parfois oxydée noblement, avec caramel, toffee, pain, marmelade, fruits secs ou houblon massif selon l’école. C’est une bière de petite gorgée et de grande patience.

### `histoireEtOrigines`

Le terme apparaît pour désigner des ales anglaises très fortes, capables de rivaliser symboliquement avec le vin. La famille se divise aujourd’hui entre British Barley Wine, plus malté et arrondi, et American Barley Wine, plus amer, plus houblonné et plus frontal.

### `recette.profilRecherche`

une ale très forte de dégustation, riche, maltée ou houblonnée selon l’école, avec potentiel de garde

---

## 8. `english-pale-mild-ale` — English Pale Mild Ale

### `description`

L’English Pale Mild Ale est la mild rare en habits clairs : faible alcool, malt pâle, biscuit, pain, fruit léger et amertume modérée. Elle garde l’esprit mild, c’est-à-dire la douceur de pub et la buvabilité, mais sans la robe brune attendue.

### `histoireEtOrigines`

Les milds pâles ont existé historiquement, même si la version moderne associée au style est surtout dark mild. Le BJCP note que des versions pale ou ambrées existent, mais qu’elles sont plus rares que les dark milds contemporaines.

### `recette.profilRecherche`

une mild anglaise claire et légère, maltée, peu amère et très buvable

---

## 9. `english-dark-mild-ale` — English Dark Mild Ale

### `description`

L’English Dark Mild Ale est la pinte brune de faible gravité : caramel, toffee, pain grillé, noisette, chocolat doux, parfois prune ou raisin. Elle doit être savoureuse malgré son faible degré, sans devenir porter miniature ni eau sucrée.

### `histoireEtOrigines`

Le BJCP décrit la Dark Mild comme une bière de session britannique sombre, maltée, faible en alcool, issue des milds anglaises devenues plus sombres à partir de la fin du XIXe siècle puis après la Première Guerre mondiale.

### `recette.profilRecherche`

une dark mild de pub, brune et légère, avec caramel, toast et chocolat doux en format session

---

## 10. `english-brown-ale` — English Brown Ale

### `description`

L’English Brown Ale est une brune confortable : noisette, caramel, biscuit, pain brun, chocolat doux et fruit discret. Elle doit rester ronde, maltée et claire dans son intention, sans basculer vers le porter ni vers l’amertume américaine.

### `histoireEtOrigines`

La Brown Ale anglaise moderne s’est développée avec les versions embouteillées du XXe siècle, notamment dans le Nord de l’Angleterre. Le BJCP distingue cette famille des brown ales américaines, plus houblonnées et plus amères.

### `recette.profilRecherche`

une brown ale anglaise, maltée et noisettée, avec caramel doux, fruit discret et amertume mesurée

---

## 11. `london-brown-ale` — London Brown Ale

### `description`

La London Brown Ale est plus sombre, plus douce et plus basse en alcool que beaucoup de brown ales : caramel, sucre brun, mélasse légère, pain noir et fruit doux. Elle a quelque chose de dessert de pub, mais doit rester une bière, pas un sirop brun.

### `histoireEtOrigines`

La tradition londonienne des brown ales s’est orientée vers des bières plus faibles, plus sombres et plus sucrées que les versions du nord de l’Angleterre. Manns Brown Ale est souvent citée comme exemple emblématique de cette lecture londonienne.

### `recette.profilRecherche`

une brown ale londonienne sombre et douce, faible en alcool, avec caramel brun et rondeur sucrée maîtrisée

---

## 12. `irish-red-ale` — Irish Red Ale

### `description`

L’Irish Red Ale est une bière rouge de comptoir : caramel léger, biscuit, toast sec, parfois une pointe de grain rôti pour sécher la finale. Elle doit être douce sans être sucrée, rousse sans être lourde, irlandaise sans se déguiser en stout.

### `histoireEtOrigines`

Les origines exactes du style sont floues, mais l’Irish Red moderne est liée aux ales irlandaises ambrées à rouges, utilisant souvent une petite touche d’orge torréfiée pour la couleur et la finale sèche. Le BJCP en fait une bière maltée, modérément faible à moyenne, avec amertume contenue.

### `recette.profilRecherche`

une ale irlandaise rouge, douce et sèche en finale, avec caramel léger, biscuit et touche rôtie discrète

---

## 13. `old-ale` — Old Ale

### `description`

L’Old Ale sent la cave chaude et le temps : malt profond, caramel sombre, fruits secs, prune, cuir doux, noix, oxydation noble et alcool arrondi. Elle peut être plus sèche ou plus douce, mais elle doit évoquer une bière qui a vécu.

### `histoireEtOrigines`

Les Old Ales sont liées aux bières anglaises de garde ou stock ales, souvent vieillies assez longtemps pour développer complexité et parfois une légère note oxydative ou Brett historique. Le BJCP les situe dans la famille des fortes ales britanniques avec caractère de maturation.

### `recette.profilRecherche`

une ale anglaise forte et mûrie, avec fruits secs, caramel profond, alcool fondu et complexité de garde

---

## 14. `british-barley-wine` — British Barley Wine

### `description`

Le British Barley Wine est la version maltée et contemplative du monstre : toffee, pain, caramel, marmelade, fruits secs, sherry doux, alcool chaud et amertume de soutien. Il peut vieillir magnifiquement, en troquant la fougue contre le cuir, la noix et la profondeur.

### `histoireEtOrigines`

Le BJCP décrit l’English Barleywine comme une vitrine de richesse maltée et de complexité, souvent avec des notes de fruits secs et d’évolution. Contrairement à la version américaine, le houblon n’est pas le héros principal : il soutient la masse maltée.

### `recette.profilRecherche`

un barley wine britannique, très malté et complexe, avec fruits secs, toffee, alcool chaud et garde noble

---

## 15. `scottish-light-ale` — Scottish Light Ale

### `description`

La Scottish Light Ale est petite en force mais bien ancrée : caramel, toast, pain, toffee léger, fruit discret et finale légèrement sèche. Elle donne du malt sans poids, comme une braise modeste dans une chope fraîche.

### `histoireEtOrigines`

Les noms Scottish Light, Heavy et Export reprennent les anciennes catégories “shilling” utilisées pour classer les bières selon force et valeur. Le BJCP rappelle que ces noms se sont modernisés après la Seconde Guerre mondiale et que ces styles ne contiennent pas de fumée tourbée traditionnelle.

### `recette.profilRecherche`

une ale écossaise légère, maltée et toastée, faible en alcool, avec caramel doux et finale sèche

---

## 16. `scottish-heavy-ale` — Scottish Heavy Ale

### `description`

La Scottish Heavy Ale reprend le même alphabet malté, mais avec un peu plus d’épaule : caramel, biscuit, pain grillé, toffee et fruit léger. Elle reste une bière de pub, basse en houblon, propre, ronde et sèche juste ce qu’il faut.

### `histoireEtOrigines`

Dans la progression écossaise, Heavy correspond à une force intermédiaire entre Light et Export. La famille Scottish Ale privilégie le malt, une fermentation propre, une amertume modérée et aucune fumée tourbée dans l’interprétation traditionnelle.

### `recette.profilRecherche`

une ale écossaise de pub, maltée et douce, avec caramel, toast et amertume très contenue

---

## 17. `scottish-export-ale` — Scottish Export Ale

### `description`

La Scottish Export Ale est la plus structurée des petites écossaises : malt plus présent, caramel, biscuit, toast, fruit discret et corps plus affirmé. Elle reste retenue en houblon, car ici le malt tient la cornemuse et personne ne lui coupe le souffle.

### `histoireEtOrigines`

Export correspond à la version plus forte et plus complète des Scottish Ales de pub. Le BJCP la décrit comme une ale maltée, ambrée à brune, où la douceur résiduelle et le toasté sont équilibrés par une sécheresse légère.

### `recette.profilRecherche`

une ale écossaise plus ample, maltée et toastée, avec caramel net, corps modéré et houblon discret

---

## 18. `scotch-ale-wee-heavy` — Scotch Ale / Wee Heavy

### `description`

La Scotch Ale / Wee Heavy est l’Écosse en version feu de cheminée : malt massif, caramel profond, toffee, pain, fruits secs, alcool doux et corps ample. Elle doit être riche et chaleureuse, mais pas fumée par défaut ni sucrée comme un caramel fondu oublié.

### `histoireEtOrigines`

Le BJCP décrit la Wee Heavy comme une ale écossaise forte, riche et maltée, issue de la tradition des bières plus puissantes associées aux anciens classements de force. Il précise aussi que la fumée tourbée n’est pas un caractère traditionnel du style.

### `recette.profilRecherche`

une ale écossaise forte, riche et maltée, avec caramel profond, fruits secs et alcool doux sans fumée imposée

---

## 19. `peated-scotch-ale` — Peated Scotch Ale

### `description`

La Peated Scotch Ale est une interprétation moderne : une Wee Heavy à laquelle on ajoute fumée tourbée, phénols, terre, braise froide ou whisky. Le danger est immense : trop de tourbe, et la bière devient un pansement flambé dans une cheminée.

### `histoireEtOrigines`

La fumée tourbée est surtout une projection moderne liée à l’imaginaire du whisky écossais, pas un trait classique des Scottish Ales traditionnelles. Cette carte doit donc être lue comme une spécialité fumée contemporaine inspirée de l’Écosse, pas comme une Scotch Ale historique.

### `recette.profilRecherche`

une Scotch Ale moderne fumée à la tourbe, riche et maltée, où la fumée reste mesurée et intégrée

---

## 20. `american-amber-red-ale` — American Amber / Red Ale

### `description`

L’American Amber / Red Ale pousse la couleur vers le houblon : caramel sec, pain grillé, agrumes, pin, fruits ou fleurs, avec une amertume plus nette que les rouges britanniques ou irlandaises. Le malt donne le socle, le houblon allume les néons.

### `histoireEtOrigines`

Style craft américain, l’American Amber Ale s’est imposée comme cousine plus maltée de l’American Pale Ale. Le BJCP la place dans les bières ambrées et brunes américaines, avec caramel présent et houblon américain souvent marqué.

### `recette.profilRecherche`

une amber/red américaine, sèche et houblonnée, avec caramel net, agrumes ou pin et amertume équilibrée

---

## 21. `american-brown-ale` — American Brown Ale

### `description`

L’American Brown Ale garde le brun mais ajoute l’énergie craft : chocolat, caramel, noisette, toast, houblon américain, amertume moyenne à forte et finale plus sèche. Elle doit rester Brown Ale, pas devenir porter houblonné ni Brown IPA déguisée.

### `histoireEtOrigines`

Le style vient des adaptations américaines de brown ales anglaises, réinterprétées avec plus de houblon, plus d’amertume et des malts plus affirmés. Le BJCP insiste sur le duo malt brun et houblon, avec plus de caractère que l’English Brown Ale.

### `recette.profilRecherche`

une brown ale américaine, chocolatée et houblonnée, avec caramel, noisette, amertume nette et finale sèche

---

## 22. `american-black-ale` — American Black Ale

### `description`

L’American Black Ale cherche l’ombre sans la lourdeur : robe noire, malt sombre doux, cacao, toast, parfois café léger, mais aussi houblon américain, agrumes, pin ou résine. Elle doit être noire et vive, pas porter sucré ni stout épais.

### `histoireEtOrigines`

Cette carte capture la zone américaine entre dark ale, black IPA légère et ale noire houblonnée. Comme beaucoup de styles craft hybrides, elle repose moins sur une tradition ancienne que sur l’équilibre entre couleur sombre, finale sèche et houblon moderne.

### `recette.profilRecherche`

une ale noire américaine, sèche et houblonnée, avec torréfaction douce, cacao léger et finale vive

---

## 23. `double-hoppy-red-ale` — Double Hoppy Red Ale

### `description`

La Double Hoppy Red Ale transforme la red ale en bête de houblon : caramel rouge, malt toasté, amertume haute, agrumes, pin, résine ou fruits rouges. Elle doit garder une charpente maltée, sinon ce n’est qu’une IPA rouge qui a oublié son costume.

### `histoireEtOrigines`

Ce style appartient au vocabulaire craft moderne, dans la continuité des American Amber/Red Ales plus houblonnées. Il chevauche parfois les Red IPA, mais ZythoHunt le garde ici comme red ale renforcée en houblon plutôt qu’IPA de spécialité.

### `recette.profilRecherche`

une red ale américaine très houblonnée, avec caramel sec, amertume haute et arômes résineux ou agrumés

---

## 24. `imperial-red-ale` — Imperial Red Ale

### `description`

L’Imperial Red Ale grossit la Red Ale jusqu’au format de dégustation : alcool élevé, caramel profond, malt rouge, houblon massif, fruits, pin, résine et chaleur. Elle doit rester tendue et sèche, pas sombrer dans le sirop de caramel houblonné.

### `histoireEtOrigines`

Comme beaucoup de versions “Imperial” craft, elle pousse un style existant en alcool, malt, houblon et intensité. Elle se place entre American Strong Ale, Red IPA et Amber Ale renforcée, avec la couleur rouge et le malt caramel comme colonne vertébrale.

### `recette.profilRecherche`

une red ale impériale, forte et houblonnée, avec malt rouge, caramel sec, alcool intégré et finale nette

---

## 25. `american-strong-ale` — American Strong Ale

### `description`

L’American Strong Ale est une grande ale américaine sans laisse courte : malt riche, caramel, fruits, houblon marqué, alcool, amertume et parfois bois. Elle peut frôler barley wine, double red ou strong amber, mais doit rester cohérente, pas simplement “tout plus fort”.

### `histoireEtOrigines`

Le BJCP décrit l’American Strong Ale comme une catégorie assez large pour les ales américaines fortes, maltées et houblonnées qui ne rentrent pas proprement dans d’autres cases. Elle est plus américaine par son intensité houblonnée et son amplitude que par une couleur unique.

### `recette.profilRecherche`

une ale américaine forte, maltée et houblonnée, avec alcool présent, amertume ferme et équilibre robuste

---

## 26. `american-barley-wine` — American Barley Wine

### `description`

L’American Barley Wine est le barley wine avec les bottes de combat : malt massif, alcool élevé, caramel, pain, fruits secs, mais aussi houblon frontal, agrumes, pin, résine et amertume durable. Il vieillit bien, mais jeune, il peut rugir comme une tronçonneuse fruitée.

### `histoireEtOrigines`

Le BJCP distingue l’American Barleywine par son houblonnage beaucoup plus affirmé, sa forte amertume et son caractère américain, tout en conservant la richesse alcoolique et maltée de la famille barley wine.

### `recette.profilRecherche`

un barley wine américain très fort, riche et houblonné, avec amertume haute, malt profond et alcool maîtrisé

---

## 27. `altbier` — Altbier

### `description`

L’Altbier est une ale allemande qui pense comme une lager : cuivre, malt toasté, noisette, amertume ferme, fermentation haute propre et garde froide. Elle doit être sèche, nette et élégante, avec le malt et le houblon en ligne droite, pas en bagarre de taverne.

### `histoireEtOrigines`

Originaire de Düsseldorf, l’Altbier conserve une fermentation haute “ancienne” tout en utilisant une maturation froide proche des lagers. Le BJCP la décrit comme une bière ambrée allemande, équilibrée, assez amère, propre et lagerisée.

### `recette.profilRecherche`

une ale ambrée de Düsseldorf, propre et lagerisée, avec malt toasté, amertume ferme et finale sèche

---

## Vérifications demandées à Codex

Après intégration, effectuer les vérifications suivantes :

1. Le fichier JSON est valide.
2. La collection contient toujours exactement 27 cartes.
3. Tous les IDs ci-dessus existent dans le fichier source.
4. Seuls les champs `description`, `histoireEtOrigines` et `recette.profilRecherche` ont été modifiés.
5. Aucun autre champ n’a changé.
6. Générer un diff lisible des modifications.
7. Signaler toute anomalie avant de poursuivre.
