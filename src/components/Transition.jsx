import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { pageName } from '../data/pages';
import { prefersReducedMotion } from '../utils/asset';

const TransitionContext = createContext({ go: () => {}, phase: 'idle' });

const COVER_MS = 650;
const REVEAL_MS = 750;

// Page transition: a navy curtain wipes over the page, the route changes
// behind it, then the curtain lifts to reveal the new page.
export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [phase, setPhase] = useState('idle');
  const [label, setLabel] = useState('');
  const busy = useRef(false);

  const go = useCallback(
    to => {
      if (busy.current) return;
      if (to === location.pathname) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (prefersReducedMotion()) {
        navigate(to);
        return;
      }
      busy.current = true;
      setLabel(pageName(to));
      setPhase('cover');
      setTimeout(() => {
        navigate(to);
        window.scrollTo({ top: 0, behavior: 'instant' });
        setPhase('reveal');
        setTimeout(() => {
          setPhase('idle');
          busy.current = false;
        }, REVEAL_MS);
      }, COVER_MS);
    },
    [location.pathname, navigate],
  );

  return (
    <TransitionContext.Provider value={{ go, phase }}>
      {children}
      <div className={`curtain curtain--${phase}`} aria-hidden="true">
        <span className="curtain__label">{label}</span>
      </div>
    </TransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(TransitionContext);

// Drop-in replacement for <Link> that plays the page transition
export function TLink({ to, onClick, children, ...rest }) {
  const { go } = usePageTransition();
  const handle = e => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    go(to);
  };
  return (
    <Link to={to} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
