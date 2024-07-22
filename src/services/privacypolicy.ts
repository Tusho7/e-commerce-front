import axiosInstance from "../plugins/axios/index";

export const getprivacyPolicy = async () => {
  return await axiosInstance.get("/get_privacy_policy");
};
