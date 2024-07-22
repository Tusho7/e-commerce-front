import axiosInstance from "../plugins/axios/index";

export const getTermsData = async () => {
  return await axiosInstance.get("/terms_and_conditions");
};
