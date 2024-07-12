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
  salePercentage: number;

  images: {
    set: string[];
  };
}
