"use client";

import { Suspense,  } from "react";
import { motion } from "framer-motion";
import BlogGrid from "@/components/Blog/BlogGrid";



// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";
// export const revalidate = 0;




export default function AllBlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-6">
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
        >
          📰 Manage Blogs
        </motion.h1>

        {/* Suspense boundary */}
        <Suspense
          fallback={
            <p className="text-center text-gray-500 animate-pulse">
              Loading blogs...
            </p>
          }
        >
          <BlogGrid />
        </Suspense>
      </div>
    </div>
  );
}
