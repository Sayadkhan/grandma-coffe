import React, { useState } from "react";
import { Button } from "../ui/button";

const OrderModal = ({ order, onClose, onSave }) => {
  const [formData, setFormData] = useState(order);

  // Handle general fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle user fields
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      user: { ...prev.user, [name]: value },
    }));
  };

  // Handle address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  // Handle item quantity change
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: name === "quantity" ? parseInt(value) || 0 : value,
    };

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  // Recalculate total price & quantity
  const recalcTotal = () => {
    const totalPrice = formData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalQuantity = formData.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setFormData((prev) => ({
      ...prev,
      totalPrice,
      totalQuantity,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Order</h2>

        {/* Customer Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Customer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.user?.name || ""}
              onChange={handleUserChange}
              className="border w-full rounded p-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.user?.email || ""}
              onChange={handleUserChange}
              className="border w-full rounded p-2"
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={formData.user?.mobile || ""}
              onChange={handleUserChange}
              className="border w-full rounded p-2"
            />
          </div>
        </div>

        {/* Order Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Order Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="paymentStatus"
              value={formData.paymentStatus || ""}
              onChange={handleChange}
              className="border w-full rounded p-2"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              name="deliveryStatus"
              value={formData.deliveryStatus || ""}
              onChange={handleChange}
              className="border w-full rounded p-2"
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Items */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Items</h3>
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
                {formData.items?.map((item, index) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                    </td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.variant}</td>
                    <td className="p-2">${item.price}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleItemChange(index, e)}
                        className="border rounded p-1 w-16 text-center"
                      />
                    </td>
                    <td className="p-2 font-semibold">
                      ${item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-3">
            <Button onClick={recalcTotal}>Recalculate Total</Button>
          </div>
        </div>

        {/* Totals */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="totalQuantity"
              value={formData.totalQuantity || 0}
              onChange={handleChange}
              className="border w-full rounded p-2"
              readOnly
            />
            <input
              type="number"
              name="totalPrice"
              value={formData.totalPrice || 0}
              onChange={handleChange}
              className="border w-full rounded p-2"
              readOnly
            />
          </div>
        </div>

        {/* Address Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Shipping Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.address?.street || ""}
              onChange={handleAddressChange}
              className="border w-full rounded p-2"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.address?.city || ""}
              onChange={handleAddressChange}
              className="border w-full rounded p-2"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.address?.state || ""}
              onChange={handleAddressChange}
              className="border w-full rounded p-2"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.address?.postalCode || ""}
              onChange={handleAddressChange}
              className="border w-full rounded p-2"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
