interface Images {
  set: string[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  images: Images;
  stock: number;
  colors: string;
  sizes: string;
  shipping: string;
  isOnSale: boolean;
  salePercentage: number | null;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
}

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  colors: string;
  sizes: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}
