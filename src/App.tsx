import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contributions from './components/Contributions';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import CapabilityDetail from './components/CapabilityDetail';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentCapability, setCurrentCapability] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const hash = window.location.hash;
    if (hash.startsWith('#/capability/')) {
      return hash.replace('#/capability/', '');
    }
    return null;
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/capability/')) {
        setCurrentCapability(hash.replace('#/capability/', ''));
      } else {
        setCurrentCapability(null);
        if (hash && hash !== '#' && hash !== '#hero') {
          setTimeout(() => {
            const lenis = (window as any).__lenis;
            if (lenis) {
              lenis.scrollTo(hash, { offset: -40, duration: 1 });
            } else {
              document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
            }
          }, 80);
        } else if (hash === '#hero') {
          setTimeout(() => {
            const lenis = (window as any).__lenis;
            if (lenis) {
              lenis.scrollTo(0, { duration: 1 });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 80);
        }
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleSelectCapability = (id: string) => {
    window.location.hash = `#/capability/${id}`;
    setCurrentCapability(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
  };

  const handleBackToHome = () => {
    window.location.hash = '#services';
    setCurrentCapability(null);
    setTimeout(() => {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo('#services', { offset: -40, duration: 1 });
      } else {
        document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(500, 33);

    (window as any).__lenis = lenis;

    return () => {
      delete (window as any).__lenis;
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [currentCapability]);

  return (
    <div className="bg-black min-h-screen selection:bg-white selection:text-black">
      {currentCapability ? (
        <CapabilityDetail
          capabilityId={currentCapability}
          onBack={handleBackToHome}
        />
      ) : (
        <>
          <Nav />
          <FloatingContact />
          <main className="relative">
            <Hero />
            <About />
            <Services onSelectCapability={handleSelectCapability} />
            <Skills />
            <Experience />
            <Projects />
            <Contributions />
            <Certifications />
            <Contact />
            <Footer />
          </main>
        </>
      )}
    </div>
  );
}
