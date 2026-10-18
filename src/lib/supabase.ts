import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// 1. Client untuk Publik / Client-side (Aman digunakan di Browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Client untuk Server / Admin (Gunakan fallback anonKey jika dipanggil di Client)
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey
);