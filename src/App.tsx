import React, { useState } from 'react';
import { 
  Globe, 
  User, 
  Mail, 
  MapPin, 
  ExternalLink,
  Code2, 
  Briefcase, 
  GraduationCap, 
  Languages,
  ChevronRight,
  Terminal,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Language = 'en' | 'de';

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  certificateUrl?: string;
  details?: string[];
}

interface Translations {
  hero: {
    title: string;
    description: string;
    availability: string;
  };
  sections: {
    experience: string;
    expertise: string;
    education: string;
    languages: string;
  };
  experience: Experience[];
  education: {
    degree: string;
    school: string;
    period: string;
  }[];
  skills: {
    title: string;
    skills: string[];
  }[];
  ui: {
    readMore: string;
    readLess: string;
    contact: string;
    footer: string;
  };
}

const content: Record<Language, Translations> = {
  en: {
    hero: {
      title: "Software Architect",
      description: "Software Architect based in Stuttgart, Germany, specializing in cross-platform systems, cloud-native backend, and mobile innovation.",
      availability: "Available for new opportunities"
    },
    sections: {
      experience: "Experience",
      expertise: "Expertise",
      education: "Education",
      languages: "Languages"
    },
    experience: [
      {
        company: 'Gematik GmbH',
        role: 'Software Architect',
        period: 'Feb 2026 - Present',
        location: 'Remote (Berlin)',
        description: 'Leading the architectural strategy for critical E-Health infrastructure and Android applications.',
        highlights: [
          'Conception and review of FHIR-based services and KMP modules.',
          'Certified Professional for Software Architecture (iSAQB CPSA-F).',
          'Technical leadership for external projects and team consulting.',
          'Advanced CI/CD infrastructure with modular Gradle plugins.'
        ],
        certificateUrl: 'https://www.credly.com/badges/7d95218f-8be4-455a-950c-c17663d5b9e9/linked_in_profile',
        details: [
          'Architected the E-Rezept Android-App (2M+ Downloads) and FHIR-VZD Backend Token-Service for Pharmacies.',
          'Re-implemented FHIR parsing using Kotlinx Serialization and strongly typed Kotlin, migrating the app to a multi-module architecture.',
          'Managed technical integration with external partners and improved App Rating from 2.0 to 4.2 through quality improvements.',
          'Developed Demo-Mode module for Google Play Store releases.'
        ]
      },
      {
        company: 'Gematik GmbH',
        role: 'Senior Developer',
        period: 'Sep 2023 - Jan 2026',
        location: 'Remote (Berlin)',
        description: 'Senior development lead for Android-based E-Health solutions.',
        highlights: [
          'Responsibility for Android-Apps and connected backend services.',
          'Implementation of FHIR-based services and KMP modules.',
          'Mentoring junior developers and conducting architecture reviews.'
        ],
        details: [
          'Evolved CI/CD infrastructure through modular Gradle plugins and shared pipelines across multiple products.',
          'Acted as Team Lead, responsible for release cycles and presenting releases within the organization.'
        ]
      },
      {
        company: 'IBM-IX DACH',
        role: 'Senior Developer',
        period: 'Jan 2022 - Aug 2023',
        location: 'Remote (Berlin)',
        description: 'Senior development lead for high-impact healthcare solutions.',
        highlights: [
          'Developed the "Maternity Pass" feature for expectant mothers in Barmer-eCare.',
          'Led a Flutter initiative to modernize time tracking, including Python/Django backend.',
          'Leveraged Kotlin Multiplatform and SwiftUI for cross-platform development.'
        ],
        details: [
          'Collaborated closely with iOS engineers to ensure feature parity using KMP.',
          'Architected and implemented complex UI components in Barmer-eCare ensuring accessibility and performance.'
        ]
      },
      {
        company: 'Rewe Digital GmbH',
        role: 'Software Developer',
        period: 'Jul 2019 - Dec 2021',
        location: 'Cologne, Germany',
        description: 'Fullstack development for the Rewe and Penny Android applications.',
        highlights: [
          'Developed features for both Rewe and Penny apps using Kotlin and Android SDK.',
          'Designed scalable architectures using MVVM, MVP, and MVI patterns.',
          'Integrated REST APIs and Firebase for real-time services.'
        ],
        details: [
          'Worked on core features of the Rewe and Penny loyalty programs.',
          'Applied Clean Architecture principles to decouple business logic from UI.',
          'Improved app stability through rigorous testing and CI/CD integration.'
        ]
      },
      {
        company: 'Authada GmbH',
        role: 'Software Developer',
        period: 'Nov 2016 - Jun 2019',
        location: 'Darmstadt, Germany',
        description: 'Developed certifications for the Android app and migrated Java to Kotlin.',
        highlights: [
          'Applied Clean Code and MVP principles.',
          'Migrated legacy codebases to modern standards.',
          'Developed security-critical authentication features.'
        ]
      }
    ],
    education: [
      {
        degree: 'M.Sc. Electric Eng and IT',
        school: 'Technische Universität Darmstadt',
        period: '2014 — 2017',
      },
      {
        degree: 'B.E. Electric Eng',
        school: 'Anna Universität',
        period: '2006 — 2010',
      }
    ],
    skills: [
      {
        title: 'Architecture & Leadership',
        skills: ['Software Architecture', 'iSAQB CPSA-F', 'Technical Strategy', 'Team Lead']
      },
      {
        title: 'Mobile & Cross-Platform',
        skills: ['Android SDK', 'Kotlin Multiplatform', 'Flutter', 'SwiftUI']
      },
      {
        title: 'Backend & Web',
        skills: ['Node.js', 'TypeScript', 'Python', 'Django', 'FHIR', 'Firebase']
      },
      {
        title: 'DevOps & Tools',
        skills: ['CI/CD', 'Gradle Plugins', 'GitHub Actions', 'Clean Architecture']
      }
    ],
    ui: {
      readMore: "Read More Details",
      readLess: "Read Less",
      contact: "Contact",
      footer: "Stuttgart, Germany."
    }
  },
  de: {
    hero: {
      title: "Softwarearchitekt",
      description: "Softwarearchitekt mit Sitz in Stuttgart, Deutschland, spezialisiert auf plattformübergreifende Systeme, Cloud-native Backends und mobile Innovationen.",
      availability: "Verfügbar für neue Herausforderungen"
    },
    sections: {
      experience: "Berufserfahrung",
      expertise: "Fachgebiete",
      education: "Ausbildung",
      languages: "Sprachen"
    },
    experience: [
      {
        company: 'Gematik GmbH',
        role: 'Softwarearchitekt',
        period: 'Feb 2026 - Heute',
        location: 'Remote (Berlin)',
        description: 'Verantwortung für die Architekturstrategie kritischer E-Health-Infrastrukturen und Android-Anwendungen.',
        highlights: [
          'Konzeption und Review von FHIR-basierten Services und KMP-Modulen.',
          'Zertifizierter Professional für Softwarearchitektur (iSAQB CPSA-F).',
          'Technische Leitung externer Projekte und Beratung interner Teams.',
          'Modulare CI/CD-Infrastruktur mit Gradle-Plugins.'
        ],
        certificateUrl: 'https://www.credly.com/badges/7d95218f-8be4-455a-950c-c17663d5b9e9/linked_in_profile',
        details: [
          'Architektur der E-Rezept Android-App (2M+ Downloads) und des FHIR-VZD Backend Token-Service für Apotheken.',
          'Neuimplementierung des FHIR-Parsings mit Kotlinx Serialization und stark typisiertem Kotlin.',
          'Verbesserung der App-Bewertung von 2.0 auf 4.2 durch Qualitätsmaßnahmen.',
          'Entwicklung eines Demo-Modus-Moduls für Google Play Store Releases.'
        ]
      },
      {
        company: 'Gematik GmbH',
        role: 'Senior Entwickler',
        period: 'Sep 2023 - Jan 2026',
        location: 'Remote (Berlin)',
        description: 'Senior Entwicklungsleiter für Android-basierte E-Health-Lösungen.',
        highlights: [
          'Verantwortung für Android-Apps und verbundene Backend-Dienste.',
          'Implementierung von FHIR-basierten Services und KMP-Modulen.',
          'Mentoring von Junior-Entwicklern und Durchführung von Architektur-Reviews.'
        ],
        details: [
          'Weiterentwicklung der CI/CD-Infrastruktur durch modulare Gradle-Plugins.',
          'Teamleitung, verantwortlich für Release-Zyklen und Präsentationen.'
        ]
      },
      {
        company: 'IBM-IX DACH',
        role: 'Senior Entwickler',
        period: 'Jan 2022 - Aug 2023',
        location: 'Remote (Berlin)',
        description: 'Senior Entwicklungsleiter für hochkarätige Gesundheitslösungen.',
        highlights: [
          'Entwicklung der Funktion „Mutter-Pass“ für Schwangere in Barmer-eCare.',
          'Leitung einer Flutter-Initiative zur Modernisierung der Zeitmessung inkl. Backend mit Python-Django.',
          'Einsatz von Kotlin Multiplatform und SwiftUI für die plattformübergreifende Entwicklung.'
        ],
        details: [
          'Zusammenarbeit mit iOS-Ingenieuren zur Sicherstellung der Feature-Parität mittels KMP.',
          'Architektur und Implementierung komplexer UI-Komponenten unter Berücksichtigung von Barrierefreiheit.'
        ]
      },
      {
        company: 'Rewe Digital GmbH',
        role: 'Software Entwickler',
        period: 'Jul 2019 - Dec 2021',
        location: 'Köln, Deutschland',
        description: 'Fullstack-Entwicklung für die Rewe und Penny Android-Applikationen.',
        highlights: [
          'Entwicklung von Features für Rewe und Penny Apps mit Kotlin und Android SDK.',
          'Gestaltung skalierbarer Architekturen (MVVM, MVP, MVI).',
          'Integration von REST-APIs und Firebase für Echtzeit-Dienste.'
        ],
        details: [
          'Arbeit an Kernfunktionen der Rewe und Penny Treueprogramme.',
          'Anwendung von Clean Architecture Prinzipien zur Trennung von Geschäftslogik und UI.',
          'Verbesserung der App-Stabilität durch CI/CD Integration.'
        ]
      },
      {
        company: 'Authada GmbH',
        role: 'Software Entwickler',
        period: 'Nov 2016 - Jun 2019',
        location: 'Darmstadt, Deutschland',
        description: 'Entwicklung der Zertifizierung für die Android-App und Migration von Java zu Kotlin.',
        highlights: [
          'Anwendung von Clean Code und MVP-Prinzipien.',
          'Migration von Legacy-Codebasen auf moderne Standards.',
          'Entwicklung sicherheitskritischer Authentifizierungsfunktionen.'
        ]
      }
    ],
    education: [
      {
        degree: 'M.Sc. Elektrotechnik und IT',
        school: 'Technische Universität Darmstadt',
        period: '2014 — 2017',
      },
      {
        degree: 'B.E. Elektrotechnik',
        school: 'Anna Universität',
        period: '2006 — 2010',
      }
    ],
    skills: [
      {
        title: 'Architektur & Führung',
        skills: ['Softwarearchitektur', 'iSAQB CPSA-F', 'Technische Strategie', 'Teamleitung']
      },
      {
        title: 'Mobile & Cross-Plattform',
        skills: ['Android SDK', 'Kotlin Multiplatform', 'Flutter', 'SwiftUI']
      },
      {
        title: 'Backend & Web',
        skills: ['Node.js', 'TypeScript', 'Python', 'Django', 'FHIR', 'Firebase']
      },
      {
        title: 'DevOps & Tools',
        skills: ['CI/CD', 'Gradle Plugins', 'GitHub Actions', 'Clean Architecture']
      }
    ],
    ui: {
      readMore: "Mehr Details anzeigen",
      readLess: "Weniger anzeigen",
      contact: "Kontakt",
      footer: "Stuttgart, Deutschland."
    }
  }
};

