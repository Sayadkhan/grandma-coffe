import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const ProductItem = ({ product }) => {

  const productImage = product?.images && product.images.length > 0 ? product.images[0] : "/placeholder.png";
  return (
    <div
      className="flex flex-col bg-[#FAF6F0] rounded-2xl shadow-md overflow-hidden 
                 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
    >
  <Link     href={`/product/${product._id}`}>
      {/* Product Image */}
      <div className="overflow-hidden relative">
        <Image
          unoptimized
          src={productImage}
          width={500}
          height={400}
          alt={product.name}
          className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover transition-transform duration-700 
                     hover:scale-110 hover:rotate-1"
        />
        {/* Subtle overlay on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 
                     hover:opacity-100 transition-opacity duration-500"
        ></div>
      </div>
      </Link>

      {/* Product Content */}
      <div className="flex flex-col gap-2 p-4">
        <span className="uppercase text-xs tracking-widest font-semibold text-[#D9A066]">
          {product.category}
        </span>

        <h3 className="text-base sm:text-lg font-semibold text-[#2C1810] line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm sm:text-base text-[#5C4033] line-clamp-2">
          {product?.shortDesc?.split(".")[0]}.
        </p>

        <div className="flex justify-between items-center mt-3">
          <p className="text-base sm:text-lg font-bold text-[#6B4226]">
            {formatCurrency(product.price)}
          </p>

          <Link
            href={`/product/${product._id}`}
            className="px-4 py-2 bg-[#6B4226] text-[#FAF6F0] text-xs sm:text-sm font-semibold 
                       rounded-full shadow-md hover:bg-[#D9A066] hover:text-[#2C1810] 
                       transition-colors duration-500"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
