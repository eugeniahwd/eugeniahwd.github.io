import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { pages } from '../data/pages';
import { socials } from '../data/profile';
import { asset } from '../utils/asset';
import useScroll from '../hooks/useScroll';
import { magneticHandlers } from '../hooks/usePointerFx';
import { TLink } from './Transition';
import Icon from './Icon';

const navPages = pages.filter(p => p.path !== '/contact');

export default function Nav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const linksRef = useRef(null);
  const indicatorRef = useRef(null);

  useScroll(() => {
    const y = window.scrollY;
    setScrolled(y > 30);
    setHidden(!menuOpen && y > lastY.current && y > 500);
    lastY.current = y;
  });

  const moveIndicator = useCallback(el => {
    const ind = indicatorRef.current;
    if (!ind) return;
    if (!el) { ind.style.opacity = '0'; return; }
    ind.style.opacity = '1';
    ind.style.left = `${el.offsetLeft}px`;
    ind.style.width = `${el.offsetWidth}px`;
  }, []);

  const activeEl = useCallback(
    () => linksRef.current?.querySelector(`a[data-path="${pathname}"]`) ?? null,
    [pathname],
  );

  useLayoutEffect(() => { moveIndicator(activeEl()); }, [activeEl, moveIndicator]);

  useEffect(() => {
    const place = () => moveIndicator(activeEl());
    window.addEventListener('resize', place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener('resize', place);
  }, [activeEl, moveIndicator]);

  // Mobile menu: lock scroll, close on Escape / resize to desktop
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) return undefined;
    const onKey = e => e.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth > 1020 && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''}`}>
        <TLink
          to="/"
          className={`nav__home ${pathname === '/' ? 'is-active' : ''}`}
          aria-label="Home"
          aria-current={pathname === '/' ? 'page' : undefined}
        >
          <Icon name="home" />
        </TLink>

        <nav className="nav__links" aria-label="Primary" ref={linksRef} onMouseLeave={() => moveIndicator(activeEl())}>
          <span className="nav__indicator" ref={indicatorRef} aria-hidden="true" />
          {navPages.map(p => (
            <TLink
              key={p.path}
              to={p.path}
              data-path={p.path}
              className={pathname === p.path ? 'is-active' : ''}
              aria-current={pathname === p.path ? 'page' : undefined}
              onMouseEnter={e => moveIndicator(e.currentTarget)}
            >
              {p.name}
            </TLink>
          ))}
        </nav>

        <TLink to="/contact" className="btn btn--sm btn--primary nav__cta" {...magneticHandlers()}>
          <span>Let's talk</span>
          <Icon name="arrowUpRight" />
        </TLink>

        <button
          className="nav__toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className="menu" id="mobile-menu" aria-hidden={!menuOpen}>
        <nav className="menu__links" aria-label="Mobile">
          <TLink to="/" onClick={() => setMenuOpen(false)}><small>00</small>Home</TLink>
          {pages.map(p => (
            <TLink key={p.path} to={p.path} onClick={() => setMenuOpen(false)}>
              <small>{p.num}</small>{p.name}
            </TLink>
          ))}
        </nav>
        <div className="menu__foot">
          {socials.map(s => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="social" aria-label={s.name}>
              <img src={asset(`icons/${s.icon}.svg`)} alt="" />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
