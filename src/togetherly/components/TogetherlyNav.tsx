import { ExternalLink } from 'lucide-react';
import { togetherlyBrand, TOGETHERLY_GOOGLE_SHEET_COPY_URL } from '../config/productConfig';

interface TogetherlyNavProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onOpenDemo?: () => void;
  onOpenCheckout?: () => void;
}

export default function TogetherlyNav({}: TogetherlyNavProps) {
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

          {/* Just the 2 CTAs leading to Google Sheet */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            <a
              href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#FAF6EF] bg-transparent hover:bg-white/10 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-none border border-[#FAF6EF]/30 transition-colors cursor-pointer"
            >
              <span>Preview Demo</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#F29B7F]" />
            </a>

            <a
              href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-xs font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-none transition-colors cursor-pointer shadow-none"
            >
              <span>Get the Planner</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
