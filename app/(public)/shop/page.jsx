
import {  Suspense } from "react";

import ProductCardSkeleton from "@/skatallon/ProductCardSkeleton";
import ShopContent from "@/components/shop/ShopContent";



export default function ShopPage() {
  return (
    <Suspense fallback={<ProductCardSkeleton />}>
     <div className="min-h-screen  bg-white">
       <ShopContent />
     </div>
    </Suspense>
  );
}
