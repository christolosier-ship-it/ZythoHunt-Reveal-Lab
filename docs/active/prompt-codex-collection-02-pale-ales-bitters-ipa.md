# Prompt Codex — Réécriture éditoriale Collection 02 : Pale Ales, Bitters et IPA

## Objectif

Intégrer dans `collection-02-pale-ales-bitters-et-ipa.json` les textes éditoriaux validés pour la collection 02.

Le fichier source contient 36 cartes dans la collection `pale-ales-bitters-et-ipa`.

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
- Après modification, vérifier que la collection contient toujours exactement 36 cartes.
- Afficher un résumé des IDs modifiés.

---

# Textes validés à intégrer

## 1. `pale-ale` — Pale Ale

### `description`

La Pale Ale est une famille de clarté et de houblon : dorée à ambrée, fermentée en ale, assez sèche pour rester vive, assez maltée pour ne pas flotter dans le vide. Selon l’école, elle peut parler biscuit anglais, agrumes américains ou fruits du Nouveau Monde.

### `histoireEtOrigines`

Le terme naît avec les malts plus pâles, quand les ales claires commencent à se distinguer des porters, milds et bières brunes. De l’Angleterre industrielle aux brasseries craft modernes, la Pale Ale devient un terrain commun : une ale accessible où le houblon prend progressivement plus de place.

### `recette.profilRecherche`

une ale claire à ambrée, sèche et lisible, où malt pâle et houblon composent une bière vive sans lourdeur

---

## 2. `bitter` — Bitter

### `description`

La Bitter est la pinte anglaise par excellence : moins spectaculaire qu’une IPA, plus nerveuse qu’une simple ale maltée. Biscuit, caramel léger, esters fruités, houblon floral ou terreux, finale sèche : son génie tient dans la nuance et la répétition du verre.

### `histoireEtOrigines`

Le mot “bitter” vient du comptoir plus que du laboratoire : les buveurs distinguaient ainsi les pale ales plus houblonnées des milds et bières moins amères. La famille s’est ensuite organisée par force, d’Ordinary à Strong Bitter, avec le cask comme théâtre naturel.

### `recette.profilRecherche`

une ale anglaise de pub, sèche et buvable, portée par l’équilibre entre biscuit, fruit discret et amertume noble

---

## 3. `ipa-india-pale-ale` — IPA / India Pale Ale

### `description`

L’IPA est devenue la grande bête houblonnée de la bière moderne : amertume, arômes floraux, résineux, agrumés, tropicaux ou épicés selon les écoles. Sa vraie colonne vertébrale n’est pas seulement “plus de houblon”, mais une finale assez sèche pour que ce houblon ne patauge pas.

### `histoireEtOrigines`

L’IPA vient des pale ales britanniques de garde et d’exportation, dont certaines ont voyagé vers l’Inde dès la fin du XVIIIe siècle. Le mythe l’a simplifiée, la scène craft l’a électrisée : aujourd’hui, IPA désigne autant une racine historique qu’un immense terrain de variations modernes.

### `recette.profilRecherche`

une ale sèche, amère et très aromatique, où le houblon domine sans devenir brûlant, végétal ou brouillon

---

## 4. `ordinary-bitter` — Ordinary Bitter

### `description`

L’Ordinary Bitter est petite en alcool mais pas en caractère : cuivre clair, biscuit, fruit léger, houblon anglais et amertume franche. Elle doit se boire à grandes gorgées sans devenir aqueuse, comme une conversation de pub qui sait rester vive.

### `histoireEtOrigines`

C’est le bas de l’échelle de force des bitters britanniques, celle qu’on commande sans cérémonial. Le style vit surtout par son service, souvent en cask, sa faible carbonatation et cette tradition anglaise de bières modestes mais pleines d’équilibre.

### `recette.profilRecherche`

une bitter légère, sèche et expressive, avec assez de malt et de houblon pour exister malgré son faible degré

---

## 5. `special-best-bitter` — Special / Best Bitter

### `description`

La Best Bitter gagne un peu d’épaule sans quitter le comptoir : malt plus présent, biscuit, caramel léger, esters fruités et amertume toujours nette. Elle reste une bière de session, mais avec la sensation d’avoir choisi la pinte du patron.

