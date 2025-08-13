const API_BASE_URL = 'http://localhost:3000';

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

export class ApiService {
    static async getProducts(filters?: {
        category?: string;
        stockAvailability?: 'all' | 'inStock' | 'outOfStock';
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{ products: Product[]; pagination: PaginationInfo }> {
        try {
            const params = new URLSearchParams();
            if (filters?.category && filters.category !== 'all') {
                params.append('category', filters.category);
            }
            if (filters?.stockAvailability && filters.stockAvailability !== 'all') {
                params.append('stockAvailability', filters.stockAvailability);
            }
            if (filters?.search) {
                params.append('search', filters.search);
            }
            if (filters?.page) {
                params.append('page', filters.page.toString());
            }
            if (filters?.limit) {
                params.append('limit', filters.limit.toString());
            }

            const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch products');
            
            const result: ApiResponse<{ products: Product[]; pagination: PaginationInfo }> = await response.json();
            return result.data.content;
        } catch (error) {
            console.error('Error fetching products:', error);
            // Fallback to dummy data if API fails
            const dummyData = this.getDummyProducts();
            return {
                products: dummyData,
                pagination: { page: 1, limit: 10, total: dummyData.length, pages: 1 }
            };
        }
    }

    static async getProduct(id: string): Promise<Product | null> {
        try {
            const response = await fetch(`${API_BASE_URL}/products/${id}`);
            if (!response.ok) throw new Error('Failed to fetch product');
            
            const result: ApiResponse<{ product: Product }> = await response.json();
            return result.data.content.product;
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    }

    static async getCategories(): Promise<Category[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/products/categories`);
            if (!response.ok) throw new Error('Failed to fetch categories');
            
            const result: ApiResponse<{ categories: Category[] }> = await response.json();
            return result.data.content.categories;
        } catch (error) {
            console.error('Error fetching categories:', error);
            // Fallback to static categories
            return this.getDummyCategories();
        }
    }

    static async searchProducts(query: string): Promise<Product[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('Failed to search products');
            
            const result: ApiResponse<{ products: Product[]; pagination: PaginationInfo }> = await response.json();
            return result.data.content.products;
        } catch (error) {
            console.error('Error searching products:', error);
            return [];
        }
    }

    static async getProductsByCategory(categoryId: string): Promise<Product[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/products?category=${encodeURIComponent(categoryId)}`);
            if (!response.ok) throw new Error('Failed to fetch products by category');
            
            const result: ApiResponse<{ products: Product[]; pagination: PaginationInfo }> = await response.json();
            return result.data.content.products;
        } catch (error) {
            console.error('Error fetching products by category:', error);
            return [];
        }
    }

    static async getProductStats(): Promise<ProductStats | null> {
        try {
            // Since the new API doesn't have a stats endpoint, we'll calculate from products
            const result = await this.getProducts({ limit: 100 }); // Get all products for stats
            const products = result.products;
            
            const totalProducts = products.length;
            const inStockProducts = products.filter(p => p.stockQty > 0).length;
            const outOfStockProducts = products.filter(p => p.stockQty === 0).length;
            const totalTags = new Set(products.flatMap(p => p.tags)).size;

            return {
                totalProducts,
                inStockProducts,
                outOfStockProducts,
                totalTags
            };
        } catch (error) {
            console.error('Error fetching product stats:', error);
            return null;
        }
    }

    // Fallback dummy data
    private static getDummyProducts(): Product[] {
        return [
            {
                id: "1",
                name: "Bamboo Water Bottle",
                description: "Eco-friendly reusable water bottle made from sustainable bamboo. Perfect for reducing plastic waste and staying hydrated on the go.",
                imageURL: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
                stockQty: 45,
                tags: ["Bamboo", "Reusable", "BPA-Free", "Eco-Friendly"],
                categoryId: "bamboo",
                price: 24.99,
                isActive: true,
            },
            {
                id: "2",
                name: "Organic Cotton Tote Bag",
                description: "Handcrafted organic cotton tote bag perfect for shopping, beach trips, or everyday use. Supports fair trade practices.",
                imageURL: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&h=400&fit=crop",
                stockQty: 32,
                tags: ["Organic Cotton", "Fair Trade", "Handcrafted", "Biodegradable"],
                categoryId: "organic-cotton",
                price: 19.99,
                isActive: true,
            },
            {
                id: "3",
                name: "Solar-Powered Phone Charger",
                description: "Portable solar charger that harnesses renewable energy to charge your devices. Perfect for outdoor adventures and emergency situations.",
                imageURL: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&h=400&fit=crop",
                stockQty: 18,
                tags: ["Solar Power", "Renewable Energy", "Portable", "Waterproof"],
                categoryId: "solar-power",
                price: 89.99,
                isActive: true,
            },
            {
                id: "4",
                name: "Beeswax Food Wraps",
                description: "Natural alternative to plastic wrap made from organic cotton infused with beeswax, jojoba oil, and tree resin.",
                imageURL: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop",
                stockQty: 67,
                tags: ["Beeswax", "Organic Cotton", "Reusable", "Biodegradable"],
                categoryId: "beeswax",
                price: 14.99,
                isActive: true,
            },
            {
                id: "5",
                name: "Hemp Face Mask",
                description: "Comfortable and breathable face mask made from sustainable hemp fabric. Washable and reusable for daily protection.",
                imageURL: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=400&fit=crop",
                stockQty: 0,
                tags: ["Hemp", "Reusable", "Washable", "Breathable"],
                categoryId: "hemp",
                price: 12.99,
                isActive: true,
            },
            {
                id: "6",
                name: "Recycled Glass Vase",
                description: "Beautiful vase crafted from 100% recycled glass. Each piece is unique and helps reduce waste in landfills.",
                imageURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
                stockQty: 23,
                tags: ["Recycled Glass", "Handcrafted", "Unique", "Eco-Friendly"],
                categoryId: "recycled-glass",
                price: 34.99,
                isActive: true,
            },
            {
                id: "7",
                name: "Cork Yoga Mat",
                description: "Premium yoga mat made from sustainable cork material. Provides excellent grip and cushioning for your practice.",
                imageURL: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
                stockQty: 41,
                tags: ["Cork", "Sustainable", "Non-Slip", "Biodegradable"],
                categoryId: "cork",
                price: 79.99,
                isActive: true,
            },
            {
                id: "8",
                name: "LED Grow Light Bulb",
                description: "Energy-efficient LED bulb designed for indoor plants. Uses 80% less energy than traditional grow lights.",
                imageURL: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
                stockQty: 28,
                tags: ["LED", "Energy Efficient", "Indoor Plants", "Long Lasting"],
                categoryId: "led",
                price: 29.99,
                isActive: true,
            },
        ];
    }

    private static getDummyCategories(): Category[] {
        return [
            { id: "all", name: "All Products", icon: "🌱", count: 8 },
            { id: "bamboo", name: "Bamboo Products", icon: "🎋", count: 1 },
            { id: "organic-cotton", name: "Organic Cotton", icon: "👕", count: 2 },
            { id: "solar-power", name: "Solar Power", icon: "☀️", count: 1 },
            { id: "beeswax", name: "Beeswax Products", icon: "🐝", count: 1 },
            { id: "hemp", name: "Hemp Products", icon: "🌿", count: 1 },
            { id: "recycled-glass", name: "Recycled Glass", icon: "🪟", count: 1 },
            { id: "cork", name: "Cork Products", icon: "🪵", count: 1 },
            { id: "led", name: "LED Products", icon: "💡", count: 1 },
        ];
    }

    static async signIn(email: string, password: string): Promise<{ token: string,user:any }> {
        try {
            const response = await fetch(`${API_BASE_URL}/user/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) throw new Error('Failed to sign in');
            const result: ApiResponse<{ token: string,user:any }> = await response.json();
            return result.data.content;
        } catch (error) {
            console.error('Error signing in:', error);
            return { token: '',user:null };
        }
    }

    static async signUp(firstName: string, lastName: string, email: string, password: string): Promise<{ user: any }> {
        try {
            const response = await fetch(`${API_BASE_URL}/user/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });
            if (!response.ok) throw new Error('Failed to sign up');
            const result: ApiResponse<{ user: any }> = await response.json();
            return result.data.content;
        } catch (error) {
            console.error('Error signing up:', error);
            return { user: '' };
        }
    }
}