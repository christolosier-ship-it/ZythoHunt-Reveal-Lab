# ZythoHunt — Taxonomie des cartes

> **Fichier de référence :** `Taxonomie.md`  
> **Version :** 1.0.0  
> **Date de consolidation :** 16 juin 2026  
> **Statut :** socle V1 validé pour la conception fonctionnelle et la future intégration dans ZythoHunt.

## 1. Objet du document

Ce document fige les **neuf collections de cartes** de la V1 de ZythoHunt et leur contenu de référence.

La taxonomie sert deux usages simultanés :

1. permettre à l’utilisateur de saisir le terme réellement lu sur une étiquette et de révéler la carte correspondante ;
2. organiser les cartes dans une structure brassicole cohérente, capable d’accepter plusieurs profondeurs : famille, style, sous-style, variante ou catégorie transversale.

Les neuf collections sont une **construction éditoriale propre à ZythoHunt**. Les référentiels BJCP, Brewers Association et World Beer Cup servent à confirmer l’existence et la stabilité des appellations, mais leurs catégories ont d’abord été conçues pour l’évaluation en concours. Elles ne doivent donc pas être copiées comme une hiérarchie universelle.

## 2. Principes structurants

- **Une carte peut représenter n’importe quel niveau pertinent.** Une famille générique comme `Stout`, un style comme `Imperial Stout` et un sous-style comme `American Imperial Stout` peuvent tous posséder leur propre carte.
- **La profondeur est variable.** Certaines branches ne comportent qu’un niveau ; d’autres peuvent en comporter quatre ou davantage.
- **Le terme lu sur l’étiquette fait foi.** Une bouteille marquée `Stout` révèle `Stout`. Une bouteille marquée `Imperial Stout` révèle `Imperial Stout`.
- **Une révélation n’ouvre pas automatiquement les cartes parentes.** Les cartes parentes conservent leur propre découverte.
- **Une carte possède une seule collection d’exposition principale.** Elle peut néanmoins avoir des parents, enfants, alias et relations dans d’autres collections.
- **Les alias ne créent pas automatiquement de nouvelles cartes.** `DIPA` renvoie par exemple vers la carte `Double / Imperial IPA`.
- **Les appellations commerciales sont séparées des styles.** `Blonde`, `Triple`, `Bière d’abbaye` ou `Trappiste` sont légitimes dans ZythoHunt, mais ne sont pas présentées comme des styles techniques équivalents à `Märzen` ou `Tripel`.
- **Les catégories fourre-tout sont exclues.** Les entrées telles que `Experimental Beer`, `Other Beer` ou `Specialty Beer` ne deviennent pas des cartes autonomes.

## 3. Légende des natures de cartes

| Code | Nature |
|---|---|
| `F` | famille ou niveau taxonomique générique |
| `S` | style reconnu |
| `SS` | sous-style ou variante reconnue |
| `T` | catégorie transversale reconnue |
| `A` | appellation commerciale ou d’usage |
| `R` | dénomination, mention ou certification encadrée |

## 4. Synthèse des collections

| N° | Collection | Nombre de cartes |
|---:|---|---:|
| 1 | Lagers et fermentations basses | 45 |
| 2 | Pale Ales, Bitters et IPA | 36 |
| 3 | Porters et Stouts | 22 |
| 4 | Traditions belges et françaises | 17 |
| 5 | Bières de blé et de seigle | 13 |
| 6 | Bières acides, sauvages et spontanées | 21 |
| 7 | Ales ambrées, brunes, maltées et fortes | 27 |
| 8 | Styles singuliers, historiques et hybrides | 40 |
| 9 | Appellations commerciales | 30 |
|  | **Total du socle V1** | **251** |

---

# Collection 1 — Lagers et fermentations basses

**45 cartes**

