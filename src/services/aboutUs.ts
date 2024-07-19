import axiosInstance from "../plugins/axios/index";

export const getAboutUsData = async () => {
  return await axiosInstance.get("/get_aboutus");
};
