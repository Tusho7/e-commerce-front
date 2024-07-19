import axiosInstance from "../plugins/axios/index";

export const getFaqs = async () => {
  return await axiosInstance.get("/get_faqs");
};
