import { useEffect, useRef } from 'react';

// Calls `fn` on scroll and resize, throttled to one call per animation frame.
export default function useScroll(fn) {
  const saved = useRef(fn);
  saved.current = fn;

  useEffect(() => {
    let ticking = false;
    const run = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        saved.current();
      });
    };
    window.addEventListener('scroll', run, { passive: true });
    window.addEventListener('resize', run);
    run();
    return () => {
      window.removeEventListener('scroll', run);
      window.removeEventListener('resize', run);
    };
  }, []);
}
