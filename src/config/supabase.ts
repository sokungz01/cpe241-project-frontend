import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, ANON_KEY);

export async function UploadImage(file: File): Promise<string> {
  if (!file) throw new Error("Error! File not found ");
  const fileName =
    String(new Date().getTime()) +
    String(Math.floor(100000 + Math.random() * 900000));
  const { error } = await supabase.storage
    .from("avatarImage")
    .upload(fileName, file);

  if (error) throw new Error("Error! Can't upload image");

  const { data } = supabase.storage.from("avatarImage").getPublicUrl(fileName);
  const url = data.publicUrl;

  return url;
}
