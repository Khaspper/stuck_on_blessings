import Link from "next/link";
import { FaBagShopping } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between p-6 text-2xl sm:px-20 bg-[#F5F3F1] border-b">
      <div className="flex gap-10">
        <a
          href="https://www.instagram.com/stuckonblessings/"
          className="hidden sm:block"
        >
          Instagram
        </a>
        <a
          href="https://www.instagram.com/stuckonblessings/"
          className="sm:hidden"
        >
          <FaInstagram />
        </a>
        <h1>Values</h1>
        <h1>Stickers</h1>
      </div>
      <Link href={"/cart"} className="sm:hidden text-[#FBD070]">
        <FaBagShopping />
      </Link>
      <Link href={"/cart"} className="hidden sm:block text-[#FBD070]">
        Cart
      </Link>
    </nav>
  );
}
