import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Loader2, CheckCircle2 } from 'lucide-react';
import ayoubLogo from '../assets/ayoublogo.png';
import Footer from './Footer';
import webDevImg from '../assets/WD.png';
import mobDevImg from '../assets/MD.png';
import aiAgentImg from '../assets/AS.png';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const LinkedInIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export interface CapabilityInfo {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  image: string;
  deliverables: {
    title: string;
    description: string;
  }[];
  architecturePoints: string[];
  techStack: string[];
  caseStudy: {
    headline: string;
    details: string;
    metrics: string;
  };
}

export const CAPABILITIES_DATA: Record<string, CapabilityInfo> = {
  'backend-fullstack': {
    id: 'backend-fullstack',
    title: 'Backend & Full-Stack Systems',
    tagline: 'High-Throughput Backend Architectures & Scalable Web Platforms',
    summary:
      'Designing and developing fault-tolerant backend systems, distributed microservices, and end-to-end full-stack web applications. Delivering clean Domain-Driven Design (DDD), secure RESTful APIs, and responsive, fluid interfaces tailored for mission-critical operations.',
    image: webDevImg,
    deliverables: [
      {
        title: 'Distributed REST & GraphQL APIs',
        description:
          'Engineering scalable, versioned APIs using Spring Boot (Java) and Node.js/Express, featuring strict validation, pagination, idempotency, and sub-100ms response times.',
      },
      {
        title: 'Modern Full-Stack Web Applications',
        description:
          'Building high-performance user interfaces with React 19, Next.js App Router, TypeScript, and Tailwind CSS, integrated with smooth GSAP animations and optimized SSR/SSG rendering.',
      },
      {
        title: 'Relational & NoSQL Database Architectures',
        description:
          'Data modeling, indexing optimization, migrations, and caching strategies using PostgreSQL, MongoDB, and Redis with ACID transactional integrity.',
      },
      {
        title: 'Authentication & Cloud Deployments',
        description:
          'Hardened security implementations with JWT tokens, OAuth2 role-based access control, Docker containerization, and automated CI/CD deployment pipelines.',
      },
    ],
    architecturePoints: [
      'Clean Architecture & Separation of Concerns (Controller-Service-Repository)',
      'Deterministic database seeding and multi-tenant data isolation',
      'Asynchronous task processing, worker queues, and event dispatching',
      'Strict TypeScript and Java type safety across full application lifecycle',
    ],
    techStack: [
      'Java',
      'Spring Boot',
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'TypeScript',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
      'REST APIs',
      'CI/CD Pipelines',
    ],
    caseStudy: {
      headline: 'Multi-Tenant High-Scale FinTech & Web Platforms',
      details:
        'Engineered backend service modules and database verification workflows for production platforms, achieving zero security leaks and high concurrency handling under demanding peak loads.',
      metrics: '99.9% Uptime & Sub-100ms API Latency',
    },
  },

  'mobile-qa': {
    id: 'mobile-qa',
    title: 'Mobile Apps & Quality QA Automation',
    tagline: 'Cross-Platform Mobile Applications & Enterprise E2E Test Suites',
    summary:
      'Building performant, native-feeling mobile applications with React Native and Expo Router, backed by enterprise-grade Playwright automated test architectures that guarantee zero regressions across releases.',
    image: mobDevImg,
    deliverables: [
      {
        title: 'Enterprise Playwright Test Automation',
        description:
          'Architecting complete end-to-end testing suites with TypeScript, Page Object Models, reusable fixtures, network mocking, and parallel execution across multi-browser matrixes.',
      },
      {
        title: 'Cross-Platform Mobile Development',
        description:
          'Building fluid iOS and Android mobile apps with React Native, Expo Router, responsive gestures, offline-first data caching, and native hardware integrations.',
      },
      {
        title: 'API & Database Contract Verification',
        description:
          'Deterministic test-data seeding and database resets (PostgreSQL/SQL), verifying data integrity at the database layer rather than relying on brittle UI assertions alone.',
      },
      {
        title: 'CI/CD Automated Quality Gates',
        description:
          'Integrating test automation pipelines into GitHub Actions with automated video recording, trace captures, Slack alerts, and pull request gating.',
      },
    ],
    architecturePoints: [
      'Page Object Model (POM) with modular component encapsulation',
      'Deterministic PostgreSQL test-data seed and teardown workflows',
      'Cross-platform responsive layouts tested on real device viewports',
      'Flakiness-free assertion patterns and automated trace viewer debugging',
    ],
    techStack: [
      'Playwright',
      'TypeScript',
      'React Native',
      'Expo Router',
      'Page Object Model',
      'E2E Testing',
      'API Contract Testing',
      'PostgreSQL',
      'GitHub Actions',
      'CI/CD',
      'Jira',
      'Agile QA',
    ],
    caseStudy: {
      headline: 'GoroInvest Multi-Tenant Investment Platform Automation',
      details:
        'Architected comprehensive automated regression test suite covering tenant isolation, authentication, payments, and SQL validation, reducing manual regression cycles from days to minutes.',
      metrics: '100% Core Flow Coverage & Zero Flakiness',
    },
  },

  'agentic-ai': {
    id: 'agentic-ai',
    title: 'Agentic AI Systems & Autonomous Pipelines',
    tagline: 'Autonomous AI Agents, Multi-Step Orchestration & Tool Integration',
    summary:
      'Engineering next-generation autonomous AI workflows and multi-agent systems using LangChain, LangGraph, and modern LLM APIs. Designing self-healing tool dispatching, structured reasoning, and intelligent RAG architectures.',
    image: aiAgentImg,
    deliverables: [
      {
        title: 'Autonomous Multi-Agent Systems',
        description:
          'Designing collaborative agent teams where specialized roles (planner, researcher, execution worker, quality validator) autonomously coordinate to solve complex multi-step workflows.',
      },
      {
        title: 'LangChain & LangGraph Workflows',
        description:
          'Building stateful, deterministic graph pipelines with cyclical execution, human-in-the-loop approval checkpoints, and dynamic branching logic.',
      },
      {
        title: 'Advanced RAG & Vector Retrieval',
        description:
          'Implementing hybrid semantic search pipelines using vector databases, dense/sparse embeddings, contextual chunking, and metadata filtering for zero-hallucination accuracy.',
      },
      {
        title: 'Production Tool Calling & API Agents',
        description:
          'Wiring LLMs directly to real-world APIs, SQL databases, filesystem tools, and external services with strict schema enforcement and error recovery.',
      },
    ],
    architecturePoints: [
      'Stateful graph orchestration with LangGraph cyclic execution',
      'Strict JSON schema validation for deterministic system outputs',
      'Dynamic token budget optimization and model fallback strategies',
      'Telemetry, latency tracing, and safety guardrail monitoring',
    ],
    techStack: [
      'LangChain',
      'LangGraph',
      'Python',
      'TypeScript',
      'OpenAI / Gemini APIs',
      'Vector Databases',
      'RAG Pipelines',
      'Tool Calling',
      'Autonomous Agents',
      'Structured Outputs',
    ],
    caseStudy: {
      headline: 'Autonomous Code & Workflow Automation Pipelines',
      details:
        'Engineered autonomous agent systems capable of analyzing codebases, synthesizing technical documentation, querying internal knowledge, and executing multi-step API workflows reliably.',
      metrics: '10x Faster Task Execution with Deterministic Guardrails',
    },
  },
};

