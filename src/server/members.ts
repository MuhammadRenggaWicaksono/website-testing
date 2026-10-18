import { supabase } from "@/lib/supabase";

export async function GetMember() {
  const { data, error } = await supabase.from("members").select("*");
  if (error) throw error;
  return data;
}

export async function PostMember(body: any) {
  const { data, error } = await supabase.from("members").insert([body]).select().single();
  if (error) throw error;
  return data;
}

export async function GetMemberById(id: string) {
  const { data, error } = await supabase.from("members").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

export async function PutMemberByid(id: string, body: any) {
  const { data, error } = await supabase.from("members").update(body).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function DeleteMemberById(id: string) {
  const { error } = await supabase.from("members").delete().eq("id", id);
  if (error) throw error;
  return true;
}