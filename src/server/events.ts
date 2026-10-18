import { supabase } from "@/lib/supabase";

export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createEvent(body: any) {
  const { data, error } = await supabase
    .from("events")
    .insert([
      {
        title: body.title,
        description: body.description || "",
        event_date: body.event_date,
        location: body.location,
        status: body.status || "Akan Datang",
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}