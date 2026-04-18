import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import agenticSystems from '../assets/agentiSystems.jpg'
import flowDesk from '../assets/flowDesk.jpg'
import iTracker from '../assets/itracker.jpg'
import aybHub from '../assets/aybhub.jpg'

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ title, category, imageSrc, className = "" }: { title: string, category: string, imageSrc: string, className?: string }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax image slightly on scroll
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom", 
        end: "bottom top",
        scrub: true
      }, 
    });
  }, { scope: cardRef });

  return (
    <div ref={cardRef} className={`group flex flex-col gap-4 md:gap-6 cursor-pointer ${className}`}>
      <div className="aspect-[4/3] overflow-hidden bg-black relative">
        <img 
          ref={imageRef}
          alt={title} 
          className="absolute -top-[10%] -bottom-[10%] w-full h-[120%] object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
          src={imageSrc} 
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
      </div>
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-xl md:text-3xl font-bold text-white group-hover:text-gray-300 transition-colors">{title}</h3>
          <span className="text-xs md:text-sm font-mono text-gray-500 mt-2 block uppercase tracking-widest">{category}</span>
        </div>
        <div className="w-10 md:w-12 h-10 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 shrink-0">
          <span className="material-symbols-outlined text-white group-hover:text-black transition-colors duration-300 -rotate-45 group-hover:rotate-0 text-lg md:text-xl">arrow_forward</span>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power4.out'
    });

    gsap.from((gridRef.current as HTMLDivElement)?.children || [], {
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 75%',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out'
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-6 md:px-24 bg-black border-t border-white/5" id="projects">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headerRef} className="mb-16 md:mb-24 flex flex-col md:flex-row md:justify-between md:items-end border-b border-white/10 pb-6 md:pb-8">
          <div>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-none">Selected<br />Works.</h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-widest mt-6 md:mt-0">
            View All Architecture <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 gap-y-16 md:gap-y-32">
          <ProjectCard 
            title="AYB Hub" 
            category="SaaS Team Collaboration" 
            imageSrc={aybHub} 
          />
          <ProjectCard 
            title="FlowDesk" 
            category="Office Management App" 
            imageSrc={flowDesk} 
            className="md:pt-32"
          />
          <ProjectCard 
            title="Agentic AI Systems" 
            category="LangChain / LangGraph / MCP" 
            imageSrc={agenticSystems} 
          />
          <ProjectCard 
            title="iTracker" 
            category="Mobile Financial Tracking" 
            imageSrc={iTracker} 
            className="md:pt-32"
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
