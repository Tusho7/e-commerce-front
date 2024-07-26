import axiosInstance from "../plugins/axios/index";
import { Category } from "../types/category";

export const getCategories = async () => {
  return await axiosInstance.get("/get_categories");
};

export const createCategory = async (category: Category) => {
  return await axiosInstance.post("/create_category", category);
};