interface CapabilityDetailProps {
  capabilityId: string;
  onBack: () => void;
}

export const CapabilityDetail: React.FC<CapabilityDetailProps> = ({ capabilityId, onBack }) => {
  const capability = CAPABILITIES_DATA[capabilityId] || CAPABILITIES_DATA['backend-fullstack'];

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [capabilityId]);

  const scrollToCTA = () => {
    const el = document.getElementById('want-application');
    if (el) {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -30, duration: 1.15 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      let res: Response | null = null;
      let data: any = null;

      // 1. Try relative endpoint
      try {
        const r1 = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (r1.ok) {
          res = r1;
          data = await r1.json();
        } else {
          try {
            data = await r1.json();
          } catch (_) {}
        }
      } catch (_) {}

      // 2. Fallback to localhost:5000 if running locally
      const isLocal =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

      if ((!res || !res.ok) && isLocal) {
        try {
          const r2 = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          if (r2.ok) {
            res = r2;
            data = await r2.json();
          }
        } catch (_) {}
      }

      if (!res || !res.ok) {
        throw new Error(data?.error || 'Failed to send message. Please try again.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please reach out via WhatsApp or LinkedIn.');
    }
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
      {/* ── Fixed Top Navigation Bar (Borderless & Minimal) ── */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/85 backdrop-blur-xl px-6 sm:px-12 md:px-20 py-4 flex items-center justify-between border-b border-white/5">
        {/* Brand Logo only (Back button is cleanly located under nav) */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
          className="flex items-center group cursor-pointer"
        >
          <img
            src={ayoubLogo}
            alt="Ayoub Ameur Logo"
            className="h-8 md:h-9 object-contain brightness-0 invert group-hover:scale-105 transition-transform duration-300"
          />
        </a>

        {/* Right CTA: Smoothly leads to CTA of this page */}
        <button
          onClick={scrollToCTA}
          className="px-4 py-1.5 sm:px-5 sm:py-2 bg-white text-black font-semibold text-xs sm:text-sm rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] cursor-pointer"
        >
          Let's Talk
        </button>
      </header>

      {/* ── Sub-Nav Back Navigation (Located Under the Navbar) ── */}
      <div className="pt-24 sm:pt-28 md:pt-32 px-6 sm:px-12 md:px-20 max-w-[1440px] mx-auto flex items-center justify-between">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/[0.08] hover:bg-white text-white hover:text-black transition-all duration-300 active:scale-95 cursor-pointer text-xs sm:text-sm font-mono uppercase tracking-wider border border-white/10 hover:border-white shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </button>

        <span className="hidden sm:inline-block text-xs font-mono uppercase tracking-[0.2em] text-white/40">
          // Capability Details
        </span>
      </div>

      {/* ── Hero Section: Desktop Flex Row (Typo on Left, Card on Right) ── */}
      <section className="pt-8 sm:pt-10 md:pt-12 pb-16 md:pb-24 px-6 sm:px-12 md:px-20 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Left: Typography */}
          <div className="flex flex-col gap-5 md:gap-7 w-full lg:w-1/2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight font-headline">
              {capability.title}
            </h1>

            <p className="font-serif-italic text-lg sm:text-2xl text-white/80 font-light leading-relaxed">
              "{capability.tagline}"
            </p>

            <p className="text-gray-300 font-light text-base sm:text-lg leading-relaxed">
              {capability.summary}
            </p>
          </div>

          {/* Right: Card Showcase (100% Visible, Borderless & No Hover Effects) */}
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] aspect-[4/5] flex items-center justify-center">
              <img
                src={capability.image}
                alt={capability.title}
                className="w-full h-full object-contain object-center select-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Deliverables Section (Borderless, Flowing Seamlessly) ── */}
      <section className="py-16 md:py-24 px-6 sm:px-12 md:px-20 max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-3 mb-10 md:mb-14">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">
            What I Engineer
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-headline">
            Core Architectural Deliverables
          </h2>
        </div>

        {/* Deliverables Grid (Clean, borderless background blocks) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {capability.deliverables.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 bg-white/[0.02] flex flex-col gap-3 hover:bg-white/[0.04] transition-all duration-300"
            >
              <span className="text-xs font-mono text-white/40 tracking-widest uppercase">
                // 0{idx + 1}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Production Standards & Case Study (Borderless) ── */}
      <section className="py-16 md:py-24 px-6 sm:px-12 md:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Engineering Rigor */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">
              Engineering Rigor
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-headline">
              Production Standards & Methodologies
            </h2>
            <p className="text-gray-300 text-base font-light leading-relaxed">
              Every system is built with high standards of maintainability, documentation, and automated testing to ensure seamless handover and frictionless scaling.
            </p>

            <ul className="flex flex-col gap-4 mt-2">
              {capability.architecturePoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-200 font-light">
                  <CheckCircle2 className="w-5 h-5 text-white/80 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Real-World Case Study Card (Borderless) */}
          <div className="lg:col-span-5 p-8 bg-white/[0.025] flex flex-col gap-5">
            <span className="text-xs font-mono uppercase tracking-widest text-white/50">
              Verified Case Study
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {capability.caseStudy.headline}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
              {capability.caseStudy.details}
            </p>
            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-white/40">Impact Metric</span>
              <span className="text-xs sm:text-sm font-mono text-white font-medium">
                {capability.caseStudy.metrics}
              </span>
            </div>
          </div>
        </div>

        {/* Tech Stack Pills (Borderless) */}
        <div className="mt-14 pt-8">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 block mb-6">
            Technologies & Frameworks Deployed
          </span>
          <div className="flex flex-wrap gap-2.5">
            {capability.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs sm:text-sm px-4 py-1.5 rounded-full font-mono text-white/80 bg-white/[0.04]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION: "WANT AN APPLICATION?" (Borderless One-Piece Flow) ── */}
      <section id="want-application" className="py-20 md:py-32 px-6 sm:px-12 md:px-20 max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40 mb-3">
            Next Steps
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-5 font-headline">
            Want an application?
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl font-light leading-relaxed">
            Whether you need a scalable backend architecture, a high-performance web platform, a mobile app, or an autonomous AI pipeline — let's build it together.
          </p>
        </div>

        {/* Action Grid (Borderless, Seamless) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Column 1: Direct Communication (WhatsApp & LinkedIn with Authentic Brand Icons) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 p-8 bg-white/[0.02]">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">
                Fastest Response
              </span>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight font-headline">
                Direct Communication
              </h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                Connect directly on WhatsApp or LinkedIn for real-time discussion about your project specifications, timeline, and architectural requirements.
              </p>

              {/* Direct Buttons */}
              <div className="flex flex-col gap-3.5">
                <a
                  href="https://wa.me/212770566628"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-full bg-white text-black font-semibold text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                >
                  <WhatsAppIcon className="w-5 h-5 text-black" />
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="https://linkedin.com/in/ayoub-ameur-772a70362"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <LinkedInIcon className="w-4 h-4 text-white" />
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Direct Email */}
            <div className="pt-6">
              <span className="text-xs font-mono text-white/40 block mb-1 uppercase tracking-wider">
                Direct Email:
              </span>
              <a
                href="mailto:ayoubameur.tech@gmail.com"
                className="text-white hover:underline text-sm font-mono"
              >
                ayoubameur.tech@gmail.com ↗
              </a>
            </div>
          </div>

          {/* Column 2: Embedded Request Form (Borderless, Matching Landing Page) */}
          <div className="lg:col-span-7 p-8 sm:p-10 bg-white/[0.02] flex flex-col justify-between">
            {status === 'success' ? (
              <div className="my-auto py-12 flex flex-col items-center text-center gap-4">
                <CheckCircle2 className="w-14 h-14 text-white" />
                <h3 className="text-2xl font-bold text-white tracking-tight">Request Received!</h3>
                <p className="text-gray-300 text-sm max-w-md font-light leading-relaxed">
                  Thank you for reaching out. I have received your project details and will review and reply to your inbox within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-1">
                    Send Project Scope
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight font-headline">
                    Submit Request
                  </h3>
                  <p className="text-gray-400 text-sm font-light mt-1">
                    Fill out the form below to deliver your request straight to my personal inbox.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                      Project Details / Scope
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={`Tell me about your ${capability.title} requirements...`}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors text-sm resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="text-red-400 text-xs p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="mt-2 w-full py-4 bg-white text-black font-semibold text-sm rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Back to Home Button at Bottom */}
        <div className="mt-16 pt-8 flex justify-center">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 text-sm font-mono uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Portfolio Overview</span>
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
};

export default CapabilityDetail;
