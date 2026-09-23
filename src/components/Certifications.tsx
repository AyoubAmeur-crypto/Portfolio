import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CertItem {
  number: string;
  title: string;
  subtitle: string;
  issuer: string;
  date: string;
  credentialId?: string;
  tags: string[];
  icon: string;
}

const certs: CertItem[] = [
  {
    number: '01',
    title: 'Microservices with Java & Spring Boot',
    subtitle: 'Spring Cloud, Docker, Kubernetes, Helm & Kafka',
    issuer: 'Udemy',
    date: 'August 2026',
    credentialId: 'UC-55fe2f2e-313a-4bb4-9999-f39b44fc2914',
    tags: ['Microservices', 'Spring Cloud', 'Kubernetes', 'Apache Kafka', 'Security'],
    icon: 'hub',
  },
  {
    number: '02',
    title: 'Java Spring Boot Full Stack',
    subtitle: 'eCommerce Masterclass & Enterprise Persistence',
    issuer: 'Udemy',
    date: 'January 2026',
    credentialId: 'UC-9e56bce20-2660-44cf-91d6-1e8c2167827a',
    tags: ['Spring Boot', 'Spring Data JPA', 'REST Architecture', 'PostgreSQL'],
    icon: 'shopping_bag',
  },
  {
    number: '03',
    title: 'Playwright: Automated Testing',
    subtitle: 'End-to-End Automation & Quality Architectures',
    issuer: 'Master.dev',
    date: 'June 2026',
    tags: ['Playwright', 'Page Object Model', 'E2E Testing', 'API Mocking'],
    icon: 'verified',
  },
  {
    number: '04',
    title: 'AWS Academy Graduate',
    subtitle: 'Cloud Foundations',
    issuer: 'Amazon Web Services',
    date: 'March 2026',
    tags: ['Cloud Architecture', 'Scalable Infrastructure', 'AWS Services'],
    icon: 'cloud',
  },
  {
    number: '05',
    title: 'LLM Engineering with RAG',
    subtitle: 'Optimizing AI Solutions & Pipelines',
    issuer: 'Specialized Program',
    date: 'February 2026',
    tags: ['RAG Pipelines', 'LLM Engineering', 'Agentic Workflows'],
    icon: 'psychology',
  },
];

const CertCard: React.FC<{ cert: CertItem }> = ({ cert }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      backgroundColor: 'rgba(255,255,255,0.03)',
      borderColor: 'rgba(255,255,255,0.18)',
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.to(shimmerRef.current, {
      x: '100%',
      duration: 0.65,
      ease: 'power2.out',
    });
    gsap.to(numberRef.current, {
      color: 'rgba(255,255,255,0.7)',
      duration: 0.3,
    });
    gsap.to(arrowRef.current, {
      x: 4,
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
    });
    gsap.to(tagsRef.current?.children || [], {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const onLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,0.06)',
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.set(shimmerRef.current, { x: '-100%' });
    gsap.to(numberRef.current, {
      color: 'rgba(255,255,255,0.12)',
      duration: 0.3,
    });
    gsap.to(arrowRef.current, {
      x: 0,
      opacity: 0,
      duration: 0.3,
    });
    gsap.to(tagsRef.current?.children || [], {
      opacity: 0,
      y: 4,
      stagger: 0.03,
      duration: 0.25,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative rounded-2xl border p-8 md:p-10 cursor-pointer overflow-hidden group"
      style={{ borderColor: 'rgba(255,255,255,0.06)', transition: 'none' }}
    >
      {/* Shimmer sweep */}
      <div
        ref={shimmerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: 'translateX(-100%)',
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)',
        }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-5">
          {/* Number */}
          <span
            ref={numberRef}
            className="font-mono text-xs tracking-[0.2em]"
            style={{ color: 'rgba(255,255,255,0.12)' }}
          >
            {cert.number}
          </span>
          {/* Icon badge */}
          <div className="w-10 h-10 rounded-xl border border-white/8 flex items-center justify-center bg-white/3">
            <span className="material-symbols-outlined text-white/40 text-[18px]">{cert.icon}</span>
          </div>
        </div>

        {/* Arrow */}
        <div
          ref={arrowRef}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10"
          style={{ opacity: 0 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight mb-1">
        {cert.title}
      </h3>
      <p className="text-sm md:text-base text-white/40 font-light mb-6">{cert.subtitle}</p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <span className="text-xs font-mono uppercase tracking-[0.18em] text-white/30 border border-white/8 rounded-full px-3 py-1">
          {cert.issuer}
        </span>
        <span className="text-xs font-mono text-white/20">{cert.date}</span>
        {cert.credentialId && (
          <span className="text-[10px] font-mono text-white/20 truncate max-w-[200px]">
            ID: {cert.credentialId}
          </span>
        )}
      </div>

      {/* Tags */}
      <div ref={tagsRef} className="flex flex-wrap gap-2">
        {cert.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] text-white/50 border border-white/8 rounded-full px-3 py-1 font-medium tracking-wide"
            style={{ opacity: 0, transform: 'translateY(4px)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Certifications = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      }
    );

    gsap.fromTo(
      gridRef.current?.children || [],
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-40 px-6 md:px-24 bg-black border-t border-white/5" id="certifications">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/25 mb-4">Verified</p>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-none">
              Credentials.
            </h2>
          </div>
          <p className="text-gray-500 font-light text-sm md:text-base max-w-xs md:text-right">
            Industry-recognized certifications backing hands-on software engineering.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {certs.map((cert) => (
            <CertCard key={cert.number} cert={cert} />
          ))}
        </div>

        {/* Bottom stat bar */}
        <div className="mt-12 md:mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/25">
              Verified Certifications · 2026
            </span>
          </div>
          <span className="text-xs font-mono text-white/15 tracking-widest uppercase">
            Cloud · Microservices · AI · Quality Automation
          </span>
        </div>

      </div>
    </section>
  );
};

export default Certifications;
