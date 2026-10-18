import { NextRequest } from "next/server";
import { submitAttendance, getAttendanceByEventId } from "@/server/attendance";
import { response, errorResponse } from "@/utils/response";

// GET /api/attendance?eventId={id} - Rekap absensi event tertentu (Protected)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return errorResponse(400, "Parameter eventId wajib disertakan");
    }

    const records = await getAttendanceByEventId(eventId);
    return response(200, "Berhasil mengambil rekap absensi", records);
  } catch (error: any) {
    return errorResponse(500, error.message || "Gagal mengambil rekap absensi");
  }
}

// POST /api/attendance - Submit absensi peserta (Public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.event_id || !body.name || !body.email) {
      return errorResponse(400, "event_id, nama, dan email wajib diisi");
    }

    const attendance = await submitAttendance(body);
    return response(201, "Absensi berhasil dicatat", attendance);
  } catch (error: any) {
    return errorResponse(500, error.message || "Gagal mencatat absensi");
  }
}