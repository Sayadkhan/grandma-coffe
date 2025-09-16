import NewsletterSection from "@/components/common/NewsletterSection";
import BandStory from "@/components/Home/BandStorySection";
import Featured from "@/components/Home/featured/FeaturedCategory";
import CarouselDemo from "@/components/Home/HeroCarousel";
import ProductSection from "@/components/Home/Product/ProductSection";
import ProductSlider from "@/components/Home/ProductSliderSection";
import WholesaleHero from "@/components/Home/WholeSell";

import React, { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProductCardSkeleton from "@/skatallon/ProductCardSkeleton";

// ------------------- Skeleton Variants -------------------

// Generic card skeleton
function CardSkeleton({ height = "h-48" }) {
  return (
    <Card className="overflow-hidden rounded-lg shadow-sm">
      <CardContent className="p-0">
        <div className={`w-full bg-gray-200 animate-pulse ${height}`} />
      </CardContent>
    </Card>
  );
}

// Product section → use your existing product card skeletons
function ProductSectionSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Featured category skeleton (smaller cards)
function FeaturedSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} height="h-40" />
      ))}
    </div>
  );
}

// Story section skeleton (usually wider blocks)
function BandStorySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      <CardSkeleton height="h-64" />
      <div className="space-y-4">
        <div className="h-8 w-2/3 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-full bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-5/6 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  );
}

// Wholesale hero skeleton (big banner-like block)
function WholesaleSkeleton() {
  return (
    <div className="py-12">
      <CardSkeleton height="h-72" />
    </div>
  );
}

// Newsletter skeleton (shorter form-style block)
function NewsletterSkeleton() {
  return (
    <div className="py-12 space-y-4">
      <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-6 w-2/3 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
    </div>
  );
}

// ------------------- Page -------------------
const page = () => {
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
          <div className="container mx-auto px-4">
            <ProductSectionSkeleton count={3} />
          </div>
        }
      >
        <ProductSlider />
        <ProductSection />
      </Suspense>

      {/* Featured */}
      <Suspense
        fallback={
          <div className="container mx-auto px-4">
            <FeaturedSkeleton count={3} />
          </div>
        }
      >
        <Featured />
      </Suspense>

      {/* Story */}
      <Suspense
        fallback={
          <div className="container mx-auto px-4">
            <BandStorySkeleton />
          </div>
        }
      >
        <BandStory />
      </Suspense>

      {/* Wholesale */}
      <Suspense
        fallback={
          <div className="container mx-auto px-4">
            <WholesaleSkeleton />
          </div>
        }
      >
        <WholesaleHero />
      </Suspense>

      {/* Newsletter */}
      <Suspense
        fallback={
          <div className="container mx-auto px-4">
            <NewsletterSkeleton />
          </div>
        }
      >
        <NewsletterSection />
      </Suspense>
    </div>
  );
};

export default page;