### `histoireEtOrigines`

Le terme “best” ne signifie pas nécessairement luxe, mais désigne traditionnellement une bitter plus forte ou plus soignée que l’Ordinary. C’est la zone dorée du pub anglais : assez de matière pour satisfaire, assez de sécheresse pour recommencer.

### `recette.profilRecherche`

une bitter anglaise équilibrée, plus maltée qu’une Ordinary, mais toujours sèche, amère et très buvable

---

## 6. `extra-special-bitter-esb` — Extra Special Bitter / ESB

### `description`

L’ESB est la bitter qui hausse la voix : cuivre profond, malt biscuité, toffee léger, fruit de levure, houblon floral-terreux et amertume ferme. Elle peut paraître mal nommée, car son intérêt n’est pas d’être extrême, mais d’être anglaise avec plus de coffre.

### `histoireEtOrigines`

“ESB” est historiquement associé à Fuller’s comme marque connue, puis le terme a été réutilisé plus largement, surtout hors Royaume-Uni. Dans la lecture ZythoHunt, il sert à désigner les strong bitters plus riches, plus alcoolisées et plus maltées que les bitters de session.

### `recette.profilRecherche`

une strong bitter anglaise, maltée et sèche, avec fruit discret, houblon noble et amertume ferme sans brutalité

---

## 7. `english-summer-ale` — English Summer Ale

### `description`

L’English Summer Ale est une bitter qui ouvre les fenêtres : robe claire, corps léger, houblon floral ou citronné, finale sèche et service frais. Elle garde l’esprit anglais, mais retire le manteau de malt pour viser la terrasse.

### `histoireEtOrigines`

Ces ales apparaissent comme réponses britanniques aux lagers et aux envies de bières plus claires, plus fraîches, plus estivales. Elles croisent souvent le territoire des Golden Ales : moins de caramel, plus de sécheresse, un houblon plus visible.

### `recette.profilRecherche`

une ale anglaise claire, sèche et désaltérante, avec houblon frais et malt discret plutôt que caramel de pub

---

## 8. `classic-english-pale-ale` — Classic English Pale Ale

### `description`

La Classic English Pale Ale est la cousine embouteillée et plus noble de la bitter : ambrée claire, malt biscuité, marmelade légère, houblon floral ou terreux, finale sèche. Elle porte une élégance ancienne, moins explosive que les pale ales modernes.

### `histoireEtOrigines`

Les pale ales anglaises se développent avec les malts plus pâles et les eaux minérales de régions comme Burton, capables de souligner la sécheresse et l’amertume. Avant l’explosion américaine du houblon, c’est l’une des grandes formes de l’ale claire britannique.

### `recette.profilRecherche`

une pale ale anglaise sèche et biscuitée, avec houblon noble, fruit discret et amertume bien dessinée

---

## 9. `british-golden-ale` — British Golden Ale

### `description`

La British Golden Ale est claire, sèche, houblonnée et pensée pour rafraîchir : malt très discret, couleur paille à dorée, amertume nette, houblon floral, herbacé ou citronné. Elle ressemble à une bitter qui aurait troqué son gilet brun contre une chemise d’été.

### `histoireEtOrigines`

Développée en Angleterre comme réponse aux lagers très marketées, elle s’impose dans les années 1980 avec des exemples comme Hop Back Summer Lightning. C’est une ale britannique moderne : plus claire, plus froide, plus houblonnée, mais toujours orientée buvabilité.

### `recette.profilRecherche`

une ale dorée britannique, sèche et rafraîchissante, où le houblon remplace le caramel comme centre de gravité

---

## 10. `golden-blonde-ale` — Golden / Blonde Ale

### `description`

La Golden / Blonde Ale est une porte d’entrée : claire, douce, propre, peu amère, avec un malt léger et parfois un fruit ou houblon discret. Sa difficulté est de rester simple sans devenir vide, agréable sans se dissoudre dans l’anonymat.

### `histoireEtOrigines`

La Blonde Ale moderne est surtout associée à la scène craft américaine, comme alternative rapide et accessible aux lagers standard. Elle sert souvent de bière de maison : familière pour le grand public, mais assez souple pour laisser une signature au brasseur.

