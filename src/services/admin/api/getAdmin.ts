import axiosInstance from "../../../plugins/axios/index";

export const getAdmin = async () => {
  return await axiosInstance.get("/get_admin");
};
