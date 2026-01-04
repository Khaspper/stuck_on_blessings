"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/app/(landing)/components/CartProvider";
import { saveOrderFromStripeSession } from "@/app/lib/actions/orders";

export default function Success() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [failedOrder, setFailedOrder] = useState(false);
  const { clearCart } = useCart();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent multiple executions
    if (hasProcessed.current) return;

    async function fetchSession() {
      if (!sessionId) {
        setLoading(false);
        setFailedOrder(true);
        return;
      }

      hasProcessed.current = true;

      try {
        const res = await fetch(
          `/api/checkout-session?session_id=${sessionId}`
        );
        const data = await res.json();
        const session = data.session;

        if (!session) {
          throw new Error("Session not found");
        }

        // Extract order data from Stripe session
        const lineItems = session.line_items?.data || [];
        const customerEmail = session.customer_details?.email || "";
        const customerName = session.customer_details?.name || "";

        // Get address from shipping_details first, then fallback to customer_details
        const address =
          session.shipping_details?.address ||
          session.customer_details?.address;
        const shippingAddress = address
          ? [
              address.line1,
              address.line2,
              address.city,
              address.state,
              address.postal_code,
              address.country,
            ]
              .filter(Boolean)
              .join(", ")
          : "";
        const total = session.amount_total || 0;
        const note = session.custom_fields?.find(
          (field: { key?: string }) => field.key === "note"
        )?.text?.value;

        // Save order to Supabase (will check if exists first)
        await saveOrderFromStripeSession({
          sessionId: sessionId!,
          lineItems,
          customerEmail,
          customerName,
          shippingAddress,
          total,
          note,
        });

        // Clear cart from both state and localStorage
        clearCart();
        localStorage.removeItem("cartItems");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching session:", error);
        setFailedOrder(true);
        setLoading(false);
      }
    }

    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5 sm:px-10 bg-[#F5F3F1]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#e48bb0] mb-4"></div>
          <p className="text-gray-600 font-mont text-lg">
            Processing your order...
          </p>
        </div>
      </div>
    );
  }

  if (failedOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5 sm:px-10 bg-[#F5F3F1]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-red-500 flex items-center justify-center">
            <span className="text-3xl font-mont text-red-500">×</span>
          </div>
          <h1 className="text-3xl mb-4 font-mont">Order Failed</h1>
          <p className="text-gray-600 font-mont mb-6">
            There was an issue processing your order. Please contact support.
          </p>
          <Link
            href="/"
            className="inline-block border border-black bg-white text-gray-700 py-3 px-6 font-mont hover:bg-gray-50 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-10 bg-[#F5F3F1]">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-[#e48bb0] flex items-center justify-center">
          <svg
            className="w-8 h-8 text-[#e48bb0]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-4xl mb-4 font-mont">Payment Successful!</h1>
        <p className="text-gray-600 font-mont mb-6 text-lg">
          Thank you for your order. Your order is being processed.
        </p>
        <Link
          href="/"
          className="inline-block border border-black bg-white text-gray-700 py-3 px-6 font-mont hover:bg-gray-50 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
