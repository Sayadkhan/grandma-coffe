import NewsletterSection from "@/components/common/NewsletterSection";
import BandStory from "@/components/Home/BandStorySection";
import Featured from "@/components/Home/featured/FeaturedCategory";
import CarouselDemo from "@/components/Home/HeroCarousel";
import ProductSection from "@/components/Home/Product/ProductSection";
import ProductSlider from "@/components/Home/ProductSliderSection";
import WholesaleHero from "@/components/Home/WholeSell";
import { Suspense } from "react";

// ✅ Example server fetchers
async function getProducts() {
  "use server";
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseURL}/api/products`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}
async function getCategories() {
  "use server";
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseURL}/api/categories`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

// ✅ Dynamic Metadata
export async function generateMetadata() {
  return {
    title: "Home | My Coffee Store",
    description:
      "Shop premium coffee blends, explore stories, and discover more.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    },
    openGraph: {
      title: "My Coffee Store",
      description: "Freshly roasted coffee delivered to your door.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      siteName: "My Coffee Store",
      images: [
        {
          url: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "My Coffee Store",
      description: "Freshly roasted coffee delivered to your door.",
      images: [
        "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
      ],
    },
  };
}

export const dynamic = "force-dynamic";

// ✅ Home Page (Server Component)
export default async function HomePage() {
  const [products, category] = await Promise.all([
    getProducts(),
    // getFeatured(),
    getCategories(),
  ]);

  const slides = [
    {
      id: 1,
      title: "Single Origin Espresso",
      subtitle: "Caramel • Dark Chocolate • Cherry",
      src: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
    },
    {
      id: 2,
      title: "Pour Over Blend",
      subtitle: "Citrus • Floral • Clean Finish",
      src: "https://images.pexels.com/photos/606545/pexels-photo-606545.jpeg",
    },
    {
      id: 3,
      title: "Cold Brew",
      subtitle: "Smooth • Low Acid • Refreshing",
      src: "https://images.pexels.com/photos/266755/pexels-photo-266755.jpeg",
    },
    {
      id: 4,
      title: "Roaster’s Choice",
      subtitle: "Seasonal • Limited • Bright",
      src: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
    },
  ];

  return (
    <div>
      <CarouselDemo slides={slides} />

      {/* Products */}
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
        <ProductSlider
          products={products.products}
          category={category.categories}
        />
      </Suspense>

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
        <ProductSection products={products.products} />
      </Suspense>

      {/* Featured */}

      <Featured />

      {/* Story */}

      <BandStory />

      {/* Wholesale */}

      <WholesaleHero />

      {/* Newsletter */}

      <NewsletterSection />
    </div>
  );
}
