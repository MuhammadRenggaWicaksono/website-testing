import { NextRequest } from "next/server";
import { GetMember, PostMember } from "@/server/members";
import { response, errorResponse } from "@/utils/response";

// GET /api/members - Ambil semua daftar member (Public)
export async function GET() {
  try {
    const members = await GetMember();
    return response(200, "Berhasil mengambil daftar member", members);
  } catch (error: any) {
    return errorResponse(500, error.message || "Gagal mengambil data member");
  }
}

// POST /api/members - Tambah member baru (Protected by Middleware)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.role) {
      return errorResponse(400, "Nama (name) dan jabatan (role) wajib diisi");
    }

    const newMember = await PostMember(body);
    return response(201, "Member berhasil ditambahkan", newMember);
  } catch (error: any) {
    return errorResponse(500, error.message || "Gagal menambahkan member");
  }
}