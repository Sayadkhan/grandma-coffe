import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Connect to DB
    await connectDB();

    // Fetch all products, newest first
    const products = await Product.find().sort({ createdAt: -1 });

    // Respond with products
    return NextResponse.json({ products });
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
    return NextResponse.json(
      { message: "Error fetching products", error: error.message },
      { status: 500 }
    );
  }
}
