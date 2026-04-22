import { createClient } from '@supabase/supabase-js';

function readRequiredEnv(name: 'NEXT_PUBLIC_SUPABASE_URL' | 'NEXT_PUBLIC_SUPABASE_ANON_KEY'): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const supabase = createClient(
  readRequiredEnv('NEXT_PUBLIC_SUPABASE_URL'),
  readRequiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
);