const ExperienceCard: React.FC<{ exp: Experience; labels: { readMore: string; readLess: string } }> = ({ exp, labels }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid md:grid-cols-4 gap-4 group">
      <div className="text-slate-500 font-mono text-sm pt-1 uppercase tracking-widest">
        {exp.period}
      </div>
      <div className="md:col-span-3">
        <h4 className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors mb-1">
          {exp.role}
        </h4>
        <div className="flex flex-wrap items-center gap-2 text-slate-400 font-medium mb-4">
          <span>{exp.company}</span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span className="flex items-center gap-1 text-xs"><MapPin size={12} /> {exp.location}</span>
          {exp.certificateUrl && (
            <>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <a 
                href={exp.certificateUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ExternalLink size={12} /> iSAQB
              </a>
            </>
          )}
        </div>
        <p className="text-slate-400 mb-6 leading-relaxed text-lg">
          {exp.description}
        </p>
        
        <div className="space-y-4">
          <ul className="grid md:grid-cols-2 gap-3">
            {exp.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-500 text-sm group-hover:text-slate-400 transition-colors">
                <ChevronRight size={14} className="text-blue-500/50 shrink-0 mt-1" />
                {h}
              </li>
            ))}
          </ul>

          {exp.details && (
            <div className="pt-2">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors group/btn"
              >
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                {isOpen ? labels.readLess : labels.readMore}
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-2 pl-4 border-l border-slate-800">
                      {exp.details.map((detail, i) => (
                        <li key={i} className="text-slate-500 text-sm leading-relaxed">
                          • {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const t = content[lang];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Language Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-xl"
        >
          <Languages size={16} className="text-blue-400" />
          {lang === 'en' ? 'Deutsch' : 'English'}
        </button>
      </div>

      {/* Hero Section */}
      <header className="relative max-w-5xl mx-auto pt-32 pb-24 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <Terminal size={14} /> {t.hero.availability}
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
              Dinesh
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Gangatharan
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed mb-10">
            {t.hero.description.split(',').map((part, i) => (
              <span key={i}>
                {i > 0 && ','}
                {part.includes('Stuttgart') || part.includes('cross-platform') || part.includes('cloud-native') || part.includes('mobile') || part.includes('Softwarearchitekt') ? (
                  <span className="text-slate-100">{part}</span>
                ) : part}
              </span>
            ))}
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-3">
              <a href="https://github.com/dineshvg" target="_blank" className="p-3 bg-slate-900/50 rounded-full hover:bg-slate-800 transition-colors border border-slate-800 hover:border-slate-700">
                <Globe size={20} />
              </a>
              <a href="https://www.linkedin.com/in/dineshvg2310/" target="_blank" className="p-3 bg-slate-900/50 rounded-full hover:bg-slate-800 transition-colors border border-slate-800 hover:border-slate-700">
                <User size={20} />
              </a>
              <a href="mailto:dineshvg1023@gmail.com" className="p-3 bg-slate-900/50 rounded-full hover:bg-slate-800 transition-colors border border-slate-800 hover:border-slate-700">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </header>

      <main className="relative max-w-5xl mx-auto px-6 pb-32 space-y-32">
        {/* Experience Section */}
        <motion.section {...fadeIn} id="experience">
          <div className="flex items-center gap-3 mb-16">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Briefcase size={24} />
            </div>
            <h3 className="text-4xl font-bold tracking-tight">{t.sections.experience}</h3>
          </div>
          <div className="space-y-16">
            {t.experience.map((exp, idx) => (
              <ExperienceCard key={idx} exp={exp} labels={{ readMore: t.ui.readMore, readLess: t.ui.readLess }} />
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section {...fadeIn} id="skills">
          <div className="flex items-center gap-3 mb-16">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <Code2 size={24} />
            </div>
            <h3 className="text-4xl font-bold tracking-tight">{t.sections.expertise}</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.skills.map((cat, idx) => (
              <div key={idx} className="p-8 bg-slate-900/30 rounded-3xl border border-slate-800/50 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
                <h4 className="text-sm font-mono text-emerald-400 mb-6 uppercase tracking-widest">{cat.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-lg text-xs border border-slate-700/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education & Info */}
        <div className="grid md:grid-cols-2 gap-16">
          <motion.section {...fadeIn} id="education">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-3xl font-bold">{t.sections.education}</h3>
            </div>
            <div className="space-y-8 pl-4 border-l border-slate-800">
              {t.education.map((edu, idx) => (
                <div key={idx}>
                  <h4 className="text-lg font-bold text-slate-100">{edu.degree}</h4>
                  <p className="text-slate-400">{edu.school}</p>
                  <p className="text-slate-500 text-sm font-mono mt-1">{edu.period}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section {...fadeIn} id="languages">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                <Languages size={24} />
              </div>
              <h3 className="text-3xl font-bold">{t.sections.languages}</h3>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-800/50">
                <p className="text-xs font-mono text-slate-500 uppercase mb-2">English</p>
                <p className="text-xl font-bold text-slate-200">C2 Proficient</p>
              </div>
              <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-800/50">
                <p className="text-xs font-mono text-slate-500 uppercase mb-2">German</p>
                <p className="text-xl font-bold text-slate-200">B2 Advanced</p>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <footer className="relative max-w-5xl mx-auto px-6 py-20 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Dinesh Gangatharan. {t.ui.footer}</p>
        <div className="flex gap-6">
          <a href="#experience" className="hover:text-blue-400 transition-colors">{t.sections.experience}</a>
          <a href="#skills" className="hover:text-emerald-400 transition-colors">{t.sections.expertise}</a>
          <a href="mailto:dineshvg1023@gmail.com" className="hover:text-white transition-colors">{t.ui.contact}</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
