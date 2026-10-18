import { NextRequest } from "next/server";
import { getEvents, createEvent } from "@/server/events";
import { response, errorResponse } from "@/utils/response";

// GET /api/events - Ambil daftar semua event/kegiatan (Public)
export async function GET() {
  try {
    const events = await getEvents();
    return response(200, "Berhasil mengambil daftar event", events);
  } catch (error: any) {
    return errorResponse(500, error.message || "Gagal mengambil data event");
  }
}

// POST /api/events - Tambah event baru (Protected by Middleware / Bearer Token)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validasi field wajib
    if (!body.title || !body.event_date || !body.location) {
      return errorResponse(
        400,
        "Judul (title), tanggal (event_date), dan lokasi (location) wajib diisi"
      );
    }

    const newEvent = await createEvent(body);
    return response(201, "Event baru berhasil dibuat", newEvent);
  } catch (error: any) {
    return errorResponse(500, error.message || "Gagal membuat event baru");
  }
}