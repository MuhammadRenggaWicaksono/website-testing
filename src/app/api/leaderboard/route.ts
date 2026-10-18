import { NextRequest } from "next/server";
import { getLeaderboard, updateLeaderboardScore } from "@/server/leaderboard";
import { response, errorResponse } from "@/utils/response";

// GET /api/leaderboard - Ambil daftar papan peringkat (Public)
export async function GET() {
  try {
    const leaderboardData = await getLeaderboard();
    
    // Kembalikan status 200 OK (hijau) dengan data array (walaupun [])
    return response(200, "Berhasil mengambil data leaderboard", leaderboardData);
  } catch (error: any) {
    return errorResponse(500, error.message || "Gagal mengambil data leaderboard");
  }
}

// PUT /api/leaderboard - Update skor/poin anggota (Protected by Middleware)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { member_id, score } = body;

    if (!member_id || score === undefined) {
      return errorResponse(400, "member_id dan score wajib diisi");
    }

    const updated = await updateLeaderboardScore(member_id, Number(score));
    return response(200, "Skor leaderboard berhasil diperbarui", updated);
  } catch (error: any) {
    return errorResponse(500, error.message || "Gagal memperbarui skor leaderboard");
  }
}