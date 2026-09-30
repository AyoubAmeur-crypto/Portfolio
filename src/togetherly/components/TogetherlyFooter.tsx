import React from 'react';
import {
  ShieldCheck,
  Heart,
  ArrowUpRight,
  FileSpreadsheet,
  ExternalLink,
  BadgeCheck,
  Clock,
} from 'lucide-react';
import { togetherlyBrand, TOGETHERLY_GOOGLE_SHEET_COPY_URL } from '../config/productConfig';

interface TogetherlyFooterProps {
  onNavigate: (path: string) => void;
}

export default function TogetherlyFooter({ onNavigate }: TogetherlyFooterProps) {
  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('/togetherly/coming-soon');
  };

  return (
    <footer className="w-full bg-[#174F4A] text-[#FAF6EF] pt-14 sm:pt-20 pb-10 sm:pb-12 border-t border-[#2C7A73]/30">
      {/* Full-width container with responsive horizontal breathing room */}
      <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20">
        {/* Main Footer: Flex Row Layout on Desktop, Stacked on Mobile */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 sm:gap-12 lg:gap-16 xl:gap-24 pb-12 sm:pb-16 border-b border-[#2C7A73]/30">
          
          {/* Brand Ethos Column */}
          <div className="w-full lg:w-[32%] xl:w-[28%] space-y-4 sm:space-y-5 shrink-0">
            <div
              className="inline-block cursor-pointer"
              onClick={() => onNavigate('/togetherly')}
            >
              <img
                src={togetherlyBrand.assets.logoLight}
                alt="Togetherly"
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </div>

            <p className="text-xs sm:text-sm font-semibold text-[#F29B7F] tracking-wide">
              {togetherlyBrand.tagline}
            </p>

            <p className="text-xs text-[#FAF6EF]/75 leading-relaxed max-w-md lg:max-w-none">
              The complete 8-sheet Google Sheets system designed for modern couples. Plan shared living, automate fair income-weighted splits, and build long-term security in total harmony.
            </p>

            {/* Trust Markers */}
            <div className="pt-2 space-y-2.5 text-xs text-[#FAF6EF]/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#91B7A0] shrink-0" />
                <span>100% Private Google Sheets — Zero Bank Passwords</span>
              </div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#91B7A0] shrink-0" />
                <span>Works on any web browser, iPad, iOS & Android</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-[#91B7A0] shrink-0" />
                <span>One-time payment • Lifetime personal license</span>
              </div>
            </div>
          </div>

          {/* Separated Links Columns: Responsive Grid for Clean Layout on All Mobile Screens */}
          <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-10 xl:gap-14 pt-2 lg:pt-0">
            
            {/* Column 1: Products & Systems */}
            <div className="space-y-3.5 sm:space-y-4">
              <h4 className="text-xs font-bold text-[#F29B7F] uppercase tracking-wider">
                Products & Systems
              </h4>
              <ul className="space-y-2.5 sm:space-y-3.5 text-xs text-[#FAF6EF]/80">
                <li>
                  <a
                    href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1.5 font-semibold text-[#FAF6EF] py-1"
                  >
                    <span>Couples Money Planner</span>
                    <ExternalLink className="w-3 h-3 text-[#F29B7F]" />
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left flex items-center justify-between gap-3 w-full cursor-pointer text-[#FAF6EF]/70 hover:text-[#FAF6EF] py-1"
                  >
                    <span>Fair Split Engine</span>
                    <span className="inline-flex items-center gap-1 text-[10px] bg-[#2C7A73]/40 px-1.5 py-0.5 text-[#91B7A0]">
                      <Clock className="w-2.5 h-2.5" />
                      <span>Soon</span>
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left flex items-center justify-between gap-3 w-full cursor-pointer text-[#FAF6EF]/70 hover:text-[#FAF6EF] py-1"
                  >
                    <span>3-Pot System Template</span>
                    <span className="inline-flex items-center gap-1 text-[10px] bg-[#2C7A73]/40 px-1.5 py-0.5 text-[#91B7A0]">
                      <Clock className="w-2.5 h-2.5" />
                      <span>Soon</span>
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left flex items-center justify-between gap-3 w-full cursor-pointer text-[#FAF6EF]/70 hover:text-[#FAF6EF] py-1"
                  >
                    <span>Milestones Tracker</span>
                    <span className="inline-flex items-center gap-1 text-[10px] bg-[#2C7A73]/40 px-1.5 py-0.5 text-[#91B7A0]">
                      <Clock className="w-2.5 h-2.5" />
                      <span>Soon</span>
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left flex items-center justify-between gap-3 w-full cursor-pointer text-[#FAF6EF]/70 hover:text-[#FAF6EF] py-1"
                  >
                    <span>House Deposit Planner</span>
                    <span className="inline-flex items-center gap-1 text-[10px] bg-[#2C7A73]/40 px-1.5 py-0.5 text-[#91B7A0]">
                      <Clock className="w-2.5 h-2.5" />
                      <span>Planned</span>
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left flex items-center justify-between gap-3 w-full cursor-pointer text-[#FAF6EF]/70 hover:text-[#FAF6EF] py-1"
                  >
                    <span>Annual Money Review</span>
                    <span className="inline-flex items-center gap-1 text-[10px] bg-[#2C7A73]/40 px-1.5 py-0.5 text-[#91B7A0]">
                      <Clock className="w-2.5 h-2.5" />
                      <span>Planned</span>
                    </span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Rituals & Guides */}
            <div className="space-y-3.5 sm:space-y-4">
              <h4 className="text-xs font-bold text-[#F29B7F] uppercase tracking-wider">
                Rituals & Guides
              </h4>
              <ul className="space-y-2.5 sm:space-y-3.5 text-xs text-[#FAF6EF]/70">
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left block cursor-pointer py-1"
                  >
                    The 20-Minute Money Date Guide
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left block cursor-pointer py-1"
                  >
                    Proportional vs. 50/50 Splitting
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left block cursor-pointer py-1"
                  >
                    Guilt-Free Personal Allowances
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left block cursor-pointer py-1"
                  >
                    Google Sheets Setup & Copy Guide
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left block cursor-pointer py-1"
                  >
                    Couples Budgeting Checklist
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left block cursor-pointer py-1"
                  >
                    Frequently Asked Questions
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Trust & Policies */}
            <div className="space-y-3.5 sm:space-y-4">
              <h4 className="text-xs font-bold text-[#F29B7F] uppercase tracking-wider">
                Trust & Policies
              </h4>
              <ul className="space-y-2.5 sm:space-y-3.5 text-xs text-[#FAF6EF]/70">
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left block cursor-pointer py-1"
                  >
                    Privacy Architecture
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left block cursor-pointer py-1"
                  >
                    30-Day Money-Back Guarantee
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left block cursor-pointer py-1"
                  >
                    Priority Customer Support
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left block cursor-pointer py-1"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left block cursor-pointer py-1"
                  >
                    Refund Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleComingSoon}
                    className="hover:text-white transition-colors text-left block cursor-pointer py-1"
                  >
                    Product Roadmap & Changelog
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Full Width, Center-aligned on Mobile, Split on Sm+ */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-[#FAF6EF]/70 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 flex-wrap">
            <span>© {new Date().getFullYear()} Togetherly. Designed with</span>
            <Heart className="w-3.5 h-3.5 text-[#F29B7F] fill-[#F29B7F]" />
            <span>for couples everywhere.</span>
          </div>

          <div className="w-full sm:w-auto flex items-center justify-center">
            <a
              href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#FAF6EF] bg-[#2C7A73]/40 hover:bg-[#2C7A73] px-5 py-2.5 rounded-none transition-colors border border-[#FAF6EF]/10"
            >
              <span>Get Couples Money Planner ($19)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#F29B7F]" />
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 pt-4 border-t border-[#2C7A73]/20 text-[11px] text-[#FAF6EF]/40 text-center leading-relaxed">
          Disclaimer: Togetherly digital products provide financial organization and budgeting templates for personal use. They do not constitute certified legal, tax, or investment advice. Google Sheets™ is a registered trademark of Google LLC.
        </div>
      </div>
    </footer>
  );
}
