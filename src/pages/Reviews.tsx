import { useEffect, useState } from "react";
import { getReviews } from "../services/reviews";
import { Review } from "../types/review";

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getReviews();
        console.log(response);
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="py-10 bg-gradient-to-b from-gray-100 to-gray-200 text-center">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
        What Our Customers Say
      </h2>
      <div className="flex justify-center gap-6 flex-wrap mt-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-lg shadow-lg w-[370px] transition-transform transform hover:scale-105"
          >
            <img
              src={`${import.meta.env.VITE_API_STORAGE}${
                review?.user.profilePicture
              }`}
              alt={`${review.user.firstName} ${review.user.lastName}`}
              className="rounded-full w-16 h-16 object-cover mb-4 mx-auto border-2 border-blue-500"
            />
            <p className="italic text-gray-600 mb-3">{review.quote}</p>
            <p className="font-bold text-gray-800">
              - {review.user.firstName} {review.user.lastName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
