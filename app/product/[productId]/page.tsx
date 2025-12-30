import { Suspense } from "react";
import { createClient } from "@/app/lib/supabase/server";
import { getPublicUrl } from "@/app/lib/supabase/images/images";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";

type TProductInformation = {
  stickerImage: string;
  stickerName: string;
  stickerPrice: string;
  stickerAlt: string;
};

export default function Product({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading... Product</p>}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;
  const productInfo = await getStickerInformation(productId);

  if (!productInfo) {
    return <p>Product not found</p>;
  }

  const { stickerImage, stickerName, stickerPrice, stickerAlt } = productInfo;

  return (
    <div className="px-5 sm:px-10 flex flex-col">
      <Image
        src={stickerImage}
        alt={stickerAlt}
        width={141}
        height={200}
        className="h-[75%] w-auto object-contain"
      />
      <p className="font-mont text-xs mt-4">
        StuckOn<span className="text-[#e48bb0]">B</span>lessi
        <span className="text-[#e48bb0]">n</span>gs
      </p>
      <h1 className="text-4xl mt-4 mb-4">Sticker - {stickerName}</h1>
      <p className="font-mont mb-4">${stickerPrice}.00</p>

      <QuantitySelector productId={productId} price={stickerPrice} />
    </div>
  );
}

async function getStickerInformation(
  productId: string
): Promise<TProductInformation | null> {
  const supabase = await createClient();
  const { data: sticker, error: stickerError } = await supabase
    .from("stickers")
    .select("*")
    .eq("id_uuid", productId)
    .maybeSingle();

  if (stickerError || !sticker) {
    console.error("Error:", stickerError);
    return null;
  }

  const stickerImage = getPublicUrl(sticker.file_path).data.publicUrl;
  const stickerName = sticker.name;
  const stickerPrice = sticker.price;
  const stickerAlt = sticker.alt;

  return { stickerImage, stickerName, stickerPrice, stickerAlt };
}
