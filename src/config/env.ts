import { ValidationError } from "@/domain/errors";

interface AppEnv {
  nodeEnv: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

const env: AppEnv = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

export function getEnv() {
  return env;
}

export function requireEnv(name: keyof AppEnv) {
  const value = env[name];
  if (!value) {
    throw new ValidationError(`Missing required environment variable: ${name}`);
  }

  return value;
}