- **Lager** — `F` ; racine ou carte autonome.
- **Pilsner** — `F` ; parent principal : **Lager** ; alias : `Pils`.
- **Hoppy Lager** — `F` ; parent principal : **Lager**.
- **Bock** — `F` ; parent principal : **Lager**.
- **International Light Lager** — `S` ; parent principal : **Lager**.
- **German Leichtbier** — `S` ; parent principal : **Lager**.
- **American Light Lager** — `S` ; parent principal : **Lager**.
- **Contemporary American Light Lager** — `S` ; parent principal : **Lager**.
- **Mexican Light Lager** — `S` ; parent principal : **Lager**.
- **International Pale Lager** — `S` ; parent principal : **Lager**.
- **International Pilsner** — `S` ; parent principal : **Pilsner**.
- **German Pilsner** — `S` ; parent principal : **Pilsner** ; alias : `German Pils`.
- **Italian Pilsner** — `S` ; parent principal : **Pilsner**.
- **Czech Pale Lager** — `S` ; parent principal : **Lager**.
- **Czech Premium Pale Lager** — `S` ; parent principal : **Pilsner** ; alias : `Bohemian Pilsner`, `Czech Pilsner`.
- **American Pilsner** — `S` ; parent principal : **Pilsner**.
- **Contemporary American Pilsner** — `S` ; parent principal : **Pilsner**.
- **West Coast Pilsner** — `SS` ; parent principal : **Pilsner**.
- **Rice Lager** — `S` ; parent principal : **Lager**.
- **India Pale Lager** — `S` ; parent principal : **Hoppy Lager** ; alias : `IPL`.
- **Munich Helles** — `S` ; parent principal : **Lager** ; alias : `Helles`.
- **Dortmunder / European Export** — `S` ; parent principal : **Lager** ; alias : `Dortmunder Export`, `Helles Exportbier`.
- **Festbier / German Oktoberfest** — `S` ; parent principal : **Lager** ; alias : `Festbier`.
- **Vienna Lager** — `S` ; parent principal : **Lager**.
- **Märzen** — `S` ; parent principal : **Lager** ; alias : `Maerzen`.
- **Franconian Rotbier** — `S` ; parent principal : **Lager** ; alias : `Rotbier`.
- **International Amber Lager** — `S` ; parent principal : **Lager**.
- **Czech Amber Lager** — `S` ; parent principal : **Lager**.
- **American Amber Lager** — `S` ; parent principal : **Lager**.
- **American Märzen / Oktoberfest** — `S` ; parent principal : **Lager** ; alias : `American Oktoberfest`.
- **Mexican Amber Lager** — `S` ; parent principal : **Lager**.
- **Munich Dunkel** — `S` ; parent principal : **Lager** ; alias : `Dunkel`.
- **Schwarzbier** — `S` ; parent principal : **Lager**.
- **International Dark Lager** — `S` ; parent principal : **Lager**.
- **European Dark Lager** — `S` ; parent principal : **Lager**.
- **Czech Dark Lager** — `S` ; parent principal : **Lager**.
- **American Dark Lager** — `S` ; parent principal : **Lager**.
- **Mexican Dark Lager** — `S` ; parent principal : **Lager**.
- **Traditional Bock / Dunkles Bock** — `S` ; parent principal : **Bock** ; alias : `Traditional Bock`, `Dunkles Bock`.
- **Helles Bock / Maibock** — `S` ; parent principal : **Bock** ; alias : `Helles Bock`, `Maibock`.
- **Doppelbock** — `S` ; parent principal : **Bock**.
- **Eisbock** — `S` ; parent principal : **Bock**.
- **American Lager** — `S` ; parent principal : **Lager**.
- **Contemporary American Lager** — `S` ; parent principal : **Lager**.
- **Mexican Pale Lager** — `S` ; parent principal : **Lager**.

---

# Collection 2 — Pale Ales, Bitters et IPA

**36 cartes**

