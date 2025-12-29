import { getPublicUrl } from "@/app/lib/supabase/images/images";
import Image from "next/image";

export default function Values() {
  const briAndJellyPhoto = getPublicUrl(
    "bri_and_jelly_values_photo.jpeg",
    "bri_and_jelly_pictures"
  );

  return (
    <div className="flex flex-col-reverse justify-center items-center md:flex-row lg:px-10 lg:gap-4">
      <h1 className="text-[2rem] sm:text-[2.25rem] md:text-[2.5rem] mt-24 mb-24 text-center leading-[3rem] md:text-left lg:text-[4.5rem] lg:leading-[5.25rem] lg:flex-1">
        The Heart of stuckon<span className="text-[#e48bb0]">b</span>lessi
        <span className="text-[#e48bb0]">n</span>gs beats for the purpose of
        spreading the gospel, living out our calling and disciples, and to use
        the creative gifts god has given us for his glory
      </h1>
      <Image
        width={400}
        height={400}
        src={briAndJellyPhoto.data.publicUrl}
        alt="A photo of the founders Bri and Nikka"
        className="h-auto transition-transform duration-300 group-hover:scale-110 mt-24 md:mt-0 lg:w-[35%] lg:ml-[8rem]"
      />
    </div>
  );
}
