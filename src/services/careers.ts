import axiosInstance from "../plugins/axios/index";

export const getCareerData = async () => {
  return await axiosInstance.get("/get_careers");
};