### `recette.profilRecherche`

une ale blonde propre et accessible, légèrement maltée, faiblement amère, facile à boire sans être insipide

---

## 11. `australian-sparkling-ale` — Australian Sparkling Ale

### `description`

L’Australian Sparkling Ale pétille comme son nom : dorée, très carbonatée, sèche, fruitée de poire ou pomme, avec un houblon herbacé parfois métallique. Elle doit être vive, mousseuse, presque nerveuse, mais jamais plate ni lourde.

### `histoireEtOrigines`

Coopers brasse sa Sparkling Ale depuis le XIXe siècle, et le service avec levure remise en suspension fait partie du folklore. Ce style australien garde une parenté britannique, mais l’adapte au climat chaud, à la bouteille, à la carbonatation naturelle et à une fraîcheur très locale.

### `recette.profilRecherche`

une ale australienne très pétillante, sèche et fruitée, avec levure vivante, amertume nette et finale claquante

---

## 12. `classic-australian-pale-ale` — Classic Australian Pale Ale

### `description`

La Classic Australian Pale Ale est une pale ale à l’ancienne australienne : dorée, fruitée, sèche, très carbonatée, avec une levure expressive et un houblon local modéré. Elle ne cherche pas la vague tropicale moderne, mais une fraîcheur droite, presque rustique.

### `histoireEtOrigines`

Elle s’inscrit dans la continuité des ales australiennes de fermentation haute, longtemps adaptées au service en bouteille et à la chaleur. Dans ZythoHunt, elle sert à distinguer l’héritage local de la pale ale australienne moderne plus proche du langage craft international.

### `recette.profilRecherche`

une pale ale australienne classique, sèche, fruitée et pétillante, plus traditionnelle que saturée de houblon moderne

---

## 13. `australian-pale-ale` — Australian Pale Ale

### `description`

L’Australian Pale Ale moderne est plus lumineuse et plus houblonnée : fruits tropicaux, agrumes, raisin blanc ou herbes selon les variétés australiennes. Elle garde une base claire et sèche, mais laisse le houblon local envoyer des cartes postales aromatiques.

### `histoireEtOrigines`

Avec la montée de la scène craft et des houblons australiens comme Galaxy ou Vic Secret, l’Australian Pale Ale s’éloigne des profils strictement britanniques. Elle devient une pale ale de climat sec et de houblon solaire, souvent plus fruitée que résineuse.

### `recette.profilRecherche`

une pale ale australienne claire et sèche, expressive en houblons locaux, fruitée sans devenir une IPA lourde

---

## 14. `international-pale-ale` — International Pale Ale

### `description`

L’International Pale Ale est la version traduite du style : assez claire, assez houblonnée, assez sèche, mais sans accent national dominant. Elle peut emprunter à l’Angleterre, aux États-Unis ou au Nouveau Monde, tout en restant dans une zone équilibrée.

### `histoireEtOrigines`

La pale ale a circulé plus vite que ses frontières : chaque marché l’a adaptée à ses malts, ses houblons et son public. Cette carte sert à accueillir les pale ales qui ne revendiquent pas clairement une école anglaise, américaine, australienne ou néo-zélandaise.

### `recette.profilRecherche`

une pale ale internationale, nette et équilibrée, avec houblon présent mais identité régionale volontairement ouverte

---

## 15. `new-zealand-pale-ale` — New Zealand Pale Ale

### `description`

La New Zealand Pale Ale sent le fruit vert et le Pacifique : raisin blanc, groseille, citron vert, fruit de la passion, herbe fraîche ou pin léger. Elle doit rester sèche et claire, avec un houblon très expressif mais rarement lourd.

### `histoireEtOrigines`

Elle naît de la personnalité des houblons néo-zélandais modernes, capables de donner des profils très reconnaissables sans copier les agrumes américains. Cette carte met en avant une signature de terroir houblonné plus qu’une tradition ancienne de pub.

### `recette.profilRecherche`

une pale ale sèche et nerveuse, centrée sur les houblons néo-zélandais, entre fruit vert, agrume et fraîcheur végétale

---

