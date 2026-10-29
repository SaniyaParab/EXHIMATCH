-- ========================================================
--           EXHIMATCH AI — SUPABASE POSTGRESQL SCHEMA
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends auth.users or standalone mock)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('buyer', 'exhibitor', 'organizer')),
  phone TEXT,
  company_name TEXT,
  job_role TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  business_category TEXT,
  preferred_categories TEXT[] DEFAULT '{}',
  budget_min NUMERIC DEFAULT 0,
  budget_max NUMERIC DEFAULT 10000000,
  preferred_location TEXT,
  max_travel_distance INT DEFAULT 200,
  website TEXT,
  about TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. EXHIBITIONS
CREATE TABLE IF NOT EXISTS public.exhibitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  venue TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT DEFAULT 'India',
  latitude NUMERIC,
  longitude NUMERIC,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  categories TEXT[] NOT NULL DEFAULT '{}',
  banner_image TEXT,
  logo_image TEXT,
  total_halls INT DEFAULT 3,
  total_stalls INT DEFAULT 75,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HALLS
CREATE TABLE IF NOT EXISTS public.halls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exhibition_id UUID NOT NULL REFERENCES public.exhibitions(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g. "Hall A - Heavy Machinery"
  code TEXT NOT NULL, -- e.g. "A"
  floor INT DEFAULT 1,
  total_capacity INT DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXHIBITORS (Company Details)
CREATE TABLE IF NOT EXISTS public.exhibitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  business_category TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  website TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  year_established INT,
  rating NUMERIC(2,1) DEFAULT 4.8,
  review_count INT DEFAULT 12,
  verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. STALLS
CREATE TABLE IF NOT EXISTS public.stalls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exhibition_id UUID NOT NULL REFERENCES public.exhibitions(id) ON DELETE CASCADE,
  hall_id UUID REFERENCES public.halls(id) ON DELETE CASCADE,
  stall_number TEXT NOT NULL, -- e.g. "A24"
  hall_code TEXT NOT NULL,    -- "A", "B", "C"
  row_num INT NOT NULL,
  col_num INT NOT NULL,
  size TEXT NOT NULL DEFAULT '3m x 3m', -- e.g. '3m x 3m', '6m x 3m', '9m x 6m'
  category TEXT NOT NULL,
  base_price NUMERIC DEFAULT 85000,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'pending', 'occupied', 'recommended')),
  current_exhibitor_id UUID REFERENCES public.exhibitors(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exhibitor_id UUID NOT NULL REFERENCES public.exhibitors(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price_min NUMERIC NOT NULL,
  price_max NUMERIC NOT NULL,
  currency TEXT DEFAULT 'INR',
  moq INT DEFAULT 1,
  specifications JSONB DEFAULT '{}',
  image_url TEXT,
  brochure_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. EXHIBITION APPLICATIONS
CREATE TABLE IF NOT EXISTS public.exhibition_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exhibition_id UUID NOT NULL REFERENCES public.exhibitions(id) ON DELETE CASCADE,
  exhibitor_id UUID NOT NULL REFERENCES public.exhibitors(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

-- 8. STALL REQUESTS
CREATE TABLE IF NOT EXISTS public.stall_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exhibition_id UUID NOT NULL REFERENCES public.exhibitions(id) ON DELETE CASCADE,
  exhibitor_id UUID NOT NULL REFERENCES public.exhibitors(id) ON DELETE CASCADE,
  stall_id UUID NOT NULL REFERENCES public.stalls(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  notes TEXT
);

-- 9. BUYER REQUIREMENTS
CREATE TABLE IF NOT EXISTS public.buyer_requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  budget_min NUMERIC NOT NULL,
  budget_max NUMERIC NOT NULL,
  location TEXT NOT NULL,
  max_distance INT DEFAULT 200,
  preferred_date DATE,
  additional_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. APPOINTMENTS
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id TEXT UNIQUE NOT NULL, -- e.g. "EXH-2026-00124"
  buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exhibitor_id UUID NOT NULL REFERENCES public.exhibitors(id) ON DELETE CASCADE,
  exhibition_id UUID NOT NULL REFERENCES public.exhibitions(id) ON DELETE CASCADE,
  stall_id UUID REFERENCES public.stalls(id) ON DELETE SET NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  purpose TEXT,
  requirement_notes TEXT,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled', 'rescheduled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. QUALIFIED LEADS
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exhibitor_id UUID NOT NULL REFERENCES public.exhibitors(id) ON DELETE CASCADE,
  exhibition_id UUID NOT NULL REFERENCES public.exhibitions(id) ON DELETE CASCADE,
  stall_id UUID REFERENCES public.stalls(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  buyer_company TEXT,
  buyer_name TEXT,
  buyer_email TEXT,
  buyer_phone TEXT,
  budget_range TEXT,
  buyer_location TEXT,
  match_percentage INT NOT NULL,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Meeting Scheduled', 'Converted', 'Closed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exhibitor_id UUID NOT NULL REFERENCES public.exhibitors(id) ON DELETE CASCADE,
  exhibition_id UUID REFERENCES public.exhibitions(id) ON DELETE SET NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'appointment', 'lead', 'stall')),
  is_read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. SAVED ITEMS
CREATE TABLE IF NOT EXISTS public.saved_exhibitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exhibition_id UUID NOT NULL REFERENCES public.exhibitions(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(buyer_id, exhibition_id)
);

CREATE TABLE IF NOT EXISTS public.saved_exhibitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exhibitor_id UUID NOT NULL REFERENCES public.exhibitors(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(buyer_id, exhibitor_id)
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exhibitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Public read access policies for discovery
CREATE POLICY "Public read for exhibitions" ON public.exhibitions FOR SELECT USING (true);
CREATE POLICY "Public read for halls" ON public.halls FOR SELECT USING (true);
CREATE POLICY "Public read for stalls" ON public.stalls FOR SELECT USING (true);
CREATE POLICY "Public read for exhibitors" ON public.exhibitors FOR SELECT USING (true);
CREATE POLICY "Public read for products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public read for reviews" ON public.reviews FOR SELECT USING (true);

-- User-specific policies
CREATE POLICY "Profiles update own" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Profiles read all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Appointments read own" ON public.appointments FOR SELECT USING (
  buyer_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR
  exhibitor_id = (SELECT id FROM public.exhibitors WHERE profile_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
);
CREATE POLICY "Leads read own" ON public.leads FOR SELECT USING (
  exhibitor_id = (SELECT id FROM public.exhibitors WHERE profile_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
);

-- 15. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- 16. SUPABASE STORAGE BUCKETS (Run in Supabase Dashboard / SQL Editor)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('company-logos', 'company-logos', true) ON CONFLICT DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;

