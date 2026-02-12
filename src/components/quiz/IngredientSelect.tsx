"use client";

import { QuizQuestion } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface IngredientSelectProps {
  question: QuizQuestion;
  value: string[];
  onChange: (value: string[]) => void;
}

export function IngredientSelect({ question, value = [], onChange }: IngredientSelectProps) {
  const categories = question.categories || [];

  const toggleOption = (optionId: string) => {
    if (value.includes(optionId)) {
      onChange(value.filter((item) => item !== optionId));
      return;
    }
    onChange([...value, optionId]);
  };

  return (
    <div className="space-y-3 max-w-md mx-auto">
      {categories.map((category) => (
        <div key={category.id} className="rounded-md border border-slate-300 bg-white overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-200 bg-slate-50">
            <p className="text-xs font-semibold text-slate-700">{category.title}</p>
          </div>

          <div className="p-2 flex flex-wrap gap-2">
            {category.options.map((option) => {
              const selected = value.includes(option.id);

              return (
                <button
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className={cn(
                    "px-2.5 py-1.5 rounded border text-[11px] font-medium transition-all duration-200 active:scale-95",
                    selected
                      ? "bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-300/50 -translate-y-0.5"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

