import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { FilterState, Category, Product, ProductStats } from "../types";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import { ApiService } from "../services/api";

export default function Dashboard() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [stats, setStats] = useState<ProductStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<FilterState>({
        category: "all",
        stockAvailability: "all",
    });

    // Fetch categories and stats on component mount (only once)
    useEffect(() => {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
            navigate("/login");
        }
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            setUserInfo(JSON.parse(userInfo));
        }
        const fetchInitialData = async () => {
            try {
                const [categoriesData, statsData] = await Promise.all([
                    ApiService.getCategories(),
                    ApiService.getProductStats()
                ]);

                setCategories(categoriesData);
                setStats(statsData);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Fetch products when filters or search term changes
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await ApiService.getProducts({
                    category: filters.category !== 'all' ? filters.category : undefined,
                    stockAvailability: filters.stockAvailability !== 'all' ? filters.stockAvailability : undefined,
                    search: searchTerm || undefined,
                    limit: 100 // Get more products for better filtering
                });
                setProducts(productsData.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        // Only fetch if not in initial loading state
        if (!loading) {
            fetchProducts();
        }
    }, [filters, searchTerm, loading]);


    const filteredProducts = useMemo(() => {
        return products.filter((product) => {

            const matchesStock =
                filters.stockAvailability === "all" ||
                (filters.stockAvailability === "inStock" && product.stockQty > 0) ||
                (filters.stockAvailability === "outOfStock" && product.stockQty === 0);

            return matchesStock;
        });
    }, [products, filters.stockAvailability]);

    const handleProductClick = (product: Product) => {
        navigate(`/product/${product.id}`);
    };

    const handleClearFilters = () => {
        setFilters({
            category: "all",
            stockAvailability: "all",
        });
        setSearchTerm(""); // Also clear search term
    };

    const handleSearch = () => {
        // Search is handled automatically by the useEffect when searchTerm changes
    };

    // Use stats from API or calculate from products if API fails
    const displayStats = stats || {
        totalProducts: products.length,
        inStockProducts: products.filter((p) => p.stockQty > 0).length,
        outOfStockProducts: products.filter((p) => p.stockQty === 0).length,
        totalTags: new Set(products.flatMap((p) => p.tags)).size,
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading sustainable products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8 justify-between items-center py-6">
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
                        <div className="flex  items-center flex-col space-x-4">

                            <h1 className="text-3xl font-bold text-black">
                                {userInfo?.firstName} {userInfo?.lastName}
                            </h1>
                            <p className="text-sm text-gray-600">
                                {userInfo?.email}
                            </p>

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
                        value={displayStats.totalProducts}
                        icon="📦"
                        color="blue"
                        change="+12%"
                        changeType="positive"
                    />
                    <StatsCard
                        title="In Stock"
                        value={displayStats.inStockProducts}
                        icon="✅"
                        color="green"
                        change="+5%"
                        changeType="positive"
                    />
                    <StatsCard
                        title="Out of Stock"
                        value={displayStats.outOfStockProducts}
                        icon="❌"
                        color="red"
                        change="-2%"
                        changeType="negative"
                    />
                    <StatsCard
                        title="Unique Tags"
                        value={displayStats.totalTags}
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
                                    {searchTerm
                                        ? `Search results for "${searchTerm}"`
                                        : "Showing sustainable products based on your filters"
                                    }
                                </p>
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
                                    {searchTerm
                                        ? `No products found for "${searchTerm}". Try different search terms.`
                                        : "Try adjusting your filters to find what you're looking for."
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
