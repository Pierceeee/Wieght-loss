"use client";

import { QuizOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface VisualSelectProps {
  options: QuizOption[];
  value: string | undefined;
  onChange: (value: string) => void;
}

export function VisualSelect({ options, value, onChange }: VisualSelectProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full py-2">
      {options.map((option, index) => {
        const isSelected = value === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative flex flex-col items-start rounded-md border transition-all duration-200 overflow-hidden active:scale-[0.98]",
              "hover:border-slate-400 hover:bg-white",
              isSelected
                ? "border-amber-500 bg-amber-50 shadow-md shadow-amber-200/60 scale-[1.01] -translate-y-0.5"
                : "border-slate-200 bg-white"
            )}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {option.image ? (
              <div className="relative w-full h-36">
                <Image
                  src={option.image}
                  alt={option.label}
                  fill
                  className={cn("object-cover transition-transform duration-300", isSelected && "scale-105")}
                />
              </div>
            ) : (
              <div className="w-full h-36 bg-gradient-to-b from-slate-100 to-slate-50 flex items-center justify-center">
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

            <div className="w-full px-3 py-2 flex items-center">
              <span className={cn("font-semibold text-sm", isSelected ? "text-slate-900" : "text-slate-700")}>
                {option.label}
              </span>
              <ArrowRight className={cn(
                "w-4 h-4 ml-auto transition-transform duration-200",
                isSelected ? "text-amber-600 translate-x-0.5" : "text-slate-500"
              )} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
