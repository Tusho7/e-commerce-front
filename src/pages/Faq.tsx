import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserIcon from "../assets/user.png";
import Footer from "../components/Footer";
import DropDown from "../components/DropDown";
import { getFaqs } from "../services/faqs";
import { Faq } from "../types/faq";
import { logoutUser } from "../services/api/Auth";

const FaqPage = () => {
  const [faqData, setFaqData] = useState<Faq[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await getFaqs();
        setFaqData(response.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchFaqs();
  }, []);

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
    <div>
      <div className="text-white p-4 flex justify-between items-center md:px-8 max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center gap-10 text-sm md:text-base">
          <Link to="/home">Home</Link>
        </div>

        <div onClick={handleDropdown} className="md:hidden">
          <img src={UserIcon} alt="user_icon" className="w-6 h-6" />
        </div>

        <div className="hidden md:flex md:gap-4 md:items-center">
          <Link to="/profile">Profile</Link>
          <Link to="/favorites">My Favorites</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/settings">Settings</Link>
          <p onClick={handleLogout}>Logout</p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-700"></div>
      <h1 className="text-white my-5 px-4 md:px-8 md:my-10  max-w-[1200px] mx-auto">
        FAQS
      </h1>

      {dropdown && <DropDown />}
      <div className=" max-w-[1200px] mx-auto mb-10 px-4 text-white min-h-screen md:px-8">
        {faqData &&
          faqData.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-4 mb-4 cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h2 className="text-lg font-medium">{faq.question}</h2>
              {activeIndex === index && (
                <p className="mt-2 text-gray-500">{faq.answer}</p>
              )}
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
};

export default FaqPage;
