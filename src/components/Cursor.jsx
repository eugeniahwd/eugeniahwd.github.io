import { useEffect, useRef, useState } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../utils/asset';

const HOVER_SELECTOR = 'a, button, [data-cursor], input, textarea, .tile, .stack__item, .chip, label';

// Minimal cursor: a precise dot plus a soft ring that trails behind it.
// The ring grows over interactive elements and shows a label over images.
export default function Cursor() {
  const [enabled] = useState(() => hasFinePointer() && !prefersReducedMotion());
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [state, setState] = useState({ mode: 'default', hidden: true, down: false });

  useEffect(() => {
    if (!enabled) return undefined;
    document.documentElement.classList.add('has-cursor');
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;

    const move = e => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      setState(s => (s.hidden ? { ...s, hidden: false } : s));
    };
    const follow = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(follow);
    };
    const over = e => {
      const target = e.target.closest?.(HOVER_SELECTOR);
      const label = target?.dataset?.cursor;
      if (labelRef.current && label) labelRef.current.textContent = label;
      const mode = label ? 'label' : target ? 'hover' : 'default';
      setState(s => (s.mode === mode ? s : { ...s, mode }));
    };
    const leave = () => setState(s => ({ ...s, hidden: true }));
    const down = () => setState(s => ({ ...s, down: true }));
    const up = () => setState(s => ({ ...s, down: false }));

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('mouseleave', leave);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    raf = requestAnimationFrame(follow);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('mouseleave', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;
  const cls = ['cursor', `cursor--${state.mode}`, state.hidden && 'is-hidden', state.down && 'is-down'].filter(Boolean).join(' ');
  return (
    <div className={cls} aria-hidden="true">
      <div className="cursor__ring" ref={ringRef}>
        <span className="cursor__label" ref={labelRef}>View</span>
      </div>
      <div className="cursor__dot" ref={dotRef} />
    </div>
  );
}
