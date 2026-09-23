import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '../assets/ayoublogo.png'

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.35,
    });
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      className="fixed left-0 top-0 w-full flex justify-center pointer-events-none z-[9999]"
      style={{ zIndex: 9999 }}
    >
      <div
        className={`
          pointer-events-auto
          flex justify-between items-center
          rounded-full
          transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]
          ${scrolled
            ? 'w-[94%] md:w-[880px] lg:w-[980px] py-3.5 px-6 sm:px-8 md:px-10 mt-5 bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.5)]' 
            : 'w-full max-w-[1400px] py-4 px-10 md:px-12 mt-4 md:mt-6 bg-transparent border-0 border-transparent shadow-none'
          }
        `}
      >
        {/* Logo */}
        <a href="#" className="group flex flex-col relative overflow-hidden shrink-0">
          <img src={logo} alt="" className='h-9 md:h-10' />
        </a>

        {/* Links */}
        <div className="text-white hidden md:flex gap-6 lg:gap-8 xl:gap-10 items-center justify-center flex-1 text-sm font-medium px-4 md:px-6">
          {[
            { label: 'About', href: '#about' },
            { label: 'Projects', href: '#projects' },
            { label: 'Skills', href: '#skills' },
            { label: 'Experience', href: '#experience' },
            { label: 'Certifications', href: '#certifications' },
          ].map((item, i) => (
            <div key={i} className="relative group overflow-hidden">
              <a
                className="text-white/80 hover:text-white transition-colors duration-300"
                href={item.href}
              >
                {item.label}
              </a>
              <span className="absolute bottom-0 left-0 w-full h-px bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center shrink-0 pr-2">
          <a
            href="#contact"
            className="px-5 py-2 md:px-6 md:py-2.5 bg-white text-black text-xs md:text-sm font-semibold rounded-full hover:scale-105 active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Connect
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;