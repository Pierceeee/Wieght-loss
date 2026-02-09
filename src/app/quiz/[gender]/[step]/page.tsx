"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  SingleSelect,
  MultiSelect,
  NumericInput,
  VisualSelect,
  Interstitial,
  AnalyzingAnimation,
} from "@/components/quiz";
import { getQuestionByStep, getTotalSteps } from "@/lib/quiz-data";
import { useQuizStore } from "@/hooks/useQuizState";
import { startFunnelSubmission } from "@/lib/actions/submit-quiz";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function QuizStepPage() {
  const router = useRouter();
  const params = useParams();
  const step = parseInt(params.step as string, 10);
  const gender = params.gender as "male" | "female";

  const {
    setResponse,
    setCurrentStep,
    getResponse,
    sessionId,
    responses,
    setGender,
  } = useQuizStore();

  const [isClient, setIsClient] = useState(false);
  const [submissionCreated, setSubmissionCreated] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentStep(step);
    // Set gender in store
    if (gender) {
      setGender(gender);
    }
  }, [step, setCurrentStep, gender, setGender]);

  // Create initial funnel submission when user starts the quiz (step 1)
  useEffect(() => {
    if (step === 1 && sessionId && !submissionCreated) {
      startFunnelSubmission(sessionId, { ...responses, gender })
        .then((result) => {
          if (result.success) {
            console.log("Funnel submission created:", result.id);
            setSubmissionCreated(true);
          } else {
            console.warn("Failed to create funnel submission:", result.error);
          }
        })
        .catch((error) => {
          console.error("Error creating funnel submission:", error);
        });
    }
  }, [step, sessionId, responses, submissionCreated, gender]);

  const question = getQuestionByStep(step, gender);
  const totalSteps = getTotalSteps(gender);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!question || step < 1 || step > totalSteps) {
    router.push(`/quiz/${gender}/1`);
    return null;
  }

  // Handle Analyzing Step (Step 20) with Animation
  if (question.type === "interstitial" && question.id === "processing") {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
        <AnalyzingAnimation />
      </div>
    );
  }

  const currentValue = getResponse(question.id);

  const handleNext = () => {
    if (step === totalSteps) {
      router.push("/timeline");
    } else {
      router.push(`/quiz/${gender}/${step + 1}`);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      router.push(`/quiz/${gender}/${step - 1}`);
    } else {
      router.push("/");
    }
  };

  const handleValueChange = (value: string | string[] | number) => {
    setResponse(question.id, value);
  };

  const canContinue = () => {
    if (question.type === "interstitial") return true;
    if (!question.required) return true;
    if (currentValue === undefined || currentValue === null) return false;
    if (Array.isArray(currentValue) && currentValue.length === 0) return false;
    if (typeof currentValue === "string" && currentValue === "") return false;
    return true;
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case "single-select":
        return (
          <SingleSelect
            options={question.options || []}
            value={currentValue as string | undefined}
            onChange={(v) => handleValueChange(v)}
          />
        );

      case "multi-select":
        return (
          <MultiSelect
            options={question.options || []}
            value={(currentValue as string[]) || []}
            onChange={(v) => handleValueChange(v)}
          />
        );

      case "numeric-input":
        return (
          <NumericInput
            value={currentValue as number | undefined}
            onChange={(v) => handleValueChange(v)}
            unit={question.unit}
            unitOptions={question.unitOptions}
            min={question.validation?.min}
            max={question.validation?.max}
          />
        );

      case "visual-select":
        return (
          <VisualSelect
            options={question.options || []}
            value={currentValue as string | undefined}
            onChange={(v) => handleValueChange(v)}
          />
        );

      case "interstitial":
        return question.content ? (
          <Interstitial
            title={question.content.title}
            description={question.content.description}
            highlight={question.content.highlight}
            image={question.content.image}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8]">
      {/* Header */}
      <header className="flex-shrink-0 px-4 sm:px-8 py-4 sm:py-6 bg-white/80 backdrop-blur-sm border-b border-slate-200/50">
        <div className="flex items-center gap-4 max-w-3xl mx-auto">
          <button
            onClick={handleBack}
            className="p-2.5 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          
          <div className="flex-1 flex items-center gap-4">
            <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-slate-900 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
            <span className="text-sm font-bold text-slate-500 tabular-nums min-w-[60px] text-right">
              {step}/{totalSteps}
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 sm:py-12">
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            {/* Question Title */}
            {question.type !== "interstitial" && question.question && (
              <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 mb-3">
                  {question.question}
                </h1>
                {question.subtitle && (
                  <p className="text-slate-500 text-base sm:text-lg">
                    {question.subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Question Content */}
            <div className="flex-1 flex items-start justify-center">
              <div className="w-full">
                {renderQuestionContent()}
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <footer className="flex-shrink-0 px-4 sm:px-8 pb-6 sm:pb-8 pt-4 bg-gradient-to-t from-[#f0f4f8] via-[#f0f4f8] to-transparent">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleNext}
              disabled={!canContinue()}
              className="w-full h-14 sm:h-16 text-base sm:text-lg font-bold rounded-full
                       bg-slate-900 text-white
                       hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5
                       disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed
                       transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Continue
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
