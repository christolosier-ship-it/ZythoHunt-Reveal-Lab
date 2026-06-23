import collectionJson from "./brassopedie/collection-03-porters-et-stouts.json" with { type: "json" };
import { porterStoutAssetPath, porterStoutCardImages, porterStoutCollectionAssets } from "./card-assets/porters-stouts-assets.js";

const porterStoutThumbPath = (fileName) => porterStoutAssetPath("thumb/" + fileName);

const BRASSOPEDIE_TEXT_OVERRIDES = {
  porter: {
    description: "Le Porter est une bière de pénombre : brun profond, reflets rubis, malt toasté, chocolat sec, caramel sombre et parfois une pointe de café doux. Il ne cherche pas forcément la brutalité torréfiée du stout ; son charme vient plutôt de l’équilibre, du fondu, de cette impression de pain noir passé au feu puis calmé par le malt.",
    histoireEtOrigines: "Né dans le Londres du XVIIIe siècle, le porter accompagne l’essor des grandes brasseries urbaines. C’est une bière de ville, de travail et de volume : vieillie, transportable, sombre, plus stable que beaucoup d’ales de l’époque. Son nom reste associé aux porteurs londoniens, mais son importance dépasse l’anecdote : le porter devient l’un des premiers grands styles brassés à l’échelle industrielle, puis le tronc d’où sortiront plusieurs familles de stouts.",
    profilRecherche: "une bière sombre, maltée et fluide, où le grillé évoque davantage le pain, le cacao et le caramel brun que la cendre ou le café brûlé"
  },
  stout: {
    description: "Le Stout pousse la famille des bières noires vers le grain torréfié : café, cacao amer, mousse beige, finale sèche ou ronde selon les variantes. Il peut être léger comme une pinte irlandaise, soyeux avec de l’avoine, lacté avec du lactose ou massif en version impériale. Son fil rouge n’est pas la puissance, mais cette signature sombre où le malt brûlé devient un paysage.",
    histoireEtOrigines: "Le stout naît dans l’ombre du porter : à l’origine, un « stout porter » désigne surtout une version plus robuste d’une bière déjà sombre. Avec le temps, le mot s’émancipe et devient sa propre famille, portée par les traditions britanniques et irlandaises. Dublin en a fait une icône sèche et noire, tandis que la scène moderne a étiré le style jusqu’aux versions oatmeal, export, impériales, barriquées ou dessert.",
    profilRecherche: "une bière noire identifiable par sa torréfaction, capable d’aller de la pinte sèche et légère au monolithe dense, sans perdre le lien café-cacao-grain sombre"
  }
};

function applyBrassopedieTextOverride(entry) {
  const override = BRASSOPEDIE_TEXT_OVERRIDES[entry.id];
  if (!override) return entry;
  return {
    ...entry,
    description: override.description,
    histoireEtOrigines: override.histoireEtOrigines,
    recette: {
      ...entry.recette,
      profilRecherche: override.profilRecherche
    }
  };
}

const porterStoutEntries = collectionJson.cartes.map(applyBrassopedieTextOverride);

export const porterStoutCollection = {
  ...collectionJson.collection,
  id: "porters-stouts",
  name: collectionJson.collection?.nom || "Porters & Stouts",
  subtitle: "Noirs, torréfiés et profonds",
  cardBack: porterStoutAssetPath(porterStoutCollectionAssets.cardBack),
  cardFrame: porterStoutAssetPath(porterStoutCollectionAssets.collectionFace),
  collectionFace: porterStoutAssetPath(porterStoutCollectionAssets.collectionFace),
  cardBackThumb: porterStoutThumbPath(porterStoutCollectionAssets.cardBack),
  collectionFaceThumb: porterStoutThumbPath(porterStoutCollectionAssets.collectionFace)
};

export const porterStoutCards = porterStoutEntries.map((entry) => {
  const fileName = porterStoutCardImages[entry.id];
  const image = porterStoutAssetPath(fileName);
  return {
    id: entry.id,
    name: entry.nom,
    type: entry.nature,
    path: entry.parentPrincipalId ? `${entry.parentPrincipalId} › ${entry.nom}` : entry.nom,
    tagline: entry.description,
    image,
    thumbImage: porterStoutThumbPath(fileName),
    fullImage: image,
    frame: porterStoutCollection.cardFrame,
    revealable: true,
    aliases: entry.aliases || [],
    brassopedie: entry
  };
});

export const porterStoutCardsById = Object.fromEntries(porterStoutCards.map((card) => [card.id, card]));
export const revealablePorterStoutCards = porterStoutCards.filter((card) => card.revealable);

export function validatePorterStoutCollection() {
  const errors = [];
  const ids = porterStoutCards.map((card) => card.id);
  if (porterStoutCards.length !== 22) errors.push(`Expected 22 cards, got ${porterStoutCards.length}.`);
  if (new Set(ids).size !== ids.length) errors.push("Duplicate card IDs detected.");
  porterStoutCards.forEach((card) => {
    if (!card.image) errors.push(`Missing image for ${card.id}.`);
    if (!card.thumbImage) errors.push(`Missing thumb image for ${card.id}.`);
    if (!card.fullImage) errors.push(`Missing full image for ${card.id}.`);
  });
  Object.keys(porterStoutCardImages).forEach((id) => { if (!porterStoutCardsById[id]) errors.push(`Image mapping references unknown ID ${id}.`); });
  if (!porterStoutCollectionAssets.cardBack) errors.push("Missing collection card back declaration.");
  if (!porterStoutCollectionAssets.collectionFace) errors.push("Missing collection face declaration.");
  if (!porterStoutCollection.cardFrame) errors.push("Missing collection card frame declaration.");
  if (!porterStoutCollection.cardBackThumb) errors.push("Missing collection card back thumbnail declaration.");
  if (!porterStoutCollection.collectionFaceThumb) errors.push("Missing collection face thumbnail declaration.");
  return { valid: errors.length === 0, errors };
}

const validation = validatePorterStoutCollection();
if (!validation.valid && import.meta.env?.DEV) {
  console.error("Invalid Porters & Stouts collection", validation.errors);
}
