import { createClient } from "@/app/lib/supabase/server";
import ProductCard from "@/app/components/ProductCard";
import { getPublicUrl } from "@/app/lib/supabase/images/images";
import Link from "next/link";

export default async function ProductsList() {
  const supabase = await createClient();

  //TODO: Add RLS IN SUPABASE AFTER YOU HAVE BRI AND JELLY LOGIN
  const { data: stickers, error: stickerError } = await supabase
    .from("stickers")
    .select("*");

  if (stickerError) {
    console.error("Error:", stickerError);
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-12 lg:justify-items-center lg:w-fit lg:mx-auto height lg:gap-4">
      {stickers.map((sticker) => (
        <Link href={`product/${sticker.id_uuid}`} key={`${sticker.id_uuid}`}>
          <ProductCard
            stickerImage={getPublicUrl(sticker.file_path).data.publicUrl}
            stickerName={sticker.name}
            stickerPrice={sticker.price}
            stickerAlt={sticker.alt}
          />
        </Link>
      ))}
    </div>
  );
}
