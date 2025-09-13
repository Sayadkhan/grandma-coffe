"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
    >
      {/* Image + Category */}
      <div className="relative w-full h-52">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-3 left-3 bg-[#2c1e1b] text-white text-xs font-medium px-3 py-1 rounded-full">
          {blog.category || "Coffee"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Meta Info */}
        <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime} mins read</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-[#2c1e1b] mb-2 line-clamp-2">
          {blog.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {blog.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">
            {blog.author}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
