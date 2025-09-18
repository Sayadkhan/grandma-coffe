import React from "react";
import { Button } from "../ui/button";

const ViewModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Order Details
        </h2>

        {/* Order Info */}
        <div className="mb-4">
          <p>
            <span className="font-semibold">Order ID:</span>{" "}
            {order._id?.toUpperCase()}
          </p>
          <p>
            <span className="font-semibold">Payment Method:</span>{" "}
            {order.paymentMethod}
          </p>
          <p>
            <span className="font-semibold">Payment Status:</span>{" "}
            {order.paymentStatus}
          </p>
          <p>
            <span className="font-semibold">Delivery Status:</span>{" "}
            {order.deliveryStatus}
          </p>
        </div>

        {/* Customer Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {order.user?.name || "Guest"}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {order.user?.email || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Mobile:</span>{" "}
            {order.user?.mobile || "N/A"}
          </p>
        </div>

        {/* Items */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Purchased Items</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2">Image</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Variant</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                    </td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.variant || "-"}</td>
                    <td className="p-2">${item.price}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2 font-semibold">
                      ${item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="mb-6">
          <p>
            <span className="font-semibold">Total Quantity:</span>{" "}
            {order.totalQuantity}
          </p>
          <p>
            <span className="font-semibold">Total Price:</span> $
            {order.totalPrice?.toFixed(2)}
          </p>
        </div>

        {/* Address */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <p>{order.address?.street}</p>
          <p>
            {order.address?.city}, {order.address?.state}{" "}
            {order.address?.postalCode}
          </p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
