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
    <div className="w-[10rem] flex flex-col relative min-h-[15rem] group cursor-pointer">
      <div className="flex justify-center items-center flex-1">
        <Image
          width={100}
          height={100}
          src={productImage}
          alt={alt}
          className="w-auto h-auto transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="px-2 mt-auto text-gray-600 group-hover:underline">
        {name}
      </div>
      <div className="px-2 mt-auto text-gray-600">{price} USD</div>
    </div>
  );
}
