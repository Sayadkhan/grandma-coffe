import ProductTable from "@/components/Admin/Product/ProductTable";


async function getProducts() {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseURL}/api/products`, {
    cache: "no-store", 
  });

  if (!res.ok) return null;
  return res.json();
}

// ✅ Optional: Dynamic Metadata for SEO
export async function generateMetadata() {
  return {
    title: "All Products | My Shop",
    description: "Browse all products available in our store.",
  };
}

export default async function AllProductsPage() {
  const {products} = await getProducts();



  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold text-gray-600">
          🚫 No Products Found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          All Products
        </h1>

        <ProductTable products={products} />
      </div>
    </div>
  );
}
