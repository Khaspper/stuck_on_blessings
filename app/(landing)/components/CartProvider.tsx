"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type TProduct = {
  productId: string;
  quantity: number;
  price: string;
};

type TCart = {
  items: TProduct[];
  total: number;
};

type CartContextType = {
  cart: TCart;
  addToCart: (productId: string, quantity: number, price: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
};

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

const calculateTotal = (items: TProduct[]): number => {
  return items.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    return sum + price * item.quantity;
  }, 0);
};

export default function CartProvider({ children }: { children: ReactNode }) {
  // Always start with empty cart to avoid hydration mismatch
  const [cart, setCart] = useState<TCart>({ items: [], total: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage only after component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem("cartItems");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate structure
        if (parsed && Array.isArray(parsed.items)) {
          setCart({
            items: parsed.items,
            total: calculateTotal(parsed.items),
          });
        }
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // Save to localStorage whenever cart changes (but only after mount)
  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem("cartItems", JSON.stringify(cart));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cart, isMounted]);

  const addToCart = (productId: string, quantity: number, price: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.productId === productId
      );

      let newItems: TProduct[];
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = prevCart.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...prevCart.items, { productId, quantity, price }];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter(
        (item) => item.productId !== productId
      );
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  const getCartItemCount = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
