import { useEffect, useRef } from 'react';
import useInView from '../hooks/useInView';
import useScroll from '../hooks/useScroll';
import { clamp, prefersReducedMotion } from '../utils/asset';
import { useSiteLoaded } from './Preloader';

/* Scrambles through random glyphs before settling on the text */
export function Scramble({ text, className = '', as: Tag = 'span' }) {
  const [ref, inView] = useInView({ threshold: 0.6, rootMargin: '0px' });
  const nodeRef = useRef(null);

  useEffect(() => {
    const el = nodeRef.current;
    if (!inView || !el) return undefined;
    if (prefersReducedMotion()) return undefined;
    const glyphs = '!<>-_\\/[]{}=+*^?#01ABCDEF';
    const queue = [...text].map((ch, i) => ({ ch, end: 8 + Math.floor(Math.random() * 16) + i * 0.7 }));
    let frame = 0;
    let raf;
    const update = () => {
      let out = '';
      let done = 0;
      for (const q of queue) {
        if (frame >= q.end || q.ch === ' ') { out += q.ch; done++; }
        else out += glyphs[(Math.random() * glyphs.length) | 0];
      }
      el.textContent = out;
      if (done < queue.length) { frame++; raf = requestAnimationFrame(update); }
    };
    update();
    return () => { cancelAnimationFrame(raf); el.textContent = text; };
  }, [inView, text]);

  return (
    <Tag ref={ref} className={className}>
      <span ref={nodeRef}>{text}</span>
    </Tag>
  );
}

/* Splits a word into characters that rise in one by one */
export function SplitText({ text, delay = 0, className = '' }) {
  return (
    <span className={`split ${className}`} aria-hidden="true">
      {[...text].map((ch, i) => (
        <span className="char" key={i} style={{ '--ci': i, '--base': `${delay}s` }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}

/* Terminal-style typing loop through a list of phrases */
export function Typed({ phrases, startDelay = 1100 }) {
  const loaded = useSiteLoaded();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!loaded || !el) return undefined;
    if (prefersReducedMotion()) { el.textContent = phrases[0]; return undefined; }
    let p = 0;
    let c = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const word = phrases[p];
      el.textContent = word.slice(0, c);
      let wait;
      if (!deleting) {
        if (c < word.length) { c++; wait = 45 + Math.random() * 55; }
        else { deleting = true; wait = 2000; }
      } else if (c > 0) { c--; wait = 24; }
      else { deleting = false; p = (p + 1) % phrases.length; wait = 380; }
      timer = setTimeout(tick, wait);
    };
    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [loaded, phrases, startDelay]);

  return <span className="typed" ref={ref} />;
}

/* Words light up one by one as the paragraph scrolls through the viewport */
export function WordReveal({ segments, className = '' }) {
  const wrapRef = useRef(null);
  const words = [];
  segments.forEach((seg, si) => {
    seg.text.split(/\s+/).filter(Boolean).forEach((w, wi) => {
      words.push({ w, hl: seg.hl, key: `${si}-${wi}`, glue: seg.glue && wi === 0 });
    });
  });

  useScroll(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const spans = wrap.querySelectorAll('.w');
    if (prefersReducedMotion()) { spans.forEach(s => s.classList.add('is-lit')); return; }
    const r = wrap.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = vh * 0.88;
    const end = vh * 0.3;
    const p = clamp((start - r.top) / (start - end + r.height * 0.5), 0, 1);
    const lit = Math.round(p * spans.length);
    spans.forEach((s, i) => s.classList.toggle('is-lit', i < lit));
  });

  return (
    <p className={`statement ${className}`} ref={wrapRef}>
      {words.map(({ w, hl, key, glue }) => (
        <span key={key}>
          {!glue && ' '}
          <span className={`w ${hl ? 'w--hl' : ''}`}>{w}</span>
        </span>
      ))}
    </p>
  );
}
