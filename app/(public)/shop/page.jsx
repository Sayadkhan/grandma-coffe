
import ShopContent from "@/components/shop/ShopContent";
import { Suspense } from "react";

async function getProducts() {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseURL}/api/products`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}
async function getCategories() {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseURL}/api/categories`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}




export default async function ShopPage() {

   const [products, category] = await Promise.all([
    getProducts(),
    // getFeatured(),
    getCategories(),
  ]);

  return (
     <div className="min-h-screen  bg-white">
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <ShopContent   
      products={products.products}
      category={category.categories} 
        />
    </Suspense>
     </div>
  );
}
