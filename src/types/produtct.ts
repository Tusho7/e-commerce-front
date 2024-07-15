export interface WishlistItem {
  id: number;
  productId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    colors: string;
    sizes: string;
    stock: number;
    isOnSale: boolean;
    shipping: string;
    images: {
      set: string[];
    };
  };
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
