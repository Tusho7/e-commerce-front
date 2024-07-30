import axiosInstance from "../../plugins/axios/index";

export const getAllAdmins = async () => {
  return await axiosInstance.get("/get_all_admins");
};

export const deleteAdmin = async (id: number) => {
  return await axiosInstance.delete(`/delete_admin/${id}`);
};
