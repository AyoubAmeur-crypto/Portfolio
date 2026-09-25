import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import webDevImg from '../assets/WD.png';
import mobDevImg from '../assets/MD.png';
import aiAgentImg from '../assets/AS.png';

gsap.registerPlugin(ScrollTrigger);

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  hoverRotation: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "backend-fullstack",
    title: "Backend & Full-Stack",
    description: "Engineering scalable backend architectures and full-stack web platforms. Designing robust REST APIs with Spring Boot and Node.js, clean service boundaries, and performant React/Next.js interfaces.",
    image: webDevImg,
    hoverRotation: "group-hover:-rotate-[10deg]",
  },
  {
    id: "mobile-qa",
    title: "Mobile & Quality QA",
    description: "Building cross-platform mobile apps with React Native & Expo Router, backed by enterprise Playwright automation architectures, deterministic test data seeding, and CI/CD pipelines.",
    image: mobDevImg,
    hoverRotation: "group-hover:-rotate-[10deg]",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI Systems",
    description: "Pioneering autonomous workflows. Designing LangChain and LangGraph agent pipelines, multi-step tool orchestration, and intelligent system integrations.",
    image: aiAgentImg,
    hoverRotation: "group-hover:-rotate-[10deg]",
  }
];

interface ServicesProps {
  onSelectCapability?: (id: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onSelectCapability }) => {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      itemsRef.current?.children || [],
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemsRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-black border-t border-white/5 overflow-x-clip" id="services">
      <div className="max-w-[1400px] mx-auto px-6 md:px-24 mb-14 md:mb-24">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-4 md:mb-6 leading-none">
          Core<br />Capabilities.
        </h2>
        <p className="text-gray-400 font-light text-base md:text-xl max-w-sm">
          End-to-end engineering across backend services, full-stack web, mobile platforms, and agentic AI.
        </p>
      </div>
      
      {/* Mobile: Image + Separator + Just the Title (Click leads to capability detail page) */}
      <div className="block md:hidden px-6">
        <div className="w-full flex flex-col divide-y divide-white/10">
          {servicesData.map((service, index) => (
            <div key={index} className="py-8 flex flex-col gap-4">
              {/* Picture (Press to lead to detail page) */}
              <div 
                onClick={() => onSelectCapability?.(service.id)}
                className="w-full h-72 sm:h-80 overflow-hidden relative bg-white/[0.02] cursor-pointer group active:scale-[0.99] transition-transform"
              >
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Separator line between image and title */}
              <div className="w-full h-[1px] bg-white/10" />

              {/* Just the Title (Press to lead to detail page) */}
              <div 
                onClick={() => onSelectCapability?.(service.id)}
                className="flex items-center justify-between w-full cursor-pointer group/title pt-1"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover/title:text-white/80 transition-colors">
                  {service.title}
                </h3>
                <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover/title:bg-white group-hover/title:text-black group-hover/title:border-white transition-all duration-300 shrink-0 ml-3">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Original Table Row Layout (Clicking opens capability detail page) */}
      <div ref={itemsRef} className="hidden md:flex flex-col w-full border-b border-white/10">
        {servicesData.map((service, index) => (
          <div 
            key={index} 
            onClick={() => onSelectCapability?.(service.id)}
            className="group relative border-t border-white/10 hover:bg-white hover:z-50 transition-colors duration-500 py-6 md:py-7 px-6 md:px-24 cursor-pointer"
          >
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center gap-[140px] relative z-20">
              
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
