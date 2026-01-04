import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/app/lib/stripe";
import { createClient } from "@/app/lib/supabase/server";
import { getPublicUrl } from "@/app/lib/supabase/images/images";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cartItems = body.items || [];

    if (cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Fetch product details from Supabase
    const supabase = await createClient();
    const productIds = cartItems.map(
      (item: { productId: string }) => item.productId
    );

    const { data: stickers, error: stickerError } = await supabase
      .from("stickers")
      .select("*")
      .in("id_uuid", productIds);

    if (stickerError) {
      console.error("Error fetching products:", stickerError);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }

    // Build line_items from cart data
    const line_items = cartItems.map(
      (cartItem: { productId: string; quantity: number; price: string }) => {
        const product = stickers?.find((s) => s.id_uuid === cartItem.productId);

        if (!product) {
          throw new Error(`Product ${cartItem.productId} not found`);
        }

        const imageUrl = getPublicUrl(product.file_path).data.publicUrl;

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: [imageUrl],
            },
            unit_amount: Math.round(parseFloat(cartItem.price) * 100), // Convert to cents
          },
          quantity: cartItem.quantity,
        };
      }
    );

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      custom_fields: [
        {
          key: "note",
          label: {
            type: "custom",
            custom: "Drop off in person? Tell us where! (Only in Vegas)",
          },
          type: "text",
          optional: true,
        },
      ],
      success_url: `${req.nextUrl.origin}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error processing checkout:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
