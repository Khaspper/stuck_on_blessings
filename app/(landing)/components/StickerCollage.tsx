import Image from "next/image";
import clock from "@/public/imgs/clock.png";
import jesus from "@/public/imgs/jesus.png";
import phone from "@/public/imgs/phone.png";
import luffy from "@/public/imgs/luffy.png";
import pochaco from "@/public/imgs/pochaco.png";
import heart from "@/public/imgs/heart.png";
import spiderman from "@/public/imgs/spiderman.png";

export default function StickerCollage() {
  return (
    <div className="relative h-[clamp(200px,40vw,500px)] w-[clamp(200px,40vw,500px)] shrink-0 grow-0">
      {/* Top left clock */}
      <Image
        src={jesus}
        alt="Jesus sticker"
        className="absolute w-[50%] left-[-10%] top-[30%] rotate-[-15deg] drop-shadow-md"
      />

      <Image
        src={spiderman}
        alt="Spiderman sticker"
        className="absolute w-[50%] right-[-2%] top-[-14%] rotate-[35deg] drop-shadow-md"
      />

      <Image
        src={heart}
        alt="Heart sticker"
        className="absolute w-[50%] left-[23%] top-[11%] rotate-[6deg] drop-shadow-lg"
      />

      <Image
        src={clock}
        alt="Clock sticker"
        className="absolute w-[50%] left-[-5%] top-[-10%] drop-shadow-md rotate-[49deg]"
      />

      <Image
        src={phone}
        alt="Phone sticker"
        className="absolute w-[26%] left-[-10%] bottom-[-5%] rotate-[-48deg] drop-shadow-md"
      />

      <Image
        src={luffy}
        alt="Luffy sticker"
        className="absolute w-[50%] left-[20%] bottom-[-7%] drop-shadow-lg"
      />

      <Image
        src={pochaco}
        alt="Pochaco sticker"
        className="absolute w-[50%] right-0 bottom-[8%] rotate-[8deg] drop-shadow-md"
      />
    </div>
  );
}
