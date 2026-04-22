import { createClient } from "@supabase/supabase-js";
import { getEnv } from "@/config/env";

const { supabaseAnonKey, supabaseUrl } = getEnv();

export const supabase =
  supabaseAnonKey && supabaseUrl
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
