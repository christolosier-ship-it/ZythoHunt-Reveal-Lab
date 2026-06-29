import { getBadgeIconUrl } from "./badge-icons.js";
export async function notifyBadgesUnlocked(items) {
  if (!items?.length) return;
  if (globalThis.Notification?.permission === "granted" && navigator.serviceWorker?.ready) {
    try { const reg = await navigator.serviceWorker.ready; await reg.showNotification(items.length > 1 ? `${items.length} badges débloqués` : "Badge débloqué", { body: items.length > 1 ? "Nouveaux trophées ZythoHunt archivés." : items[0].badge.name, icon: getBadgeIconUrl(items[0].badge.number), badge: getBadgeIconUrl(items[0].badge.number), data: { badgeId: items[0].badge.id } }); return; } catch {}
  }
  showBadgeToast(items);
}
export function showBadgeToast(items, message) {
  const root = document.querySelector(".badge-toast-root") || document.body.appendChild(Object.assign(document.createElement("div"), { className: "badge-toast-root" }));
  const toast = document.createElement("div"); toast.className = "badge-toast"; toast.textContent = message || (items.length > 1 ? `🏅 ${items.length} badges débloqués` : `🏅 Badge débloqué : ${items[0].badge.name}`); root.appendChild(toast); setTimeout(() => toast.remove(), 4200);
}
