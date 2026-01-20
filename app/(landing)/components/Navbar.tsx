"use client";

import Link from "next/link";
import { FaBagShopping } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();
  return (
    <nav className="sticky top-0 z-50 flex justify-between p-6 text-2xl sm:px-20 bg-[#F5F3F1] border-b">
      <div className="flex gap-10">
        <a
          href="https://www.instagram.com/stuckonblessings/"
          className="hidden sm:block"
          target="_blank"
        >
          Instagram
        </a>
        <a
          href="https://www.instagram.com/stuckonblessings/"
          className="sm:hidden"
        >
          <FaInstagram />
        </a>
        <Link href="/">Home</Link>
        {/* <h1>Stickers</h1> */}
      </div>
      <Link href={"/cart"} className="sm:hidden text-[#FBD070] relative">
        <FaBagShopping />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#e48bb0] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
      <Link href={"/cart"} className="hidden sm:block text-[#FBD070] relative">
        Cart
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#e48bb0] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
}
