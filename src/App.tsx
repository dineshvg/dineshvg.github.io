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
  Minus,
  Palette,
  Layout,
  MessageCircle,
  Heart,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Language = 'en' | 'de';
type DesignTheme = 'sleek' | 'material3';

interface Experience {
  id: string;
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
    designSleek: string;
    designMaterial3: string;
    commentsTitle: string;
    commentPlaceholder: string;
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
        id: 'gematik-arch',
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
        id: 'gematik-sr',
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
        id: 'ibm',
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
        id: 'rewe',
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
          'Improved app stability through Microsoft AppCenter and CI/CD integration.'
        ]
      },
      {
        id: 'authada',
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
      footer: "Stuttgart, Germany.",
      designSleek: "Sleek Dark",
      designMaterial3: "Material 3",
      commentsTitle: "Comments",
      commentPlaceholder: "Write a comment..."
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
        id: 'gematik-arch',
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
        id: 'gematik-sr',
        company: 'Gematik GmbH',
        role: 'Senior Entwickler',
        period: 'Sep 2023 - Jan 2026',
        location: 'Remote (Berlin)',
        description: 'Senior Entwicklungsleiter für Android-basierte E-Health-Lösungen.',
        highlights: [
          'Verantwortung für Android-Apps and verbundene Backend-Dienste.',
          'Implementierung von FHIR-basierten Services und KMP-Modulen.',
          'Mentoring von Junior-Entwicklern und Durchführung von Architektur-Reviews.'
        ],
        details: [
          'Weiterentwicklung der CI/CD-Infrastruktur durch modulare Gradle-Plugins.',
          'Teamleitung, verantwortlich für Release-Zyklen und Präsentationen.'
        ]
      },
      {
        id: 'ibm',
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
        id: 'rewe',
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
        id: 'authada',
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
      footer: "Stuttgart, Deutschland.",
      designSleek: "Sleek Dark",
      designMaterial3: "Material 3",
      commentsTitle: "Kommentare",
      commentPlaceholder: "Schreibe einen Kommentar..."
    }
  }
};

