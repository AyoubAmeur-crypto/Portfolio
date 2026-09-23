import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Figma assets
import grainyGradientBg from '../assets/grainy-gradient-hero-bg.png';
import bracketLeft from '../assets/bracket-left.svg';
import bracketRight from '../assets/bracket-right.svg';
import unionArrow from '../assets/union-arrow.svg';

interface HeadlineItem {
  prefix: string;
  suffix: string;
  audience: string;
}

const headlineItems: HeadlineItem[] = [
  {
    prefix: 'AYOUB',
    suffix: 'ameur',
    audience: 'SOFTWARE & AI',
  },
  {
    prefix: 'BACKEND',
    suffix: 'systems',
    audience: 'JAVA & SPRING BOOT',
  },
  {
    prefix: 'FULL-STACK',
    suffix: 'platforms',
    audience: 'REACT & NEXT.JS',
  },
  {
    prefix: 'AGENTIC',
    suffix: 'ai systems',
    audience: 'LANGCHAIN',
  },
  {
    prefix: 'QA',
    suffix: 'automation',
    audience: 'PLAYWRIGHT & CI/CD',
  },
];

// Helper to render letter-by-letter split text with 3D perspective
const SplitLetters: React.FC<{
  text: string;
  className?: string;
  itemKey: string;
  charClass: string;
}> = ({ text, className, itemKey, charClass }) => {
  const words = text.split(' ');

  return (
    <span
      className={`inline-flex flex-wrap items-baseline ${className || ''}`}
      style={{ perspective: '900px' }}
    >
      {words.map((word, wordIdx) => (
        <span
          key={`${itemKey}-w-${wordIdx}`}
          className="inline-flex items-baseline overflow-visible whitespace-nowrap"
        >
          {word.split('').map((char, charIdx) => (
            <span
              key={`${itemKey}-c-${wordIdx}-${charIdx}`}
              className={`${charClass} inline-block will-change-transform`}
              style={{
                transformOrigin: '50% 50% -25px',
                transformStyle: 'preserve-3d',
              }}
            >
              {char}
            </span>
          ))}
          {wordIdx < words.length - 1 && (
            <span className="inline-block w-[0.25em]">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const isTransitioningRef = useRef(false);

  // Transition to next slide with letter-by-letter spin animation
  const transitionToSlide = (nextIndex: number) => {
    if (isTransitioningRef.current || nextIndex === currentIndex) return;
    isTransitioningRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
      },
    });

    // Letters spin OUT upwards with staggered sequence
    tl.to(
      '.spin-char-prefix',
      {
        y: '-110%',
        rotateX: -80,
        opacity: 0,
        stagger: 0.015,
        duration: 0.35,
        ease: 'power2.in',
      },
      0
    )
      .to(
        '.spin-char-suffix',
        {
          y: '-110%',
          rotateX: -80,
          opacity: 0,
          stagger: 0.015,
          duration: 0.35,
          ease: 'power2.in',
        },
        0.02
      )
      .to(
        '.spin-char-audience',
        {
          y: '110%',
          rotateX: 80,
          opacity: 0,
          stagger: 0.012,
          duration: 0.3,
          ease: 'power2.in',
        },
        0.02
      );
  };

  // Auto-advance every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (currentIndex + 1) % headlineItems.length;
      transitionToSlide(next);
    }, 3500);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const isFirstMountRef = useRef(true);

  // Entrance animation for newly mounted letters
  useGSAP(() => {
    const isFirstMount = isFirstMountRef.current;
    if (isFirstMount) {
      isFirstMountRef.current = false;
    }
    const initialDelay = isFirstMount ? 0.45 : 0;

    const tl = gsap.timeline({
      delay: initialDelay,
      onComplete: () => {
        isTransitioningRef.current = false;
      },
    });

    // Letters spin IN from below with natural deceleration
    tl.fromTo(
      '.spin-char-prefix',
      { y: '110%', rotateX: 80, opacity: 0 },
      {
        y: '0%',
        rotateX: 0,
        opacity: 1,
        stagger: 0.022,
        duration: 0.65,
        ease: 'power3.out',
      },
      0
    )
      .fromTo(
        '.spin-char-suffix',
        { y: '110%', rotateX: 80, opacity: 0 },
        {
          y: '0%',
          rotateX: 0,
          opacity: 1,
          stagger: 0.022,
          duration: 0.65,
          ease: 'power3.out',
        },
        0.05
      )
      .fromTo(
        '.spin-char-audience',
        { y: '-110%', rotateX: -80, opacity: 0 },
        {
          y: '0%',
          rotateX: 0,
          opacity: 1,
          stagger: 0.015,
          duration: 0.58,
          ease: 'power3.out',
        },
        0.07
      );
  }, [currentIndex]);

  // Initial page load reveal (delayed until fonts and hero headline are rolling)
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', force3D: true },
      delay: 0.65,
    });

    tl.fromTo(
      paragraphRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.1
    ).fromTo(
      bottomBarRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75 },
      0.25
    );
  }, { scope: containerRef });

  const onMagnetMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width / 2) * 0.18,
      y: (e.clientY - r.top - r.height / 2) * 0.18,
      duration: 0.4,
      ease: 'power2.out',
      force3D: true,
    });
  };

  const onMagnetLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  const currentItem = headlineItems[currentIndex];

  // Unified headline font sizing to ensure identical dimensions across all titles
  // (AYOUB ameur, HIGH-END websites, MOBILE apps, DISTRIBUTED systems, QA automation)
  // preventing any height variance or layout shift ("giggling") of the description below.
  const UNIFIED_HEADLINE_CLASS = 'text-[clamp(36px,6.6vw,110px)] leading-[1.05]';

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black text-white selection:bg-white selection:text-black"
    >
      {/* ── Background: Original Figma Grainy Gradient ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${grainyGradientBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Subtle contrast overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />

      {/* Smooth bottom gradient fade into adjacent dark section */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />

      {/* ── Main Content Area ── */}
      <div className="relative z-20 w-full max-w-[1520px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pt-36 sm:pt-40 md:pt-48 pb-10 flex-1 flex flex-col justify-center">
        
        {/* Top Headline Block */}
        <div className="w-full">

          {/* Row 1: Smooth Letter-by-Letter Spinning Headline (Line 1) — Stabilized Height */}
          <div className="overflow-visible pt-1 pb-3 min-h-[clamp(50px,7.4vw,125px)] flex items-baseline">
            <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-5 md:gap-x-7">
              {/* Prefix (e.g. "AYOUB" / "HIGH-END" / "MOBILE" / "DISTRIBUTED" / "QA") */}
              <h1
                className={`font-headline-bold text-white uppercase tracking-[-0.03em] ${UNIFIED_HEADLINE_CLASS}`}
              >
                <SplitLetters
                  text={currentItem.prefix}
                  itemKey={`prefix-${currentIndex}`}
                  charClass="spin-char-prefix"
                />
              </h1>

              {/* Suffix (e.g. "ameur" / "websites" / "apps" / "systems" / "automation") */}
              <span
                className={`font-serif-italic font-normal lowercase tracking-tight text-white/60 inline-block ${UNIFIED_HEADLINE_CLASS}`}
              >
                <SplitLetters
                  text={currentItem.suffix}
                  itemKey={`suffix-${currentIndex}`}
                  charClass="spin-char-suffix"
                />
              </span>
            </div>
          </div>

          {/* Row 2: Bio Paragraph (Left) + Refined Dynamic "FOR STARTUPS / FREELANCE PROJECTS" (Right) */}
          <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Bio & Details of Ayoub Ameur (Locked width, never squeezed, anchored at top) */}
            <div
              ref={paragraphRef}
              className="lg:col-span-6 xl:col-span-6 w-full max-w-[520px] text-left self-start"
            >
              <p className="text-white/85 text-base sm:text-lg font-medium leading-relaxed tracking-[-0.01em] mb-6">
                I build reliable software products across backend, web, mobile and agentic AI — with testing and delivery treated as part of the product, not an afterthought. Software Engineering & AI 
              </p>

              {/* Role Tags (Clean, Static, No Dynamic Brightening) */}
              <div className="flex flex-wrap items-center gap-2 mb-7">
                {[
                  'Frontend & Mobile',
                  'Full-Stack & Backend',
                  'Java / Spring Boot',
                  'QA Automation',
                  'Agentic AI Systems',
                ].map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase text-white/80 bg-white/[0.08] border border-white/20 backdrop-blur-md"
                  >
                    {role}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href="#projects"
                  onMouseMove={onMagnetMove}
                  onMouseLeave={onMagnetLeave}
                  className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-black text-xs sm:text-sm font-semibold tracking-wide hover:bg-neutral-100 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-95 will-change-transform"
                >
                  View Work
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  onMouseMove={onMagnetMove}
                  onMouseLeave={onMagnetLeave}
                  className="inline-flex items-center px-7 py-3 rounded-full border border-white/30 text-white/90 text-xs sm:text-sm font-semibold tracking-wide hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-md active:scale-95 will-change-transform"
                >
                  Let's Talk
                </a>
              </div>
            </div>

            {/* Right Column: Dynamic Audience ("FOR STARTUPS" / "FREELANCE PROJECTS") */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-start lg:justify-end overflow-hidden pb-1 self-end">
              <div className="text-left lg:text-right">
                <h2
                  className={`font-headline-bold text-white uppercase tracking-[-0.02em] leading-[0.95] ${
                    currentItem.audience.length > 14
                      ? 'text-[clamp(26px,3.8vw,56px)]'
                      : 'text-[clamp(32px,4.8vw,74px)]'
                  }`}
                >
                  <SplitLetters
                    text={currentItem.audience}
                    itemKey={`audience-${currentIndex}`}
                    charClass="spin-char-audience"
                  />
                </h2>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Metrics Bar ── */}
      <div
        ref={bottomBarRef}
        className="relative z-20 w-full max-w-[1520px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pt-8 pb-8 md:pb-10"
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          
          {/* Stat Badges with Bracket Styling */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-8 lg:gap-12">
            {/* Pillar 1: Frontend */}
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-xs sm:text-sm tracking-wider">FRONTEND</span>
              <div className="flex items-center gap-1">
                <img src={bracketLeft} alt="[" className="h-3 w-auto" />
                <span className="text-white/60 font-mono text-[11px] sm:text-xs uppercase tracking-widest px-0.5">
                  React · Next · Native · Expo
                </span>
                <img src={bracketRight} alt="]" className="h-3 w-auto" />
              </div>
            </div>

            {/* Pillar 2: Core Stack */}
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-xs sm:text-sm tracking-wider">STACK</span>
              <div className="flex items-center gap-1">
                <img src={bracketLeft} alt="[" className="h-3 w-auto" />
                <span className="text-white/60 font-mono text-[11px] sm:text-xs uppercase tracking-widest px-0.5">
                  Java · Python · TypeScript
                </span>
                <img src={bracketRight} alt="]" className="h-3 w-auto" />
              </div>
            </div>

            {/* Pillar 3: Engineering Focus */}
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-xs sm:text-sm tracking-wider">FOCUS</span>
              <div className="flex items-center gap-1">
                <img src={bracketLeft} alt="[" className="h-3 w-auto" />
                <span className="text-white/60 font-mono text-[11px] sm:text-xs uppercase tracking-widest px-0.5">
                  Architecture & Quality
                </span>
                <img src={bracketRight} alt="]" className="h-3 w-auto" />
              </div>
            </div>
          </div>

          {/* Right: "SEE WORK" with union arrow */}
          <a
            href="#projects"
            className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
          >
            <img
              src={unionArrow}
              alt="Arrow"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1 opacity-80 group-hover:opacity-100"
            />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
              See Work
            </span>
          </a>

        </div>
      </div>
    </section>
  );
};

export default Hero;