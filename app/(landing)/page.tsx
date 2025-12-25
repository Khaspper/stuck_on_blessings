import Hero from "./(hero)/page";
import ProductsList from "./(productList)/ProductsList";
import Values from "./(values)/values";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="px-5 sm:px-10">
      <Suspense fallback={<p>Loading... Hero</p>}>
        <Hero />
      </Suspense>
      <Suspense fallback={<p>Loading products...</p>}>
        <ProductsList />
      </Suspense>
      <Suspense fallback={<p>Loading Values...</p>}>
        <Values />
      </Suspense>
    </div>
  );
}
