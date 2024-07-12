import axiosInstance from "../plugins/axios/index";

export const getCategories = async () => {
  return await axiosInstance.get("/get_categories");
};
