"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/redux/slice/cartSlice";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const user = useSelector((state) => state.customer.customer);
  const dispatch = useDispatch();

 
  
  
  const filterIteambyUser = items.filter(item => item.userId === user?._id);

  const [deliveryType, setDeliveryType] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);

  

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  // Place order function
const handlePlaceOrder = async () => {
  if (!items.length) {
    toast.error("Your cart is empty!");
    return;
  }

  if(!address) {
    toast.error("Please select or enter a delivery address.");
    return;
  }

  setLoading(true);
  try {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: user?._id,
        filterIteambyUser,
        totalQuantity,
        totalPrice,
        deliveryType,
        paymentMethod,
        address,
      }),
    });

    const data = await res.json();

    if (data.success) {
      if (paymentMethod === "stripe") {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.id });
      } else {
        toast.success("Order placed successfully!");
        dispatch(clearCart());
      }
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  } catch (error) {
    toast.error("Failed to place order.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-10 mt-32">
      <div className="container mx-auto p-6 grid md:grid-cols-2 gap-6">
        {/* Left Side - Customer Info */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <Input placeholder="Full Name" defaultValue={user?.name || ""} />
              <Input
                placeholder="Email Address"
                defaultValue={user?.email || ""}
              />
              <Input
                placeholder="Phone Number"
                defaultValue={user?.mobile || ""}
              />
            </CardContent>
          </Card>

     
        {/* Delivery */}
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">Delivery Details</h2>
          <div className="flex flex-wrap gap-3">
            {user?.addresses && user.addresses.length > 0 ? (
              user.addresses.map((address, index) => (
                <div key={index}>
                  <Button
                    onClick={() => setAddress(address)}
                    className={`p-3 border rounded-lg cursor-pointer hover:border-amber-500 transition ${
                      address === address ? "border-amber-500" : ""
                    }`}
                  >
                    <p className="font-medium">{address.street}</p>
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.state}, {address.postalCode},{" "}
                      {address.country}
                    </p>
                  </Button>
                </div>
              ))
            ) : (
              <div className="space-y-3 w-full">
                <p className="text-gray-500">No saved addresses</p>

                {/* Manual Address Form */}
                <div className="space-y-2">
                  <Input
                    placeholder="Street"
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                  />
                  <Input
                    placeholder="City"
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                  />
                  <Input
                    placeholder="State"
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Postal Code"
                    onChange={(e) =>
                      setAddress({ ...address, postalCode: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Country"
                    onChange={(e) =>
                      setAddress({ ...address, country: e.target.value })
                    }
                  />

                  <Button
                    onClick={() => {
                      if (
                        address?.street &&
                        address?.city &&
                        address?.state &&
                        address?.postalCode &&
                        address?.country
                      ) {
                        toast.success("Address saved!");
                       
                      } else {
                        toast.error("Please fill all fields.");
                      }
                    }}
                    className="w-full"
                  >
                    Save Address
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
        {/* Right Side - Order Summary */}
        <div className="space-y-6">
          <Card className="shadow-lg rounded-2xl sticky top-4">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-2 divide-y">
                {filterIteambyUser.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center py-2"
                  >
                    {/* Left side: image + details */}
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.image ||
                          item.imageUrl ||
                          item.imageUrls?.[0] ||
                          "/placeholder.png"
                        }
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md border"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.variant?.packetSize && (
                          <p className="text-xs text-gray-500">
                            Variant: {item.variant.packetSize}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">
                          {item.quantity} × ${item.price}
                        </p>
                      </div>
                    </div>

                    {/* Right side: total price */}
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>{deliveryType === "delivery" ? "$5.00" : "Free"}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    $
                    {(
                      totalPrice + (deliveryType === "delivery" ? 5 : 0)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4 p-6">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button
                    variant={paymentMethod === "cod" ? "default" : "outline"}
                    className="w-full py-6 flex flex-col items-center gap-2"
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <span className="text-sm font-medium">Cash on Delivery</span>
                  </Button>
                  <Button
                    variant={paymentMethod === "stripe" ? "default" : "outline"}
                    className="w-full py-6 flex flex-col items-center gap-2"
                    onClick={() => setPaymentMethod("stripe")}
                  >
                    <span className="text-sm font-medium">Stripe</span>
                  </Button>
                  <Button
                    variant={paymentMethod === "paypal" ? "default" : "outline"}
                    className="w-full py-6 flex flex-col items-center gap-2"
                    onClick={() => setPaymentMethod("paypal")}
                  >
                    <span className="text-sm font-medium">PayPal</span>
                  </Button>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                className="w-full flex items-center gap-2"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                <Lock size={18} />
                {loading ? "Placing Order..." : "Place Order"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
