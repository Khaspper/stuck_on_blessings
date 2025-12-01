"use client";

import Image from "next/image";
import React from "react";

import { motion } from "framer-motion";
import bible from "@/public/imgs/bible.png";
import lego from "@/public/imgs/lego.png";
import flowers from "@/public/imgs/flowers.png";
import luffy from "@/public/imgs/luffy.png";
import spiderman from "@/public/imgs/spiderman.png";
import heart from "@/public/imgs/heart.png";
import clock from "@/public/imgs/clock.png";
import jesus from "@/public/imgs/jesus.png";

const photos = [
  { src: bible, alt: "Bible sticker" },
  { src: lego, alt: "Lego sticker" },
  { src: flowers, alt: "Flowers Sticker" },
  { src: luffy, alt: "Luffy One piece Anime sticker" },
  { src: spiderman, alt: "Spiderman sticker" },
  { src: heart, alt: "Heart sticker" },
  { src: clock, alt: "Clock sticker" },
  { src: jesus, alt: "Jesus sticker" },
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
              />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
