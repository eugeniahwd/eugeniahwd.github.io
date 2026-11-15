import { useEffect, useRef } from 'react';
import { profile, socials } from '../data/profile';
import { pages } from '../data/pages';
import { asset, hasFinePointer, prefersReducedMotion } from '../utils/asset';
import { Scramble, SplitText, Typed } from '../components/TextFx';
import { TLink } from '../components/Transition';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';

const orbitIcons = ['vscode', 'kalilinux', 'github', 'cisco', 'wireshark', 'react', 'espressif', 'python'];
const bandWords = ['Networking', 'Cybersecurity', 'Hardware & IoT', 'Embedded Systems', 'Software Development', 'UI/UX Design'];

function Hero() {
  const heroRef = useRef(null);

  // Soft slate light that follows the pointer across the hero background
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !hasFinePointer() || prefersReducedMotion()) return undefined;
    let tx = 0.7, ty = 0.3, x = tx, y = ty, raf;
    const move = e => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
    };
    const loop = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      hero.style.setProperty('--sx', `${(x * 100).toFixed(2)}%`);
      hero.style.setProperty('--sy', `${(y * 100).toFixed(2)}%`);
      raf = requestAnimationFrame(loop);
    };
    hero.addEventListener('pointermove', move);
    raf = requestAnimationFrame(loop);
    return () => { hero.removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow hero-anim" style={{ '--d': '.1s' }}>
            <span className="pulse-dot" />
            {profile.eyebrow}
          </p>

          <h1 className="hero__title" aria-label={`${profile.firstName} ${profile.middleName} ${profile.lastName}`}>
            <span className="line"><SplitText text={profile.firstName} delay={0.2} /></span>
            <span className="line line--indent"><em className="hero__italic hero-anim" style={{ '--d': '.55s' }}>{profile.middleName}</em></span>
            <span className="line"><SplitText text={profile.lastName} delay={0.7} /></span>
          </h1>

          <div className="terminal hero-anim" style={{ '--d': '1s' }}>
            <div className="terminal__bar" aria-hidden="true"><i /><i /><i /><span>whoami</span></div>
            <div className="terminal__line">
              <span className="terminal__prompt">eugenia@huwaida:~$</span>
              <span className="terminal__out">
                <Typed phrases={profile.roles} />
                <span className="terminal__caret" aria-hidden="true" />
              </span>
            </div>
            <span className="sr-only">{profile.roles.join(', ')}</span>
          </div>

          <div className="hero__socials hero-anim" style={{ '--d': '1.15s' }}>
            {socials.map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="social" aria-label={s.name}>
                <img src={asset(`icons/${s.icon}.svg`)} alt="" />
              </a>
            ))}
          </div>
        </div>

        <div className="hero__visual hero-anim hero-anim--scale" style={{ '--d': '.4s' }}>
          <div className="orbit" aria-hidden="true">
            {orbitIcons.map((name, i) => (
              <span className="orbit__item" key={name} style={{ '--a': `${(360 / orbitIcons.length) * i}deg` }}>
                <span className="orbit__icon"><img src={asset(`icons/${name}.svg`)} alt="" /></span>
              </span>
            ))}
          </div>
          <div className="orbit orbit--inner" aria-hidden="true" />

          <div className="portrait">
            <span className="portrait__offset" aria-hidden="true" />
            <div className="portrait__frame">
              <img src={asset(profile.photo)} alt={`Portrait of ${profile.firstName}`} />
            </div>
          </div>

          <div className="float-card float-card--1">
            <span className="float-card__icon"><Icon name="network" /></span>
            <span><b>Laboratory Assistant</b><small>Network Laboratory UI</small></span>
          </div>
          <div className="float-card float-card--2">
            <span className="float-card__icon float-card__icon--slate"><Icon name="award" /></span>
            <span><b>Certified</b><small>Google · Cisco · Meta</small></span>
          </div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue__line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

function Band() {
  const words = [...bandWords, ...bandWords];
  return (
    <div className="band" aria-hidden="true">
      <div className="band__track">
        {words.map((w, i) => (
          <span key={i}>{w}<i>✦</i></span>
        ))}
      </div>
    </div>
  );
}

function Explore() {
  return (
    <section className="section explore">
      <div className="container">
        <div className="section-head">
          <Scramble className="section-label" text="Explore" />
          <Reveal as="h2" className="section-title">Take a <em>closer</em> look.</Reveal>
        </div>
        <ol className="index">
          {pages.map((p, i) => (
            <Reveal as="li" key={p.path} delay={i * 0.05}>
              <TLink to={p.path} className="index__row" data-cursor="Open">
                <span className="index__num">{p.num}</span>
                <span className="index__title">{p.name}</span>
                <span className="index__desc">{p.desc}</span>
                <span className="index__arrow"><Icon name="arrowUpRight" /></span>
              </TLink>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Band />
      <Explore />
    </>
  );
}
