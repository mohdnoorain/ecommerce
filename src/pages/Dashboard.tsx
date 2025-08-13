import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { Product, FilterState } from "../types";
import { dummyProducts, categories } from "../data/products";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
export default function Dashboard() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<FilterState>({
        category: "all",
        stockAvailability: "all",
    });

    // Filter and search products
    const filteredProducts = useMemo(() => {
        return dummyProducts.filter((product) => {
            // Search term filter
            const matchesSearch =
                searchTerm === "" ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.tags.some((tag) =>
                    tag.toLowerCase().includes(searchTerm.toLowerCase())
                );

            // Category filter (based on tags)
            const matchesCategory =
                filters.category === "all" || product.tags.includes(filters.category);

            // Stock availability filter
            const matchesStock =
                filters.stockAvailability === "all" ||
                (filters.stockAvailability === "inStock" && product.stockQty > 0) ||
                (filters.stockAvailability === "outOfStock" && product.stockQty === 0);

            return matchesSearch && matchesCategory && matchesStock;
        });
    }, [searchTerm, filters]);

    const handleProductClick = (product: Product) => {
        navigate(`/product/${product.id}`);
    };

    const handleClearFilters = () => {
        setFilters({
            category: "all",
            stockAvailability: "all",
        });
    };

    const handleSearch = () => {
        // Search is handled automatically by the filteredProducts useMemo
    };

    // Calculate statistics
    const totalProducts = dummyProducts.length;
    const inStockProducts = dummyProducts.filter((p) => p.stockQty > 0).length;
    const outOfStockProducts = dummyProducts.filter(
        (p) => p.stockQty === 0
    ).length;
    const totalTags = new Set(dummyProducts.flatMap((p) => p.tags)).size;

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                                <svg
                                    className="w-7 h-7 text-white"
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
                            <div className="ml-4">
                                <h1 className="text-3xl font-bold text-black">
                                    Sustainable Products Dashboard
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Discover eco-friendly products for a better tomorrow
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                                Add Product
                            </button>
                            <Link
                                to="/login"
                                className="px-4 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors"
                            >
                                Login
                            </Link>
                            <button className="p-2 text-gray-500 hover:text-gray-700">
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
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onSearch={handleSearch}
                    />
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Products"
                        value={totalProducts}
                        icon="📦"
                        color="blue"
                        change="+12%"
                        changeType="positive"
                    />
                    <StatsCard
                        title="In Stock"
                        value={inStockProducts}
                        icon="✅"
                        color="green"
                        change="+5%"
                        changeType="positive"
                    />
                    <StatsCard
                        title="Out of Stock"
                        value={outOfStockProducts}
                        icon="❌"
                        color="red"
                        change="-2%"
                        changeType="negative"
                    />
                    <StatsCard
                        title="Unique Tags"
                        value={totalTags}
                        icon="🏷️"
                        color="purple"
                        change="+8%"
                        changeType="positive"
                    />
                </div>

                {/* Dashboard Layout */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-80 flex-shrink-0">
                        <FilterSidebar
                            categories={categories}
                            filters={filters}
                            onFilterChange={setFilters}
                            onClearFilters={handleClearFilters}
                        />
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-black">
                                    Products ({filteredProducts.length})
                                </h2>
                                <p className="text-gray-600">
                                    Showing sustainable products based on your filters
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">Sort by:</span>
                                <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white text-black focus:ring-2 focus:ring-black focus:border-transparent">
                                    <option>Name</option>
                                    <option>Stock</option>
                                    <option>Tags</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onProductClick={handleProductClick}
                                    />
                                ))}
                            </div>
                        ) : (
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
                                <h3 className="text-lg font-medium text-black mb-2">
                                    No products found
                                </h3>
                                <p className="text-gray-600">
                                    Try adjusting your search terms or filters to find what you're
                                    looking for.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
