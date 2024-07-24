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

export const getContactUsData = async () => {
  return await axiosInstance.get("/get_contact_us");
};

export const deleteContact = async (id: number) => {
  return await axiosInstance.delete(`/delete_contact/${id}`);
};
