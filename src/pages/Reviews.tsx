import { ReviewProps } from "../types/review";

const Reviews = ({ reviews }: ReviewProps) => {
  return (
    <div>
      <h1 className="text-white max-w-[1200px] mx-auto px-4 md:px-8 lg:text-3xl mt-10">
        Reviews
      </h1>
      <div className="relative overflow-hidden w-full mb-20 mt-10">
        <div className="flex animate-slide">
          {reviews &&
            reviews.concat(reviews).map((review, index) => (
              <div key={index} className="flex-none w-full md:w-1/4 px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg mx-auto h-[350px] flex flex-col justify-between items-center">
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
        </div>
      </div>
    </div>
  );
};

export default Reviews;
