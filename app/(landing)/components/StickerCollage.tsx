import Image from "next/image";

import {
  clockData,
  jesusData,
  phoneData,
  luffyData,
  pochaccoData,
  heartData,
  spidermanData,
} from "@/app/lib/supabase/images/images";

export default function StickerCollage() {
  return (
    <div className="relative h-[clamp(200px,40vw,500px)] w-[clamp(200px,40vw,500px)] shrink-0 grow-0">
      {/* Top left clock */}
      <Image
        src={jesusData.data.publicUrl}
        alt="Jesus sticker"
        className="absolute w-[50%] left-[-10%] top-[30%] rotate-[-15deg] drop-shadow-md"
        width={200}
        height={200}
      />

      <Image
        src={spidermanData.data.publicUrl}
        alt="Spiderman sticker"
        className="absolute w-[50%] right-[-2%] top-[-14%] rotate-[35deg] drop-shadow-md"
        width={200}
        height={200}
      />

      <Image
        src={heartData.data.publicUrl}
        alt="Heart sticker"
        className="absolute w-[50%] left-[23%] top-[11%] rotate-[6deg] drop-shadow-lg"
        width={200}
        height={200}
      />

      <Image
        src={clockData.data.publicUrl}
        alt="Clock sticker"
        className="absolute w-[50%] left-[-5%] top-[-10%] drop-shadow-md rotate-[49deg]"
        width={200}
        height={200}
      />

      <Image
        src={phoneData.data.publicUrl}
        alt="Phone sticker"
        className="absolute w-[26%] left-[-10%] bottom-[-5%] rotate-[-48deg] drop-shadow-md"
        width={200}
        height={200}
      />

      <Image
        src={luffyData.data.publicUrl}
        alt="Luffy sticker"
        className="absolute w-[50%] left-[20%] bottom-[-7%] drop-shadow-lg"
        width={200}
        height={200}
      />

      <Image
        src={pochaccoData.data.publicUrl}
        alt="Pochacco sticker"
        className="absolute w-[50%] right-0 bottom-[8%] rotate-[8deg] drop-shadow-md"
        width={200}
        height={200}
      />
    </div>
  );
}