- **Pale Ale** — `F` ; parent principal : **Ale**.
- **Bitter** — `F` ; parent principal : **Pale Ale**.
- **IPA / India Pale Ale** — `F` ; parent principal : **Pale Ale** ; alias : `IPA`, `India Pale Ale`.
- **Ordinary Bitter** — `S` ; parent principal : **Bitter**.
- **Special / Best Bitter** — `S` ; parent principal : **Bitter** ; alias : `Special Bitter`, `Best Bitter`.
- **Extra Special Bitter / ESB** — `S` ; parent principal : **Bitter** ; alias : `ESB`.
- **English Summer Ale** — `S` ; parent principal : **Pale Ale**.
- **Classic English Pale Ale** — `S` ; parent principal : **Pale Ale** ; alias : `English Pale Ale`.
- **British Golden Ale** — `S` ; parent principal : **Pale Ale**.
- **Golden / Blonde Ale** — `S` ; parent principal : **Pale Ale** ; alias : `Golden Ale`, `Blonde Ale`.
- **Australian Sparkling Ale** — `S` ; parent principal : **Pale Ale**.
- **Classic Australian Pale Ale** — `S` ; parent principal : **Pale Ale**.
- **Australian Pale Ale** — `S` ; parent principal : **Pale Ale**.
- **International Pale Ale** — `S` ; parent principal : **Pale Ale**.
- **New Zealand Pale Ale** — `S` ; parent principal : **Pale Ale**.
- **American Pale Ale** — `S` ; parent principal : **Pale Ale** ; alias : `APA`.
- **American Extra Special Bitter** — `S` ; parent principal : **Bitter**.
- **Juicy / Hazy Pale Ale** — `S` ; parent principal : **Pale Ale** ; alias : `Hazy Pale Ale`, `Juicy Pale Ale`.
- **American Strong Pale Ale** — `S` ; parent principal : **Pale Ale**.
- **Juicy / Hazy Strong Pale Ale** — `S` ; parent principal : **Pale Ale**.
- **Kölsch** — `S` ; parent principal : **Ale** ; alias : `Koelsch`.
- **Session IPA** — `S` ; parent principal : **IPA / India Pale Ale**.
- **English IPA** — `S` ; parent principal : **IPA / India Pale Ale**.
- **American IPA** — `S` ; parent principal : **IPA / India Pale Ale**.
- **New Zealand IPA** — `S` ; parent principal : **IPA / India Pale Ale**.
- **West Coast IPA** — `SS` ; parent principal : **American IPA**.
- **NEIPA / Juicy-Hazy IPA** — `SS` ; parent principal : **American IPA** ; alias : `NEIPA`, `New England IPA`, `Juicy IPA`, `Hazy IPA`.
- **Double / Imperial IPA** — `S` ; parent principal : **IPA / India Pale Ale** ; alias : `Double IPA`, `DIPA`, `Imperial IPA`.
- **Juicy-Hazy Double / Imperial IPA** — `SS` ; parent principal : **Double / Imperial IPA** ; alias : `Hazy Double IPA`, `Juicy Double IPA`.
- **Belgian IPA** — `S` ; parent principal : **IPA / India Pale Ale**.
- **Black IPA** — `S` ; parent principal : **IPA / India Pale Ale** ; alias : `Cascadian Dark Ale`.
- **Brown IPA** — `S` ; parent principal : **IPA / India Pale Ale**.
- **Red IPA** — `S` ; parent principal : **IPA / India Pale Ale**.
- **Rye IPA** — `S` ; parent principal : **IPA / India Pale Ale**.
- **White IPA** — `S` ; parent principal : **IPA / India Pale Ale**.
- **Brut IPA** — `S` ; parent principal : **IPA / India Pale Ale**.

---

# Collection 3 — Porters et Stouts

**22 cartes**

- **Porter** — `F` ; racine ou carte autonome.
- **Stout** — `F` ; racine ou carte autonome.
- **English Porter** — `S` ; parent principal : **Porter**.
- **Brown Porter** — `S` ; parent principal : **Porter**.
- **Robust Porter** — `S` ; parent principal : **Porter**.
- **American Porter** — `S` ; parent principal : **Porter**.
- **Pre-Prohibition Porter** — `S` ; parent principal : **Porter**.
- **Baltic Porter** — `S` ; parent principal : **Porter**.
- **American Imperial Porter** — `S` ; parent principal : **Porter**.
- **Smoke Porter** — `S` ; parent principal : **Porter** ; alias : `Smoked Porter`.
- **Dry Stout / Irish Dry Stout** — `S` ; parent principal : **Stout** ; alias : `Dry Stout`, `Irish Dry Stout`.
- **Irish Extra Stout** — `S` ; parent principal : **Stout**.
- **Export Stout / Foreign Extra Stout** — `S` ; parent principal : **Stout** ; alias : `Export Stout`, `Foreign Extra Stout`.
- **Tropical Stout** — `S` ; parent principal : **Stout**.
- **Sweet / Milk / Cream Stout** — `S` ; parent principal : **Stout** ; alias : `Sweet Stout`, `Milk Stout`, `Cream Stout`.
- **Oatmeal Stout** — `S` ; parent principal : **Stout**.
- **American Stout** — `S` ; parent principal : **Stout**.
- **Imperial Stout** — `S` ; parent principal : **Stout** ; alias : `Russian Imperial Stout`.
- **British Imperial Stout** — `SS` ; parent principal : **Imperial Stout** ; alias : `British-Style Imperial Stout`.
- **American Imperial Stout** — `SS` ; parent principal : **Imperial Stout** ; alias : `American-Style Imperial Stout`.
- **Dessert / Pastry Beer** — `T` ; racine ou carte autonome ; alias : `Dessert Beer`, `Pastry Beer`.
- **Coffee Stout or Porter** — `T` ; racine ou carte autonome ; alias : `Coffee Stout`, `Coffee Porter`.

