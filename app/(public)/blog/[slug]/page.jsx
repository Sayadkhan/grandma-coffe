import BlogDetailsModern from "./components/BlogDetailsModern";


async function getBlogData(slug) {
  const baseURL =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseURL}/api/blog/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

// ✅ Dynamic Metadata using a single fetch
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
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`,
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

export default async function BlogPage({ params }) {
  const blog = await getBlogData(params.slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold text-gray-600">
          🚫 Blog Not Found
        </p>
      </div>
    );
  }

  return <BlogDetailsModern blog={blog} />;
}
