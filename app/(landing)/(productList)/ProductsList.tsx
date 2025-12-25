import { createClient } from "@/app/lib/supabase/server";
import ProductCard from "@/app/components/ProductCard";
import { getPublicUrl } from "@/app/lib/supabase/images/images";

// import {
//   legoData,
//   smiskiData,
//   phoneData,
//   flowersData,
//   luffyData,
//   spidermanData,
//   heartData,
//   clockData,
//   jesusData,
//   pochaccoData,
// } from "@/app/lib/supabase/images/images";

// type TSticker = {
//   id: number;
//   created_at: string;
//   name: string;
//   alt: string;
//   price: number;
//   sold_out: boolean;
//   inventory: number;
//   numbers_sold: number;
//   file_path: string;
// };

export default async function ProductsList() {
  const supabase = await createClient();

  //TODO: Add RLS IN SUPABASE AFTER YOU HAVE BRI AND JELLY LOGIN
  const { data: stickers, error: stickerError } = await supabase
    .from("stickers")
    .select("*");

  console.log("data", stickers);

  if (stickerError) {
    console.error("Error:", stickerError);
    return null;
  }

  // const products = [
  //   {
  //     name: "lego",
  //     imageURL: legoData.data.publicUrl,
  //     alt: "Sticker of a lego man",
  //     price: "$4.00",
  //   },
  //   {
  //     name: "smiski",
  //     imageURL: smiskiData.data.publicUrl,
  //     alt: "Sticker of a smiski",
  //     price: "$4.00",
  //   },
  //   {
  //     name: "phone",
  //     imageURL: phoneData.data.publicUrl,
  //     alt: "Sticker of a phone call from jesus",
  //     price: "$4.00",
  //   },
  //   {
  //     name: "flowers",
  //     imageURL: flowersData.data.publicUrl,
  //     alt: "Sticker of the flowers",
  //     price: "$4.00",
  //   },
  //   {
  //     name: "luffy",
  //     imageURL: luffyData.data.publicUrl,
  //     alt: "Sticker of luffy",
  //     price: "$4.00",
  //   },
  //   {
  //     name: "spiderman",
  //     imageURL: spidermanData.data.publicUrl,
  //     alt: "Sticker of spider-man",
  //     price: "$4.00",
  //   },
  //   {
  //     name: "heart",
  //     imageURL: heartData.data.publicUrl,
  //     alt: "Sticker of a heart",
  //     price: "$4.00",
  //   },
  //   {
  //     name: "clock",
  //     imageURL: clockData.data.publicUrl,
  //     alt: "Sticker of a clock",
  //     price: "$4.00",
  //   },
  //   {
  //     name: "jesus",
  //     imageURL: jesusData.data.publicUrl,
  //     alt: "Jesus Loves you so matcha",
  //     price: "$4.00",
  //   },
  //   {
  //     name: "pochacco",
  //     imageURL: pochaccoData.data.publicUrl,
  //     alt: "Pochacco as a nurse",
  //     price: "$4.00",
  //   },
  // ];

  return (
    <div className="flex flex-wrap gap-4 mt-12">
      {stickers.map((sticker) => (
        <ProductCard
          key={`${sticker.id}`}
          productImage={getPublicUrl(sticker.file_path).data.publicUrl}
          name={sticker.name}
          alt={sticker.alt}
          price={sticker.price}
        />
      ))}
    </div>
  );
}
