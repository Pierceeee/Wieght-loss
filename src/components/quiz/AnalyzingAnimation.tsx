"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const analysisSteps = [
  { id: "bmi", label: "Calculating BMI" },
  { id: "metabolic", label: "Analyzing metabolic rate" },
  { id: "hormones", label: "Evaluating hormone profile" },
  { id: "plan", label: "Building your plan" },
];

export function AnalyzingAnimation() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // 5-second animation
    const duration = 5000;
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += increment;
      setProgress(Math.min(currentProgress, 100));

      // Update current step based on progress
      if (currentProgress > 25 && currentProgress <= 50) {
        setCurrentStep(1);
      } else if (currentProgress > 50 && currentProgress <= 75) {
        setCurrentStep(2);
      } else if (currentProgress > 75) {
        setCurrentStep(3);
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          router.push("/timeline");
        }, 600);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center max-w-md mx-auto">
      {/* Animated rings */}
      <div className="relative mb-12">
        <div className="w-32 h-32 rounded-full border-4 border-muted flex items-center justify-center">
          <div 
            className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
            style={{ animationDuration: "1.5s" }}
          />
          <div 
            className="absolute inset-2 rounded-full border-4 border-accent/50 border-b-transparent animate-spin"
            style={{ animationDuration: "2s", animationDirection: "reverse" }}
          />
          <span className="font-display text-3xl font-bold tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl -z-10 animate-pulse" />
      </div>

      {/* Status text */}
      <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-2">
        Analyzing your answers
      </h2>
      <p className="text-muted-foreground mb-10">
        Creating your personalized plan...
      </p>

      {/* Step indicators */}
      <div className="w-full space-y-3">
        {analysisSteps.map((step, index) => {
          const isComplete = index < currentStep || (index === currentStep && progress > (index + 1) * 25);
          const isActive = index === currentStep;
          
          return (
            <div
              key={step.id}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${
                isComplete
                  ? "bg-accent/10 border border-accent/20"
                  : isActive
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-muted/50 border border-transparent"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isComplete
                    ? "bg-accent text-accent-foreground"
                    : isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isComplete ? (
                  <Check className="w-5 h-5" strokeWidth={3} />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              <span
                className={`font-medium transition-colors duration-300 ${
                  isComplete || isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
              {isActive && !isComplete && (
                <div className="ml-auto flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
