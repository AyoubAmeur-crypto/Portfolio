import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader2, ArrowRight, X } from 'lucide-react';
import gsap from 'gsap';
import ayoubLogo from '../assets/ayoublogo.png';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);
  const btnWrapperRef = useRef<HTMLDivElement>(null);
  
  // Modal Refs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalBgRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const formContainerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('loading');

    try {
      let res: Response | null = null;
      let data: any = null;

      // 1. Try relative endpoint (handled by Vite dev middleware or production server)
      try {
        const r1 = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (r1.ok) {
          res = r1;
          data = await r1.json();
        } else {
          try {
            data = await r1.json();
          } catch (_) {}
        }
      } catch (_) {}

      // 2. Fallback to standalone port 5000 if running in local development
      const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      if ((!res || !res.ok) && isLocal) {
        try {
          const r2 = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          if (r2.ok) {
            res = r2;
            data = await r2.json();
          } else {
            try {
              data = await r2.json();
            } catch (_) {}
          }
        } catch (_) {}
      }

      if (!res || !res.ok) {
        throw new Error(data?.error || 'Failed to send message. Please try again.');
      }
      
      // Clean fade out of the form
      gsap.to(formContainerRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: 'power2.inOut',
        onComplete: () => {
          setStatus('success');
        },
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.message || 'Something went wrong. Please try again.');
    }
  };

  // Dedicated success animation — ensures elements are hidden on keyframe 0 and fade in step-by-step
  useGSAP(() => {
    if (status !== 'success') return;

    // Immediately prepare all elements to zero opacity before paint
    gsap.set(successRef.current, { opacity: 0, y: 15 });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.88, y: 10 });
    gsap.set(glowRef.current, { opacity: 0, scale: 0.4 });
    gsap.set('.success-text', { opacity: 0, y: 12 });

    const tl = gsap.timeline({ delay: 0.22 });

    // Step 1: Smooth container entrance
    tl.to(successRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: 'power3.out',
    })
    // Step 2: Logo fades in cleanly
    .to(
      logoRef.current,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
      },
      '-=0.2'
    )
    // Step 3: Soft ambient light glow radiates behind logo
    .to(
      glowRef.current,
      {
        opacity: 0.65,
        scale: 1,
        duration: 1.1,
        ease: 'power2.out',
      },
      '-=0.45'
    )
    // Step 4: Stagger text and button step by step
    .to(
      '.success-text',
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.12,
        ease: 'power3.out',
      },
      '-=0.6'
    );

    // Auto-close modal after 5.5s
    timerRef.current = setTimeout(() => {
      closeModal();
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', message: '' });
        gsap.set(formContainerRef.current, { clearProps: 'all' });
        gsap.set(successRef.current, { clearProps: 'all' });
      }, 400);
    }, 5500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, { scope: modalContentRef, dependencies: [status] });

  useGSAP(() => {
    // Initial scroll animation
    gsap.fromTo(
      elementsRef.current?.children || [],
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      }
    );

    // Special scrolling effect for the button
    gsap.to(btnWrapperRef.current, {
      scale: 1.12,
      y: -12,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 45%',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    });
  }, { scope: containerRef });

  const { contextSafe } = useGSAP({ scope: containerRef });

  const openModal = contextSafe((e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
    
    const tl = gsap.timeline();
    
    // Unhide container
    gsap.set(modalContainerRef.current, { display: 'flex', pointerEvents: 'auto' });
    
    // Background fade + blur
    tl.to(modalBgRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    })
    // Modal pane scale + drop in
    .fromTo(modalContentRef.current, 
      { scale: 0.9, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
      '-=0.2'
    )
    // Stagger modal children smoothly
    .fromTo((modalContentRef.current as any)?.children || [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
      '-=0.4'
    );
  });

  const closeModal = contextSafe(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsModalOpen(false);
        gsap.set(modalContainerRef.current, { display: 'none', pointerEvents: 'none' });
      }
    });

    tl.to(modalContentRef.current, {
      scale: 0.95,
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to(modalBgRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    }, '-=0.2');
  });

  return (
    <section ref={containerRef} className="py-28 sm:py-48 px-4 sm:px-8 md:px-24 bg-black border-t border-white/5 relative overflow-hidden" id="contact">
      <div ref={elementsRef} className="max-w-[1400px] mx-auto flex flex-col items-center">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 sm:mb-12 text-center">
          Got a project?<br />Let's talk.
        </h2>
        
        <div ref={btnWrapperRef} className="w-full flex justify-center">
          <button onClick={openModal} className="group inline-flex items-center justify-center gap-2.5 sm:gap-4 px-6 py-3.5 sm:px-10 sm:py-5 bg-white text-black font-semibold text-sm sm:text-lg rounded-full hover:scale-105 active:scale-95 transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer">
            Email Me <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Social links removed to avoid duplication with the Footer */}
      </div>

      {/* Premium GSAP Modal */}
      <div 
        ref={modalContainerRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center hidden pointer-events-none"
      >
        {/* Backdrop */}
        <div 
          ref={modalBgRef}
          onClick={closeModal}
          className="absolute inset-0 bg-black/75 backdrop-blur-xl opacity-0"
        ></div>

        {/* Modal Content */}
        <div 
          ref={modalContentRef}
          className="relative w-full max-w-lg p-8 sm:p-10 bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] opacity-0 flex flex-col gap-6 mx-4 overflow-hidden"
        >
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Form Container */}
          <div ref={formContainerRef} className={status === 'success' ? 'hidden' : 'block'}>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Reach Out.</h3>
              <p className="text-gray-400 text-sm font-light">Directly to my personal inbox.</p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Email</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea rows={4} required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
              </div>

              {status === 'error' && <div className="text-red-400 text-xs mt-2 bg-red-500/10 border border-red-500/20 rounded-lg p-3 leading-relaxed">{errorMessage}</div>}

              <button type="submit" disabled={status === 'loading'} className="group mt-4 w-full py-4 bg-white text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer">
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Request
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Clean Minimalist Success Presentation */}
          <div
            ref={successRef}
            className={`w-full flex-col items-center justify-center text-center py-10 px-4 opacity-0 ${
              status === 'success' ? 'flex' : 'hidden'
            }`}
          >
            {/* Pure Brand Logo with Ambient Lighting Glow (No frames, no circular borders) */}
            <div className="relative mb-8 flex items-center justify-center">
              {/* Soft Ambient Light Glow */}
              <div
                ref={glowRef}
                className="absolute w-28 h-28 rounded-full bg-white/15 blur-2xl pointer-events-none opacity-0"
              />

              {/* Pure Floating Logo */}
              <div ref={logoRef} className="relative z-10 opacity-0">
                <img
                  src={ayoubLogo}
                  alt="Ayoub Ameur"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain brightness-0 invert drop-shadow-[0_0_25px_rgba(255,255,255,0.45)]"
                />
              </div>
            </div>

            {/* Clean Minimalist Title */}
            <h3 className="success-text opacity-0 text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Message Received.
            </h3>

            {/* Concise, Professional Copy */}
            <p className="success-text opacity-0 text-white/60 text-sm sm:text-base font-light leading-relaxed max-w-sm mx-auto mb-8">
              You will be contacted by Ayoub Ameur for more details or to schedule a call.
            </p>

            {/* Subtle Minimalist Done Button */}
            <button
              onClick={closeModal}
              className="success-text opacity-0 px-7 py-2.5 rounded-full border border-white/15 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              Done ✕
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
