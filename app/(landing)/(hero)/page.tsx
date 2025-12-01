import Image from "next/image";
import phone from "@/public/imgs/phone.png";
import InfiniteScrollingLogosAnimation from "../components/InfiniteScrollingLogosAnimation";
// import StickerCollage from "../components/StickerCollage";
import bible from "@/public/imgs/bible.png";
import lego from "@/public/imgs/lego.png";
import smiski from "@/public/imgs/smiski.png";

export default function Hero() {
  return (
    <div>
      <HeroMobile />
      <HeroSmallScreen />
      {/* <HeroDesktop /> */}
    </div>
  );
}

export function HeroText() {
  return (
    <div className="flex flex-col flex-shrink-0 border-2 border-blue-500 px-10 py-20">
      <div className="flex gap-[7vw] h-[clamp(7rem,23vw,250px)] items-center">
        <span className="text-[clamp(10rem,27vw,250px)] leading-[.9]">A</span>
        <span className="text-[clamp(10rem,27vw,250px)] leading-[.9]">
          FAITH
        </span>

        <div className="h-full flex items-stretch ml-[-2vw]">
          <Image
            src={bible}
            alt="Bible sticker"
            className="h-[95%] w-auto object-contain"
          />
        </div>
      </div>
      <div className="flex gap-[3vw] h-[clamp(10rem,25vw,250px)] items-center">
        <span className="text-[clamp(10rem,27vw,250px)] leading-[.9]">
          THAT
        </span>
        <div className="h-full flex items-stretch ml-[-2vw]">
          <Image
            src={lego}
            alt="Lego sticker"
            className="h-[75%] w-auto object-contain"
          />
        </div>
      </div>
      <div className="flex gap-[3vw] h-[clamp(7rem,25vw,250px)] items-center">
        <span className="text-[clamp(10rem,27vw,250px)] leading-[.9]">
          STICKS
        </span>
        <div className="h-full flex items-stretch ml-[-2vw]">
          <Image
            src={smiski}
            alt="Smiski sticker"
            className="h-[100%] w-auto object-contain"
          />
        </div>
      </div>
      <div>
        <p className=" text-[clamp(1rem,3vw,2rem)]">
          Commit your way to the Lord... trust in Him and He will act. - Psalms
          37:5
        </p>
      </div>
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

function HeroSmallScreen() {
  return (
    <div className="hidden sm:block lg:hidden">
      <HeroText />
      <InfiniteScrollingLogosAnimation />
      {/* <StickerCollage /> */}
    </div>
  );
}

// function HeroDesktop() {
//   return (
//     <div className="hidden sm:flex pl-20 py-10 items-center gap-[5vw] flex-wrap">
//       <div className="flex flex-col flex-shrink-0 border-2 border-blue-500">
//         <div className="flex gap-[3vw] h-[clamp(7rem,13vw,250px)] items-center">
//           <span className="text-[clamp(10rem,15vw,250px)] leading-[.9]">A</span>
//           <span className="text-[clamp(10rem,15vw,250px)] leading-[.9]">
//             FAITH
//           </span>

//           <div className="h-full flex items-stretch ml-[-2vw]">
//             <Image
//               src={bible}
//               alt="Bible sticker"
//               className="h-[95%] w-auto object-contain"
//             />
//           </div>
//         </div>
//         <div className="flex gap-[3vw] h-[clamp(10rem,13vw,250px)] items-center">
//           <span className="text-[clamp(10rem,15vw,250px)] leading-[.9]">
//             THAT
//           </span>
//           <div className="h-full flex items-stretch ml-[-2vw]">
//             <Image
//               src={lego}
//               alt="Lego sticker"
//               className="h-[75%] w-auto object-contain"
//             />
//           </div>
//         </div>
//         <div className="flex gap-[3vw] h-[clamp(7rem,13vw,250px)] items-center">
//           <span className="text-[clamp(10rem,15vw,250px)] leading-[.9]">
//             STICKS
//           </span>
//           <div className="h-full flex items-stretch ml-[-2vw]">
//             <Image
//               src={smiski}
//               alt="Smiski sticker"
//               className="h-[100%] w-auto object-contain"
//             />
//           </div>
//         </div>
//         <div>
//           <p className=" text-[clamp(1rem,1.5vw,1.5rem)]">
//             Commit your way to the Lord... trust in Him and He will act. -
//             Psalms 37:5
//           </p>
//         </div>
//       </div>

//       <StickerCollage />
//     </div>
//   );
// }