---

# Collection 4 — Traditions belges et françaises

**17 cartes**

- **Belgian Ale / Ale belge** — `F` ; parent principal : **Ale** ; alias : `Belgian Ale`, `Ale belge`.
- **Belgian Table Beer** — `S` ; parent principal : **Belgian Ale / Ale belge**.
- **Belgian Session Ale** — `S` ; parent principal : **Belgian Ale / Ale belge**.
- **Belgian Single** — `S` ; parent principal : **Belgian Ale / Ale belge** ; alias : `Trappist Single`.
- **Belgian Pale Ale** — `S` ; parent principal : **Belgian Ale / Ale belge**.
- **Spéciale Belge** — `S` ; parent principal : **Belgian Ale / Ale belge**.
- **Belgian Blonde Ale** — `S` ; parent principal : **Belgian Ale / Ale belge**.
- **Belgian Golden Strong Ale / Belgian Strong Blonde Ale** — `S` ; parent principal : **Belgian Ale / Ale belge** ; alias : `Belgian Golden Strong Ale`, `Belgian Strong Blonde Ale`.
- **Belgian Dark Strong Ale** — `S` ; parent principal : **Belgian Ale / Ale belge**.
- **Dubbel** — `S` ; parent principal : **Belgian Ale / Ale belge**.
- **Tripel** — `S` ; parent principal : **Belgian Ale / Ale belge**.
- **Quadrupel** — `S` ; parent principal : **Belgian Ale / Ale belge** ; alias : `Quadrupel Ale`.
- **Saison** — `S` ; parent principal : **Belgian Ale / Ale belge**.
- **Specialty Saison** — `SS` ; parent principal : **Saison**.
- **Bière de Garde — style franco-belge** — `S` ; parent principal : **Belgian Ale / Ale belge** ; alias : `Bière de Garde`.
- **American-Belgo Ale** — `S` ; parent principal : **Belgian Ale / Ale belge**.
- **Belgian Fruit Beer** — `S` ; parent principal : **Belgian Ale / Ale belge**.

---

# Collection 5 — Bières de blé et de seigle

**13 cartes**

- **Bière de blé / Wheat Beer** — `F` ; parent principal : **Ale** ; alias : `Wheat Beer`, `Bière de blé`.
- **Bière de seigle / Rye Beer** — `F` ; parent principal : **Ale** ; alias : `Rye Beer`, `Bière de seigle`.
- **American Wheat Beer** — `S` ; parent principal : **Bière de blé / Wheat Beer**.
- **Witbier** — `S` ; parent principal : **Bière de blé / Wheat Beer** ; alias : `Belgian White`.
- **Weissbier / Hefeweizen** — `S` ; parent principal : **Bière de blé / Wheat Beer** ; alias : `Weissbier`, `Hefeweizen`, `Weizenbier`.
- **Kristallweizen** — `SS` ; parent principal : **Weissbier / Hefeweizen**.
- **Leichtes Weizen** — `SS` ; parent principal : **Weissbier / Hefeweizen**.
- **Bernsteinfarbenes Weizen** — `SS` ; parent principal : **Weissbier / Hefeweizen**.
- **Dunkelweizen** — `SS` ; parent principal : **Weissbier / Hefeweizen**.
- **Weizenbock** — `SS` ; parent principal : **Weissbier / Hefeweizen**.
- **Fruit Wheat Beer** — `S` ; parent principal : **Bière de blé / Wheat Beer**.
- **Wheatwine** — `S` ; parent principal : **Bière de blé / Wheat Beer** ; alias : `Wheat Wine`.
- **Roggenbier / German Rye Ale** — `S` ; parent principal : **Bière de seigle / Rye Beer** ; alias : `Roggenbier`, `German Rye Ale`.

