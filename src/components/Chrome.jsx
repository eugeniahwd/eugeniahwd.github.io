import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { pages } from '../data/pages';
import { socials } from '../data/profile';
import { asset } from '../utils/asset';
import useScroll from '../hooks/useScroll';
import { Scramble } from './TextFx';
import { TLink } from './Transition';
import Icon from './Icon';
import Reveal from './Reveal';

/* Thin progress line at the very top + back-to-top button with a progress ring */
export function ScrollUi() {
  const barRef = useRef(null);
  const ringRef = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const C = 138.2;

  useScroll(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    if (ringRef.current) ringRef.current.style.strokeDashoffset = String(C * (1 - p));
    setShowTop(window.scrollY > 600);
  });

  return (
    <>
      <div className="scroll-progress" aria-hidden="true"><span ref={barRef} /></div>
      <button
        className={`to-top ${showTop ? 'is-visible' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="to-top__ring" viewBox="0 0 48 48" aria-hidden="true"><circle ref={ringRef} cx="24" cy="24" r="22" /></svg>
        <Icon name="arrowUp" />
      </button>
    </>
  );
}

/* Header used at the top of every inner page */
export function PageHeader({ label, title, intro, children }) {
  return (
    <header className="page-head">
      <div className="container">
        <Scramble className="section-label" text={label} />
        <h1 className="page-title page-anim" style={{ '--d': '.1s' }}>{title}</h1>
        {intro && <p className="page-intro page-anim" style={{ '--d': '.22s' }}>{intro}</p>}
        {children}
      </div>
    </header>
  );
}

/* Big "next page" link at the end of each page */
export function NextPage() {
  const { pathname } = useLocation();
  const idx = pages.findIndex(p => p.path === pathname);
  if (idx === -1) return null;
  const next = idx === pages.length - 1 ? { path: '/', name: 'Home', num: '00' } : pages[idx + 1];
  return (
    <section className="next-page">
      <div className="container">
        <Reveal>
          <TLink to={next.path} className="next-page__link" data-cursor="Go">
            <span className="next-page__label">Next page</span>
            <span className="next-page__title">
              <span className="next-page__num">{next.num}</span>
              {next.name}
            </span>
            <span className="next-page__arrow"><Icon name="arrow" /></span>
          </TLink>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__bar">
        <nav className="footer__links" aria-label="Footer">
          {pages.map(p => <TLink key={p.path} to={p.path}>{p.name}</TLink>)}
        </nav>
        <div className="footer__socials">
          {socials.map(s => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="social social--sm" aria-label={s.name}>
              <img src={asset(`icons/${s.icon}.svg`)} alt="" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
