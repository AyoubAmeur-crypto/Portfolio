import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import agenticSystems from '../assets/agentiSystems.jpg';
import flowDesk from '../assets/flowDesk.jpg';
import iTracker from '../assets/itracker.jpg';
import aybHub from '../assets/aybhub.jpg';
import localik from '../assets/localik.jpg';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({
  title,
  category,
  imageSrc,
  link,
  className = "",
}: {
  title: string;
  category: string;
  imageSrc: string;
  link: string;
  className?: string;
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col gap-4 md:gap-6 cursor-pointer ${className}`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-black relative rounded-2xl border border-white/10 group-hover:border-white/30 transition-colors flex items-center justify-center">
        <img
          alt={title}
          className="w-full h-full object-cover object-center transition-opacity duration-300 opacity-90 group-hover:opacity-100"
          src={imageSrc}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
      </div>
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-xl md:text-3xl font-bold text-white group-hover:text-gray-300 transition-colors">
            {title}
          </h3>
          <span className="text-xs md:text-sm font-mono text-gray-500 mt-2 block uppercase tracking-widest">
            {category}
          </span>
        </div>
        <div className="w-10 md:w-12 h-10 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 shrink-0">
          <span className="material-symbols-outlined text-white group-hover:text-black transition-colors duration-300 -rotate-45 group-hover:rotate-0 text-lg md:text-xl">
            arrow_forward
          </span>
        </div>
      </div>
    </a>
  );
};

const Projects = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      }
    );

    gsap.fromTo(
      (gridRef.current as HTMLDivElement)?.children || [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-6 md:px-24 bg-black border-t border-white/5" id="projects">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headerRef} className="mb-16 md:mb-24 flex flex-col md:flex-row md:justify-between md:items-end border-b border-white/10 pb-6 md:pb-8">
          <div>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-none">
              Selected<br />Works.
            </h2>
          </div>
          <a
            href="https://github.com/AyoubAmeur-crypto"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-widest mt-6 md:mt-0 font-mono"
          >
            View All On GitHub <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 gap-y-16 md:gap-y-32">
          <ProjectCard
            title="AYB Hub"
            category="SaaS Team Collaboration"
            imageSrc={aybHub}
            link="https://github.com/AyoubAmeur-crypto/AybHub"
          />
          <ProjectCard
            title="FlowDesk"
            category="Agency & Office Management App"
            imageSrc={flowDesk}
            link="https://github.com/AyoubAmeur-crypto/FlowDesk-client"
            className="md:pt-32"
          />
          <ProjectCard
            title="Localik"
            category="Moroccan Car Rental Platform"
            imageSrc={localik}
            link="https://github.com/AyoubAmeur-crypto/Localik"
          />
          <ProjectCard
            title="Agentic AI Systems"
            category="LangChain / LangGraph / MCP"
            imageSrc={agenticSystems}
            link="https://github.com/AyoubAmeur-crypto/SmartAgentRestaurant"
            className="md:pt-32"
          />
          <ProjectCard
            title="iTracker"
            category="Mobile Financial Tracking"
            imageSrc={iTracker}
            link="https://github.com/AyoubAmeur-crypto/IrackerOfficialApp"
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
