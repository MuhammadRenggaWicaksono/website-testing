import { NextRequest } from "next/server";
import { GetMemberById, PutMemberByid, DeleteMemberById } from "@/server/members";
import { response, errorResponse } from "@/utils/response";

interface Props {
  params: Promise<{ id: string }>;
}

// GET /api/members/[id] - Ambil detail member berdasar ID (Public)
export async function GET(req: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    const member = await GetMemberById(id);

    if (!member) {
      return errorResponse(404, "Data member tidak ditemukan");
    }

    return response(200, "Berhasil mengambil detail member", member);
  } catch (error: any) {
    return errorResponse(500, error.message || "Terjadi kesalahan server");
  }
}

// PUT /api/members/[id] - Update data member (Protected by Middleware)
export async function PUT(req: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    const body = await req.json();

    const updatedMember = await PutMemberByid(id, body);
    return response(200, "Data member berhasil diperbarui", updatedMember);
  } catch (error: any) {
    return errorResponse(500, error.message || "Gagal memperbarui data member");
  }
}

// DELETE /api/members/[id] - Hapus member (Protected by Middleware)
export async function DELETE(req: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    await DeleteMemberById(id);

    return response(200, "Data member berhasil dihapus", null);
  } catch (error: any) {
    return errorResponse(500, error.message || "Gagal menghapus data member");
  }
}