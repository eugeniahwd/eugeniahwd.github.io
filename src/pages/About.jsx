import { useState } from 'react';
import { aboutSub, courses, education, focusAreas, statement } from '../data/about';
import { spotlightHandlers } from '../hooks/usePointerFx';
import { NextPage, PageHeader } from '../components/Chrome';
import { WordReveal, Scramble } from '../components/TextFx';
import Icon, { TechIcon } from '../components/Icon';
import Reveal from '../components/Reveal';

function Education() {
  const [open, setOpen] = useState(false);
  return (
    <section className="section section--tight education">
      <div className="container">
        <div className="section-head">
          <Scramble className="section-label" text="Education" />
          <Reveal as="h2" className="section-title">Where I <em>study</em>.</Reveal>
        </div>

        <Reveal className={`edu ${open ? 'is-open' : ''}`}>
          <div className="edu__head">
            <span className="edu__logo">UI</span>
            <div className="edu__info">
              <span className="edu__date">{education.date}</span>
              <h3>{education.school}</h3>
              <p>{education.degree} · {education.status}</p>
            </div>
            <button
              className="edu__toggle"
              aria-expanded={open}
              aria-controls="course-list"
              onClick={() => setOpen(o => !o)}
            >
              <span>{open ? 'Hide courses' : `View courses (${courses.length})`}</span>
              <Icon name={open ? 'minus' : 'plus'} />
            </button>
          </div>

          <div className="edu__body" id="course-list">
            <div className="edu__body-inner">
              <p className="edu__note">Courses I have taken so far, with the tools used in each.</p>
              <ol className="courses">
                {courses.map((c, i) => (
                  <li key={c.name} className="course" style={{ '--i': i }}>
                    <span className="course__num">{String(i + 1).padStart(2, '0')}</span>
                    <div className="course__main">
                      <h4>{c.name}</h4>
                      <p>{c.local}</p>
                    </div>
                    {c.tools.length > 0 && (
                      <div className="course__tools">
                        {c.tools.map(t => (
                          <span className="chip chip--tool" key={t.name}>
                            <TechIcon item={t} className="chip__icon" />
                            {t.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <PageHeader
        label="01 / About"
        title={<>Engineering with <em>curiosity</em>, built on <em>fundamentals</em>.</>}
      />

      <section className="section section--flush about">
        <div className="container">
          <WordReveal segments={statement} />
          <Reveal as="p" className="about__sub">{aboutSub}</Reveal>

          <div className="focus">
            {focusAreas.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08} className="focus__card spotlight" {...spotlightHandlers()}>
                <span className="focus__icon"><Icon name={f.icon} /></span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Education />
      <NextPage />
    </>
  );
}
