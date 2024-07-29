import axiosInstance from "../plugins/axios/index";

export const getMessages = async () => {
  return await axiosInstance.get("/messages");
};
