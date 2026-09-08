import { createClient } from '@supabase/supabase-js';

// Supabase URL & Anon Key configuration for Alaman Al-Awal Tech Co.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zraxysulxpmxudnmzmoy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_a3HXQ4YUhVnijJk71W82sw_ndGIeZSL';

export const isSupabaseConfigured = true;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Uploads a file (Image or PDF) directly to Supabase Storage bucket.
 * Returns the public URL if successful, or null if storage bucket is not active.
 */
export const uploadFileToSupabase = async (file, preferredBucket = 'images') => {
  if (!supabase) return null;
  try {
    const fileExt = file.name ? file.name.split('.').pop() : 'png';
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Automatically try preferred bucket, singular 'image', plural 'images', and 'uploads'
    const bucketsToTry = preferredBucket === 'images' 
      ? ['image', 'images', 'uploads'] 
      : [preferredBucket, 'uploads', 'image', 'images'];

    for (const b of bucketsToTry) {
      const { data, error } = await supabase.storage.from(b).upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from(b).getPublicUrl(filePath);
        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl;
        }
      }
    }
    return null;
  } catch (err) {
    console.warn('Supabase Storage catch error:', err);
    return null;
  }
};
