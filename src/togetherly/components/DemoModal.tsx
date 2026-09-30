import { X, ExternalLink, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { couplesMoneyPlanner } from '../config/productConfig';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  if (!isOpen) return null;

  const hasConfiguredDemoUrl = Boolean(couplesMoneyPlanner.demoUrl && couplesMoneyPlanner.demoUrl.startsWith('http'));

  return (
    <div
      className="fixed inset-0 z-50 bg-[#174F4A]/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF6EF] w-full max-w-2xl rounded-none shadow-2xl border border-[#174F4A]/15 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#174F4A] text-[#FAF6EF] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#F29B7F]" />
            <h3 className="font-bold text-base">Couples Money Planner — Live Demo</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-none bg-white/10 hover:bg-white/20 text-[#FAF6EF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex items-start gap-3 bg-[#174F4A]/5 p-4 rounded-none border border-[#174F4A]/10 text-xs sm:text-sm text-[#243B38]">
            <ShieldCheck className="w-5 h-5 text-[#2C7A73] shrink-0 mt-0.5" />
            <p>
              This is a <strong>safe, view-only demonstration copy</strong> populated with realistic demonstration data (household income, 18 realistic sample transactions, budget categories, and savings milestones).
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#174F4A] uppercase tracking-wider">
              What you can test in the demo:
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#243B38]/90">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-none bg-[#2C7A73]" />
                <span>Switch between all 8 sheets (Dashboard, Monthly Plan, Fair Split, Goals, Bills, Money Date).</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-none bg-[#2C7A73]" />
                <span>Inspect how the proportional fair-split math calculates equitable contributions.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-none bg-[#2C7A73]" />
                <span>Verify that zero third-party bank linking or credentials are requested.</span>
              </li>
            </ul>
          </div>

          <div className="pt-2 border-t border-[#174F4A]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            {hasConfiguredDemoUrl ? (
              <a
                href={couplesMoneyPlanner.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#174F4A] text-[#FAF6EF] text-xs sm:text-sm font-bold px-6 py-3 rounded-none hover:bg-[#0F3834] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Open View-Only Google Sheet</span>
                <ExternalLink className="w-4 h-4 text-[#F29B7F]" />
              </a>
            ) : (
              <div className="w-full bg-[#FFFFFF] p-3 rounded-none border border-[#174F4A]/15 text-xs text-[#6F7F7C] text-center">
                <span>View-only demo URL will open directly once configured via <code className="bg-[#174F4A]/10 px-1 py-0.5 rounded-none text-[#174F4A]">VITE_TOGETHERLY_DEMO_URL</code>. You can also inspect the full high-resolution tabs in the section below!</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full sm:w-auto text-xs text-[#6F7F7C] hover:text-[#174F4A] py-2.5 px-4 rounded-none font-medium cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
