"use client";

import { useMemo, useState } from "react";
import { cmToFeet, feetToCm } from "@/lib/bmi";
import { cn } from "@/lib/utils";

interface HeightInputProps {
  valueCm?: number;
  onChange: (valueCm: number) => void;
}

type HeightUnit = "ft" | "cm";

export function HeightInput({ valueCm, onChange }: HeightInputProps) {
  const defaultFromCm = useMemo(() => {
    if (!valueCm) return { feet: 5, inches: 4 };
    return cmToFeet(valueCm);
  }, [valueCm]);

  const [unit, setUnit] = useState<HeightUnit>("ft");
  const [feet, setFeet] = useState<number>(defaultFromCm.feet);
  const [inches, setInches] = useState<number>(defaultFromCm.inches);
  const [cm, setCm] = useState<number>(valueCm ? Math.round(valueCm) : 163);

  const applyFeetInches = (nextFeet: number, nextInches: number) => {
    const safeFeet = Number.isFinite(nextFeet) ? Math.max(0, nextFeet) : 0;
    const safeInches = Number.isFinite(nextInches) ? Math.max(0, Math.min(11, nextInches)) : 0;
    setFeet(safeFeet);
    setInches(safeInches);
    onChange(Math.round(feetToCm(safeFeet, safeInches)));
  };

  const applyCm = (nextCm: number) => {
    const safeCm = Number.isFinite(nextCm) ? Math.max(80, Math.min(250, nextCm)) : 80;
    setCm(safeCm);
    onChange(safeCm);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="w-fit mx-auto p-1 rounded-md border border-slate-300 bg-white mb-4">
        <button
          className={cn(
            "px-7 py-1.5 text-xs font-semibold rounded",
            unit === "ft" ? "bg-black text-white" : "text-slate-700"
          )}
          onClick={() => setUnit("ft")}
        >
          ft
        </button>
        <button
          className={cn(
            "px-7 py-1.5 text-xs font-semibold rounded",
            unit === "cm" ? "bg-black text-white" : "text-slate-700"
          )}
          onClick={() => setUnit("cm")}
        >
          cm
        </button>
      </div>

      {unit === "ft" ? (
        <div className="grid grid-cols-2 gap-2">
          <div className="relative h-12 rounded-md border border-slate-300 bg-white">
            <input
              type="number"
              min={0}
              value={feet}
              onChange={(event) => applyFeetInches(Number(event.target.value), inches)}
              className="w-full h-full px-3 pr-8 text-center text-2xl font-bold text-slate-600 bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-700">ft</span>
          </div>

          <div className="relative h-12 rounded-md border border-slate-300 bg-white">
            <input
              type="number"
              min={0}
              max={11}
              value={inches}
              onChange={(event) => applyFeetInches(feet, Number(event.target.value))}
              className="w-full h-full px-3 pr-8 text-center text-2xl font-bold text-slate-600 bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-700">in</span>
          </div>
        </div>
      ) : (
        <div className="relative h-12 rounded-md border border-slate-300 bg-white">
          <input
            type="number"
            min={80}
            max={250}
            value={cm}
            onChange={(event) => applyCm(Number(event.target.value))}
            className="w-full h-full px-3 pr-10 text-center text-2xl font-bold text-slate-600 bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-700">cm</span>
        </div>
      )}
    </div>
  );
}

