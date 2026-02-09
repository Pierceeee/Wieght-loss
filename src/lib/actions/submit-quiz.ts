"use server";

import { createFunnelSubmission, updateFunnelSubmission, isSupabaseConfigured } from "@/lib/supabase";
import { FunnelStatus } from "@/lib/supabase";

/**
 * Server Action: Create a new funnel submission when user starts the quiz
 * 
 * @param sessionId - The unique session ID from the client
 * @param answers - The quiz responses
 * @returns Success status and submission ID
 */
export async function startFunnelSubmission(
  sessionId: string,
  answers: Record<string, unknown>
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (!isSupabaseConfigured()) {
      console.warn("Supabase not configured, skipping submission creation");
      return {
        success: false,
        error: "Database not configured",
      };
    }

    const submission = await createFunnelSubmission(answers, sessionId);
    
    return {
      success: true,
      id: submission.id,
    };
  } catch (error) {
    console.error("Error creating funnel submission:", error);
    
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Server Action: Update funnel submission status
 * 
 * @param sessionId - The submission ID
 * @param status - The new status
 * @param email - Optional email when status is completed
 * @returns Success status
 */
export async function updateFunnelStatus(
  sessionId: string,
  status: FunnelStatus,
  email?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!isSupabaseConfigured()) {
      console.warn("Supabase not configured, skipping status update");
      return {
        success: false,
        error: "Database not configured",
      };
    }

    const updates: { status: FunnelStatus; email?: string } = { status };
    
    if (email) {
      updates.email = email;
    }

    await updateFunnelSubmission(sessionId, updates);
    
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating funnel status:", error);
    
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Server Action: Save email and mark as completed
 * 
 * @param sessionId - The submission ID
 * @param email - User's email address
 * @returns Success status
 */
export async function completeFunnelWithEmail(
  sessionId: string,
  email: string
): Promise<{ success: boolean; error?: string }> {
  return updateFunnelStatus(sessionId, "completed", email);
}

/**
 * Server Action: Mark funnel as purchased
 * 
 * @param sessionId - The submission ID
 * @returns Success status
 */
export async function markFunnelPurchased(
  sessionId: string
): Promise<{ success: boolean; error?: string }> {
  return updateFunnelStatus(sessionId, "purchased");
}
