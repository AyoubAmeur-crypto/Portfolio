import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroBg from '../assets/heroBg.jpg';

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef      = useRef<HTMLHeadingElement>(null);
  const roleRef      = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const metaRef      = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ 
      defaults: { ease: 'power4.out', force3D: true },
      delay: 0.8 // Added delay for smoother loading
    });

    tl.add(() => {
      if (!nameRef.current) return;
      nameRef.current.style.visibility = 'visible';
      const split = new SplitText(nameRef.current, { type: 'chars' });
      gsap.fromTo(split.chars,
        { y: '110%' },
        { y: '0%', stagger: 0.02, duration: 0.8, ease: 'expo.out' }
      );
    }, 0)

    .fromTo([roleRef.current, "#quote"],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 },
      0.15
    )

    .fromTo(ctaRef.current?.children ?? [],
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.4 },
      0.25
    )

    .fromTo(metaRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      0.4
    );

  }, { scope: containerRef });

  useEffect(() => {
    if (nameRef.current) nameRef.current.style.visibility = 'hidden';
  }, []);

  const onMagnetMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width / 2) * 0.18,
      y: (e.clientY - r.top - r.height / 2) * 0.18,
      duration: 0.4, ease: 'power2.out',
      force3D: true
    });
  };
  const onMagnetLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden"
      id="hero"
    >
      {/* ── Full-bleed background image ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.6)' }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 h-full w-full flex flex-col justify-center px-8 md:px-16 pt-40 md:pt-60 pb-20 max-w-[1400px] mx-auto">


        {/* Main content block */}
        <div className="pb-10 ">

          {/* Name */}
          <div className="overflow-hidden mb-5">
            <h1
              ref={nameRef}
              className="font-bold text-white leading-[0.88] tracking-tight will-change-transform"
              style={{ fontSize: 'clamp(66px, 9vw, 132px)' }}
            >
              Ayoub<br />Ameur
            </h1>
          </div>

          {/* Role tags */}
          <div ref={roleRef} className="flex flex-wrap gap-2 mb-6 opacity-0 mt-8">
            {['Full-Stack Engineer', 'AI & Agentic Systems', 'Mobile Developer'].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono tracking-[0.14em] uppercase text-white/55 border border-white/20 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* AI Quote */}
          <p id="quote" className="text-gray-100 text-lg md:text-xl font-light italic mb-10 max-w-lg leading-relaxed opacity-0">
            "Architecting the bridge between logic and artificial cognition — where code becomes the substrate for intelligence."
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex gap-4 items-center flex-wrap">
            <a
              href="#projects"
              onMouseMove={onMagnetMove}
              onMouseLeave={onMagnetLeave}
              className="inline-flex items-center gap-2 opacity-0 px-7 py-3.5 rounded-full bg-white text-black text-sm font-semibold tracking-wide hover:bg-gray-100 transition-colors duration-300"
            >
              View Work
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              onMouseMove={onMagnetMove}
              onMouseLeave={onMagnetLeave}
              className="inline-flex items-center opacity-0 px-7 py-3.5 rounded-full border border-white/30 text-white text-sm font-semibold tracking-wide hover:bg-white/10 hover:border-white/50 transition-all duration-300 will-change-transform"
            >
              Let's Talk
            </a>
          </div>
        </div>

        

      </div>
    </section>
  );
};

export default Hero;