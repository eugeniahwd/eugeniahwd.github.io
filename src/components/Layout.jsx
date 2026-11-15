import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { pageName } from '../data/pages';
import Nav from './Nav';
import Cursor from './Cursor';
import { Footer, ScrollUi } from './Chrome';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  // Browser back/forward: jump to top of the new page
  useEffect(() => {
    if (navType === 'POP') window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, navType]);

  useEffect(() => {
    const name = pageName(pathname);
    document.title = !name || name === 'Home' ? "Eugenia's Portfolio" : `${name} · Eugenia's Portfolio`;
  }, [pathname]);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <ScrollUi />
      <Nav />
      <main className="page" key={pathname}>
        {children}
      </main>
      <Footer />
    </>
  );
}
