import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SendHorizontal, CheckCircle2, Loader2, ArrowRight, X } from 'lucide-react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
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
  
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const sendIconRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('loading');

    // Animation: Send form away
    const tl = gsap.timeline();
    tl.to(formRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.inOut'
    })
    .to(sendIconRef.current, {
      x: 100,
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'back.in(1.7)'
    }, '-=0.2');
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to send message');
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Animate success UI in
      gsap.fromTo(successRef.current, 
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
      );

      setTimeout(() => {
        closeModal();
        // Reset after modal closes
        setTimeout(() => {
          setStatus('idle');
          gsap.set([formRef.current, sendIconRef.current], { clearProps: 'all' });
        }, 500);
      }, 3000);
    } catch (err) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      gsap.to(formRef.current, { opacity: 1, y: 0, duration: 0.5 });
    }
  };

  useGSAP(() => {
    // Initial scroll animation
    gsap.from(elementsRef.current?.children || [], {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out'
    });

    // Special scrolling effect for the button
    gsap.to(btnWrapperRef.current, {
      scale: 1.15,
      y: -15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 40%',
        end: 'bottom bottom',
        scrub: 1
      }
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
    <section ref={containerRef} className="py-48 px-8 md:px-24 bg-black border-t border-white/5 relative overflow-hidden" id="contact">
      <div ref={elementsRef} className="max-w-[1400px] mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-12 text-center">
          Got a project?<br />Let's talk.
        </h2>
        
        <div ref={btnWrapperRef}>
          <button onClick={openModal} className="group inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-semibold text-lg rounded-full hover:scale-105 transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] ease-[cubic-bezier(0.16,1,0.3,1)]">
            Email Me <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
          className="absolute inset-0 bg-black/60 backdrop-blur-xl opacity-0"
        ></div>

        {/* Modal Content */}
        <div 
          ref={modalContentRef}
          className="relative w-full max-w-lg p-10 bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] opacity-0 flex flex-col gap-6 mx-4"
        >
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          {status !== 'success' ? (
            <>
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

                {status === 'error' && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}

                <button type="submit" disabled={status === 'loading'} className="group mt-4 w-full py-4 bg-white text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3">
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <div ref={sendIconRef}>
                        <SendHorizontal className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div ref={successRef} className="flex flex-col items-center justify-center py-10 text-center gap-6">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Message Received!</h3>
                <p className="text-gray-400 max-w-[280px] mx-auto">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Contact;
