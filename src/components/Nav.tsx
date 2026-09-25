import React, { useEffect, useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X, ArrowUpRight, Github, Linkedin, MessageSquare, Mail } from 'lucide-react';
import logo from '../assets/ayoublogo.png';

interface MenuItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  tag: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: '#hero', num: '00', title: 'OVERVIEW', subtitle: 'Introduction & Hero', tag: 'Index' },
  { id: '#about', num: '01', title: 'ABOUT', subtitle: 'Philosophy & Background', tag: 'Identity' },
  { id: '#services', num: '02', title: 'SERVICES', subtitle: 'Architecture & AI Offerings', tag: 'Solutions' },
  { id: '#skills', num: '03', title: 'SKILLS', subtitle: 'Tech Stack & Engineering', tag: 'Expertise' },
  { id: '#experience', num: '04', title: 'EXPERIENCE', subtitle: 'Journey & Achievements', tag: 'Timeline' },
  { id: '#projects', num: '05', title: 'PROJECTS', subtitle: 'Selected Works & Systems', tag: 'Portfolio' },
  { id: '#contributions', num: '06', title: 'CONTRIBUTIONS', subtitle: 'Open-Source & GitHub Activity', tag: 'Community' },
  { id: '#certifications', num: '07', title: 'CERTIFICATIONS', subtitle: 'Licenses & Credentials', tag: 'Honors' },
  { id: '#contact', num: '08', title: 'CONTACT', subtitle: "Let's Build Together", tag: 'Inquiry' },
];

