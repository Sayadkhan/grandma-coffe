
import ShopContent from "@/components/shop/ShopContent";


async function getProducts() {
"use server";
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseURL}/api/products`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}
async function getCategories() {
"use server";
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseURL}/api/categories`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}


export const dynamic = "force-dynamic";

export default async function ShopPage() {

   const [products, category] = await Promise.all([
    getProducts(),
    // getFeatured(),
    getCategories(),
  ]);

  return (
     <div className="min-h-screen  bg-white">
 
    <ShopContent   
      products={products.products}
      category={category.categories} 
        />

     </div>
  );
}
