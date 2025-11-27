"use client";

import Image from "next/image";
import React from "react";

import { motion } from "framer-motion";
import bible from "@/public/imgs/bible.png";
import lego from "@/public/imgs/lego.png";
import smiski from "@/public/imgs/smiski.png";
import luffy from "@/public/imgs/luffy.png";

// Ignore this error
const photos = [
  { src: bible, alt: "Bible sticker" },
  { src: lego, alt: "Lego sticker" },
  { src: smiski, alt: "Smiski Sticker" },
  { src: luffy, alt: "Luffy One piece Anime sticker" },
];

export default function InfiniteScrollingLogosAnimation() {
  return (
    <div className="flex relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-gradient-to-r before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:bg-gradient-to-l after:to-transparent after:content-[''] h-32 items-center sm:hidden">
      <motion.div
        transition={{
          duration: 10,
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
