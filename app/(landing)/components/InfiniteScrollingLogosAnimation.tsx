"use client";

import Image from "next/image";
import React from "react";

import { motion } from "framer-motion";
import create from "@/public/imgs/create.png";
import home from "@/public/imgs/home.png";
import house from "@/public/imgs/house.png";
import newListing from "@/public/imgs/new-listing-image.png";

// Ignore this error
const photos: Array<{ src: any; alt: string }> = [
  { src: create, alt: "Acme Logo" },
  { src: home, alt: "Acme Logo" },
  { src: house, alt: "Acme Logo" },
  { src: newListing, alt: "Acme Logo" },
];

export default function InfiniteScrollingLogosAnimation() {
  return (
    <div className="container p-5">
      <h2 className="text-center text-xl text-white/70 my-5">
        Trusted by the world&apos;s most innovative companies
      </h2>
      <div className="flex relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-gradient-to-r before:from-zinc-950 before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:bg-gradient-to-l after:from-zinc-950 after:to-transparent after:content-['']">
        <motion.div
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
          initial={{ translateX: 0 }}
          animate={{ translateX: "-50%" }}
          className="flex flex-none gap-16 pr-16"
        >
          {[...new Array(2)].fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {photos.map(({ src, alt }) => (
                <Image
                  key={alt}
                  src={src}
                  alt={alt}
                  className="h-8 w-auto flex-none"
                />
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
