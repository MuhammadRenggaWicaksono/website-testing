import { NextRequest } from "next/server";
import { getAllNews, createNews } from "@/server/news";
import { response, errorResponse } from "@/utils/response";

// GET /api/news - Ambil semua daftar berita (Public)
export async function GET() {
  try {
    const newsList = await getAllNews();
    return response(200, "Berhasil mengambil daftar berita", newsList);
  } catch (error: any) {
    return errorResponse(500, error.message || "Gagal mengambil data berita");
  }
}

// POST /api/news - Tambah berita baru (Protected by Middleware / Bearer Token)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validasi sederhana field wajib
    if (!body.title || !body.content) {
      return errorResponse(400, "Judul (title) dan isi berita (content) wajib diisi");
    }

    const newNews = await createNews(body);
    return response(201, "Berita berhasil diterbitkan", newNews);
  } catch (error: any) {
    return errorResponse(500, error.message || "Gagal menambahkan berita baru");
  }
}