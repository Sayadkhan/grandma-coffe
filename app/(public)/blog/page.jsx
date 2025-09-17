

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AboutHero from "@/components/About/AboutHero";
import BlogCard from "@/components/Blog/BlogCard";
import { useQuery } from "@tanstack/react-query";
import BlogList from "./components/BlogList";

// fetcher
async function fetchBlogs() {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseURL}/api/blog`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

async function getCategories() {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseURL}/api/categories`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

// function BlogList() {


//   return (
//     <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
//       {blogs.map((blog, index) => (
//         <Link key={blog._id} href={`/blog/${blog._id}`}>
//           <BlogCard blog={blog} index={index} />
//         </Link>
//       ))}
//     </div>
//   );
// }

const BlogPage = async () => {

  const [blogs] = await Promise.all([
    fetchBlogs(),
    // getFeatured(),
   
  ]);

  console.log("Blogs data:", blogs);


  return (
    <div className="bg-[#f9f7f4] min-h-screen">
      {/* Blog Hero */}
      <AboutHero
        title="Our Blog"
        subtitle="Stories • Coffee • Music"
        tagline="Sip on our latest thoughts, stories, and inspirations. From brewing secrets to behind-the-scenes of Grandma’s Essence, this is where coffee meets melody."
        bgImage="https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg"
      />

      {/* Blog Section */}
      <div className="container mx-auto px-6 py-16">
        <h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-[#2c1e1b] mb-12"
        >
          Latest Articles
        </h1>

        <Suspense
          fallback={
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 rounded-xl animate-pulse"
                />
              ))}
            </div>
          }
        >
          <BlogList blogs={blogs} />
        </Suspense>
      </div>
    </div>
  );
};

export default BlogPage;
