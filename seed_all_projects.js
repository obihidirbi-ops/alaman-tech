import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zraxysulxpmxudnmzmoy.supabase.co';
const supabaseAnonKey = 'sb_publishable_a3HXQ4YUhVnijJk71W82sw_ndGIeZSL';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ALL_PROJECTS = [
  {
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
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    gallery_urls: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
    ],
    services_used: ["إطفاء", "كاميرات", "إنذار حريق"],
    is_featured: true,
    is_published: true,
    sort_order: 1
  },
  {
    id: "proj-2",
    slug: "petrochemical-plants",
    title_ar: "أنظمة السلامة والإطفاء — مصانع بتروكيماويات",
    title_en: "Petrochemical Plant Safety Systems",
    category_id: "occupational-safety",
    client_name_ar: "مجموعة الصناعات البتروكيماوية",
    client_name_en: "Petrochemical Industries Group",
    location_ar: "المدينة الصناعية، الجبيل",
    location_en: "Industrial City, Jubail",
    year: "2024",
    status_ar: "مكتمل",
    status_en: "Completed",
    description_ar: "تجهيز مستودعات ومصانع المجمع بنظام الإطفاء الغازي FM200 وأنظمة إنذار السرقة، وتطوير خطط الإخلاء ومعدات السلامة المهنية الشاملة.",
    description_en: "Equipping warehouses with FM200 gas suppression, intrusion detection systems, PPE gear, and emergency evacuation maps.",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    gallery_urls: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
    ],
    services_used: ["إطفاء", "سلامة", "شبكات"],
    is_featured: true,
    is_published: true,
    sort_order: 2
  },
  {
    id: "proj-3",
    slug: "dammam-medical-center",
    title_ar: "مراقبة وشبكات — المركز الطبي التخصصي",
    title_en: "Dammam Medical CCTV & Network Project",
    category_id: "security-cctv-systems",
    client_name_ar: "مجموعة الرعاية الطبية",
    client_name_en: "Medical Care Group",
    location_ar: "الدمام، المنطقة الشرقية",
    location_en: "Dammam, Eastern Province",
    year: "2025",
    status_ar: "مكتمل",
    status_en: "Completed",
    description_ar: "تأسيس البنية التحتية لشبكة المعلومات للكوابل الضوئية، تركيب 180 كاميرا مراقبة دقيقة، وأنظمة النداء الصوتي ومخاطبة الجمهور للمستشفى.",
    description_en: "Structured fiber networking, installation of 180 high-def CCTV cameras, access control, and Public Address sound systems.",
    image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    gallery_urls: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"
    ],
    services_used: ["كاميرات", "شبكات", "أنظمة صوتية"],
    is_featured: true,
    is_published: true,
    sort_order: 3
  },
  {
    id: "proj-4",
    slug: "khobar-residential-complex",
    title_ar: "مجمع الأبراج السكنية — الخبر",
    title_en: "Khobar Luxury Residential Complex",
    category_id: "elevators-maintenance",
    client_name_ar: "شركة الإعمار الذهبي",
    client_name_en: "Golden Emaar Co.",
    location_ar: "حي الكورنيش، الخبر",
    location_en: "Corniche Dist, Khobar",
    year: "2024",
    status_ar: "عقد صيانة مستمر",
    status_en: "Active Maintenance Contract",
    description_ar: "تحديث وصيانة 12 مصعداً كهربائياً، وتركيب أنظمة إنذار الحريق التلقائي والتأكد من استيفاء متطلبات الدفاع المدني والتراخيص.",
    description_en: "Overhaul & annual maintenance for 12 elevators, coupled with fire alarm installation and safety compliance licensing.",
    image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    gallery_urls: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
    ],
    services_used: ["مصاعد", "إطفاء", "عقود صيانة"],
    is_featured: false,
    is_published: true,
    sort_order: 4
  }
];

async function seedProjects() {
  console.log('--- SEEDING ALL PROJECTS TO SUPABASE DB ---');
  for (const proj of ALL_PROJECTS) {
    const { error } = await supabase.from('projects').upsert(proj);
    console.log(`Upserting ${proj.id}:`, error ? `ERROR: ${error.message}` : 'SUCCESS');
  }

  const { data } = await supabase.from('projects').select('id, title_ar, image_url');
  console.log('Final projects count in DB:', data?.length);
  console.log('Projects in DB:', data);
}

seedProjects();
