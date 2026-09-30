import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { togetherlyBrand, TOGETHERLY_GOOGLE_SHEET_COPY_URL } from '../config/productConfig';

interface TogetherlyNavProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onOpenDemo?: () => void;
  onOpenCheckout?: () => void;
}

export default function TogetherlyNav({ onNavigate }: TogetherlyNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#174F4A] border-b border-[#2C7A73]/30 transition-all text-[#FAF6EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand identity */}
          <div className="flex items-center">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group text-left cursor-pointer"
              title="Togetherly"
            >
              {/* White + Peach Light Logo matching dark green background */}
              <img
                src={togetherlyBrand.assets.logoLight}
                alt="Togetherly"
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </a>
          </div>

          {/* Desktop CTAs (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-3.5">
            <a
              href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#FAF6EF] bg-transparent hover:bg-white/10 px-4 py-2.5 rounded-none border border-[#FAF6EF]/30 transition-colors cursor-pointer"
            >
              <span>Preview Demo</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#F29B7F]" />
            </a>

            <a
              href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-xs font-bold px-5 py-2.5 rounded-none transition-colors cursor-pointer shadow-none"
            >
              <span>Get the Planner</span>
            </a>
          </div>

          {/* Mobile Burger Menu Button (Visible only on mobile/tablet) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2.5 text-[#FAF6EF] hover:text-[#F29B7F] bg-[#2C7A73]/20 hover:bg-[#2C7A73]/40 rounded-none border border-[#FAF6EF]/20 transition-colors cursor-pointer flex items-center justify-center"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-Page Mobile Navigation Drawer (Right-to-Left Smooth Slide) */}
      <div
        className={`fixed inset-0 z-50 bg-[#174F4A] text-[#FAF6EF] flex flex-col justify-between transition-transform duration-400 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        style={{
          backgroundImage: 'radial-gradient(circle at top right, rgba(44, 122, 115, 0.25), transparent 70%)',
        }}
      >
        {/* Top Header inside Drawer */}
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 border-b border-[#2C7A73]/30 shrink-0">
          <img
            src={togetherlyBrand.assets.logoLight}
            alt="Togetherly"
            className="h-9 w-auto object-contain"
          />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="p-2 text-[#FAF6EF] hover:text-[#F29B7F] bg-[#2C7A73]/20 hover:bg-[#2C7A73]/40 rounded-none border border-[#FAF6EF]/20 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
          {/* Brand Tagline */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F29B7F]">
              Togetherly Systems
            </span>
            <h3 className="text-xl font-extrabold text-[#FAF6EF] leading-snug">
              Money made simpler, life more together.
            </h3>
            <p className="text-xs text-[#FAF6EF]/75 leading-relaxed pt-1">
              The 8-sheet Google Sheets system designed for couples to plan, split fairly, and save without resentment.
            </p>
          </div>

          {/* Primary Action Buttons (Full-Width, High Contrast) */}
          <div className="space-y-3 pt-1">
            <a
              href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-sm font-bold py-3.5 px-5 rounded-none transition-colors cursor-pointer shadow-md"
            >
              <span>Get Couples Money Planner ($19)</span>
              <ArrowRight className="w-4 h-4 ml-0.5 text-[#174F4A]" />
            </a>

            <a
              href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-[#FAF6EF] text-sm font-semibold py-3.5 px-5 rounded-none border border-[#FAF6EF]/30 transition-colors cursor-pointer"
            >
              <span>Preview Live Demo</span>
              <ExternalLink className="w-4 h-4 ml-0.5 text-[#F29B7F]" />
            </a>
          </div>

          {/* Section Navigation Links */}
          <div className="pt-4 border-t border-[#2C7A73]/30 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F29B7F]/80 block">
              Quick Navigation
            </span>
            <ul className="space-y-3.5 text-sm font-medium">
              <li>
                <a
                  href="#overview"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#FAF6EF]/85 hover:text-white transition-colors"
                >
                  System & Dashboard Overview
                </a>
              </li>
              <li>
                <a
                  href="#rituals"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#FAF6EF]/85 hover:text-white transition-colors"
                >
                  The 3-Pot Philosophy & Milestones
                </a>
              </li>
              <li>
                <a
                  href="#calculator"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#FAF6EF]/85 hover:text-white transition-colors"
                >
                  Fair Split Interactive Calculator
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#FAF6EF]/85 hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onNavigate) onNavigate('/togetherly/coming-soon');
                  }}
                  className="block text-left w-full text-[#FAF6EF]/85 hover:text-white transition-colors cursor-pointer"
                >
                  Product Roadmap & Coming Soon
                </button>
              </li>
              {onNavigate && (
                <li className="pt-3 border-t border-[#2C7A73]/20">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate('/');
                    }}
                    className="flex items-center gap-1.5 text-xs text-[#91B7A0] hover:text-[#FAF6EF] transition-colors cursor-pointer"
                  >
                    <span>← Back to Ayoub Ameur Portfolio</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Drawer Footer with Trust Note */}
        <div className="px-6 py-4 border-t border-[#2C7A73]/30 bg-[#0F3834]/40 shrink-0 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-[#91B7A0]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>100% Private Google Sheets • Instant 1-Click Copy</span>
          </div>
        </div>
      </div>
    </header>
  );
}
