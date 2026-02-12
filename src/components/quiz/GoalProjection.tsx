"use client";

import { useMemo } from "react";
import { useQuizStore } from "@/hooks/useQuizState";
import { kgToLbs } from "@/lib/bmi";

function getGoalDate() {
  const date = new Date();
  date.setDate(date.getDate() + 58);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function GoalProjection() {
  const { responses } = useQuizStore();
  const targetLbs = (responses["target-weight-lbs"] as number | undefined) || Math.round(kgToLbs((responses["target-weight"] as number) || 45));
  const currentLbs = (responses["current-weight-lbs"] as number | undefined) || Math.round(kgToLbs((responses["current-weight"] as number) || 54));
  const goalDate = useMemo(() => getGoalDate(), []);

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-center text-3xl font-bold text-amber-600 mb-4">{targetLbs} lbs by {goalDate}</h2>

      <div className="bg-white border border-slate-200 rounded-md p-3">
        <svg viewBox="0 0 520 280" className="w-full h-auto">
          <line x1="20" y1="50" x2="500" y2="50" stroke="#e5e7eb" strokeDasharray="4 4" />
          <line x1="20" y1="140" x2="500" y2="140" stroke="#e5e7eb" strokeDasharray="4 4" />
          <line x1="20" y1="230" x2="500" y2="230" stroke="#e5e7eb" strokeDasharray="4 4" />

          <path d="M 30 85 C 140 100, 220 60, 500 55" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="10 8" />
          <path d="M 30 95 C 120 90, 160 170, 250 145 C 320 130, 360 220, 500 200" fill="none" stroke="#d97706" strokeWidth="5" />

          <circle cx="95" cy="102" r="8" fill="#d97706" />
          <circle cx="250" cy="145" r="8" fill="#d97706" />
          <circle cx="410" cy="185" r="8" fill="#d97706" />

          <rect x="45" y="58" width="98" height="36" rx="8" fill="#d97706" />
          <text x="94" y="80" textAnchor="middle" fill="white" fontSize="16" fontWeight="700">Now: {currentLbs} lbs</text>

          <rect x="360" y="138" width="98" height="36" rx="8" fill="#d97706" />
          <text x="409" y="160" textAnchor="middle" fill="white" fontSize="16" fontWeight="700">Goal: {targetLbs} lbs</text>
        </svg>

        <div className="space-y-2 mt-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-10 h-[2px] bg-amber-600 inline-block" />
            <span className="font-semibold text-slate-700">With PCOS Plan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-10 h-[2px] inline-block bg-[repeating-linear-gradient(90deg,#ef4444,#ef4444_5px,transparent_5px,transparent_10px)]" />
            <span className="font-semibold text-slate-700">Usual weight loss journey</span>
          </div>
        </div>
      </div>
    </div>
  );
}

