const SW_UPDATE_MESSAGE = { type: "SKIP_WAITING" };

let refreshing = false;

function requestSkipWaiting(worker) {
  if (!worker) return;
  worker.postMessage(SW_UPDATE_MESSAGE);
}

function watchInstallingWorker(registration) {
  const worker = registration.installing;
  if (!worker) return;

  worker.addEventListener("statechange", () => {
    if (worker.state === "installed" && navigator.serviceWorker.controller) {
      requestSkipWaiting(worker);
    }
  });
}

export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;

  const hadController = Boolean(navigator.serviceWorker.controller);

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  const registration = await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {
    scope: import.meta.env.BASE_URL
  });

  registration.addEventListener("updatefound", () => watchInstallingWorker(registration));

  if (registration.waiting) requestSkipWaiting(registration.waiting);
  await registration.update();

  return registration;
}
