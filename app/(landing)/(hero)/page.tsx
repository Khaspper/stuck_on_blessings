import Image from "next/image";
import InfiniteScrollingLogosAnimation, {
  InfiniteScrollingLogosAnimationVertical,
} from "../components/InfiniteScrollingLogosAnimation";
import StickerCollage from "../components/StickerCollage";
import {
  flowersData,
  legoData,
  smiskiData,
  phoneData,
} from "@/app/lib/supabase/images/images";

type TImageProps = {
  flowers: string;
  lego: string;
  smiski: string;
};

export default async function Hero() {
  return (
    <>
      <HeroMobile phone={phoneData.data.publicUrl} />
      <HeroSmallScreen
        flowers={flowersData.data.publicUrl}
        lego={legoData.data.publicUrl}
        smiski={smiskiData.data.publicUrl}
      />
      <HeroLargeScreen
        flowers={flowersData.data.publicUrl}
        lego={legoData.data.publicUrl}
        smiski={smiskiData.data.publicUrl}
      />
      <HeroDesktop
        flowers={flowersData.data.publicUrl}
        lego={legoData.data.publicUrl}
        smiski={smiskiData.data.publicUrl}
      />
    </>
  );
}

function HeroText({ flowers, lego, smiski }: TImageProps) {
  return (
    <div className="flex flex-col flex-shrink-0 px-10 py-10 items-center lg:items-start lg:w-fit ">
      <div className="flex gap-[3vw] h-[clamp(7rem,20vw,175px)] items-center">
        <span className="text-[clamp(10rem,20vw,200px)] leading-[.9]">A</span>
        <span className="text-[clamp(10rem,20vw,200px)] leading-[.9]">
          FAITH
        </span>

        <div className="h-full flex items-stretch ml-[-2vw]">
          <Image
            src={flowers}
            alt="Flowers sticker"
            className="h-[95%] w-auto object-contain rotate-[24deg]"
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className="flex gap-[3vw] h-[clamp(10rem,25vw,250px)] items-center">
        <span className="text-[clamp(10rem,20vw,200px)] leading-[.9]">
          THAT
        </span>
        <div className="h-full flex items-stretch ml-[-2vw]">
          <Image
            src={lego}
            alt="Lego sticker"
            className="h-[75%] w-auto object-contain"
            width={141}
            height={200}
          />
        </div>
      </div>
      <div className="flex gap-[3vw] h-[clamp(7rem,20vw,175px)] items-center">
        <span className="text-[clamp(10rem,20vw,200px)] leading-[.9]">
          STICKS
        </span>
        <div className="h-full flex items-stretch ml-[-2vw]">
          <Image
            src={smiski}
            alt="Smiski sticker"
            className="h-[100%] w-auto object-contain"
            width={125}
            height={200}
          />
        </div>
      </div>
      <div>
        <p className=" text-[clamp(1rem,3vw,1.5rem)] text-[#e48bb0]">
          Commit your way to the Lord... trust in Him and He will act. - Psalms
          37:5
        </p>
      </div>
    </div>
  );
}

function HeroMobile({ phone }: { phone: string }) {
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
          width={125}
          height={220}
        />
      </div>
      <div>
        <p className="text-center text-[clamp(1rem,4vw,20px)] text-[#e48bb0]">
          Commit your way to the Lord... trust in Him
        </p>
        <p className="text-center text-[clamp(1rem,4vw,20px)] text-[#e48bb0]">
          and He will act. - Psalms 37:5
        </p>
      </div>
    </div>
  );
}

function HeroSmallScreen({ flowers, lego, smiski }: TImageProps) {
  return (
    <div className="hidden sm:block lg:hidden">
      <HeroText flowers={flowers} lego={lego} smiski={smiski} />
      <InfiniteScrollingLogosAnimation />
    </div>
  );
}

function HeroLargeScreen({ flowers, lego, smiski }: TImageProps) {
  return (
    <div className="hidden lg:flex h-[min(95vh,700px)] xl:hidden">
      <div className="self-items-start mr-auto">
        <HeroText flowers={flowers} lego={lego} smiski={smiski} />
      </div>
      <div className="mr-auto h-full">
        <InfiniteScrollingLogosAnimationVertical />
      </div>
    </div>
  );
}

function HeroDesktop({ flowers, lego, smiski }: TImageProps) {
  return (
    <div className="hidden xl:flex px-10 ml-auto mr-auto">
      <div className="">
        <HeroText flowers={flowers} lego={lego} smiski={smiski} />
      </div>
      <div className="self-center ml-auto mr-auto">
        <StickerCollage />
      </div>
    </div>
  );
}
