import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  link?: string;
  description: string;
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: 'Playwright QA Automation Engineer | E2E Testing | React & Full-Stack',
    company: 'Upwork & Fiverr',
    location: 'Remote / Global Clients',
    duration: '2022 – Present',
    type: 'Freelance Engineering',
    link: 'https://www.upwork.com/freelancers/~01fd0bd31004322b09',
    description:
      'Architecting enterprise end-to-end automation suites using Playwright with TypeScript, Page Object Models, API validation, and deterministic database seed/reset workflows. Engineering high-performance, responsive full-stack web applications with React, Next.js, Node.js, Express, and modern REST APIs for international clients.',
    technologies: [
      'Playwright',
      'TypeScript',
      'Page Object Model',
      'E2E Testing',
      'React.js',
      'Next.js',
      'Node.js',
      'REST APIs',
      'CI/CD',
    ],
  },
  {
    role: 'QA Automation Engineer Intern',
    company: 'Neologix',
    location: 'Fès, Morocco',
    duration: '2 months',
    type: 'Engineering Internship',
    description:
      'Built and maintained automated quality workflows for GoroInvest (a multi-tenant investment platform), combining browser automation, API validation, and SQL-level data verification to test authentication, tenant isolation, dashboards, and critical business flows. Implemented Page Object Models, reusable fixtures, deterministic PostgreSQL test-data seed/reset workflows, and security-focused regression suites within GitHub CI/CD.',
    technologies: [
      'Playwright',
      'TypeScript',
      'Page Object Model',
      'E2E Testing',
      'API Testing',
      'PostgreSQL',
      'SQL Verification',
      'CI/CD',
      'GitHub Actions',
      'Jira',
      'Agile',
    ],
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Harmony Technology',
    location: 'Rabat, Morocco',
    duration: '2 months',
    type: 'Engineering Internship',
    description:
      'Developed full-stack web features with React, Node.js, Express, and MongoDB, including secure REST APIs, authentication mechanisms, and responsive user interfaces, with practical exposure to containerized Docker deployments and CI/CD pipelines.',
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
      'Authentication',
      'Docker',
      'CI/CD',
    ],
  },
];

const education = [
  {
    degree: 'Engineering Degree in Software Engineering & Artificial Intelligence',
    institution: 'National School of Applied Sciences (ENSA)',
    location: 'Fès, Morocco',
    period: '2024 – Present',
    details: 'Comprehensive curriculum spanning advanced algorithms, distributed systems, software quality, databases, computer vision, and machine learning.',
  },
  {
    degree: 'Integrated Preparatory Classes',
    institution: 'National School of Applied Sciences (ENSA)',
    location: 'Fès, Morocco',
    period: '2022 – 2024',
    details: 'Intensive two-year preparatory cycle integrated within ENSA Fès focusing on advanced mathematics, physics, and fundamentals of computer science and algorithms.',
  },
];

const Experience = () => {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 0.5,
        },
      }
    );

    gsap.fromTo(
      itemsRef.current?.children || [],
      { x: -25, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-36 px-6 md:px-24 bg-black border-t border-white/5 relative" id="experience">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        
        {/* Left Column: Heading */}
        <div className="md:col-span-4">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/30 mb-4">Career Timeline</p>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-none">
            Experience<br />
            <span className="text-white/40">& Education.</span>
          </h2>
          <p className="text-sm md:text-base text-gray-400 font-light mt-6 max-w-sm leading-relaxed">
            Practical software engineering internships and rigorous academic preparation at ENSA Fès.
          </p>
        </div>

        {/* Right Column: Timeline items */}
        <div className="md:col-span-8 relative">

          {/* Animated Vertical Line */}
          <div ref={lineRef} className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/15 hidden md:block" />

          <div ref={itemsRef} className="flex flex-col gap-12 md:gap-16 md:pl-14">

            {/* Section 1: Professional Experience */}
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                Professional & Freelance Experience
              </p>

              <div className="flex flex-col gap-12">
                {experiences.map((exp, index) => (
                  <div key={exp.company} className="group relative">
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-[63px] top-3 w-3 h-3 bg-white rounded-full hidden md:block scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />

                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-gray-200 transition-colors">
                        {exp.role}
                      </h3>
                      <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                        {exp.duration} · {exp.location}
                      </span>
                    </div>

                    <p className="text-white/70 font-mono text-sm mb-4">
                      {exp.link ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white underline underline-offset-4 inline-flex items-center gap-1.5 transition-colors text-white font-medium"
                        >
                          {exp.company} <span className="text-white/50 text-xs">↗</span>
                        </a>
                      ) : (
                        <span>{exp.company}</span>
                      )}
                      <span className="text-white/30"> · {exp.type}</span>
                    </p>

                    <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base mb-6 max-w-3xl">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={tech}
                          className={`text-xs px-3 py-1 rounded-full font-mono tracking-wide transition-colors cursor-default ${
                            i === 0
                              ? 'text-black bg-white font-semibold'
                              : 'text-white/80 border border-white/15 bg-white/[0.04] hover:bg-white/10'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Education */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                Academic Background
              </p>

              <div className="flex flex-col gap-10">
                {education.map((edu) => (
                  <div key={edu.degree} className="group relative">
                    {/* Timeline Node Dot - Matches Experience with 100% full opacity and glow */}
                    <div className="absolute -left-[63px] top-3 w-3 h-3 bg-white rounded-full hidden md:block scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />

                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1">
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {edu.degree}
                      </h3>
                      <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                        {edu.period}
                      </span>
                    </div>

                    <p className="text-white/70 font-mono text-sm mb-3">
                      {edu.institution} <span className="text-white/30">· {edu.location}</span>
                    </p>

                    <p className="text-gray-400 font-light text-sm leading-relaxed max-w-2xl">
                      {edu.details}
                    </p>
                  </div>
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
