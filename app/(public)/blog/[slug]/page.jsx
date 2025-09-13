"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

// fetch blog details by ID
async function fetchBlog(slug) {

  const res = await fetch(`/api/blog/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}

function BlogDetailsContent() {
  const { slug } = useParams();


  const { data: blog } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => fetchBlog(slug),
    suspense: true,
  });

  const relatedPosts = [
    {
      id: 1,
      title: "Exploring Coffee Origins",
      img: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
    },
    {
      id: 2,
      title: "Best Brewing Techniques",
      img: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg",
    },
    {
      id: 3,
      title: "Sustainability in Coffee",
      img: "https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg",
    },
    {
      id: 4,
      title: "How to Taste Coffee Like a Pro",
      img: "https://images.pexels.com/photos/34085/pexels-photo.jpg",
    },
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
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          You May Also Like
        </h2>
        <Carousel className="w-full">
          <CarouselContent className="-ml-2">
            {relatedPosts.map((post, i) => (
              <CarouselItem
                key={post.id}
                className="pl-2 md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300 rounded-lg">
                    <CardContent className="p-0">
                      <Link key={post.id} href={`/blog/${post.id}`}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="relative"
                        >
                          <Image
                            src={post.img}
                            alt={post.title}
                            width={400}
                            height={300}
                            className="w-full object-cover aspect-[4/3]"
                          />
                          <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded-md shadow text-sm font-semibold text-white z-10">
                            {post.title}
                          </div>
                        </motion.div>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden lg:flex">
            <CarouselPrevious className="bg-amber-700 text-white hover:bg-amber-800" />
            <CarouselNext className="bg-amber-700 text-white hover:bg-amber-800" />
          </div>

          <div className="flex lg:hidden justify-center gap-4 mt-4">
            <CarouselPrevious className="bg-amber-700 text-white hover:bg-amber-800 relative static" />
            <CarouselNext className="bg-amber-700 text-white hover:bg-amber-800 relative static" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default function BlogDetailsModern() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-6 py-16 animate-pulse">
          <div className="h-10 w-1/2 bg-gray-200 rounded mb-6" />
          <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />
          <div className="h-[400px] bg-gray-200 rounded-xl mb-6" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-6 w-full bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      }
    >
      <BlogDetailsContent />
    </Suspense>
  );
}
