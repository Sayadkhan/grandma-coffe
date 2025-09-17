// app/api/orders/route.js
import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/lib/mongodb";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 📌 Create Order (POST)
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { paymentMethod, filterIteambyUser, totalPrice } = body;

    // const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const baseUrl = "http://localhost:3000";

    // 1. If COD → just create order in DB
    if (paymentMethod === "cod") {
      const order = await Order.create(body);
      return NextResponse.json({ success: true, order }, { status: 201 });
    }

    // 2. If Stripe → create Checkout Session
    if (paymentMethod === "stripe") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: filterIteambyUser.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [
                item.image ||
                  item.imageUrl ||
                  item.imageUrls?.[0] ||
                  "https://via.placeholder.com/150",
              ],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `${baseUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/checkout`,
      });

      const order = await Order.create(body);

      return NextResponse.json({ success: true, order, id: session.id });
    }

    // 3. (Optional) If PayPal later, handle here...
    return NextResponse.json(
      { success: false, message: "Invalid payment method" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// 📌 Get All Orders (GET)
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().populate("user", "name email");
    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
