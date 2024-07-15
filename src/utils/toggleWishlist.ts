import { useUser } from "../contexts/UseUser";
import { getProducts } from "../services/products";
import {
  removeWishlist,
  createWishlist,
  getWishlistByUserId,
} from "../services/wishlist";
import Swal from "sweetalert2";
import { useState } from "react";
import { Product, WishlistItem } from "../types/produtct";

export const useWishlist = () => {
  const user = useUser();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [wishlistsData, setWishlistsData] = useState<WishlistItem[]>([]);

  const toggleWishlist = async (product: Product) => {
    try {
      const userId = user?.user?.user?.id;
      if (userId) {
        const isWishlisted = product.wishlist.some(
          (item: WishlistItem) => item.userId === userId
        );
        if (isWishlisted) {
          await removeWishlist(product.id, userId);
          Swal.fire({
            icon: "success",
            title: "Product removed from wishlist",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          await createWishlist(product.id, userId);
          Swal.fire({
            icon: "success",
            title: "Product added to wishlist",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        const updatedProducts = await getProducts();
        const updatedWishlist = await getWishlistByUserId(userId);
        setFilteredProducts(updatedProducts.data);
        setWishlistsData(updatedWishlist.data);
      }
    } catch (error) {
      console.log("Failed to update wishlist: ", error);
    }
  };

  return {
    filteredProducts,
    wishlistsData,
    setWishlistsData,
    setFilteredProducts,
    toggleWishlist,
  };
};
