import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
        variant: String,
      },
    ],

    totalQuantity: Number,
    totalPrice: Number,
    discount: { type: String, default: "" },

    deliveryType: {
      type: String,
      enum: ["delivery", "pickup"],
      default: "delivery",
    },

    address: {
      label: String,
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },

    paymentMethod: String,

    PaymentStatus: {
      type: String,
      enum: [
        "pending",
        "pending_payment",
        "paid",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    deliveryStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
