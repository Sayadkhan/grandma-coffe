import AdminDashboard from '@/components/Admin/Dashboard.js/AdminDashboard';

async function getDashboard() {
  "use server";
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseURL}/api/dashboard`, { cache: "no-store" });

  if (!res.ok) return null;

  const data = await res.json();

  // Return the whole object
  return {
    orders: data.orders,
    products: data.products,
    blogs: data.blogs,
    customers: data.customers,
  };
}

const Page = async () => {
  const dashboardData = await getDashboard();
  console.log("Dashboard Data:", dashboardData);

  return (
    <div>
      <AdminDashboard dashboardData={dashboardData} />
    </div>
  );
};

export default Page;