## 16. `american-pale-ale` — American Pale Ale

### `description`

L’American Pale Ale est l’étincelle craft classique : malt pâle propre, caramel retenu, houblon Cascade ou Nouveau Monde, agrumes, pin, fleurs, finale sèche. Elle est plus équilibrée qu’une IPA, mais clairement tournée vers le houblon.

### `histoireEtOrigines`

Sierra Nevada Pale Ale, brassée pour la première fois en 1980, a largement popularisé cette lecture américaine de la pale ale. Avant l’ère des IPA géantes, l’APA était le drapeau du houblon craft : simple, claire, amère, immédiatement reconnaissable.

### `recette.profilRecherche`

une pale ale américaine claire, sèche et houblonnée, avec malt discret, agrumes, pin et amertume propre

---

## 17. `american-extra-special-bitter` — American Extra Special Bitter

### `description`

L’American ESB prend la charpente d’une strong bitter et la pousse vers les habitudes craft : malt ambré, caramel sec, houblon plus franc, finale nette. Elle garde le pub dans le rétroviseur, mais roule sur une route américaine.

### `histoireEtOrigines`

Aux États-Unis, “ESB” a souvent été réinterprété comme une ale ambrée, maltée et amère, plus robuste que les bitters anglaises. Le style révèle un malentendu fertile : une tradition britannique lue avec des houblons et attentes de brewpub américain.

### `recette.profilRecherche`

une bitter américaine ambrée, maltée et sèche, avec houblon plus marqué qu’en Angleterre mais sans devenir APA

---

## 18. `juicy-hazy-pale-ale` — Juicy / Hazy Pale Ale

### `description`

La Juicy / Hazy Pale Ale est la version plus légère du nuage houblonné : robe voilée, bouche douce, amertume arrondie, fruits tropicaux, agrumes mûrs, pêche ou mangue. Elle doit sentir le jus, pas la purée de houblon oxydée.

### `histoireEtOrigines`

Elle descend de la vague New England / Hazy IPA, mais baisse en intensité pour rester pale ale. Le style vient de la recherche de houblon aromatique massif, de céréales riches en protéines et d’une eau plus chlorurée, au service de la douceur plutôt que de la morsure.

### `recette.profilRecherche`

une pale ale voilée, juteuse et douce, très aromatique mais plus légère et moins intense qu’une Hazy IPA

---

## 19. `american-strong-pale-ale` — American Strong Pale Ale

### `description`

L’American Strong Pale Ale est une pale ale qui a forcé la porte : plus d’alcool, plus de houblon, plus d’amertume, mais pas encore la densité assumée d’une IPA forte. Elle doit rester sèche et tranchante, pas devenir une soupe de caramel et de résine.

### `histoireEtOrigines`

Cette carte capture une zone floue très américaine, entre APA musclée, IPA légère et amber claire très houblonnée. Elle reflète l’époque où les brasseurs craft ont amplifié leurs pale ales avant que les catégories IPA ne deviennent le grand tiroir à houblon.

### `recette.profilRecherche`

une pale ale américaine renforcée, sèche et très houblonnée, plus intense qu’une APA sans basculer en IPA pleine

---

## 20. `juicy-hazy-strong-pale-ale` — Juicy / Hazy Strong Pale Ale

### `description`

La Juicy / Hazy Strong Pale Ale garde la douceur du haze mais monte le volume : fruits tropicaux, bouche ronde, voile dense, alcool modéré à sensible. Elle doit rester dangereusement buvable, pas basculer dans le smoothie alcoolisé.

### `histoireEtOrigines`

Elle prolonge la logique des Hazy Pale Ales en version plus forte, dans cette zone où les brasseries craft préfèrent parfois parler de pale ale puissante plutôt que d’IPA. Le style repose sur l’arôme et la texture, mais doit garder une vraie structure de bière.

### `recette.profilRecherche`

une pale ale forte, voilée et juteuse, avec texture douce, houblon fruité massif et alcool bien caché

---

## 21. `kolsch` — Kölsch

### `description`

La Kölsch est une ale qui se comporte presque comme une lager : pâle, claire, délicate, légèrement fruitée, avec malt grainé, houblon discret et finale sèche. Sa beauté tient au murmure : trop d’arôme, et le charme casse.

