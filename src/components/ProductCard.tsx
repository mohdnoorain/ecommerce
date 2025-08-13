import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export default function ProductCard({
  product,
  onProductClick,
}: ProductCardProps) {
  const isOutOfStock = product.stockQty === 0;

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-200"
      onClick={() => onProductClick(product)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.imageURL}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          {isOutOfStock ? (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Out of Stock
            </span>
          ) : (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              In Stock
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="text-xs text-gray-500">
              +{product.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Stock Information */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Stock: {product.stockQty} available
          </span>

          {/* View Details Button */}
          <span className="text-sm text-black font-medium group-hover:text-gray-600 transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}
