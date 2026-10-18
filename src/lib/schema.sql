-- ==============================================================================
-- SCHEMA SQL UNTUK WEBSITE PROFIL UKM DEVELOPER STUDENT CLUB (DSC)
-- Database: PostgreSQL / Supabase
-- Updated: Oktober 2026
-- ==============================================================================

-- 1. TABEL MEMBERS (Pengurus & Anggota UKM DSC)
-- Catatan: Digunakan oleh modul Members dan Papan Peringkat (Leaderboard)
CREATE TABLE IF NOT EXISTS public.members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    photo_url TEXT,
    social_links JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABEL NEWS (Berita & Pengumuman Komunitas)
CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255) DEFAULT 'Admin DSC',
    cover_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABEL EVENTS (Jadwal Kegiatan & Workshop)
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'Akan Datang', -- Pilihan: 'Akan Datang', 'Berlangsung', 'Selesai'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABEL ATTENDANCE (Absensi & Replikasi Peserta Event)
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    institution VARCHAR(255) DEFAULT '-',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABEL FEEDBACK (Aspirasi & Masukan Pengunjung Landing Page)
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_name VARCHAR(255) DEFAULT 'Anonim',
    sender_email VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TABEL LEADERBOARD (Papan Peringkat & Skor Poin Anggota)
-- Berelasi dengan tabel members via Foreign Key (member_id)
CREATE TABLE IF NOT EXISTS public.leaderboard (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
    score INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_member_leaderboard UNIQUE (member_id)
);


-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) & POLICY CONFIGURATION
-- ==============================================================================

-- Aktifkan RLS di seluruh tabel
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Policy Pembacaan Publik (Read-Only)
CREATE POLICY "Allow public read members" ON public.members FOR SELECT USING (true);
CREATE POLICY "Allow public read news" ON public.news FOR SELECT USING (true);
CREATE POLICY "Allow public read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public read feedback" ON public.feedback FOR SELECT USING (true);
CREATE POLICY "Allow public read leaderboard" ON public.leaderboard FOR SELECT USING (true);

-- Policy Pengiriman Publik (Insert)
CREATE POLICY "Allow public insert feedback" ON public.feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert attendance" ON public.attendance FOR INSERT WITH CHECK (true);

-- Policy Penuh untuk Service Role / Admin Backend
CREATE POLICY "Allow full access members" ON public.members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access news" ON public.news FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access events" ON public.events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access attendance" ON public.attendance FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access feedback" ON public.feedback FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access leaderboard" ON public.leaderboard FOR ALL USING (true) WITH CHECK (true);