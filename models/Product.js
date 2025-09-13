import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDesc: { type: String },
    desc: { type: String },
    price: { type: Number, required: true }, // base/default price
    stock: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    discountType: {
      type: String,
      enum: ["percentage", "flat"],
      default: "percentage",
    },
    category: { type: String, required: true },
    tags: [{ type: String }],
    images: [{ type: String }],

    variants: [
      {
        packetSize: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
