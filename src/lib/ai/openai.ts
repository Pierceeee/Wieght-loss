import OpenAI from "openai";
import { UserProfile } from "@/types/quiz";
import { WeeklyMealPlan } from "@/types/user";
import { AIProvider, getMealPlanPrompt, parseMealPlanResponse, getAnalysisPrompt } from "./provider";

/**
 * OpenAI Provider Implementation
 */
export class OpenAIProvider implements AIProvider {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model: string = "gpt-4o") {
    this.client = new OpenAI({ apiKey });
    this.model = model;
  }

  getName(): string {
    return `OpenAI (${this.model})`;
  }

  async generateMealPlan(userProfile: UserProfile): Promise<WeeklyMealPlan> {
    const prompt = getMealPlanPrompt(userProfile);
    const isMale = userProfile.gender === "male";
    
    const systemPrompt = isMale
      ? "You are an expert sports nutritionist specializing in men's health and performance. You provide detailed, practical meal plans tailored to individual needs. Always respond with valid JSON only."
      : "You are an expert nutritionist specializing in PCOS management. You provide detailed, practical meal plans tailored to individual needs. Always respond with valid JSON only.";

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 8000,
        response_format: { type: "json_object" },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("Empty response from OpenAI");
      }

      return parseMealPlanResponse(content);
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw new Error(
        `Failed to generate meal plan with OpenAI: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  async generateAnalysis(userProfile: UserProfile): Promise<string> {
    const prompt = getAnalysisPrompt(userProfile);
    const isMale = userProfile.gender === "male";
    
    const systemPrompt = isMale
      ? "You are a certified men's health and fitness expert. You provide personalized, motivating analysis that helps men understand their health challenges and feel confident about solutions. Write in an encouraging, professional tone."
      : "You are a certified PCOS wellness expert and empathetic health consultant. You provide personalized, motivating analysis that helps women understand their PCOS challenges and feel hopeful about solutions. Write in a warm, supportive, professional tone.";

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("Empty response from OpenAI");
      }

      return content.trim();
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw new Error(
        `Failed to generate analysis with OpenAI: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
}
