import { NextResponse } from "next/server";

import Blog from "@/models/Blog";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Customer from "@/models/Customer";
import { connectDB } from "@/lib/mongodb";

export async function GET(req) {
  try {
    // Connect to DB
    await connectDB();

    // Fetch counts instead of full data
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();
    const blogsCount = await Blog.countDocuments();
    const customersCount = await Customer.countDocuments();

    // Respond with counts
    return NextResponse.json({
      products: productsCount,
      orders: ordersCount,
      blogs: blogsCount,
      customers: customersCount,
    });
  } catch (error) {
    console.error("❌ Failed to fetch Dashboard Data:", error);
    return NextResponse.json(
      { message: "Error fetching Dashboard Data", error: error.message },
      { status: 500 }
    );
  }
}
