"use client";
import ProductItem from "@/components/product/ProductCard";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import ProductCardSkeleton from "@/skatallon/ProductCardSkeleton";

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function ProductGrid() {
const { data, isLoading } = useProducts();
const products = data?.products || [];


  return (
<div>
  {isLoading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 xl:gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 xl:gap-8">
      {products.map((product) => (
        <div key={product._id} className="relative group">
          <motion.div
            key={`animated-${product._id}`}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
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
</div>

  );
}

const ProductSection = () => {
  return (
    <section className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Our Coffee Collection
      </h2>

      <Suspense fallback={<ProductCardSkeleton count = {3} />}>
        <ProductGrid />
      </Suspense>

      {/* CTA Button */}
      <div className="flex justify-center mt-12">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/shop">
            <Button className="bg-amber-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-amber-800 transition-colors cursor-pointer">
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSection;
