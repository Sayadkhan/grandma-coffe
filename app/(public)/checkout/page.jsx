"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock } from "lucide-react";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [discount, setDiscount] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // <-- modal state
  const [paymentMethod, setPaymentMethod] = useState(""); // <-- selected payment

  const user = useSelector((state) => state.customer.customer);
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  const shippingFee = 5;
  const discountAmount = discount === "SAVE10" ? 10 : 0;
  const finalTotal = totalPrice + shippingFee - discountAmount;

  // Default select the first address
  React.useEffect(() => {
    if (user?.addresses?.length > 0) {
      const primary = user.addresses.find((addr) => addr.isDefault);
      setSelectedAddressId(primary?._id || user.addresses[0]._id);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedAddress = user.addresses.find(
      (addr) => addr._id === selectedAddressId
    );

    console.log("Order submitted", {
      deliveryType,
      user,
      items,
      totalQuantity,
      totalPrice,
      discount,
      selectedAddress,
      paymentMethod,
    });

    alert(`Order placed successfully! Payment method: ${paymentMethod}`);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 mt-32">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl p-6">
        {/* Left Side - Shipping Form */}
        <form className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Checkout</h1>

          {/* Delivery or Pickup */}
          <div className="flex gap-4">
            {["delivery", "pickup"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setDeliveryType(type)}
                className={`flex-1 border rounded-xl py-3 text-center ${
                  deliveryType === type
                    ? "border-blue-600 bg-blue-50 text-blue-700 font-medium"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {type === "delivery" ? "🚚 Delivery" : "🏬 Pick Up"}
              </button>
            ))}
          </div>

          {/* Address Selection */}
          {deliveryType === "delivery" && user?.addresses?.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="font-medium text-gray-700">Select delivery address</h2>
              {user.addresses.map((addr, index) => (
                <label
                  key={index}
                  className={`flex justify-between items-center border p-3 rounded-lg cursor-pointer ${
                    selectedAddressId === addr._id ? "border-blue-600 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <div>
                    <p className="font-medium">{addr.label || "Address"}</p>
                    <p className="text-sm text-gray-600">
                      {addr.street}, {addr.city}, {addr.state}, {addr.postalCode}, {addr.country}
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddressId === addr._id}
                    onChange={() => setSelectedAddressId(addr._id)}
                    className="w-4 h-4"
                  />
                </label>
              ))}
            </div>
          )}

          {/* Pre-fill from user state */}
          <Input placeholder="Full name *" defaultValue={user?.name || ""} required />
          <Input placeholder="Email address *" type="email" defaultValue={user?.email || ""} required />
          <Input placeholder="Phone number *" type="tel" defaultValue={user?.mobile || ""} required />

          <div className="flex items-center gap-2">
            <Checkbox id="terms" required />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I have read and agree to the Terms and Conditions.
            </label>
          </div>

          <Button
            type="button"
            onClick={() => setModalOpen(true)} // <-- open modal
            className="lg:hidden w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 rounded-xl mt-4"
          >
            Place Order
          </Button>
        </form>

        {/* Right Side - Order Summary */}
        <Card className="border shadow-none">
          <CardContent className="p-6 flex flex-col gap-6">
            <h2 className="text-lg font-semibold">Review your cart</h2>

            {/* Cart Items */}
            <div className="flex flex-col gap-4">
              {items.length > 0 ? (
                items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div className="flex gap-3 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500 text-sm">{item.quantity}x</p>
                      </div>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">Your cart is empty.</p>
              )}
            </div>

            {/* Discount Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Discount code"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  alert(discount === "SAVE10" ? "Discount applied!" : "Invalid code")
                }
              >
                Apply
              </Button>
            </div>

            {/* Price Summary */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>- ${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => setModalOpen(true)}
              className="hidden lg:block w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 rounded-xl"
            >
              Pay Now
            </Button>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Lock className="w-4 h-4" />
              <p>Secure Checkout – Your payment details are encrypted and safe.</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Select Payment Method</h2>

              {["Cash on Delivery", "Stripe", "PayPal"].map((method) => (
                <label key={method} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="w-4 h-4"
                  />
                  <span>{method}</span>
                </label>
              ))}

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!paymentMethod}
                >
                  Confirm & Pay
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
