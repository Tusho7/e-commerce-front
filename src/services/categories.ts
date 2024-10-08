import axiosInstance from "../plugins/axios/index";
import { Category } from "../types/category";

export const getCategories = async () => {
  return await axiosInstance.get("/get_categories");
};

export const createCategory = async (category: Category) => {
  return await axiosInstance.post("/create_category", category);
};

export const deleteCategory = async (categoryId: number) => {
  return await axiosInstance.delete(`/delete_category/${categoryId}`);
};

export const updateCategoryNameById = async (
  id: number,
  updatedData: Category
) => {
  return await axiosInstance.put(`/update_category_name/${id}`, updatedData);
};
