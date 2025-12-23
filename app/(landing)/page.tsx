import ProductCard from "../components/ProductCard";
import Hero from "./(hero)/page";
import { Suspense } from "react";

import {
  flowersData,
  legoData,
  spidermanData,
  heartData,
} from "../lib/supabase/images/images";

export default function Home() {
  const products = [
    {
      name: "flowers",
      imageURL: flowersData.data.publicUrl,
      alt: "Sticker of the flowers",
    },
    {
      name: "lego",
      imageURL: legoData.data.publicUrl,
      alt: "Sticker of a lego man",
    },
    {
      name: "spiderman",
      imageURL: spidermanData.data.publicUrl,
      alt: "Sticker of a spider-man",
    },
    {
      name: "heart",
      imageURL: heartData.data.publicUrl,
      alt: "Sticker of a heart",
    },
  ];

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <Hero />
        {products.map((sticker, index) => (
          <ProductCard
            key={`${sticker.alt}-${index}`}
            productImage={sticker.imageURL}
            alt={sticker.alt}
          />
        ))}
      </Suspense>
    </div>
  );
}
