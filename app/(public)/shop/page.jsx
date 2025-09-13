"use client";
import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductItem from "@/components/product/ProductCard";
import SidebarFilters from "@/components/shop/SidebarFilters";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategory";
import ProductCardSkeleton from "@/skatallon/ProductCardSkeleton";

function ShopContent() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

const { data: productData, isLoading: productsLoading } = useProducts();
const { data: categoryData, isLoading: categoriesLoading } = useCategories();

const products = productData?.products || [];
const categories = categoryData?.categories?.map((c) => c.name) || [];


  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((p) => selectedCategories.includes(p.category))
      : products;

  return (
    <div className="container mx-auto px-6 py-12 mt-20 min-h-screen">
      {/* Filter Button (mobile only) */}
      <div className="lg:hidden mb-6 flex justify-end">
        <Button
          variant="outline"
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal size={18} />
          Filters
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <SidebarFilters
          categories={categories}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
        />

        {/* Divider Line */}
        <div className="hidden lg:block w-0.5 bg-gray-200 mx-12" />

        {/* Products */}
          <main className="flex-1">
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-5 xl:gap-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-5 xl:gap-8">
              {filteredProducts.map((product) => (
                <div key={product._id} className="relative group">
                  <motion.div
                    key={`animated-${product._id}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4 }}
                    className="hidden sm:block"
                  >
                    <ProductItem product={product} />
                  </motion.div>
                  <div key={`static-${product._id}`} className="block sm:hidden">
                    <ProductItem product={product} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ProductCardSkeleton />}>
      <ShopContent />
    </Suspense>
  );
}
