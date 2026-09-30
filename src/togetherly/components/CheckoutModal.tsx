import React, { useState, FormEvent } from 'react';
import { X, ShieldCheck, Mail, CheckCircle2, ShoppingBag, ExternalLink } from 'lucide-react';
import { couplesMoneyPlanner } from '../config/productConfig';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [emailInput, setEmailInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const hasLiveCheckout = Boolean(
    couplesMoneyPlanner.lemonSqueezyCheckoutUrl &&
      couplesMoneyPlanner.lemonSqueezyCheckoutUrl.startsWith('http')
  );

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#174F4A]/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF6EF] w-full max-w-lg rounded-none shadow-2xl border border-[#174F4A]/15 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#174F4A] text-[#FAF6EF] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#F29B7F]" />
            <h3 className="font-bold text-base">Get Couples Money Planner</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-none bg-white/10 hover:bg-white/20 text-[#FAF6EF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {hasLiveCheckout ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-none bg-[#174F4A]/10 text-[#174F4A] mx-auto flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-[#2C7A73]" />
              </div>
              <h4 className="text-xl font-bold text-[#174F4A]">
                Ready to Order via Lemon Squeezy
              </h4>
              <p className="text-sm text-[#6F7F7C]">
                Click below to complete your secure checkout on Lemon Squeezy and receive instant digital access to the Google Sheet.
              </p>
              <a
                href={couplesMoneyPlanner.lemonSqueezyCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#174F4A] text-[#FAF6EF] py-3.5 px-6 rounded-none font-bold hover:bg-[#0F3834] transition-colors"
              >
                <span>Proceed to Lemon Squeezy Checkout ({couplesMoneyPlanner.pricing.formatted})</span>
                <ExternalLink className="w-4 h-4 text-[#F29B7F]" />
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#174F4A]/5 p-4 rounded-none border border-[#174F4A]/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#174F4A] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#2C7A73]" />
                  <span>Lemon Squeezy Store Verification Status</span>
                </div>
                <p className="text-xs sm:text-sm text-[#243B38] leading-relaxed">
                  We are currently finalizing our merchant verification with Lemon Squeezy. Official live checkout will activate immediately upon final store approval.
                </p>
              </div>

              {/* Order summary box */}
              <div className="bg-white p-4 rounded-none border border-[#174F4A]/10 space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-[#174F4A]">
                  <span>Couples Money Planner (2026 Edition)</span>
                  <span className="text-[#2C7A73]">{couplesMoneyPlanner.pricing.formatted}</span>
                </div>
                <p className="text-xs text-[#6F7F7C]">
                  One-time payment • Lifetime personal license • 8 synchronized sheets • Free updates
                </p>
              </div>

              {/* Early Access Notification */}
              {submitted ? (
                <div className="bg-[#2C7A73]/10 border border-[#2C7A73]/20 p-4 rounded-none text-center space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-[#2C7A73] mx-auto" />
                  <p className="text-sm font-bold text-[#174F4A]">You're on the early priority list!</p>
                  <p className="text-xs text-[#6F7F7C]">
                    We'll email you the moment the Lemon Squeezy checkout link goes live.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNotifySubmit} className="space-y-2">
                  <label htmlFor="notify-email" className="block text-xs font-semibold text-[#174F4A]">
                    Want early access or a launch notification?
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="notify-email"
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="flex-1 bg-white border border-[#174F4A]/20 rounded-none px-3 py-2 text-xs sm:text-sm text-[#243B38] focus:outline-none focus:border-[#174F4A]"
                    />
                    <button
                      type="submit"
                      className="bg-[#174F4A] text-[#FAF6EF] text-xs font-bold px-4 py-2 rounded-none hover:bg-[#0F3834] transition-colors cursor-pointer shrink-0"
                    >
                      Notify Me
                    </button>
                  </div>
                </form>
              )}

              {/* Direct email support */}
              <div className="pt-2 text-center text-xs text-[#6F7F7C]">
                Questions or direct invoice inquiries? Email creator directly:{' '}
                <a
                  href={`mailto:${couplesMoneyPlanner.supportEmail}`}
                  className="text-[#174F4A] font-semibold underline underline-offset-2"
                >
                  {couplesMoneyPlanner.supportEmail}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
