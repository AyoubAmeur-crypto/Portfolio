import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../assets/ayoublogo.png';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef     = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo(headerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(logoRef.current,
      { y: 40, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power4.out" },
      "-=0.4"
    )
    .fromTo(itemsRef.current?.children ?? [],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" },
      "-=0.7"
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden bg-black"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-neutral-100/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center gap-24">
        
        {/* Header section */}
        <div ref={headerRef} className="text-center space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-white/30">Value Proposition</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white">Why Choose Me?</h2>
        </div>

        {/* Logo Hero Card */}
        <div ref={logoRef} className="relative group">
          <div className="absolute -inset-10 bg-white/5 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
          <div className="relative px-12 py-12 md:px-16 md:py-16 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-[0_32px_96px_-16px_rgba(0,0,0,0.8)]">
            <img 
              src={logo} 
              alt="Ayoub Logo" 
              className="w-32 md:w-44 h-auto object-contain"
            />
          </div>
        </div>

        {/* Detailed Pills with Glassy Effect */}
        <div ref={itemsRef} className="grid md:grid-cols-3 gap-6 w-full">
          {[
            { 
              title: 'Cognitive Logic', 
              desc: 'Architecting deep system logic where pure code transcends into artificial intelligence.',
              tag: 'AI/ML'
            },
            { 
              title: 'Full-Stack Precision', 
              desc: 'Relentless focus on performance, scalability, and pixel-perfect technical execution.',
              tag: 'Engineering'
            },
            { 
              title: 'Agentic Autonomy', 
              desc: 'Developing self-governing systems that solve business complexities with precision.',
              tag: 'Agentic'
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-2xl hover:bg-white/[0.05] hover:border-white/20 transition-all duration-700 text-left flex flex-col gap-8"
            >
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 px-2 py-1 rounded bg-white/5 border border-white/5">{item.tag}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0)] group-hover:shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold tracking-wide text-white/90">{item.title}</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
