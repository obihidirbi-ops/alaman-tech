import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zraxysulxpmxudnmzmoy.supabase.co';
const supabaseAnonKey = 'sb_publishable_a3HXQ4YUhVnijJk71W82sw_ndGIeZSL';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUpdateImage() {
  console.log('--- TESTING PROJECT IMAGE UPDATE IN SUPABASE DB ---');

  // Test update on proj-1 with a fresh public image URL
  const updatedProj = {
    id: "proj-1",
    slug: "riyadh-towers",
    title_ar: "مشروع إطفاء وإنذار — أبراج الرياض",
    title_en: "Riyadh Towers Fire & Safety Project",
    category_id: "fire-fighting-systems",
    client_name_ar: "شركة التطوير العقاري",
    client_name_en: "Real Estate Development Co.",
    location_ar: "حي العليا، الرياض",
    location_en: "Olaya Dist, Riyadh",
    year: "2025",
    status_ar: "مكتمل وتسليم نهائي",
    status_en: "Completed & Handed Over",
    description_ar: "تنفيذ وتوريد وتركيب كامل أنظمة مكافحة الحريق المائية والمضخات ومباني المراقبة CCTV والإنذار المعنون لبرج تجاري مكون من 28 طابقاً مع اعتماد كافة المخططات لدى الدفاع المدني.",
    description_en: "Turnkey fire protection system, addressable fire alarm, CCTV security, and Civil Defense approvals for a 28-story commercial tower.",
    image_url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
    gallery_urls: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
    ],
    services_used: ["إطفاء", "كاميرات", "إنذار حريق"],
    is_featured: true,
    is_published: true,
    sort_order: 1
  };

  const { error } = await supabase.from('projects').upsert(updatedProj);
  console.log('Upsert result:', error ? `ERROR: ${error.message}` : 'SUCCESS!');

  // Verify DB read
  const { data } = await supabase.from('projects').select('*').eq('id', 'proj-1').single();
  console.log('Read back from DB for proj-1:', {
    id: data?.id,
    title_ar: data?.title_ar,
    image_url: data?.image_url,
    gallery_urls: data?.gallery_urls
  });
}

testUpdateImage();
