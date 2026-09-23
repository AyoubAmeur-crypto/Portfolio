import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const containerRef = useRef<HTMLElement>(null);
  const pinSpacerRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      quote: "Ayoub architected an entire Agentic AI pipeline for us from scratch. His ability to fuse frontend aesthetics with raw backend machine learning logic is simply unparalleled in today's market.",
      name: "Sarah Jenkins",
      title: "CTO, DataFlow Inc",
      highlight: "simply unparalleled",
      avatar: "https://i.pravatar.cc/300?img=47"
    },
    {
      quote: "We needed a full web overhaul that didn't just look good, but performed under immense server load. The React implementation was flawless, and the FastAPI backend never misses a beat.",
      name: "Michael Oris",
      title: "Lead Architect, Nexus Logistics",
      highlight: "FastAPI backend",
      avatar: "https://i.pravatar.cc/300?img=11"
    },
    {
      quote: "An absolute masterclass in UI engineering. Not only did the interface convert 3x better than our previous iteration, but the code structure was so clean our engineers cried tears of joy.",
      name: "Elena Rostova",
      title: "VP Product, Synthetix",
      highlight: "masterclass in UI",
      avatar: "https://i.pravatar.cc/300?img=32"
    },
    {
      quote: "Working with Ayoub felt like having an entire elite engineering squad compressed into one person. From complex vector databases to buttery smooth GSAP animations, he handles it all.",
      name: "David Chen",
      title: "Founder, Zenith AI",
      highlight: "buttery smooth",
      avatar: "https://i.pravatar.cc/300?img=68"
    }
  ];

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.review-slide');
    if (!cards.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinSpacerRef.current,
        start: 'top top',
        end: `+=${cards.length * 150}%`, // Extended scroll area for massive fluid pacing
        pin: true,
        scrub: true, // Native 1:1 sync with Lenis for incredibly smooth tracking
        snap: {
           snapTo: 1 / (cards.length - 1),
           duration: 0.8,
           ease: "power2.inOut"
        }
      }
    });

    cards.forEach((card, i) => {
      const content = card.querySelector('.review-content');
      const backdrop = card.querySelector('.review-backdrop');

      // Premium 3D start state for off-screen cards
      if (i > 0) {
        gsap.set(content, { opacity: 0, y: '35vh', z: -300, rotationX: -20, scale: 0.8, filter: 'blur(20px)' });
        gsap.set(backdrop, { opacity: 0, scale: 0.8, rotationZ: -15, y: '15vh' });
      } else {
        // First card start state (since it's already in view)
        gsap.set(content, { y: '10vh' }); 
        gsap.set(backdrop, { opacity: 0, scale: 0.9, y: '5vh' });
      }

      const slideTl = gsap.timeline();

      // IN PHASE: Snap into readable view
      if (i > 0) {
        slideTl.to(content, { opacity: 1, y: '5vh', z: 0, rotationX: 0, scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power3.out' }, 'in');
        slideTl.to(backdrop, { opacity: 0.1, scale: 1, rotationZ: -5, y: '5vh', duration: 2, ease: 'power3.out' }, 'in');
      }

      // AMBIENT PHASE: Never freeze. Slowly pan and grow while user scrolls through the reading zone
      slideTl.to(content, { y: '-5vh', z: 50, duration: 4, ease: 'none' }, 'ambient');
      slideTl.to(backdrop, { opacity: 0.25, scale: 1.1, rotationZ: 5, y: '-5vh', duration: 4, ease: 'none' }, 'ambient');

      // OUT PHASE: Fling out aggressively into space
      if (i < cards.length - 1) {
        slideTl.to(content, { opacity: 0, y: '-40vh', z: 400, rotationX: 25, scale: 1.25, filter: 'blur(20px)', duration: 2, ease: 'power3.in' }, 'out');
        slideTl.to(backdrop, { opacity: 0, scale: 1.3, rotationZ: 15, y: '-15vh', duration: 2, ease: 'power3.in' }, 'out');
      }

      tl.add(slideTl);
    });

  }, { scope: containerRef });

  const renderQuote = (text: string, highlight: string) => {
    const parts = text.split(highlight);
    if (parts.length === 2) {
      return <>{parts[0]}<span className="text-white font-medium">{highlight}</span>{parts[1]}</>;
    }
    return text;
  };

  return (
    <section ref={containerRef} className="bg-black text-white relative w-full overflow-hidden border-t border-white/5" id="testimonials">
      
      {/* The master pinned wrapper */}
      <div ref={pinSpacerRef} className="w-full h-screen relative flex flex-col items-center justify-center overflow-hidden">
        
        {/* Stacked Review Slides - Centered perfectly in the void */}
        <div className="relative w-full h-full max-w-5xl mx-auto z-20 flex items-center justify-center px-4" style={{ perspective: "1500px" }}>
          {reviews.map((review, i) => (
            <div 
              key={`slide-${i}`} 
              className="review-slide absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none"
            >
              
              {/* Massive blurred backdrop of the reviewer */}
              <div className="review-backdrop absolute inset-0 flex items-center justify-center -z-10 opacity-15">
                <img 
                  src={review.avatar} 
                  alt="" 
                  className="w-[500px] md:w-[800px] h-[500px] md:h-[800px] object-cover rounded-full blur-[80px] md:blur-[120px]" 
                />
              </div>

              {/* Foreground content panel */}
              <div className="review-content flex flex-col items-center justify-center text-center max-w-4xl opacity-100 pointer-events-auto px-6">
                <span className="material-symbols-outlined text-4xl md:text-6xl text-white/10 mb-6 md:mb-8 block">format_quote</span>
                
                <h3 className="text-2xl md:text-3xl lg:text-5xl font-light text-gray-300 leading-relaxed md:leading-tight mb-8 md:mb-12 drop-shadow-2xl">
                  "{renderQuote(review.quote, review.highlight)}"
                </h3>
                
                <div className="flex items-center gap-5 pt-6 md:pt-8 border-t border-white/10">
                  <div className="w-12 md:w-16 h-12 md:h-16 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-bold text-sm md:text-xl">{review.name}</h4>
                    <p className="text-gray-400 text-[10px] md:text-sm font-mono uppercase tracking-widest mt-1">{review.title}</p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
