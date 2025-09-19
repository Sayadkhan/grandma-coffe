
const ProductCardSkeleton = ({ count = 3 }) => {
  return (
    <div className="h-min-screen pt-32 bg-white">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-lg overflow-hidden shadow-lg animate-pulse bg-gray-100"
        >
          <div className="w-full h-64 bg-gray-300"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default ProductCardSkeleton

