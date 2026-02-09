"use client";

import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";
import { useQuizStore } from "@/hooks/useQuizState";

interface InterstitialProps {
  title: string;
  description: string;
  highlight?: string;
  image?: string;
  benefits?: string[];
}

export function Interstitial({
  title,
  description,
  highlight,
  image,
  benefits,
}: InterstitialProps) {
  const { gender } = useQuizStore();
  
  // Gender-specific default benefits
  const femaleBenefits = [
    "Balance hormones naturally",
    "Boost your metabolism",
    "Reduce sugar cravings",
    "Sustainable weight loss",
  ];
  
  const maleBenefits = [
    "Optimize your nutrition",
    "Boost your metabolism",
    "Build lean muscle",
    "Sustainable results",
  ];
  
  const defaultBenefits = gender === "male" ? maleBenefits : femaleBenefits;
  const displayBenefits = benefits || (highlight ? defaultBenefits : undefined);

  return (
    <div className="flex flex-col items-center text-center max-w-lg mx-auto py-8">
      {/* Decorative element */}
      <div className="mb-8 relative">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-100 to-slate-100 flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-slate-900" />
        </div>
        <div className="absolute -inset-4 bg-sky-200/30 rounded-full blur-2xl -z-10" />
      </div>

      {image && (
        <div className="relative w-full h-48 sm:h-56 mb-8 rounded-3xl overflow-hidden shadow-xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 leading-tight">
        {title}
      </h2>

      <p className="text-lg text-slate-500 mb-8 leading-relaxed">
        {description}
      </p>

      {displayBenefits && (
        <div className="grid grid-cols-2 gap-3 mb-8 w-full">
          {displayBenefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200"
            >
              <div className="w-2 h-2 rounded-full bg-slate-900 flex-shrink-0" />
              <span className="text-sm font-bold text-slate-700 text-left">{benefit}</span>
            </div>
          ))}
        </div>
      )}

      {highlight && (
        <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-sky-50 to-slate-50 rounded-2xl w-full border border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <p className="text-base font-bold text-slate-900 text-left">
            {highlight}
          </p>
        </div>
      )}
    </div>
  );
}
