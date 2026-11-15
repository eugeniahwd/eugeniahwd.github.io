import { useState } from 'react';
import { certifications } from '../data/certifications';
import { asset } from '../utils/asset';
import { spotlightHandlers } from '../hooks/usePointerFx';
import { NextPage, PageHeader } from '../components/Chrome';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';

function CertCard({ c, delay }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal as="article" delay={delay} className={`cert ${open ? 'is-open' : ''}`}>
      <div className="cert__inner spotlight" {...spotlightHandlers()}>
        <div className="cert__top">
          <span className="cert__logo"><img src={asset(`icons/${c.logo}.svg`)} alt={c.issuer.split(' · ')[0]} /></span>
          <span className="cert__date"><Icon name="calendar" />{c.date}</span>
        </div>
        <h3 className="cert__title">{c.title}</h3>
        <p className="cert__issuer">{c.issuer}</p>
        <div className="tags tags--sm">{c.tags.map(t => <span key={t}>{t}</span>)}</div>
        <div className="cert__more">
          <div className="cert__more-inner">
            <ul>{c.learned.map(l => <li key={l}>{l}</li>)}</ul>
          </div>
        </div>
        <div className="cert__actions">
          <button className="cert__toggle" aria-expanded={open} onClick={() => setOpen(o => !o)}>
            What I learned <Icon name="chevron" />
          </button>
          {c.url ? (
            <a className="cert__link" href={c.url} target="_blank" rel="noopener noreferrer">
              Credential <Icon name="arrowUpRight" />
            </a>
          ) : (
            <span className="cert__link cert__link--muted">Cisco NetAcad</span>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function Certifications() {
  return (
    <>
      <PageHeader
        label="05 / Licenses & certifications"
        title={<>Verified <em>learning</em>, industry-backed.</>}
        intro="Certifications in cybersecurity, networking, databases and front-end development."
      />
      <section className="section section--flush certs">
        <div className="container">
          <div className="certs__grid">
            {certifications.map((c, i) => <CertCard key={c.title} c={c} delay={(i % 3) * 0.08} />)}
          </div>
        </div>
      </section>
      <NextPage />
    </>
  );
}
