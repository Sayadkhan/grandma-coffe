import UserOrderTable from "@/components/order/UserOrder/UserOrderTable";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // 🔑 forces SSR, no caching

async function getOrderByUser(userId) {
  // const baseURL =  "http://localhost:3000";
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseURL}/api/order/user/${userId}`, { cache: "no-store" });
  if (!res.ok) return { orders: [] };
  return res.json();
}

export default async function Page() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value; 
  const data = userId ? await getOrderByUser(userId) : { orders: [] };



  return (
<div className="p-8">
  <div>
    <UserOrderTable ordersData={data.orders}/>
  </div>
    </div>
  );
}
