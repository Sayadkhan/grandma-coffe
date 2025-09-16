"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

export default function BlogDetailsModern({ blog }) {
  const relatedPosts = [
    // ... your static related posts array
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 mt-32">
      {/* Header */}
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
        <p className="text-lg text-gray-600 max-w-3xl">{blog.excerpt}</p>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-6 text-sm text-gray-500 flex gap-2">
        <span className="text-blue-600 font-medium cursor-pointer">
          Resources
        </span>
        <span>/</span>
        <span className="text-blue-600 font-medium cursor-pointer">
          {blog.category}
        </span>
      </div>

      {/* Hero Image */}
      <div className="container mx-auto px-2 lg:px-6 mt-10">
        <div className="relative w-full h-[400px] lg:h-[650px] rounded-xl overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
            <div className="p-6 md:p-10 text-white">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{blog.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-6 py-16 prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700"
        dangerouslySetInnerHTML={{
          __html: blog.content || "<p>No content available.</p>",
        }}
      />

      {/* Related Blog Carousel */}
      {/* ... keep your carousel code as is ... */}
    </div>
  );
}
