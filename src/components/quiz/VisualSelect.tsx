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
              "quiz-option relative flex flex-col items-center p-5 sm:p-6 rounded-3xl border-2 transition-all duration-200",
              "hover:border-primary/50 hover:bg-primary/5",
              "w-[120px] sm:w-[150px]",
              isSelected
                ? "border-primary bg-primary/10 shadow-xl shadow-primary/15 scale-105"
                : "border-border bg-card hover:shadow-lg"
            )}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Selection indicator */}
            <div
              className={cn(
                "absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300",
                isSelected
                  ? "bg-primary scale-100 opacity-100"
                  : "bg-muted scale-75 opacity-0"
              )}
            >
              <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
              <div className="w-16 h-28 sm:w-20 sm:h-36 mb-4 bg-gradient-to-b from-muted to-muted/50 rounded-2xl flex items-center justify-center">
                {/* Simple body silhouette based on option */}
                <svg 
                  viewBox="0 0 40 80" 
                  className={cn(
                    "w-12 h-24 transition-colors",
                    isSelected ? "text-primary" : "text-muted-foreground/50"
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
              "font-semibold text-base transition-colors",
              isSelected ? "text-primary" : "text-foreground"
            )}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
