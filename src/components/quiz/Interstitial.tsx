"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

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
  const defaultBenefits = [
    "Balance hormones naturally",
    "Boost your metabolism",
    "Reduce sugar cravings",
    "Sustainable weight loss",
  ];
  const displayBenefits = benefits || (highlight ? defaultBenefits : undefined);

  return (
    <div className="max-w-sm mx-auto py-2">
      <div className="bg-white rounded-md border border-slate-200 p-3">
      {image && (
        <div className="relative w-full h-44 mb-3 rounded-md overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <h2 className="text-3xl font-extrabold text-slate-900 mb-2 leading-tight">
        {title}
      </h2>

      <p className="text-sm text-slate-700 mb-3 leading-relaxed">
        {description}
      </p>

      {displayBenefits && (
        <div className="mb-3 w-full">
          {displayBenefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-2 py-0.5"
            >
              <div className="w-1 h-1 rounded-full bg-slate-900 flex-shrink-0" />
              <span className="text-xs font-medium text-slate-700 text-left">{benefit}</span>
            </div>
          ))}
        </div>
      )}

      {highlight && (
        <div className="flex items-center gap-3 p-3 bg-pink-100 rounded-md w-full">
          <div className="w-8 h-8 rounded-md bg-pink-200 flex items-center justify-center flex-shrink-0">
            <Heart className="w-4 h-4 text-pink-600" />
          </div>
          <p className="text-sm font-semibold text-slate-900 text-left">
            {highlight}
          </p>
        </div>
      )}
      </div>
    </div>
  );
}
