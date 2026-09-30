import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { togetherlyBrand, TOGETHERLY_GOOGLE_SHEET_COPY_URL } from '../config/productConfig';
import SEOHead from './SEOHead';

interface TogetherlyComingSoonProps {
  onNavigate: (path: string) => void;
  title?: string;
}

export default function TogetherlyComingSoon({ onNavigate, title }: TogetherlyComingSoonProps) {
  return (
    <div className="min-h-screen bg-[#174F4A] text-[#FAF6EF] flex flex-col justify-between selection:bg-[#FAF6EF] selection:text-[#174F4A]">
      <SEOHead
        title="Coming Soon | Togetherly"
        description="We're currently crafting this experience for couples. In the meantime, explore our 8-sheet Couples Money Planner."
      />

      {/* Top Brand Bar */}
      <header className="w-full py-6 px-4 sm:px-8 border-b border-[#2C7A73]/30 flex items-center justify-between">
        <button
          onClick={() => onNavigate('/togetherly')}
          className="inline-flex items-center gap-2 text-sm text-[#FAF6EF]/80 hover:text-[#FAF6EF] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#F29B7F]" />
          <span>Back to Togetherly</span>
        </button>

        <a
          href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-xs font-bold px-4 py-2 rounded-none transition-colors cursor-pointer shadow-sm"
        >
          <span>Get Couples Money Planner</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </header>

      {/* Main Canvas: Green & Cream, Logo, Static Icon, Message */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center py-20 max-w-2xl mx-auto space-y-6">
        {/* Togetherly Logo */}
        <div className="flex justify-center">
          <img
            src={togetherlyBrand.assets.logoLight}
            alt="Togetherly"
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </div>

        {/* Message */}
        <div className="space-y-3 pt-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6EF] tracking-tight leading-tight">
            {title || 'Coming Soon'}
          </h1>
          <p className="text-sm sm:text-base text-[#FAF6EF]/80 leading-relaxed max-w-lg mx-auto">
            We are currently crafting and polishing this guide and feature for couples. In the meantime, our complete 8-sheet Couples Money Planner is ready to use today.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <a
            href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-sm font-bold px-6 py-3.5 rounded-none transition-colors cursor-pointer shadow-sm"
          >
            <span>Get Couples Money Planner ($19)</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </a>

          <button
            onClick={() => onNavigate('/togetherly')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#2C7A73]/20 text-[#FAF6EF] text-sm font-medium px-5 py-3.5 rounded-none border border-[#FAF6EF]/20 transition-colors cursor-pointer"
          >
            <span>Return to Home</span>
          </button>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-6 px-4 text-center text-xs text-[#FAF6EF]/50 border-t border-[#2C7A73]/20">
        © {new Date().getFullYear()} Togetherly. Designed for couples building a future together.
      </footer>
    </div>
  );
}
