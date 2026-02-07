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
              "quiz-option flex items-center gap-4 p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 text-left",
              "hover:border-primary/50 hover:bg-primary/5",
              isSelected
                ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                : "border-border bg-card hover:shadow-md"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {option.icon && (
              <span className="text-2xl flex-shrink-0">{option.icon}</span>
            )}
            <span className="flex-1 font-medium text-base sm:text-lg">{option.label}</span>
            <div
              className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0",
                isSelected
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/30"
              )}
            >
              {isSelected && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
