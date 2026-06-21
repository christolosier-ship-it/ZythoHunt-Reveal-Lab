/**
 * Resolves a public asset path against Vite's base URL.
 * Works correctly both on Replit (base="/") and on GitHub Pages (base="/ZythoHunt-Reveal-Lab/").
 * Falls back to "/" when imported by Node tests outside Vite.
 *
 * @param {string} path – asset path, with or without a leading slash (e.g. "/assets/foo.webp")
 * @returns {string} full URL including the base path
 */
export const assetUrl = (path) => {
  const base = import.meta.env?.BASE_URL || "/";
  return `${base}${path.replace(/^\/+/, "")}`;
};
