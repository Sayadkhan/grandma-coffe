import OrderTable from "@/components/order/OrderTable";


async function getOrder() {
  "use server";
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";


  const res = await fetch(`${baseURL}/api/order`, { cache: "no-store" });


  if (!res.ok) return null;

  const data = await res.json();
  return data.orders;  
}

 export default async function AllOrdersPage() {

  const orders = await getOrder();




  return (
    <div>
      <OrderTable orders={orders} />
    </div>
  )
}


