import Image from "next/image";

export default function ProductCard({
  productImage,
  alt,
}: {
  productImage: string;
  alt: string;
}) {
  return (
    <div>
      <div>ProductCard</div>
      <div className="h-full flex items-stretch ml-[-2vw]">
        <Image
          width={100}
          height={100}
          src={productImage}
          alt={alt}
          className="h-[95%] w-auto object-contain"
        />
      </div>
    </div>
  );
}
