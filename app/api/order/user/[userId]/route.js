import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { userId } = params;

    console.log(userId);

    // Find orders only for this user
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    console.log(orders);

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders for user:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
