import { Suspense } from "react";
import { createClient } from "@/app/lib/supabase/server";
import { getPublicUrl } from "@/app/lib/supabase/images/images";
import Image from "next/image";
import Link from "next/link";
import QuantitySelector from "./QuantitySelector";
import ProductCard from "@/app/components/ProductCard";

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

  // Fetch related products (excluding current product)
  const relatedProducts = await getRelatedProducts(productId);

  return (
    <>
      <div className="px-5 sm:px-10 flex flex-col sm:flex-row justify-center mt-10 gap-12">
        <Image
          src={stickerImage}
          alt={stickerAlt}
          width={141}
          height={200}
          className="h-auto w-[75%] max-w-[20rem] md:max-w-[25rem] object-contain self-center"
        />
        <div className="flex flex-col justify-center">
          <p className="font-mont text-xs mt-4">
            StuckOn<span className="text-[#e48bb0]">B</span>lessi
            <span className="text-[#e48bb0]">n</span>gs
          </p>
          <h1 className="text-4xl mt-4 mb-4">Sticker - {stickerName}</h1>
          <p className="font-mont mb-4">${stickerPrice}.00</p>
          <QuantitySelector productId={productId} price={stickerPrice} />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="px-5 sm:px-10 mt-16 mb-8">
          <h2 className="text-3xl mb-6">You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:justify-items-center lg:w-fit lg:mx-auto gap-4">
            {relatedProducts.map((sticker) => (
              <Link href={`/product/${sticker.id_uuid}`} key={sticker.id_uuid}>
                <ProductCard
                  stickerImage={getPublicUrl(sticker.file_path).data.publicUrl}
                  stickerName={sticker.name}
                  stickerPrice={sticker.price}
                  stickerAlt={sticker.alt}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
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

async function getRelatedProducts(currentProductId: string, limit: number = 4) {
  const supabase = await createClient();
  const { data: stickers, error: stickerError } = await supabase
    .from("stickers")
    .select("*")
    .neq("id_uuid", currentProductId);

  if (stickerError) {
    console.error("Error fetching related products:", stickerError);
    return [];
  }

  if (!stickers || stickers.length === 0) {
    return [];
  }

  // Shuffle array using Fisher-Yates algorithm
  const shuffled = [...stickers];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return the first `limit` items
  return shuffled.slice(0, limit);
}
