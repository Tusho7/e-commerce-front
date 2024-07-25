import axiosInstance from "../plugins/axios/index";
import { CareerProps } from "../types/careerProps";

export const getCareerData = async () => {
  return await axiosInstance.get("/get_careers");
};

export const createCareer = async (data: CareerProps) => {
  return await axiosInstance.post("/add_career", data);
};

export const editCareer = async (id: number, data: CareerProps) => {
  return await axiosInstance.put(`/edit_career/${id}`, data);
};
