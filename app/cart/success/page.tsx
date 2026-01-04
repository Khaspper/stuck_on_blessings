"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Success() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [failedOrder, setFailedOrder] = useState(false);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching session:", error);
          setFailedOrder(true);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (failedOrder) {
    return (
      <div>
        <p>Order Failed</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Payment successful</h1>
      <p>Your order is being processed.</p>
    </div>
  );
}