---

# Collection 6 — Bières acides, sauvages et spontanées

**21 cartes**

- **Bière acide / Sour Beer** — `F` ; racine ou carte autonome ; alias : `Sour`, `Sour Beer`, `Bière acide`.
- **American Wild Ale** — `F` ; parent principal : **Bière acide / Sour Beer**.
- **Wild Beer** — `F` ; parent principal : **Bière acide / Sour Beer**.
- **Bière de fermentation spontanée / Spontaneous Sour Ale** — `F` ; parent principal : **Bière acide / Sour Beer** ; alias : `Spontaneous Sour Ale`.
- **Berliner Weisse** — `S` ; parent principal : **Bière acide / Sour Beer** ; alias : `Berliner-style Weisse`.
- **Specialty Berliner Weisse** — `SS` ; parent principal : **Berliner Weisse**.
- **Gose** — `S` ; parent principal : **Bière acide / Sour Beer**.
- **Leipzig Gose** — `S` ; parent principal : **Gose** ; alias : `Leipziger Gose`.
- **Contemporary Gose** — `S` ; parent principal : **Gose**.
- **Flanders Red Ale** — `S` ; parent principal : **Bière acide / Sour Beer**.
- **Oud Bruin** — `S` ; parent principal : **Bière acide / Sour Beer** ; alias : `Flanders Brown Ale`.
- **Lambic** — `S` ; parent principal : **Bière de fermentation spontanée / Spontaneous Sour Ale**.
- **Gueuze** — `S` ; parent principal : **Lambic** ; alias : `Geuze`.
- **Fruit Lambic** — `S` ; parent principal : **Lambic** ; alias : `Kriek`, `Framboise`, `Cassis`, `Pêche`.
- **American Sour Ale** — `S` ; parent principal : **American Wild Ale**.
- **Fruited American Sour Ale** — `SS` ; parent principal : **American Sour Ale**.
- **Brett Beer** — `S` ; parent principal : **Wild Beer**.
- **Mixed-Culture Brett Beer** — `SS` ; parent principal : **Brett Beer**.
- **Contemporary Belgian-Style Spontaneously Fermented Ale** — `S` ; parent principal : **Bière de fermentation spontanée / Spontaneous Sour Ale**.
- **Wood- and Barrel-Aged Sour Beer** — `S` ; parent principal : **Bière acide / Sour Beer** ; alias : `Barrel-Aged Sour Beer`, `Wood-Aged Sour Beer`.
- **Fruited Wood- and Barrel-Aged Sour Beer** — `SS` ; parent principal : **Wood- and Barrel-Aged Sour Beer**.

---

# Collection 7 — Ales ambrées, brunes, maltées et fortes

**27 cartes**

- **Ale** — `F` ; racine ou carte autonome.
- **Mild Ale** — `F` ; parent principal : **Ale**.
- **Brown Ale** — `F` ; parent principal : **Ale**.
- **Amber Ale** — `F` ; parent principal : **Ale**.
- **Red Ale** — `F` ; parent principal : **Ale**.
- **Strong Ale** — `F` ; parent principal : **Ale**.
- **Barley Wine** — `F` ; parent principal : **Strong Ale** ; alias : `Barleywine`.
- **English Pale Mild Ale** — `S` ; parent principal : **Mild Ale**.
- **English Dark Mild Ale** — `S` ; parent principal : **Mild Ale**.
- **English Brown Ale** — `S` ; parent principal : **Brown Ale**.
- **London Brown Ale** — `S` ; parent principal : **Brown Ale**.
- **Irish Red Ale** — `S` ; parent principal : **Red Ale**.
- **Old Ale** — `S` ; parent principal : **Strong Ale**.
- **British Barley Wine** — `S` ; parent principal : **Barley Wine** ; alias : `English Barleywine`.
- **Scottish Light Ale** — `S` ; parent principal : **Ale**.
- **Scottish Heavy Ale** — `S` ; parent principal : **Ale**.
- **Scottish Export Ale** — `S` ; parent principal : **Ale**.
- **Scotch Ale / Wee Heavy** — `S` ; parent principal : **Strong Ale** ; alias : `Scotch Ale`, `Wee Heavy`.
- **Peated Scotch Ale** — `SS` ; parent principal : **Scotch Ale / Wee Heavy**.
- **American Amber / Red Ale** — `S` ; parent principal : **Amber Ale** ; alias : `American Amber Ale`, `American Red Ale`.
- **American Brown Ale** — `S` ; parent principal : **Brown Ale**.
- **American Black Ale** — `S` ; parent principal : **Ale**.
- **Double Hoppy Red Ale** — `SS` ; parent principal : **Red Ale**.
- **Imperial Red Ale** — `S` ; parent principal : **Red Ale**.
- **American Strong Ale** — `S` ; parent principal : **Strong Ale**.
- **American Barley Wine** — `S` ; parent principal : **Barley Wine** ; alias : `American Barleywine`.
- **Altbier** — `S` ; parent principal : **Ale** ; alias : `Alt`.

