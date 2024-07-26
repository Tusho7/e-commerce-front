import axiosInstance from "../plugins/axios/index";
import { PrivacyPolicyProps } from "../types/privacyPolicy";

export const getprivacyPolicy = async () => {
  return await axiosInstance.get("/get_privacy_policy");
};

export const createPrivacyPolicy = async (data: PrivacyPolicyProps) => {
  return await axiosInstance.post("/create_privacy_policy", data);
};

export const deletePrivacyPolicy = async (id: number) => {
  return await axiosInstance.delete(`/delete_privacy_policy/${id}`);
};

export const editPrivacyPolicy = async (
  id: number,
  data: PrivacyPolicyProps
) => {
  return await axiosInstance.put(`/update_privacy_policy/${id}`, data);
};
