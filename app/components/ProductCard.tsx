"use client";

import { createClient } from "../lib/supabase/client";
import Image from "next/image";

export default function ProductCard() {
  const supabase = createClient();

  const { data } = supabase.storage
    .from("sticker_images")
    .getPublicUrl("first_drop_stickers/bible.png");

  if (!data?.publicUrl) {
    return <div>Image not found</div>;
  }

  const bible = data.publicUrl;

  return (
    <div>
      <div>ProductCard</div>
      <div className="h-full flex items-stretch ml-[-2vw]">
        <Image
          width={100}
          height={100}
          src={bible}
          alt="Bible sticker"
          className="h-[95%] w-auto object-contain"
        />
      </div>
    </div>
  );
}
