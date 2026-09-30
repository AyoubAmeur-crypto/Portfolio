import { useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileSpreadsheet,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Clock,
  Layers,
  Zap,
  Lock,
  RefreshCw,
  Gift,
  X
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import TogetherlyNav from '../components/TogetherlyNav';
import TogetherlyFooter from '../components/TogetherlyFooter';
import ProductShowcase from '../components/ProductShowcase';
import DemoModal from '../components/DemoModal';
import CheckoutModal from '../components/CheckoutModal';
import { couplesMoneyPlanner } from '../config/productConfig';

interface CouplesMoneyPlannerProps {
  onNavigate: (path: string) => void;
}

export default function CouplesMoneyPlanner({ onNavigate }: CouplesMoneyPlannerProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckoutClick = () => {
    if (
      couplesMoneyPlanner.lemonSqueezyCheckoutUrl &&
      couplesMoneyPlanner.lemonSqueezyCheckoutUrl.startsWith('http')
    ) {
      window.location.href = couplesMoneyPlanner.lemonSqueezyCheckoutUrl;
    } else {
      setCheckoutOpen(true);
    }
  };

  const handleDemoClick = () => {
    if (couplesMoneyPlanner.demoUrl && couplesMoneyPlanner.demoUrl.startsWith('http')) {
      window.open(couplesMoneyPlanner.demoUrl, '_blank', 'noopener,noreferrer');
    } else {
      setDemoOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F0E4] text-[#243B38] font-sans antialiased selection:bg-[#F29B7F]/30 selection:text-[#174F4A]">
      <SEOHead
        title="Togetherly — Couples Money Planner (Google Sheets System)"
        description="The complete 8-sheet financial planning system for couples in Google Sheets. Track shared expenses, automate fair proportional splits, and achieve savings goals without tension."
        canonicalPath="/togetherly/couples-money-planner"
        ogImage="/togetherly/dashboard.png"
      />

      {/* Navigation */}
      <TogetherlyNav
        currentPath="/togetherly/couples-money-planner"
        onNavigate={onNavigate}
        onOpenDemo={handleDemoClick}
        onOpenCheckout={handleCheckoutClick}
      />

      <main>
        {/* Product Hero */}
        <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#174F4A]/10 text-[#174F4A] text-xs font-bold tracking-wide uppercase">
                <FileSpreadsheet className="w-4 h-4 text-[#F29B7F]" />
                <span>Google Sheets Digital System • Instant Digital Download</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#174F4A] tracking-tight leading-[1.14]">
                The complete financial planning system designed for couples.
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-[#6F7F7C] leading-relaxed max-w-3xl mx-auto">
                Track shared living costs, balance fair contributions without awkward math, and build your shared financial future with calm confidence in Google Sheets.
              </p>

              {/* CTAs (Squared corners) */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-sm sm:text-base font-semibold px-8 py-3.5 rounded-none transition-colors cursor-pointer"
                >
                  <span>Get Couples Money Planner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleDemoClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#FAF6EF] text-[#174F4A] text-sm sm:text-base font-semibold px-7 py-3.5 rounded-none border border-[#174F4A]/20 transition-colors cursor-pointer"
                >
                  <span>Explore View-Only Demo</span>
                  <ExternalLink className="w-4 h-4 text-[#2C7A73]" />
                </button>
              </div>

              {/* Trust Pills */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#6F7F7C]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2C7A73]" />
                  <span>One-time payment • No monthly fees</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#2C7A73]" />
                  <span>100% Private (No bank logins)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#2C7A73]" />
                  <span>Instant digital delivery to email</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-[#2C7A73]" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </div>

            {/* Hero Main Screenshot Frame */}
            <div className="mt-14 max-w-5xl mx-auto">
              <div className="bg-[#FFFFFF] p-2 sm:p-4 rounded-none border border-[#174F4A]/15 shadow-none">
                <div className="bg-[#F7F0E4] px-4 py-3 rounded-none border border-[#174F4A]/10 flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-none bg-[#E57373]" />
                    <span className="w-3 h-3 rounded-none bg-[#FFD54F]" />
                    <span className="w-3 h-3 rounded-none bg-[#81C784]" />
                    <span className="text-xs font-mono text-[#6F7F7C] ml-2 hidden sm:inline">
                      Google Sheets • Togetherly Couples Money Planner (Home Dashboard)
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#174F4A] bg-[#2C7A73]/15 px-3 py-0.5 rounded-none">
                    Native Sheets System
                  </span>
                </div>

                <div className="rounded-none overflow-hidden border border-[#174F4A]/10">
                  <img
                    src="/togetherly/dashboard.png"
                    alt="Togetherly Couples Money Planner Google Sheets Dashboard"
                    className="w-full h-auto object-cover rounded-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8-Sheet Product Showcase Interactive Explorer */}
        <ProductShowcase />

        {/* The Problem & The Solution */}
        <section className="py-20 bg-[#FFFFFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#174F4A]/10 text-[#174F4A] text-xs font-bold tracking-wide uppercase">
                <span>Why Togetherly Works</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#174F4A] tracking-tight">
                Stop fighting about money. Start building together.
              </h2>
              <p className="text-base text-[#6F7F7C] leading-relaxed">
                Most budgeting setups create friction between partners. Togetherly is intentionally built to remove resentment, guesswork, and awkward calculations.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* The Old Way */}
              <div className="bg-[#FAF6EF] p-8 rounded-none border border-[#E57373]/30 space-y-4">
                <div className="text-xs font-bold text-[#E57373] uppercase tracking-wider">
                  The Old, Stressful Way
                </div>
                <h3 className="text-xl font-bold text-[#174F4A]">
                  Fragmented apps & awkward math
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-[#6F7F7C]">
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-[#E57373] shrink-0 mt-0.5" />
                    <span>Awkward "Who paid for dinner on Tuesday?" text reminders.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-[#E57373] shrink-0 mt-0.5" />
                    <span>Rigid 50/50 splits that ignore income disparities and breed subtle resentment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-[#E57373] shrink-0 mt-0.5" />
                    <span>Complex accounting spreadsheets that break when you add a single row.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-[#E57373] shrink-0 mt-0.5" />
                    <span>Subscription budgeting apps costing $120+ every single year.</span>
                  </li>
                </ul>
              </div>

              {/* The Togetherly Way */}
              <div className="bg-[#FAF6EF] p-8 rounded-none border border-[#2C7A73]/40 space-y-4 relative shadow-none">
                <div className="text-xs font-bold text-[#2C7A73] uppercase tracking-wider">
                  The Togetherly Way
                </div>
                <h3 className="text-xl font-bold text-[#174F4A]">
                  Calm clarity & mathematical peace
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-[#243B38]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0 mt-0.5" />
                    <span>Set your split ratio once (50/50 or proportional to income).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0 mt-0.5" />
                    <span>Log shared expenses in 5 seconds without manual calculation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0 mt-0.5" />
                    <span>Automated Fair Split banner shows exact reimbursement at month end.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0 mt-0.5" />
                    <span>A joyful 20-minute monthly "Money Date" routine that brings you closer.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing / Purchase Section */}
        <section id="pricing" className="py-20 bg-[#FAF6EF] border-t border-[#174F4A]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#174F4A]/10 text-[#174F4A] text-xs font-bold tracking-wide uppercase">
                <span>Simple, Transparent Pricing</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#174F4A] tracking-tight">
                One simple purchase. Yours for life.
              </h2>
              <p className="text-base text-[#6F7F7C] leading-relaxed">
                No monthly subscriptions, no hidden upsells, and no lock-in. Everything you need to manage your shared finances forever.
              </p>
            </div>

            {/* Pricing Card */}
            <div className="mt-12 max-w-xl mx-auto bg-[#FFFFFF] rounded-none border-2 border-[#174F4A] shadow-none p-8 sm:p-10 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-[#F29B7F] uppercase tracking-wider">
                    Full Digital Access
                  </span>
                  <h3 className="text-2xl font-bold text-[#174F4A] mt-1">
                    Couples Money Planner
                  </h3>
                  <p className="text-xs text-[#6F7F7C] mt-1">
                    2026 Edition • For Google Sheets
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-extrabold text-[#174F4A]">
                    {couplesMoneyPlanner.pricing.formatted}
                  </div>
                  <div className="text-[11px] text-[#6F7F7C] font-medium">
                    One-time payment
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#174F4A]/10 space-y-3">
                <div className="text-xs font-bold text-[#174F4A] uppercase tracking-wider">
                  Everything Included in Your Download:
                </div>
                {couplesMoneyPlanner.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#243B38]">
                    <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-3">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-[#174F4A] text-[#FAF6EF] text-sm sm:text-base font-bold py-4 px-6 rounded-none hover:bg-[#0F3834] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-none"
                >
                  <span>Get Instant Digital Access ({couplesMoneyPlanner.pricing.formatted})</span>
                  <ArrowRight className="w-4 h-4 text-[#F29B7F]" />
                </button>

                <button
                  onClick={handleDemoClick}
                  className="w-full text-xs font-semibold text-[#174F4A] hover:bg-[#174F4A]/5 py-2.5 rounded-none border border-[#174F4A]/20 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Explore Safe View-Only Demo First</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#2C7A73]" />
                </button>
              </div>

              {/* Guarantees & Verification */}
              <div className="pt-2 border-t border-[#174F4A]/10 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#174F4A]">
                  <ShieldCheck className="w-4 h-4 text-[#2C7A73]" />
                  <span>30-Day Happiness Guarantee</span>
                </div>
                <p className="text-[11px] text-[#6F7F7C] leading-normal">
                  If this system does not bring clarity and calm to your shared finances, simply email {couplesMoneyPlanner.supportEmail} within 30 days for a prompt refund.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-[#FFFFFF] border-t border-[#174F4A]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#174F4A]/10 text-[#174F4A] text-xs font-bold tracking-wide uppercase">
                <HelpCircle className="w-4 h-4 text-[#F29B7F]" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-3xl font-bold text-[#174F4A]">
                Common questions about the planner.
              </h2>
            </div>

            <div className="space-y-6">
              {couplesMoneyPlanner.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF6EF] p-6 sm:p-7 rounded-none border border-[#174F4A]/10 space-y-2.5"
                >
                  <h3 className="text-base sm:text-lg font-bold text-[#174F4A]">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6F7F7C] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lemon Squeezy Merchant Verification & Support Bar */}
        <section className="py-12 bg-[#F7F0E4] border-t border-[#174F4A]/10 text-xs text-[#6F7F7C]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <span className="font-bold text-[#174F4A]">Merchant & Store Information:</span>
              <p className="mt-0.5">
                Togetherly digital products are developed by Ayoub Ameur. Payments processed securely via Lemon Squeezy.
              </p>
            </div>
            <div className="shrink-0">
              <a
                href={`mailto:${couplesMoneyPlanner.supportEmail}`}
                className="inline-flex items-center gap-1.5 bg-white px-3 py-2 rounded-none border border-[#174F4A]/20 text-[#174F4A] font-semibold hover:bg-[#FAF6EF] transition-colors"
              >
                <span>Support: {couplesMoneyPlanner.supportEmail}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Modals */}
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />

      {/* Footer */}
      <TogetherlyFooter onNavigate={onNavigate} />
    </div>
  );
}
