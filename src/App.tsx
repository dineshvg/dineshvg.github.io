import React, { useEffect, useRef, useState } from 'react';
import {
  MapPin,
  Mail,
  ArrowUpRight,
  Plus,
  Sun,
  Moon,
  Layers,
  Boxes,
  KeyRound,
  Cpu,
  ShieldCheck,
  Bot,
  Award,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { content, type Experience, type Language, type Project, type Translations } from './content';
import { educationLogos, experienceLogos, isaqb, links, portrait } from './media';
import { GitHubIcon, LinkedInIcon } from './components/BrandIcons';
import { trackEvent } from './analytics';

type AppearanceMode = 'light' | 'dark';

const storage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* private mode: preference just isn't remembered */
    }
  },
};

const initialLanguage = (): Language => {
  const saved = storage.get('lang');
  if (saved === 'en' || saved === 'de') return saved;
  return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('de') ? 'de' : 'en';
};

const initialMode = (): AppearanceMode => {
  const saved = storage.get('mode');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/** Phrases set in the accent italic inside the profile statement. */
const emphasis: Record<Language, string[]> = {
  en: ['Software Architect and Lead Android Developer', 'Telematics Infrastructure', 'secure mobile architectures'],
  de: ['Softwarearchitekt und Lead Android Developer', 'Telematikinfrastruktur', 'sichere mobile Architekturen'],
};

const emphasize = (text: string, phrases: string[]) => {
  const pattern = new RegExp(`(${phrases.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  return text.split(pattern).map((part, i) =>
    phrases.includes(part) ? (
      <em key={i} className="text-ink italic">
        {part}
      </em>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
};

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const projectIcon = (type: Project['iconType'], size = 20) => {
  switch (type) {
    case 'kmp':
      return <Boxes size={size} strokeWidth={1.6} />;
    case 'auth':
      return <KeyRound size={size} strokeWidth={1.6} />;
    case 'server':
      return <Cpu size={size} strokeWidth={1.6} />;
    case 'ehealth':
      return <ShieldCheck size={size} strokeWidth={1.6} />;
    case 'ai':
      return <Bot size={size} strokeWidth={1.6} />;
    default:
      return <Layers size={size} strokeWidth={1.6} />;
  }
};

/* ---------- Small building blocks ---------- */

const MonoLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`font-mono text-[11px] font-medium uppercase tracking-[0.14em] ${className}`}>{children}</span>
);

const SectionHeader: React.FC<{ index: string; title: string }> = ({ index, title }) => (
  <div className="mb-10 md:mb-14">
    <div className="flex items-center gap-4 mb-4">
      <MonoLabel className="text-accent">{index}</MonoLabel>
      <span className="h-px flex-1 bg-line" />
    </div>
    <h2 className="font-serif text-[2rem] md:text-[2.75rem] leading-[1.05] tracking-[-0.02em] font-[420]">{title}</h2>
  </div>
);

const Disclosure: React.FC<{ items: string[]; labels: Translations['ui'] }> = ({ items, labels }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="group inline-flex items-center gap-2 text-[13px] font-medium text-accent hover:text-ink transition-colors"
      >
        <span className="grid place-items-center w-5 h-5 rounded-full border border-current">
          <Plus size={12} className={`transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
        </span>
        {open ? labels.readLess : labels.readMore}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-2.5 rounded-xl bg-chip/70 p-5">
              {items.map((d, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                  <span className="mt-[9px] h-px w-3 shrink-0 bg-muted" />
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Highlights: React.FC<{ items: string[]; columns?: boolean }> = ({ items, columns }) => (
  <ul className={`grid gap-x-8 gap-y-2.5 ${columns ? 'md:grid-cols-2' : ''}`}>
    {items.map((h, i) => (
      <li key={i} className="flex gap-3 text-[14.5px] leading-relaxed text-ink-2">
        <span className="mt-[10px] h-[5px] w-[5px] shrink-0 rotate-45 bg-accent" />
        {h}
      </li>
    ))}
  </ul>
);

const Tags: React.FC<{ tags: string[] }> = ({ tags }) => (
  <ul className="flex flex-wrap gap-1.5">
    {tags.map(tag => (
      <li key={tag} className="rounded-md bg-chip px-2 py-1 font-mono text-[11px] text-ink-2">
        {tag}
      </li>
    ))}
  </ul>
);

/** White tile so logos read the same in light and dark mode; wide wordmarks get a wider tile. */
const LogoTile: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => (
  <span className={`inline-flex h-12 min-w-12 ${className} shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-1.5`}>
    <img src={src} alt={alt} className="max-h-full max-w-[84px] object-contain" loading="lazy" />
  </span>
);

/* ---------- Experience ---------- */

const ExperienceItem: React.FC<{ exp: Experience; labels: Translations['ui']; current: boolean; last: boolean }> = ({
  exp,
  labels,
  current,
  last,
}) => (
  <motion.li {...reveal} className="grid md:grid-cols-[150px_1fr] md:gap-8">
    <div className="pb-3 md:pb-0 md:pt-1.5">
      <MonoLabel className="text-muted">{exp.period}</MonoLabel>
    </div>
    <div className={`relative border-l border-line pl-7 md:pl-9 ${last ? 'pb-2' : 'pb-14'}`}>
      <span
        className={`absolute -left-[6px] top-2 h-[11px] w-[11px] rounded-full ring-4 ring-paper ${
          current ? 'bg-accent' : 'border-2 border-muted bg-paper'
        }`}
      />
      <div className="flex items-start gap-4 mb-4">
        {experienceLogos[exp.id] && <LogoTile src={experienceLogos[exp.id]} alt={exp.company} />}
        <div className="min-w-0">
          <h3 className="font-serif text-[1.4rem] md:text-[1.6rem] leading-tight tracking-[-0.01em] font-[450]">
            {exp.role}
          </h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-muted">
            <span className="font-medium text-ink-2">{exp.company}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} /> {exp.location}
            </span>
          </p>
        </div>
      </div>
      <p className="mb-5 max-w-[68ch] text-[15px] leading-relaxed text-ink-2">{exp.description}</p>
      <Highlights items={exp.highlights} />
      {exp.certificateUrl && (
        <a
          href={exp.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-3.5 text-[13px] font-medium text-ink hover:border-accent transition-colors"
        >
          <img src={isaqb} alt="" className="h-6 w-6" />
          iSAQB CPSA-F
          <ArrowUpRight size={14} className="text-muted" />
        </a>
      )}
      {exp.details && <Disclosure items={exp.details} labels={labels} />}
    </div>
  </motion.li>
);

/* ---------- Projects ---------- */

const ProjectLinks: React.FC<{ project: Project }> = ({ project }) =>
  project.links && project.links.length > 0 ? (
    <div className="flex flex-wrap gap-2">
      {project.links.map(link => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-medium text-paper hover:bg-accent hover:text-accent-ink transition-colors"
        >
          {link.label}
          <ArrowUpRight size={14} />
        </a>
      ))}
    </div>
  ) : null;

const ProjectMeta: React.FC<{ project: Project }> = ({ project }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
    <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-0.5 text-[12px] font-medium text-accent">
      {project.badge}
    </span>
    {project.period && <MonoLabel className="text-muted">{project.period}</MonoLabel>}
  </div>
);

const FeaturedProject: React.FC<{ project: Project; labels: Translations['ui'] }> = ({ project, labels }) => (
  <motion.article
    {...reveal}
    className="relative overflow-hidden rounded-[28px] border border-line bg-surface p-7 md:p-10 shadow-card"
  >
    <div
      aria-hidden
      className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent opacity-[0.07] blur-2xl"
    />
    <div className="relative">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-ink">
            {projectIcon(project.iconType, 22)}
          </span>
          <div>
            <MonoLabel className="text-accent">{labels.featured}</MonoLabel>
            <p className="text-sm text-muted">{project.category}</p>
          </div>
        </div>
        <ProjectMeta project={project} />
      </div>
      <h3 className="mb-4 max-w-[24ch] font-serif text-[1.85rem] md:text-[2.35rem] leading-[1.08] tracking-[-0.02em] font-[430]">
        {project.title}
      </h3>
      <p className="mb-7 max-w-[70ch] text-[15.5px] leading-relaxed text-ink-2">{project.description}</p>
      <Highlights items={project.highlights} columns />
      <div className="mt-7">
        <Tags tags={project.tags} />
      </div>
      {project.details && <Disclosure items={project.details} labels={labels} />}
    </div>
  </motion.article>
);

const ProjectCard: React.FC<{ project: Project; labels: Translations['ui'] }> = ({ project, labels }) => (
  <motion.article
    {...reveal}
    className="group flex flex-col rounded-[22px] border border-line bg-surface p-6 md:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card hover:border-accent/40"
  >
    <div className="mb-5 flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-accent-ink">
        {projectIcon(project.iconType)}
      </span>
      <MonoLabel className="text-muted leading-snug">{project.category}</MonoLabel>
    </div>
    <h3 className="mb-3 font-serif text-[1.35rem] leading-snug tracking-[-0.01em] font-[460]">{project.title}</h3>
    <div className="mb-4">
      <ProjectMeta project={project} />
    </div>
    <p className="mb-5 text-[14.5px] leading-relaxed text-ink-2">{project.description}</p>
    <Highlights items={project.highlights} />
    <div className="mt-6">
      <Tags tags={project.tags} />
    </div>
    {project.details && <Disclosure items={project.details} labels={labels} />}
    {project.links && (
      <div className="mt-6 border-t border-line pt-5">
        <ProjectLinks project={project} />
      </div>
    )}
  </motion.article>
);

/* ---------- Chrome: controls, nav ---------- */

const Controls: React.FC<{
  lang: Language;
  setLang: (l: Language) => void;
  mode: AppearanceMode;
  setMode: (m: AppearanceMode) => void;
  label: string;
}> = ({ lang, setLang, mode, setMode, label }) => (
  <div className="flex items-center gap-2">
    <div className="flex rounded-full border border-line bg-surface p-0.5 font-mono text-[11px] font-medium">
      {(['en', 'de'] as const).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors ${
            lang === l ? 'bg-ink text-paper' : 'text-muted hover:text-ink'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
    <button
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      aria-label={label}
      className="grid h-[30px] w-[30px] place-items-center rounded-full border border-line bg-surface text-ink-2 hover:text-ink transition-colors"
    >
      {mode === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  </div>
);

const SocialLinks: React.FC = () => (
  <div className="flex items-center gap-2">
    {[
      { href: links.github, label: 'GitHub', icon: <GitHubIcon size={16} /> },
      { href: links.linkedin, label: 'LinkedIn', icon: <LinkedInIcon size={16} /> },
      { href: `mailto:${links.email}`, label: 'Email', icon: <Mail size={16} /> },
    ].map(l => (
      <a
        key={l.label}
        href={l.href}
        aria-label={l.label}
        target={l.href.startsWith('http') ? '_blank' : undefined}
        onClick={() => trackEvent(`social-${l.label.toLowerCase()}`)}
        rel="noopener noreferrer"
        className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink-2 hover:border-accent hover:text-accent transition-colors"
      >
        {l.icon}
      </a>
    ))}
  </div>
);

/** Availability badge doubles as a contact entry point: opens a small email / LinkedIn menu. */
const Availability: React.FC<{ text: string; labels: Translations['ui'] }> = ({ text, labels }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const mailto = `mailto:${links.email}?subject=${encodeURIComponent(labels.emailSubject)}`;
  const item =
    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] text-ink hover:bg-chip transition-colors';

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-2 rounded-2xl border border-accent/30 bg-accent-soft px-3 py-1.5 text-left text-[12px] font-medium leading-snug text-accent transition-colors hover:border-accent sm:text-[12.5px]"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        {text}
        <ChevronDown size={13} className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-30 mt-2 w-60 rounded-xl border border-line bg-surface p-1.5 shadow-card"
          >
            <a
              role="menuitem"
              href={mailto}
              className={item}
              onClick={() => {
                trackEvent('contact-badge-email');
                setOpen(false);
              }}
            >
              <Mail size={16} className="text-accent" /> {labels.contactEmail}
            </a>
            <a
              role="menuitem"
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={item}
              onClick={() => {
                trackEvent('contact-badge-linkedin');
                setOpen(false);
              }}
            >
              <LinkedInIcon size={15} className="text-accent" /> {labels.contactLinkedIn}
              <ArrowUpRight size={14} className="ml-auto text-muted" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
};

/* ---------- Page ---------- */

const NAV_IDS = ['experience', 'projects', 'skills', 'education', 'languages', 'contact'];

const App: React.FC = () => {
  const [lang, setLangState] = useState<Language>(initialLanguage);
  const [mode, setModeState] = useState<AppearanceMode>(initialMode);
  const active = useActiveSection(NAV_IDS);

  const setLang = (l: Language) => {
    setLangState(l);
    storage.set('lang', l);
  };
  const setMode = (m: AppearanceMode) => {
    setModeState(m);
    storage.set('mode', m);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = content[lang];
  const [featured, ...projects] = t.projects;
  const navLabels: Record<string, string> = {
    experience: t.sections.experience,
    projects: t.sections.projects,
    skills: t.sections.expertise,
    education: t.sections.education,
    languages: t.sections.languages,
    contact: t.ui.contact,
  };
  const controls = <Controls lang={lang} setLang={setLang} mode={mode} setMode={setMode} label={t.ui.toggleTheme} />;

  return (
    <div className="grain relative min-h-screen">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between px-5">
          <a href="#top" className="font-serif text-lg font-[500] tracking-tight">
            Dinesh Gangatharan
          </a>
          {controls}
        </div>
      </div>

      {/* Desktop: language and theme switches pinned top right */}
      <div className="fixed right-6 top-6 z-50 hidden rounded-full border border-line bg-paper/85 p-1 shadow-card backdrop-blur-md lg:block">
        {controls}
      </div>

      <div id="top" className="relative z-10 mx-auto max-w-[1240px] px-5 md:px-10 lg:grid lg:grid-cols-[280px_1fr] lg:gap-16 xl:gap-24">
        {/* Sidebar / mobile intro */}
        <aside className="pt-8 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-y-auto lg:py-10">
          <div className="flex gap-5 lg:block">
            <div className="relative w-28 shrink-0 sm:w-36 lg:w-full">
              <img
                src={portrait}
                alt="Dinesh Gangatharan"
                className="aspect-[4/5] w-full rounded-[20px] object-cover object-[50%_25%] shadow-card lg:aspect-[1/1]"
              />
              <span className="absolute bottom-3 left-3 hidden items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11.5px] font-medium text-white backdrop-blur-md lg:inline-flex">
                <MapPin size={11} /> Stuttgart
              </span>
            </div>
            <div className="min-w-0 lg:mt-7">
              <h1 className="font-serif text-[1.7rem] sm:text-[2.4rem] lg:text-[2.6rem] leading-[0.98] tracking-[-0.025em] font-[450]">
                Dinesh
                <br />
                Gangatharan
              </h1>
              <p className="mt-3 text-[14.5px] leading-snug text-ink-2">{t.hero.title}</p>
              <div className="mt-4">
                <Availability text={t.hero.availability} labels={t.ui} />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <SocialLinks />
          </div>

          <nav className="mt-9 hidden lg:block" aria-label="Sections">
            <ul className="space-y-0.5">
              {NAV_IDS.map((id, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`group flex items-center gap-3 py-[5px] text-[13.5px] transition-colors ${
                      active === id ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    <span className="font-mono text-[10.5px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                    <span
                      className={`h-px transition-all duration-300 ${
                        active === id ? 'w-8 bg-accent' : 'w-4 bg-line group-hover:w-6 group-hover:bg-muted'
                      }`}
                    />
                    {navLabels[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="pb-16 pt-12 lg:pt-10">
          {/* Profile statement */}
          <section id="profile" className="mb-24 md:mb-32">
            <motion.div {...reveal}>
              <MonoLabel className="text-accent">{t.ui.profile}</MonoLabel>
              <p className="mt-5 font-serif text-[1.55rem] md:text-[2.15rem] leading-[1.28] tracking-[-0.015em] text-ink-2 font-[370]">
                {emphasize(t.hero.description, emphasis[lang])}
              </p>
            </motion.div>
            <motion.dl
              {...reveal}
              className="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface md:grid-cols-4"
            >
              {t.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col-reverse justify-end gap-2 p-5 md:p-6 ${i % 2 === 1 ? 'border-l' : ''} ${
                    i >= 2 ? 'border-t md:border-t-0' : ''
                  } ${i === 2 ? 'md:border-l' : ''} border-line`}
                >
                  <dt className="text-[12.5px] leading-snug text-muted">{s.label}</dt>
                  <dd className="font-serif text-[1.6rem] md:text-[1.85rem] leading-none tracking-[-0.02em] font-[460]">
                    {s.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </section>

          {/* Experience */}
          <section id="experience" className="mb-24 md:mb-32">
            <SectionHeader index="01" title={t.sections.experience} />
            <ol>
              {t.experience.map((exp, i) => (
                <ExperienceItem
                  key={exp.id}
                  exp={exp}
                  labels={t.ui}
                  current={i === 0}
                  last={i === t.experience.length - 1}
                />
              ))}
            </ol>
          </section>

          {/* Projects */}
          <section id="projects" className="mb-24 md:mb-32">
            <SectionHeader index="02" title={t.sections.projects} />
            <FeaturedProject project={featured} labels={t.ui} />
            <div className="mt-5 grid items-start gap-5 md:grid-cols-2">
              {projects.map((p, i) => (
                <div key={p.id} className={projects.length % 2 === 1 && i === projects.length - 1 ? 'md:col-span-2' : ''}>
                  <ProjectCard project={p} labels={t.ui} />
                </div>
              ))}
            </div>
          </section>

          {/* Expertise */}
          <section id="skills" className="mb-24 md:mb-32">
            <SectionHeader index="03" title={t.sections.expertise} />
            <motion.div {...reveal} className="grid overflow-hidden rounded-2xl border border-line bg-surface sm:grid-cols-2">
              {t.skills.map((cat, i) => (
                <div
                  key={cat.title}
                  className={`p-6 md:p-8 border-line ${i > 0 ? 'border-t' : ''} ${i === 1 ? 'sm:border-t-0' : ''} ${
                    i % 2 === 1 ? 'sm:border-l' : ''
                  }`}
                >
                  <div className="mb-5 flex items-baseline gap-3">
                    <MonoLabel className="text-muted">{String(i + 1).padStart(2, '0')}</MonoLabel>
                    <h3 className="font-serif text-xl font-[480] tracking-[-0.01em]">{cat.title}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {cat.skills.map(skill => (
                      <li
                        key={skill}
                        className="rounded-full border border-line px-3 py-1 text-[13px] text-ink-2 transition-colors hover:border-accent hover:text-accent"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </section>

          {/* Education & certification */}
          <section id="education" className="mb-24 md:mb-32">
            <SectionHeader index="04" title={t.sections.education} />
            <div className="grid gap-5 md:grid-cols-[1.35fr_1fr]">
              <motion.ul {...reveal} className="divide-y divide-line rounded-2xl border border-line bg-surface">
                {t.education.map((edu, i) => (
                  <li key={edu.degree} className="flex items-center gap-5 p-6 md:p-7">
                    {educationLogos[i] && <LogoTile src={educationLogos[i]} alt={edu.school} className="w-12" />}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-lg md:text-xl font-[470] leading-snug">{edu.degree}</h3>
                      <p className="text-sm text-muted">{edu.school}</p>
                    </div>
                    <MonoLabel className="hidden shrink-0 text-muted sm:block">{edu.period}</MonoLabel>
                  </li>
                ))}
              </motion.ul>
              <motion.a
                {...reveal}
                href={links.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between gap-6 rounded-2xl border border-line bg-surface p-6 md:p-7 transition-colors hover:border-accent/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <MonoLabel className="inline-flex items-center gap-1.5 text-accent">
                      <Award size={13} /> {t.ui.certification}
                    </MonoLabel>
                    <h3 className="mt-3 font-serif text-xl font-[470] leading-snug">iSAQB CPSA-F</h3>
                    <p className="mt-1 text-sm leading-snug text-muted">{t.ui.certificationName}</p>
                  </div>
                  <img src={isaqb} alt="iSAQB CPSA-F badge" className="h-20 w-20 shrink-0" loading="lazy" />
                </div>
                <span className="inline-flex items-center gap-1 text-[13px] font-medium text-accent">
                  {t.ui.viewCertificate}
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </motion.a>
            </div>
          </section>

          {/* Languages */}
          <section id="languages" className="mb-24 md:mb-32">
            <SectionHeader index="05" title={t.sections.languages} />
            <motion.div {...reveal} className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface">
              {[
                { name: t.ui.languageNames.english, level: 'C2 Proficient' },
                { name: t.ui.languageNames.german, level: 'B2 Advanced' },
              ].map((l, i) => (
                <div key={l.name} className={`p-6 md:p-8 ${i === 1 ? 'border-l border-line' : ''}`}>
                  <MonoLabel className="text-muted">{l.level}</MonoLabel>
                  <p className="mt-2 font-serif text-2xl md:text-[2rem] font-[450] tracking-[-0.015em]">{l.name}</p>
                </div>
              ))}
            </motion.div>
          </section>

          {/* Contact */}
          <section id="contact">
            <motion.div {...reveal} className="relative overflow-hidden rounded-[28px] bg-ink p-8 text-paper md:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-accent opacity-25 blur-3xl"
              />
              <div className="relative">
                <MonoLabel className="opacity-60">06 — {t.ui.contact}</MonoLabel>
                <p className="mt-5 max-w-[22ch] font-serif text-[1.9rem] md:text-[2.8rem] leading-[1.05] tracking-[-0.02em] font-[400]">
                  {t.hero.availability}.
                </p>
                <a
                  href={`mailto:${links.email}`}
                  onClick={() => trackEvent('contact-panel-email')}
                  className="mt-8 inline-flex items-center gap-2 break-all border-b border-current/30 pb-1 text-lg md:text-xl hover:border-current transition-colors"
                >
                  {links.email}
                  <ArrowUpRight size={18} className="shrink-0" />
                </a>
                <div className="mt-8 flex flex-wrap gap-3 text-sm">
                  <a
                    href={links.linkedin}
                    onClick={() => trackEvent('contact-panel-linkedin')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-current/20 px-4 py-2 hover:border-current/60 transition-colors"
                  >
                    <LinkedInIcon size={14} /> LinkedIn
                  </a>
                  <a
                    href={links.github}
                    onClick={() => trackEvent('contact-panel-github')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-current/20 px-4 py-2 hover:border-current/60 transition-colors"
                  >
                    <GitHubIcon size={14} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[12.5px] text-muted sm:flex-row sm:justify-between">
            <span>
              © {new Date().getFullYear()} Dinesh Gangatharan · {t.ui.footer}
            </span>
            <a href="#top" className="hover:text-ink transition-colors">
              ↑ Top
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