---

# Collection 8 — Styles singuliers, historiques et hybrides

**40 cartes**

- **Cream Ale** — `S` ; parent principal : **Ale**.
- **California Common / Steam Beer** — `S` ; racine ou carte autonome ; alias : `California Common`, `Steam Beer`.
- **Kentucky Common** — `S` ; racine ou carte autonome.
- **American Malt Liquor** — `S` ; racine ou carte autonome ; alias : `Malt Liquor`.
- **Pre-Prohibition Lager** — `S` ; parent principal : **Lager**.
- **Kellerbier / Zwickelbier** — `S` ; parent principal : **Lager** ; alias : `Kellerbier`, `Zwickelbier`.
- **Grodziskie / Piwo Grodziskie** — `S` ; racine ou carte autonome ; alias : `Grodziskie`, `Piwo Grodziskie`.
- **Lichtenhainer** — `S` ; racine ou carte autonome.
- **Adambier** — `S` ; racine ou carte autonome.
- **Dutch Kuyt / Kuit** — `S` ; racine ou carte autonome ; alias : `Kuyt`, `Kuit`.
- **Sahti** — `S` ; racine ou carte autonome.
- **Gotlandsdricke** — `S` ; racine ou carte autonome.
- **Breslau Schoeps** — `S` ; racine ou carte autonome.
- **Grape Ale / Italian Grape Ale** — `S` ; racine ou carte autonome ; alias : `Grape Ale`, `Italian Grape Ale`, `IGA`.
- **Fruit Beer** — `T` ; racine ou carte autonome.
- **Field Beer** — `T` ; racine ou carte autonome.
- **Pumpkin / Squash / Pumpkin Spice Beer** — `T` ; racine ou carte autonome ; alias : `Pumpkin Beer`, `Squash Beer`, `Pumpkin Spice Beer`.
- **Chili Beer** — `T` ; racine ou carte autonome.
- **Herb and Spice Beer** — `T` ; racine ou carte autonome ; alias : `Herb Beer`, `Spice Beer`.
- **Tea Beer** — `T` ; racine ou carte autonome.
- **Green Tea Beer** — `SS` ; parent principal : **Tea Beer**.
- **Chocolate Beer** — `T` ; racine ou carte autonome.
- **Coffee Beer** — `T` ; racine ou carte autonome.
- **Honey Beer** — `T` ; racine ou carte autonome.
- **Alternative Grain Beer** — `T` ; racine ou carte autonome.
- **Alternative Sugar Beer** — `T` ; racine ou carte autonome.
- **Autumn Seasonal Beer** — `T` ; racine ou carte autonome.
- **Winter Seasonal Beer** — `T` ; racine ou carte autonome.
- **Ginjo Beer / Sake-Yeast Beer** — `S` ; racine ou carte autonome ; alias : `Ginjo Beer`, `Sake-Yeast Beer`.
- **Fresh Hop Beer** — `T` ; racine ou carte autonome ; alias : `Wet Hop Beer`.
- **Wood- and Barrel-Aged Beer** — `T` ; racine ou carte autonome ; alias : `Wood-Aged Beer`, `Barrel-Aged Beer`.
- **Wood- and Barrel-Aged Strong Beer** — `SS` ; parent principal : **Wood- and Barrel-Aged Beer**.
- **Wood- and Barrel-Aged Strong Stout** — `SS` ; parent principal : **Wood- and Barrel-Aged Beer**.
- **Wood- and Barrel-Aged Dessert / Pastry Beer** — `SS` ; parent principal : **Wood- and Barrel-Aged Beer**.
- **Aged Beer** — `T` ; racine ou carte autonome.
- **Rauchbier / Smoke Beer** — `F` ; racine ou carte autonome ; alias : `Rauchbier`, `Smoke Beer`, `Smoked Beer`.
- **Weiss Rauchbier** — `SS` ; parent principal : **Rauchbier / Smoke Beer**.
- **Helles Rauchbier** — `SS` ; parent principal : **Rauchbier / Smoke Beer**.
- **Märzen Rauchbier** — `SS` ; parent principal : **Rauchbier / Smoke Beer**.
- **Bock Rauchbier** — `SS` ; parent principal : **Rauchbier / Smoke Beer**.

