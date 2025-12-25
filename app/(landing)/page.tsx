import Hero from "./(hero)/page";
import ProductsList from "./(productList)/ProductsList";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="px-5 sm:px-10">
      <Suspense fallback={<p>Loading...</p>}>
        <Hero />
        <Suspense fallback={<p>Loading products...</p>}>
          <ProductsList />
        </Suspense>
      </Suspense>
    </div>
  );
}
