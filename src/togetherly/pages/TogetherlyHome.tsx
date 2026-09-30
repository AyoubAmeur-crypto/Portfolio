import { useState, useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web/build/player/lottie_light.js';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Check,
  Layers,
  Compass,
  FileSpreadsheet,
  Lightbulb,
  AlertTriangle,
  X,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import TogetherlyNav from '../components/TogetherlyNav';
import TogetherlyFooter from '../components/TogetherlyFooter';
import DemoModal from '../components/DemoModal';
import CheckoutModal from '../components/CheckoutModal';
import { couplesMoneyPlanner, togetherlyBrand, TOGETHERLY_GOOGLE_SHEET_COPY_URL } from '../config/productConfig';

interface TogetherlyHomeProps {
  onNavigate: (path: string) => void;
}

/**
 * Single Hero Lottie Animation Player for "Manage Money.json"
 * Strictly renders ONE SVG, guarded against React StrictMode double-mounts.
 */
function HeroLottie() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animInstance = useRef<AnimationItem | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Destroy existing instance if any
    if (animInstance.current) {
      animInstance.current.destroy();
      animInstance.current = null;
    }
    container.innerHTML = '';

    fetch('/togetherly/manage-money.json')
      .then((res) => res.json())
      .then((animationData) => {
        if (!containerRef.current) return;
        // Guard: if an SVG already exists inside the container, do not append another!
        if (containerRef.current.querySelector('svg')) return;

        animInstance.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData,
        });
      })
      .catch((err) => {
        console.error('Failed to load Manage Money Lottie animation:', err);
      });

    return () => {
      if (animInstance.current) {
        animInstance.current.destroy();
        animInstance.current = null;
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-[480px] lg:max-w-[520px] mx-auto flex items-center justify-center select-none [&_svg:not(:first-child)]:hidden">
      {/* Soft ambient background glow matching brand palette */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#2C7A73]/15 via-[#FAF6EF] to-[#F29B7F]/15 rounded-none blur-3xl pointer-events-none -z-10" />

      {/* Lottie Animation Canvas - CSS strictly hides any duplicate sibling SVGs */}
      <div
        ref={containerRef}
        className="w-full h-auto aspect-square max-h-[460px] flex items-center justify-center relative z-10 pointer-events-none [&_svg:not(:first-child)]:hidden"
      />
    </div>
  );
}

export default function TogetherlyHome({ onNavigate }: TogetherlyHomeProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Simulator State
  const [partnerAIncome, setPartnerAIncome] = useState(4800);
  const [partnerBIncome, setPartnerBIncome] = useState(3200);
  const [sharedExpenses, setSharedExpenses] = useState(3200);
  const [splitMethod, setSplitMethod] = useState<'proportional' | 'fiftyFifty'>('proportional');

  const totalIncome = Math.max(1, partnerAIncome + partnerBIncome);
  const ratioA = partnerAIncome / totalIncome;
  const ratioB = partnerBIncome / totalIncome;

  const shareA =
    splitMethod === 'proportional'
      ? Math.round(sharedExpenses * ratioA)
      : Math.round(sharedExpenses / 2);
  const shareB = sharedExpenses - shareA;

  const discretionaryA = partnerAIncome - shareA;
  const discretionaryB = partnerBIncome - shareB;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF6EF] text-[#243B38] font-sans antialiased selection:bg-[#F29B7F]/30 selection:text-[#174F4A]">
      <SEOHead
        title="Togetherly — Money Made Simpler, Life More Together"
        description="Togetherly creates calm, beautifully structured financial planning systems and Google Sheets templates designed for modern couples. Track shared expenses, fair splits, and life milestones together."
        canonicalPath="/togetherly"
        ogImage="/togetherly/togetherly.png"
      />

      {/* Navigation */}
      <TogetherlyNav
        currentPath="/togetherly"
        onNavigate={onNavigate}
        onOpenDemo={() => setDemoOpen(true)}
        onOpenCheckout={() => setCheckoutOpen(true)}
      />

      <main>
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (CodeSignal Style with Single Manage Money Lottie)        */}
        {/* ========================================================================= */}
        <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
          {/* Subtle ambient background glow */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-[#2C7A73]/10 to-transparent rounded-none blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: High-Impact Typography & Clear Value (Mobile: order-2 under SVG) */}
              <div className="lg:col-span-6 order-2 lg:order-1 space-y-6 text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#174F4A] tracking-tight leading-[1.1]">
                  Money made simpler, <br />
                  <span className="text-[#2C7A73]">life more together.</span>
                </h1>

                <p className="text-base sm:text-lg text-[#6F7F7C] leading-relaxed max-w-xl">
                  Togetherly replaces messy split apps and awkward spreadsheets with a unified financial planning system. Plan shared essentials, automate income-weighted fair splits, and build your future in total harmony.
                </p>

                {/* Key Capabilities Bullets */}
                <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-medium text-[#243B38]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0" />
                    <span>Built natively for Google Sheets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0" />
                    <span>Zero bank linking & zero subscriptions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0" />
                    <span>Proportional fair-split cost engine</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2C7A73] shrink-0" />
                    <span>Instant real-time couple collaboration</span>
                  </div>
                </div>

                {/* Clean Solid Buttons (Squared corners) */}
                <div className="pt-2 space-y-3.5">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                    <a
                      href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-sm font-semibold px-7 py-3.5 rounded-none transition-colors cursor-pointer"
                    >
                      <span>Get Couples Money Planner</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>

                    <a
                      href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#FAF6EF] text-[#174F4A] text-sm font-semibold px-7 py-3.5 rounded-none border border-[#174F4A]/20 transition-colors cursor-pointer"
                    >
                      <span>Live Sheet Preview</span>
                      <ExternalLink className="w-4 h-4 ml-1 text-[#2C7A73]" />
                    </a>
                  </div>

                  {/* Micro reassurance notes */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#6F7F7C] pt-0.5">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#2C7A73]" />
                      <span>Instant Google Sheets copy</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#2C7A73]" />
                      <span>One-time purchase • Yours forever</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#2C7A73]" />
                      <span>30-day money-back guarantee</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: ONLY ONE SINGLE SVG (Manage Money Lottie) (Mobile: order-1 first) */}
              <div className="lg:col-span-6 order-1 lg:order-2 flex items-center justify-center py-4 lg:py-0">
                <HeroLottie />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. EXPLORE SYNCHRONIZED CAPABILITIES (SCREEN ONLY OF DASHBOARD)           */}
        {/* ========================================================================= */}
        <section className="py-20 bg-[#FAF6EF] border-t border-[#174F4A]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#174F4A] tracking-tight">
                Explore the synchronized capabilities.
              </h2>
              <p className="text-base sm:text-lg text-[#6F7F7C] leading-relaxed">
                A calm, unified Google Sheets system where every sheet connects seamlessly into the next. Total household cash flow, fair splits, and life milestones in one clear view.
              </p>
            </div>

            {/* Dashboard Showcase Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-5xl mx-auto border-b border-[#174F4A]/10 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#174F4A]">
                  Home Dashboard • Your Complete Financial Pulse
                </h3>
                <p className="text-xs sm:text-sm text-[#6F7F7C] mt-1 max-w-2xl">
                  Summarizes household income, actual spend, monthly savings, and your fair-split settlement balance in real time.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-none bg-[#174F4A] text-xs font-semibold text-[#FAF6EF] hover:bg-[#0F3834] transition-colors cursor-pointer"
                >
                  <span>Live Google Sheet Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* UNBOXED DASHBOARD SCREENSHOT: Symmetrical width container, NO SHADOW, NO HOVER EFFECT, NO EXPLORE FULL SIZE */}
            <div className="max-w-5xl mx-auto relative flex items-center justify-center">
              <img
                src="/togetherly/dashboard.png?v=2"
                alt="Togetherly Google Sheets Whole Dashboard"
                className="w-full h-auto max-h-[620px] object-contain select-none rounded-none"
              />
            </div>

            {/* Synchronized Core Capabilities Breakdown Grid */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-[#174F4A]">Automated Fair Split</h4>
                <p className="text-xs text-[#6F7F7C] leading-relaxed">
                  Calculates exact reimbursements proportional to income. Eliminates awkward math and end-of-month financial tension.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-[#174F4A]">9 Core Expense Categories</h4>
                <p className="text-xs text-[#6F7F7C] leading-relaxed">
                  Real-time variance tracking for housing, groceries, utilities, travel, and shared dining without formula editing.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-[#174F4A]">Shared Milestones Tracker</h4>
                <p className="text-xs text-[#6F7F7C] leading-relaxed">
                  Visual progress sparklines and target date calculators for your first home down payment, emergency fund, and vacations.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-[#174F4A]">Monthly Money Date Routine</h4>
                <p className="text-xs text-[#6F7F7C] leading-relaxed">
                  Guided 20-minute monthly alignment prompts with wine or coffee that transform budgeting from a chore into a date night.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. EDITORIAL STORYTELLING: THE 2 RITUALS (INTEGRATED FLAT SCREENS)         */}
        {/* ========================================================================= */}
        <section className="py-24 bg-[#FAF6EF] border-t border-[#174F4A]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#174F4A] tracking-tight leading-[1.15]">
                How to customize your budget together.
              </h2>
              <p className="text-base sm:text-lg text-[#6F7F7C] leading-relaxed">
                We aren’t selling empty cells or cold spreadsheets. We are selling the feeling of sitting on the couch together with coffee or wine, completely aligned on life. Here is how you make Togetherly uniquely yours.
              </p>
            </div>

            {/* Editorial Rituals: Alternating Content & Seamless Flat Screens (Screens hidden on mobile) */}
            <div className="max-w-6xl mx-auto space-y-14 sm:space-y-20 lg:space-y-28">
              {/* Ritual 1: Content Left, Picture Right (Mobile: Just typo, reduced width) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className="lg:col-span-5 space-y-5 max-w-sm sm:max-w-md mx-auto lg:max-w-none lg:mx-0">
                  <div className="w-12 h-12 rounded-none bg-[#174F4A] text-[#FAF6EF] flex items-center justify-center shrink-0">
                    <Layers className="w-6 h-6 text-[#F29B7F]" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2C7A73]">
                      Ritual 01 • The 3-Pot System
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#174F4A] tracking-tight leading-tight">
                      The 3-Pot Philosophy: Yours, Mine, Ours.
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed">
                    Financial intimacy doesn't mean giving up individual freedom. The healthiest couples keep three clear buckets: Joint Life Essentials, Joint Long-Term Dreams, and 100% guilt-free Personal Fun Money.
                  </p>
                  <div className="border-l-2 border-[#2C7A73] pl-4 py-1 text-xs sm:text-sm text-[#243B38]">
                    Spend your personal allowance on hobbies or spontaneous coffee without needing to check in or justify a single transaction.
                  </div>
                </div>
                {/* Screen hidden on mobile: only visible on lg+ */}
                <div className="hidden lg:flex lg:col-span-7 items-center justify-center">
                  <img
                    src="/togetherly/monthly-plan.png?v=4"
                    alt="Togetherly Monthly Plan Sheet"
                    className="w-full h-auto object-contain select-none pointer-events-none rounded-none"
                  />
                </div>
              </div>

              {/* Ritual 2: Picture Left, Content Right (Mobile: Just typo, reduced width) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Screen hidden on mobile: only visible on lg+ */}
                <div className="hidden lg:flex lg:col-span-7 lg:order-1 items-center justify-center">
                  <img
                    src="/togetherly/goals.png?v=4"
                    alt="Togetherly Shared Goals Sheet"
                    className="w-full h-auto object-contain select-none pointer-events-none rounded-none"
                  />
                </div>
                <div className="lg:col-span-5 lg:order-2 space-y-5 max-w-sm sm:max-w-md mx-auto lg:max-w-none lg:mx-0">
                  <div className="w-12 h-12 rounded-none bg-[#174F4A] text-[#FAF6EF] flex items-center justify-center shrink-0">
                    <Compass className="w-6 h-6 text-[#91B7A0]" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2C7A73]">
                      Ritual 02 • Shared Milestones
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#174F4A] tracking-tight leading-tight">
                      Turn abstract numbers into milestones you cheer for.
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed">
                    Budgeting fails when it feels like a punishment. Togetherly makes it exciting by putting your shared dreams front and center with synchronized visual progress trackers that show your exact estimated arrival date.
                  </p>
                  <div className="border-l-2 border-[#2C7A73] pl-4 py-1 text-xs sm:text-sm text-[#243B38]">
                    Rename the 5 goal trackers to your exact dreams: first home down payment, trips, and shared peace of mind.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. INTERACTIVE SIMULATOR (CodeSignal Sensation)                           */}
        {/* ========================================================================= */}
        <section className="py-20 bg-[#FAF6EF] border-t border-[#174F4A]/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#174F4A] tracking-tight">
                See how proportional fairness feels in real life.
              </h2>
              <p className="text-sm sm:text-base text-[#6F7F7C] max-w-2xl mx-auto">
                Test your own numbers below. Compare how a rigid 50/50 split compares to Togetherly’s income-weighted fair split.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-none border border-[#174F4A]/10 shadow-none space-y-8">
              {/* Sliders Input Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#174F4A] block">
                    Partner A Net Income
                  </label>
                  <div className="flex items-center gap-2 bg-[#FAF6EF] px-3.5 py-2.5 rounded-none border border-[#174F4A]/15 font-mono text-sm font-bold text-[#174F4A]">
                    <span>$</span>
                    <input
                      type="number"
                      value={partnerAIncome}
                      onChange={(e) => setPartnerAIncome(Number(e.target.value) || 0)}
                      className="bg-transparent w-full focus:outline-none"
                      step={100}
                    />
                  </div>
                  <input
                    type="range"
                    min={1500}
                    max={12000}
                    step={100}
                    value={partnerAIncome}
                    onChange={(e) => setPartnerAIncome(Number(e.target.value))}
                    className="w-full accent-[#174F4A] cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#174F4A] block">
                    Partner B Net Income
                  </label>
                  <div className="flex items-center gap-2 bg-[#FAF6EF] px-3.5 py-2.5 rounded-none border border-[#174F4A]/15 font-mono text-sm font-bold text-[#174F4A]">
                    <span>$</span>
                    <input
                      type="number"
                      value={partnerBIncome}
                      onChange={(e) => setPartnerBIncome(Number(e.target.value) || 0)}
                      className="bg-transparent w-full focus:outline-none"
                      step={100}
                    />
                  </div>
                  <input
                    type="range"
                    min={1500}
                    max={12000}
                    step={100}
                    value={partnerBIncome}
                    onChange={(e) => setPartnerBIncome(Number(e.target.value))}
                    className="w-full accent-[#174F4A] cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#174F4A] block">
                    Shared Monthly Expenses
                  </label>
                  <div className="flex items-center gap-2 bg-[#FAF6EF] px-3.5 py-2.5 rounded-none border border-[#174F4A]/15 font-mono text-sm font-bold text-[#174F4A]">
                    <span>$</span>
                    <input
                      type="number"
                      value={sharedExpenses}
                      onChange={(e) => setSharedExpenses(Number(e.target.value) || 0)}
                      className="bg-transparent w-full focus:outline-none"
                      step={100}
                    />
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={8000}
                    step={100}
                    value={sharedExpenses}
                    onChange={(e) => setSharedExpenses(Number(e.target.value))}
                    className="w-full accent-[#174F4A] cursor-pointer"
                  />
                </div>
              </div>

              {/* Split Mode Switcher (Clean Solid Buttons, squared corners) */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setSplitMethod('proportional')}
                  className={`px-5 py-2.5 rounded-none text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                    splitMethod === 'proportional'
                      ? 'bg-[#174F4A] text-[#FAF6EF]'
                      : 'bg-[#FAF6EF] text-[#6F7F7C] hover:text-[#174F4A]'
                  }`}
                >
                  Proportional to Income (Fair Split)
                </button>
                <button
                  onClick={() => setSplitMethod('fiftyFifty')}
                  className={`px-5 py-2.5 rounded-none text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                    splitMethod === 'fiftyFifty'
                      ? 'bg-[#174F4A] text-[#FAF6EF]'
                      : 'bg-[#FAF6EF] text-[#6F7F7C] hover:text-[#174F4A]'
                  }`}
                >
                  50 / 50 Equal Split
                </button>
              </div>

              {/* Live Calculation Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="bg-[#FAF6EF] p-6 rounded-none border border-[#174F4A]/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6F7F7C]">
                      Partner A Contribution
                    </span>
                    <span className="text-xs font-mono font-bold text-[#2C7A73]">
                      {splitMethod === 'proportional' ? `${Math.round(ratioA * 100)}%` : '50%'}
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-[#174F4A]">
                    ${shareA.toLocaleString()}
                    <span className="text-xs text-[#6F7F7C] font-normal ml-1">/ month</span>
                  </div>
                  <p className="text-xs text-[#6F7F7C] border-t border-[#174F4A]/10 pt-2">
                    Remaining personal discretionary: <strong className="text-[#174F4A] font-bold">${discretionaryA.toLocaleString()}</strong>
                  </p>
                </div>

                <div className="bg-[#FAF6EF] p-6 rounded-none border border-[#174F4A]/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6F7F7C]">
                      Partner B Contribution
                    </span>
                    <span className="text-xs font-mono font-bold text-[#2C7A73]">
                      {splitMethod === 'proportional' ? `${Math.round(ratioB * 100)}%` : '50%'}
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-[#174F4A]">
                    ${shareB.toLocaleString()}
                    <span className="text-xs text-[#6F7F7C] font-normal ml-1">/ month</span>
                  </div>
                  <p className="text-xs text-[#6F7F7C] border-t border-[#174F4A]/10 pt-2">
                    Remaining personal discretionary: <strong className="text-[#174F4A] font-bold">${discretionaryB.toLocaleString()}</strong>
                  </p>
                </div>
              </div>

              {/* Emotional Takeaway */}
              <div className="bg-[#174F4A]/5 p-4 rounded-none text-center text-xs text-[#174F4A] flex items-center justify-center">
                {splitMethod === 'proportional' ? (
                  <span className="flex items-center gap-1.5 flex-wrap justify-center">
                    <Lightbulb className="w-4 h-4 text-[#F29B7F] shrink-0 inline-block" />
                    <strong>Harmony achieved:</strong> Each partner contributes the exact same percentage of their income toward shared life. Neither partner feels taken advantage of or financially starved.
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 flex-wrap justify-center">
                    <AlertTriangle className="w-4 h-4 text-[#E57373] shrink-0 inline-block" />
                    <strong>Notice the strain:</strong> With a 50/50 split when incomes differ, the lower earner pays a far larger share of their paycheck, leading to quiet financial anxiety and friction.
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SCOREKEEPING VS. PARTNERSHIP COMPARISON                                */}
        {/* ========================================================================= */}
        <section className="py-20 bg-[#FFFFFF]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#174F4A] tracking-tight">
                The shift from scorekeeping to partnership.
              </h2>
              <p className="text-sm sm:text-base text-[#6F7F7C] max-w-2xl mx-auto">
                Togetherly isn't just about managing money — it's about changing how you and your partner feel about your future.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Old Way */}
              <div className="bg-[#FAF6EF]/60 p-8 rounded-none border border-[#174F4A]/10 space-y-5">
                <h3 className="text-lg font-bold text-red-800">The Scorekeeping Trap</h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-[#6F7F7C]">
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-red-500 font-bold shrink-0 mt-0.5" />
                    <span>47 unrequested Venmo splits at the end of every single month</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-red-500 font-bold shrink-0 mt-0.5" />
                    <span>Guilt whenever you buy something personal for your own hobby</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-red-500 font-bold shrink-0 mt-0.5" />
                    <span>Tense, late-night arguments triggered by unexpected bills</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-red-500 font-bold shrink-0 mt-0.5" />
                    <span>Feeling like two roommates splitting a tab rather than a unified team</span>
                  </li>
                </ul>
              </div>

              {/* Togetherly Way */}
              <div className="bg-[#174F4A] text-[#FAF6EF] p-8 rounded-none space-y-5">
                <h3 className="text-lg font-bold text-[#FAF6EF]">The Togetherly Experience</h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-[#FAF6EF]/90">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#F29B7F] shrink-0 mt-0.5" />
                    <span>A single calm, shared dashboard in your private Google Drive</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#F29B7F] shrink-0 mt-0.5" />
                    <span>100% guilt-free personal fun money with zero permissions needed</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#F29B7F] shrink-0 mt-0.5" />
                    <span>A scheduled 20-minute monthly wine date you genuinely look forward to</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#F29B7F] shrink-0 mt-0.5" />
                    <span>Clear visual milestones for your first home, trips, and shared future</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. HEARTFELT COUPLE MESSAGE (WITH FIGMA COUPLE ILLUSTRATION)             */}
        {/* ========================================================================= */}
        <section className="py-24 bg-[#FAF6EF] border-t border-[#174F4A]/10 overflow-hidden relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            {/* The Couple Illustration (from Figma MCP server) */}
            <div className="max-w-xl mx-auto">
              <img
                src="/togetherly/couple-illustration.svg"
                alt="Togetherly Couple Falling in Love Illustration"
                className="w-full h-auto max-h-[360px] sm:max-h-[420px] object-contain mx-auto select-none pointer-events-none"
              />
            </div>

            <div className="max-w-2xl mx-auto space-y-5">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#174F4A] tracking-tight leading-[1.2]">
                Less time stressing about bills. <br />
                <span className="text-[#2C7A73]">More time falling in love.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#6F7F7C] leading-relaxed">
                You didn’t choose each other to spend your Sunday evenings arguing over grocery receipts or feeling guilty about a morning coffee. You teamed up to build a shared life: unhurried conversations, road trips with good playlists, and big dreams you both cheer for.
              </p>

              <p className="text-sm sm:text-base text-[#243B38] font-medium leading-relaxed italic">
                Togetherly takes the awkward math and anxiety out of the equation — leaving you with calm, complete clarity, and a system you’ll actually enjoy using together.
              </p>

              {/* CTAs Under the cute message (Squared corners) */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <a
                  href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-sm font-semibold px-8 py-4 rounded-none transition-colors cursor-pointer"
                >
                  <span>Get Couples Money Planner</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>

                <a
                  href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#FAF6EF] text-[#174F4A] text-sm font-semibold px-7 py-4 rounded-none border border-[#174F4A]/20 transition-colors cursor-pointer"
                >
                  <span>Explore View-Only Demo</span>
                  <ExternalLink className="w-4 h-4 ml-1 text-[#2C7A73]" />
                </a>
              </div>

              <p className="text-xs text-[#6F7F7C] pt-2">
                Instant Google Sheets template • No subscriptions • Yours forever
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. FULL-WIDTH GREEN BANNER: TOGETHERLY — COUPLES MONEY PLANNER            */}
        {/* ========================================================================= */}
        <section className="relative py-24 sm:py-28 bg-[#174F4A] text-[#FAF6EF] w-full border-t border-[#2C7A73]/30 overflow-hidden">
          {/* Indian Wedding App Pattern Background - Covers the whole div without scaling/pixelation */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none select-none mix-blend-overlay opacity-80"
            style={{
              backgroundImage: 'url(/togetherly/indian-wedding-pattern.png)',
              backgroundRepeat: 'repeat',
              backgroundSize: '300px 225px',
            }}
          />
          {/* Subtle gradient vignette to ensure pristine contrast and maximum text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#174F4A]/50 via-[#174F4A]/20 to-[#174F4A]/60 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            {/* Togetherly Logo on Top */}
            <div className="flex justify-center">
              <img
                src={togetherlyBrand.assets.logoLight}
                alt="Togetherly"
                className="h-12 sm:h-16 w-auto object-contain drop-shadow-sm"
              />
            </div>

            {/* Under it phrase */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6EF] tracking-tight leading-tight drop-shadow-sm">
                Togetherly — Couples Money Planner
              </h2>
              <p className="text-base sm:text-lg text-[#FAF6EF]/90 leading-relaxed font-normal">
                Money made simpler, life more together. The complete 8-sheet Google Sheets system to plan shared living, automate fair splits, and build your future in total harmony.
              </p>
            </div>

            {/* CTA Buttons (Squared corners) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF6EF] hover:bg-white text-[#174F4A] text-sm sm:text-base font-bold px-8 py-4 rounded-none transition-colors cursor-pointer shadow-md"
              >
                <span>Get Couples Money Planner</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#174F4A]/70 hover:bg-[#174F4A] text-[#FAF6EF] text-sm sm:text-base font-semibold px-7 py-4 rounded-none border border-[#FAF6EF]/40 backdrop-blur-sm transition-colors cursor-pointer"
              >
                <span>Explore Live Demo</span>
                <ExternalLink className="w-4 h-4 ml-1 text-[#F29B7F]" />
              </a>
            </div>

            <p className="text-xs text-[#FAF6EF]/75 pt-2">
              Instant Google Sheets template • 30-day money-back guarantee • No subscriptions
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. PRODUCT ROADMAP / EXPANSION CATALOG                                   */}
        {/* ========================================================================= */}
        <section className="py-20 bg-[#FFFFFF] border-b border-[#174F4A]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#174F4A] tracking-tight">
                Building a complete ecosystem for couples' financial stages.
              </h2>
              <p className="text-base text-[#6F7F7C] leading-relaxed">
                Togetherly is not just a single spreadsheet. We are building specialized financial planning systems to accompany couples throughout every key relationship milestone.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {togetherlyBrand.upcomingProducts.map((prod, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF6EF] p-6 rounded-none border border-[#174F4A]/10 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <FileSpreadsheet className="w-6 h-6 text-[#2C7A73]" />
                      <span className="text-[10px] font-bold text-[#174F4A] uppercase">
                        {prod.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#174F4A]">{prod.title}</h3>
                    <p className="text-xs text-[#6F7F7C] leading-relaxed">{prod.description}</p>
                  </div>
                  <div className="pt-2 text-[11px] font-semibold text-[#2C7A73]">
                    Coming in future release
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. PRODUCT ORDER & MOCKUP SHOWCASE (BUY NOW CTA)                          */}
        {/* ========================================================================= */}
        <section id="buy" className="py-20 lg:py-28 bg-[#FAF6EF] border-t border-[#174F4A]/10 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
              {/* Tablet Mockup Image (Mobile: FIRST order-1 / Desktop: RIGHT order-2) */}
              <div className="w-full lg:w-[52%] order-1 lg:order-2 flex items-center justify-center lg:justify-end">
                <img
                  src="/togetherly/tablet.png"
                  alt="Togetherly Couples Money Planner on Tablet"
                  className="w-full max-w-lg lg:max-w-none lg:w-[109%] xl:w-[109%] h-auto object-contain select-none pointer-events-none drop-shadow-2xl"
                />
              </div>

              {/* Content on the Left (Mobile: UNDER TABLET order-2 / Desktop: LEFT order-1) */}
              <div className="w-full lg:w-[48%] order-2 lg:order-1 space-y-5 text-left shrink-0">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#2C7A73] bg-[#2C7A73]/10 px-3.5 py-1.5 rounded-none">
                  Instant Digital Delivery
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#174F4A] tracking-tight leading-[1.18]">
                  Get Couples Money Planner
                </h2>

                <p className="text-sm sm:text-base text-[#6F7F7C] leading-relaxed max-w-xl">
                  Start budgeting together today. Complete 8-sheet synchronized Google Sheets system with automated fair-split math, monthly money date routines, and lifetime personal access.
                </p>

                {/* Price & Action Group (100% flexed and perfectly aligned) */}
                <div className="space-y-4 pt-1">
                  {/* Price Row */}
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#174F4A] tracking-tight leading-none">
                      $19
                    </span>
                    <div className="h-6 w-px bg-[#174F4A]/20" />
                    <div className="text-xs sm:text-sm text-[#6F7F7C] leading-snug">
                      <span className="font-semibold text-[#174F4A]">One-time payment</span>
                      <span className="mx-1.5">•</span>
                      <span className="text-[#2C7A73] font-medium">Lifetime personal license</span>
                    </div>
                  </div>

                  {/* Buy and Demo Links - Mobile friendly stack */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#174F4A] hover:bg-[#0F3834] text-[#FAF6EF] text-sm font-bold px-6 py-3.5 rounded-none transition-colors cursor-pointer shadow-sm whitespace-nowrap"
                    >
                      <span>Buy & Copy Planner ($19)</span>
                      <ArrowRight className="w-4 h-4 ml-0.5" />
                    </a>

                    <a
                      href={TOGETHERLY_GOOGLE_SHEET_COPY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF6EF] text-[#174F4A] text-sm font-semibold px-5 py-3.5 rounded-none border border-[#174F4A]/20 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>Preview Demo</span>
                      <ExternalLink className="w-4 h-4 ml-0.5 text-[#2C7A73]" />
                    </a>
                  </div>
                </div>

                {/* Trust Points */}
                <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#6F7F7C]">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#2C7A73] shrink-0" />
                    <span>Instant Google Sheet Copy</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#2C7A73] shrink-0" />
                    <span>No Bank Passwords</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#2C7A73] shrink-0" />
                    <span>30-Day Guarantee</span>
                  </div>
                </div>
              </div>
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
