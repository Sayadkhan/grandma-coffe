"use client";

import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import AddBlog from "@/components/Admin/Blog/AddBlog";

const AddBlogSkeleton = () => (
  <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-pulse">
    {/* Title */}
    <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>

    {/* Input fields */}
    <div className="space-y-4">
      <div className="h-10 bg-gray-200 rounded w-full"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>

    {/* Image Upload */}
    <div className="h-32 w-48 bg-gray-200 rounded mx-auto"></div>

    {/* Rich Text Editor */}
    <div className="h-40 bg-gray-200 rounded w-full"></div>

    {/* Submit Button */}
    <div className="h-10 bg-gray-200 rounded w-full"></div>
  </div>
);

export default function AddBlogForm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white p-6">
      <Suspense fallback={<AddBlogSkeleton />}>
        <AddBlog />
      </Suspense>
    </div>
  );
}
