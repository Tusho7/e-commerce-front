import axiosInstance from "../../plugins/axios/index";
import { AdminUpdate } from "../../types/admin";

export const getAllAdmins = async () => {
  return await axiosInstance.get("/get_all_admins");
};

export const deleteAdmin = async (id: number) => {
  return await axiosInstance.delete(`/delete_admin/${id}`);
};

export const updateAdmin = async (
  id: number | undefined,
  formData: AdminUpdate
) => {
  return await axiosInstance.put(`/update_admin/${id}`, formData);
};
