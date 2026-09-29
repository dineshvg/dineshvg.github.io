import React, { useState, useEffect } from 'react';
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
  MessageCircle,
  Heart,
  Send,
  Sun,
  Moon,
  Layers,
  Boxes,
  KeyRound,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Language = 'en' | 'de';
type DesignTheme = 'sleek' | 'material3';
type AppearanceMode = 'light' | 'dark';

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

interface Project {
  id: string;
  title: string;
  badge: string;
  category: string;
  period?: string;
  description: string;
  highlights: string[];
  details?: string[];
  tags: string[];
  iconType: 'kmp' | 'auth' | 'server' | 'ehealth';
}

interface Translations {
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
    designSleek: string;
    designMaterial3: string;
    commentsTitle: string;
    commentPlaceholder: string;
  };
}

const content: Record<Language, Translations> = {
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
      languages: "Languages"
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
          'Lead Android Developer overseeing core architecture, feature delivery, and release cycles (1.40+).',
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
          'Directed core mobile architecture and release engineering for Das E-Rezept app for android platform (1.40+ releases), external auth intent handling, and Room database migrations.',
          'Architected end-to-end Push-Gateway messaging: Developed client activation/delivery in Das E-Rezept app for android platform and backend routing in push-gateway (target app ID resolution, app ID security validation).',
          'Designed and modularized the PoPP Multiplatform SDK: A UI-decoupled, multi-tier KMP architecture for statutory health insurance apps featuring a headless facade, robust domain modeling, and native platform integration.',
          'Built local app-to-app authentication for Gesundheit with mock sectoral ID implementation: High-performance JVM Ktor Mock IDP server supporting EC P-256 JWKs, PKCE, and real-time WebSocket token streaming.',
          'Integrated and validated against the PoPP reference environment using Docker Compose, dev attestation bypass, and E2E verification suites.'
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
      designSleek: "Sleek Dark",
      designMaterial3: "Material 3",
      commentsTitle: "Comments",
      commentPlaceholder: "Write a comment..."
    }
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
      languages: "Sprachen"
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
          'Lead Android Developer mit Gesamtverantwortung für Kernarchitektur, Feature-Entwicklung und Releases (1.40+).',
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
          'Leitung der mobilen Kernarchitektur und Releases für Das E-Rezept App für die Android-Plattform (Releases 1.40+), Intent-Handling für externe Authentifizierung und Room-Datenbankmigrationen.',
          'Architektur des Push-Gateway-Systems: Entwicklung von Client-Aktivierung in Das E-Rezept App für die Android-Plattform und Backend-Routing im push-gateway (Ziel-App-Identifikationsprüfung, App-ID-Validierung).',
          'Modularisierung des PoPP-Multiplatform-SDKs in entkoppelte KMP-Schichten: Headless SDK-Fassade, PACE-Protokoll via WebSockets für eGK/SMC-B-Smartcards, FHIR-VZD-Suche und native NFC-Treiber.',
          'Entwicklung lokaler App-zu-App-Authentifizierung für Gesundheit mit Mock-Sektoraler-ID-Implementierung: Autarker JVM Ktor Mock-IDP-Server mit EC P-256 JWKs, PKCE und WebSocket-Token-Push für reibungslose lokale Integrationstests.',
          'Integration und Validierung gegen die PoPP-Referenzumgebung mit Docker Compose, Dev-Attestierungs-Bypass und E2E-Testsuiten.'
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
  mode: AppearanceMode;
  labels: Translations['ui'];
  isLiked: boolean;
  onLike: () => void;
  comments: string[];
  onAddComment: (text: string) => void;
}> = ({ exp, theme, mode, labels, isLiked, onLike, comments, onAddComment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  
  const isM3 = theme === 'material3';
  const isDark = mode === 'dark';

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  if (isM3) {
    return (
      <div className={`rounded-[24px] shadow-xl border overflow-hidden group transition-all ${
        isDark 
          ? 'bg-slate-900 border-slate-800/50 hover:border-blue-500/30' 
          : 'bg-white border-slate-200 hover:border-blue-400/30 shadow-slate-200/50'
      }`}>
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-4 mb-5">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-lg border shrink-0 transition-colors ${
              isDark 
                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                : 'bg-blue-50 text-blue-600 border-blue-100'
            }`}>
              {exp.company[0]}
            </div>
            <div>
              <h4 className={`font-black text-lg md:text-xl leading-tight tracking-tight transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>{exp.role}</h4>
              <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>{exp.company}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-5">
             <span className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-colors ${
               isDark ? 'bg-slate-800/50 text-slate-500 border-slate-700/50' : 'bg-slate-50 text-slate-500 border-slate-200'
             }`}>{exp.period}</span>
             <span className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-colors ${
               isDark ? 'bg-slate-800/50 text-slate-500 border-slate-700/50' : 'bg-slate-50 text-slate-500 border-slate-200'
             }`}><MapPin size={10} /> {exp.location}</span>
          </div>

          <p className={`mb-6 leading-relaxed text-sm md:text-base transition-colors ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {exp.description}
          </p>

          <div className="space-y-4">
            <ul className="grid md:grid-cols-2 gap-3">
              {exp.highlights.map((h, i) => (
                <li key={i} className={`flex items-start gap-2 text-xs md:text-sm leading-normal transition-colors ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)] ${
                    isDark ? 'bg-blue-500' : 'bg-blue-600'
                  }`} />
                  {h}
                </li>
              ))}
            </ul>

            {exp.details && (
              <div className="pt-2">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest border transition-all active:scale-[0.98] ${
                    isDark 
                      ? 'bg-slate-800/50 text-blue-400 border-slate-700/50 hover:bg-slate-800' 
                      : 'bg-slate-50 text-blue-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
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
                      <ul className={`mt-4 space-y-3 p-5 rounded-2xl border transition-colors ${
                        isDark ? 'bg-slate-950/50 border-slate-800/50' : 'bg-slate-50/50 border-slate-200'
                      }`}>
                        {exp.details.map((detail, i) => (
                          <li key={i} className={`text-xs md:text-sm leading-relaxed flex gap-2 transition-colors ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            <span className={`font-black shrink-0 transition-colors ${
                              isDark ? 'text-blue-500' : 'text-blue-600'
                            }`}>•</span> {detail}
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
        <div className={`px-6 md:px-8 py-4 flex flex-col border-t transition-colors ${
          isDark ? 'bg-slate-950/50 border-slate-800/50' : 'bg-slate-50/50 border-slate-100'
        }`}>
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <button 
                onClick={onLike}
                className={`flex items-center gap-2 transition-all active:scale-125 ${
                  isLiked 
                    ? 'text-red-500' 
                    : (isDark ? 'text-slate-500 hover:text-red-400' : 'text-slate-400 hover:text-red-500')
                }`}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                <span className="text-xs font-black">{isLiked ? 1 : 0}</span>
              </button>
              <button 
                onClick={() => setShowComments(!showComments)}
                className={`flex items-center gap-2 transition-all ${
                  showComments 
                    ? (isDark ? 'text-blue-400' : 'text-blue-600') 
                    : (isDark ? 'text-slate-500 hover:text-blue-400' : 'text-slate-400 hover:text-blue-600')
                }`}
              >
                <MessageCircle size={20} />
                <span className="text-xs font-black">{comments.length}</span>
              </button>
            </div>
            {exp.certificateUrl && (
              <a 
                href={exp.certificateUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`font-black text-[10px] uppercase tracking-widest transition-colors ${
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                }`}
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
                <div className="space-y-3 mb-4 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                  {comments.map((c, i) => (
                    <div key={i} className={`p-3 rounded-xl border transition-colors ${
                      isDark ? 'bg-slate-900 border-slate-800/50' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <p className={`text-xs leading-relaxed transition-colors ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}>{c}</p>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleCommentSubmit} className="relative pb-2">
                  <input 
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={labels.commentPlaceholder}
                    className={`w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all pr-10 border ${
                      isDark 
                        ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-blue-500/50' 
                        : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-400/50'
                    }`}
                  />
                  <button 
                    type="submit"
                    className={`absolute right-2 top-[calc(50%-4px)] -translate-y-1/2 p-2 transition-colors ${
                      isDark ? 'text-blue-500 hover:text-blue-400' : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    <Send size={16} />
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
      <div className={`font-mono text-[10px] pt-1 uppercase tracking-widest transition-colors ${
        isDark ? 'text-slate-500' : 'text-slate-400'
      }`}>
        {exp.period}
      </div>
      <div className="md:col-span-3">
        <h4 className={`font-bold transition-all mb-1 text-lg md:text-xl ${
          isDark ? 'text-slate-100 group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
        }`}>
          {exp.role}
        </h4>
        <div className={`flex flex-wrap items-center gap-2 font-medium mb-4 transition-colors ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <span className="text-sm md:text-base">{exp.company}</span>
          <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
          <span className="flex items-center gap-1 text-xs"><MapPin size={10} /> {exp.location}</span>
          {exp.certificateUrl && (
            <>
              <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
              <a 
                href={exp.certificateUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-1 text-xs transition-colors ${
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                <ExternalLink size={10} /> iSAQB
              </a>
            </>
          )}
        </div>
        <p className={`mb-5 leading-relaxed text-sm md:text-base transition-colors ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {exp.description}
        </p>
        
        <div className="space-y-4">
          <ul className="grid md:grid-cols-2 gap-3">
            {exp.highlights.map((h, i) => (
              <li key={i} className={`flex items-start gap-2 text-xs md:text-sm transition-colors ${
                isDark ? 'text-slate-500 group-hover:text-slate-400' : 'text-slate-500 group-hover:text-slate-700'
              }`}>
                <ChevronRight size={14} className={`shrink-0 mt-0.5 transition-colors ${
                  isDark ? 'text-blue-500/50' : 'text-blue-600/50'
                }`} />
                {h}
              </li>
            ))}
          </ul>

          {exp.details && (
            <div className="pt-2">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 text-xs font-bold transition-colors group/btn ${
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                }`}
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
                    <ul className={`mt-4 space-y-2 pl-4 border-l transition-colors ${
                      isDark ? 'border-slate-800' : 'border-slate-200'
                    }`}>
                      {exp.details.map((detail, i) => (
                        <li key={i} className={`text-xs md:text-sm leading-relaxed transition-colors ${
                          isDark ? 'text-slate-500' : 'text-slate-600'
                        }`}>
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

const ProjectCard: React.FC<{
  project: Project;
  theme: DesignTheme;
  mode: AppearanceMode;
  labels: Translations['ui'];
  isLiked: boolean;
  onLike: () => void;
  comments: string[];
  onAddComment: (text: string) => void;
}> = ({ project, theme, mode, labels, isLiked, onLike, comments, onAddComment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const isM3 = theme === 'material3';
  const isDark = mode === 'dark';

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const getIcon = () => {
    switch (project.iconType) {
      case 'kmp':
        return <Boxes size={22} />;
      case 'auth':
        return <KeyRound size={22} />;
      case 'server':
        return <Cpu size={22} />;
      case 'ehealth':
        return <ShieldCheck size={22} />;
      default:
        return <Layers size={22} />;
    }
  };

  if (isM3) {
    return (
      <div className={`rounded-[28px] md:rounded-[36px] shadow-xl border overflow-hidden group transition-all ${
        isDark 
          ? 'bg-slate-900 border-slate-800/60 hover:border-indigo-500/40' 
          : 'bg-white border-slate-200 hover:border-indigo-400/40 shadow-slate-200/50'
      }`}>
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 transition-colors ${
                isDark 
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                  : 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-sm'
              }`}>
                {getIcon()}
              </div>
              <div>
                <h4 className={`font-black text-xl md:text-2xl leading-tight tracking-tight transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>{project.title}</h4>
                <p className={`text-[10px] font-black uppercase tracking-widest mt-1 transition-colors ${
                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`}>{project.category}</p>
              </div>
            </div>
            
            <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-1.5 shrink-0">
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors ${
                isDark ? 'bg-indigo-950/60 text-indigo-300 border-indigo-800/50' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}>
                {project.badge}
              </span>
              {project.period && (
                <span className={`text-[10px] font-bold font-mono transition-colors ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  {project.period}
                </span>
              )}
            </div>
          </div>

          <p className={`mb-6 leading-relaxed text-sm md:text-base transition-colors ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <span key={i} className={`px-3 py-1 rounded-xl text-[10px] font-black tracking-wider uppercase border transition-all ${
                isDark 
                  ? 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-800' 
                  : 'bg-slate-100/80 text-slate-700 border-slate-200 hover:bg-slate-200/60'
              }`}>
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-4">
            <ul className="grid md:grid-cols-2 gap-3">
              {project.highlights.map((h, i) => (
                <li key={i} className={`flex items-start gap-2.5 text-xs md:text-sm leading-normal transition-colors ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.5)] ${
                    isDark ? 'bg-indigo-400' : 'bg-indigo-600'
                  }`} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {project.details && (
              <div className="pt-2">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest border transition-all active:scale-[0.98] ${
                    isDark 
                      ? 'bg-slate-800/50 text-indigo-400 border-slate-700/50 hover:bg-slate-800' 
                      : 'bg-slate-50 text-indigo-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
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
                      <ul className={`mt-4 space-y-3 p-5 rounded-2xl border transition-colors ${
                        isDark ? 'bg-slate-950/50 border-slate-800/50' : 'bg-slate-50/50 border-slate-200'
                      }`}>
                        {project.details.map((detail, i) => (
                          <li key={i} className={`text-xs md:text-sm leading-relaxed flex gap-2 transition-colors ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            <span className={`font-black shrink-0 ${
                              isDark ? 'text-indigo-400' : 'text-indigo-600'
                            }`}>•</span> {detail}
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
        <div className={`px-6 md:px-8 py-4 flex flex-col border-t transition-colors ${
          isDark ? 'bg-slate-950/50 border-slate-800/50' : 'bg-slate-50/50 border-slate-100'
        }`}>
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <button 
                onClick={onLike}
                className={`flex items-center gap-2 transition-all active:scale-125 ${
                  isLiked 
                    ? 'text-red-500' 
                    : (isDark ? 'text-slate-500 hover:text-red-400' : 'text-slate-400 hover:text-red-500')
                }`}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                <span className="text-xs font-black">{isLiked ? 1 : 0}</span>
              </button>
              <button 
                onClick={() => setShowComments(!showComments)}
                className={`flex items-center gap-2 transition-all ${
                  showComments 
                    ? (isDark ? 'text-indigo-400' : 'text-indigo-600') 
                    : (isDark ? 'text-slate-500 hover:text-indigo-400' : 'text-slate-400 hover:text-indigo-600')
                }`}
              >
                <MessageCircle size={20} />
                <span className="text-xs font-black">{comments.length}</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pt-4"
              >
                <div className="space-y-3 mb-4 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                  {comments.map((c, i) => (
                    <div key={i} className={`p-3 rounded-xl border transition-colors ${
                      isDark ? 'bg-slate-900 border-slate-800/50' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <p className={`text-xs leading-relaxed transition-colors ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}>{c}</p>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleCommentSubmit} className="relative pb-2">
                  <input 
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={labels.commentPlaceholder}
                    className={`w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all pr-10 border ${
                      isDark 
                        ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500/50' 
                        : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400/50'
                    }`}
                  />
                  <button 
                    type="submit"
                    className={`absolute right-2 top-[calc(50%-4px)] -translate-y-1/2 p-2 transition-colors ${
                      isDark ? 'text-indigo-500 hover:text-indigo-400' : 'text-indigo-600 hover:text-indigo-800'
                    }`}
                  >
                    <Send size={16} />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Sleek Mode
  return (
    <div className={`p-6 md:p-8 rounded-[28px] border transition-all ${
      isDark 
        ? 'bg-slate-900/40 border-slate-800/80 hover:border-blue-500/40' 
        : 'bg-white border-slate-200 hover:border-blue-400/40 shadow-sm'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`p-2 rounded-xl border ${
              isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-100'
            }`}>
              {getIcon()}
            </span>
            <span className={`font-mono text-[10px] uppercase tracking-widest ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>{project.category}</span>
          </div>
          <h4 className={`text-xl md:text-2xl font-bold transition-all ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {project.title}
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            isDark ? 'bg-slate-800/80 text-blue-400 border-slate-700' : 'bg-slate-100 text-blue-600 border-slate-200'
          }`}>
            {project.badge}
          </span>
          {project.period && (
            <span className={`font-mono text-[10px] uppercase tracking-widest ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}>
              {project.period}
            </span>
          )}
        </div>
      </div>

      <p className={`mb-5 leading-relaxed text-sm md:text-base ${
        isDark ? 'text-slate-400' : 'text-slate-600'
      }`}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, i) => (
          <span key={i} className={`px-3 py-1 rounded-xl text-[10px] font-mono tracking-wider border ${
            isDark ? 'bg-slate-800/50 text-slate-400 border-slate-700/60' : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            {tag}
          </span>
        ))}
      </div>

      <div className="space-y-4">
        <ul className="grid md:grid-cols-2 gap-3">
          {project.highlights.map((h, i) => (
            <li key={i} className={`flex items-start gap-2 text-xs md:text-sm ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <ChevronRight size={14} className={`shrink-0 mt-0.5 ${
                isDark ? 'text-blue-500/70' : 'text-blue-600/70'
              }`} />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {project.details && (
          <div className="pt-2">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-2 text-xs font-bold transition-colors ${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
              }`}
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
                  <ul className={`mt-4 space-y-2 pl-4 border-l ${
                    isDark ? 'border-slate-800' : 'border-slate-200'
                  }`}>
                    {project.details.map((detail, i) => (
                      <li key={i} className={`text-xs md:text-sm leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
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

      {/* Interactions */}
      <div className={`mt-6 pt-4 border-t flex justify-between items-center ${
        isDark ? 'border-slate-800/60' : 'border-slate-100'
      }`}>
        <div className="flex gap-6">
          <button 
            onClick={onLike}
            className={`flex items-center gap-2 transition-all active:scale-125 ${
              isLiked 
                ? 'text-red-500' 
                : (isDark ? 'text-slate-500 hover:text-red-400' : 'text-slate-400 hover:text-red-500')
            }`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            <span className="text-xs font-black">{isLiked ? 1 : 0}</span>
          </button>
          <button 
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-2 transition-all ${
              showComments 
                ? (isDark ? 'text-blue-400' : 'text-blue-600') 
                : (isDark ? 'text-slate-500 hover:text-blue-400' : 'text-slate-400 hover:text-blue-600')
            }`}
          >
            <MessageCircle size={18} />
            <span className="text-xs font-black">{comments.length}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pt-4"
          >
            <div className="space-y-3 mb-4 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
              {comments.map((c, i) => (
                <div key={i} className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-900 border-slate-800/50' : 'bg-slate-50 border-slate-200'
                }`}>
                  <p className={`text-xs leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>{c}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleCommentSubmit} className="relative pb-2">
              <input 
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={labels.commentPlaceholder}
                className={`w-full rounded-xl px-4 py-2 text-xs focus:outline-none transition-all pr-10 border ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-blue-500/50' 
                    : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-400/50'
                }`}
              />
              <button 
                type="submit"
                className={`absolute right-2 top-[calc(50%-4px)] -translate-y-1/2 p-2 ${
                  isDark ? 'text-blue-500 hover:text-blue-400' : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<DesignTheme>('sleek');
  const [mode, setMode] = useState<AppearanceMode>('dark');
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, string[]>>({});
  
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [mode]);

  const t = content[lang];
  const isM3 = theme === 'material3';
  const isDark = mode === 'dark';

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
    <div className={`min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-500 ${
      isDark 
        ? (isM3 ? 'bg-slate-950 text-slate-200' : 'bg-[#020617] text-slate-200') 
        : (isM3 ? 'bg-slate-50 text-slate-800' : 'bg-white text-slate-900')
    }`}>
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[10%] -left-[10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-colors duration-1000 ${
          isDark 
            ? (isM3 ? 'bg-blue-600/10' : 'bg-blue-500/10') 
            : (isM3 ? 'bg-blue-400/10' : 'bg-blue-200/20')
        }`} />
        <div className={`absolute top-[20%] -right-[10%] w-[30%] h-[30%] blur-[120px] rounded-full transition-colors duration-1000 ${
          isDark 
            ? (isM3 ? 'bg-indigo-600/10' : 'bg-emerald-500/5') 
            : (isM3 ? 'bg-indigo-400/10' : 'bg-emerald-200/20')
        }`} />
      </div>

      {/* Top Bar Controls */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
        <div className={`flex items-center gap-2 p-1.5 rounded-full backdrop-blur-xl border shadow-2xl transition-colors ${
          isDark 
            ? 'bg-slate-900/90 border-slate-800' 
            : 'bg-white/90 border-slate-200'
        }`}>
          <button 
            onClick={() => setTheme('sleek')}
            className={`px-5 py-2.5 rounded-full text-[10px] font-black transition-all tracking-widest ${
              theme === 'sleek' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
            }`}
          >
            SLEEK
          </button>
          <button 
            onClick={() => setTheme('material3')}
            className={`px-5 py-2.5 rounded-full text-[10px] font-black transition-all tracking-widest ${
              theme === 'material3' 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
            }`}
          >
            MATERIAL 3
          </button>
          <div className={`w-[1px] my-2 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
          <button 
            onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
            className={`px-5 py-2.5 rounded-full text-[10px] font-black transition-all tracking-widest ${
              isM3 
                ? (isDark ? 'text-indigo-400 hover:text-white' : 'text-indigo-600 hover:text-indigo-800') 
                : (isDark ? 'text-blue-400 hover:text-white' : 'text-blue-600 hover:text-blue-800')
            }`}
          >
            {lang.toUpperCase()}
          </button>
          <div className={`w-[1px] my-2 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
          <button 
            onClick={() => setMode(isDark ? 'light' : 'dark')}
            className={`p-2.5 rounded-full transition-all ${
              isDark ? 'text-yellow-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
            aria-label="Toggle Theme Mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <div className={`mx-auto max-w-5xl transition-all duration-700 pt-32 pb-32 w-full`}>
        
        {/* Hero Section */}
        <header className="px-6 mb-20 w-full flex flex-col items-center text-center md:items-start md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest mb-8 transition-colors ${
              isDark 
                ? (isM3 ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400') 
                : (isM3 ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-blue-50 border-blue-200 text-blue-600')
            }`}>
              <Terminal size={14} /> {t.hero.availability}
            </div>
            
            <h1 className={`font-black tracking-tight mb-6 leading-[0.9] transition-all ${isM3 ? 'text-6xl md:text-8xl lg:text-9xl' : 'text-6xl md:text-8xl'}`}>
              <span className={isDark ? (isM3 ? 'text-white' : 'bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent') : 'text-slate-900'}>Dinesh</span>
              <br />
              <span className={isDark ? (isM3 ? 'text-indigo-500' : 'bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent') : (isM3 ? 'text-indigo-600' : 'text-blue-600')}>
                Gangatharan
              </span>
            </h1>

            <p className={`mb-10 leading-relaxed font-medium transition-all mx-auto md:mx-0 ${
              isDark 
                ? (isM3 ? 'text-slate-400 text-lg md:text-2xl' : 'text-slate-400 text-xl md:text-2xl max-w-2xl') 
                : (isM3 ? 'text-slate-600 text-lg md:text-2xl' : 'text-slate-600 text-xl md:text-2xl max-w-2xl')
            }`}>
              {t.hero.description.split(',').map((part, i) => (
                <span key={i}>
                  {i > 0 && ','}
                  {part.includes('Stuttgart') || part.includes('cross-platform') || part.includes('mobile') || part.includes('Softwarearchitekt') || part.includes('Software Architect') || part.includes('Lead Android Developer') || part.includes('PoPP') || part.includes('Das E-Rezept') || part.includes('Push-Gateway') || part.includes('Zero-Trust') ? (
                    <span className={isDark ? (isM3 ? 'text-white font-bold' : 'text-slate-100') : 'text-slate-900 font-bold'}>{part}</span>
                  ) : part}
                </span>
              ))}
            </p>
            
            <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
              <div className="flex gap-4">
                <a href="https://github.com/dineshvg" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className={`p-4 md:p-5 rounded-[24px] transition-all border ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800 hover:border-indigo-500/30' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-indigo-400/30 shadow-sm'
                }`}>
                  <Globe size={24} />
                </a>
                <a href="https://www.linkedin.com/in/dineshvg2310/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className={`p-4 md:p-5 rounded-[24px] transition-all border ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800 hover:border-indigo-500/30' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-indigo-400/30 shadow-sm'
                }`}>
                  <User size={24} />
                </a>
                <a href="mailto:dineshvg1023@gmail.com" aria-label="Send Email" className={`p-4 md:p-5 rounded-[24px] transition-all border ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800 hover:border-indigo-500/30' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-indigo-400/30 shadow-sm'
                }`}>
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </header>

        <main className="px-6 space-y-32">
          {/* Experience Section */}
          <motion.section {...fadeIn} id="experience">
            <div className={`flex items-center gap-4 mb-16 justify-center md:justify-start`}>
              <div className={`p-3 rounded-2xl transition-all ${
                isDark 
                  ? (isM3 ? 'bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.5)] text-white' : 'bg-blue-500/10 text-blue-400') 
                  : (isM3 ? 'bg-indigo-600 shadow-[0_10px_20px_rgba(79,70,229,0.3)] text-white' : 'bg-blue-50 text-blue-600')
              }`}>
                <Briefcase size={28} />
              </div>
              <h3 className={`font-black uppercase tracking-tight leading-none transition-all ${
                isDark 
                  ? (isM3 ? 'text-4xl md:text-5xl text-white' : 'text-3xl md:text-4xl text-slate-200') 
                  : (isM3 ? 'text-4xl md:text-5xl text-slate-900' : 'text-3xl md:text-4xl text-slate-900')
              }`}>
                {t.sections.experience}
              </h3>
            </div>
            <div className="space-y-12">
              {t.experience.map((exp, idx) => (
                <ExperienceCard 
                  key={idx} 
                  exp={exp} 
                  theme={theme} 
                  mode={mode}
                  labels={t.ui}
                  isLiked={!!likes[exp.id]}
                  onLike={() => toggleLike(exp.id)}
                  comments={comments[exp.id] || []}
                  onAddComment={(text) => addComment(exp.id, text)}
                />
              ))}
            </div>
          </motion.section>

          {/* Featured Architecture & Systems Section */}
          <motion.section {...fadeIn} id="projects">
            <div className={`flex items-center gap-4 mb-16 justify-center md:justify-start`}>
              <div className={`p-3 rounded-2xl transition-all ${
                isDark 
                  ? (isM3 ? 'bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.5)] text-white' : 'bg-indigo-500/10 text-indigo-400') 
                  : (isM3 ? 'bg-indigo-600 shadow-[0_10px_20px_rgba(79,70,229,0.3)] text-white' : 'bg-indigo-50 text-indigo-600')
              }`}>
                <Layers size={28} />
              </div>
              <h3 className={`font-black uppercase tracking-tight leading-none transition-all ${
                isDark 
                  ? (isM3 ? 'text-4xl md:text-5xl text-white' : 'text-3xl md:text-4xl text-slate-200') 
                  : (isM3 ? 'text-4xl md:text-5xl text-slate-900' : 'text-3xl md:text-4xl text-slate-900')
              }`}>
                {t.sections.projects}
              </h3>
            </div>
            <div className="space-y-12">
              {t.projects.map((proj, idx) => (
                <ProjectCard 
                  key={idx} 
                  project={proj} 
                  theme={theme} 
                  mode={mode}
                  labels={t.ui}
                  isLiked={!!likes[proj.id]}
                  onLike={() => toggleLike(proj.id)}
                  comments={comments[proj.id] || []}
                  onAddComment={(text) => addComment(proj.id, text)}
                />
              ))}
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section {...fadeIn} id="skills">
            <div className={`flex items-center gap-4 mb-16 justify-center md:justify-start`}>
              <div className={`p-3 rounded-2xl transition-all ${
                isDark 
                  ? (isM3 ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] text-white' : 'bg-emerald-500/10 text-emerald-400') 
                  : (isM3 ? 'bg-blue-500 shadow-[0_10px_20px_rgba(59,130,246,0.3)] text-white' : 'bg-emerald-50 text-emerald-600')
              }`}>
                <Code2 size={28} />
              </div>
              <h3 className={`font-black uppercase tracking-tight leading-none transition-all ${
                isDark 
                  ? (isM3 ? 'text-4xl md:text-5xl text-white' : 'text-3xl md:text-4xl text-slate-200') 
                  : (isM3 ? 'text-4xl md:text-5xl text-slate-900' : 'text-3xl md:text-4xl text-slate-900')
              }`}>
                {t.sections.expertise}
              </h3>
            </div>
            <div className={`grid gap-6 ${isM3 ? 'grid-cols-1 md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
              {t.skills.map((cat, idx) => (
                <div key={idx} className={`p-8 md:p-10 rounded-[32px] md:rounded-[40px] border transition-all ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800/50 hover:border-blue-500/30' 
                    : 'bg-white border-slate-200 hover:border-blue-400/30 shadow-sm'
                }`}>
                  <h4 className={`text-[10px] font-black mb-6 uppercase tracking-widest transition-colors ${
                    isDark ? (isM3 ? 'text-blue-400' : 'text-emerald-400') : (isM3 ? 'text-blue-600' : 'text-emerald-600')
                  }`}>{cat.title}</h4>
                  <div className="flex flex-wrap gap-3">
                    {cat.skills.map((skill, i) => (
                      <span key={i} className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                        isDark 
                          ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Education & Info */}
          <div className={`grid gap-20 md:grid-cols-2`}>
            <motion.section {...fadeIn} id="education">
              <div className={`flex items-center gap-4 mb-12 justify-center md:justify-start`}>
                <div className={`p-3 rounded-2xl transition-all ${
                  isDark 
                    ? (isM3 ? 'bg-indigo-600 text-white' : 'bg-purple-500/10 text-purple-400') 
                    : (isM3 ? 'bg-indigo-600 text-white' : 'bg-purple-50 text-purple-600')
                }`}>
                  <GraduationCap size={28} />
                </div>
                <h3 className={`font-black uppercase tracking-tight transition-all ${
                  isDark 
                    ? (isM3 ? 'text-3xl md:text-4xl text-white' : 'text-2xl md:text-3xl text-slate-200') 
                    : (isM3 ? 'text-3xl md:text-4xl text-slate-900' : 'text-2xl md:text-3xl text-slate-900')
                }`}>{t.sections.education}</h3>
              </div>
              <div className={`space-y-10 pl-6 border-l-4 transition-colors ${
                isDark ? (isM3 ? 'border-indigo-500/20' : 'border-slate-800') : (isM3 ? 'border-indigo-100' : 'border-slate-200')
              }`}>
                {t.education.map((edu, idx) => (
                  <div key={idx} className="relative text-left">
                    <div className={`absolute -left-[30px] top-2 w-3 h-3 rounded-full transition-colors ${
                      isDark ? (isM3 ? 'bg-indigo-500' : 'bg-purple-500') : (isM3 ? 'bg-indigo-600' : 'bg-purple-600')
                    }`} />
                    <h4 className={`font-black uppercase text-base md:text-lg tracking-tight mb-2 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>{edu.degree}</h4>
                    <p className={`font-bold text-sm transition-colors ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{edu.school}</p>
                    <p className={`text-[11px] font-black mt-3 uppercase tracking-[0.2em] transition-colors ${
                      isDark ? (isM3 ? 'text-indigo-400' : 'text-slate-500') : (isM3 ? 'text-indigo-600' : 'text-slate-400')
                    }`}>{edu.period}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section {...fadeIn} id="languages">
              <div className={`flex items-center gap-4 mb-12 justify-center md:justify-start`}>
                <div className={`p-3 rounded-2xl transition-all ${
                  isDark 
                    ? 'bg-rose-500 text-white' 
                    : (isM3 ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-600')
                }`}>
                  <Languages size={28} />
                </div>
                <h3 className={`font-black uppercase tracking-tight transition-all ${
                  isDark 
                    ? (isM3 ? 'text-3xl md:text-4xl text-white' : 'text-2xl md:text-3xl text-slate-200') 
                    : (isM3 ? 'text-3xl md:text-4xl text-slate-900' : 'text-2xl md:text-3xl text-slate-900')
                }`}>{t.sections.languages}</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className={`p-6 md:p-8 rounded-[24px] md:rounded-[32px] border transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800/50' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <p className={`text-[10px] font-black uppercase mb-3 tracking-widest transition-colors ${
                    isDark ? (isM3 ? 'text-rose-400' : 'text-slate-500') : 'text-rose-600'
                  }`}>English</p>
                  <p className={`text-lg md:text-xl font-black transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>C2 Proficient</p>
                </div>
                <div className={`p-6 md:p-8 rounded-[24px] md:rounded-[32px] border transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800/50' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <p className={`text-[10px] font-black uppercase mb-3 tracking-widest transition-colors ${
                    isDark ? (isM3 ? 'text-rose-400' : 'text-slate-500') : 'text-rose-600'
                  }`}>German</p>
                  <p className={`text-lg md:text-xl font-black transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>B2 Advanced</p>
                </div>
              </div>
            </motion.section>
          </div>
        </main>

        <footer className={`px-6 py-32 border-t flex flex-col justify-center items-center gap-12 text-xs transition-colors ${
          isDark ? 'border-slate-800/50 text-slate-500' : 'border-slate-200 text-slate-400'
        }`}>
          <div className={`flex gap-8 md:gap-10 font-black uppercase tracking-[0.3em] flex-wrap justify-center`}>
            <a href="#experience" className={`transition-colors ${isDark ? (isM3 ? 'hover:text-indigo-400' : 'hover:text-blue-400') : 'hover:text-blue-600'}`}>{t.sections.experience}</a>
            <a href="#projects" className={`transition-colors ${isDark ? (isM3 ? 'hover:text-indigo-400' : 'hover:text-blue-400') : 'hover:text-blue-600'}`}>{t.sections.projects}</a>
            <a href="#skills" className={`transition-colors ${isDark ? (isM3 ? 'hover:text-indigo-400' : 'hover:text-emerald-400') : 'hover:text-emerald-600'}`}>{t.sections.expertise}</a>
          </div>
          <p className="font-bold tracking-widest uppercase text-[10px] text-slate-600">© {new Date().getFullYear()} Dinesh Gangatharan • {t.ui.footer}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