### `histoireEtOrigines`

Originaire de Cologne, elle appartient à une tradition de fermentation haute suivie d’une garde froide. La Kölsch Konvention protège son nom autour de Köln, et le service en Stange de 20 cl fait partie de son théâtre local.

### `recette.profilRecherche`

une ale blonde de Cologne, très nette et délicate, fruitée à peine, sèche, fraîche et lagerisée

---

## 22. `session-ipa` — Session IPA

### `description`

La Session IPA veut garder le parfum d’une IPA avec le poids d’une bière de soif : agrumes, pin, fruits, amertume nette, mais alcool bas et corps léger. L’exercice est cruel : trop mince, elle devient thé au houblon ; trop lourde, elle rate le mot session.

### `histoireEtOrigines`

Elle apparaît avec la volonté craft de rendre l’IPA plus répétable, plus légère, plus compatible avec plusieurs verres. Le style reprend l’équilibre IPA, mais en version basse intensité alcoolique, souvent proche d’une American Pale Ale très sèche.

### `recette.profilRecherche`

une IPA légère et sèche, très aromatique pour son degré, avec amertume nette mais sans maigreur aqueuse

---

## 23. `english-ipa` — English IPA

### `description`

L’English IPA est sèche, amère, dorée à ambrée, avec houblon floral, épicé ou orangé, malt biscuité et parfois une note minérale. Elle n’a pas besoin de sentir la mangue : son charme vient de la retenue et d’une amertume qui dure.

### `histoireEtOrigines`

Issue des pale stock ales britanniques, elle a été expédiée vers l’Inde sans être l’unique bière du voyage ni une invention magique pour la colonie. Le nom “India Pale Ale” s’impose autour des années 1830, puis le style sera réinterprété bien plus tard par la scène craft.

### `recette.profilRecherche`

une IPA anglaise sèche et minérale, avec malt biscuité, houblon floral-épicé et amertume longue mais non harsh

---

## 24. `american-ipa` — American IPA

### `description`

L’American IPA est le grand coup de projecteur sur le houblon : agrumes, pin, résine, fruits tropicaux, melon ou fruits à noyau, sur un malt clair et sec. Elle doit être amère et aromatique, mais jamais râpeuse comme une poignée d’aiguilles de pin.

### `histoireEtOrigines`

Anchor Liberty Ale en 1975 est souvent citée comme point de départ moderne, avant que le style ne devienne le moteur de la craft beer américaine. L’American IPA transforme l’héritage anglais en bière plus sèche, plus claire, plus houblonnée et plus expressive.

### `recette.profilRecherche`

une IPA américaine sèche, claire et fortement houblonnée, avec amertume ferme, malt discret et arômes modernes nets

---

## 25. `new-zealand-ipa` — New Zealand IPA

### `description`

La New Zealand IPA remplace le pin américain par une salve de fruit vert : sauvignon blanc, groseille, citron vert, fruit de la passion, herbes fraîches. Elle doit rester sèche et IPA dans l’équilibre, mais porter une signature de houblons néo-zélandais évidente.

### `histoireEtOrigines`

Le style naît de la reconnaissance croissante des houblons néo-zélandais dans la scène craft mondiale. Nelson Sauvin, Motueka, Riwaka ou Nectaron ont donné aux IPA une autre géographie aromatique : moins forêt californienne, plus verger acide et vigne blanche.

### `recette.profilRecherche`

une IPA sèche et aromatique, centrée sur les houblons néo-zélandais, entre fruit vert, agrume vif et fraîcheur herbacée

---

## 26. `west-coast-ipa` — West Coast IPA

### `description`

La West Coast IPA est l’IPA au couteau : claire, sèche, amère, résineuse, citronnée, parfois tropicale mais jamais moelleuse. Elle laisse une finale nette et longue, comme si le houblon avait signé le verre au marqueur indélébile.

### `histoireEtOrigines`

Elle est moins un style séparé qu’une lecture sèche et tranchante de l’American IPA, associée à la côte Ouest américaine. Son identité s’est construite contre les versions plus rondes ou hazy : clarté, amertume, pin, agrumes et finale crisp.

