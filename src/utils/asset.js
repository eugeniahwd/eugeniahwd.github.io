// Builds a URL to a file in /public that also works when the site is
// deployed under a sub-path (vite.config.js `base`).
export const asset = path => `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
