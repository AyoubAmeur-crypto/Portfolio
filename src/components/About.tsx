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
    // Smooth scrub for the philosophical text
    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 1.5
      },
      opacity: 0.1,
      y: 50,
      ease: 'none'
    });

    // Staggered premium pop for metrics
    gsap.from(metricsRef.current?.children || [], {
      scrollTrigger: {
        trigger: metricsRef.current,
        start: 'top 85%',
      },
      scale: 0.9,
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: 'elastic.out(1, 0.7)'
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-40 px-6 md:px-24 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
        <div ref={textRef} className="md:col-span-6">
          <h2 className="text-4xl md:text-7xl font-bold mb-6 md:mb-10 tracking-tight text-white leading-none\">
            The Digital<br />Alchemist.
          </h2>
          <p className="text-lg md:text-4xl text-gray-400 leading-snug font-light">
            "Code is no longer just logic; it's the substrate for <span className="text-white italic\">artificial cognition</span>. I architect the bridge between human intent and machine execution."
          </p>
        </div>
        <div ref={metricsRef} className="md:col-span-5 md:col-start-8 grid grid-cols-2 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-16 mt-10 md:mt-0\">
          <div className="flex flex-col border-t border-white/10 pt-4 md:pt-6 hover:border-white/40 transition-colors duration-500 cursor-default">
            <span className="text-4xl md:text-6xl font-bold text-white mb-2 md:mb-3 tracking-tighter\">01</span>
            <span className="text-xs md:text-sm text-gray-500 font-mono uppercase tracking-widest\">Years Experience</span>
          </div>
          <div className="flex flex-col border-t border-white/10 pt-6 hover:border-white/40 transition-colors duration-500 cursor-default">
            <span className="text-4xl md:text-6xl font-bold text-white mb-2 md:mb-3 tracking-tighter">05+</span>
            <span className="text-xs md:text-sm text-gray-500 font-mono uppercase tracking-widest">Shipped Projects</span>
          </div>
          <div className="flex flex-col border-t border-white/10 pt-6 hover:border-white/40 transition-colors duration-500 cursor-default">
            <span className="text-4xl md:text-6xl font-bold text-white mb-2 md:mb-3 tracking-tighter">12+</span>
            <span className="text-xs md:text-sm text-gray-500 font-mono uppercase tracking-widest">Certifications</span>
          </div>
          <div className="flex flex-col border-t border-white/10 pt-6 hover:border-white/40 transition-colors duration-500 cursor-default">
            <span className="text-4xl md:text-6xl font-bold text-white mb-2 md:mb-3 tracking-tighter">24/7</span>
            <span className="text-xs md:text-sm text-gray-500 font-mono uppercase tracking-widest">Problem Solver</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
