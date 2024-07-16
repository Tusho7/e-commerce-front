import { Product, WishlistProduct } from "./product";

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

export interface AddToCartFromWishlistProps {
  product: WishlistProduct;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    productId: number,
    quantity: number,
    color: string,
    size: string
  ) => void;
}
