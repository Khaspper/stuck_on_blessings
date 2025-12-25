import Image from "next/image";

export default function ProductCard({
  productImage,
  alt,
  name,
  price,
}: {
  productImage: string;
  alt: string;
  name: string;
  price: string;
}) {
  return (
    <div className="flex flex-col relative min-h-[15rem] lg:min-h-[20rem] max-w-[15rem] lg:w-[15rem] group cursor-pointer">
      <div className="flex justify-center items-center flex-1">
        <Image
          width={100}
          height={100}
          src={productImage}
          alt={alt}
          className="w-auto h-[70%] sm:h-[80%] transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="px-2 mt-auto text-gray-600 group-hover:underline">
        {name}
      </div>
      {/* <div className="px-2 mt-auto text-[#e48bb0] group-hover:underline">
        {name}
      </div> */}
      {/* <div className="px-2 mt-auto text-gray-600">${price}.00 USD</div> */}
      <div className="px-2 mt-auto text-[#e48bb0]">${price}.00 USD</div>
    </div>
  );
}
