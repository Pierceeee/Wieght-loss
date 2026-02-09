"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuizStore } from "@/hooks/useQuizState";
import { completeFunnelWithEmail } from "@/lib/actions/submit-quiz";
import { Lock, ArrowLeft, ArrowRight, Mail, Shield, Sparkles } from "lucide-react";

export default function EmailCapturePage() {
  const router = useRouter();
  const { responses, sessionId, gender } = useQuizStore();
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const targetWeight = responses["target-weight"] as number || 70;
  
  // Gender-specific messaging
  const headline = gender === "male" 
    ? `Enter your email to see your personalized plan to reach ${targetWeight} kg`
    : `Enter your email to see how you can reach ${targetWeight} kg and balance your hormones`;
  
  const privacyText = gender === "male"
    ? "I agree to the Privacy Policy and receiving fitness tips from Perfect Body"
    : "I agree to the Privacy Policy and receiving wellness tips from Perfect Body";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!agreed) {
      setError("Please agree to the privacy policy");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      localStorage.setItem("pcos-user-email", email);
      
      if (sessionId) {
        await completeFunnelWithEmail(sessionId, email);
      }
      
      router.push("/offer");
    } catch (err) {
      console.error("Error saving email:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/summary")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </button>
            <div className="flex items-center gap-2 flex-1 justify-center mr-10">
              <span className="text-xl font-black tracking-tight text-slate-900">PERFECT</span>
              <span className="text-xl font-black tracking-tight text-sky-500">BODY</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto px-4 py-12">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-xl shadow-sky-500/20">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-4">
            {headline}
          </h1>
          <p className="text-slate-500">
            We'll send your personalized plan directly to your inbox
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-slate-700">
              Your email address
            </label>
            <div className={`relative transition-all duration-200 ${isFocused ? 'transform scale-[1.02]' : ''}`}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Mail className={`w-5 h-5 transition-colors ${isFocused ? 'text-sky-500' : 'text-slate-400'}`} />
              </div>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isLoading}
                className={`w-full h-14 pl-12 pr-4 rounded-2xl border-2 bg-white text-slate-900 
                         placeholder:text-slate-400 text-base font-medium
                         transition-all duration-200
                         ${isFocused 
                           ? 'border-sky-500 shadow-lg shadow-sky-500/10' 
                           : 'border-slate-200 hover:border-slate-300'}
                         ${error && !email ? 'border-red-400' : ''}
                         disabled:opacity-50 disabled:cursor-not-allowed`}
              />
            </div>
          </div>

          {/* Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                disabled={isLoading}
                className="sr-only peer"
              />
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
                            ${agreed 
                              ? 'bg-slate-900 border-slate-900' 
                              : 'bg-white border-slate-300 group-hover:border-slate-400'}
                            ${error && !agreed ? 'border-red-400' : ''}`}>
                {agreed && (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-slate-600 leading-relaxed">
              {privacyText.split("Privacy Policy")[0]}
              <Link href="#" className="text-sky-600 font-medium hover:underline">
                Privacy Policy
              </Link>
              {privacyText.split("Privacy Policy")[1]}
            </span>
          </label>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!email || !agreed || isLoading}
            className="flex items-center justify-center gap-2 w-full h-14 sm:h-16 text-base sm:text-lg font-bold rounded-full
                     bg-slate-900 text-white
                     hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
                     transition-all duration-200 group"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Get My Plan
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Trust indicators */}
        <div className="mt-10 space-y-4">
          <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
            <Lock className="w-4 h-4 text-emerald-500" />
            <span>Your data is secure and encrypted</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
            <Shield className="w-4 h-4 text-sky-500" />
            <span>No spam, unsubscribe anytime</span>
          </div>
        </div>

        {/* Privacy note */}
        <p className="text-center text-xs text-slate-400 mt-8 leading-relaxed max-w-sm mx-auto">
          We respect your privacy and use your email only to send you your personalized
          plan and important updates. We never share your information.
        </p>
      </main>
    </div>
  );
}
