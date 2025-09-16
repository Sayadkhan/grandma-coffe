import { Suspense } from "react";

import { fetchCategories } from "@/utils/api";
import CategoriesPage from "../components/CategoriesPage";

export default async function Page({ searchParams }) {
  const params = await searchParams; // ✅ fix
  const page = Number(params?.page) || 1;
  const limit = 10;

  // Fetch categories server-side
  const data = await fetchCategories(page, limit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-6">
      <div className="w-full mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          All Categories
        </h1>

        <Suspense fallback={<p className="text-center mt-10 text-gray-500">Loading...</p>}>
          {/* ✅ Pass initial data to client */}
          <CategoriesPage initialData={data} page={page} limit={limit} />
        </Suspense>
      </div>
    </div>
  );
}
