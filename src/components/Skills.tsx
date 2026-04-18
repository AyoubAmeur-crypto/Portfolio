import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend & Mobile',
    icon: 'devices',
    skills: [
      { name: 'React.js / Next.js', level: 92 },
      { name: 'React Native / Expo', level: 88 },
      { name: 'TypeScript', level: 85 },
      { name: 'GSAP / Framer Motion', level: 82 },
      { name: 'TailwindCSS', level: 90 },
    ]
  },
  {
    id: 'backend',
    label: 'Backend & Databases',
    icon: 'dns',
    skills: [
      { name: 'Node.js / Express.js', level: 90 },
      { name: 'Spring Boot', level: 78 },
      { name: 'MongoDB / PostgreSQL', level: 84 },
      { name: 'Socket.io', level: 80 },
      { name: 'REST APIs / JWT / OAuth', level: 88 },
    ]
  },
  {
    id: 'ai',
    label: 'AI & Agentic Systems',
    icon: 'psychology',
    skills: [
      { name: 'LangChain / LangGraph', level: 85 },
      { name: 'RAG Pipelines', level: 82 },
      { name: 'MCP Integration', level: 75 },
      { name: 'TensorFlow / Keras', level: 72 },
      { name: 'scikit-learn', level: 78 },
    ]
  },
  {
    id: 'devops',
    label: 'Cloud & DevOps',
    icon: 'cloud',
    skills: [
      { name: 'Docker / Docker Compose', level: 85 },
      { name: 'NGINX / VPS (Hetzner)', level: 80 },
      { name: 'GitHub Actions / CI/CD', level: 82 },
      { name: 'AWS Cloud Foundations', level: 70 },
      { name: 'Vercel / Render', level: 88 },
    ]
  },
];

// Row 1 — scrolls left
const row1 = [
  { label: 'JavaScript', icon: 'code' },
  { label: 'TypeScript', icon: 'code' },
  { label: 'Python', icon: 'terminal' },
  { label: 'Java', icon: 'coffee' },
  { label: 'React.js', icon: 'hub' },
  { label: 'Next.js', icon: 'web' },
  { label: 'React Native', icon: 'smartphone' },
  { label: 'Expo', icon: 'rocket_launch' },
  { label: 'Node.js', icon: 'dns' },
  { label: 'Express.js', icon: 'api' },
  { label: 'Spring Boot', icon: 'memory' },
  { label: 'Spring Security', icon: 'security' },
  { label: 'TailwindCSS', icon: 'palette' },
  { label: 'GSAP', icon: 'animation' },
  { label: 'Framer Motion', icon: 'motion_photos_on' },
  { label: 'Figma', icon: 'design_services' },
  { label: 'Electron', icon: 'desktop_windows' },
  { label: 'PHP', icon: 'data_object' },
];

// Row 2 — scrolls right
const row2 = [
  { label: 'MongoDB', icon: 'storage' },
  { label: 'PostgreSQL', icon: 'table' },
  { label: 'MySQL', icon: 'database' },
  { label: 'Firebase', icon: 'local_fire_department' },
  { label: 'LangChain', icon: 'psychology' },
  { label: 'LangGraph', icon: 'account_tree' },
  { label: 'RAG', icon: 'manage_search' },
  { label: 'MCP', icon: 'hub' },
  { label: 'TensorFlow', icon: 'model_training' },
  { label: 'scikit-learn', icon: 'scatter_plot' },
  { label: 'Docker', icon: 'inventory_2' },
  { label: 'NGINX', icon: 'lan' },
  { label: 'GitHub Actions', icon: 'sync_alt' },
  { label: 'AWS', icon: 'cloud' },
  { label: 'Vercel', icon: 'rocket_launch' },
  { label: 'Socket.io', icon: 'electrical_services' },
  { label: 'JWT', icon: 'key' },
  { label: 'Stripe', icon: 'payments' },
  { label: 'Cloudinary', icon: 'image' },
  { label: 'CI/CD', icon: 'loop' },
];

