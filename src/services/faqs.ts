import axiosInstance from "../plugins/axios/index";
import { Faq } from "../types/faq";

export const getFaqs = async () => {
  return await axiosInstance.get("/get_faqs");
};

export const createFaq = async (faq: Faq) => {
  return await axiosInstance.post("/add_faq", faq);
};
