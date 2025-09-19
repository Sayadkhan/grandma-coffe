import BlogDetailsModern from "./components/BlogDetailsModern";
import { notFound } from "next/navigation";
import { cache } from "react";

// ✅ Cached fetch so generateMetadata & page can share data
const getBlogData = cache(async (slug) => {
  const baseURL =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseURL}/api/blog/${slug}`, {
    cache: "no-store", // SSR only, no caching
  });

  if (!res.ok) return null;
  return res.json();
});

// ✅ Dynamic Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params; 
  const blog = await getBlogData(slug);

  if (!blog)
    return {
      title: "Blog | My Blog",
      description: "Explore our latest blogs and resources.",
    };

  return {
    title: `${blog.title} | My Blog`,
    description: blog.excerpt,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
      siteName: "My Blog",
      images: [{ url: blog.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  };
}


// ✅ Page
export default async function BlogPage({ params }) {
  const {slug} = await params
  const blog = await getBlogData(slug);

  if (!blog) {
    notFound(); 
  }

  return <BlogDetailsModern blog={blog} />;
}
