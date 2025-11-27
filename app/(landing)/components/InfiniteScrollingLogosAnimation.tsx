"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import bible from "@/public/imgs/bible.png";
import lego from "@/public/imgs/lego.png";
import smiski from "@/public/imgs/smiski.png";
import luffy from "@/public/imgs/luffy.png";

const photos = [
  { src: bible, alt: "Bible sticker" },
  { src: lego, alt: "Lego sticker" },
  { src: smiski, alt: "Smiski Sticker" },
  { src: luffy, alt: "Luffy One piece Anime sticker" },
];

export default function InfiniteScrollingLogosAnimation() {
  return (
    <div className="flex relative overflow-hidden h-32 items-center sm:hidden">
      <motion.div
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
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
