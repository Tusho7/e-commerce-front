import { Review } from "../types/review";
import Swal from "sweetalert2";
import { deleteReview } from "../services/reviews";
import { Dispatch, SetStateAction } from "react";

interface MyReviewsProps {
  reviewData: Review[];
  setReviewData: Dispatch<SetStateAction<Review[]>>;
}

const MyReviews = ({ reviewData, setReviewData }: MyReviewsProps) => {
  const handleDelete = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      Swal.fire({
        icon: "success",
        title: "Review deleted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setReviewData(reviewData.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to delete review",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      {reviewData.length === 0 ? (
        <p className="text-gray-400">You have not written any reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviewData.map((review) => (
            <li
              key={review.id}
              className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2 justify-between items-start"
            >
              <div>
                <p>{review.quote}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(review.id)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => window.history.back()}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
      >
        Back to Profile
      </button>
    </div>
  );
};

export default MyReviews;
