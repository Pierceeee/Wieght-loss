import { createClient } from "@supabase/supabase-js";

// Funnel submission status enum
export type FunnelStatus = "started" | "completed" | "purchased";

// Types for our database tables
export interface Database {
  public: {
    Tables: {
      funnel_submissions: {
        Row: {
          id: string;
          created_at: string;
          answers: Record<string, unknown>;
          ai_analysis: string | null;
          status: FunnelStatus;
          email: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          answers: Record<string, unknown>;
          ai_analysis?: string | null;
          status?: FunnelStatus;
          email?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          answers?: Record<string, unknown>;
          ai_analysis?: string | null;
          status?: FunnelStatus;
          email?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          created_at?: string;
        };
      };
      quiz_responses: {
        Row: {
          id: string;
          user_id: string | null;
          session_id: string;
          responses: Record<string, unknown>;
          bmi: number | null;
          target_weight: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          session_id: string;
          responses: Record<string, unknown>;
          bmi?: number | null;
          target_weight?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          session_id?: string;
          responses?: Record<string, unknown>;
          bmi?: number | null;
          target_weight?: number | null;
          created_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          status: string | null;
          plan: string | null;
          current_period_end: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          status?: string | null;
          plan?: string | null;
          current_period_end?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          status?: string | null;
          plan?: string | null;
          current_period_end?: string | null;
          created_at?: string;
        };
      };
      meal_plans: {
        Row: {
          id: string;
          user_id: string;
          plan_data: Record<string, unknown>;
          week_number: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan_data: Record<string, unknown>;
          week_number?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan_data?: Record<string, unknown>;
          week_number?: number | null;
          created_at?: string;
        };
      };
    };
  };
}

// Create Supabase client for server-side operations
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Create Supabase client for browser-side operations
export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// Helper functions for funnel_submissions table
export async function createFunnelSubmission(
  answers: Record<string, unknown>,
  sessionId: string
): Promise<Database["public"]["Tables"]["funnel_submissions"]["Row"]> {
  const supabase = createServerClient();
  
  const { data, error } = await (supabase
    .from("funnel_submissions") as any)
    .insert({
      id: sessionId,
      answers,
      status: "started" as FunnelStatus,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Database["public"]["Tables"]["funnel_submissions"]["Row"];
}

export async function updateFunnelSubmission(
  id: string,
  updates: {
    ai_analysis?: string;
    status?: FunnelStatus;
    email?: string;
  }
): Promise<Database["public"]["Tables"]["funnel_submissions"]["Row"]> {
  const supabase = createServerClient();
  
  const { data, error } = await (supabase
    .from("funnel_submissions") as any)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Database["public"]["Tables"]["funnel_submissions"]["Row"];
}

export async function getFunnelSubmission(
  id: string
): Promise<Database["public"]["Tables"]["funnel_submissions"]["Row"]> {
  const supabase = createServerClient();
  
  const { data, error } = await (supabase
    .from("funnel_submissions") as any)
    .select()
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Database["public"]["Tables"]["funnel_submissions"]["Row"];
}
