"use client";

import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";

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
  // Default benefits for motivation screens
  const defaultBenefits = [
    "Balance hormones naturally",
    "Boost your metabolism",
    "Reduce sugar cravings",
    "Sustainable weight loss",
  ];

  const displayBenefits = benefits || (highlight ? defaultBenefits : undefined);

  return (
    <div className="flex flex-col items-center text-center max-w-lg mx-auto py-8">
      {/* Decorative element */}
      <div className="mb-8 relative">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl -z-10" />
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

      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6 leading-tight animate-fade-up">
        {title}
      </h2>

      <p className="text-lg text-muted-foreground mb-8 leading-relaxed animate-fade-up animate-delay-100">
        {description}
      </p>

      {displayBenefits && (
        <div className="grid grid-cols-2 gap-3 mb-8 w-full animate-fade-up animate-delay-200">
          {displayBenefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-card rounded-2xl border border-border"
            >
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-sm font-medium text-left">{benefit}</span>
            </div>
          ))}
        </div>
      )}

      {highlight && (
        <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl w-full border border-primary/20 animate-fade-up animate-delay-300">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <p className="text-base font-medium text-foreground text-left">
            {highlight}
          </p>
        </div>
      )}
    </div>
  );
}
