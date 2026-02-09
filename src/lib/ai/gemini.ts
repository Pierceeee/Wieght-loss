import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserProfile } from "@/types/quiz";
import { WeeklyMealPlan } from "@/types/user";
import { AIProvider, getMealPlanPrompt, parseMealPlanResponse, getAnalysisPrompt } from "./provider";

/**
 * Google Gemini Provider Implementation
 */
export class GeminiProvider implements AIProvider {
  private client: GoogleGenerativeAI;
  private model: string;

  constructor(apiKey: string, model: string = "gemini-2.5-flash") {
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = model;
  }

  getName(): string {
    return `Google Gemini (${this.model})`;
  }

  async generateMealPlan(userProfile: UserProfile): Promise<WeeklyMealPlan> {
    const prompt = getMealPlanPrompt(userProfile);
    const isMale = userProfile.gender === "male";

    try {
      const model = this.client.getGenerativeModel({
        model: this.model,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8000,
          responseMimeType: "application/json",
        },
      });

      const expertRole = isMale
        ? "You are an expert sports nutritionist specializing in men's health and performance. You provide detailed, practical meal plans tailored to individual needs. Always respond with valid JSON only."
        : "You are an expert nutritionist specializing in PCOS management. You provide detailed, practical meal plans tailored to individual needs. Always respond with valid JSON only.";

      const systemPrompt = `${expertRole}

${prompt}`;

      const result = await model.generateContent(systemPrompt);
      const response = result.response;
      const content = response.text();

      if (!content) {
        throw new Error("Empty response from Gemini");
      }

      return parseMealPlanResponse(content);
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error(
        `Failed to generate meal plan with Gemini: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  async generateAnalysis(userProfile: UserProfile): Promise<string> {
    const prompt = getAnalysisPrompt(userProfile);
    const isMale = userProfile.gender === "male";

    try {
      const model = this.client.getGenerativeModel({
        model: this.model,
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 500,
        },
      });

      const expertRole = isMale
        ? "You are a certified men's health and fitness expert. You provide personalized, motivating analysis that helps men understand their health challenges and feel confident about solutions. Write in an encouraging, professional tone."
        : "You are a certified PCOS wellness expert and empathetic health consultant. You provide personalized, motivating analysis that helps women understand their PCOS challenges and feel hopeful about solutions. Write in a warm, supportive, professional tone.";

      const systemPrompt = `${expertRole}

${prompt}`;

      const result = await model.generateContent(systemPrompt);
      const response = result.response;
      const content = response.text();

      if (!content) {
        throw new Error("Empty response from Gemini");
      }

      return content.trim();
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error(
        `Failed to generate analysis with Gemini: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
}
