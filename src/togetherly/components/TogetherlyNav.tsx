import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling and horizontal dragging when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-[100] backdrop-blur-md bg-[#174F4A] border-b border-[#2C7A73]/30 transition-all text-[#FAF6EF]">
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
      </header>
      {/* Spacer so page content begins neatly below fixed navbar */}
      <div className="h-20 w-full" aria-hidden="true" />

      {/* Full-Page Mobile Navigation Drawer Rendered Via Portal to Document Body */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <div
          id="togetherly-mobile-drawer-portal"
          className={`fixed inset-0 z-[9999] md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'opacity-100 pointer-events-auto visible'
              : 'opacity-0 pointer-events-none invisible'
          }`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100dvh',
          }}
        >
          {/* Solid 100% OPAQUE Full-Page Drawer (Smooth Right-to-Left Slide) */}
          <div
            className={`absolute inset-0 w-full h-full text-[#FAF6EF] flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{
              backgroundColor: '#174F4A',
              opacity: 1,
            }}
          >
            {/* Top Header inside Drawer */}
            <div className="flex items-center justify-between h-20 px-5 sm:px-6 border-b border-[#2C7A73]/40 bg-[#174F4A] shrink-0">
              <img
                src={togetherlyBrand.assets.logoLight}
                alt="Togetherly"
                className="h-9 w-auto object-contain"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-2.5 text-[#FAF6EF] hover:text-[#F29B7F] bg-[#2C7A73]/30 hover:bg-[#2C7A73]/50 rounded-none border border-[#FAF6EF]/20 transition-colors cursor-pointer flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Body Content (100% Solid Opaque Green Background) */}
            <div className="flex-1 overflow-y-auto px-6 py-7 space-y-7 bg-[#174F4A]">
              {/* Brand Tagline */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F29B7F]">
                  Togetherly Systems
                </span>
                <h3 className="text-xl font-extrabold text-[#FAF6EF] leading-snug">
                  Money made simpler, life more together.
                </h3>
                <p className="text-xs text-[#FAF6EF]/85 leading-relaxed pt-1">
                  The 8-sheet Google Sheets system designed for couples to plan, split fairly, and save without resentment.
                </p>
              </div>

              {/* Primary Action Buttons (Full-Width, High Contrast, 100% Solid) */}
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
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#2C7A73]/30 hover:bg-[#2C7A73]/50 text-[#FAF6EF] text-sm font-semibold py-3.5 px-5 rounded-none border border-[#FAF6EF]/30 transition-colors cursor-pointer"
                >
                  <span>Preview Live Demo</span>
                  <ExternalLink className="w-4 h-4 ml-0.5 text-[#F29B7F]" />
                </a>
              </div>

              {/* Section Navigation Links */}
              <div className="pt-4 border-t border-[#2C7A73]/40 space-y-3.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F29B7F] block">
                  Quick Navigation
                </span>
                <ul className="space-y-3 text-sm font-medium">
                  <li>
                    <a
                      href="#overview"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-[#FAF6EF] hover:text-[#F29B7F] transition-colors py-1"
                    >
                      System & Dashboard Overview
                    </a>
                  </li>
                  <li>
                    <a
                      href="#rituals"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-[#FAF6EF] hover:text-[#F29B7F] transition-colors py-1"
                    >
                      The 3-Pot Philosophy & Milestones
                    </a>
                  </li>
                  <li>
                    <a
                      href="#calculator"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-[#FAF6EF] hover:text-[#F29B7F] transition-colors py-1"
                    >
                      Fair Split Interactive Calculator
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-[#FAF6EF] hover:text-[#F29B7F] transition-colors py-1"
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
                      className="block text-left w-full text-[#FAF6EF] hover:text-[#F29B7F] transition-colors cursor-pointer py-1"
                    >
                      Product Roadmap & Coming Soon
                    </button>
                  </li>
                  {onNavigate && (
                    <li className="pt-3 border-t border-[#2C7A73]/30">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onNavigate('/');
                        }}
                        className="flex items-center gap-1.5 text-xs text-[#91B7A0] hover:text-[#FAF6EF] transition-colors cursor-pointer py-1"
                      >
                        <span>← Back to Ayoub Ameur Portfolio</span>
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Drawer Footer with Trust Note */}
            <div className="px-6 py-4 border-t border-[#2C7A73]/40 bg-[#0F3834] shrink-0 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-[#91B7A0]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Private Google Sheets • Instant 1-Click Copy</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
