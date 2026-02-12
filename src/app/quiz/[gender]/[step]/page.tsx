"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  SingleSelect,
  MultiSelect,
  NumericInput,
  HeightInput,
  VisualSelect,
  Interstitial,
  IngredientSelect,
  ScienceList,
  GoalProjection,
  PersonalSummary,
} from "@/components/quiz";
import { getQuestionByStep, getTotalSteps } from "@/lib/quiz-data";
import { useQuizStore } from "@/hooks/useQuizState";
import { startFunnelSubmission } from "@/lib/actions/submit-quiz";
import { lbsToKg } from "@/lib/bmi";
import { ArrowLeft } from "lucide-react";

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

  const [submissionCreated, setSubmissionCreated] = useState(false);

  useEffect(() => {
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

  if (!question || step < 1 || step > totalSteps) {
    router.push(`/quiz/${gender}/1`);
    return null;
  }

  const currentValue = getResponse(question.id);

  const handleNext = () => {
    if (step === totalSteps) {
      router.push("/generating");
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
    if (question.id === "current-weight" || question.id === "target-weight") {
      const lbsValue = Number(value);
      if (!Number.isNaN(lbsValue)) {
        setResponse(question.id, lbsToKg(lbsValue));
        setResponse(`${question.id}-lbs`, lbsValue);
      }
    } else {
      setResponse(question.id, value);
    }

    if (question.type === "single-select" || question.type === "visual-select") {
      setTimeout(() => {
        router.push(`/quiz/${gender}/${step + 1}`);
      }, 280);
    }

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
            min={question.validation?.min}
            max={question.validation?.max}
          />
        );

      case "height-input":
        return (
          <HeightInput
            valueCm={currentValue as number | undefined}
            onChange={(v) => handleValueChange(v)}
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

      case "ingredient-select":
        return (
          <IngredientSelect
            question={question}
            value={(currentValue as string[]) || []}
            onChange={(v) => handleValueChange(v)}
          />
        );

      case "science-list":
        return <ScienceList />;

      case "goal-projection":
        return <GoalProjection />;

      case "personal-summary":
        return <PersonalSummary />;

      default:
        return null;
    }
  };

  const showFooterButton = question.type !== "single-select" && question.type !== "visual-select";

  return (
    <div className="min-h-screen flex flex-col bg-[#eaecf0]">
      {/* Header */}
      <header className="flex-shrink-0">
        <div className="h-1.5 bg-[#efc7aa]">
          <div
            className="h-full bg-[#c47e1b] transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
        <div className="relative px-4 py-3 bg-[#f4f5f7] border-b border-slate-200">
          <button
            onClick={handleBack}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </button>
          <div className="text-center">
            <p className="font-bold text-3xl leading-none text-slate-900">PCOS Plan</p>
          </div>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-600">
            {step}/{totalSteps}
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 pt-8 pb-4">
          <div className="max-w-md mx-auto flex flex-col min-h-full">
            {question.question && (
              <div className="text-center mb-5">
                <h1 className="text-[34px] leading-tight font-extrabold tracking-tight text-slate-900 mb-2">
                  {question.question}
                </h1>
                {question.subtitle && (
                  <p className="text-slate-600 text-sm">
                    {question.subtitle}
                  </p>
                )}
              </div>
            )}

            <div className="flex-1">
              {renderQuestionContent()}
            </div>
          </div>
        </div>

        {showFooterButton && (
          <footer className="px-4 pb-4">
            <div className="max-w-md mx-auto">
              <button
                onClick={handleNext}
                disabled={!canContinue()}
                className="w-full h-12 font-semibold rounded-md bg-black text-white hover:bg-slate-900 disabled:bg-slate-300 disabled:text-slate-100 disabled:cursor-not-allowed transition-colors"
              >
                Continue
              </button>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}