// Duplicated for seamless loop
const row1Doubled = [...row1, ...row1];
const row2Doubled = [...row2, ...row2];

const MarqueeRow = ({ items, direction = 'left', speed = 40 }: {
  items: { label: string; icon: string }[];
  direction?: 'left' | 'right';
  speed?: number;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Total width of one set = 50% of the doubled track
    const xTarget = direction === 'left' ? '-50%' : '0%';
    const xStart  = direction === 'left' ? '0%'   : '-50%';

    tweenRef.current = gsap.fromTo(
      el,
      { x: xStart },
      {
        x: xTarget,
        duration: speed,
        ease: 'none',
        repeat: -1,
      }
    );

    // Pause on hover, resume on leave
    const root = el.parentElement;
    const pause  = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.play();
    root?.addEventListener('mouseenter', pause);
    root?.addEventListener('mouseleave', resume);

    return () => {
      tweenRef.current?.kill();
      root?.removeEventListener('mouseenter', pause);
      root?.removeEventListener('mouseleave', resume);
    };
  }, [direction, speed]);

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex gap-3 w-max will-change-transform">
        {items.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-gray-300 text-sm whitespace-nowrap hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-default shrink-0"
          >
            <span className="material-symbols-outlined text-[15px] leading-none">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useGSAP(() => {
    gsap.fromTo(headerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' }
      }
    );

    gsap.fromTo(tabsRef.current?.children || [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: tabsRef.current, start: 'top 90%', toggleActions: 'play none none none' }
      }
    );
  }, { scope: containerRef });

  const animateBars = () => {
    gsap.fromTo('.skill-bar-fill', { scaleX: 0 }, {
      scaleX: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', transformOrigin: 'left'
    });
  };

  const handleTabChange = (i: number) => {
    gsap.to(contentRef.current, {
      opacity: 0, y: 10, duration: 0.2, onComplete: () => {
        setActiveTab(i);
        gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        setTimeout(animateBars, 50);
      }
    });
  };

  useGSAP(() => { animateBars(); }, { scope: containerRef, dependencies: [activeTab] });

  const active = skillCategories[activeTab];

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-black border-t border-white/5" id="skills">
      <div className="max-w-[1400px] mx-auto px-6 md:px-24">

        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-4 md:mb-6 leading-none">
            Core<br />Capabilities.
          </h2>
          <p className="text-gray-400 text-base md:text-xl font-light max-w-lg">
            Full-stack, mobile, and agentic AI — from pixel-perfect interfaces to autonomous LLM pipelines.
          </p>
        </div>

        {/* Tab Navigation */}
        <div ref={tabsRef} className="flex flex-wrap gap-2 md:gap-3 mb-12 md:mb-16">
          {skillCategories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => handleTabChange(i)}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 border ${
                activeTab === i
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-400 border-white/15 hover:border-white/40 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active Category Skill Bars */}
        <div ref={contentRef} className="mb-20 md:mb-28">
          <div className="grid grid-cols-1 gap-5 md:gap-7 max-w-2xl">
            {active.skills.map((skill) => (
              <div key={skill.name} className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-white text-sm md:text-lg font-medium">{skill.name}</span>
                  <span className="text-gray-500 font-mono text-xs tracking-widest">{skill.level}%</span>
                </div>
                <div className="h-[2px] bg-white/8 rounded-full overflow-hidden relative">
                  <div
                    className="skill-bar-fill absolute inset-0 origin-left rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Full Stack Marquee — full width, outside padding */}
      <div className="border-t border-white/10 pt-12 md:pt-16">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-600 mb-8 px-6 md:px-24 max-w-[1400px] mx-auto">
          Full Stack
        </p>
        <div className="flex flex-col gap-4">
          <MarqueeRow items={row1Doubled} direction="left"  speed={45} />
          <MarqueeRow items={row2Doubled} direction="right" speed={38} />
        </div>
      </div>

    </section>
  );
};

export default Skills;
