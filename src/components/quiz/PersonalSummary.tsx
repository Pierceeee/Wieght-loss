"use client";

import { useMemo } from "react";
import { useQuizStore } from "@/hooks/useQuizState";
import { calculateBMI, getBMIResult } from "@/lib/bmi";

function getExerciseLabel(exercisePreference: string) {
  if (exercisePreference === "regularly") return "Regular";
  if (exercisePreference === "occasionally") return "Light exercise";
  if (exercisePreference === "try-to-stay-active") return "Light exercise";
  return "Beginner";
}

function getActivityLabel(activityLevel: string) {
  if (activityLevel === "always-working-out") return "High";
  if (activityLevel === "moving-a-lot") return "Moderate";
  if (activityLevel === "desk-job") return "Low";
  return "Low";
}

export function PersonalSummary() {
  const { getUserProfile } = useQuizStore();
  const profile = getUserProfile();

  const bmiText = useMemo(() => {
    if (!profile) return "Normal";
    return getBMIResult(calculateBMI(profile.currentWeight, profile.height)).category;
  }, [profile]);

  if (!profile) return null;

  return (
    <div className="max-w-xs mx-auto">
      <div className="rounded-md overflow-hidden bg-white border border-slate-200">
        <div className="bg-emerald-50 p-4 text-center">
          <p className="text-[11px] font-semibold text-slate-600 mb-1">Body Mass Index (BMI)</p>
          <p className="text-3xl font-bold text-slate-900">{bmiText}</p>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">PCOS symptoms</span>
            <span className="font-semibold text-slate-900">Present</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Exercise</span>
            <span className="font-semibold text-slate-900">{getExerciseLabel(profile.exercisePreference)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Activity level</span>
            <span className="font-semibold text-slate-900">{getActivityLabel(profile.activityLevel)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

