"use client";

import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { QuizState, UserProfile } from "@/types/quiz";

interface QuizStore extends QuizState {
  gender: "male" | "female" | null;
  // Actions
  setGender: (gender: "male" | "female") => void;
  setResponse: (questionId: string, value: string | string[] | number) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetQuiz: () => void;
  getResponse: (questionId: string) => string | string[] | number | undefined;
  getUserProfile: () => UserProfile | null;
  isComplete: () => boolean;
}

const initialState: QuizState = {
  currentStep: 1,
  responses: {},
  sessionId: "",
};

export const useQuizStore = create<QuizStore>()(
  (set, get) => ({
    ...initialState,
    sessionId: typeof window !== "undefined" ? uuidv4() : "",
    gender: null,

    setGender: (gender) => set({ gender }),

    setResponse: (questionId, value) =>
      set((state) => ({
        responses: { ...state.responses, [questionId]: value },
      })),

    setCurrentStep: (step) => set({ currentStep: step }),

    nextStep: () =>
      set((state) => ({
        currentStep: Math.min(state.currentStep + 1, 21),
      })),

    prevStep: () =>
      set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 1),
      })),

    resetQuiz: () =>
      set({
        ...initialState,
        sessionId: uuidv4(),
      }),

    getResponse: (questionId) => get().responses[questionId],

    getUserProfile: () => {
      const { responses, gender } = get();
      
      // Check if we have enough data
      if (!responses["age"] || !responses["current-weight"] || !responses["height"]) {
        return null;
      }

      return {
        gender: gender || "female",
        age: responses["age"] as number,
        height: responses["height"] as number,
        currentWeight: responses["current-weight"] as number,
        targetWeight: (responses["target-weight"] as number) || (responses["current-weight"] as number),
        bodyType: (responses["body-type"] as string) || "",
        goals: (responses["goals"] as string[]) || [],
        symptoms: (responses["symptoms"] as string[]) || [],
        activityLevel: (responses["activity-level"] as string) || "",
        exercisePreference: (responses["exercise-preference"] as string) || "",
        hydration: (responses["hydration"] as string) || "",
        badHabits: (responses["bad-habits"] as string[]) || [],
        ingredients: (responses["ingredients"] as string[]) || [],
        periodRegularity: (responses["period-regularity"] as string) || "",
        moodIssues: (responses["mood-issues"] as string) || "",
        weightLossHistory: (responses["weight-loss-history"] as string) || "",
        energyLevels: (responses["energy-levels"] as string) || "",
        fitnessLevel: (responses["fitness-level"] as string) || "",
      };
    },

    isComplete: () => {
      const { responses, gender } = get();
      
      // Common required fields for both genders
      const commonFields = [
        "symptoms",
        "mood-issues",
        "weight-loss-history",
        "energy-levels",
        "goals",
        "body-type",
        "height",
        "current-weight",
        "target-weight",
        "age",
        "activity-level",
        "exercise-preference",
        "hydration",
        "bad-habits",
      ];
      
      // Gender-specific required fields
      const genderFields = gender === "male" 
        ? ["fitness-level"] 
        : ["period-regularity"];
      
      const requiredFields = [...commonFields, ...genderFields];
      const extendedRequiredFields = [...requiredFields, "ingredients"];
      return extendedRequiredFields.every((field) => responses[field] !== undefined);
    },
  })
);
