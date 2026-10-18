import { supabase } from '@/lib/supabase';

interface FeedbackPayload {
  sender_name?: string;
  sender_email?: string;
  message: string;
}

// Ambil semua data feedback (Diurutkan dari yang terbaru)
export async function getAllFeedbacks() {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Tambahkan feedback baru ke database (POST Public)
export async function createFeedback(payload: FeedbackPayload) {
  const { data, error } = await supabase
    .from('feedback')
    .insert([
      {
        sender_name: payload.sender_name || 'Anonim',   // ✅ Sesuaikan ke sender_name
        sender_email: payload.sender_email || null,   // ✅ Sesuaikan ke sender_email
        message: payload.message,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Supabase Feedback Insert Error:', error.message);
    throw error;
  }

  return data;
}