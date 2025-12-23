"use client";

import Image from "next/image";
import React from "react";

import { motion } from "framer-motion";

import {
  bibleData,
  legoData,
  flowersData,
  luffyData,
  spidermanData,
  heartData,
  clockData,
  jesusData,
} from "@/app/lib/supabase/images/images";

const photos = [
  { src: bibleData.data.publicUrl, alt: "Bible sticker" },
  { src: legoData.data.publicUrl, alt: "Lego sticker" },
  { src: flowersData.data.publicUrl, alt: "Flowers Sticker" },
  { src: luffyData.data.publicUrl, alt: "Luffy One piece Anime sticker" },
  { src: spidermanData.data.publicUrl, alt: "Spiderman sticker" },
  { src: heartData.data.publicUrl, alt: "Heart sticker" },
  { src: clockData.data.publicUrl, alt: "Clock sticker" },
  { src: jesusData.data.publicUrl, alt: "Jesus sticker" },
];

export default function InfiniteScrollingLogosAnimation() {
  return (
    <div className="flex relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-gradient-to-r before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:bg-gradient-to-l after:to-transparent after:content-[''] h-32 items-center lg:hidden">
      <motion.div
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
        initial={{ translateX: 0 }}
        animate={{ translateX: "-50%" }}
        className="flex flex-none gap-4 pr-4"
      >
        {[...new Array(2)].fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {photos.map(({ src, alt }) => (
              <Image
                key={alt}
                src={src}
                alt={alt}
                className="h-32 w-auto flex-none"
                width={200}
                height={200}
              />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export function InfiniteScrollingLogosAnimationVertical() {
  return (
    <div className="hidden lg:flex relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:w-full before:h-10 before:bg-gradient-to-b before:to-transparent before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-10 after:bg-gradient-to-t after:to-transparent after:content-[''] w-60 h-full items-start">
      <motion.div
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
        }}
        initial={{ translateY: 0 }}
        animate={{ translateY: "-50%" }}
        className="flex flex-none flex-col gap-4 pb-4"
      >
        {[...new Array(2)].fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {photos.map(({ src, alt }) => (
              <Image
                key={alt}
                src={src}
                alt={alt}
                className="w-60 h-auto flex-none"
                width={200}
                height={200}
              />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
