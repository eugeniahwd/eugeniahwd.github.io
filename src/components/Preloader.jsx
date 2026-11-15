import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { clamp, prefersReducedMotion } from '../utils/asset';

const LoadedContext = createContext(false);
export const useSiteLoaded = () => useContext(LoadedContext);

export function PreloaderProvider({ children }) {
  const [loaded, setLoaded] = useState(false);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const countRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('is-loading');
    const reduce = prefersReducedMotion();
    const duration = reduce ? 250 : 1900;
    let pageReady = document.readyState === 'complete';
    const onLoad = () => { pageReady = true; };
    window.addEventListener('load', onLoad);
    const t0 = performance.now();
    const hardStop = t0 + 6000;
    let raf;
    const timers = [];

    const frame = now => {
      let p = clamp((now - t0) / duration, 0, 1);
      if (p >= 1 && !pageReady && now < hardStop) p = 0.99;
      const eased = 1 - Math.pow(1 - p, 3);
      if (countRef.current) countRef.current.textContent = String(Math.round(eased * 100)).padStart(3, '0');
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (p < 1) { raf = requestAnimationFrame(frame); return; }
      setDone(true);
      timers.push(setTimeout(() => {
        document.body.classList.remove('is-loading');
        document.body.classList.add('is-loaded');
        setLoaded(true);
      }, reduce ? 0 : 750));
      timers.push(setTimeout(() => setGone(true), 2000));
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <LoadedContext.Provider value={loaded}>
      {children}
      {!gone && (
        <div className={`preloader ${done ? 'is-done' : ''}`} aria-hidden="true">
          <div className="preloader__inner">
            <p className="preloader__title">
              <span>Eugenia's</span>
              <em>Portfolio</em>
            </p>
            <div className="preloader__bar"><span ref={barRef} /></div>
            <div className="preloader__meta">
              <span>Loading experience</span>
              <span><b ref={countRef}>000</b>%</span>
            </div>
          </div>
          <div className="preloader__curtain" />
        </div>
      )}
    </LoadedContext.Provider>
  );
}
