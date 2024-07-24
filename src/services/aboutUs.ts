import axiosInstance from "../plugins/axios/index";
import { AboutUsProps } from "../types/aboutUs";

export const getAboutUsData = async () => {
  return await axiosInstance.get("/get_aboutus");
};

export const updateAboutUsData = async (
  id: number,
  updatedData: AboutUsProps
) => {
  return axiosInstance.put(`/update_aboutus/${id}`, updatedData);
};
