import React, { useEffect, useState, useRef } from 'react';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-500 ${scrolled ? 'py-4 bg-[#131313]/90' : 'py-6 bg-[#131313]/60'}`}>
      <div className="flex justify-between items-center px-8 max-w-screen-2xl mx-auto">
        <span className="text-xl font-bold tracking-tighter text-[#E5E2E1] font-headline">A.AMEUR</span>
        <div className="hidden md:flex gap-10 items-center">
          <a className="font-headline tracking-tight text-sm uppercase text-[#B9C3FF] font-bold border-b border-[#0047FF] pb-1 hover:text-[#B9C3FF] hover:scale-105 duration-300 ease-out transition-all" href="#projects">Projects</a>
          <a className="font-headline tracking-tight text-sm uppercase text-[#E5E2E1]/60 hover:text-[#E5E2E1] transition-colors hover:text-[#B9C3FF] hover:scale-105 duration-300 ease-out transition-all" href="#skills">Intelligence</a>
          <a className="font-headline tracking-tight text-sm uppercase text-[#E5E2E1]/60 hover:text-[#E5E2E1] transition-colors hover:text-[#B9C3FF] hover:scale-105 duration-300 ease-out transition-all" href="#experience">Experience</a>
          <a className="font-headline tracking-tight text-sm uppercase text-[#E5E2E1]/60 hover:text-[#E5E2E1] transition-colors hover:text-[#B9C3FF] hover:scale-105 duration-300 ease-out transition-all" href="#contact">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <a className="px-6 py-2 bg-primary-container text-on-primary-container font-headline text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform" href="#contact">Connect</a>
          <span className="material-symbols-outlined text-[#B9C3FF]">terminal</span>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-primary-container/40 to-transparent absolute bottom-0 left-0"></div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-24 pt-32 pb-16">
      <div className="max-w-7xl">
        <h1 className="font-headline font-bold text-6xl md:text-[8rem] leading-[0.9] tracking-tighter text-reveal mb-8">
          AYOUB<br />AMEUR
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-7">
            <p className="font-headline text-2xl md:text-3xl text-primary mb-6">Software & AI Engineer | Full-Stack × Agentic AI</p>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
              I build at the intersection of robust engineering, intuitive interfaces, and artificial intelligence. Crafting digital environments that think, learn, and scale.
            </p>
            <div className="flex flex-wrap gap-6 mt-12">
              <button className="px-10 py-4 bg-primary-container text-on-primary-container font-headline font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,71,255,0.4)] transition-all">
                View Systems
              </button>
              <button className="px-10 py-4 border border-outline-variant text-on-surface font-headline font-bold uppercase tracking-widest hover:bg-surface-container-highest transition-all">
                Get in Touch
              </button>
            </div>
          </div>
          <div className="md:col-span-5 hidden md:block">
            <div className="aspect-square relative overflow-hidden bg-surface-container-low group">
              <img alt="Digital intelligence visual" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKoRtbhFhfRFcz-rOEQ3-BRkZTZMP2KXkVivJvUH5WLaywStpvgxhXQzMqi7QFUBePCpcX5n2AL9D3R80oG9Ks4FQnHH4f9AefUHYwCq7ZA-6adTdUC54zFmiJw_KCHKslDcXFuogO2Jje_6fzuUYsIL8YHVFRV4mw_wknIt_SG4UEuoz-UUX0RRY_uiZAHgtiAEg-n8lXi3ftTKN3DZLohde1fVjf0WK1Cf094S1FBuNxEQSu2BhXob6WVXqwTU76Lt19iLNqRyoE" />
              <div className="absolute top-4 left-4 p-2 bg-background/80 backdrop-blur-md">
                <span className="font-mono text-[10px] tracking-widest uppercase">system_origin: morocco.fes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden py-8 border-t border-outline-variant/10">
        <div className="flex whitespace-nowrap gap-12 font-mono text-[10px] tracking-[0.3em] uppercase text-on-surface/30">
          <span>Robust Engineering — Intuitive Interfaces — Artificial Intelligence — Full Stack — LLM Architecture — Cloud Native — Robust Engineering — Intuitive Interfaces — Artificial Intelligence — Full Stack — LLM Architecture — Cloud Native</span>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="py-32 px-8 md:px-24 bg-surface-container-lowest relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-7">
          <h2 className="font-headline text-4xl md:text-6xl font-bold mb-12 tracking-tight">THE DIGITAL<br /><span className="text-secondary">ALCHEMIST.</span></h2>
          <p className="text-3xl md:text-4xl font-headline text-on-surface leading-tight font-light">
            "Code is no longer just logic; it's the substrate for <span className="italic text-primary">artificial cognition</span>. I architect the bridge between human intent and machine execution."
          </p>
        </div>
        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          <div className="p-8 bg-surface-container-low border-l-2 border-secondary h-48 flex flex-col justify-end">
            <span className="text-4xl font-headline font-bold text-secondary mb-2">01</span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-on-surface/60">Years Experience</span>
            <p className="text-lg font-medium">Focused Internship</p>
          </div>
          <div className="p-8 bg-surface-container-low border-l-2 border-primary h-48 flex flex-col justify-end">
            <span className="text-4xl font-headline font-bold text-primary mb-2">05+</span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-on-surface/60">Large Systems</span>
            <p className="text-lg font-medium">Shipped Projects</p>
          </div>
          <div className="p-8 bg-surface-container-low border-l-2 border-primary h-48 flex flex-col justify-end">
            <span className="text-4xl font-headline font-bold text-primary mb-2">12+</span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-on-surface/60">Certifications</span>
            <p className="text-lg font-medium">Continuous Learning</p>
          </div>
          <div className="p-8 bg-surface-container-low border-l-2 border-secondary h-48 flex flex-col justify-end">
            <span className="text-4xl font-headline font-bold text-secondary mb-2">24/7</span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-on-surface/60">Mindset</span>
            <p className="text-lg font-medium">Problem Solver</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section className="py-32 px-8 md:px-24" id="skills">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary">Intelligence Stack</span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mt-4">CORE CAPABILITIES</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 md:row-span-2 glass-card p-10 group hover:border-primary/40 transition-colors">
            <div className="flex justify-between items-start mb-12">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              <span className="font-mono text-[10px] text-on-surface/40">LVL_ADVANCED</span>
            </div>
            <h3 className="font-headline text-3xl font-bold mb-6">AI & Agentic Systems</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-surface-container-low border-l-2 border-secondary font-mono text-[11px] uppercase">LLM Prompting</span>
              <span className="px-3 py-1 bg-surface-container-low border-l-2 border-secondary font-mono text-[11px] uppercase">RAG Pipelines</span>
              <span className="px-3 py-1 bg-surface-container-low border-l-2 border-secondary font-mono text-[11px] uppercase">Vector DBs</span>
              <span className="px-3 py-1 bg-surface-container-low border-l-2 border-secondary font-mono text-[11px] uppercase">Autogen</span>
              <span className="px-3 py-1 bg-surface-container-low border-l-2 border-secondary font-mono text-[11px] uppercase">LangChain</span>
            </div>
            <p className="mt-8 text-on-surface-variant leading-relaxed">Architecting autonomous workflows and multi-agent ecosystems that solve complex, non-linear problems.</p>
          </div>
          <div className="glass-card p-8 group hover:border-secondary/40 transition-colors">
            <h4 className="font-headline font-bold text-xl mb-4">Languages</h4>
            <div className="space-y-3">
              <div className="flex justify-between font-mono text-[10px]"><span>PYTHON</span><span>90%</span></div>
              <div className="h-1 bg-surface-container-highest"><div className="h-full bg-secondary w-[90%]"></div></div>
              <div className="flex justify-between font-mono text-[10px]"><span>JAVASCRIPT</span><span>85%</span></div>
              <div className="h-1 bg-surface-container-highest"><div className="h-full bg-secondary w-[85%]"></div></div>
            </div>
          </div>
          <div className="glass-card p-8">
            <h4 className="font-headline font-bold text-xl mb-4">Design</h4>
            <p className="text-sm text-on-surface-variant mb-4">Figma-driven high-fidelity prototyping and UI/UX engineering.</p>
            <span className="material-symbols-outlined text-secondary">polyline</span>
          </div>
          <div className="md:col-span-2 glass-card p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h4 className="font-headline font-bold text-xl mb-4">Backend Architecture</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-surface-container-low font-mono text-[10px]">FASTAPI</span>
                <span className="px-2 py-1 bg-surface-container-low font-mono text-[10px]">NODE.JS</span>
                <span className="px-2 py-1 bg-surface-container-low font-mono text-[10px]">REDIS</span>
                <span className="px-2 py-1 bg-surface-container-low font-mono text-[10px]">POSTGRES</span>
              </div>
            </div>
            <div className="flex-1">
              <span className="material-symbols-outlined text-5xl text-primary opacity-20">database</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section className="py-32 px-8 md:px-24 bg-surface-container-lowest" id="experience">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-secondary">The Journey</span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mt-4">EXPERIENCE</h2>
        </div>
        <div className="md:col-span-8">
          <div className="relative pl-12 border-l border-outline-variant/30 py-8">
            <div className="absolute left-[-5px] top-10 w-[10px] h-[10px] bg-primary rounded-full"></div>
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <h3 className="font-headline text-2xl font-bold">Software Engineer Intern</h3>
                <p className="text-primary font-medium">Harmony Technology — Fes, Morocco</p>
              </div>
              <span className="font-mono text-[10px] tracking-widest bg-surface-container p-2 mt-2 md:mt-0">JUL 2024 — SEP 2024</span>
            </div>
            <p className="text-on-surface-variant leading-relaxed max-w-3xl mb-6">
              Engineered scalable backend solutions and implemented intelligent data processing pipelines. Collaborated on cross-functional teams to deliver enterprise-grade software architectures.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-surface-container-high rounded-full font-mono text-[10px] text-on-surface/60">React.js</span>
              <span className="px-3 py-1 bg-surface-container-high rounded-full font-mono text-[10px] text-on-surface/60">FastAPI</span>
              <span className="px-3 py-1 bg-surface-container-high rounded-full font-mono text-[10px] text-on-surface/60">Docker</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, category, imageSrc, isPrimary, className = "" }: { title: string, category: string, imageSrc: string, isPrimary?: boolean, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !shineRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(185, 195, 255, 0.15) 0%, transparent 80%)`;
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`project-card relative group bg-surface-container-low overflow-hidden cursor-pointer ${className}`}
    >
      <div ref={shineRef} className="holographic-shine absolute inset-0 opacity-0 pointer-events-none z-10"></div>
      <div className="aspect-[16/10] overflow-hidden">
        <img alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" src={imageSrc} />
      </div>
      <div className="p-8 relative z-20">
        <div className="flex justify-between items-end">
          <div>
            <span className={`font-mono text-[10px] uppercase ${isPrimary ? 'text-primary' : 'text-secondary'}`}>{category}</span>
            <h3 className="font-headline text-3xl font-bold mt-2">{title}</h3>
          </div>
          <span className="material-symbols-outlined group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">arrow_outward</span>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="py-32 px-8 md:px-24" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary">Selected Works</span>
          <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mt-4">THE ARTIFACTS</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard 
            title="AYB Hub" 
            category="Central Intelligence Hub" 
            imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAxAhUqHj_lHt9Bh3jOzaaYeg_s9vHjroJRPd7-_aWWBXpLerSbeE3Ik5R1tktg4k75iffujX6uh5XFe9UdEDV0Kd31VgyL3ZDYrLcKlknkHYmtCZGlGQMhgDgSPUpXBq3IpyIDUoEU72eR4lCcTVchinyZtoXomZCkCx7FBf-4-EFTFrMYhRDg5No01C3RfZOOqyd6w0nU17867QV4hA1xSSlcQJRBCSOxWnhcyOIl2vz08FI9ebx_PDn4Ym8MOSFx_W91Bp4b9KAb" 
          />
          <ProjectCard 
            title="FlowDesk" 
            category="Workflow Automation" 
            imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDPcAkN48u_kPs7fZ1lqe0k0cj4vpt2xYB9xvqjUzp-T_YU7DmTp6TPM5qNpFgp-TTo1MHsWn3YTUBv03OeClEVVRxjyQ3Okap2Vdn3tWZL3mS3VNT7gp-mXQ0SwmAMcLOjKks-xBvexa2OXOZfjpA13pkdWmZv7MyzwEdSbxO0YoKePSFdy28sHSHJz-FFu3yZYT65T3xMmhYwLz3My_lNXloeJXMjm_yAR0NUuqz8aR0gcNYBRvnvfuwEaVln0LNqcbQMV9iP_ScY" 
            isPrimary 
            className="md:mt-24"
          />
          <ProjectCard 
            title="Agentic Systems" 
            category="Autonomous Agents" 
            imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAkp40Sj12FGXu8lHGh60qtKpDV8-bAnS2jEYdg-1NgQD704GunyDXv-y_aJIF5_A-h6M5mJYSdtLzz4tXxFumIKZkYXgchiFDLid8LMmhMQw96yu7m283Ht_ILHxrajHMsZGl6rxobWS-Kvy3lNBXWX3Wdxz3br6aYnHzncZSVJHlB31aUaGDQOKpyHFl5H9SxpXe3jC5QMmX6i2tc7z0P_54CHYHA4WWind5kW6WRCL4DBwPp3VLr9Z2Y0m1rxAvR2tRB8nBxNlyi" 
          />
          <ProjectCard 
            title="iTracker" 
            category="Logistics Tracking" 
            imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAuTV7qS3Kv38Uk7DDwE5U-xScb85lE3jBxPKRSIOMlxrdFblSPDqcXJtJtaLeQ6NsN5wyavkOWg5uz4BlgJBLDnM-BB1ikTenLEfMhyyRg8yGwSgQSZq_QkdkRz_MFP4rnjKxbPAS7_JrPCPxAzAqIwnn4fWfx0jAdpNdbmc9XfGf7batVZC3E7C642s6huhOFwLcxUViNOoD6geG3PYPxJppq7otCv_srAm2ZSRXvu4rCBO_sqDL0jByAaJky8HDI4FdO0GBB7BJH" 
            isPrimary 
            className="md:mt-24"
          />
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  return (
    <section className="py-32 px-8 md:px-24 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-headline text-3xl font-bold mb-12 flex items-center gap-4">
          VERIFIED EXPERTISE <span className="h-[1px] flex-1 bg-outline-variant/30"></span>
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 glass-card p-10 flex gap-8 items-center border-l-4 border-primary">
            <span className="material-symbols-outlined text-5xl text-primary-container">verified</span>
            <div>
              <h3 className="font-headline text-xl font-bold">AWS Academy Graduate</h3>
              <p className="font-mono text-[10px] uppercase text-on-surface/40 mb-2">Cloud Foundations</p>
              <p className="text-sm text-on-surface-variant">Cloud architecture and scalable infrastructure deployment.</p>
            </div>
          </div>
          <div className="flex-1 glass-card p-10 flex gap-8 items-center border-l-4 border-secondary">
            <span className="material-symbols-outlined text-5xl text-secondary-fixed">school</span>
            <div>
              <h3 className="font-headline text-xl font-bold">Generative AI Specialist</h3>
              <p className="font-mono text-[10px] uppercase text-on-surface/40 mb-2">Coursera DeepLearning.AI</p>
              <p className="text-sm text-on-surface-variant">LLM Lifecycle, prompt engineering, and agentic workflows.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="py-48 px-8 md:px-24 text-center relative" id="contact">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary-container/5 blur-[150px] -z-10 rounded-full"></div>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter mb-12">GOT A PROJECT?<br /><span className="text-primary">LET'S TALK.</span></h2>
        <a className="inline-flex items-center gap-4 px-12 py-6 bg-primary-container text-on-primary-container font-headline font-bold text-xl uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(0,71,255,0.2)]" href="mailto:ayoubyameury@gmail.com">
          Email Me <span className="material-symbols-outlined">send</span>
        </a>
        <div className="mt-24 flex justify-center gap-12">
          <a className="group flex flex-col items-center gap-3" href="#">
            <span className="material-symbols-outlined text-4xl group-hover:text-primary transition-colors">code</span>
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-40">Github</span>
          </a>
          <a className="group flex flex-col items-center gap-3" href="#">
            <span className="material-symbols-outlined text-4xl group-hover:text-primary transition-colors">hub</span>
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-40">LinkedIn</span>
          </a>
          <a className="group flex flex-col items-center gap-3" href="#">
            <span className="material-symbols-outlined text-4xl group-hover:text-primary transition-colors">alternate_email</span>
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-40">Twitter</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#353534]/30 px-12 py-10 flex flex-col md:flex-row justify-between items-center bg-transparent mt-24">
      <p className="font-mono text-[10px] tracking-widest uppercase text-[#E5E2E1]/40">
        © 2024 AYOUB AMEUR — ARCHITECT OF INTELLIGENCE
      </p>
      <div className="flex gap-10 mt-8 md:mt-0">
        <a className="font-mono text-[10px] tracking-widest uppercase text-[#E5E2E1]/40 hover:text-[#B9C3FF] hover:tracking-[0.2em] transition-all" href="#">Github</a>
        <a className="font-mono text-[10px] tracking-widest uppercase text-[#E5E2E1]/40 hover:text-[#B9C3FF] hover:tracking-[0.2em] transition-all" href="#">LinkedIn</a>
        <a className="font-mono text-[10px] tracking-widest uppercase text-[#E5E2E1]/40 hover:text-[#B9C3FF] hover:tracking-[0.2em] transition-all" href="#">Twitter</a>
        <a className="font-mono text-[10px] tracking-widest uppercase text-[#E5E2E1]/40 hover:text-[#B9C3FF] hover:tracking-[0.2em] transition-all" href="#">Email</a>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[9999] grain-overlay opacity-[0.03]"></div>
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-primary-container/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] bg-secondary-container/5 blur-[120px] rounded-full"></div>
      </div>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </>
  );
}
