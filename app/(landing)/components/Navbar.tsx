import Link from "next/link";
import { FaBagShopping } from "react-icons/fa6";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-6 text-2xl">
      <div className="flex gap-10">
        <a href="https://www.instagram.com/stuckonblessings/">Instagram</a>
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
