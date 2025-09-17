"use client";

import * as React from "react";
import { useState, useMemo, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import ProductCardSkeleton from "@/skatallon/ProductCardSkeleton";
import { useCategories } from "@/hooks/useCategory";

// ------------------- Product Carousel -------------------
function ProductCarousel({ selectedCategory, products }) {
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p?.category === selectedCategory);
  }, [products, selectedCategory]);

  if (!filteredProducts.length) {
    return (
      <p className="text-center py-12 text-gray-500">
        No products found.
      </p>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-2">
        {filteredProducts
          .filter((p) => p && p._id) // safety check
          .map((product, index) => (
            <CarouselItem
              key={product._id}
              className="pl-2 md:basis-1/2 lg:basis-1/3"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300 rounded-lg">
                  <CardContent className="p-0">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <Image
                        src={product.images?.[0] || ""}
                        alt={product.name}
                        width={300}
                        height={300}
                        loading="lazy"
                        className="w-full object-cover aspect-square"
                      />
                      <div className="absolute bottom-3 left-3 bg-amber-50/90 px-3 py-1 rounded-md shadow text-sm font-semibold text-amber-900 z-10">
                        {product.name}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
      </CarouselContent>

      {/* Controls */}
      <div className="hidden lg:flex">
        <CarouselPrevious className="bg-amber-700 text-white hover:bg-amber-800" />
        <CarouselNext className="bg-amber-700 text-white hover:bg-amber-800" />
      </div>
      <div className="flex lg:hidden justify-center gap-4 mt-4">
        <CarouselPrevious className="bg-amber-700 text-white hover:bg-amber-800" />
        <CarouselNext className="bg-amber-700 text-white hover:bg-amber-800" />
      </div>
    </Carousel>
  );
}

// ------------------- Main Component -------------------
export default function ProductSlider({ products = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // fetch categories
  const { data: categoryData, isLoading: categoriesLoading } = useCategories();
  const categories = ["All", ...(categoryData?.categories?.map((c) => c.name) || [])];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-10 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            Explore Our Signature Coffee Collection
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            From bold espresso shots to refreshing iced blends, our coffee is
            crafted to energize your day.
          </p>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categoriesLoading ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-amber-700 hover:bg-amber-800 text-white"
                      : "border-amber-700 text-amber-700 hover:bg-amber-100"
                  }
                >
                  {category}
                </Button>
              ))
            )}
          </div>
        </motion.div>

        {/* Right Column */}
        <div>
          <Suspense fallback={<ProductCardSkeleton />}>
            <ProductCarousel
              selectedCategory={selectedCategory}
              products={products}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
