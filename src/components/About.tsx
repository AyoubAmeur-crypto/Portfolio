import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0.15, y: 40 },
      {
        opacity: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 45%',
          scrub: 0.5,
        },
      }
    );

    gsap.fromTo(
      metricsRef.current?.children || [],
      { scale: 0.95, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: metricsRef.current,
          start: 'top 85%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-36 px-6 md:px-24 bg-black border-t border-white/5 relative overflow-hidden" id="about">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
        
        {/* Left Column: Core Positioning Story */}
        <div ref={textRef} className="md:col-span-6">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/30 mb-4">Background & Philosophy</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight text-white leading-[1.05]">
            Engineering<br />
            <span className="text-white/40">for Reliability.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-light mb-6">
            Software Engineering & Artificial Intelligence engineering student at <span className="text-white font-medium">ENSA Fès</span> building full-stack platforms, backend services, automated quality systems, and agentic AI products.
          </p>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light">
            I care about architecture, testing, and the production details that turn code into reliable software people can actually use. Outside engineering, I bring a visual perspective through photography and videography.
          </p>
        </div>

        {/* Right Column: 4 Grounded Pillars */}
        <div ref={metricsRef} className="md:col-span-5 md:col-start-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-12 mt-8 md:mt-0">
          
          <div className="flex flex-col border-t border-white/10 pt-4 md:pt-6 hover:border-white/40 transition-colors duration-500 cursor-default">
            <span className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Frontend</span>
            <span className="text-xs text-white/50 font-mono uppercase tracking-wider">React · Next · Native · Expo</span>
            <span className="text-[11px] text-white/30 font-mono mt-1">Web, iOS & Android interfaces</span>
          </div>

          <div className="flex flex-col border-t border-white/10 pt-4 md:pt-6 hover:border-white/40 transition-colors duration-500 cursor-default">
            <span className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Backend</span>
            <span className="text-xs text-white/50 font-mono uppercase tracking-wider">Java · Spring · Node · REST</span>
            <span className="text-[11px] text-white/30 font-mono mt-1">PostgreSQL, JWT, Microservices</span>
          </div>

          <div className="flex flex-col border-t border-white/10 pt-4 md:pt-6 hover:border-white/40 transition-colors duration-500 cursor-default">
            <span className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Software QA</span>
            <span className="text-xs text-white/50 font-mono uppercase tracking-wider">Playwright E2E & Tests</span>
            <span className="text-[11px] text-white/30 font-mono mt-1">Page Object Model, CI & SQL seed</span>
          </div>

          <div className="flex flex-col border-t border-white/10 pt-4 md:pt-6 hover:border-white/40 transition-colors duration-500 cursor-default">
            <span className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Agentic AI</span>
            <span className="text-xs text-white/50 font-mono uppercase tracking-wider">LangChain · LangGraph · MCP</span>
            <span className="text-[11px] text-white/30 font-mono mt-1">Autonomous tool chains & pipelines</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
