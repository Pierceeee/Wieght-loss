"use client";

import { QuizOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

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
              "flex items-center gap-3 p-4 rounded-md border transition-all duration-200 text-left active:scale-[0.98]",
              "hover:border-slate-400 hover:bg-white",
              isSelected
                ? "border-amber-500 bg-amber-50 shadow-md shadow-amber-200/60 scale-[1.01] -translate-y-0.5"
                : "border-slate-200 bg-white"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {option.icon && (
              <span className="text-xl flex-shrink-0">{option.icon}</span>
            )}
            <span className="flex-1 font-semibold text-sm text-slate-900">{option.label}</span>
            <ArrowRight className={cn(
              "w-4 h-4 transition-transform duration-200",
              isSelected ? "text-amber-600 translate-x-0.5" : "text-slate-500"
            )} />
          </button>
        );
      })}
    </div>
  );
}
