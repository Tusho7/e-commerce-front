import axiosInstance from "../plugins/axios/index";

export const addToCart = async (
  userId: number | undefined,
  productId: number,
  quantity: number,
  color: string,
  size: string
) => {
  return await axiosInstance.post("/add_to_cart", {
    userId: userId,
    productId: productId,
    quantity: quantity,
    colors: color,
    sizes: size,
  });
};

export const removeFromCart = async (
  userId: number | undefined,
  productId: number
) => {
  return await axiosInstance.delete(`/remove_from_cart/${userId}/${productId}`);
};

export const getUserCart = async (userId: number | undefined) => {
  return await axiosInstance.get(`/get_user_cart/${userId}`);
};
