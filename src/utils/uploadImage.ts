import { supabaseAdmin } from "@/lib/supabase";

// ─── Konfigurasi Global Bucket Supabase Storage ───────────────────────────────
const STORAGE_BUCKET = "images";
 
function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback untuk HTTP (non-secure context) atau browser lama
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Mengunggah file gambar ke Supabase Storage.
 *
 * Validasi Keamanan:
 * - Mengecek MIME type file (hanya menerima image/jpeg, image/png, image/webp)
 * - Membatasi ukuran maksimal file (2 MB)
 *
 * Penamaan Unik:
 * - Secara otomatis mengubah nama file asli menjadi UUID acak menggunakan
 *   crypto.randomUUID() untuk menghindari bentrokan nama file (file collision)
 *   di dalam bucket Supabase.
 *
 * @param file File gambar yang akan diunggah
 * @returns Public URL gambar yang berhasil diunggah
 */
export async function uploadImage(file: File): Promise<string> {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

  // Validasi Tipe File (MIME Type)
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Format gambar tidak didukung. Gunakan JPEG, PNG, atau WEBP.");
  }

  // Validasi Ukuran File
  if (file.size > MAX_SIZE) {
    throw new Error("Ukuran gambar maksimal 2 MB.");
  }


  // Dapatkan ekstensi file dari nama asli
  const fileExt = file.name.split(".").pop()?.toLowerCase() || "png";
  const fileName = `${generateUUID()}.${fileExt}`;

  // 1. Upload file ke Supabase Storage Bucket
  const { error: uploadError } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Gagal mengunggah gambar: ${uploadError.message}`);
  }

  // 2. Dapatkan Public URL resmi dari Supabase Storage
  const { data } = supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(fileName);

  if (!data?.publicUrl) {
    throw new Error("Gagal mengambil Public URL gambar.");
  }

  // Mengembalikan URL lengkap (Contoh: https://xxx.supabase.co/storage/v1/object/public/images/uuid.png)
  return data.publicUrl;
}

/**
 * Menghapus file gambar dari Supabase Storage berdasarkan Nama File atau Public URL.
 *
 * @param fileUrlOrName Nama file (UUID) atau Public URL lengkap gambar
 */
export async function deleteImage(fileUrlOrName: string): Promise<void> {
  if (!fileUrlOrName) return;

  // Jika input berupa Public URL lengkap, ekstrak nama filenya saja
  const fileName = fileUrlOrName.split("/").pop();

  if (!fileName) return;

  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .remove([fileName]);

  if (error) {
    throw new Error(`Gagal menghapus gambar: ${error.message}`);
  }
}