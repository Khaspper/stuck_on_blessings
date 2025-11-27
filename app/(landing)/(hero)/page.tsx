import Image from "next/image";
import phone from "@/public/imgs/phone.png";
import InfiniteScrollingLogosAnimation from "../components/InfiniteScrollingLogosAnimation";

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
    <div className="hidden sm:block">
      <h1>Hero Desktop</h1>
    </div>
  );
}
