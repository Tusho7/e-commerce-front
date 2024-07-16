interface Product {
  id: number;
  name: string;
  colors: string[];
  stock: number;
  price: string;
  sizes: string[];
  images: {
    set: string[];
  };
}

export interface AddToCartModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    productId: number,
    quantity: number,
    color: string,
    size: string
  ) => void;
}
