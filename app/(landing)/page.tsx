import Hero from "./(hero)/page";
import ProductsList from "./(productList)/ProductsList";
import Values from "./(values)/values";
import { Suspense } from "react";
import {
  HeroSkeleton,
  ProductsListSkeleton,
  ValuesSkeleton,
} from "./components/SkeletonLoaders";

export default function Home() {
  return (
    <div className="px-5 sm:px-10">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<ProductsListSkeleton />}>
        <ProductsList />
      </Suspense>
      <Suspense fallback={<ValuesSkeleton />}>
        <Values />
      </Suspense>
    </div>
  );
}
