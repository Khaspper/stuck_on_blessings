import ProductCard from "../components/ProductCard";
import Hero from "./(hero)/page";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <Hero />
        <ProductCard />
      </Suspense>
    </div>
  );
}
