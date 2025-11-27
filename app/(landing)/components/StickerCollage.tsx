"use client";

import Image from "next/image";
import React from "react";

import clock from "@/public/imgs/clock.png";
import heart from "@/public/imgs/heart.png";
import spiderman from "@/public/imgs/spiderman.png";
import jesus from "@/public/imgs/jesus.png";
import phone from "@/public/imgs/phone.png";
import luffy from "@/public/imgs/luffy.png";
import pochaco from "@/public/imgs/pochaco.png";

export default function StickerCollage() {
  return (
    <div className="relative sm:w-[430px] sm:h-[400px] mx-auto">
      <Image
        src={spiderman}
        alt="Spider"
        className="absolute w-40 top-4 right-2 rotate-[35deg] drop-shadow-xl"
      />

      <Image
        src={jesus}
        alt="Jesus"
        className="absolute w-48 rotate-[-15deg] drop-shadow-xl top-1/4 left-5"
      />

      <Image
        src={heart}
        alt="Heart"
        className="absolute w-32 top-20 right-20 -rotate-[27deg] drop-shadow-xl mr-10"
      />

      <Image
        src={clock}
        alt="Trust Timing"
        className="absolute w-40 top-0 left-10 rotate-[49deg] drop-shadow-xl"
      />

      <Image
        src={phone}
        alt="Phone"
        className="absolute w-24 rotate-[-46deg] drop-shadow-xl bottom-5"
      />

      <Image
        src={pochaco}
        alt="Nurse"
        className="absolute w-40 bottom-10 right-0 rotate-[46deg] drop-shadow-xl"
      />

      <Image
        src={luffy}
        alt="Luffy"
        className="absolute w-48 bottom-0 left-32 rotate-[-4deg] drop-shadow-xl"
      />
    </div>
  );
}