const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // 1. Track scroll for floating navbar morphing
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Initial navbar entrance animation
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.35,
    });
  }, { scope: navRef });

  // 3. Smooth Close Menu & Navigate ("drag back and send me to section")
  const closeMenu = useCallback((targetHref?: string) => {
    if (isAnimating.current || !overlayRef.current) return;
    isAnimating.current = true;
    if (targetHref) setActiveTarget(targetHref);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        setActiveTarget(null);
        isAnimating.current = false;
        document.body.style.overflow = '';

        // Resume smooth scroll & smoothly scroll to target
        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.start();
          if (targetHref) {
            lenis.scrollTo(targetHref, {
              offset: -40,
              duration: 1.15,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        } else if (targetHref) {
          const el = document.querySelector(targetHref);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.hash = targetHref;
          }
        }
      },
    });

    // Exit stagger for links
    tl.to('.menu-nav-item', {
      y: -15,
      opacity: 0,
      duration: 0.2,
      stagger: 0.015,
      ease: 'power3.in',
    });

    // Curtain slides back up smoothly
    tl.to(
      overlayRef.current,
      {
        yPercent: -100,
        duration: 0.48,
        ease: 'power4.inOut',
      },
      '-=0.1'
    );
  }, []);

  // 4. Open Menu ("drag smoothly like the trendy menus now that cover all the screen")
  const openMenu = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsOpen(true);

    // Stop background scroll while menu is open
    (window as any).__lenis?.stop();
    document.body.style.overflow = 'hidden';

    // Wait for DOM render of overlay
    requestAnimationFrame(() => {
      if (!overlayRef.current) {
        isAnimating.current = false;
        return;
      }

      // Reset transforms
      gsap.set(overlayRef.current, { yPercent: -100, opacity: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      // Curtain slides down
      tl.to(overlayRef.current, {
        yPercent: 0,
        duration: 0.55,
        ease: 'power4.out',
      });

      // Stagger in links
      tl.fromTo(
        '.menu-nav-item',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.38,
          stagger: 0.025,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    });
  }, []);

  // 5. Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  // 6. Clean up body scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      (window as any).__lenis?.start();
    };
  }, []);

  return (
    <>
      {/* ── Main Sticky / Floating Navigation Header ── */}
      <nav
        ref={navRef}
        className="fixed left-0 top-0 w-full flex justify-center pointer-events-none z-[9990]"
        style={{ zIndex: 9990 }}
      >
        <div
          className={`
            pointer-events-auto
            flex justify-between items-center
            rounded-full
            transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]
            ${
              scrolled
                ? 'w-[94%] md:w-[780px] lg:w-[860px] py-3 px-5 sm:px-7 md:px-8 mt-4 bg-white/10 backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
                : 'w-full max-w-[1400px] py-4 px-6 sm:px-10 md:px-12 mt-4 md:mt-6 bg-transparent border-0 border-transparent shadow-none'
            }
          `}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              if (isOpen) {
                closeMenu('#hero');
              } else {
                const lenis = (window as any).__lenis;
                if (lenis) lenis.scrollTo('#hero', { offset: 0, duration: 1 });
                else document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group flex items-center gap-3 relative overflow-hidden shrink-0 cursor-pointer"
            aria-label="Ayoub Ameur Home"
          >
            <img
              src={logo}
              alt="Ayoub Ameur Logo"
              className="h-9 md:h-10 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
            />
          </a>

          {/* Right Action Group: Menu Trigger + Connect CTA */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* The Trendy Menu Trigger Button (Clean, without the dot) */}
            <button
              onClick={openMenu}
              className="group relative flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/30 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              aria-label="Open Fullscreen Navigation Menu"
            >
              {/* Menu Text */}
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-white uppercase font-mono">
                Menu
              </span>

              {/* Animated Bespoke 2-Bar Icon */}
              <div className="flex flex-col gap-1 w-4 justify-center items-end">
                <span className="h-[1.5px] w-4 bg-white transition-all duration-300 group-hover:w-4" />
                <span className="h-[1.5px] w-2.5 bg-white/80 transition-all duration-300 group-hover:w-4 group-hover:bg-white" />
              </div>
            </button>

            {/* Connect CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const lenis = (window as any).__lenis;
                if (lenis) lenis.scrollTo('#contact', { offset: -40, duration: 1.15 });
                else document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white text-black text-xs sm:text-sm font-semibold rounded-full hover:scale-105 active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(255,255,255,0.45)] cursor-pointer"
            >
              Connect
            </a>
          </div>
        </div>
      </nav>

      {/* ── 100% Solid Black Fullscreen Curtain Menu Overlay ── */}
      {isOpen && (
        <div
          ref={overlayRef}
          data-lenis-prevent
          className="fixed inset-0 w-full h-[100dvh] bg-[#000000] text-white overflow-y-auto overflow-x-hidden select-none"
          style={{ zIndex: 999999 }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Ambient Lighting Accents (Deep atmospheric contrast) */}
          <div
            className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[200px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[200px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Floating Luxury Close Button (Fixed at top right) */}
          <div className="fixed top-5 right-5 sm:top-8 sm:right-10 md:right-14 z-[1000000]">
            <button
              onClick={() => closeMenu()}
              className="group flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white transition-all duration-300 active:scale-95 cursor-pointer shadow-[0_0_25px_rgba(0,0,0,0.8)]"
              aria-label="Close navigation menu"
            >
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest font-semibold">
                Close
              </span>
              <span className="text-[10px] font-mono opacity-50 group-hover:opacity-100 hidden sm:inline px-1.5 py-0.5 rounded bg-black/20 group-hover:bg-black/10">
                ESC
              </span>
              <X className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {/* ── Wide, Spacious Full-Bleed Content Wrapper ── */}
          <div className="min-h-full w-full max-w-[1560px] mx-auto flex flex-col justify-between px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 py-12 sm:py-16 md:py-20 relative z-10">
            {/* Top spacer so links don't collide with close button */}
            <div className="w-full h-4 sm:h-6" />

            {/* Editorial Section Links (Expansive width & colossal sizing on desktop) */}
            <div className="w-full flex flex-col my-auto py-4">
              {MENU_ITEMS.map((item, idx) => {
                const isHovered = hoveredIdx === idx;
                const isAnyHovered = hoveredIdx !== null;
                const isClicked = activeTarget === item.id;

                return (
                  <div
                    key={item.id}
                    className="menu-nav-item w-full border-b border-white/[0.04] hover:border-white/20 transition-colors duration-300"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <button
                      onClick={() => closeMenu(item.id)}
                      className={`
                        w-full flex items-center justify-between py-2 sm:py-2.5 md:py-3.5 lg:py-4 px-2 sm:px-4 md:px-6 rounded-2xl
                        text-left cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                        ${isClicked ? 'scale-[0.99] text-white' : ''}
                        ${isAnyHovered && !isHovered ? 'opacity-25' : 'opacity-100'}
                        ${isHovered ? 'bg-white/[0.03]' : ''}
                      `}
                    >
                      {/* Left: Number + Colossal Headline + Editorial Subtitle */}
                      <div className="flex items-baseline gap-3 sm:gap-5 md:gap-8 lg:gap-12 min-w-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 sm:group-hover:translate-x-4 md:group-hover:translate-x-6">
                        {/* Index Number */}
                        <span
                          className={`
                            font-mono text-xs sm:text-sm md:text-base lg:text-lg tracking-widest transition-colors duration-300 shrink-0
                            ${isHovered ? 'text-white font-semibold' : 'text-white/40'}
                          `}
                        >
                          [{item.num}]
                        </span>

                        {/* Responsive Headline (Compact on small, Colossal on large displays) */}
                        <span
                          className={`
                            font-headline text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light tracking-tight transition-all duration-300 leading-none shrink-0
                            ${
                              isHovered
                                ? 'text-white font-normal drop-shadow-[0_0_35px_rgba(255,255,255,0.7)]'
                                : 'text-white/80'
                            }
                          `}
                        >
                          {item.title}
                        </span>

                        {/* Editorial Subtitle (Shown on tablet and large screens) */}
                        <span
                          className={`
                            font-serif-italic text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl transition-all duration-300 hidden md:inline-block truncate text-white/40
                            ${isHovered ? 'text-white/90 translate-x-2' : 'text-white/30 translate-x-0'}
                          `}
                        >
                          — {item.subtitle}
                        </span>
                      </div>

                      {/* Right: Category Tag + Hover Arrow Indicator */}
                      <div className="flex items-center gap-3 md:gap-5 shrink-0 ml-3">
                        <span className="hidden lg:inline-block text-[11px] xl:text-xs font-mono uppercase tracking-widest text-white/30 group-hover:text-white/70 px-3 py-1 rounded-full border border-white/10 group-hover:border-white/30 transition-all duration-300">
                          {item.tag}
                        </span>

                        <div
                          className={`
                            w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border transition-all duration-300
                            ${
                              isHovered
                                ? 'border-white bg-white text-black scale-105 shadow-[0_0_25px_rgba(255,255,255,0.5)]'
                                : 'border-white/10 text-white/30'
                            }
                          `}
                        >
                          <ArrowUpRight
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-transform duration-300 ${
                              isHovered ? 'rotate-45' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ── Contact Section at the End (Spanning Wide Across the Bottom) ── */}
            <div className="w-full pt-8 md:pt-12 mt-8 md:mt-12 border-t border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs sm:text-sm font-mono text-white/50">
              <div className="flex items-center gap-3">
                <span className="text-white/30 uppercase tracking-widest text-[11px] hidden sm:inline">Direct Inquiries:</span>
                <a
                  href="mailto:ayoubameur.tech@gmail.com"
                  className="hover:text-white transition-colors duration-200 flex items-center gap-2 text-white/70 hover:text-white"
                >
                  <Mail className="w-4 h-4 text-white/40" />
                  <span>ayoubameur.tech@gmail.com</span>
                </a>
              </div>

              <div className="flex items-center gap-6 sm:gap-8">
                <a
                  href="https://github.com/AyoubAmeur-crypto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4 text-white/40" />
                  <span>GitHub ↗</span>
                </a>
                <a
                  href="https://linkedin.com/in/ayoub-ameur-772a70362"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                >
                  <Linkedin className="w-4 h-4 text-white/40" />
                  <span>LinkedIn ↗</span>
                </a>
                <a
                  href="https://wa.me/212770566628"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200 flex items-center gap-1.5 hidden sm:flex"
                >
                  <MessageSquare className="w-4 h-4 text-white/40" />
                  <span>WhatsApp ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;