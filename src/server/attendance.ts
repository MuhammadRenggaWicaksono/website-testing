import { supabase } from "@/lib/supabase";

interface AttendancePayload {
  event_id: string;
  name: string;
  email: string;
  institution?: string;
  notes?: string;
}

/**
 * Mencatat kehadiran/absensi peserta baru ke event tertentu (POST Public)
 */
export async function submitAttendance(payload: AttendancePayload) {
  const { data, error } = await supabase
    .from("attendance")
    .insert([
      {
        event_id: payload.event_id,
        name: payload.name,
        email: payload.email,
        institution: payload.institution || "-",
        notes: payload.notes || "",
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Mengambil rekap daftar absensi peserta berdasarkan ID Event tertentu (GET Protected Admin)
 */
export async function getAttendanceByEventId(eventId: string) {
  const { data, error } = await supabase
    .from("attendance")
    .select("*, events(title, event_date)")
    .eq("event_id", eventId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}