"use client";

import { useMemo } from "react";
import { useQuizStore } from "@/hooks/useQuizState";
import { calculateBMI, getBMIResult } from "@/lib/bmi";
import Image from "next/image";

function getExerciseLabel(exercisePreference: string) {
  if (exercisePreference === "regularly") return "Moderate activity";
  if (exercisePreference === "occasionally") return "Light activity";
  if (exercisePreference === "try-to-stay-active") return "Light activity";
  return "Low activity";
}

function getActivityLabel(activityLevel: string) {
  if (activityLevel === "always-working-out") return "High";
  if (activityLevel === "moving-a-lot") return "Above average";
  if (activityLevel === "desk-job") return "Average";
  return "Average";
}

function BMIGauge() {
  return (
    <svg viewBox="0 0 200 120" className="w-32 h-auto mx-auto mt-3">
      {/* Background arc segments */}
      {/* Green segment */}
      <path
        d="M 30 100 A 70 70 0 0 1 70 38"
        fill="none"
        stroke="#22c55e"
        strokeWidth="16"
        strokeLinecap="round"
      />
      {/* Yellow-green segment */}
      <path
        d="M 72 36 A 70 70 0 0 1 100 30"
        fill="none"
        stroke="#84cc16"
        strokeWidth="16"
        strokeLinecap="round"
      />
      {/* Orange segment */}
      <path
        d="M 102 30 A 70 70 0 0 1 135 40"
        fill="none"
        stroke="#f97316"
        strokeWidth="16"
        strokeLinecap="round"
      />
      {/* Red segment */}
      <path
        d="M 137 42 A 70 70 0 0 1 170 100"
        fill="none"
        stroke="#ef4444"
        strokeWidth="16"
        strokeLinecap="round"
      />
      {/* Needle - pointing to overweight area (orange zone) */}
      <line
        x1="100"
        y1="100"
        x2="130"
        y2="45"
        stroke="#1f2937"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Center circle */}
      <circle cx="100" cy="100" r="6" fill="#1f2937" />
    </svg>
  );
}

export function PersonalSummary() {
  const { getUserProfile } = useQuizStore();
  const profile = getUserProfile();

  const bmiText = useMemo(() => {
    if (!profile) return "Normal range";
    return getBMIResult(calculateBMI(profile.currentWeight, profile.height)).category;
  }, [profile]);

  const exerciseLabel = profile ? getExerciseLabel(profile.exercisePreference) : "Moderate activity";
  const activityLabel = profile ? getActivityLabel(profile.activityLevel) : "Average";

  return (
    <div className="max-w-sm mx-auto">
      <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm relative">
        {/* BMI Section - Yellow background */}
        <div className="bg-[#FFF8DC] px-5 pt-5 pb-6 text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Body Mass Index (BMI)
          </p>
          <p className="text-2xl font-bold text-gray-900">{bmiText}</p>

          <BMIGauge />

          <p className="text-[10px] text-gray-600 mt-3 leading-relaxed px-2">
            A healthy BMI provides a strong foundation for improving body composition and reaching your desired shape.
          </p>
        </div>

        {/* Info items + Person image */}
        <div className="flex">
          {/* Left side - info items */}
          <div className="flex-1 p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">💗</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                  PCOS symptom indicators
                </p>
                <p className="font-bold text-sm text-gray-900">Detected</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🏋️</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                  Exercise habits
                </p>
                <p className="font-bold text-sm text-gray-900">{exerciseLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">📊</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                  Daily activity level
                </p>
                <p className="font-bold text-sm text-gray-900">{activityLabel}</p>
              </div>
            </div>
          </div>

          {/* Right side - person image */}
          <div className="relative w-36 flex-shrink-0 self-end">
            <Image
              src="/images/personal-summary.avif"
              alt="Personal summary"
              width={160}
              height={220}
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
