"use server";

import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type TOrderItem = {
  productId: string;
  quantity: number;
  price: string;
};

export type TOrder = {
  id: string;
  items: TOrderItem[];
  total: number;
  customer_name?: string;
  customer_email?: string;
  shipping_address?: string;
  status: "new" | "processing" | "completed" | "cancelled";
  created_at: string;
  updated_at?: string;
  stripe_session_id?: string;
  order_note?: string;
};

export async function getAllOrders(): Promise<TOrder[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    // If table doesn't exist, return empty array
    if (error.code === "42P01") {
      return [];
    }
    throw new Error("Failed to fetch orders");
  }

  return data || [];
}

export async function getOrderById(id: string): Promise<TOrder | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to fetch order");
  }

  return data;
}

export async function createOrder(
  order: Omit<TOrder, "id" | "created_at" | "updated_at">
): Promise<TOrder> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        ...order,
        stripe_session_id: order.stripe_session_id || null,
        order_note: order.order_note || null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }

  revalidatePath("/admin");
  return data;
}

export async function updateOrderStatus(
  id: string,
  status: TOrder["status"]
): Promise<TOrder> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .select("*")
    .eq("id", id)
    .single();

  console.log("data", data);

  if (error) {
    console.error("Error updating order:", error);
    throw new Error("Failed to update order");
  }

  revalidatePath("/admin");
  return data;
}

export async function getOrderByStripeSessionId(
  stripeSessionId: string
): Promise<TOrder | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("stripe_session_id", stripeSessionId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching order by session ID:", error);
    return null;
  }

  return data;
}

export async function saveOrderFromStripeSession(sessionData: {
  sessionId: string;
  lineItems: Array<{
    description: string;
    quantity: number;
    amount_total: number;
    price: { product: { name: string } };
  }>;
  customerEmail: string;
  customerName: string;
  shippingAddress: string;
  total: number;
  note?: string;
}): Promise<TOrder | null> {
  // Check if order already exists
  const existingOrder = await getOrderByStripeSessionId(sessionData.sessionId);
  if (existingOrder) {
    return existingOrder;
  }

  // Fetch all products to match by name
  const supabase = await createClient();
  const { data: products, error: productsError } = await supabase
    .from("stickers")
    .select("*");

  if (productsError) {
    console.error("Error fetching products:", productsError);
    throw new Error("Failed to fetch products");
  }

  // Format items: match products by name and get productId
  const formattedItems = sessionData.lineItems.map((item) => {
    const product = products?.find((p) => p.name === item.price.product.name);

    if (!product) {
      throw new Error(`Product not found: ${item.price.product.name}`);
    }

    return {
      name: item.price.product.name,
      price: item.amount_total / 100, // Convert from cents to dollars
      quantity: item.quantity,
      productId: product.id_uuid,
    };
  });

  // Create order with items in the requested format (name, price, quantity, productId)
  // Items are stored as JSONB, so we can use the requested format
  const order = await createOrder({
    items: formattedItems as unknown as TOrderItem[], // Store in format: {name, price, quantity, productId}
    total: sessionData.total / 100, // Convert from cents to dollars
    customer_email: sessionData.customerEmail,
    customer_name: sessionData.customerName,
    shipping_address: sessionData.shippingAddress,
    status: "new",
    stripe_session_id: sessionData.sessionId,
    order_note: sessionData.note,
  });

  return order;
}

export async function getStickerQuantitiesNeeded(): Promise<
  Record<string, number>
> {
  const orders = await getAllOrders();
  const quantities: Record<string, number> = {};

  // Only count new orders
  const activeOrders = orders.filter((order) => order.status === "new");

  activeOrders.forEach((order) => {
    order.items.forEach((item) => {
      if (quantities[item.productId]) {
        quantities[item.productId] += item.quantity;
      } else {
        quantities[item.productId] = item.quantity;
      }
    });
  });

  return quantities;
}
