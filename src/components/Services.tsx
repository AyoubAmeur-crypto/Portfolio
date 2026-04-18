import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import webDevImg from '../assets/WD.png'
import mobDevImg from '../assets/MD.png'
import aiAgentImg from '../assets/AS.png'



gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: "Web Development",
    description: "Building blazing-fast, scalable web architectures. From pixel-perfect React/Next.js interfaces optimized with smooth GSAP choreographies to highly robust backend systems wired via Node or Python FastAPI.",
    image: webDevImg,
    hoverRotation: "group-hover:-rotate-[10deg]",
    hoverBg: "linear-gradient(90deg, #facc15 0%, #eab308 100%)" // Premium Yellow Gradient
  },
  {
    title: "Mobile Development",
    description: "Engineering ultra-responsive, native-feeling mobile applications. Delivering seamless user experiences and complex offline-first logic for both iOS and Android ecosystems from a single modern codebase.",
    image: mobDevImg,
    hoverRotation: "group-hover:-rotate-[10deg]",
    hoverBg: "linear-gradient(90deg, #facc15 0%, #eab308 100%)"
  },
  {
    title: "Agentic AI Systems",
    description: "Pioneering autonomous workflows. Integration of specialized LangChain and AutoGen multi-agent frameworks capable of self-healing, reasoning, and executing massive multi-step data processing dynamically.",
    image: aiAgentImg,
    hoverRotation: "group-hover:-rotate-[10deg]",
    hoverBg: "linear-gradient(90deg, #facc15 0%, #eab308 100%)"
  }
];

const Services = () => {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(itemsRef.current?.children || [], {
      scrollTrigger: {
        trigger: itemsRef.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-black border-t border-white/5 overflow-x-clip" id="services">
      <div className="max-w-[1400px] mx-auto px-6 md:px-24 mb-16 md:mb-24">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-4 md:mb-6 leading-none">
          Digital<br />Capabilities.
        </h2>
        <p className="text-gray-400 font-light text-base md:text-xl max-w-sm">
          End-to-end architecture transforming complex requirements into high-performance humanized systems.
        </p>
      </div>
      
      <div ref={itemsRef} className="w-full flex flex-col border-b border-white/10">
        {servicesData.map((service, index) => (
          <div 
            key={index} 
            className="group relative border-t border-white/10 hover:bg-white hover:z-50 transition-colors duration-500 py-6 md:py-7 px-6 md:px-24 cursor-pointer"
          >
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center gap-[140px]  relative z-20">
              
              {/* Title */}
              <h3 className="text-3xl md:text-5xl font-bold text-gray-500 group-hover:text-black transition-colors duration-500 tracking-tight md:w-[28%]">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-400 group-hover:text-gray-800 text-sm md:text-base font-light md:w-[22%] transition-colors duration-500 pr-4">
                {service.description}
              </p>

              {/* Hover Image takes place of Arrow */}
              <div className={`absolute top-1/2 -translate-y-1/2 right-0 md:right-[5%] w-[300px] md:w-[300px] pointer-events-none opacity-0 group-hover:opacity-100 transform rotate-0 origin-center ${service.hoverRotation} transition-all duration-0 group-hover:duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-30`}>
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full aspect-square object-cover rounded-3xl shadow-2xl border-2 border-white transition-colors duration-0 group-hover:duration-300"
                  style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                />
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
