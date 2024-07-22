import axiosInstance from "../../plugins/axios/index";
import { UserForAdmin, UpdateUserData } from "../../types/user";

export const getAllUsers = async (): Promise<UserForAdmin[]> => {
  const response = await axiosInstance.get("/get_all_users");
  return response.data;
};

export const updateUserById = async (
  userId: number,
  data: UpdateUserData
): Promise<UserForAdmin> => {
  const response = await axiosInstance.put(`/update_user/${userId}`, data);
  return response.data;
};

export const blockUserById = async (id: number): Promise<UserForAdmin> => {
  const response = await axiosInstance.patch(
    `/api/auth/toggle_block_user/${id}`
  );
  return response.data;
};
