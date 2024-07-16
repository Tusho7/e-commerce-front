import axiosInstance from "../plugins/axios/index";

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
