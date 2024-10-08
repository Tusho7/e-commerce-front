export interface WishlistItem {
  id: number;
  userId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
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
  inCart: boolean;
  cart: Product[];
  images: { set: string[] };
  wishlist: WishlistItem[];
}

export interface WishlistProduct {
  productId: number;
  id: number;
  inCart: boolean;
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    images: {
      set: string[];
    };
    colors: string;
    sizes: string;
    inCart?: boolean;
  };
  stock: number;
  Cart: Product[];
}

export interface ProductContextType {
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  updateTopModels: (newTopModels: Product[]) => void;
}

export interface TopModelsProps {
  products: Product[];
}
