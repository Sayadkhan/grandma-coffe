// import Stripe from "stripe";
// import { buffer } from "micro";
// import connectDB from "@/lib/connectDB";
// import Order from "@/models/Order";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// export const config = { api: { bodyParser: false } };

// export async function POST(req) {
//   const buf = await buffer(req);
//   const sig = req.headers["stripe-signature"];
//   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
//   } catch (err) {
//     console.error("Stripe Webhook Error:", err.message);
//     return new Response(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     try {
//       await connectDB();

//       // Create order in MongoDB after successful payment
//       await Order.create({
//         user: session.metadata.userId,
//         items: JSON.parse(session.metadata.items || "[]"),
//         totalPrice: parseFloat(session.metadata.totalPrice),
//         deliveryType: session.metadata.deliveryType,
//         paymentMethod: "stripe",
//         address: JSON.parse(session.metadata.address || "{}"),
//         stripeSessionId: session.id,
//       });

//       console.log("Stripe order saved:", session.id);
//     } catch (err) {
//       console.error("Failed to save Stripe order:", err.message);
//     }
//   }

//   return new Response(JSON.stringify({ received: true }), { status: 200 });
// }
