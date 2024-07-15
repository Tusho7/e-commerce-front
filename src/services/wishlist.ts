import axiosInstance from "../plugins/axios/index";

export const createWishlist = async (productId: number, userId: number) => {
  return await axiosInstance.post("/create_wishlist/", {
    productId,
    userId,
  });
};

export const checkWishlist = async (productId: number, userId: number) => {
  return await axiosInstance.post("/check_wishlist/", {
    productId,
    userId,
  });
};

export const removeWishlist = async (productId: number, userId: number) => {
  return await axiosInstance.delete("/delete_wishlist/", {
    data: { productId, userId },
  });
};
