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
};

// Note: This assumes you have an "orders" table in Supabase
// If not, you'll need to create it with columns:
// - id (uuid, primary key, default: uuid_generate_v4())
// - items (jsonb) - stores array of {productId, quantity, price}
// - total (numeric)
// - customer_name (text, nullable)
// - customer_email (text, nullable)
// - shipping_address (text, nullable)
// - status (text, default: 'new')
// - created_at (timestamp, default: now())
// - updated_at (timestamp, nullable)

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
    .insert([order])
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
