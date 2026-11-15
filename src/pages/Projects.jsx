import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { filters, projects } from '../data/projects';
import { profile } from '../data/profile';
import { asset } from '../utils/asset';
import { rich } from '../utils/rich';
import { magneticHandlers, useTilt } from '../hooks/usePointerFx';
import { NextPage, PageHeader } from '../components/Chrome';
import Icon, { TechIcon } from '../components/Icon';
import Reveal from '../components/Reveal';

function ProjectCard({ p, onOpen, hidden, out }) {
  const tilt = useTilt();
  return (
    <Reveal
      as="article"
      className={`project ${p.featured ? 'project--featured' : ''} ${out ? 'is-out' : ''}`}
      hidden={hidden}
    >
      <div className="project__card spotlight" {...tilt}>
        <button className="project__media" onClick={() => onOpen(p)} data-cursor="View" aria-label={`View ${p.title} details`}>
          <img src={asset(p.image)} alt={`${p.title} preview`} loading="lazy" />
          <span className="project__badge">{p.featured && <Icon name="sparkle" />}{p.badge}</span>
        </button>
        <div className="project__body">
          <div className="project__meta"><span>{p.context}</span><span>{p.date}</span></div>
          <h3 className="project__title">{p.title}</h3>
          <p className="project__desc">{p.desc}</p>
          <ul className="project__metrics">
            {p.metrics.map(m => <li key={m.label}><b>{m.value}</b><span>{m.label}</span></li>)}
          </ul>
          <div className="project__foot">
            <div className="stack">
              {p.stack.map(s => (
                <span className="stack__item" data-tip={s.name} key={s.name}>
                  <TechIcon item={s} />
                </span>
              ))}
            </div>
            <button className="link-btn" onClick={() => onOpen(p)}>
              Details <Icon name="arrow" />
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const [shown, setShown] = useState(null);
  const open = Boolean(project);

  useEffect(() => {
    if (project) setShown(project);
  }, [project]);

  useEffect(() => {
    if (!open) return undefined;
    const lastFocus = document.activeElement;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
    document.body.classList.add('modal-open');
    const t = setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 60);
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const f = panelRef.current?.querySelectorAll('a[href], button');
        if (!f?.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = '';
      lastFocus?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  const p = shown;
  return (
    <div className={`modal ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__panel" role="dialog" aria-modal="true" aria-label={p ? `${p.title} details` : 'Project details'} ref={panelRef}>
        <button className="modal__close" onClick={onClose} aria-label="Close" ref={closeRef}><Icon name="x" /></button>
        {p && (
          <div className="modal__content">
            <img className="modal__img" src={asset(p.image)} alt={`${p.title} preview`} />
            <div className="modal__body">
              <p className="modal__meta">{p.context} · {p.date}</p>
              <h3 className="modal__title">{p.title}</h3>
              <p className="modal__lead">{p.lead}</p>
              <ul className="modal__list">{p.details.map(d => <li key={d}>{rich(d)}</li>)}</ul>
              <div className="modal__stack">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
            </div>
          </div>
        )}
        <div className="modal__footer">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
            <img src={asset('icons/github.svg')} alt="" width="16" height="16" /><span>View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [visible, setVisible] = useState('all');
  const [fading, setFading] = useState(false);
  const [openProject, setOpenProject] = useState(null);
  const filtersRef = useRef(null);
  const indicatorRef = useRef(null);

  const place = useCallback(() => {
    const btn = filtersRef.current?.querySelector('.filters__btn.is-active');
    const ind = indicatorRef.current;
    if (!btn || !ind) return;
    Object.assign(ind.style, {
      left: `${btn.offsetLeft}px`, top: `${btn.offsetTop}px`,
      width: `${btn.offsetWidth}px`, height: `${btn.offsetHeight}px`,
    });
  }, []);

  useLayoutEffect(place, [filter, place]);
  useEffect(() => {
    window.addEventListener('resize', place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener('resize', place);
  }, [place]);

  // 1) fade everything out, 2) swap the visible set while invisible
  useEffect(() => {
    if (filter === visible) return undefined;
    setFading(true);
    const t = setTimeout(() => setVisible(filter), 380);
    return () => clearTimeout(t);
  }, [filter, visible]);

  // 3) once the new set is rendered (still transparent), fade it back in
  useEffect(() => {
    if (!fading || filter !== visible) return undefined;
    let r2;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setFading(false)); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [fading, filter, visible]);

  const onClose = useCallback(() => setOpenProject(null), []);
  const matches = p => visible === 'all' || p.cats.includes(visible);

  return (
    <>
      <PageHeader
        label="03 / Selected projects"
        title={<>Things I've <em>designed</em> &amp; <em>shipped</em>.</>}
        intro="A selection of academic, bootcamp and team projects across AI, web, IoT and game development."
      >
        <div className="filters page-anim" style={{ '--d': '.32s' }} role="group" aria-label="Filter projects" ref={filtersRef}>
          <span className="filters__indicator" ref={indicatorRef} aria-hidden="true" />
          {filters.map(f => (
            <button
              key={f.id}
              className={`filters__btn ${filter === f.id ? 'is-active' : ''}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="section section--flush projects">
        <div className="container">
          <div className="projects__grid">
            {projects.map(p => (
              <ProjectCard key={p.id} p={p} onOpen={setOpenProject} hidden={!matches(p)} out={fading} />
            ))}
          </div>

          <Reveal className="projects__more">
            <p>More experiments, coursework and source code live on GitHub.</p>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn--ghost" {...magneticHandlers()}>
              <img src={asset('icons/github.svg')} alt="" width="18" height="18" />
              <span>Visit my GitHub</span>
              <Icon name="arrowUpRight" />
            </a>
          </Reveal>
        </div>
      </section>

      <ProjectModal project={openProject} onClose={onClose} />
      <NextPage />
    </>
  );
}
