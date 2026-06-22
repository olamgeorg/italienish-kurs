import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const rawKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

// Clean up strings to avoid simple whitespace, quotes or placeholder issues
export const supabaseUrl = typeof rawUrl === 'string' ? rawUrl.trim().replace(/^['"]|['"]$/g, '') : '';
export const supabaseAnonKey = typeof rawKey === 'string' ? rawKey.trim().replace(/^['"]|['"]$/g, '') : '';

// Check if keys are actually configured, otherwise return null or guard client
export const isSupabaseConfigured = (): boolean => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) return false;
    if (
      supabaseUrl === 'https://your-supabase-project.supabase.co' ||
      supabaseUrl.includes('your-supabase-project') ||
      supabaseUrl.includes('your-supabase') ||
      supabaseUrl === 'placeholder_value' ||
      supabaseAnonKey === 'your-supabase-anon-key' ||
      supabaseAnonKey.includes('your-supabase')
    ) {
      return false;
    }
    // Must start with http:// or https://
    if (!/^https?:\/\//.test(supabaseUrl)) {
      return false;
    }
    const url = new URL(supabaseUrl);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

// Lazy creation of supabase client
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const getSupabase = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    } catch (e) {
      console.warn('Failed to initialize Supabase client:', e);
      return null;
    }
  }
  return supabaseInstance;
};

export const supabase = (() => {
  try {
    return getSupabase();
  } catch (e) {
    console.warn('Failed to load Supabase module during registration:', e);
    return null;
  }
})();
