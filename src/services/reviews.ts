import axiosInstance from "../plugins/axios/index";

export const getReviews = async () => {
  return await axiosInstance.get("/get_testimonials");
};

export const createReview = async (
  data: { quote: string },
  userId: number | undefined
) => {
  return await axiosInstance.post("/create_testimonal", {
    ...data,
    userId,
  });
};

export const getMyReviws = async (userId: number | undefined) => {
  return await axiosInstance.get("/get_testimonials", {
    data: {
      userId,
    },
  });
};

export const deleteReview = async (reviewId: number | undefined) => {
  return await axiosInstance.delete(`/delete_testimonial/${reviewId}`);
};
