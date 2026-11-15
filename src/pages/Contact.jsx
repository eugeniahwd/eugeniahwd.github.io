import { useState } from 'react';
import { gmailCompose, profile } from '../data/profile';
import { asset } from '../utils/asset';
import { magneticHandlers } from '../hooks/usePointerFx';
import { NextPage, PageHeader } from '../components/Chrome';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';

const channels = [
  { label: 'Email', value: profile.email, href: gmailCompose(), icon: <Icon name="mail" /> },
  { label: 'LinkedIn', value: 'in/eugeniahuwaida', href: profile.linkedin, icon: <img src={asset('icons/linkedin.svg')} alt="" /> },
  { label: 'GitHub', value: 'github.com/eugeniahwd', href: profile.github, icon: <img src={asset('icons/github.svg')} alt="" /> },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState({ text: 'Opens Gmail with your message ready to send.', type: '' });

  const set = key => e => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    setErrors(er => ({ ...er, [key]: false }));
  };

  const submit = e => {
    e.preventDefault();
    const er = {
      name: form.name.trim().length < 2,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
      message: form.message.trim().length < 5,
    };
    setErrors(er);
    if (er.name || er.email || er.message) {
      setNote({ text: 'Please fill in your name, a valid email and a short message.', type: 'error' });
      return;
    }
    const subject = form.subject.trim() || `Hello from ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n${form.name.trim()}\n${form.email.trim()}`;
    window.open(gmailCompose({ subject, body }), '_blank', 'noopener');
    setNote({ text: 'Gmail opened in a new tab. Thank you for reaching out!', type: 'ok' });
  };

  const field = (key, label, props = {}) => (
    <div className={`field ${errors[key] ? 'is-invalid' : ''}`}>
      {props.textarea ? (
        <textarea id={`cf-${key}`} rows="5" placeholder=" " value={form[key]} onChange={set(key)} />
      ) : (
        <input id={`cf-${key}`} type={props.type || 'text'} placeholder=" " value={form[key]} onChange={set(key)} autoComplete={props.autoComplete} />
      )}
      <label htmlFor={`cf-${key}`}>{label}</label>
    </div>
  );

  return (
    <>
      <PageHeader label="06 / Contact" title={<>Let's build something <em>meaningful</em> together.</>} />

      <section className="section section--flush contact">
        <div className="container">
          <Reveal className="contact__card">
            <div className="contact__grid">
              <div className="contact__info">
                <p className="contact__text">
                  Have a project, opportunity or idea in mind? I'd love to hear about it. Send a message
                  and it will land straight in my Gmail inbox.
                </p>
                <ul className="contact__list">
                  {channels.map(c => (
                    <li key={c.label}>
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="contact__item">
                        <span className="contact__icon">{c.icon}</span>
                        <span><small>{c.label}</small>{c.value}</span>
                        <Icon name="arrowUpRight" className="contact__arrow" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <form className="contact__form" onSubmit={submit} noValidate>
                {field('name', 'Your name', { autoComplete: 'name' })}
                {field('email', 'Your email', { type: 'email', autoComplete: 'email' })}
                {field('subject', 'Subject')}
                {field('message', 'Your message', { textarea: true })}
                <button type="submit" className="btn btn--primary btn--block" {...magneticHandlers()}>
                  <span>Send via Gmail</span>
                  <Icon name="send" />
                </button>
                <p className={`contact__note ${note.type ? `is-${note.type}` : ''}`} role="status">{note.text}</p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
      <NextPage />
    </>
  );
}
