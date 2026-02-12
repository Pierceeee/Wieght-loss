"use client";

import { QuizOption } from "@/types/quiz";
import { cn } from "@/lib/utils";

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
    <div className="grid grid-cols-1 gap-3 w-full">
      {options.map((option, index) => {
        const isSelected = value.includes(option.id);
        return (
          <button
            key={option.id}
            onClick={() => handleToggle(option.id)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-md border transition-all duration-200 text-left active:scale-[0.98]",
              "hover:border-slate-400 hover:bg-white",
              isSelected
                ? "border-amber-500 bg-amber-50 shadow-sm shadow-amber-200/60 scale-[1.005]"
                : "border-slate-200 bg-white"
            )}
            style={{ animationDelay: `${index * 30}ms` }}
          >
            {option.icon && (
              <span className="text-base flex-shrink-0">{option.icon}</span>
            )}
            <span className="flex-1 font-semibold text-sm text-slate-900">{option.label}</span>
            <div
              className={cn(
                "w-4 h-4 rounded-full border flex items-center justify-center transition-all flex-shrink-0",
                isSelected
                  ? "border-amber-600 bg-amber-500"
                  : "border-slate-400"
              )}
            >
              {isSelected && <span className="block w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
