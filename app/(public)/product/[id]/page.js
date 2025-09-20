import ProductPageClient from "@/components/product/ProductPageClient";
import { cache } from "react";

// Cached fetch for product
const getProductData = cache(async (id) => {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseURL}/api/product/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
});

const Page = async ({ params }) => {
  const { id } = await params;
  const data = await getProductData(id);

  if (!data) {
    return (
      <p className="text-center text-red-600 py-10">❌ Product not found</p>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ProductPageClient product={data} />
    </div>
  );
};

export default Page;
