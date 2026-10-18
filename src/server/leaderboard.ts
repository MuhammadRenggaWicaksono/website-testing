import { supabase } from "@/lib/supabase";

// Ambil ranking anggota diurutkan dari skor tertinggi
export async function getLeaderboard() {
  try {
    const { data, error } = await supabase
      .from("leaderboard")
      .select("id, member_id, score, created_at, updated_at, members(name, role, photo_url)")
      .order("score", { ascending: false });

    if (error) {
      console.error("Supabase Leaderboard Error:", error.message);
      // Fallback jika relasi belum diset di Supabase
      const { data: fallbackData } = await supabase
        .from("leaderboard")
        .select("*")
        .order("score", { ascending: false });

      return fallbackData || [];
    }

    return data || [];
  } catch (err: any) {
    console.error("Unexpected Leaderboard Error:", err.message);
    return [];
  }
}

// Update / Insert skor poin anggota
export async function updateLeaderboardScore(memberId: string, score: number) {
  const { data, error } = await supabase
    .from("leaderboard")
    .upsert(
      { member_id: memberId, score, updated_at: new Date().toISOString() },
      { onConflict: "member_id" }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}