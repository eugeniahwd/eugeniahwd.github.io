import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { organizations, work } from '../data/experience';
import useScroll from '../hooks/useScroll';
import { spotlightHandlers } from '../hooks/usePointerFx';
import { clamp } from '../utils/asset';
import { NextPage, PageHeader } from '../components/Chrome';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';

const tabs = [
  { id: 'work', label: 'Work', icon: 'briefcase', items: work },
  { id: 'org', label: 'Organization', icon: 'users', items: organizations },
];

function Timeline({ items }) {
  const ref = useRef(null);

  const update = useCallback(() => {
    const tl = ref.current;
    if (!tl) return;
    const mid = window.innerHeight * 0.6;
    const r = tl.getBoundingClientRect();
    tl.style.setProperty('--progress', clamp((mid - r.top) / r.height, 0, 1).toFixed(4));
    tl.querySelectorAll('.tl-item').forEach(item => {
      const d = item.querySelector('.tl-dot').getBoundingClientRect();
      item.classList.toggle('is-active', d.top + d.height / 2 < mid);
    });
  }, []);

  useScroll(update);
  useEffect(update, [items, update]);

  return (
    <div className="timeline" ref={ref}>
      <div className="timeline__line"><span className="timeline__fill" /></div>
      {items.map((x, i) => (
        <Reveal key={x.title} delay={i * 0.06} className="tl-item">
          <span className="tl-dot"><Icon name={x.icon} /></span>
          <div className="tl-card spotlight" {...spotlightHandlers()}>
            <div className="tl-card__head">
              <div>
                <h3>{x.title}</h3>
                <p className="tl-org">{x.org}</p>
              </div>
              <span className="tl-date">{x.current && <span className="live-dot" />}{x.date}</span>
            </div>
            <ul className="tl-list">
              {x.points.map(p => <li key={p}>{p}</li>)}
            </ul>
            <div className="tags">{x.tags.map(t => <span key={t}>{t}</span>)}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function Experience() {
  const [active, setActive] = useState('work');
  const tabsRef = useRef(null);
  const indicatorRef = useRef(null);

  const place = useCallback(() => {
    const btn = tabsRef.current?.querySelector('.tabs__btn.is-active');
    const ind = indicatorRef.current;
    if (!btn || !ind) return;
    ind.style.left = `${btn.offsetLeft}px`;
    ind.style.width = `${btn.offsetWidth}px`;
  }, []);

  useLayoutEffect(place, [active, place]);
  useEffect(() => {
    window.addEventListener('resize', place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener('resize', place);
  }, [place]);

  const onKey = (e, i) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    setActive(next.id);
    tabsRef.current?.querySelector(`#tab-${next.id}`)?.focus();
  };

  const current = tabs.find(t => t.id === active);

  return (
    <>
      <PageHeader
        label="02 / Experience"
        title={<>Where I've <em>learned</em> &amp; <em>led</em>.</>}
        intro="From mentoring students in network and security labs to leading hardware engineering projects: a track record of teaching, building and collaborating."
      />

      <section className="section section--flush experience">
        <div className="container experience__grid">
          <aside className="experience__aside">
            <div className="tabs" role="tablist" aria-label="Experience type" ref={tabsRef}>
              <span className="tabs__indicator" ref={indicatorRef} aria-hidden="true" />
              {tabs.map((t, i) => (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  role="tab"
                  aria-selected={active === t.id}
                  aria-controls="experience-panel"
                  tabIndex={active === t.id ? 0 : -1}
                  className={`tabs__btn ${active === t.id ? 'is-active' : ''}`}
                  onClick={() => setActive(t.id)}
                  onKeyDown={e => onKey(e, i)}
                >
                  <Icon name={t.icon} /> {t.label}
                </button>
              ))}
            </div>
            <p className="experience__hint">
              {active === 'work'
                ? 'Teaching and laboratory roles at Universitas Indonesia.'
                : 'Leadership, scholarship and staff roles in student organizations.'}
            </p>
          </aside>

          <div id="experience-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="experience__panel" key={active}>
            <Timeline items={current.items} />
          </div>
        </div>
      </section>

      <NextPage />
    </>
  );
}
