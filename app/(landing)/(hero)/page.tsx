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

// TODO: Change all the text-9xl etc to something like this
// TODO: text-[20vw]
// TODO: w-[30vw]
// TODO: gap-[3vw]

export function HeroMobile() {
  return (
    <div className="sm:hidden flex flex-col items-center">
      <InfiniteScrollingLogosAnimation />
      <div className="flex items-center px-4 pt-16 pb-4 gap-4">
        {/* LEFT TEXT */}
        <div className="flex flex-col">
          <div className="flex gap-8">
            <span className="text-9xl leading-[.9]">A</span>
            <span className="text-9xl leading-[.9]">FAITH</span>
          </div>
          <span className="text-9xl leading-[.9]">THAT</span>
          <span className="text-9xl leading-[.9]">STICKS</span>
        </div>
        {/* RIGHT IMAGE */}
        <Image
          src={phone}
          alt="Cell Phone sticker"
          className="w-[110px] h-auto shrink-0 -mb-24 -ml-10"
        />
      </div>
      <div>
        <p className="text-center text-2xl">
          Commit your way to the Lord... trust in Him
        </p>
        <p className="text-center text-2xl">and He will act. - Psalms 37:5</p>
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
