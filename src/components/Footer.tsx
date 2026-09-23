import React, { useState, useRef } from 'react';
import ayoubLogo from '../assets/ayoublogo.png';

const Footer: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const wordmarkContainerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mouse spotlight calculation inside the wordmark container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wordmarkContainerRef.current) return;
    const rect = wordmarkContainerRef.current.getBoundingClientRect();
    const xPercent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const yPercent = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x: xPercent, y: yPercent });
  };

  return (
    <footer className="w-full bg-black text-white border-t border-white/10 relative overflow-hidden select-none">

      {/* Ambient background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-white/[0.03] blur-[160px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* ── Top Navigation & Brand Bar ── */}
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start justify-between">

          {/* Col 1: Brand Logo & Bio Statement */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <a href="#hero" className="inline-block w-fit group">
              <img
                src={ayoubLogo}
                alt="Ayoub Ameur Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.35)] group-hover:scale-105 transition-transform duration-300"
              />
            </a>

            <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed max-w-md">
              Software Engineering & AI  building full-stack platforms, backend services, automated quality systems, and agentic AI products. Focused on clean architecture and reliable delivery.
            </p>


          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col gap-3">
            <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-1">
              Navigation
            </p>
            <a href="#hero" className="text-white/70 hover:text-white text-sm transition-colors duration-200">
              Overview
            </a>
            <a href="#about" className="text-white/70 hover:text-white text-sm transition-colors duration-200">
              About & Education
            </a>
            <a href="#services" className="text-white/70 hover:text-white text-sm transition-colors duration-200">
              Core Capabilities
            </a>
            <a href="#skills" className="text-white/70 hover:text-white text-sm transition-colors duration-200">
              Technical Skills
            </a>
            <a href="#projects" className="text-white/70 hover:text-white text-sm transition-colors duration-200">
              Featured Work
            </a>
            <a href="#experience" className="text-white/70 hover:text-white text-sm transition-colors duration-200">
              Experience & Timeline
            </a>
            <a href="#certifications" className="text-white/70 hover:text-white text-sm transition-colors duration-200">
              Certifications
            </a>
          </div>

          {/* Col 3: Connect & Socials + Back to Top */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-1">
              Connect
            </p>
            <a
              href="https://github.com/AyoubAmeur-crypto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              GitHub <span className="text-white/30 text-xs">↗</span>
            </a>
            <a
              href="https://linkedin.com/in/ayoub-ameur-772a70362"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              LinkedIn <span className="text-white/30 text-xs">↗</span>
            </a>
            <a
              href="https://wa.me/212770566628"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              WhatsApp <span className="text-white/30 text-xs">↗</span>
            </a>
            <a
              href="mailto:ayoubameur.tech@gmail.com"
              className="text-white/70 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              ayoubameur.tech@gmail.com <span className="text-white/30 text-xs">↗</span>
            </a>
            <button
              onClick={scrollToTop}
              className="text-white/50 hover:text-white text-sm transition-colors duration-200 text-left pt-2 font-mono flex items-center gap-1.5 cursor-pointer"
            >
              Back to Top <span>↑</span>
            </button>
          </div>

        </div>
      </div>

      {/* ── Colossal Edge-to-Edge Big Wordmark (Merged Fluidly with Top Section) ── */}
      <div className="w-full overflow-hidden flex flex-col items-center justify-end">

        <div
          ref={wordmarkContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full px-1 sm:px-2 md:px-4 pb-2 sm:pb-4 overflow-visible cursor-default group"
        >
          {/* Dynamic cursor-following atmospheric light disc */}
          <div
            className="absolute pointer-events-none rounded-full blur-[120px] transition-opacity duration-500 ease-out"
            style={{
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              width: '600px',
              height: '350px',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(185,195,255,0.25) 0%, rgba(255,255,255,0.12) 40%, transparent 75%)',
              opacity: isHovered ? 1 : 0.4,
            }}
          />

          <svg
            viewBox="0 0 1320 250"
            className="w-full h-auto select-none overflow-visible transition-transform duration-700 ease-out group-hover:scale-[1.01] block"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Liquid Chrome Platinum Base Gradient */}
              <linearGradient id="liquidChromeBase" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
                <stop offset="35%" stopColor="#e2e8f0" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#94a3b8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#334155" stopOpacity="0.1" />
              </linearGradient>

              {/* Dynamic Mouse Spotlight Gradient */}
              <radialGradient
                id="interactiveSpotlight"
                cx={`${mousePos.x}%`}
                cy={`${mousePos.y}%`}
                r="42%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="45%" stopColor="#b9c3ff" stopOpacity="0.75" />
                <stop offset="80%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              {/* Soft Ambient Text Glow Filter */}
              <filter id="auraGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Glow Layer (Active on Hover) */}
            <text
              x="50%"
              y="190"
              textAnchor="middle"
              filter="url(#auraGlow)"
              className="transition-opacity duration-700 pointer-events-none"
              style={{
                opacity: isHovered ? 0.45 : 0.08,
                fill: 'url(#interactiveSpotlight)',
              }}
            >
              <tspan
                style={{
                  fontFamily: '"Plus Jakarta Sans", "Space Grotesk", sans-serif',
                  fontWeight: 900,
                  fontSize: '200px',
                  letterSpacing: '-0.045em',
                }}
              >
                AYOUB
              </tspan>
              <tspan dx="25" style={{ fontSize: '200px' }}> </tspan>
              <tspan
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '235px',
                  letterSpacing: '-0.02em',
                }}
              >
                ameur
              </tspan>
            </text>

            {/* Base Layer: Primary Render */}
            <text
              x="50%"
              y="190"
              textAnchor="middle"
              className="transition-all duration-500"
            >
              {/* AYOUB: Heavy Architectural Sans */}
              <tspan
                fill={isHovered ? 'url(#interactiveSpotlight)' : 'url(#liquidChromeBase)'}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.2"
                style={{
                  fontFamily: '"Plus Jakarta Sans", "Space Grotesk", sans-serif',
                  fontWeight: 900,
                  fontSize: '200px',
                  letterSpacing: '-0.045em',
                  transition: 'fill 0.4s ease, stroke 0.4s ease',
                }}
              >
                AYOUB
              </tspan>

              <tspan dx="25" style={{ fontSize: '200px' }}> </tspan>

              {/* ameur: Elegant Italian Display Serif Italic */}
              <tspan
                fill={isHovered ? 'url(#interactiveSpotlight)' : 'url(#liquidChromeBase)'}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.8"
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '235px',
                  letterSpacing: '-0.02em',
                  transition: 'fill 0.4s ease, stroke 0.4s ease',
                }}
              >
                ameur
              </tspan>
            </text>

            {/* Specular Spotlight Reflection Layer (Reveals vibrant highlight under cursor) */}
            <text
              x="50%"
              y="190"
              textAnchor="middle"
              pointerEvents="none"
              style={{
                fill: 'url(#interactiveSpotlight)',
                opacity: isHovered ? 0.85 : 0.15,
                transition: 'opacity 0.4s ease',
                mixBlendMode: 'screen',
              }}
            >
              <tspan
                style={{
                  fontFamily: '"Plus Jakarta Sans", "Space Grotesk", sans-serif',
                  fontWeight: 900,
                  fontSize: '200px',
                  letterSpacing: '-0.045em',
                }}
              >
                AYOUB
              </tspan>
              <tspan dx="25" style={{ fontSize: '200px' }}> </tspan>
              <tspan
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '235px',
                  letterSpacing: '-0.02em',
                }}
              >
                ameur
              </tspan>
            </text>
          </svg>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
