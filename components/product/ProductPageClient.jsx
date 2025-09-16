"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "@/redux/slice/cartSlice";

const ProductPageClient = ({ product }) => {
  const user = useSelector((state) => state.customer.customer);
  const dispatch = useDispatch();

  const [previewImages, setPreviewImages] = useState(product.images || []);
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || null
  );

  const handleAddToCart = () => {
    if (!user) {
      toast.info("🛒 Please login to add items to your cart");
      return;
    }

    if (product?.variants?.length > 0 && !selectedVariant) {
      toast.warn("⚠️ Please select a variant");
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: selectedVariant ? selectedVariant.price : product.price,
        quantity,
        variant: selectedVariant || null,
        image: selectedImage || previewImages[0] || "",
      })
    );
    toast.success("✅ Added to cart");
  };

  return (
     <div className="min-h-screen py-10">
       <motion.div
         initial={{ opacity: 0, y: 40 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.7 }}
         className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-5 mt-32"
       >
         {/* Left: Product Image Gallery */}
         <div>
           <motion.div
             key={selectedImage}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className="rounded-2xl overflow-hidden shadow-xl"
           >
             {selectedImage && (
               <Image
                 src={selectedImage}
                 alt={product.name}
                 width={600}
                 height={600}
                 className="object-cover w-full h-[500px]"
               />
             )}
           </motion.div>
 
           {/* Thumbnails */}
           {previewImages?.length > 1 && (
             <div className="flex gap-4 mt-4">
               {previewImages.map((img) => (
                 <motion.div
                   key={img}
                   whileHover={{ scale: 1.05 }}
                   onClick={() => setSelectedImage(img)}
                   className={`cursor-pointer rounded-xl overflow-hidden border-2 ${
                     selectedImage === img
                       ? "border-yellow-600"
                       : "border-transparent"
                   }`}
                 >
                   <Image
                     src={img}
                     alt="thumb"
                     width={100}
                     height={100}
                     className="object-cover"
                   />
                 </motion.div>
               ))}
             </div>
           )}
         </div>
 
         {/* Right: Product Info */}
         <motion.div
           initial={{ opacity: 0, x: 40 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.7 }}
           className="flex flex-col"
         >
           <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
 
           <p className="mt-4 text-lg text-gray-600 leading-relaxed">
             {product.shortDesc || product.desc}
           </p>
 
           <div className="mt-6 flex items-center gap-4">
             <span className="text-3xl font-semibold text-yellow-700">
               $
               {selectedVariant
                 ? selectedVariant.price.toFixed(2)
                 : product.price.toFixed(2)}
             </span>
             {product.discount > 0 && (
               <span className="text-red-600 font-medium">
                 -{product.discount}
                 {product.discountType === "percent" ? "%" : "৳"} off
               </span>
             )}
           </div>
 
           <p className="mt-2 text-sm text-gray-500">Stock: {product.stock}</p>
 
           {/* Variant Selector */}
           {product.variants?.length > 0 && (
             <div className="mt-6">
               <span className="font-medium">Choose Variant:</span>
               <div className="flex gap-3 mt-2 flex-wrap">
                 {product.variants.map((variant) => (
                   <button
                     key={variant._id}
                     onClick={() => setSelectedVariant(variant)}
                     className={`px-4 py-2 rounded-lg border ${
                       selectedVariant?._id === variant._id
                         ? "bg-yellow-600 text-white border-yellow-600"
                         : "border-gray-300 text-gray-700 hover:bg-gray-100"
                     }`}
                   >
                     {variant.packetSize}
                   </button>
                 ))}
               </div>
             </div>
           )}
 
           {/* Quantity Selector */}
           <div className="mt-6 flex items-center gap-4">
             <span className="font-medium">Quantity:</span>
             <div className="flex items-center border rounded-lg">
               <button
                 onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                 className="px-3 py-2 text-gray-600 hover:bg-gray-100"
               >
                 <Minus size={18} />
               </button>
               <span className="px-4 font-semibold">{quantity}</span>
               <button
                 onClick={() => setQuantity((q) => q + 1)}
                 className="px-3 py-2 text-gray-600 hover:bg-gray-100"
               >
                 <Plus size={18} />
               </button>
             </div>
           </div>
 
           {/* Add to cart */}
           <motion.div
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="mt-8"
           >
             <Button
               onClick={handleAddToCart}
               className="w-full flex items-center gap-2 bg-yellow-700 hover:bg-yellow-800 text-white py-3 rounded-xl text-lg shadow-lg"
             >
               <ShoppingCart size={20} />
               Add to Cart
             </Button>
           </motion.div>
         </motion.div>
 
         {/* Description */}
         <div className="lg:col-span-2 mt-10 mb-10">
           <div>
             <h2 className="text-3xl font-bold text-gray-900 mb-6 relative inline-block">
               Product Details
               <span className="absolute left-0 bottom-0 w-20 h-1 bg-yellow-500 rounded-full"></span>
             </h2>
           </div>
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="prose prose-sm !mt-0 !mb-0 text-gray-700"
           >
             {product.desc && (
               <div dangerouslySetInnerHTML={{ __html: product.desc }} />
             )}
           </motion.div>
         </div>
       </motion.div>
     </div>
  );
};

export default ProductPageClient;
