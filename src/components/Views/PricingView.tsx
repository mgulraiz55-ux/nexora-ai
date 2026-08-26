import React, { useState } from 'react';
import { PRICING_PLANS } from '../../data/initialData';
import { AppView, PricingPlan } from '../../types';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle, 
  Zap, 
  Building2, 
  X,
  CreditCard
} from 'lucide-react';

interface PricingViewProps {
  onNavigate: (view: AppView) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlanModal, setSelectedPlanModal] = useState<PricingPlan | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlanModal(plan);
    setCheckoutSuccess(false);
  };

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutSuccess(true);
    setTimeout(() => {
      setSelectedPlanModal(null);
      onNavigate('dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f131d] text-[#dfe2f1] py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow ambient */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#4d8eff]/8 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#424754] bg-[#171b26] text-xs font-mono text-[#4cd7f6]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing Models</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#dfe2f1] tracking-tight">
            Predictable plans for high-velocity teams.
          </h1>
          <p className="text-sm sm:text-base text-[#c2c6d6] max-w-xl mx-auto font-sans">
            Choose the plan that's right for your team's workflow, context capacity, and automated execution requirements.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-mono transition-colors ${billingCycle === 'monthly' ? 'text-[#dfe2f1] font-semibold' : 'text-[#8c909f]'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-7 bg-[#1c1f2a] border border-[#424754] rounded-full p-1 transition-colors relative"
              aria-label="Toggle billing cycle"
            >
              <div
                className={`w-5 h-5 bg-[#4d8eff] rounded-full shadow-md transition-transform duration-200 ${
                  billingCycle === 'yearly' ? 'translate-x-7 bg-[#4cd7f6]' : 'translate-x-0'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-mono transition-colors ${billingCycle === 'yearly' ? 'text-[#dfe2f1] font-semibold' : 'text-[#8c909f]'}`}>
                Yearly
              </span>
              <span className="bg-[#4cd7f6]/15 text-[#4cd7f6] border border-[#4cd7f6]/30 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-4">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            const isPro = plan.id === 'pro';

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPro
                    ? 'bg-[#1c1f2a] border-2 border-[#4cd7f6] shadow-[0_0_35px_rgba(76,215,246,0.2)] relative z-20 md:-translate-y-2'
                    : 'bg-[#171b26] border border-[#424754] hover:border-[#8c909f]'
                }`}
              >
                {/* Popular Pill */}
                {isPro && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#4cd7f6] text-[#003640] font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-[#dfe2f1] tracking-tight">{plan.name}</h3>
                    {isPro ? (
                      <Zap className="w-5 h-5 text-[#4cd7f6]" />
                    ) : plan.id === 'enterprise' ? (
                      <Building2 className="w-5 h-5 text-[#adc6ff]" />
                    ) : null}
                  </div>

                  <p className="text-xs text-[#c2c6d6] min-h-[32px] mb-6">{plan.tagline}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[#424754]/50">
                    <span className="text-4xl sm:text-5xl font-bold text-[#dfe2f1] font-mono">
                      ${price}
                    </span>
                    <span className="text-xs text-[#8c909f] font-mono">
                      {plan.monthlyPrice === 0 ? '/ forever' : '/ user / mo'}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-mono uppercase text-[#8c909f] tracking-wider">
                      Included in {plan.name}:
                    </p>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#dfe2f1]">
                        <Check className="w-4 h-4 text-[#4cd7f6] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3 rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                    isPro
                      ? 'bg-[#4d8eff] text-[#00285d] hover:bg-[#adc6ff] shadow-[0_0_20px_rgba(77,142,255,0.35)] font-bold'
                      : 'bg-[#313540] text-[#dfe2f1] hover:bg-[#424754]'
                  }`}
                >
                  <span>{plan.buttonLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Social Proof Logos Bar */}
        <div className="pt-12 border-t border-[#424754]/40 text-center space-y-6">
          <p className="text-xs font-mono uppercase tracking-widest text-[#8c909f]">
            TRUSTED BY INNOVATIVE TEAMS WORLDWIDE
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-75 font-mono text-sm font-bold tracking-wider text-[#c2c6d6]">
            <span className="hover:text-[#4cd7f6] transition-colors">ACME CORP</span>
            <span className="hover:text-[#4cd7f6] transition-colors">GLOBEX</span>
            <span className="hover:text-[#4cd7f6] transition-colors">SOYLENT CORP</span>
            <span className="hover:text-[#4cd7f6] transition-colors">INITECH</span>
            <span className="hover:text-[#4cd7f6] transition-colors">UMBRELLA</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-8 max-w-3xl mx-auto space-y-4">
          <h2 className="text-xl font-bold text-center text-[#dfe2f1] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: 'Can I invite my engineering & product team?',
                a: 'Yes! Pro and Enterprise tiers include collaborative workspace seats with real-time sync, shared context stores, and role-based permissions.'
              },
              {
                q: 'How does context document parsing work?',
                a: 'NEXORA indexes CSVs, PDFs, and code repositories using hybrid semantic search and vector embeddings without sending raw secrets to public models.'
              },
              {
                q: 'Can I cancel or switch billing anytime?',
                a: 'Absolutely. You can downgrade, cancel, or switch between monthly and annual plans at any time with prorated adjustments.'
              }
            ].map((faq, i) => (
              <div key={i} className="p-4 bg-[#1c1f2a] border border-[#424754]/60 rounded-xl space-y-1.5">
                <h3 className="text-sm font-semibold text-[#dfe2f1]">{faq.q}</h3>
                <p className="text-xs text-[#c2c6d6] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checkout / Upgrade Modal */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 bg-[#0f131d]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1c1f2a] border border-[#424754] rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#4cd7f6]" />
                <h3 className="text-lg font-bold text-[#dfe2f1]">
                  Upgrade to {selectedPlanModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="text-[#8c909f] hover:text-[#dfe2f1]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {checkoutSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#4cd7f6]/20 text-[#4cd7f6] flex items-center justify-center mx-auto border border-[#4cd7f6]">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#dfe2f1]">Subscription Activated!</h4>
                <p className="text-xs text-[#c2c6d6]">
                  Redirecting you back to your workspace...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSimulateCheckout} className="space-y-4">
                <div className="bg-[#0a0e18] p-3.5 rounded-xl border border-[#424754]/50 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-semibold text-[#dfe2f1]">{selectedPlanModal.name} Tier ({billingCycle})</p>
                    <p className="text-[11px] text-[#8c909f]">Billed {billingCycle === 'yearly' ? 'annually' : 'monthly'}</p>
                  </div>
                  <span className="text-xl font-bold font-mono text-[#4cd7f6]">
                    ${billingCycle === 'yearly' ? selectedPlanModal.yearlyPrice : selectedPlanModal.monthlyPrice}/mo
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#8c909f] block">Card Information</label>
                  <input
                    type="text"
                    required
                    placeholder="4242 •••• •••• 4242"
                    defaultValue="4242 8840 9120 4492"
                    className="w-full bg-[#0a0e18] border border-[#424754] rounded-lg p-2.5 text-xs text-[#dfe2f1] font-mono focus:outline-none focus:border-[#4cd7f6]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      defaultValue="12/28"
                      className="bg-[#0a0e18] border border-[#424754] rounded-lg p-2.5 text-xs text-[#dfe2f1] font-mono focus:outline-none focus:border-[#4cd7f6]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="CVC"
                      defaultValue="894"
                      className="bg-[#0a0e18] border border-[#424754] rounded-lg p-2.5 text-xs text-[#dfe2f1] font-mono focus:outline-none focus:border-[#4cd7f6]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#4d8eff] hover:bg-[#adc6ff] text-[#00285d] font-mono text-xs font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(77,142,255,0.3)]"
                >
                  Confirm & Start Workspace
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
