import axiosInstance from "../plugins/axios/index";
import { TermsProps } from "../types/terms";

export const getTermsData = async () => {
  return await axiosInstance.get("/terms_and_conditions");
};

export const createTerms = async (data: TermsProps) => {
  return await axiosInstance.post("/create_terms_and_conditions", data);
};

export const deleteTerms = async (id: number) => {
  return await axiosInstance.delete(`/delete_terms_and_conditions/${id}`);
};

export const updateTermsData = async (id: number, data: TermsProps) => {
  return await axiosInstance.put(`/update_terms_and_conditions/${id}`, data);
};
