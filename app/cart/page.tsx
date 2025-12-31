"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/app/(landing)/components/CartProvider";
import { createClient } from "@/app/lib/supabase/client";
import { getPublicUrl } from "@/app/lib/supabase/images/images";
import Image from "next/image";
import Link from "next/link";

type TProductDetails = {
  productId: string;
  name: string;
  price: string;
  image: string;
  alt: string;
};

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [productDetails, setProductDetails] = useState<
    Record<string, TProductDetails>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductDetails() {
      if (cart.items.length === 0) {
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const productIds = cart.items.map((item) => item.productId);

      const { data: stickers, error } = await supabase
        .from("stickers")
        .select("*")
        .in("id_uuid", productIds);

      if (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
        return;
      }

      const details: Record<string, TProductDetails> = {};
      stickers?.forEach((sticker) => {
        details[sticker.id_uuid] = {
          productId: sticker.id_uuid,
          name: sticker.name,
          price: sticker.price,
          image: getPublicUrl(sticker.file_path).data.publicUrl,
          alt: sticker.alt,
        };
      });

      setProductDetails(details);
      setLoading(false);
    }

    fetchProductDetails();
  }, [cart.items]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else if (newQuantity > 20) {
      updateQuantity(productId, 20);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleQuantityInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    const value = e.target.value;
    if (value === "") {
      return;
    }
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      handleQuantityChange(productId, numValue);
    }
  };

  const handleQuantityBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    productId: string
  ) => {
    const value = e.target.value;
    if (value === "" || parseInt(value, 10) < 1) {
      const cartItem = cart.items.find((item) => item.productId === productId);
      if (cartItem) {
        updateQuantity(productId, 1);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5 sm:px-10">
        <p className="text-gray-600 font-mont">Loading cart...</p>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-10">
        <h1 className="text-4xl mb-4">Your cart is empty</h1>
        <p className="text-gray-600 font-mont mb-8">
          Start adding some stickers to your cart!
        </p>
        <Link
          href="/"
          className="border border-black bg-white text-gray-700 py-3 px-6 font-mont hover:bg-gray-50 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 sm:px-10 py-10">
      <h1 className="text-4xl mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="space-y-6">
            {cart.items.map((item) => {
              const product = productDetails[item.productId];
              if (!product) {
                return null;
              }

              const itemTotal = parseFloat(item.price) * item.quantity;

              return (
                <div
                  key={item.productId}
                  className="flex flex-col sm:flex-row gap-4 border-b border-gray-300 pb-6"
                >
                  {/* Product Image */}
                  <Link
                    href={`/product/${item.productId}`}
                    className="flex-shrink-0"
                  >
                    <Image
                      src={product.image}
                      alt={product.alt}
                      width={100}
                      height={100}
                      className="w-auto h-[80%] object-contain"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/product/${item.productId}`}
                        className="text-xl hover:underline mb-2"
                      >
                        {product.name}
                      </Link>
                      <p className="text-[#e48bb0] font-mont mb-4">
                        ${item.price}.00 USD
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <label className="text-gray-700 font-mont text-sm">
                        Quantity:
                      </label>
                      <div className="flex items-center border border-gray-300 bg-white rounded max-w-fit">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productId,
                              item.quantity - 1
                            )
                          }
                          className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityInputChange(e, item.productId)
                          }
                          onBlur={(e) => handleQuantityBlur(e, item.productId)}
                          className="text-gray-700 max-w-[3rem] text-center border-0 focus:outline-none focus:ring-0 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productId,
                              item.quantity + 1
                            )
                          }
                          className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-gray-500 hover:text-red-600 font-mont text-sm underline ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xl font-mont">
                      ${itemTotal.toFixed(2)} USD
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white border border-gray-300 p-6 sticky top-10">
            <h2 className="text-2xl mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700 font-mont">
                <span>Subtotal</span>
                <span>${cart.total.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-gray-700 font-mont">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-gray-300 pt-4 flex justify-between text-xl">
                <span className="font-mont">Total</span>
                <span className="font-mont">${cart.total.toFixed(2)} USD</span>
              </div>
            </div>

            <button className="w-full border border-black bg-white text-gray-700 py-3 px-6 font-mont hover:bg-gray-50 transition-colors mb-4">
              Proceed to Checkout
            </button>

            <Link
              href="/"
              className="block text-center text-gray-600 font-mont text-sm hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
