// app/admin/product/[id]/edit/page.jsx

import ProductEditForm from "../../components/ProductEditForm";


// Server-side fetch
async function getProductData(id) {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseURL}/api/product/${id}`, { cache: "no-store" });

  if (!res.ok) return null;
  return res.json();
}

async function getCategories() {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseURL}/api/categories`, { cache: "no-store" });

  if (!res.ok) return [];
  const data = await res.json();
  return data.categories || [];
}

// ✅ Dynamic Metadata for product edit page
export async function generateMetadata({ params }) {
  const { id } = params;
  const product = await getProductData(id);

  if (!product)
    return {
      title: "Edit Product | Admin",
      description: "Edit your product details in admin panel",
    };

  return {
    title: `Edit ${product.name} | Admin`,
    description: `Update details for product ${product.name}`,
  };
}

export default async function EditProductPage({ params }) {
  const { id } = params;

  const productData = await getProductData(id);
  const categories = await getCategories();

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold text-gray-600">
          🚫 Product Not Found
        </p>
      </div>
    );
  }

  // ✅ Render the client-side form with initial data
  return <ProductEditForm productData={productData} categories={categories} />;
}
