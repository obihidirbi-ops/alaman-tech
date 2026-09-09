import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zraxysulxpmxudnmzmoy.supabase.co';
const supabaseAnonKey = 'sb_publishable_a3HXQ4YUhVnijJk71W82sw_ndGIeZSL';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runTest() {
  console.log('--- TESTING SUPABASE CONNECTION & OPERATIONS ---');

  // Test 1: Fetch site_settings
  try {
    const { data, error } = await supabase.from('site_settings').select('*');
    console.log('1. site_settings SELECT result:', { data, error });
  } catch (e) {
    console.error('1. site_settings SELECT catch:', e);
  }

  // Test 2: Fetch projects
  try {
    const { data, error } = await supabase.from('projects').select('*');
    console.log('2. projects SELECT result:', { count: data?.length, data, error });
  } catch (e) {
    console.error('2. projects SELECT catch:', e);
  }

  // Test 3: Test upsert to projects table
  try {
    const testProject = {
      id: "proj-1",
      slug: "test-project-slug",
      title_ar: "اختبار مشروعات السلامة",
      title_en: "Test Project Title",
      category_id: "fire-fighting-systems",
      client_name_ar: "عميل تجريبي",
      client_name_en: "Test Client",
      location_ar: "الرياض",
      location_en: "Riyadh",
      year: "2025",
      status_ar: "مكتمل",
      status_en: "Completed",
      description_ar: "وصف تجريبي للمشروع",
      description_en: "Test description",
      image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      is_published: true
    };

    const { data, error } = await supabase.from('projects').upsert(testProject);
    console.log('3. projects UPSERT test result:', { data, error });
  } catch (e) {
    console.error('3. projects UPSERT catch:', e);
  }

  // Test 4: Check Storage Buckets
  try {
    const { data, error } = await supabase.storage.listBuckets();
    console.log('4. Storage Buckets list result:', { data, error });
  } catch (e) {
    console.error('4. Storage Buckets catch:', e);
  }
}

runTest();
