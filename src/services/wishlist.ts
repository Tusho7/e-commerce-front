import axiosInstance from "../plugins/axios/index";

export const createWishlist = async (productId: number, userId: number) => {
  return await axiosInstance.post("/create_wishlist/", {
    productId,
    userId,
  });
};

export const removeWishlist = async (
  productId: number,
  userId: number | undefined
) => {
  return await axiosInstance.delete(`/delete_wishlist/${userId}/${productId}`);
};

export const getWishlistByUserId = async (userId: number | undefined) => {
  return await axiosInstance.get(`/get_wishlist/${userId}`);
};
