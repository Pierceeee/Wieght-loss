"use client";

import { QuizOption } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface SingleSelectProps {
  options: QuizOption[];
  value: string | undefined;
  onChange: (value: string) => void;
}

export function SingleSelect({ options, value, onChange }: SingleSelectProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {options.map((option, index) => {
        const isSelected = value === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "flex items-center gap-4 p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 text-left",
              "hover:border-slate-400 hover:bg-white hover:shadow-md",
              isSelected
                ? "border-slate-900 bg-white shadow-lg"
                : "border-slate-200 bg-white/80"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {option.icon && (
              <span className="text-2xl flex-shrink-0">{option.icon}</span>
            )}
            <span className="flex-1 font-bold text-base sm:text-lg text-slate-900">{option.label}</span>
            <div
              className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0",
                isSelected
                  ? "border-slate-900 bg-slate-900"
                  : "border-slate-300"
              )}
            >
              {isSelected && (
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
