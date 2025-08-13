export interface Product {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  stockQty: number;
  tags: string[];
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
