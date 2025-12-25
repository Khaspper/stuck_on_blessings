import { getPublicUrl } from "@/app/lib/supabase/images/images";
import Image from "next/image";

export default function Values() {
  const briAndJellyPhoto = getPublicUrl(
    "bri_and_jelly_funny_photo.jpg",
    "bri_and_jelly_pictures"
  );

  return (
    <div className="flex flex-col-reverse justify-center items-center lg:gap-4 md:flex-row">
      <h1 className="text-[2.25rem] mt-24 mb-24 text-center leading-[3rem] md:text-left lg:text-[4rem] lg:leading-[4.75rem] lg:flex-1">
        The Heart of stuckonblessings beat for the purpose of spreading the
        gospel, living out our calling and disciples, and to use the creative
        gifts god has given us for his glory
      </h1>
      <Image
        width={400}
        height={400}
        src={briAndJellyPhoto.data.publicUrl}
        alt="A photo of the founders Bri and Nikka"
        className="w-[95%] md:w-[75%] h-auto transition-transform duration-300 group-hover:scale-110 mt-24 md:mt-0 lg:flex-1"
      />
    </div>
  );
}
