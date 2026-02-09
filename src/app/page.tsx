"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] relative overflow-hidden">
      {/* Subtle diagonal stripe pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            #1e3a5f 2px,
            #1e3a5f 4px
          )`,
        }}
      />

      {/* Floating Visual Elements - Right Side */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Central decorative map/globe shape */}
        <div className="hidden lg:block absolute top-1/2 right-[5%] -translate-y-1/2 w-[600px] h-[600px]">
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-20">
            <defs>
              <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="8" height="8">
                <path d="M-1,1 l2,-2 M0,8 l8,-8 M7,9 l2,-2" stroke="#3b82f6" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <ellipse cx="200" cy="200" rx="180" ry="160" fill="url(#diagonalLines)" />
          </svg>
        </div>

        {/* Floating food/people circles */}
        <div className="hidden lg:flex absolute top-[8%] right-[12%] w-28 h-28 rounded-full bg-white shadow-2xl shadow-slate-900/10 items-center justify-center overflow-hidden ring-4 ring-white animate-float-slow">
          <span className="text-5xl">🥗</span>
        </div>

        <div className="hidden lg:flex absolute top-[22%] right-[28%] w-20 h-20 rounded-full bg-white shadow-2xl shadow-slate-900/10 items-center justify-center overflow-hidden ring-4 ring-white animate-float-medium">
          <span className="text-4xl">🥑</span>
        </div>

        <div className="hidden lg:flex absolute top-[18%] right-[5%] w-24 h-24 rounded-full bg-gradient-to-br from-amber-50 to-orange-100 shadow-2xl shadow-slate-900/10 items-center justify-center overflow-hidden ring-4 ring-white animate-float-fast">
          <span className="text-4xl">🍊</span>
        </div>

        <div className="hidden lg:flex absolute top-[42%] right-[8%] w-32 h-32 rounded-full bg-white shadow-2xl shadow-slate-900/10 items-center justify-center overflow-hidden ring-4 ring-white animate-float-slow" style={{ animationDelay: "1s" }}>
          <span className="text-5xl">🍳</span>
        </div>

        <div className="hidden lg:flex absolute top-[38%] right-[32%] w-24 h-24 rounded-full bg-gradient-to-br from-rose-50 to-pink-100 shadow-2xl shadow-slate-900/10 items-center justify-center overflow-hidden ring-4 ring-white animate-float-medium" style={{ animationDelay: "0.5s" }}>
          <span className="text-4xl">🍓</span>
        </div>

        <div className="hidden lg:flex absolute bottom-[28%] right-[18%] w-28 h-28 rounded-full bg-white shadow-2xl shadow-slate-900/10 items-center justify-center overflow-hidden ring-4 ring-white animate-float-fast" style={{ animationDelay: "1.5s" }}>
          <span className="text-5xl">🥘</span>
        </div>

        <div className="hidden lg:flex absolute bottom-[18%] right-[5%] w-20 h-20 rounded-full bg-gradient-to-br from-emerald-50 to-teal-100 shadow-2xl shadow-slate-900/10 items-center justify-center overflow-hidden ring-4 ring-white animate-float-slow" style={{ animationDelay: "2s" }}>
          <span className="text-4xl">🥦</span>
        </div>

        {/* Decorative hearts */}
        <svg className="hidden lg:block absolute top-[15%] right-[20%] w-5 h-5 text-pink-400 animate-pulse-slow" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <svg className="hidden lg:block absolute top-[50%] right-[25%] w-4 h-4 text-rose-400 animate-pulse-slow" style={{ animationDelay: "1s" }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <svg className="hidden lg:block absolute bottom-[35%] right-[10%] w-4 h-4 text-pink-400 animate-pulse-slow" style={{ animationDelay: "2s" }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <svg className="hidden lg:block absolute top-[65%] right-[30%] w-3 h-3 text-rose-300 animate-pulse-slow" style={{ animationDelay: "0.5s" }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-20 px-6 sm:px-10 lg:px-16 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              PERFECT
            </span>
            <span className="text-2xl font-black tracking-tight text-sky-500">
              BODY
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 sm:px-10 lg:px-16 py-8 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Headline */}
            <h1 className="text-[2.75rem] sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 mb-6">
              Real results,
              <br />
              real food,
              <br />
              real simple
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-md">
              Losing weight and getting fit is easier than you think. All it takes is a personalized plan – and you taking that first step.
            </p>

            {/* Gender Selection */}
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em]">
                Select your gender
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <Link
                  href="/quiz/male/1"
                  className="flex-1 px-8 py-4 bg-slate-900 text-white rounded-full text-lg font-bold text-center
                           hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5
                           active:translate-y-0 active:shadow-lg
                           transition-all duration-200"
                >
                  Male
                </Link>
                
                <Link
                  href="/quiz/female/1"
                  className="flex-1 px-8 py-4 bg-slate-900 text-white rounded-full text-lg font-bold text-center
                           hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5
                           active:translate-y-0 active:shadow-lg
                           transition-all duration-200"
                >
                  Female
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
          {/* Logo and Disclaimer */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-black tracking-tight">
                  PERFECT
                </span>
                <span className="text-xl font-black tracking-tight text-sky-400">
                  BODY
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                DISCLAIMER: Perfect Body website, app, services, and products are meant to support general health. Our products and services are not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>

            {/* Footer Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div className="space-y-3">
                <Link href="#" className="block text-slate-300 hover:text-white transition-colors">
                  Help & Support
                </Link>
                <Link href="#" className="block text-slate-300 hover:text-white transition-colors">
                  Access My Plan
                </Link>
                <Link href="#" className="block text-slate-300 hover:text-white transition-colors">
                  Manage Subscription
                </Link>
              </div>
              <div className="space-y-3">
                <Link href="#" className="block text-slate-300 hover:text-white transition-colors">
                  About us
                </Link>
                <Link href="#" className="block text-slate-300 hover:text-white transition-colors">
                  Affiliate
                </Link>
                <Link href="#" className="block text-slate-300 hover:text-white transition-colors">
                  Reviews
                </Link>
              </div>
              <div className="space-y-3">
                <Link href="#" className="block text-slate-300 hover:text-white transition-colors">
                  General Conditions
                </Link>
                <Link href="#" className="block text-slate-300 hover:text-white transition-colors">
                  Data Protection Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 text-center">
              © 2026 ALL RIGHTS RESERVED. PERFECT BODY.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-2deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
