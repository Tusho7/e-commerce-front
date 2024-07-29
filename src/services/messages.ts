import axiosInstance from "../plugins/axios/index";

export const getMessages = async () => {
  return await axiosInstance.get("/messages");
};

export const deleteMessage = async (id: number) => {
  return await axiosInstance.delete(`/delete_message/${id}`);
};
