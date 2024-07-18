import axiosInstance from "../plugins/axios/index";

export const topModels = async () => {
  return await axiosInstance.get("/top_models");
};
