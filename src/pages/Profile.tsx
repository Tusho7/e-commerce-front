import { Link } from "react-router-dom";
import UserIcon from "../assets/user.png";
import { useEffect, useState } from "react";
import DropDown from "../components/DropDown";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import { useUser } from "../contexts/UseUser";
import { createReview, getMyReviws } from "../services/reviews";
import MyReviews from "./MyReviews";
import { Review } from "../types/review";
import { logoutUser } from "../services/api/Auth";

const Profile = () => {
  const { user } = useUser();
  const [dropdown, setDropdown] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [showMyReviews, setShowMyReviews] = useState(false);
  const [reviewData, setReviewData] = useState<Review[]>([]);

  const userId = user?.user.id;

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createReview({ quote: reviewText }, userId);
      const newReview = response.data.newTestimonial as Review;
      Swal.fire({
        icon: "success",
        title: "Review added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setReviewData((prevReviews) => [newReview, ...prevReviews]);
      setReviewText("");
    } catch (error) {
      console.error("Failed to add review:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add review",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getMyReviws(userId);
        setReviewData(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetch();
  }, [userId]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/";
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="text-white p-4 flex justify-between items-center  max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center gap-10 text-sm md:text-base">
          <Link to="/home">Home</Link>
        </div>

        <div onClick={handleDropdown} className="md:hidden">
          <img src={UserIcon} alt="user_icon" className="w-6 h-6" />
        </div>

        <div className="hidden md:flex md:gap-4 md:items-center ">
          <Link to="/profile">Profile</Link>
          <Link to="/favorites">My Favorites</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/settings">Settings</Link>
          <p onClick={handleLogout} className="cursor-pointer">
            Logout
          </p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-700"></div>
      {dropdown && <DropDown />}
      <div className="p-4 flex flex-col gap-10  min-h-screen  max-w-[1200px] mx-auto">
        {showMyReviews ? (
          <MyReviews reviewData={reviewData} setReviewData={setReviewData} />
        ) : (
          <section className="rounded-lg  text-white ">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={UserIcon}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 p-2 border-white"
              />
              <div>
                <h1 className="text-3xl font-bold">
                  {user?.user.firstName} {user?.user.lastName}
                </h1>
                <p className="text-gray-400">
                  Member since{" "}
                  {user?.user.createdAt
                    ? new Date(user?.user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-700 mb-4"></div>

            <div className="text-lg mb-4">
              <h2 className="font-semibold">Profile Information</h2>
              <p>
                <strong>Email:</strong> {user?.user.email}
              </p>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">
                Add a Review About Our Site
              </h2>
              <form
                onSubmit={handleReviewSubmit}
                className="flex flex-col gap-2"
              >
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  rows={4}
                  placeholder="Write your review here..."
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Submit Review
                </button>
              </form>
              <div className="mt-4">
                <p className="text-white mb-2">
                  If you want to update your personal information, go to the
                  settings.
                </p>
              </div>
              <section className="flex justify-between items-center">
                <Link to="/settings">
                  <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                    Go to Settings
                  </button>
                </Link>
                <button
                  onClick={() => setShowMyReviews(true)}
                  className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition duration-300"
                >
                  Go to My Reviews
                </button>
              </section>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
