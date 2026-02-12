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
    <div className="grid grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
      {options.map((option, index) => {
        const isSelected = value === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-transparent hover:border-gray-300 transition-all group active:scale-[0.98]"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
              {option.image && (
                <Image
                  src={option.image}
                  alt={option.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>

            <div className="p-5 flex items-center justify-between">
              <span className="font-bold text-lg text-gray-800">
                {option.label}
              </span>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-800" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
