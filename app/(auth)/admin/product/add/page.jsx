// app/dashboard/products/add/page.js

import { fetchCategories } from "@/utils/api";
import AddProductPage from "../components/AddProductFrom";

export default async function AddProduct() {
  const page = 1;
  const limit = 10;

  // ✅ Fetch categories on the server
  const categoriesData = await fetchCategories(page, limit);

  return (
    <AddProductPage
      initialCategories={categoriesData?.categories || []}
    />
  );
}
