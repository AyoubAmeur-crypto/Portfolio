import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '../assets/ayoublogo.png'

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.2,
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
            ? 'w-[90%] md:w-[700px] py-4 px-8 md:px-8 mt-6 bg-white/20 backdrop-blur-md' 
            : 'w-full max-w-[1400px] py-4 px-10 md:px-12 mt-4 md:mt-6'
          }
        `}
      >
        {/* Logo */}
        <a href="#" className="group flex flex-col relative overflow-hidden shrink-0">
          <img src={logo} alt="" className='h-10' />
        </a>

        {/* Links */}
        <div className="text-white hidden md:flex gap-8 lg:gap-12 items-center justify-center flex-1 text-sm font-medium">
          {['Projects', 'Intelligence', 'Experience'].map((label, i) => (
            <div key={i} className="relative group overflow-hidden">
              <a
                className="text-white hover:text-white transition-colors duration-300"
                href={`#${label.toLowerCase()}`}
              >
                {label}
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