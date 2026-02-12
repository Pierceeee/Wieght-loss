"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuizStore } from "@/hooks/useQuizState";
import { completeFunnelWithEmail } from "@/lib/actions/submit-quiz";
import { Lock } from "lucide-react";
import { kgToLbs } from "@/lib/bmi";

export default function EmailCapturePage() {
  const router = useRouter();
  const { responses, sessionId } = useQuizStore();
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const targetWeightLbs = (responses["target-weight-lbs"] as number | undefined) ||
    Math.round(kgToLbs((responses["target-weight"] as number | undefined) || 45));

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
    <div className="min-h-screen bg-[#eaecf0]">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-3 text-center">
          <p className="font-bold text-3xl text-slate-900">PCOS Plan</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-[42px] leading-tight font-extrabold text-slate-900">
            Enter your email to see how you can reach{" "}
            <span className="text-amber-600">{targetWeightLbs} lbs</span> and alleviate PCOS symptoms
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-semibold text-slate-700">
              Your email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={`w-full h-12 px-3 rounded-md border bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium transition-colors ${error && !email ? "border-red-400" : "border-slate-300"}`}
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative mt-0">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                disabled={isLoading}
                className="sr-only peer"
              />
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${agreed ? "bg-slate-900 border-slate-900" : "bg-white border-slate-500"} ${error && !agreed ? "border-red-400" : ""}`}>
                {agreed && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-slate-700 leading-relaxed">
              I agree to the{" "}
              <Link href="#" className="text-slate-800 font-medium hover:underline">
                Privacy policy
              </Link>{" "}
              and receiving future information from PCOS Plan
            </span>
          </label>

          {error && (
            <div className="px-3 py-2 bg-red-50 border border-red-200 rounded text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!email || !agreed || isLoading}
            className="w-full h-12 text-sm font-semibold rounded-md bg-black text-white hover:bg-slate-900 disabled:bg-slate-300 disabled:text-white disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="mx-auto w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        <div className="mt-6 flex items-start gap-2 text-xs text-slate-700">
          <Lock className="w-4 h-4 mt-0.5 text-slate-500" />
          <p>
            We respect your privacy and use your email only to send you the PCOS Plan program and other important emails. You won&apos;t receive spam.
          </p>
        </div>
      </main>
    </div>
  );
}
