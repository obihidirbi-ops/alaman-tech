-- ================================================================
-- SQL SCHEMA FOR ALAMAN AL-AWAL TECHNOLOGY CO. (SUPABASE DATABASE)
-- ================================================================

-- 1. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  short_desc_ar TEXT NOT NULL,
  short_desc_en TEXT NOT NULL,
  full_desc_ar TEXT NOT NULL,
  full_desc_en TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Flame',
  image_url TEXT NOT NULL,
  features_ar TEXT[] DEFAULT '{}',
  features_en TEXT[] DEFAULT '{}',
  systems_ar TEXT[] DEFAULT '{}',
  systems_en TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  category_id TEXT NOT NULL,
  client_name_ar TEXT,
  client_name_en TEXT,
  location_ar TEXT NOT NULL,
  location_en TEXT NOT NULL,
  year TEXT NOT NULL,
  status_ar TEXT NOT NULL DEFAULT 'مكتمل',
  status_en TEXT NOT NULL DEFAULT 'Completed',
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  image_url TEXT NOT NULL,
  gallery_urls TEXT[] DEFAULT '{}',
  services_used TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Clients Table
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  category TEXT DEFAULT 'Corporate',
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Contact Messages & Quote Requests Table
CREATE TABLE IF NOT EXISTS public.inbox_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('contact', 'quote')),
  full_name TEXT NOT NULL,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_slug TEXT,
  project_type TEXT,
  project_location TEXT,
  message TEXT NOT NULL,
  file_url TEXT,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Completed', 'Archived')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  hero_title_ar TEXT NOT NULL,
  hero_title_en TEXT NOT NULL,
  hero_subtitle_ar TEXT NOT NULL,
  hero_subtitle_en TEXT NOT NULL,
  about_text_ar TEXT NOT NULL,
  about_text_en TEXT NOT NULL,
  vision_ar TEXT NOT NULL,
  vision_en TEXT NOT NULL,
  mission_ar TEXT NOT NULL,
  mission_en TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  address_ar TEXT NOT NULL,
  address_en TEXT NOT NULL,
  working_hours_ar TEXT NOT NULL,
  working_hours_en TEXT NOT NULL,
  stat_years INT DEFAULT 15,
  stat_projects INT DEFAULT 350,
  stat_clients INT DEFAULT 180,
  stat_services INT DEFAULT 12,
  facebook_url TEXT,
  twitter_url TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inbox_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public Insert Inbox" ON public.inbox_messages FOR INSERT WITH CHECK (true);

-- Admin Full Access Policies
CREATE POLICY "Admin All Services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Clients" ON public.clients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Inbox" ON public.inbox_messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
