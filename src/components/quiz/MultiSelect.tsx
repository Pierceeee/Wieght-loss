"use client";

import { QuizOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface MultiSelectProps {
  options: QuizOption[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function MultiSelect({ options, value = [], onChange }: MultiSelectProps) {
  const handleToggle = (optionId: string) => {
    // Handle "none" option - clear all others when selected
    if (optionId === "none") {
      onChange(value.includes("none") ? [] : ["none"]);
      return;
    }

    // If selecting a non-none option, remove "none" from selection
    const filteredValue = value.filter((v) => v !== "none");

    if (filteredValue.includes(optionId)) {
      onChange(filteredValue.filter((v) => v !== optionId));
    } else {
      onChange([...filteredValue, optionId]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
      {options.map((option, index) => {
        const isSelected = value.includes(option.id);
        return (
          <button
            key={option.id}
            onClick={() => handleToggle(option.id)}
            className={cn(
              "quiz-option flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left",
              "hover:border-primary/50 hover:bg-primary/5",
              isSelected
                ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                : "border-border bg-card hover:shadow-md"
            )}
            style={{ animationDelay: `${index * 30}ms` }}
          >
            {option.icon && (
              <span className="text-2xl flex-shrink-0">{option.icon}</span>
            )}
            <span className="flex-1 font-medium text-base">{option.label}</span>
            <div
              className={cn(
                "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/30"
              )}
            >
              {isSelected && <Check className="w-4 h-4" strokeWidth={3} />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