---

# Collection 9 — Appellations commerciales

**30 cartes**

- **Blonde** — `A` ; racine ou carte autonome.
- **Blanche** — `A` ; racine ou carte autonome.
- **Ambrée** — `A` ; racine ou carte autonome.
- **Rousse** — `A` ; racine ou carte autonome.
- **Brune** — `A` ; racine ou carte autonome.
- **Noire** — `A` ; racine ou carte autonome.
- **Rouge** — `A` ; racine ou carte autonome.
- **Bière d’abbaye** — `A` ; racine ou carte autonome ; alias : `Abbey Beer`.
- **Trappiste** — `R` ; racine ou carte autonome ; alias : `Trappist`.
- **Bière artisanale / Craft Beer** — `A` ; racine ou carte autonome ; alias : `Bière artisanale`, `Craft Beer`.
- **Bière biologique / Bio** — `R` ; racine ou carte autonome ; alias : `Bière bio`, `Organic Beer`.
- **Bière spéciale** — `A` ; racine ou carte autonome.
- **Bière de Noël** — `A` ; racine ou carte autonome ; alias : `Christmas Beer`.
- **Bière de printemps / Bière de mars** — `A` ; racine ou carte autonome ; alias : `Bière de printemps`, `Bière de mars`, `Spring Beer`.
- **Bière forte / Strong Beer** — `A` ; racine ou carte autonome ; alias : `Bière forte`, `Strong Beer`.
- **Bière légère / Light Beer** — `A` ; racine ou carte autonome ; alias : `Bière légère`, `Light Beer`.
- **Session Beer** — `A` ; racine ou carte autonome.
- **Double** — `A` ; racine ou carte autonome.
- **Triple** — `A` ; racine ou carte autonome.
- **Quadruple** — `A` ; racine ou carte autonome.
- **Bière sans alcool** — `R` ; racine ou carte autonome ; alias : `Alcohol-Free Beer`, `Non-Alcoholic Beer`.
- **0,0 %** — `A` ; racine ou carte autonome ; alias : `0.0%`.
- **Bière sans gluten** — `R` ; racine ou carte autonome ; alias : `Gluten-Free Beer`.
- **Pur malt** — `R` ; racine ou carte autonome ; alias : `All Malt`.
- **Bière à…** — `R` ; racine ou carte autonome.
- **Bière aromatisée à…** — `R` ; racine ou carte autonome.
- **Bière de fermentation lactique** — `R` ; racine ou carte autonome.
- **Bière de garde — mention légale française** — `R` ; racine ou carte autonome ; alias : `Bière de garde`.
- **Panaché** — `R` ; racine ou carte autonome.
- **Radler / Shandy** — `A` ; racine ou carte autonome ; alias : `Radler`, `Shandy`.

---

# 5. Cas de distinction obligatoires

## 5.1 Stout et Imperial Stout

- `Stout` est une **carte de famille**.
- `Imperial Stout` est une **carte distincte**, reconnue comme style plus précis.
- `British Imperial Stout` et `American Imperial Stout` sont des descendants plus spécialisés.

Branche de référence :

```text
Stout
└── Imperial Stout
    ├── British Imperial Stout
    └── American Imperial Stout
```

