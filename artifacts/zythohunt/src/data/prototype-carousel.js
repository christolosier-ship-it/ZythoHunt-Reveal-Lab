import { cards } from "./cards.js";

const byId = Object.fromEntries(cards.map((card) => [card.id, card]));
const placeholder = (n) => ({ id: `placeholder-${String(n).padStart(2, "0")}`, kind: "placeholder", revealable: false });

export const prototypeCards = [
  placeholder(1),
  { ...byId.stout, kind: "style", revealable: true, aliases: ["stout"] },
  placeholder(2),
  placeholder(3),
  { ...byId["imperial-stout"], kind: "style", revealable: true, aliases: ["imperial stout", "stout imperial", "stout impérial", "russian imperial stout"] },
  placeholder(4),
  placeholder(5),
  { ...byId["baltic-porter"], kind: "style", revealable: true, aliases: ["baltic porter", "porter baltique"] },
  placeholder(6)
];

export const revealablePrototypeCards = prototypeCards.filter((card) => card.revealable);
