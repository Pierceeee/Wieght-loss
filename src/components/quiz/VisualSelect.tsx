"use client";

import { QuizOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface VisualSelectProps {
  options: QuizOption[];
  value: string | undefined;
  onChange: (value: string) => void;
}

export function VisualSelect({ options, value, onChange }: VisualSelectProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full py-4">
      {options.map((option, index) => {
        const isSelected = value === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative flex flex-col items-center p-5 sm:p-6 rounded-3xl border-2 transition-all duration-200",
              "hover:border-slate-400 hover:bg-white hover:shadow-lg",
              "w-[120px] sm:w-[150px]",
              isSelected
                ? "border-slate-900 bg-white shadow-xl scale-105"
                : "border-slate-200 bg-white/80"
            )}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Selection indicator */}
            <div
              className={cn(
                "absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300",
                isSelected
                  ? "bg-slate-900 scale-100 opacity-100"
                  : "bg-slate-200 scale-75 opacity-0"
              )}
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Body illustration */}
            {option.image ? (
              <div className="relative w-16 h-28 sm:w-20 sm:h-36 mb-4">
                <Image
                  src={option.image}
                  alt={option.label}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-16 h-28 sm:w-20 sm:h-36 mb-4 bg-gradient-to-b from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center">
                {/* Simple body silhouette based on option */}
                <svg 
                  viewBox="0 0 40 80" 
                  className={cn(
                    "w-12 h-24 transition-colors",
                    isSelected ? "text-slate-900" : "text-slate-300"
                  )}
                  fill="currentColor"
                >
                  {option.id === "regular" && (
                    <>
                      <circle cx="20" cy="8" r="7" />
                      <path d="M12 20 h16 v12 h-4 v30 h-3 v-30 h-2 v30 h-3 v-30 h-4 z" />
                    </>
                  )}
                  {option.id === "plump" && (
                    <>
                      <circle cx="20" cy="8" r="7" />
                      <path d="M10 20 h20 q4 15 2 25 h-5 v18 h-4 v-18 h-6 v18 h-4 v-18 h-5 q-2-10 2-25 z" />
                    </>
                  )}
                  {option.id === "extra" && (
                    <>
                      <circle cx="20" cy="8" r="7" />
                      <path d="M8 20 h24 q5 18 3 30 h-6 v15 h-5 v-15 h-8 v15 h-5 v-15 h-6 q-2-12 3-30 z" />
                    </>
                  )}
                </svg>
              </div>
            )}

            <span className={cn(
              "font-bold text-base transition-colors",
              isSelected ? "text-slate-900" : "text-slate-600"
            )}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
