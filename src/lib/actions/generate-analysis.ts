"use server";

import { getAIProvider, isAIConfigured } from "@/lib/ai";
import { updateFunnelSubmission } from "@/lib/supabase";
import { UserProfile } from "@/types/quiz";

/**
 * Server Action: Generate AI analysis for a user's quiz responses
 * This is called during the "Analyzing" step to create personalized content
 * 
 * @param sessionId - The funnel submission ID
 * @param userProfile - The user's quiz responses converted to a profile
 * @returns The generated analysis text
 */
export async function generateAnalysis(
  sessionId: string,
  userProfile: UserProfile
): Promise<{ success: boolean; analysis?: string; error?: string }> {
  try {
    // Check if AI is configured
    if (!isAIConfigured()) {
      return {
        success: false,
        error: "AI provider is not configured. Please set the required API keys.",
      };
    }

    // Get AI provider and generate analysis
    const provider = getAIProvider();
    console.log(`Generating analysis for session ${sessionId} using ${provider.getName()}`);

    const analysis = await provider.generateAnalysis(userProfile);

    // Save the analysis to the database
    await updateFunnelSubmission(sessionId, {
      ai_analysis: analysis,
    });

    console.log(`Analysis generated and saved for session ${sessionId}`);

    return {
      success: true,
      analysis,
    };
  } catch (error) {
    console.error("Error generating analysis:", error);
    
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    
    return {
      success: false,
      error: `Failed to generate analysis: ${message}`,
    };
  }
}

