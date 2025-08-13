import type { Product, Category } from "../types";

export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Bamboo Water Bottle",
    description:
      "Eco-friendly reusable water bottle made from sustainable bamboo. Perfect for reducing plastic waste and staying hydrated on the go.",
    imageURL:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    stockQty: 45,
    tags: ["Bamboo", "Reusable", "BPA-Free", "Eco-Friendly"],
  },
  {
    id: "2",
    name: "Organic Cotton Tote Bag",
    description:
      "Handcrafted organic cotton tote bag perfect for shopping, beach trips, or everyday use. Supports fair trade practices.",
    imageURL:
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&h=400&fit=crop",
    stockQty: 32,
    tags: ["Organic Cotton", "Fair Trade", "Handcrafted", "Biodegradable"],
  },
  {
    id: "3",
    name: "Solar-Powered Phone Charger",
    description:
      "Portable solar charger that harnesses renewable energy to charge your devices. Perfect for outdoor adventures and emergency situations.",
    imageURL:
      "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&h=400&fit=crop",
    stockQty: 18,
    tags: ["Solar Power", "Renewable Energy", "Portable", "Waterproof"],
  },
  {
    id: "4",
    name: "Beeswax Food Wraps",
    description:
      "Natural alternative to plastic wrap made from organic cotton infused with beeswax, jojoba oil, and tree resin.",
    imageURL:
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop",
    stockQty: 67,
    tags: ["Beeswax", "Organic Cotton", "Reusable", "Biodegradable"],
  },
  {
    id: "5",
    name: "Hemp Face Mask",
    description:
      "Comfortable and breathable face mask made from sustainable hemp fabric. Washable and reusable for daily protection.",
    imageURL:
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=400&fit=crop",
    stockQty: 0,
    tags: ["Hemp", "Reusable", "Washable", "Breathable"],
  },
  {
    id: "6",
    name: "Recycled Glass Vase",
    description:
      "Beautiful vase crafted from 100% recycled glass. Each piece is unique and helps reduce waste in landfills.",
    imageURL:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    stockQty: 23,
    tags: ["Recycled Glass", "Handcrafted", "Unique", "Eco-Friendly"],
  },
  {
    id: "7",
    name: "Cork Yoga Mat",
    description:
      "Premium yoga mat made from sustainable cork material. Provides excellent grip and cushioning for your practice.",
    imageURL:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    stockQty: 41,
    tags: ["Cork", "Sustainable", "Non-Slip", "Biodegradable"],
  },
  {
    id: "8",
    name: "LED Grow Light Bulb",
    description:
      "Energy-efficient LED bulb designed for indoor plants. Uses 80% less energy than traditional grow lights.",
    imageURL:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    stockQty: 28,
    tags: ["LED", "Energy Efficient", "Indoor Plants", "Long Lasting"],
  },
];

// Group products by tags to create categories
export const categories: Category[] = [
  { id: "all", name: "All Products", icon: "🌱", count: dummyProducts.length },
  {
    id: "Bamboo",
    name: "Bamboo Products",
    icon: "🎋",
    count: dummyProducts.filter((p) => p.tags.includes("Bamboo")).length,
  },
  {
    id: "Organic Cotton",
    name: "Organic Cotton",
    icon: "👕",
    count: dummyProducts.filter((p) => p.tags.includes("Organic Cotton"))
      .length,
  },
  {
    id: "Solar Power",
    name: "Solar Power",
    icon: "☀️",
    count: dummyProducts.filter((p) => p.tags.includes("Solar Power")).length,
  },
  {
    id: "Beeswax",
    name: "Beeswax Products",
    icon: "🐝",
    count: dummyProducts.filter((p) => p.tags.includes("Beeswax")).length,
  },
  {
    id: "Hemp",
    name: "Hemp Products",
    icon: "🌿",
    count: dummyProducts.filter((p) => p.tags.includes("Hemp")).length,
  },
  {
    id: "Recycled Glass",
    name: "Recycled Glass",
    icon: "🪟",
    count: dummyProducts.filter((p) => p.tags.includes("Recycled Glass"))
      .length,
  },
  {
    id: "Cork",
    name: "Cork Products",
    icon: "🪵",
    count: dummyProducts.filter((p) => p.tags.includes("Cork")).length,
  },
  {
    id: "LED",
    name: "LED Products",
    icon: "💡",
    count: dummyProducts.filter((p) => p.tags.includes("LED")).length,
  },
];
