import { useCallback } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../utils/asset';

const fxEnabled = () => hasFinePointer() && !prefersReducedMotion();

// Spotlight: sets --mx / --my so CSS can draw a soft light under the pointer
export function spotlightHandlers() {
  return {
    onPointerMove: e => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    },
  };
}

// Subtle 3D tilt for cards
export function useTilt(strength = 1) {
  const onPointerMove = useCallback(
    e => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
      if (!fxEnabled()) return;
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.transform = `perspective(1200px) rotateX(${(0.5 - py) * 4 * strength}deg) rotateY(${(px - 0.5) * 5 * strength}deg) translateY(-6px)`;
    },
    [strength],
  );
  const onPointerLeave = useCallback(e => {
    e.currentTarget.style.transform = '';
  }, []);
  return { onPointerMove, onPointerLeave };
}

// Magnetic buttons that lean toward the pointer
export function magneticHandlers() {
  return {
    onPointerMove: e => {
      if (!fxEnabled()) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    },
    onPointerLeave: e => {
      e.currentTarget.style.transform = '';
    },
  };
}
