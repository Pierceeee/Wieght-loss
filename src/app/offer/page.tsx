"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuizStore } from "@/hooks/useQuizState";
import { getFunnelSubmission } from "@/lib/supabase";
import { getFallbackAnalysis } from "@/lib/utils/fallback-analysis";
import { 
  Check, 
  Shield, 
  Clock, 
  Sparkles, 
  ChefHat, 
  ListChecks, 
  Users, 
  Zap,
  Star,
  ArrowRight,
  Dumbbell,
  Apple
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
}

const plans: PricingPlan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: 19.99,
    period: "/mo",
    billing: "Billed monthly",
  },
  {
    id: "yearly",
    name: "Annual",
    price: 9.99,
    originalPrice: 19.99,
    period: "/mo",
    billing: "$119.88 billed yearly",
    popular: true,
    savings: "50% OFF",
  },
  {
    id: "lifetime",
    name: "Lifetime",
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

  // Gender-specific features
  const maleFeatures = [
    { icon: Dumbbell, text: "Personalized workout & nutrition plans" },
    { icon: ChefHat, text: "Muscle-building meal recipes" },
    { icon: ListChecks, text: "Weekly meal prep & shopping lists" },
    { icon: Sparkles, text: "AI-powered macro optimization" },
    { icon: Clock, text: "Progress tracking & adjustments" },
    { icon: Users, text: "Community support access" },
  ];

  const femaleFeatures = [
    { icon: Apple, text: "PCOS-friendly personalized meal plans" },
    { icon: ChefHat, text: "Hormone-balancing recipes" },
    { icon: ListChecks, text: "Weekly grocery shopping lists" },
    { icon: Sparkles, text: "AI-powered recommendations" },
    { icon: Clock, text: "Progress tracking & plan adjustments" },
    { icon: Users, text: "Community support access" },
  ];

  const features = gender === "male" ? maleFeatures : femaleFeatures;

  // Fetch AI analysis from database
  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!sessionId) {
        setIsLoadingAnalysis(false);
        return;
      }

      try {
        const submission = await getFunnelSubmission(sessionId);
        
        if (submission && submission.ai_analysis) {
          setAiAnalysis(submission.ai_analysis);
        } else {
          const profile = getUserProfile();
          if (profile) {
            setAiAnalysis(getFallbackAnalysis(profile));
          }
        }
      } catch (error) {
        console.error("Failed to fetch analysis:", error);
        const profile = getUserProfile();
        if (profile) {
          setAiAnalysis(getFallbackAnalysis(profile));
        }
      } finally {
        setIsLoadingAnalysis(false);
      }
    };

    fetchAnalysis();
  }, [sessionId, getUserProfile]);

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      const email = typeof window !== "undefined" ? localStorage.getItem("pcos-user-email") : null;
      
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          planId: selectedPlan,
          sessionId,
          email: email || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-black tracking-tight text-slate-900">PERFECT</span>
            <span className="text-xl font-black tracking-tight text-sky-500">BODY</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            Your Results Are Ready
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4">
            Your Personalized Plan
            <br />
            <span className="text-sky-500">Awaits You</span>
          </h1>
          
          <p className="text-lg text-slate-500 max-w-lg mx-auto">
            Based on your answers, we've created a customized {gender === "male" ? "fitness" : "wellness"} plan just for you
          </p>
        </div>

        {/* AI Analysis Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8 relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-sky-100/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">Your Personalized Analysis</h2>
                <p className="text-sm text-slate-500">AI-powered insights based on your unique profile</p>
              </div>
            </div>
            
            {isLoadingAnalysis ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="h-4 bg-slate-100 rounded animate-pulse"
                    style={{ width: `${100 - i * 8}%` }}
                  />
                ))}
              </div>
            ) : aiAnalysis ? (
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-base">
                  {aiAnalysis}
                </p>
              </div>
            ) : (
              <p className="text-slate-500">
                Your personalized analysis is being prepared. Continue to see your plan options.
              </p>
            )}
          </div>
        </div>

        {/* Plan Selection */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
            Choose Your Plan
          </h2>
          <p className="text-slate-500">
            Start your transformation journey today
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative text-left p-6 rounded-3xl transition-all duration-300 ${
                selectedPlan === plan.id
                  ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/30 scale-[1.02]"
                  : "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg"
              }`}
            >
              {/* Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-sky-500 text-white text-xs font-bold rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              {plan.savings && !plan.popular && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 text-xs font-bold rounded-full shadow-lg ${
                  plan.id === "lifetime" ? "bg-emerald-500 text-white" : "bg-amber-400 text-amber-900"
                }`}>
                  {plan.savings}
                </div>
              )}

              {/* Plan name */}
              <div className={`text-lg font-bold mb-4 ${
                selectedPlan === plan.id ? "text-white" : "text-slate-900"
              }`}>
                {plan.name}
              </div>

              {/* Price */}
              <div className="mb-4">
                {plan.originalPrice && (
                  <span className={`text-lg line-through mr-2 ${
                    selectedPlan === plan.id ? "text-slate-400" : "text-slate-400"
                  }`}>
                    ${plan.originalPrice}
                  </span>
                )}
                <span className="text-4xl font-black">${plan.price}</span>
                <span className={`text-sm ${
                  selectedPlan === plan.id ? "text-slate-300" : "text-slate-500"
                }`}>
                  {plan.period}
                </span>
              </div>

              {/* Billing */}
              <div className={`text-sm mb-4 ${
                selectedPlan === plan.id ? "text-slate-300" : "text-slate-500"
              }`}>
                {plan.billing}
              </div>

              {/* Selection indicator */}
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedPlan === plan.id
                  ? "border-sky-400 bg-sky-400"
                  : "border-slate-300"
              }`}>
                {selectedPlan === plan.id && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Features */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
          <h3 className="text-xl font-black text-slate-900 text-center mb-6">
            What's Included
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-slate-700" />
                </div>
                <span className="font-medium text-slate-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200">
            <div className="flex -space-x-2">
              {["👨", "👩", "🧔", "👱‍♀️"].map((emoji, i) => (
                <div key={i} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm border-2 border-white">
                  {emoji}
                </div>
              ))}
            </div>
            <span className="text-sm font-medium text-slate-700">10,000+ members</span>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-slate-200">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
            <span className="text-sm font-medium text-slate-700 ml-1">4.9 rating</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full h-16 text-lg font-bold rounded-full
                   bg-slate-900 text-white
                   hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                   transition-all duration-200 group"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Get Started for ${selectedPlanData?.price}{selectedPlanData?.period}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-500" />
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-8 pb-8">
          <p className="text-sm text-slate-500">
            Have questions?{" "}
            <Link href="#" className="text-sky-600 font-medium hover:underline">
              Check our FAQ
            </Link>{" "}
            or{" "}
            <Link href="#" className="text-sky-600 font-medium hover:underline">
              contact support
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-slate-500">
          <p>
            By continuing, you agree to our{" "}
            <Link href="#" className="hover:underline text-slate-700">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="hover:underline text-slate-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
