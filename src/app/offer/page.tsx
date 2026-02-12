"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuizStore } from "@/hooks/useQuizState";
import { getFunnelSubmission } from "@/lib/supabase";
import { getFallbackAnalysis } from "@/lib/utils/fallback-analysis";
import { 
  Check, Shield, Clock, Sparkles, ChefHat, ListChecks, 
  Users, Zap, Star, ArrowRight, Dumbbell, Apple, Lock 
} from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  billing: string;
  popular?: boolean;
  savings?: string;
  tagline: string;
}

const plans: PricingPlan[] = [
  {
    id: "monthly",
    name: "Monthly",
    tagline: "Flexibility first",
    price: 19.99,
    period: "/mo",
    billing: "Billed monthly, cancel anytime",
  },
  {
    id: "yearly",
    name: "Annual",
    tagline: "Total transformation",
    price: 9.99,
    originalPrice: 19.99,
    period: "/mo",
    billing: "$119.88 billed yearly",
    popular: true,
    savings: "Save 50%",
  },
  {
    id: "lifetime",
    name: "Lifetime",
    tagline: "Forever access",
    price: 199,
    period: "",
    billing: "One-time payment",
    savings: "Best Value",
  },
];

export default function OfferPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("yearly");
  const [isLoading, setIsLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(true);
  const { sessionId, getUserProfile, gender } = useQuizStore();

  const features = gender === "male" ? [
    { icon: Dumbbell, text: "Personalized workout & nutrition plans", bold: "Tailored to your frame" },
    { icon: ChefHat, text: "Muscle-building meal recipes", bold: "High-protein" },
    { icon: ListChecks, text: "Weekly meal prep & shopping lists", bold: "Save 4+ hours/week" },
    { icon: Sparkles, text: "AI-powered macro optimization", bold: "Smart adjustments" },
    { icon: Clock, text: "Progress tracking & adjustments", bold: "Data-driven" },
    { icon: Users, text: "Community support access", bold: "Private group" },
  ] : [
    { icon: Apple, text: "PCOS-friendly personalized meal plans", bold: "Hormone-focused" },
    { icon: ChefHat, text: "Hormone-balancing recipes", bold: "Anti-inflammatory" },
    { icon: ListChecks, text: "Weekly grocery shopping lists", bold: "Stress-free shopping" },
    { icon: Sparkles, text: "AI-powered recommendations", bold: "Customized for you" },
    { icon: Clock, text: "Progress tracking & plan adjustments", bold: "Cyclical tracking" },
    { icon: Users, text: "Community support access", bold: "Sisterhood support" },
  ];

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!sessionId) {
        setIsLoadingAnalysis(false);
        return;
      }
      try {
        const submission = await getFunnelSubmission(sessionId);
        const profile = getUserProfile();
        setAiAnalysis(submission?.ai_analysis || (profile ? getFallbackAnalysis(profile) : null));
      } catch (error) {
        const profile = getUserProfile();
        setAiAnalysis(profile ? getFallbackAnalysis(profile) : null);
      } finally {
        setIsLoadingAnalysis(false);
      }
    };
    fetchAnalysis();
  }, [sessionId, getUserProfile]);

  const handleCheckout = async () => {
    setIsLoading(true);
    // ... (logic remains same)
    setIsLoading(false);
  };

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#3d2e1f]">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#c9a88e]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#a8b5a0]/20 blur-[120px] rounded-full" />
      </div>

      <header className="sticky top-0 z-50 border-b border-[#d4c5b5]/20 bg-[#faf8f5]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-display text-xl font-bold italic tracking-tight">Wellness Journey.</span>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6b5d52]">
            <Lock className="w-3 h-3" /> Secure Checkout
          </div>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-6 py-12">
        {/* Progress Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a8b5a0]/10 text-[#5a6b50] rounded-full text-xs font-bold mb-6 border border-[#a8b5a0]/20">
            <Sparkles className="w-3 h-3" /> 100% PERSONALIZED FOR YOU
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display leading-[1.1] mb-6">
            Unlock your <span className="italic text-[#c9a88e]">custom roadmap</span>
          </h1>
          <p className="text-lg text-[#6b5d52] max-w-xl">
            We've analyzed your data. Based on your profile, you are ready to see significant results in the next 12 weeks.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Analysis & Features */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#d4c5b5]/30">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 bg-[#c9a88e]/10 rounded-lg"><Sparkles className="w-5 h-5 text-[#c9a88e]" /></div>
                Our Analysis
              </h2>
              {isLoadingAnalysis ? (
                 <div className="animate-pulse space-y-3">
                   <div className="h-4 bg-gray-100 rounded w-3/4" />
                   <div className="h-4 bg-gray-100 rounded w-full" />
                   <div className="h-4 bg-gray-100 rounded w-5/6" />
                 </div>
              ) : (
                <div className="prose prose-stone">
                  <p className="text-[#4a3d33] leading-relaxed italic whitespace-pre-wrap">"{aiAnalysis}"</p>
                </div>
              )}
            </section>

            <section>
              <h3 className="text-xl font-bold mb-6">What's inside your plan:</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white/50 rounded-xl border border-transparent hover:border-[#c9a88e]/30 transition-all">
                    <f.icon className="w-6 h-6 text-[#c9a88e] shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-[#3d2e1f]">{f.bold}</p>
                      <p className="text-xs text-[#6b5d52]">{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Pricing Sticky-ish */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`cursor-pointer relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selectedPlan === plan.id 
                    ? "border-[#3d2e1f] bg-white shadow-xl scale-[1.02]" 
                    : "border-[#d4c5b5]/30 bg-white/50 hover:border-[#c9a88e]/50"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 right-6 bg-[#3d2e1f] text-white text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full">
                      Highly Recommended
                    </span>
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-lg">{plan.name}</h4>
                      <p className="text-xs text-[#6b5d52]">{plan.tagline}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="text-2xl font-bold">${plan.price}</span>
                        <span className="text-sm text-[#6b5d52]">{plan.period}</span>
                      </div>
                      {plan.originalPrice && (
                        <p className="text-xs line-through text-red-400 font-medium">Was ${plan.originalPrice}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-[#6b5d52] mt-4 pt-4 border-t border-[#d4c5b5]/20">
                    {plan.billing}
                  </p>
                </div>
              ))}

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full py-5 bg-[#3d2e1f] text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-[#2d1e0f] transition-all flex items-center justify-center gap-3 group mt-6"
              >
                {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
                  <>Get My Plan <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>

              <div className="flex flex-col items-center gap-4 py-6">
                <div className="flex items-center gap-2 text-xs font-medium text-[#6b5d52]">
                  <Shield className="w-4 h-4 text-[#a8b5a0]" /> 7-Day Risk-Free Guarantee
                </div>
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-[#c9a88e] fill-[#c9a88e]" />)}
                  <span className="text-[10px] font-bold ml-2 text-[#6b5d52]">4.9/5 RATING</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Trust Footer */}
      <footer className="bg-white border-t border-[#d4c5b5]/20 py-12 mt-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-8 mb-8 opacity-50 grayscale">
            {/* Add placeholder logos or text for "As seen on" */}
            <span className="font-bold">HEALTHLINE</span>
            <span className="font-bold">VOGUE</span>
            <span className="font-bold">WELL+GOOD</span>
          </div>
          <p className="text-xs text-[#6b5d52] max-w-2xl mx-auto leading-relaxed">
            Results may vary. This plan is a wellness tool and does not replace medical advice. 
            By subscribing, you agree to our Terms.
          </p>
        </div>
      </footer>
    </div>
  );
}