"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NumericInputProps {
  value: number | undefined;
  onChange: (value: number) => void;
  unit?: string;
  unitOptions?: string[];
  min?: number;
  max?: number;
  placeholder?: string;
}

export function NumericInput({
  value,
  onChange,
  unit = "",
  unitOptions,
  min = 0,
  max = 999,
  placeholder = "0",
}: NumericInputProps) {
  const [selectedUnit, setSelectedUnit] = useState(unit);
  const [inputValue, setInputValue] = useState(value?.toString() || "");

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value.toString());
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const numValue = parseFloat(newValue);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
    }
  };

  const handleIncrement = () => {
    const currentValue = value || 0;
    if (currentValue < max) {
      const newValue = currentValue + 1;
      setInputValue(newValue.toString());
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    const currentValue = value || 0;
    if (currentValue > min) {
      const newValue = currentValue - 1;
      setInputValue(newValue.toString());
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full py-8">
      {/* Unit selector */}
      {unitOptions && unitOptions.length > 1 && (
        <div className="flex gap-2 p-1.5 bg-muted rounded-2xl">
          {unitOptions.map((u) => (
            <button
              key={u}
              onClick={() => setSelectedUnit(u)}
              className={cn(
                "px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200",
                selectedUnit === u
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {u}
            </button>
          ))}
        </div>
      )}

      {/* Main input area */}
      <div className="flex items-center gap-6">
        <button
          className={cn(
            "w-16 h-16 rounded-2xl border-2 border-border bg-card flex items-center justify-center text-3xl font-semibold transition-all duration-200",
            "hover:border-primary/50 hover:bg-primary/5 active:scale-95",
            (value || 0) <= min && "opacity-40 cursor-not-allowed"
          )}
          onClick={handleDecrement}
          disabled={(value || 0) <= min}
        >
          −
        </button>

        <div className="relative">
          <input
            type="number"
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            className={cn(
              "w-40 h-24 text-center font-display text-5xl sm:text-6xl font-semibold bg-transparent",
              "border-2 border-border rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20",
              "transition-all duration-200",
              "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            )}
            min={min}
            max={max}
          />
          {selectedUnit && (
            <span className="absolute -right-12 top-1/2 -translate-y-1/2 text-xl font-medium text-muted-foreground">
              {selectedUnit}
            </span>
          )}
        </div>

        <button
          className={cn(
            "w-16 h-16 rounded-2xl border-2 border-border bg-card flex items-center justify-center text-3xl font-semibold transition-all duration-200",
            "hover:border-primary/50 hover:bg-primary/5 active:scale-95",
            (value || 0) >= max && "opacity-40 cursor-not-allowed"
          )}
          onClick={handleIncrement}
          disabled={(value || 0) >= max}
        >
          +
        </button>
      </div>

      {/* Range indicator */}
      <p className="text-sm text-muted-foreground">
        Enter a value between {min} and {max}
      </p>
    </div>
  );
}
