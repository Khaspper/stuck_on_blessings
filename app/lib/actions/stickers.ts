"use server";

import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type TSticker = {
  id_uuid: string;
  name: string;
  price: string;
  file_path: string;
  alt: string;
  created_at?: string;
  updated_at?: string;
};

export async function getAllStickers(): Promise<TSticker[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stickers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching stickers:", error);
    throw new Error("Failed to fetch stickers");
  }

  return data || [];
}

export async function getStickerById(id: string): Promise<TSticker | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stickers")
    .select("*")
    .eq("id_uuid", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching sticker:", error);
    throw new Error("Failed to fetch sticker");
  }

  return data;
}

export async function createSticker(
  sticker: Omit<TSticker, "id_uuid" | "created_at" | "updated_at">
): Promise<TSticker> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stickers")
    .insert([sticker])
    .select()
    .single();

  if (error) {
    console.error("Error creating sticker:", error);
    throw new Error("Failed to create sticker");
  }

  revalidatePath("/admin");
  return data;
}

export async function updateSticker(
  id: string,
  updates: Partial<Omit<TSticker, "id_uuid" | "created_at" | "updated_at">>
): Promise<TSticker> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stickers")
    .update(updates)
    .eq("id_uuid", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating sticker:", error);
    throw new Error("Failed to update sticker");
  }

  revalidatePath("/admin");
  revalidatePath("/");
  return data;
}

export async function deleteSticker(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("stickers").delete().eq("id_uuid", id);

  if (error) {
    console.error("Error deleting sticker:", error);
    throw new Error("Failed to delete sticker");
  }

  revalidatePath("/admin");
  revalidatePath("/");
}
