import { createClient } from '@supabase/supabase-js';

// Supabase URL & Anon Key configuration for Alaman Al-Awal Tech Co.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zraxysulxpmxudnmzmoy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_a3HXQ4YUhVnijJk71W82sw_ndGIeZSL';

export const isSupabaseConfigured = true;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
