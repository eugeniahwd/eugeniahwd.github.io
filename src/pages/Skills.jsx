import { hardSkills, iconNames, marqueeRows, skillGroups, softSkills } from '../data/skills';
import { asset } from '../utils/asset';
import { NextPage, PageHeader } from '../components/Chrome';
import Icon, { TechIcon } from '../components/Icon';
import Reveal from '../components/Reveal';

function LogoMarquee() {
  return (
    <div className="logo-marquee" aria-hidden="true">
      {marqueeRows.map((row, r) => (
        <div className={`logo-marquee__row ${r % 2 ? 'logo-marquee__row--reverse' : ''}`} key={r}>
          <div className="logo-marquee__track">
            {[...row, ...row].map((name, i) => (
              <span key={i}><img src={asset(`icons/${name}.svg`)} alt="" />{iconNames[name]}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <>
      <PageHeader
        label="04 / Skills & tools"
        title={<>My <em>toolkit</em>, from packets to pixels.</>}
        intro="Tools I use in coursework, lab sessions and projects, grouped by what I use them for."
      />

      <section className="section section--flush skills">
        <LogoMarquee />

        <div className="container">
          <div className="skill-groups">
            {skillGroups.map((g, gi) => (
              <Reveal key={g.id} delay={(gi % 2) * 0.08} className={`skill-group ${g.wide ? 'skill-group--wide' : ''}`}>
                <div className="skill-group__head">
                  <span className="skill-group__icon"><Icon name={g.icon} /></span>
                  <div><h3>{g.title}</h3><p>{g.subtitle}</p></div>
                </div>
                <div className="tiles">
                  {g.items.map(item => (
                    <div className="tile" key={item.name}>
                      <TechIcon item={item} className="tile__icon" />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="skill-lists">
            <Reveal className="skill-list">
              <h3><Icon name="terminal" /> Hard skills</h3>
              <div className="chips">{hardSkills.map(s => <span className="chip" key={s}>{s}</span>)}</div>
            </Reveal>
            <Reveal className="skill-list" delay={0.08}>
              <h3><Icon name="heart" /> Soft skills</h3>
              <div className="chips chips--soft">{softSkills.map(s => <span className="chip" key={s}>{s}</span>)}</div>
            </Reveal>
          </div>
        </div>
      </section>

      <NextPage />
    </>
  );
}
