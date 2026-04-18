import React, { useState, useRef } from 'react';
import { Linkedin, Github, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhatsAppIcon = ({ size = 22 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    fill="currentColor" 
    viewBox="0 0 16 16"
  >
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mainBtnRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    // Initial hide
    gsap.set(containerRef.current, { opacity: 0, scale: 0.8, pointerEvents: 'none' });

    // Show button only after scrolling past the Hero section
    ScrollTrigger.create({
      trigger: "#hero",
      start: "bottom 80%",
      onEnter: () => {
        gsap.to(containerRef.current, { 
          opacity: 1, 
          scale: 1, 
          force3D: true,
          pointerEvents: 'auto'
        });
      },
      onLeaveBack: () => {
        gsap.to(containerRef.current, { 
          opacity: 0, 
          scale: 0.8, 
          duration: 0.4, 
          force3D: true,
          pointerEvents: 'none'
        });
      }
    });

    if (isOpen) {
      // Animation when opening
      gsap.fromTo(".social-btn",
        { y: 20, opacity: 0, scale: 0.5 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          autoAlpha: 1,
          pointerEvents: 'auto',
          force3D: true
        }
      );
    } else {
      // Animation when closing
      gsap.to(".social-btn", {
        y: 20,
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        stagger: {
          each: 0.05,
          from: "end"
        },
        ease: "power2.in",
        autoAlpha: 0,
        pointerEvents: 'none',
        force3D: true
      });
    }
  }, [isOpen]);

  const socialLinks = [
    {
      icon: <WhatsAppIcon />,
      label: "WhatsApp",
      link: "#", // Placeholder
      color: "hover:bg-green-500/10 hover:border-green-500/50"
    },
    {
      icon: <Linkedin size={22} />,
      label: "LinkedIn",
      link: "#", // Placeholder
      color: "hover:bg-blue-500/10 hover:border-blue-500/50"
    },
    {
      icon: <Github size={22} />,
      label: "GitHub",
      link: "#", // Placeholder
      color: "hover:bg-white/10 hover:border-white/50"
    }
  ];

  return (
    <div ref={containerRef} className="fixed bottom-8 right-8 z-[9999] flex flex-col items-center gap-4">
      {/* Menu items */}
      <div ref={menuRef} className="flex flex-col items-center gap-3">
        {socialLinks.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-btn invisible opacity-0 pointer-events-none flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-colors duration-300 ${item.color}`}
            title={item.label}
          >
            {item.icon}
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        ref={mainBtnRef}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-colors duration-300 hover:border-white/40 hover:bg-neutral-900"
      >
        <MessageSquare size={26} />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-10" />
      </button>
    </div>
  );
};

export default FloatingContact;