### `recette.profilRecherche`

une IPA claire, très sèche et amère, avec houblon résineux-agrumé, finale longue et aucune douceur envahissante

---

## 27. `neipa-juicy-hazy-ipa` — NEIPA / Juicy-Hazy IPA

### `description`

La NEIPA est un nuage de houblon fruité : robe opaque, bouche douce, fruits tropicaux, pêche, agrumes mûrs, amertume perçue plus basse. Elle doit être juteuse et soyeuse, pas farineuse, sucrée ou boueuse.

### `histoireEtOrigines`

Née dans le Nord-Est des États-Unis, elle est associée à la vague Heady Topper puis aux années 2010. Elle inverse le vieux réflexe IPA : moins de morsure, plus d’arôme, plus de texture, plus de fraîcheur fragile.

### `recette.profilRecherche`

une IPA voilée et juteuse, massivement aromatique, douce en bouche mais encore sèche et buvable

---

## 28. `double-imperial-ipa` — Double / Imperial IPA

### `description`

La Double IPA augmente tout : houblon, alcool, amertume, arôme, intensité. Mais sa réussite dépend de ce qu’elle retire : pas trop de caramel, pas trop de lourdeur, pas de brûlure. C’est une arme lourde qui doit rester maniable.

### `histoireEtOrigines`

Innovation craft américaine des années 1990, elle devient emblématique dans les années 2000 avec des exemples comme Pliny the Elder. Elle pousse l’American IPA plus loin sans devenir barleywine : moins maltée, plus sèche, plus obsédée par le houblon.

### `recette.profilRecherche`

une IPA forte, sèche et intensément houblonnée, avec alcool intégré, amertume haute et finale non sucrée

---

## 29. `juicy-hazy-double-imperial-ipa` — Juicy-Hazy Double / Imperial IPA

### `description`

La Juicy-Hazy Double IPA est le fruit tropical sous haute tension : voile dense, bouche ronde, houblon massif, alcool élevé mais masqué. Elle doit rester une bière, pas un nectar épais ; le danger, c’est la douceur qui englue tout.

### `histoireEtOrigines`

Elle prolonge la NEIPA dans la catégorie forte, en combinant double dry-hop, céréales riches en protéines, levures expressives et alcool généreux. C’est l’une des formes les plus spectaculaires de l’IPA moderne, mais aussi l’une des plus fragiles à l’oxydation.

### `recette.profilRecherche`

une double IPA voilée, juteuse et puissante, saturée d’arômes fruités mais assez sèche pour rester buvable

---

## 30. `belgian-ipa` — Belgian IPA

### `description`

La Belgian IPA mélange deux feux : houblon d’IPA et levure belge. Agrumes, fruits tropicaux ou fleurs rencontrent poivre, clou de girofle, poire, pomme ou banane légère. Si levure et houblon se battent, le style tombe dans le carnaval de solvants.

### `histoireEtOrigines`

Style moderne du milieu des années 2000, il vient autant des brasseurs américains remplaçant leur levure d’IPA par une levure belge que de brasseries belges houblonnant davantage leurs fortes blondes. C’est une collision récente, pas une tradition monastique oubliée.

### `recette.profilRecherche`

une IPA sèche et épicée, où houblon expressif et levure belge se renforcent sans se percuter

---

## 31. `black-ipa` — Black IPA

### `description`

La Black IPA ressemble à une contradiction assumée : noire comme une stout, sèche et houblonnée comme une IPA. Le malt noir doit apporter cacao léger, toast ou café discret, jamais cendre, afin de laisser le houblon garder la main.

### `histoireEtOrigines`

Le style apparaît comme variante américaine de l’IPA, popularisée surtout dans le Pacifique Nord-Ouest et en Californie au début des années 2000. Le BJCP cite même Blackwatch IPA de Greg Noonan autour de 1990 comme l’un des jalons commerciaux.

### `recette.profilRecherche`

une IPA noire, sèche et houblonnée, avec torréfaction douce en soutien, sans caractère brûlé ni lourdeur stout

---

## 32. `brown-ipa` — Brown IPA

### `description`

