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

import TogetherlyHome from './togetherly/pages/TogetherlyHome';
import CouplesMoneyPlanner from './togetherly/pages/CouplesMoneyPlanner';
import TogetherlyComingSoon from './togetherly/components/TogetherlyComingSoon';

gsap.registerPlugin(ScrollTrigger);

export type AppRoute =
  | { type: 'portfolio'; capabilityId: string | null }
  | { type: 'togetherly-home' }
  | { type: 'togetherly-planner' }
  | { type: 'togetherly-coming-soon' };

function resolveRoute(): AppRoute {
  if (typeof window === 'undefined') return { type: 'portfolio', capabilityId: null };

  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const hash = window.location.hash.toLowerCase();

  // Match Togetherly Coming Soon
  if (
    pathname === '/togetherly/coming-soon' ||
    hash.includes('coming-soon')
  ) {
    return { type: 'togetherly-coming-soon' };
  }

  // Match Togetherly Single Page
  if (
    pathname === '/togetherly' ||
    pathname.startsWith('/togetherly/') ||
    hash.startsWith('#/togetherly') ||
    hash === '#togetherly'
  ) {
    return { type: 'togetherly-home' };
  }

  // Match Capability Detail
  if (hash.startsWith('#/capability/')) {
    return { type: 'portfolio', capabilityId: hash.replace('#/capability/', '') };
  }

  return { type: 'portfolio', capabilityId: null };
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(resolveRoute);

  useEffect(() => {
    const handleLocationChange = () => {
      const nextRoute = resolveRoute();
      setRoute(nextRoute);

      if (nextRoute.type === 'portfolio' && !nextRoute.capabilityId) {
        const hash = window.location.hash;
        if (hash && hash !== '#' && hash !== '#hero' && !hash.startsWith('#/')) {
          setTimeout(() => {
            const lenis = (window as any).__lenis;
            if (lenis) {
              lenis.scrollTo(hash, { offset: -40, duration: 1 });
            } else {
              document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
            }
          }, 80);
        } else if (hash === '#hero' || (!hash && window.location.pathname === '/')) {
          setTimeout(() => {
            const lenis = (window as any).__lenis;
            if (lenis) {
              lenis.scrollTo(0, { duration: 1 });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 80);
        }
      } else if (
        nextRoute.type === 'togetherly-home' ||
        nextRoute.type === 'togetherly-planner' ||
        nextRoute.type === 'togetherly-coming-soon'
      ) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    if (path === '/') {
      window.history.pushState({}, '', '/');
      setRoute({ type: 'portfolio', capabilityId: null });
      window.scrollTo({ top: 0, behavior: 'instant' });
      const lenis = (window as any).__lenis;
      if (lenis) lenis.scrollTo(0, { immediate: true });
    } else if (path.startsWith('/togetherly')) {
      window.history.pushState({}, '', path);
      setRoute(resolveRoute());
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (path.startsWith('#/capability/')) {
      window.location.hash = path;
    } else if (path.startsWith('#')) {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/' + path);
        setRoute({ type: 'portfolio', capabilityId: null });
      } else {
        window.location.hash = path;
      }
    }
  };

  const handleSelectCapability = (id: string) => {
    window.location.hash = `#/capability/${id}`;
    setRoute({ type: 'portfolio', capabilityId: id });
    window.scrollTo({ top: 0, behavior: 'instant' });
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
  };

  const handleBackToHome = () => {
    window.location.hash = '#services';
    setRoute({ type: 'portfolio', capabilityId: null });
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
    // Only initialize Lenis when in portfolio main view
    if (route.type !== 'portfolio') {
      return;
    }

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
  }, [route.type, route.type === 'portfolio' ? route.capabilityId : null]);

  // Route: Togetherly Brand Home (/togetherly)
  if (route.type === 'togetherly-home') {
    return <TogetherlyHome onNavigate={navigateTo} />;
  }

  // Route: Couples Money Planner (/togetherly/couples-money-planner)
  if (route.type === 'togetherly-planner') {
    return <CouplesMoneyPlanner onNavigate={navigateTo} />;
  }

  // Route: Togetherly Coming Soon (/togetherly/coming-soon)
  if (route.type === 'togetherly-coming-soon') {
    return <TogetherlyComingSoon onNavigate={navigateTo} />;
  }

  // Route: Portfolio Capability Detail (#/capability/:id)
  if (route.type === 'portfolio' && route.capabilityId) {
    return (
      <div className="bg-black min-h-screen selection:bg-white selection:text-black">
        <CapabilityDetail
          capabilityId={route.capabilityId}
          onBack={handleBackToHome}
        />
      </div>
    );
  }

  // Default: Full Portfolio Page
  return (
    <div className="bg-black min-h-screen selection:bg-white selection:text-black">
      <Nav onNavigate={navigateTo} />
      <FloatingContact />
      <main className="relative">
        <Hero />
        <About />
        <Services onSelectCapability={handleSelectCapability} />
        <Skills />
        <Experience />
        <Projects onNavigate={navigateTo} />
        <Contributions />
        <Certifications />
        <Contact />
        <Footer onNavigate={navigateTo} />
      </main>
    </div>
  );
}
