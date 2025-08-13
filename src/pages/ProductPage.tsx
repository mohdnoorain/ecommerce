import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../types";
import { dummyProducts } from "../data/products";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get product by ID
    const fetchProduct = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const foundProduct = dummyProducts.find((p) => p.id === id);
      setProduct(foundProduct || null);
      setLoading(false);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleBackToList = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-black mb-2">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist.
            </p>
            <button
              onClick={handleBackToList}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button
              onClick={handleBackToList}
              className="mr-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="ml-3 text-2xl font-bold text-black">
              Product Details
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-xl border border-gray-200">
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Stock Status */}
            <div className="text-center">
              {product.stockQty > 0 ? (
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">
                    In Stock - {product.stockQty} available
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <h1 className="text-4xl font-bold text-black mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Tags */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-3">
                Product Features & Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-black mb-4">
                Product Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Product ID:</span>
                  <p className="text-black">{product.id}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Stock Quantity:
                  </span>
                  <p className="text-black">{product.stockQty}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Total Tags:</span>
                  <p className="text-black">{product.tags.length}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Category:</span>
                  <p className="text-black">Based on tags</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                className={`w-full px-6 py-4 rounded-xl font-medium transition-colors ${
                  product.stockQty > 0
                    ? "bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={product.stockQty === 0}
              >
                {product.stockQty > 0 ? "Add to Cart" : "Out of Stock"}
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-black focus:ring-offset-2">
                  Add to Wishlist
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-black focus:ring-offset-2">
                  Share Product
                </button>
              </div>
            </div>

            {/* Additional Actions */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Product ID: {product.id}</span>
                <button className="text-black hover:text-gray-600 transition-colors">
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-black mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dummyProducts
              .filter(
                (p) =>
                  p.id !== product.id &&
                  p.tags.some((tag) => product.tags.includes(tag))
              )
              .slice(0, 3)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <img
                    src={relatedProduct.imageURL}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-black mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Stock: {relatedProduct.stockQty}
                      </span>
                      <span className="text-sm text-black font-medium">
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