const ExperienceCard: React.FC<{ 
  exp: Experience; 
  theme: DesignTheme; 
  labels: Translations['ui'];
  isLiked: boolean;
  onLike: () => void;
  comments: string[];
  onAddComment: (text: string) => void;
}> = ({ exp, theme, labels, isLiked, onLike, comments, onAddComment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  
  const isM3 = theme === 'material3';

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  if (isM3) {
    return (
      <div className="bg-slate-900 rounded-[32px] shadow-2xl border border-slate-800/50 overflow-hidden group transition-all hover:border-blue-500/30">
        <div className="p-8">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-black text-xl border border-blue-500/20">
              {exp.company[0]}
            </div>
            <div>
              <h4 className="font-black text-white text-2xl leading-tight tracking-tight">{exp.role}</h4>
              <p className="text-blue-400 text-sm font-bold uppercase tracking-widest">{exp.company}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6">
             <span className="flex items-center gap-1 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">{exp.period}</span>
             <span className="flex items-center gap-1 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50"><MapPin size={12} /> {exp.location}</span>
          </div>

          <p className="text-slate-300 mb-8 leading-relaxed text-lg">
            {exp.description}
          </p>

          <div className="space-y-6">
            <ul className="grid md:grid-cols-2 gap-4">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  {h}
                </li>
              ))}
            </ul>

            {exp.details && (
              <div className="pt-2">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-slate-800/50 text-blue-400 rounded-[20px] text-sm font-black uppercase tracking-widest border border-slate-700/50 hover:bg-slate-800 transition-all active:scale-[0.98]"
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
                      className="overflow-hidden"
                    >
                      <ul className="mt-6 space-y-4 p-6 bg-slate-950/50 rounded-[24px] border border-slate-800/50">
                        {exp.details.map((detail, i) => (
                          <li key={i} className="text-slate-400 text-sm leading-relaxed flex gap-3">
                            <span className="text-blue-500 font-black">•</span> {detail}
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

        {/* Interaction Bar */}
        <div className="bg-slate-950/50 px-8 py-4 flex flex-col border-t border-slate-800/50">
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-6">
              <button 
                onClick={onLike}
                className={`flex items-center gap-2 transition-all active:scale-125 ${isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-400'}`}
              >
                <Heart size={22} fill={isLiked ? "currentColor" : "none"} />
                <span className="text-xs font-black">{isLiked ? 1 : 0}</span>
              </button>
              <button 
                onClick={() => setShowComments(!showComments)}
                className={`flex items-center gap-2 transition-all ${showComments ? 'text-blue-400' : 'text-slate-500 hover:text-blue-400'}`}
              >
                <MessageCircle size={22} />
                <span className="text-xs font-black">{comments.length}</span>
              </button>
            </div>
            {exp.certificateUrl && (
              <a 
                href={exp.certificateUrl} 
                target="_blank" 
                className="text-blue-400 font-black text-[10px] uppercase tracking-widest hover:text-blue-300 transition-colors bg-blue-500/5 px-3 py-1.5 rounded-full border border-blue-500/10"
              >
                iSAQB Certificate
              </a>
            )}
          </div>

          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pt-4"
              >
                <div className="space-y-3 mb-6 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                  {comments.length === 0 ? (
                    <p className="text-slate-600 text-[10px] italic font-medium uppercase tracking-widest text-center py-2">No comments yet</p>
                  ) : (
                    comments.map((c, i) => (
                      <div key={i} className="bg-slate-900 p-3 rounded-2xl border border-slate-800/50">
                        <p className="text-slate-300 text-xs leading-relaxed">{c}</p>
                      </div>
                    ))
                  )}
                </div>
                <form onSubmit={handleCommentSubmit} className="relative">
                  <input 
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={labels.commentPlaceholder}
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all pr-12"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

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
  const [theme, setTheme] = useState<DesignTheme>('sleek');
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, string[]>>({});
  
  const t = content[lang];
  const isM3 = theme === 'material3';

  const toggleLike = (id: string) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addComment = (id: string, text: string) => {
    setComments(prev => ({ ...prev, [id]: [...(prev[id] || []), text] }));
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-500 ${isM3 ? 'bg-slate-950 text-slate-200' : 'bg-[#020617] text-slate-200'}`}>
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[10%] -left-[10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-colors duration-1000 ${isM3 ? 'bg-blue-600/10' : 'bg-blue-500/10'}`} />
        <div className={`absolute top-[20%] -right-[10%] w-[30%] h-[30%] blur-[120px] rounded-full transition-colors duration-1000 ${isM3 ? 'bg-indigo-600/10' : 'bg-emerald-500/5'}`} />
      </div>

      {/* Top Bar Controls */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
        <div className={`flex gap-2 p-1.5 rounded-full backdrop-blur-xl border shadow-2xl transition-colors ${isM3 ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-900/80 border-slate-800'}`}>
          <button 
            onClick={() => setTheme('sleek')}
            className={`px-5 py-2.5 rounded-full text-xs font-black transition-all tracking-widest ${theme === 'sleek' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-slate-400 hover:text-white'}`}
          >
            SLEEK
          </button>
          <button 
            onClick={() => setTheme('material3')}
            className={`px-5 py-2.5 rounded-full text-xs font-black transition-all tracking-widest ${theme === 'material3' ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' : 'text-slate-400 hover:text-white'}`}
          >
            MATERIAL 3
          </button>
          <div className={`w-[1px] my-2 bg-slate-700`} />
          <button 
            onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
            className={`px-5 py-2.5 rounded-full text-xs font-black transition-all tracking-widest ${isM3 ? 'text-indigo-400 hover:text-white' : 'text-blue-400 hover:text-white'}`}
          >
            {lang.toUpperCase()}
          </button>
        </div>
      </div>

      <div className={`mx-auto max-w-5xl transition-all duration-700 ${isM3 ? 'pt-32 pb-32' : 'pt-32 pb-32'}`}>
        
        {/* Hero Section */}
        <header className="px-6 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest mb-8 transition-colors ${isM3 ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
              <Terminal size={14} /> {t.hero.availability}
            </div>
            
            <h1 className={`font-black tracking-tight mb-6 leading-[0.9] ${isM3 ? 'text-7xl md:text-8xl lg:text-9xl' : 'text-6xl md:text-8xl'}`}>
              <span className={isM3 ? 'text-white' : 'bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent'}>Dinesh</span>
              <br />
              <span className={isM3 ? 'text-indigo-500' : 'bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent'}>
                Gangatharan
              </span>
            </h1>

            <p className={`mb-10 leading-relaxed ${isM3 ? 'text-slate-400 text-xl md:text-2xl font-medium' : 'text-slate-400 text-xl md:text-2xl max-w-2xl'}`}>
              {t.hero.description.split(',').map((part, i) => (
                <span key={i}>
                  {i > 0 && ','}
                  {part.includes('Stuttgart') || part.includes('cross-platform') || part.includes('cloud-native') || part.includes('mobile') || part.includes('Softwarearchitekt') ? (
                    <span className={isM3 ? 'text-white' : 'text-slate-100'}>{part}</span>
                  ) : part}
                </span>
              ))}
            </p>
            
            <div className={`flex flex-wrap gap-4 items-center`}>
              <div className="flex gap-4">
                <a href="https://github.com/dineshvg" target="_blank" className={`p-5 rounded-[24px] transition-all border ${isM3 ? 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800 hover:border-indigo-500/30' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-700'}`}>
                  <Globe size={24} />
                </a>
                <a href="https://www.linkedin.com/in/dineshvg2310/" target="_blank" className={`p-5 rounded-[24px] transition-all border ${isM3 ? 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800 hover:border-indigo-500/30' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-700'}`}>
                  <User size={24} />
                </a>
                <a href="mailto:dineshvg1023@gmail.com" className={`p-5 rounded-[24px] transition-all border ${isM3 ? 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800 hover:border-indigo-500/30' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-700'}`}>
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </header>

        <main className="px-6 space-y-32">
          {/* Experience Section */}
          <motion.section {...fadeIn} id="experience">
            <div className={`flex items-center gap-4 mb-16`}>
              <div className={`p-3 rounded-2xl ${isM3 ? 'bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.5)] text-white' : 'bg-blue-500/10 text-blue-400'}`}>
                <Briefcase size={28} />
              </div>
              <h3 className={`font-black uppercase tracking-tight leading-none ${isM3 ? 'text-5xl text-white' : 'text-4xl'}`}>
                {t.sections.experience}
              </h3>
            </div>
            <div className="space-y-12">
              {t.experience.map((exp, idx) => (
                <ExperienceCard 
                  key={idx} 
                  exp={exp} 
                  theme={theme} 
                  labels={t.ui}
                  isLiked={!!likes[exp.id]}
                  onLike={() => toggleLike(exp.id)}
                  comments={comments[exp.id] || []}
                  onAddComment={(text) => addComment(exp.id, text)}
                />
              ))}
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section {...fadeIn} id="skills">
            <div className={`flex items-center gap-4 mb-16`}>
              <div className={`p-3 rounded-2xl ${isM3 ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] text-white' : 'bg-emerald-500/10 text-emerald-400'}`}>
                <Code2 size={28} />
              </div>
              <h3 className={`font-black uppercase tracking-tight leading-none ${isM3 ? 'text-5xl text-white' : 'text-4xl'}`}>
                {t.sections.expertise}
              </h3>
            </div>
            <div className={`grid gap-6 ${isM3 ? 'grid-cols-1 md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
              {t.skills.map((cat, idx) => (
                <div key={idx} className={`p-10 rounded-[40px] border transition-all ${isM3 ? 'bg-slate-900 border-slate-800/50 hover:border-blue-500/30' : 'bg-slate-900/30 border-slate-800/50 hover:border-emerald-500/30'}`}>
                  <h4 className={`text-xs font-black mb-8 uppercase tracking-widest ${isM3 ? 'text-blue-400' : 'text-emerald-400'}`}>{cat.title}</h4>
                  <div className="flex flex-wrap gap-3">
                    {cat.skills.map((skill, i) => (
                      <span key={i} className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${isM3 ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-slate-800/50 text-slate-300 border-slate-700/30'}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Education & Info */}
          <div className={`grid gap-20 ${isM3 ? 'grid-cols-1 md:grid-cols-2' : 'md:grid-cols-2'}`}>
            <motion.section {...fadeIn} id="education">
              <div className={`flex items-center gap-4 mb-12`}>
                <div className={`p-3 rounded-2xl ${isM3 ? 'bg-indigo-600 text-white' : 'bg-purple-500/10 text-purple-400'}`}>
                  <GraduationCap size={28} />
                </div>
                <h3 className={`font-black uppercase tracking-tight ${isM3 ? 'text-4xl text-white' : 'text-3xl'}`}>{t.sections.education}</h3>
              </div>
              <div className={`space-y-10 pl-6 border-l-4 ${isM3 ? 'border-indigo-500/20' : 'border-slate-800'}`}>
                {t.education.map((edu, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[30px] top-2 w-3 h-3 rounded-full ${isM3 ? 'bg-indigo-500' : 'bg-purple-500'}`} />
                    <h4 className="font-black text-white uppercase text-lg tracking-tight mb-2">{edu.degree}</h4>
                    <p className="text-slate-500 font-bold">{edu.school}</p>
                    <p className={`text-[11px] font-black mt-3 uppercase tracking-[0.2em] ${isM3 ? 'text-indigo-400' : 'text-slate-500'}`}>{edu.period}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section {...fadeIn} id="languages">
              <div className={`flex items-center gap-4 mb-12`}>
                <div className={`p-3 rounded-2xl ${isM3 ? 'bg-rose-500 text-white' : 'bg-rose-500/10 text-rose-400'}`}>
                  <Languages size={28} />
                </div>
                <h3 className={`font-black uppercase tracking-tight ${isM3 ? 'text-4xl text-white' : 'text-3xl'}`}>{t.sections.languages}</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className={`p-8 rounded-[32px] border ${isM3 ? 'bg-slate-900 border-slate-800/50' : 'bg-slate-900/30 border-slate-800/50'}`}>
                  <p className={`text-[10px] font-black uppercase mb-3 tracking-widest ${isM3 ? 'text-rose-400' : 'text-slate-500'}`}>English</p>
                  <p className={`text-xl font-black text-white`}>C2 Proficient</p>
                </div>
                <div className={`p-8 rounded-[32px] border ${isM3 ? 'bg-slate-900 border-slate-800/50' : 'bg-slate-900/30 border-slate-800/50'}`}>
                  <p className={`text-[10px] font-black uppercase mb-3 tracking-widest ${isM3 ? 'text-rose-400' : 'text-slate-500'}`}>German</p>
                  <p className={`text-xl font-black text-white`}>B2 Advanced</p>
                </div>
              </div>
            </motion.section>
          </div>
        </main>

        <footer className={`px-6 py-32 border-t flex flex-col justify-center items-center gap-12 text-xs transition-colors ${isM3 ? 'border-slate-800/50 text-slate-500' : 'border-slate-900/50 text-slate-500'}`}>
          <div className={`flex gap-10 font-black uppercase tracking-[0.3em]`}>
            <a href="#experience" className={`transition-colors ${isM3 ? 'hover:text-indigo-400' : 'hover:text-blue-400'}`}>{t.sections.experience}</a>
            <a href="#skills" className={`transition-colors ${isM3 ? 'hover:text-indigo-400' : 'hover:text-emerald-400'}`}>{t.sections.expertise}</a>
          </div>
          <p className="font-bold tracking-widest uppercase text-[10px] text-slate-600">© {new Date().getFullYear()} Dinesh Gangatharan • {t.ui.footer}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
