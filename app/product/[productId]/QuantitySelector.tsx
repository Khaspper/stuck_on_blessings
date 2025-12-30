"use client";

import { useState } from "react";
import { useCart } from "@/app/(landing)/components/CartProvider";

export default function QuantitySelector({
  productId,
  price,
}: {
  productId: string;
  price: string;
}) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty input for better UX
    if (value === "") {
      setQuantity(1);
      return;
    }
    const numValue = parseInt(value, 10);
    // Only update if it's a valid number between 1 and 20
    if (!isNaN(numValue) && numValue > 0 && numValue <= 20) {
      setQuantity(numValue);
    }
  };

  const handleQuantityBlur = () => {
    // Ensure quantity is between 1 and 20 when input loses focus
    if (quantity < 1) {
      setQuantity(1);
    } else if (quantity > 20) {
      setQuantity(20);
    }
  };

  const handleAddToCart = () => {
    addToCart(productId, quantity, price);
    // Optional: Show a success message or reset quantity
    setQuantity(1);
  };

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-mont text-sm">Quantity</label>
        <div className="flex items-center border border-gray-300 bg-white rounded max-w-fit">
          <button
            onClick={handleDecrease}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            max="20"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            className="text-gray-700 max-w-[3rem] text-center border-0 focus:outline-none focus:ring-0 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={handleIncrease}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="border border-black bg-white text-gray-700 py-3 px-6 font-mont hover:bg-gray-50 transition-colors"
      >
        Add to cart
      </button>
    </div>
  );
}