## 5.2 Sour

`Sour`, `Sour Beer` et `Bière acide` sont les alias d’une même carte générique. Les styles plus précis restent des cartes distinctes : `Berliner Weisse`, `Gose`, `Lambic`, `Gueuze`, `Flanders Red Ale`, etc.

## 5.3 Bière de Garde

ZythoHunt conserve deux cartes différentes :

- `Bière de Garde — style franco-belge`, dans la collection 4 ;
- `Bière de garde — mention légale française`, dans la collection 9.

La première décrit une identité brassicole. La seconde décrit la mention française réservée aux bières ayant subi au moins 21 jours de garde après la fermentation primaire.

## 5.4 Triple et Tripel

- `Triple` appartient aux appellations commerciales ou d’usage.
- `Tripel` appartient aux styles belges reconnus.

Une étiquette portant seulement `Triple` ne doit pas être automatiquement reclassée en `Tripel`.

## 5.5 Blonde et Belgian Blonde Ale

- `Blonde` est une appellation commerciale liée principalement à la couleur et au positionnement du produit.
- `Belgian Blonde Ale` est un style brassicole défini.

Les deux cartes restent indépendantes.

# 6. Règles de révélation

1. La recherche accepte le nom principal et tous les alias de la carte.
2. L’application propose les correspondances exactes avant les correspondances approchées.
3. Lorsqu’un terme peut désigner plusieurs cartes, l’utilisateur choisit le libellé réellement présent sur l’étiquette.
4. Une bière peut être associée à plusieurs cartes si plusieurs termes explicites figurent sur son étiquette, mais chaque révélation reste individuelle.
5. Aucun classement plus précis ne doit être inventé à partir du seul aspect de la bière ou d’une supposition de l’application.

# 7. Exclusions du socle V1

Ne deviennent pas des cartes autonomes :

- `Experimental Beer` ;
- `Experimental IPA` ;
- `Specialty Beer` pris comme catégorie générique ;
- `Other Strong Beer` ;
- `Other Hoppy Lager` ;
- `Other Smoke Beer` ;
- `Other Belgian Specialty Ale` ;
- `Other Abbey Ale` ;
- `Premium`, `Réserve`, `Édition limitée`, `Bière de caractère`, `Bière de dégustation` et autres adjectifs promotionnels non stabilisés ;
- les variantes ponctuelles inventées par une seule brasserie sans reconnaissance durable dans les référentiels ou dans l’usage commercial.

# 8. Sources de référence

Les appellations du présent socle ont été consolidées à partir des sources suivantes :

- **Brewers Association — 2026 Beer Style Guidelines**  
  https://www.brewersassociation.org/edu/brewers-association-beer-style-guidelines/
- **World Beer Cup — 2026 Beverage Styles**  
  https://www.worldbeercup.org/compete/beer-styles/
- **Beer Judge Certification Program — 2021 Beer Style Guidelines**  
  https://www.bjcp.org/style/2021/beer/
- **BJCP — Introduction to the 2021 Guidelines**  
  https://www.bjcp.org/beer-styles/introduction-to-the-2021-guidelines/
- **Légifrance — Décret n° 92-307 du 31 mars 1992 relatif aux bières**  
  https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000357138
- **DGCCRF — Tout savoir sur l’étiquetage des bières**  
  https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/tout-savoir-sur-letiquetage-des-bieres
- **Association internationale trappiste — FAQ**  
  https://www.trappist.be/en/faqs/
- **Brasseurs de France — Les types de bière**  
  https://brasseurs-de-france.com/tout-savoir-sur-la-biere/les-types-de-biere/
- **Brasseurs de France — Bières saisonnières**  
  https://brasseurs-de-france.com/tout-savoir-sur-la-biere/accords-bieres-mets/

# 9. Gouvernance du fichier

- Toute nouvelle carte doit être accompagnée d’au moins une source crédible et durable.
- Une mode commerciale récente n’est pas ajoutée automatiquement.
- Un changement de collection ne modifie pas nécessairement la parenté taxonomique.
- Les suppressions, fusions et changements d’alias doivent être consignés dans un journal de version.
- Ce fichier constitue la source de vérité fonctionnelle de la taxonomie V1 de ZythoHunt.
