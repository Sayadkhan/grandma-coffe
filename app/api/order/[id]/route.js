import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const updates = await req.json();

    delete updates._id;

    // ✅ Always return the full document after update
    const updatedOrder = await Order.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("user");

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder);
  } catch (err) {
    console.error("PATCH order error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Order deleted successfully", id: deletedOrder._id },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE order error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
