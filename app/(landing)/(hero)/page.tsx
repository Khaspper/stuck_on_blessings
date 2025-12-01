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
// TODO: w-[30vw]

export function HeroMobile() {
  return (
    <div className="sm:hidden flex flex-col items-center">
      <InfiniteScrollingLogosAnimation />
      <div className="flex items-center px-4 pt-16 pb-4 gap-[3vw]">
        {/* LEFT TEXT */}
        <div className="flex flex-col">
          <div className="flex gap-[5vw]">
            <span className="text-[clamp(5rem,28vw,700px)] leading-[.9]">
              A
            </span>
            <span className="text-[clamp(5rem,28vw,700px)] leading-[.9]">
              FAITH
            </span>
          </div>
          <span className="text-[clamp(5rem,28vw,700px)] leading-[.9]">
            THAT
          </span>
          <span className="text-[clamp(5rem,28vw,700px)] leading-[.9]">
            STICKS
          </span>
        </div>
        {/* RIGHT IMAGE */}
        <Image
          src={phone}
          alt="Cell Phone sticker"
          className="w-[clamp(5rem,28vw,300px)] h-auto shrink-0 -mb-[clamp(.5rem,20vw,100px)] -ml-[clamp(1rem,4vw,100px)]"
        />
      </div>
      <div>
        <p className="text-center text-[clamp(1rem,4vw,20px)]">
          Commit your way to the Lord... trust in Him
        </p>
        <p className="text-center text-[clamp(1rem,4vw,20px)]">
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
