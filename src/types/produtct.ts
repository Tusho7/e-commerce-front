export interface WishlistItem {
  id: number;
  userId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  sizes: string[];
  colors: string[];
  shipping: string;
  categoryId: number;
  isOnSale: boolean;
  salePercentage: number | null;
  images: {
    set: string[];
  };
  wishlist: WishlistItem[];
  userId: number;
}

export interface ProductContextType {
  products: Product[];
  toggleWishlist: (product: Product) => Promise<void>;
}
