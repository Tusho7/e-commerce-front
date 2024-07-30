import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "../../assets/edit_icon.png";
import DeleteIcon from "../../assets/delete_icon.png";
import { Review } from "../../types/review";
import { getReviews } from "../../services/reviews";

const AdminReviews = () => {
  const [reviewData, setReviewData] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await getReviews();
        setReviewData(response.data);
      } catch (error) {
        console.error("Failed to fetch review data:", error);
      }
    };
    fetchReviewData();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl lg:text-5xl font-extrabold text-gray-300 w-[160px] lg:w-[670px]">
          Review Information
        </h1>
        <div className="flex flex-col gap-2 text-center justify-start items-start lg:flex-row">
          <button className="bg-green-500 text-white text-xs py-1 px-1 lg:py-2 lg:px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all lg:mr-4">
            Add Review
          </button>
          <Link
            to="/admin_dashboard"
            className="bg-indigo-600 text-white text-xs py-1 px-1 lg:py-2 lg:px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
          >
            Go to Main Page
          </Link>
        </div>
      </div>
      <div className="space-y-6">
        {reviewData.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                {review.user.firstName} {review.user.lastName}
              </h2>
              <div className="flex gap-4">
                <img
                  src={EditIcon}
                  alt="edit_icon"
                  className="w-7 h-7 cursor-pointer"
                />
                <img
                  src={DeleteIcon}
                  alt="delete_icon"
                  className="w-7 h-7 cursor-pointer"
                />
              </div>
            </div>
            <p className="text-gray-700">{review.quote}</p>
            <p className="text-gray-500 text-sm">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
