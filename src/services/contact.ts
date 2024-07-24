import axiosInstance from "../plugins/axios/index";
import { ContactUsProps } from "../types/contactUs";

export const contact = async ({
  name,
  userEmail: email,
  message,
}: {
  name: string;
  userEmail: string;
  message: string;
}) => {
  return await axiosInstance.post("/contact", { name, email, message });
};

export const getContactUsData = async () => {
  return await axiosInstance.get("/get_contact_us");
};

export const deleteContact = async (id: number) => {
  return await axiosInstance.delete(`/delete_contact/${id}`);
};

export const editContacUs = async (id: number, data: ContactUsProps) => {
  return await axiosInstance.put(`/edit_contact_us/${id}`, data);
};
