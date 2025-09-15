"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/order-success?session_id=${sessionId}`);
        const data = await res.json();
        if (data.success) setSession(data.session);
        else setError(data.message || "Failed to fetch session");
      } catch (err) {
        setError("Failed to fetch session");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg mb-6">
        Thank you for your order. Your payment of <strong>${(session.amount_total/100).toFixed(2)}</strong> has been received.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3">Order Details</h2>
        {session?.line_items?.data.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.description}</span>
            <span>{item.quantity} × ${(item.price.unit_amount/100).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSuccessPage;
