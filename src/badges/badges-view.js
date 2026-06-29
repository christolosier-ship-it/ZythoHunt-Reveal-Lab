import { BADGE_DEFINITIONS, BADGE_FAMILIES } from "./badge-definitions.js";
import { getBadgeIconUrl, installBadgeImageFallback } from "./badge-icons.js";

/** @param {{[key: string]: any}} [options] */
export function createBadgesView({ root, badgeStore, badgeEngine, definitions = BADGE_DEFINITIONS } = {}) {
  let filter = "all";
  const visible = (badge) => filter === "all" || (filter === "unlocked" && badgeStore.isUnlocked(badge.id)) || (filter === "locked" && !badgeStore.isUnlocked(badge.id)) || (filter === "secret" && badge.family === "secret");
  function card(badge) {
    const unlocked = badgeStore.isUnlocked(badge.id); const secretLocked = badge.hidden && !unlocked; const data = badgeStore.getUnlocked(badge.id); const p = badgeEngine.getProgress(badge);
    const el = document.createElement("article"); el.className = `badge-card ${unlocked ? "is-unlocked" : "is-locked"} ${secretLocked ? "is-secret" : ""}`;
    const img = document.createElement("img"); img.className = "badge-card-icon"; img.alt = ""; img.src = secretLocked ? "" : getBadgeIconUrl(badge.number); installBadgeImageFallback(img, { secret: secretLocked });
    const title = document.createElement("h3"); title.textContent = secretLocked ? "???" : badge.name;
    el.innerHTML = `<div class="badge-card-top"><span class="badge-number">${badge.numberLabel}</span><span class="badge-state">${unlocked ? "Débloqué" : "Verrouillé"}</span></div>`;
    el.append(img, title);
    const desc = document.createElement("p"); desc.textContent = secretLocked ? "Condition inconnue" : badge.description; el.append(desc);
    if (p && !secretLocked) { const prog = document.createElement("p"); prog.className = "badge-progress"; prog.textContent = `${Math.floor(p.current * 100) / 100} / ${p.target}`; el.append(prog); }
    if (data?.unlockedAt) { const date = document.createElement("time"); date.dateTime = data.unlockedAt; date.textContent = `Obtenu le ${new Date(data.unlockedAt).toLocaleDateString("fr-FR")}`; el.append(date); }
    return el;
  }
  function refresh() {
    if (!root) return; const unlockedCount = definitions.filter((b) => badgeStore.isUnlocked(b.id)).length; const secretCount = definitions.filter((b) => b.hidden && badgeStore.isUnlocked(b.id)).length;
    root.replaceChildren(); const wrap = document.createElement("div"); wrap.className = "badges-shell";
    wrap.innerHTML = `<header class="badges-header"><h1>Badges</h1><p>${unlockedCount} / ${definitions.length} badges débloqués · ${Math.round(unlockedCount / definitions.length * 100)} % · ${secretCount} secrets trouvés</p><button class="badge-notification-button" type="button">Activer les notifications de badges</button><span class="badge-notification-state"></span></header><nav class="badge-filters" aria-label="Filtres badges"></nav>`;
    const filters = wrap.querySelector(".badge-filters"); [["all","Tous"],["unlocked","Débloqués"],["locked","Verrouillés"],["secret","Secrets"]].forEach(([id,label]) => { const b=document.createElement("button"); b.type="button"; b.textContent=label; b.className=id===filter?"is-active":""; b.onclick=()=>{filter=id; refresh();}; filters?.append(b); });
    wrap.querySelector(".badge-notification-button")?.addEventListener("click", async () => { const state = wrap.querySelector(".badge-notification-state"); if (!globalThis.Notification) state && (state.textContent = "Non disponibles"); else state && (state.textContent = await Notification.requestPermission() === "granted" ? "Activées" : "Refusées"); });
    Object.entries(BADGE_FAMILIES).forEach(([family,label]) => { const badges = definitions.filter((b) => b.family === family && visible(b)); if (!badges.length) return; const section=document.createElement("section"); section.className="badge-family"; section.innerHTML=`<h2>${label}</h2>`; const grid=document.createElement("div"); grid.className="badge-grid"; badges.forEach((b)=>grid.append(card(b))); section.append(grid); wrap.append(section); });
    root.append(wrap);
  }
  return { refresh, mount: refresh };
}
