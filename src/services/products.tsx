import axiosInstance from "../plugins/axios/index";

export const getProducts = async () => {
  return await axiosInstance.get("/products");
};
