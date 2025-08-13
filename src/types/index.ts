export interface Product {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  stockQty: number;
  tags: string[];
  categoryId: string;
  price: number;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface FilterState {
  category: string;
  stockAvailability: "all" | "inStock" | "outOfStock";
}

export interface ProductStats {
  totalProducts: number;
  inStockProducts: number;
  outOfStockProducts: number;
  totalTags: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  message: string;
  data: {
    content: T;
  };
}
