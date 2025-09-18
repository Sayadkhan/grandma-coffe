import ProductPageClient from "@/components/product/ProductPageClient";

export default async function ProductPage({ params }) {
  const resolvedParams = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/product/${resolvedParams.id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return (
        <p className="text-center text-red-600 py-10">❌ Product not found</p>
      );
    }

    const product = await res.json();

    return (
      <div className="min-h-screen bg-white">
        <ProductPageClient product={product} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <p className="text-center text-red-600 py-10">
        ❌ Failed to load product
      </p>
    );
  }
}
