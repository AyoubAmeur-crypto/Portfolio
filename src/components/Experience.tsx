import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(lineRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1
      },
      scaleY: 0,
      transformOrigin: 'top center',
      ease: 'none'
    });

    gsap.from(itemsRef.current?.children || [], {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      },
      x: -30,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-6 md:px-24 bg-black border-t border-white/5 relative" id="experience">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        <div className="md:col-span-4">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-none">Experience.</h2>
        </div>
        <div className="md:col-span-8 relative">

          {/* Animated Vertical Timeline Line */}
          <div ref={lineRef} className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/20 hidden md:block"></div>

          <div ref={itemsRef} className="flex flex-col gap-12 md:gap-24 md:pl-16">

            {/* Harmony Technology */}
            <div className="group relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[69px] top-4 w-3 h-3 bg-white rounded-full hidden md:block scale-0 group-hover:scale-100 transition-transform duration-300"></div>

              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4 md:mb-6 gap-2 md:gap-0">
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-gray-300 transition-colors">Full Stack Developer</h3>
                <span className="text-xs md:text-sm font-mono text-gray-500 uppercase tracking-widest">Internship · 2 months · Rabat, Morocco</span>
              </div>
              <p className="text-gray-400 font-medium mb-4 md:mb-6 text-base">Harmony Technology</p>
              <p className="text-gray-300 leading-relaxed max-w-3xl mb-6 md:mb-8 font-light text-sm md:text-lg">
                Developed and deployed <span className="text-white font-medium">AYB Hub</span> — a complete SaaS team collaboration platform. Built a fullstack architecture with real-time chat (Socket.io), Kanban board, analytics dashboard, roles & permissions, and real-time notifications. Implemented secure auth via JWT + OAuth (Google, Facebook), media via Cloudinary, and payments via PayPal. Dockerized deployment on Hetzner VPS with CI/CD GitHub Actions pipeline and NGINX reverse proxy.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {['React.js (Vite)', 'TailwindCSS', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Docker', 'NGINX', 'GitHub Actions', 'JWT', 'OAuth', 'Cloudinary'].map((tech, i) => (
                  <span key={tech} className={`text-xs px-3 md:px-4 py-1 md:py-2 rounded-full font-semibold tracking-wide transition-colors cursor-default ${
                    i === 0 ? 'text-black bg-white' : 'text-white border border-white/20 hover:bg-white/10'
                  }`}>{tech}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
