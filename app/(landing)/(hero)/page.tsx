import Image from "next/image";
import phone from "@/public/imgs/phone.png";
import bible from "@/public/imgs/bible.png";
import lego from "@/public/imgs/lego.png";
import smiski from "@/public/imgs/smiski.png";
import InfiniteScrollingLogosAnimation from "../components/InfiniteScrollingLogosAnimation";
import StickerCollage from "../components/StickerCollage";

export default function Hero() {
  return (
    <div>
      <HeroMobile />
      <HeroDesktop />
    </div>
  );
}

export function HeroMobile() {
  return (
    <div className="sm:hidden flex flex-col items-center">
      <InfiniteScrollingLogosAnimation />
      <div className="flex items-center px-4 pt-16 pb-4 gap-[5vw]">
        {/* LEFT TEXT */}
        <div className="flex flex-col">
          <div className="flex gap-[8vw]">
            <span className="text-[clamp(5rem,30vw,10rem)]  leading-[.9]">
              A
            </span>
            <span className="text-[clamp(5rem,30vw,10rem)] leading-[.9]">
              FAITH
            </span>
          </div>
          <span className="text-[clamp(5rem,30vw,10rem)] leading-[.9]">
            THAT
          </span>
          <span className="text-[clamp(5rem,30vw,10rem)] leading-[.9]">
            STICKS
          </span>
        </div>
        {/* RIGHT IMAGE */}
        <Image
          src={phone}
          alt="Cell Phone sticker"
          className="w-[clamp(4rem,25vw,10rem)] h-auto shrink-0 -mb-24 -ml-10"
        />
      </div>
      <div>
        <p className="text-center text-[clamp(1rem,5vw,10rem)]">
          Commit your way to the Lord... trust in Him
        </p>
        <p className="text-center text-[clamp(1rem,5vw,10rem)]">
          and He will act. - Psalms 37:5
        </p>
      </div>
    </div>
  );
}

function HeroDesktop() {
  return (
    <div className="flex items-center">
      <div className="hidden sm:block">
        <div className="flex border-2 items-center">
          <h1 className="text-9xl">A faith</h1>
          <Image
            src={bible}
            alt="Holy Bible Sticker"
            className="w-[clamp(4rem,25vw,7rem)] h-auto"
          />
        </div>
        <div className="flex border-2 items-center">
          <h1 className="text-9xl">That</h1>
          <Image
            src={lego}
            alt="Lego Sticker"
            className="w-[clamp(4rem,1vw, 2rem)] h-auto"
          />
        </div>
        <div className="flex border-2 items-center">
          <h1 className="text-9xl">Sticks</h1>
          <Image
            src={smiski}
            alt="Smiski Sticker"
            className="w-[clamp(4rem,25vw,10rem)] h-auto"
          />
        </div>
      </div>
      <div className="border-2">
        <StickerCollage />
      </div>
    </div>
  );
}