La Brown IPA installe le houblon sur un plancher brun : noisette, pain grillé, caramel sec, parfois cacao doux, avec amertume et arômes d’IPA. Elle doit éviter deux pièges : devenir brown ale trop timide ou IPA boueuse trop maltée.

### `histoireEtOrigines`

Elle fait partie des Specialty IPA reconnues comme variantes du principe IPA : un équilibre houblonné et sec, modifié par un caractère malté brun. C’est un style craft de frontière, né du plaisir américain de croiser les familles plutôt que de les ranger sagement.

### `recette.profilRecherche`

une IPA brune, sèche et houblonnée, avec noisette et pain grillé en soutien plutôt qu’un caramel lourd

---

## 33. `red-ipa` — Red IPA

### `description`

La Red IPA marie houblon vif et malt rouge : caramel sec, croûte, légère résine, agrumes, fruits rouges ou pin selon les houblons. Elle doit rester sèche malgré la couleur, sinon elle glisse vers l’amber ale trop sucrée.

### `histoireEtOrigines`

Comme Black, Brown ou Rye IPA, la Red IPA appartient aux variantes craft construites sur l’équilibre IPA avec une modification dominante. Ici, la couleur et le malt rouge apportent chaleur visuelle et soutien, sans annuler le caractère houblonné.

### `recette.profilRecherche`

une IPA rouge, sèche et amère, avec malt caramelisé retenu, houblon expressif et finale nette

---

## 34. `rye-ipa` — Rye IPA

### `description`

La Rye IPA ajoute du seigle au moteur houblonné : sécheresse, poivre, grain nerveux, parfois une texture plus vive. Le seigle doit tendre la bière, pas l’épaissir ; il donne une colonne épicée aux agrumes, au pin ou aux fruits du houblon.

### `histoireEtOrigines`

Le style vient de la même logique Specialty IPA : garder l’ossature d’une IPA et y introduire un ingrédient qui change la sensation. Le seigle a séduit les brasseurs craft parce qu’il accentue la sécheresse et donne un mordant naturel à l’amertume.

### `recette.profilRecherche`

une IPA sèche et poivrée, où le seigle renforce la tension du houblon sans devenir rugueux

---

## 35. `white-ipa` — White IPA

### `description`

La White IPA croise IPA et witbier : robe pâle voilée, blé, agrumes, coriandre possible, levure belge, houblon fruité et finale sèche. Elle doit être rafraîchissante et épicée, pas une IPA trouble avec parfum d’assiette d’orange.

### `histoireEtOrigines`

Ce style craft américain est né comme pont saisonnier entre les amateurs de witbier et d’IPA. Le BJCP le décrit comme une IPA américaine plus claire et légère, marquée par les levures ou épices typiques d’une witbier.

### `recette.profilRecherche`

une IPA blanche, sèche et épicée, avec blé, agrumes, houblon fruité et fraîcheur de witbier

---

## 36. `brut-ipa` — Brut IPA

### `description`

La Brut IPA cherche le champagne du houblon : très sèche, très claire, très pétillante, arômes modernes, amertume souvent plus basse qu’attendu. L’enzyme peut manger les sucres, mais elle ne doit pas manger l’âme : sans finesse, le style devient IPA déshydratée.

### `histoireEtOrigines`

Née à San Francisco à la fin des années 2010, la Brut IPA a utilisé l’amylase pour pousser l’atténuation très loin et obtenir une finale presque brut. Le phénomène a été bref mais marquant : une réaction nette à la rondeur des NEIPA.

### `recette.profilRecherche`

une IPA extrêmement sèche, pétillante et aromatique, avec finale brut, houblon net et presque aucune rondeur sucrée

---

## Vérifications demandées à Codex

Après intégration, effectuer les vérifications suivantes :

1. Le fichier JSON est valide.
2. La collection contient toujours exactement 36 cartes.
3. Tous les IDs ci-dessus existent dans le fichier source.
4. Seuls les champs `description`, `histoireEtOrigines` et `recette.profilRecherche` ont été modifiés.
5. Aucun autre champ n’a changé.
6. Générer un diff lisible des modifications.
7. Signaler toute anomalie avant de poursuivre.
