import { createClient } from "@/app/lib/supabase/server";
import ProductCard from "@/app/components/ProductCard";
import { getPublicUrl } from "@/app/lib/supabase/images/images";

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
    <div className="flex flex-wrap mt-12 border-2">
      {stickers.map((sticker) => (
        <ProductCard
          key={`${sticker.id_uuid}`}
          productImage={getPublicUrl(sticker.file_path).data.publicUrl}
          name={sticker.name}
          alt={sticker.alt}
          price={sticker.price}
        />
      ))}
    </div>
  );
}
