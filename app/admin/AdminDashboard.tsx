"use client";

import { useState, useEffect, useMemo } from "react";
import {
  getAllStickers,
  createSticker,
  updateSticker,
  deleteSticker,
  TSticker,
} from "@/app/lib/actions/stickers";
import {
  getAllOrders,
  updateOrderStatus,
  TOrder,
} from "@/app/lib/actions/orders";
import { getPublicUrl } from "@/app/lib/supabase/images/images";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Tab = "inventory" | "orders";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("inventory");
  const [stickers, setStickers] = useState<TSticker[]>([]);
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSticker, setEditingSticker] = useState<TSticker | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState<
    "all" | "new" | "processing" | "completed"
  >("all");
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [stickersData, ordersData] = await Promise.all([
        getAllStickers(),
        getAllOrders(),
      ]);
      setStickers(stickersData);
      setOrders(ordersData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }

  // Calculate quantities dynamically based on the selected filter
  const quantitiesNeeded = useMemo(() => {
    if (orderStatusFilter === "all") {
      return {};
    }

    const filteredOrders = orders.filter(
      (order) => order.status === orderStatusFilter
    );

    const quantities: Record<string, number> = {};
    filteredOrders.forEach((order) => {
      order.items.forEach((item) => {
        if (quantities[item.productId]) {
          quantities[item.productId] += item.quantity;
        } else {
          quantities[item.productId] = item.quantity;
        }
      });
    });

    return quantities;
  }, [orders, orderStatusFilter]);

  async function handleDeleteSticker(id: string) {
    if (!confirm("Are you sure you want to delete this sticker?")) {
      return;
    }
    try {
      await deleteSticker(id);
      await loadData();
    } catch (error) {
      console.error("Error deleting sticker:", error);
      alert("Failed to delete sticker");
    }
  }

  async function handleUpdateOrderStatus(
    orderId: string,
    status: TOrder["status"]
  ) {
    try {
      await updateOrderStatus(orderId, status);
      await loadData();
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order status tell Mark");
    }
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5 sm:px-10 bg-[#F5F3F1]">
        <p className="text-gray-600 font-mont">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-5 md:px-10 py-6 sm:py-10 bg-[#F5F3F1]">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2">
            Admin Dashboard
          </h1>
          <Link
            href="/"
            className="text-gray-600 font-mont text-xs sm:text-sm hover:underline"
          >
            ← Back to Store
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="self-start sm:self-auto border border-gray-300 bg-white text-gray-700 py-2 px-4 font-mont text-xs sm:text-sm hover:bg-gray-50 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-300">
        <button
          onClick={() => setActiveTab("inventory")}
          className={`px-4 py-2 font-mont ${
            activeTab === "inventory"
              ? "border-b-2 border-[#e48bb0] text-[#e48bb0]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Inventory
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 font-mont ${
            activeTab === "orders"
              ? "border-b-2 border-[#e48bb0] text-[#e48bb0]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Orders ({orders.length})
        </button>
      </div>

      {/* Inventory Tab */}
      {activeTab === "inventory" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl">Sticker Inventory</h2>
            <button
              onClick={() => {
                setEditingSticker(null);
                setShowModal(true);
              }}
              className="border border-black bg-white text-gray-700 py-2 px-4 font-mont hover:bg-gray-50 transition-colors"
            >
              Add New Sticker
            </button>
          </div>

          {showModal && (
            <StickerModal
              sticker={editingSticker}
              onSave={async () => {
                await loadData();
                setShowModal(false);
                setEditingSticker(null);
              }}
              onClose={() => {
                setShowModal(false);
                setEditingSticker(null);
              }}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stickers.map((sticker) => (
              <div
                key={sticker.id_uuid}
                className="bg-white border border-gray-300 p-4 rounded"
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src={getPublicUrl(sticker.file_path).data.publicUrl}
                    alt={sticker.alt}
                    width={100}
                    height={100}
                    className="w-auto h-32 object-contain"
                  />
                </div>
                <h3 className="text-xl mb-2">{sticker.name}</h3>
                <p className="text-[#e48bb0] font-mont mb-2">
                  ${sticker.price}.00 USD
                </p>
                {quantitiesNeeded[sticker.id_uuid] && (
                  <p className="text-sm text-orange-600 font-mont mb-2">
                    Need to make: {quantitiesNeeded[sticker.id_uuid]} stickers
                  </p>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditingSticker(sticker);
                      setShowModal(true);
                    }}
                    className="flex-1 border border-gray-300 bg-white text-gray-700 py-2 px-4 font-mont text-sm hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSticker(sticker.id_uuid)}
                    className="flex-1 border border-red-300 bg-white text-red-700 py-2 px-4 font-mont text-sm hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h2 className="text-2xl">Orders</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setOrderStatusFilter("all")}
                className={`px-3 sm:px-4 py-2 font-mont text-xs sm:text-sm border transition-colors ${
                  orderStatusFilter === "all"
                    ? "border-[#e48bb0] bg-[#e48bb0] text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setOrderStatusFilter("new")}
                className={`px-3 sm:px-4 py-2 font-mont text-xs sm:text-sm border transition-colors ${
                  orderStatusFilter === "new"
                    ? "border-[#e48bb0] bg-[#e48bb0] text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                New
              </button>
              <button
                onClick={() => setOrderStatusFilter("processing")}
                className={`px-3 sm:px-4 py-2 font-mont text-xs sm:text-sm border transition-colors ${
                  orderStatusFilter === "processing"
                    ? "border-[#e48bb0] bg-[#e48bb0] text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Processing
              </button>
              <button
                onClick={() => setOrderStatusFilter("completed")}
                className={`px-3 sm:px-4 py-2 font-mont text-xs sm:text-sm border transition-colors ${
                  orderStatusFilter === "completed"
                    ? "border-[#e48bb0] bg-[#e48bb0] text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {(() => {
            const filteredOrders =
              orderStatusFilter === "all"
                ? orders
                : orders.filter((order) => order.status === orderStatusFilter);

            return filteredOrders.length === 0 ? (
              <div className="bg-white border border-gray-300 p-6 sm:p-8 rounded text-center">
                <p className="text-gray-600 font-mont text-sm sm:text-base">
                  {orders.length === 0
                    ? "No orders yet"
                    : `No ${orderStatusFilter} orders`}
                </p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-300 p-4 sm:p-6 rounded"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 font-mont break-words">
                          Order ID: {order.id.slice(0, 8)}...
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 font-mont">
                          Date:{" "}
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                        {order.customer_name && (
                          <p className="text-xs sm:text-sm text-gray-600 font-mont break-words">
                            Customer: {order.customer_name}
                          </p>
                        )}
                        {order.customer_email && (
                          <p className="text-xs sm:text-sm text-gray-600 font-mont break-words">
                            Email: {order.customer_email}
                          </p>
                        )}
                        {order.order_note && (
                          <p className="text-xs sm:text-sm text-gray-600 font-mont break-words mt-2 italic">
                            <b className="text-[#e48bb0]">Note: </b>
                            {order.order_note}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col sm:items-end gap-2 sm:gap-0">
                        <p className="text-lg sm:text-xl font-mont sm:mb-2">
                          ${order.total.toFixed(2)} USD
                        </p>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(
                              order.id,
                              e.target.value as TOrder["status"]
                            )
                          }
                          className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 sm:py-1 font-mont text-sm"
                        >
                          <option value="new">New</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-mont font-semibold mb-2 text-sm sm:text-base">
                        Items:
                      </h4>
                      <ul className="space-y-2">
                        {order.items.map((item, index) => {
                          const product = stickers.find(
                            (s) => s.id_uuid === item.productId
                          );
                          return (
                            <li
                              key={index}
                              className="flex justify-between text-xs sm:text-sm font-mont gap-2"
                            >
                              <span className="flex-1 break-words">
                                {product?.name ||
                                  `Product ${item.productId.slice(0, 8)}`}{" "}
                                ×{item.quantity}
                              </span>
                              <span className="flex-shrink-0">
                                $
                                {(
                                  parseFloat(item.price) * item.quantity
                                ).toFixed(2)}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Sticker Quantities Summary */}
          {orderStatusFilter !== "all" &&
            Object.keys(quantitiesNeeded).length > 0 && (
              <div className="mt-6 sm:mt-8 bg-white border border-gray-300 p-4 sm:p-6 rounded">
                <h3 className="text-lg sm:text-xl mb-4">
                  {orderStatusFilter === "completed"
                    ? "Stickers Made"
                    : `Stickers to Make (${
                        orderStatusFilter.charAt(0).toUpperCase() +
                        orderStatusFilter.slice(1)
                      } Orders)`}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {Object.entries(quantitiesNeeded).map(
                    ([productId, quantity]) => {
                      const sticker = stickers.find(
                        (s) => s.id_uuid === productId
                      );
                      return (
                        <div
                          key={productId}
                          className="border border-gray-200 p-2 sm:p-3 rounded"
                        >
                          <p className="font-mont font-semibold text-xs sm:text-sm break-words">
                            {sticker?.name || productId.slice(0, 8)}
                          </p>
                          <p className="text-[#e48bb0] font-mont text-base sm:text-lg">
                            {quantity} stickers
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

function StickerModal({
  sticker,
  onSave,
  onClose,
}: {
  sticker: TSticker | null;
  onSave: () => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: sticker?.name || "",
    price: sticker?.price || "",
    file_path: sticker?.file_path || "",
    alt: sticker?.alt || "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Update form data when sticker changes
    setFormData({
      name: sticker?.name || "",
      price: sticker?.price || "",
      file_path: sticker?.file_path || "",
      alt: sticker?.alt || "",
    });
  }, [sticker]);

  useEffect(() => {
    // Close modal on ESC key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !saving) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose, saving]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (sticker) {
        await updateSticker(sticker.id_uuid, formData);
      } else {
        await createSticker(formData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving sticker:", error);
      alert("Failed to save sticker");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        // Close modal when clicking backdrop
        if (e.target === e.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Modal */}
      <div className="relative bg-white border border-gray-300 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-300 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            {sticker ? "Edit Sticker" : "Add New Sticker"}
          </h3>
          <button
            onClick={onClose}
            disabled={saving}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none disabled:opacity-50"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-mont text-sm mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              disabled={saving}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#e48bb0] disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-mont text-sm mb-2">
              Price (USD)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
              disabled={saving}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#e48bb0] disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-mont text-sm mb-2">
Sticker name
            </label>
            <input
              type="text"
              value={formData.file_path}
              onChange={(e) =>
                setFormData({ ...formData, file_path: e.target.value })
              }
              required
              disabled={saving}
              placeholder="e.g., first_drop_stickers/lego.png"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#e48bb0] disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-mont text-sm mb-2">
              Alt Text
            </label>
            <input
              type="text"
              value={formData.alt}
              onChange={(e) =>
                setFormData({ ...formData, alt: e.target.value })
              }
              required
              disabled={saving}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#e48bb0] disabled:opacity-50"
            />
          </div>
          <div className="flex gap-2 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 border border-black bg-white text-gray-700 py-2 px-4 font-mont hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : sticker ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 border border-gray-300 bg-white text-gray-700 py-2 px-4 font-mont hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
