export const APP_VIEW_IDS = Object.freeze(["zythosphere", "brassopedie", "degustation", "badges", "reglages"]);

export const APP_MENU_VIEW_MAP = Object.freeze({
  zythosphere: "zythosphere",
  brassopedie: "brassopedie",
  degustation: "degustation",
  badge: "badges",
  reglages: "reglages"
});

export function isKnownAppView(viewId) {
  return APP_VIEW_IDS.includes(viewId);
}

export function resolveMenuView(menuKey) {
  return APP_MENU_VIEW_MAP[menuKey] || null;
}

/**
 * @param {{ views?: Record<string, any>, initialView?: string, onViewChange?: (viewId: string, previousView: string) => void }} [options]
 */
export function createAppNavigation({ views, initialView = "zythosphere", onViewChange } = {}) {
  const callbacks = new Set();
  if (typeof onViewChange === "function") callbacks.add(onViewChange);
  let activeView = isKnownAppView(initialView) && views?.[initialView] ? initialView : "zythosphere";

  const setViewVisibility = (viewId) => {
    Object.entries(views || {}).forEach(([id, viewEl]) => {
      if (!viewEl) return;
      const isActive = id === viewId;
      viewEl.hidden = !isActive;
      viewEl.setAttribute("aria-hidden", isActive ? "false" : "true");
    });
  };

  const notify = (viewId, previousView) => {
    callbacks.forEach((callback) => callback(viewId, previousView));
  };

  function showView(viewId) {
    if (!isKnownAppView(viewId) || !views?.[viewId]) return false;
    const previousView = activeView;
    activeView = viewId;
    setViewVisibility(viewId);
    if (previousView !== viewId) notify(viewId, previousView);
    return true;
  }

  function getActiveView() {
    return activeView;
  }

  function onViewChangeCallback(callback) {
    if (typeof callback !== "function") return () => {};
    callbacks.add(callback);
    return () => callbacks.delete(callback);
  }

  showView(activeView);

  return { showView, getActiveView, onViewChange: onViewChangeCallback };
}
