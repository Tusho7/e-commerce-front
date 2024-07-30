import { useEffect, useState } from "react";
import Slider from "react-slick";
import { getReviews } from "../services/reviews";
import { Review } from "../types/review";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviews();
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 10000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    rows: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (reviews.length === 0) {
    return <p className="text-center text-white">No reviews available</p>;
  }

  return (
    <div>
      {reviews.length > 0 && (
        <h1 className="text-white text-2xl px-4 mt-10 md:px-8 max-w-[1200px] mx-auto">
          Reviews
        </h1>
      )}

      {reviews.length === 1 ? (
        <div className="bg-white p-6 rounded-lg shadow-lg mx-auto h-[350px] max-w-lg flex flex-col justify-between items-center">
          <section className="flex flex-col gap-3 items-center justify-center">
            <img
              src={`${import.meta.env.VITE_API_STORAGE}${
                reviews[0].user.profilePicture
              }`}
              alt={`${reviews[0].user.firstName} ${reviews[0].user.lastName}`}
              className="rounded-full w-16 h-16 object-cover mb-4 mx-auto border-2 border-blue-500"
            />
            <p className="italic text-gray-600 mb-3">{reviews[0].quote}</p>
          </section>

          <p className="font-bold text-gray-800 text-lg">
            - {reviews[0].user.firstName} {reviews[0].user.lastName}
          </p>
        </div>
      ) : (
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="my-10">
              <div className="bg-white p-6 rounded-lg shadow-lg mx-auto h-[350px] mr-5 xl:mr-0 max-w-lg flex flex-col justify-between items-center">
                <section className="flex flex-col gap-3 items-center justify-center">
                  <img
                    src={`${import.meta.env.VITE_API_STORAGE}${
                      review.user.profilePicture
                    }`}
                    alt={`${review.user.firstName} ${review.user.lastName}`}
                    className="rounded-full w-16 h-16 object-cover mb-4 mx-auto border-2 border-blue-500"
                  />
                  <p className="italic text-gray-600 mb-3">{review.quote}</p>
                </section>

                <p className="font-bold text-gray-800 text-lg">
                  - {review.user.firstName} {review.user.lastName}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Reviews;
