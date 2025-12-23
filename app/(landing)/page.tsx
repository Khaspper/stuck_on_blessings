import ProductCard from "../components/ProductCard";
import Hero from "./(hero)/page";
import { Suspense } from "react";

import {
  legoData,
  smiskiData,
  phoneData,
  flowersData,
  luffyData,
  spidermanData,
  heartData,
  clockData,
  jesusData,
  pochaccoData,
} from "../lib/supabase/images/images";

export default function Home() {
  const products = [
    {
      name: "lego",
      imageURL: legoData.data.publicUrl,
      alt: "Sticker of a lego man",
      price: "$4.00",
    },
    {
      name: "smiski",
      imageURL: smiskiData.data.publicUrl,
      alt: "Sticker of a smiski",
      price: "$4.00",
    },
    {
      name: "phone",
      imageURL: phoneData.data.publicUrl,
      alt: "Sticker of a phone call from jesus",
      price: "$4.00",
    },
    {
      name: "flowers",
      imageURL: flowersData.data.publicUrl,
      alt: "Sticker of the flowers",
      price: "$4.00",
    },
    {
      name: "luffy",
      imageURL: luffyData.data.publicUrl,
      alt: "Sticker of luffy",
      price: "$4.00",
    },
    {
      name: "spiderman",
      imageURL: spidermanData.data.publicUrl,
      alt: "Sticker of spider-man",
      price: "$4.00",
    },
    {
      name: "heart",
      imageURL: heartData.data.publicUrl,
      alt: "Sticker of a heart",
      price: "$4.00",
    },
    {
      name: "clock",
      imageURL: clockData.data.publicUrl,
      alt: "Sticker of a clock",
      price: "$4.00",
    },
    {
      name: "jesus",
      imageURL: jesusData.data.publicUrl,
      alt: "Jesus Loves you so matcha",
      price: "$4.00",
    },
    {
      name: "pochacco",
      imageURL: pochaccoData.data.publicUrl,
      alt: "Pochacco as a nurse",
      price: "$4.00",
    },
  ];

  return (
    <div className="px-5 sm:px-10">
      <Suspense fallback={<p>Loading...</p>}>
        <Hero />
        <div className="flex flex-wrap gap-4 mt-12">
          {products.map((sticker, index) => (
            <ProductCard
              key={`${sticker.name}-${index}`}
              productImage={sticker.imageURL}
              name={sticker.name}
              alt={sticker.alt}
              price={sticker.price}
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
