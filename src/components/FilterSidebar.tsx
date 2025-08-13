import type { Category, FilterState } from "../types";

interface FilterSidebarProps {
  categories: Category[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  categories,
  filters,
  onFilterChange,
  onClearFilters,
}: FilterSidebarProps) {
  const handleCategoryChange = (category: string) => {
    onFilterChange({ ...filters, category });
  };

  const handleStockChange = (
    stockAvailability: "all" | "inStock" | "outOfStock"
  ) => {
    onFilterChange({ ...filters, stockAvailability });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-black">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-black hover:text-gray-600 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-black mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={filters.category === category.id}
                onChange={() => handleCategoryChange(category.id)}
                className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-black focus:ring-2"
              />
              <span className="text-sm text-gray-700">
                {category.icon} {category.name}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Stock Availability */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-black mb-3">
          Stock Availability
        </h4>
        <div className="space-y-2">
          {[
            { value: "all", label: "All Products" },
            { value: "inStock", label: "In Stock" },
            { value: "outOfStock", label: "Out of Stock" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="stock"
                value={option.value}
                checked={filters.stockAvailability === option.value}
                onChange={() =>
                  handleStockChange(
                    option.value as "all" | "inStock" | "outOfStock"
                  )
                }
                className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-black focus:ring-2"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {(filters.category !== "all" || filters.stockAvailability !== "all") && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-black mb-2">
            Active Filters:
          </h4>
          <div className="space-y-1">
            {filters.category !== "all" && (
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mr-2">
                Category:{" "}
                {categories.find((c) => c.id === filters.category)?.name}
              </span>
            )}
            {filters.stockAvailability !== "all" && (
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mr-2">
                Stock:{" "}
                {filters.stockAvailability === "inStock"
                  ? "In Stock"
                  : "Out of Stock"}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
