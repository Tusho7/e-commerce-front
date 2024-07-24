import axiosInstance from "../plugins/axios/index";

export const getProducts = async () => {
  return await axiosInstance.get("/products");
};

export const updateProduct = async (id: number, data: FormData) => {
  return await axiosInstance.put(`/update_product/${id}`, data);
};

export const deleteProductById = async (id: number) => {
  return await axiosInstance.delete(`/delete_product/${id}`);
};

export const createProduct = async (data: FormData) => {
  return await axiosInstance.post("/create_product", data);
};
