"use client";

import React, {  Suspense } from "react";
import { motion } from "framer-motion";
import ProductTable from "@/components/Admin/Product/ProductTable";



const AllProductsPage = () => {


  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full mx-auto bg-white rounded-2xl shadow-xl p-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          All Products
        </h1>

        <Suspense fallback={<p className="text-center text-gray-500">Loading products...</p>}>
          <ProductTable />
        </Suspense>
      </motion.div>
    </div>
  );
};

export default AllProductsPage;
