export type Language = 'en' | 'de';

export interface Experience {
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

export interface Project {
  id: string;
  title: string;
  badge: string;
  category: string;
  period?: string;
  description: string;
  highlights: string[];
  details?: string[];
  tags: string[];
  iconType: 'kmp' | 'auth' | 'server' | 'ehealth' | 'ai';
  links?: { label: string; url: string }[];
}

export interface Translations {
  hero: {
    title: string;
    description: string;
    availability: string;
  };
  sections: {
    experience: string;
    projects: string;
    expertise: string;
    education: string;
    languages: string;
    aiOpenSource: string;
  };
  experience: Experience[];
  projects: Project[];
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
    certification: string;
    certificationName: string;
    viewCertificate: string;
    featured: string;
    profile: string;
    toggleTheme: string;
    languageNames: { english: string; german: string };
    contactEmail: string;
    contactLinkedIn: string;
    emailSubject: string;
    downloadPdf: string;
  };
  stats: { value: string; label: string }[];
}

export const content: Record<Language, Translations> = {
  en: {
    hero: {
      title: "Software Architect & Lead Android Developer",
      description: "Software Architect and Lead Android Developer based in Stuttgart, Germany, specializing in Telematics Infrastructure (PoPP & Das E-Rezept app for android platform), cross-platform systems (KMP), Push-Gateway services, and secure mobile architectures.",
      availability: "Available for new opportunities"
    },
    sections: {
      experience: "Experience",
      projects: "Architecture & Systems",
      expertise: "Expertise",
      education: "Education",
      languages: "Languages",
      aiOpenSource: "AI & Open Source"
    },
    projects: [
      {
        id: 'e-rezept-app',
        title: 'Das E-Rezept app for android platform & Push-Gateway',
        badge: '2M+ Active Users • Lead Android Dev',
        category: 'Flagship E-Health App & Infrastructure',
        period: '2023 — Present',
        description: 'Lead Android engineering and system architecture for Germany\'s official Das E-Rezept app for android platform (2M+ active users) and the connected Push-Gateway backend service. Responsible for end-to-end push notification delivery, secure app-to-app intent handling, FHIR communication, and release engineering.',
        iconType: 'ehealth',
        highlights: [
          'Lead Android Developer overseeing core architecture, feature delivery, and release cycles (1.20+).',
          'Engineered Push-Gateway integration for secure notification dispatching and target app validation.',
          'Deep intent handling and App Link architecture for seamless external authentication jumps.',
          'Elevated Google Play Store app rating from 2.0 to 4.2+ through stability, accessibility, and UX improvements.'
        ],
        details: [
          'Implemented complex Room database schema migrations with automated validation suites and migration guides.',
          'Engineered Push activation workflows, startup crash mitigation, and battery-friendly delivery optimization.',
          'Co-developed backend Push-Gateway logic ensuring app ID validation and filtering illegal push attempts.',
          'Migrated core architecture to modular Kotlin and established reusable CI/CD convention plugins across teams.'
        ],
        tags: ['Android SDK', 'Das E-Rezept (Android)', 'Push-Gateway', 'Push Notifications (FCM)', 'Room DB', 'FHIR', 'Clean Architecture', 'CI/CD']
      },
      {
        id: 'popp-sdk',
        title: 'PoPP Mobile SDK (Kotlin Multiplatform)',
        badge: 'Telematics Infrastructure',
        category: 'Kotlin Multiplatform SDK',
        period: '2026 — Present',
        description: 'UI-decoupled multi-module Kotlin Multiplatform (Android, iOS, Desktop JVM) SDK implementing Proof of Patient Presence (PoPP) for statutory health insurance apps ("Kassen-Apps"). Connects patients to German Telematics Infrastructure via secure NFC smartcard PACE protocols and FHIR directory search.',
        iconType: 'kmp',
        highlights: [
          'Headless API facade and reactive state coordinator for clean UI decoupling.',
          'Clean multi-module separation across domain models, QR validation, directory services, scenario engine, and native NFC platform layer.',
          'Native NFC smartcard communication (Android IsoDep, iOS CoreNFC, Desktop PC/SC) executing PACE APDU scenarios.',
          'Gematik ZETA Zero-Trust SDK integration with PEP/PDP attestation and OAuth protected resources.'
        ],
        details: [
          'Architected multi-module Kotlin Multiplatform refactor enabling clean dependency injection and real-time WebSocket channels for secure smartcard APDU scenarios.',
          'Integrated resilient FHIR-based Directory Service (VZD) clients and cross-platform camera capture (CameraX / AVFoundation) for Telematik-ID QR validation.'
        ],
        tags: ['Kotlin Multiplatform', 'Android / iOS / JVM', 'NFC & Smartcard', 'PACE Protocol', 'ZETA Zero-Trust', 'FHIR VZD', 'Ktor Client', 'CameraX']
      },
      {
        id: 'gesundheit-mock-idp',
        title: 'Gesundheit with mock sectoral ID implementation',
        badge: 'Auth & Sectoral ID',
        category: 'App-to-App Auth & Mock IDP',
        period: '2026 — Present',
        description: 'Engineered rapid development and test architecture for mobile App-to-App authentication between healthcare applications and Gesundheit with mock sectoral ID implementation. Built a standalone JVM Ktor Mock IDP server in Docker with EC P-256 JWKs, RFC 7636 PKCE, and WebSocket token streaming, eliminating external IDP and smartcard friction during development and partner integration.',
        iconType: 'auth',
        highlights: [
          'Direct inter-app custom URI scheme navigation bypassing browser redirects and central IDP.',
          'Standalone JVM Ktor Mock IDP server running locally and containerized via Docker Compose.',
          'Cryptographic Elliptic Curve (P-256) JWK key generation, signing, and JWE client attestation validation.'
        ],
        details: [
          'Designed real-time WebSocket token streaming to automatically synchronize authorization states between caller and authenticator apps.',
          'Clean Architecture implementation featuring animated 4-step UX with configurable showcase latency for partner demos.',
          'Eliminated development blockers by enabling end-to-end authentication testing completely offline on USB devices via adb reverse.',
          'Implemented RFC 7636 PKCE SHA-256 code challenge verification preventing authorization code interception.'
        ],
        tags: ['JVM Ktor', 'Docker Compose', 'Mock Sectoral IDP', 'OIDC & PKCE', 'EC P-256 JWK', 'WebSockets', 'Android Deep Linking', 'Clean Architecture']
      },
      {
        id: 'popp-reference',
        title: 'PoPP Reference Integration & Local Dev Environment',
        badge: 'Integration & Testing',
        category: 'Local Dev Stack & ZETA Validation',
        period: '2026 — Present',
        description: 'Configured and utilized the PoPP reference environment to validate client SDK integration, mobile-to-backend flows, and ZETA Zero-Trust connectivity. Maintained local dev overrides, attestation bypass configurations, and integration test verification suites.',
        iconType: 'server',
        highlights: [
          'Configured local Docker Compose environment (reference server, ZETA ingress proxy, OPA) for mobile client testing.',
          'Set up development attestation bypass and dev proxy to tunnel physical USB test devices.',
          'Validated end-to-end patient check-in workflows and APDU exchanges against reference server implementations.',
          'Tested ZETA SDK integration and session handling against OPA policy enforcement layers.'
        ],
        details: [
          'Maintained compose overrides and local test configurations enabling rapid turnaround for mobile engineers.',
          'Troubleshot network bridging, adb port forwarding, and TLS proxy handshakes on physical Android & iOS devices.',
          'Validated smartcard public key extraction responses using simulated virtual card images.',
          'Documented step-by-step developer guides and troubleshooting runbooks for external client teams.'
        ],
        tags: ['Docker Compose', 'PoPP Reference Stack', 'ZETA Dev Proxy', 'Integration Testing', 'Microservices', 'Network Bridging']
      },
      {
        id: 'ai-agent-skills',
        title: 'AI Agent Skills: Health Plan & Portfolio Generator',
        badge: 'Open Source • AI Agents',
        category: 'Agent Skills & Automation Templates',
        period: '2026',
        description: 'Engineered modular AI agent skills (for Claude Code, Cursor, Gemini) that autonomously build complete applications. The Portfolio Generator interviews users or parses CVs to create a customized React web app, while the Health Plan skill computes nutritional targets and generates an offline-first PWA.',
        iconType: 'ai',
        links: [
          { label: 'Health App', url: 'https://github.com/dineshvg/health-plan-app' },
          { label: 'Portfolio Template', url: 'https://github.com/dineshvg/dineshvg.github.io' },
          { label: 'Article', url: 'https://medium.com/@dineshvg.1023/i-asked-an-ai-agent-for-a-health-plan-it-built-me-an-app-0fef893d8da4' }
        ],
        highlights: [
          'Engineered skill files that guide AI agents to extract user data, execute complex business logic, and autonomously generate functional software.',
          'Portfolio Generator: Automatically customizes a React template, configures a GitHub Pages repository, and injects attribution footers.',
          'Health Plan App: Computes energy targets, writes dietary plans, and outputs an installable PWA connected to a private Google Sheets backend.'
        ],
        details: [
          'Implemented fallback strategies to handle missing inputs (e.g., providing markdown templates when CV parsing fails).',
          'Enforced safety boundaries in prompt instructions to prevent destructive modifications to original repositories.'
        ],
        tags: ['AI Agents', 'Agent Skills', 'Claude Code', 'React', 'PWA', 'Automation']
      },
      {
        id: 'android-mcp-testing',
        title: 'MCP server for AI-driven Android app testing',
        badge: 'AI Agents • App Testing',
        category: 'AI Agents & Kotlin Multiplatform',
        period: '2026',
        description: 'A Kotlin Multiplatform system that lets any MCP-compatible AI agent (Claude, Gemini, Cursor) test Android apps on real devices using plain-language prompts. An MCP Server exposes device-control tools, a Cloudflare Worker relay bridges commands over WebSocket, and an Android Companion app executes them via AccessibilityService — no source code, emulators, or scripted UI tests required.',
        iconType: 'ai',
        highlights: [
          'Natural-language test scenarios replace scripted UI tests — describe what to verify, and the AI agent drives the device.',
          'Architecture integrates a JVM MCP Server, Cloudflare Durable Objects relay, and an Android Companion app with shared KMP models.',
          'MCP tools give agents full device control.',
          'AccessibilityService-based automation works on any installed app without needing its source code.'
        ],
        details: [
          'Shared Kotlin Multiplatform module for commands and models eliminates serialization drift between server and device.',
          'Cloudflare Durable Objects maintain persistent WebSocket sessions, enabling remote testing from any network without direct device access.',
          'Screenshot capture returns base64 images for visual assertion; accessibility-tree queries expose the full UI hierarchy for element discovery.',
          'Built with Ktor for HTTP/WebSocket, Kotlinx Serialization, Jetpack Compose for the companion app UI, and Gradle version catalogs across all modules.'
        ],
        tags: ['Kotlin Multiplatform', 'MCP', 'AI Agents', 'Android', 'AccessibilityService', 'Cloudflare Workers', 'Ktor', 'WebSockets']
      }
    ],
    experience: [
      {
        id: 'gematik-arch',
        company: 'Gematik GmbH',
        role: 'Lead Android Developer & Software Architect',
        period: 'Feb 2026 - Present',
        location: 'Remote (Berlin)',
        description: 'Leading the architectural strategy and Android mobile engineering for critical German E-Health infrastructure (Das E-Rezept app for android platform & Proof of Patient Presence / PoPP), Push-Gateway messaging services, and Kotlin Multiplatform SDKs.',
        highlights: [
          'Lead Android Developer & Architect for Das E-Rezept app for android platform with 2M+ active users.',
          'Architected the Proof of Patient Presence (PoPP) mobile client ecosystem and multiplatform SDK for German health insurance apps.',
          'Engineered Push-Gateway integration for secure, end-to-end push notification routing and app ID validation across TI services.',
          'Designed App-to-App authentication and local Mock IDP architecture for Gesundheit with mock sectoral ID implementation with RFC 7636 PKCE.',
          'Certified Professional for Software Architecture (iSAQB CPSA-F).'
        ],
        certificateUrl: 'https://www.credly.com/badges/7d95218f-8be4-455a-950c-c17663d5b9e9/linked_in_profile',
        details: [
          'Directed core mobile architecture and release engineering for Das E-Rezept app for android platform (1.20+ releases), external auth intent handling, and Room database migrations.',
          'Architected end-to-end Push-Gateway messaging: Developed client activation/delivery in Das E-Rezept app for android platform and backend routing in push-gateway (target app ID resolution, app ID security validation).',
          'Designed and modularized the PoPP Multiplatform SDK: A UI-decoupled, multi-tier KMP architecture for statutory health insurance apps featuring a headless facade, robust domain modeling, and native platform integration.',
          'Built local app-to-app authentication for Gesundheit with mock sectoral ID implementation: High-performance JVM Ktor Mock IDP server supporting EC P-256 JWKs, PKCE, and real-time WebSocket token streaming.',
          'Integrated and validated against the PoPP reference environment using Docker Compose, dev attestation bypass, and E2E verification suites.'
        ]
      },
      {
        id: 'gematik-sr',
        company: 'Gematik GmbH',
        role: 'Lead Developer',
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
        skills: ['Software Architecture', 'Lead Android Developer', 'iSAQB CPSA-F', 'Zero-Trust (ZETA)', 'OIDC & PKCE', 'Technical Strategy']
      },
      {
        title: 'Mobile & Cross-Platform',
        skills: ['Android SDK', 'Das E-Rezept (Android)', 'Kotlin Multiplatform (KMP)', 'Smartcard NFC (APDU)', 'PACE Protocol', 'Jetpack Compose']
      },
      {
        title: 'Backend & Messaging',
        skills: ['Push-Gateway (FCM)', 'JVM Ktor', 'Docker Compose', 'FHIR & VZD', 'WebSockets', 'Open Policy Agent (OPA)']
      },
      {
        title: 'DevOps & Quality',
        skills: ['CI/CD (Jenkins / Actions)', 'Modular Gradle Plugins', 'Room DB Migrations', 'Clean Architecture', 'OpenAPI Specs']
      }
    ],
    ui: {
      readMore: "Read More Details",
      readLess: "Read Less",
      contact: "Contact",
      footer: "Stuttgart, Germany.",
      certification: "Certification",
      certificationName: "Certified Professional for Software Architecture – Foundation Level",
      viewCertificate: "View certificate",
      featured: "Featured",
      profile: "Profile",
      toggleTheme: "Toggle light and dark mode",
      languageNames: { english: "English", german: "German" },
      contactEmail: "Send an email",
      contactLinkedIn: "Message on LinkedIn",
      emailSubject: "Opportunity via your website",
      downloadPdf: "Download Resume"
    },
    stats: [
      { value: "2M+", label: "Active E-Rezept app users" },
      { value: "2.0 → 4.2+", label: "Play Store rating" },
      { value: "Since 2016", label: "Building Android apps" },
      { value: "CPSA-F", label: "iSAQB certified architect" }
    ]
  },
  de: {
    hero: {
      title: "Softwarearchitekt & Lead Android Developer",
      description: "Softwarearchitekt und Lead Android Developer mit Sitz in Stuttgart, Deutschland, spezialisiert auf Telematikinfrastruktur (PoPP & Das E-Rezept App für die Android-Plattform), plattformübergreifende Systeme (KMP), Push-Gateway-Dienste und sichere mobile Architekturen.",
      availability: "Verfügbar für neue Herausforderungen"
    },
    sections: {
      experience: "Berufserfahrung",
      projects: "Architektur & Systeme",
      expertise: "Fachgebiete",
      education: "Ausbildung",
      languages: "Sprachen",
      aiOpenSource: "KI & Open Source"
    },
    projects: [
      {
        id: 'e-rezept-app',
        title: 'Das E-Rezept App für die Android-Plattform & Push-Gateway',
        badge: '2M+ Aktive Nutzer • Lead Android Dev',
        category: 'Nationale E-Health App & Infrastruktur',
        period: '2023 — Heute',
        description: 'Lead Android-Entwicklung und Systemarchitektur für die offizielle Das E-Rezept App für die Android-Plattform (über 2 Mio. Nutzer) und den angebundenen Push-Gateway-Backend-Dienst. Verantwortung für Push-Notification-Routing, sicheres Intent-Handling, FHIR-Kommunikation und Release-Zyklen.',
        iconType: 'ehealth',
        highlights: [
          'Lead Android Developer mit Gesamtverantwortung für Kernarchitektur, Feature-Entwicklung und Releases (1.20+).',
          'Architektur der Push-Gateway-Anbindung für sichere Benachrichtigungen und Ziel-App-Validierung.',
          'Sicheres Intent-Handling und App-Links für reibungslose externe Authentifizierungssprünge.',
          'Steigerung der Play-Store-Bewertung von 2.0 auf 4.2+ durch Stabilitäts- und Barrierefreiheitsmaßnahmen.'
        ],
        details: [
          'Implementierung komplexer Room-Datenbankmigrationen mit automatisierten Validierungssuiten und Migrationsleitfäden.',
          'Entwicklung von Push-Aktivierungsdialogen, Startup-Crash-Prävention und optimierter Auslieferung.',
          'Mitwirkung an Push-Gateway-Backend-Logik zur App-ID-Validierung und Abwehr unberechtigter Push-Anfragen.',
          'Modernisierung der Kernarchitektur auf modulares Kotlin und Etablierung wiederverwendbarer CI/CD-Plugins.'
        ],
        tags: ['Android SDK', 'Das E-Rezept (Android)', 'Push-Gateway', 'Push Notifications (FCM)', 'Room DB', 'FHIR', 'Clean Architecture', 'CI/CD']
      },
      {
        id: 'popp-sdk',
        title: 'PoPP Mobile SDK (Kotlin Multiplatform)',
        badge: 'Telematikinfrastruktur',
        category: 'Kotlin Multiplatform SDK',
        period: '2026 — Heute',
        description: 'UI-entkoppeltes Multi-Modul Kotlin-Multiplatform-SDK für Proof of Patient Presence (PoPP) in Kassen-Apps. Ermöglicht den kryptografischen Nachweis der Patientengegenwart vor Ort über sichere NFC-Smartcard-APDU-Abläufe und FHIR-Verzeichnisdienste.',
        iconType: 'kmp',
        highlights: [
          'Headless API-Fassade & reaktiver State-Koordinator zur sauberen UI-Entkopplung.',
          'Modulare Multi-Layer-Architektur über Domänenmodelle, QR-Validierung, Verzeichnisdienste, Szenario-Engine und native NFC-Plattformschicht.',
          'Native NFC-Smartcard-Kommunikation (Android IsoDep, iOS CoreNFC, Desktop PC/SC) mit PACE-Protokoll via WebSockets.',
          'Gematik ZETA Zero-Trust SDK Integration mit PEP/PDP-Attestierung und OAuth Protected Resources.'
        ],
        details: [
          'Architektur des modularen Kotlin-Multiplatform-Refactorings mit sauberer Dependency Injection und echtzeitfähigem WebSocket-Kanal für sichere Smartcard-APDU-Szenarien.',
          'Anbindung des FHIR-Verzeichnisdienstes (VZD) mit Ausfallsicherheitsmodellen sowie plattformübergreifender Kamera-Erfassung (CameraX / AVFoundation) zur Telematik-ID-QR-Prüfung.'
        ],
        tags: ['Kotlin Multiplatform', 'KMP', 'NFC & Smartcard', 'PACE-Protokoll', 'ZETA Zero-Trust', 'FHIR VZD', 'Ktor Client', 'CameraX']
      },
      {
        id: 'gesundheit-mock-idp',
        title: 'Gesundheit mit Mock-Sektoraler-ID-Implementierung',
        badge: 'Auth & Sektorale ID',
        category: 'App-zu-App-Auth & Mock-IDP',
        period: '2026 — Heute',
        description: 'Entwicklungs- und Testarchitektur für mobile App-zu-App-Authentifizierung zwischen Gesundheitsanwendungen und der Gesundheit-App mit Mock-Sektoraler-ID-Implementierung. Enthält einen autarken JVM Ktor Mock-IDP-Server in Docker mit EC P-256 JWKs, RFC 7636 PKCE und WebSocket-Token-Push zur Entkopplung von externen IDP- und Kartenzwängen.',
        iconType: 'auth',
        highlights: [
          'Direkte App-zu-App Custom-URI-Navigation ohne Browser-Umwege und zentrale IDP-Föderation.',
          'Autarker JVM Ktor Mock-IDP-Server, lauffähig lokal sowie containerisiert mit Docker Compose.',
          'Kryptografische EC P-256 JWK-Schlüsselerzeugung, Signierung und JWE-Client-Attestierungs-Validierung.'
        ],
        details: [
          'Echtzeit-WebSocket-Token-Streaming zur automatischen Statussynchronisation zwischen Aufrufer- und Authenticator-App.',
          'Clean Architecture Implementierung mit animierter 4-Stufen-Showcase-UI und konfigurierbaren Delays für Partner-Demos.',
          'Vollständig autarke Offline-Testbarkeit auf realen USB-Geräten mittels adb reverse port forwarding.',
          'Prüfung von RFC 7636 PKCE SHA-256 Code Challenges zur Absicherung des Token-Austauschs.'
        ],
        tags: ['JVM Ktor', 'Docker Compose', 'Mock Sektorale IDP', 'OIDC & PKCE', 'EC P-256 JWK', 'WebSockets', 'Android Deep Linking', 'Clean Architecture']
      },
      {
        id: 'popp-reference',
        title: 'PoPP Referenz-Integration & Lokale Dev-Umgebung',
        badge: 'Integration & Testing',
        category: 'Lokaler Dev-Stack & ZETA-Validierung',
        period: '2026 — Heute',
        description: 'Einrichtung und Nutzung der PoPP-Referenzumgebung zur Validierung der Client-SDK-Integration, mobiler Backend-Abläufe und ZETA-Zero-Trust-Konnektivität. Betreuung lokaler Dev-Overrides, Attestierungs-Bypass-Konfigurationen und Integrationstests.',
        iconType: 'server',
        highlights: [
          'Konfiguration lokaler Docker-Compose-Umgebungen (Referenz-Server, ZETA Ingress-Proxy, OPA) für mobile Client-Tests.',
          'Einrichtung von Dev-Attestierungs-Bypass und Entwicklungs-Proxy für physikalische USB-Testgeräte.',
          'Validierung von End-to-End Check-in-Abläufen und APDU-Austausch gegen die Referenz-Serverimplementierung.',
          'Erprobung der ZETA-SDK-Integration und Sitzungsverwaltung gegen OPA-Richtlinien-Engines.'
        ],
        details: [
          'Bereitstellung von Compose-Overrides und lokalen Testkonfigurationen für schnelle Entwicklungszyklen im Mobile-Team.',
          'Fehlerbehebung bei Netzwerk-Bridging, adb Port-Forwarding und TLS-Proxy-Handshakes auf physischen Mobilgeräten.',
          'Validierung von Smartcard-Public-Key-Antworten anhand virtueller Testkartenabbilder.',
          'Dokumentation von Schritt-für-Schritt-Entwicklungsleitfäden und Troubleshooting-Runbooks für externe Kassen-Entwickler.'
        ],
        tags: ['Docker Compose', 'PoPP Referenz Stack', 'ZETA Dev Proxy', 'Integration Testing', 'Microservices', 'Network Bridging']
      },
      {
        id: 'ai-agent-skills',
        title: 'KI-Agent-Skills: Health Plan & Portfolio-Generator',
        badge: 'Open Source • KI-Agenten',
        category: 'Agent-Skills & Automatisierungs-Vorlagen',
        period: '2026',
        description: 'Entwicklung modularer KI-Agent-Skills (für Claude Code, Cursor, Gemini), die autonom vollständige Anwendungen erstellen. Der Portfolio-Generator befragt Nutzer oder liest Lebensläufe aus, um eine React-App anzupassen, während der Health Plan Skill Ernährungsziele berechnet und eine Offline-First PWA generiert.',
        iconType: 'ai',
        links: [
          { label: 'Health App', url: 'https://github.com/dineshvg/health-plan-app' },
          { label: 'Portfolio-Vorlage', url: 'https://github.com/dineshvg/dineshvg.github.io' },
          { label: 'Artikel', url: 'https://medium.com/@dineshvg.1023/i-asked-an-ai-agent-for-a-health-plan-it-built-me-an-app-0fef893d8da4' }
        ],
        highlights: [
          'Entwicklung von Skill-Dateien, die KI-Agenten anleiten, Nutzerdaten zu extrahieren, Geschäftslogik auszuführen und funktionale Software zu generieren.',
          'Portfolio-Generator: Passt eine React-Vorlage automatisch an, konfiguriert ein GitHub-Pages-Repository und fügt Herkunftsnachweise ein.',
          'Health Plan App: Berechnet Energiebedarf, erstellt Ernährungspläne und generiert eine installierbare PWA mit privatem Google Sheets Backend.'
        ],
        details: [
          'Implementierung von Rückfallstrategien für fehlende Eingaben (z. B. Markdown-Vorlagen, wenn kein Lebenslauf hochgeladen wird).',
          'Durchsetzung von Sicherheitsrichtlinien in den Prompt-Anweisungen, um unautorisierte Änderungen an Original-Repositories zu verhindern.'
        ],
        tags: ['KI-Agenten', 'Agent Skills', 'Claude Code', 'React', 'PWA', 'Automatisierung']
      },
      {
        id: 'android-mcp-testing',
        title: 'MCP-Server für KI-gestützte Android-App-Tests',
        badge: 'KI-Agenten • App-Tests',
        category: 'KI-Agenten & Kotlin Multiplatform',
        period: '2026',
        description: 'Ein Kotlin-Multiplatform-System, das jedem MCP-kompatiblen KI-Agenten (Claude, Gemini, Cursor) ermöglicht, Android-Apps auf echten Geräten per natürlichsprachigem Prompt zu testen. Ein MCP-Server stellt Gerätesteuerungs-Tools bereit, ein Cloudflare-Worker-Relay vermittelt Befehle via WebSocket, und eine Android-Companion-App führt sie über den AccessibilityService aus — ohne Quellcode, Emulatoren oder geskriptete UI-Tests.',
        iconType: 'ai',
        highlights: [
          'Natürlichsprachige Testszenarien ersetzen geskriptete UI-Tests — beschreibe, was geprüft werden soll, und der KI-Agent steuert das Gerät.',
          'Architektur umfasst einen JVM MCP-Server, Cloudflare Durable Objects Relay und eine Android-Companion-App mit gemeinsamen KMP-Modellen.',
          'MCP-Tools ermöglichen volle Gerätesteuerung.',
          'AccessibilityService-basierte Automatisierung funktioniert mit jeder installierten App ohne deren Quellcode.'
        ],
        details: [
          'Gemeinsames Kotlin-Multiplatform-Modul für Befehle und Modelle verhindert Serialisierungsdrift zwischen Server und Gerät.',
          'Cloudflare Durable Objects halten persistente WebSocket-Sitzungen und ermöglichen Remote-Tests aus jedem Netzwerk ohne direkten Gerätezugriff.',
          'Screenshot-Erfassung liefert Base64-Bilder zur visuellen Prüfung; Accessibility-Tree-Abfragen liefern die vollständige UI-Hierarchie zur Elementerkennung.',
          'Gebaut mit Ktor (HTTP/WebSocket), Kotlinx Serialization, Jetpack Compose für die Companion-App-UI und Gradle Version Catalogs über alle Module.'
        ],
        tags: ['Kotlin Multiplatform', 'MCP', 'KI-Agenten', 'Android', 'AccessibilityService', 'Cloudflare Workers', 'Ktor', 'WebSockets']
      }
    ],
    experience: [
      {
        id: 'gematik-arch',
        company: 'Gematik GmbH',
        role: 'Lead Android Developer & Softwarearchitekt',
        period: 'Feb 2026 - Heute',
        location: 'Remote (Berlin)',
        description: 'Verantwortung für die Architekturstrategie und Android-Entwicklungsleitung kritischer deutscher E-Health-Infrastrukturen (Das E-Rezept App für die Android-Plattform & PoPP), Push-Gateway-Dienste und Kotlin-Multiplatform-SDKs.',
        highlights: [
          'Lead Android Developer & Architekt für Das E-Rezept App für die Android-Plattform mit über 2 Mio. Nutzern.',
          'Architektur des PoPP-Ökosystems (Proof of Patient Presence) und des plattformübergreifenden SDKs für Kassen-Apps.',
          'Push-Gateway-Integration für sicheres Push-Notification-Routing und App-ID-Validierung in der Telematikinfrastruktur.',
          'Konzeption der App-zu-App-Authentifizierung und lokaler Mock-IDP-Architektur für Gesundheit mit Mock-Sektoraler-ID-Implementierung und PKCE.',
          'Zertifizierter Professional für Softwarearchitektur (iSAQB CPSA-F).'
        ],
        certificateUrl: 'https://www.credly.com/badges/7d95218f-8be4-455a-950c-c17663d5b9e9/linked_in_profile',
        details: [
          'Leitung der mobilen Kernarchitektur und Releases für Das E-Rezept App für die Android-Plattform (Releases 1.20+), Intent-Handling für externe Authentifizierung und Room-Datenbankmigrationen.',
          'Architektur des Push-Gateway-Systems: Entwicklung von Client-Aktivierung in Das E-Rezept App für die Android-Plattform und Backend-Routing im push-gateway (Ziel-App-Identifikationsprüfung, App-ID-Validierung).',
          'Modularisierung des PoPP-Multiplatform-SDKs in entkoppelte KMP-Schichten: Headless SDK-Fassade, PACE-Protokoll via WebSockets für eGK/SMC-B-Smartcards, FHIR-VZD-Suche und native NFC-Treiber.',
          'Entwicklung lokaler App-zu-App-Authentifizierung für Gesundheit mit Mock-Sektoraler-ID-Implementierung: Autarker JVM Ktor Mock-IDP-Server mit EC P-256 JWKs, PKCE und WebSocket-Token-Push für reibungslose lokale Integrationstests.',
          'Integration und Validierung gegen die PoPP-Referenzumgebung mit Docker Compose, Dev-Attestierungs-Bypass und E2E-Testsuiten.'
        ]
      },
      {
        id: 'gematik-sr',
        company: 'Gematik GmbH',
        role: 'Lead Entwickler',
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
        skills: ['Softwarearchitektur', 'Lead Android Developer', 'iSAQB CPSA-F', 'Zero-Trust (ZETA)', 'OIDC & PKCE', 'Technische Strategie']
      },
      {
        title: 'Mobile & Cross-Plattform',
        skills: ['Android SDK', 'Das E-Rezept (Android)', 'Kotlin Multiplatform (KMP)', 'Smartcard NFC (APDU)', 'PACE-Protokoll', 'Jetpack Compose']
      },
      {
        title: 'Backend & Messaging',
        skills: ['Push-Gateway (FCM)', 'JVM Ktor', 'Docker Compose', 'FHIR & VZD', 'WebSockets', 'Open Policy Agent (OPA)']
      },
      {
        title: 'DevOps & Qualität',
        skills: ['CI/CD (Jenkins / Actions)', 'Modulare Gradle-Plugins', 'Room DB Migrationen', 'Clean Architecture', 'OpenAPI Specs']
      }
    ],
    ui: {
      readMore: "Mehr Details anzeigen",
      readLess: "Weniger anzeigen",
      contact: "Kontakt",
      footer: "Stuttgart, Deutschland.",
      certification: "Zertifizierung",
      certificationName: "Certified Professional for Software Architecture – Foundation Level",
      viewCertificate: "Zertifikat ansehen",
      featured: "Schwerpunkt",
      profile: "Profil",
      toggleTheme: "Hell- und Dunkelmodus umschalten",
      languageNames: { english: "Englisch", german: "Deutsch" },
      contactEmail: "E-Mail schreiben",
      contactLinkedIn: "Nachricht auf LinkedIn",
      emailSubject: "Anfrage über Ihre Website",
      downloadPdf: "Lebenslauf herunterladen"
    },
    stats: [
      { value: "2M+", label: "Aktive Nutzer der E-Rezept App" },
      { value: "2.0 → 4.2+", label: "Play-Store-Bewertung" },
      { value: "Seit 2016", label: "Entwicklung von Android-Apps" },
      { value: "CPSA-F", label: "iSAQB-zertifizierter Architekt" }
    ]
  }
};
