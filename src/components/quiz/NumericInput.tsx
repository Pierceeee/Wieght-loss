"use client";

import { useState } from "react";

interface NumericInputProps {
  value: number | undefined;
  onChange: (value: number) => void;
  unit?: string;
  min?: number;
  max?: number;
  placeholder?: string;
}

export function NumericInput({
  value,
  onChange,
  unit = "",
  min = 0,
  max = 999,
  placeholder = "0",
}: NumericInputProps) {
  const [inputValue, setInputValue] = useState(value?.toString() || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const numValue = parseFloat(newValue);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="relative h-16 rounded-md border border-slate-300 bg-white">
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-full px-4 pr-12 text-center text-4xl font-bold text-slate-600 bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          min={min}
          max={max}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-800">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
