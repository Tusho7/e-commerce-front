import { Link } from "react-router-dom";
import DropDown from "../components/DropDown";
import { useEffect, useState } from "react";
import UserIcon from "../assets/user.png";
import Footer from "../components/Footer";
import { AboutUsProps } from "../types/aboutUs";
import { getAboutUsData } from "../services/aboutUs";
import { getContactUsData } from "../services/contact";
import { ContactUsProps } from "../types/contactUs";
import { logoutUser } from "../services/api/Auth";

const AboutUs = () => {
  const [aboutUsData, setFaqDataAboutUsData] = useState<AboutUsProps[]>([]);
  const [contactUsData, setContactUsData] = useState<ContactUsProps[]>([]);
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await getAboutUsData();
        const contactUsData = await getContactUsData();
        setFaqDataAboutUsData(response.data);
        setContactUsData(contactUsData.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchAboutUs();
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
          <p onClick={handleLogout} className="cursor-pointer">
            Logout
          </p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-700"></div>
      {dropdown && <DropDown />}

      <div className="max-w-[1200px] mx-auto px-4 py-6 text-white min-h-screen md:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">About Us</h1>
        </div>

        <div className="flex flex-col gap-10">
          {aboutUsData.length > 0 ? (
            aboutUsData.map((section) => (
              <section key={section.id} className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold ">{section.title}</h2>
                <p>{section.content}</p>
              </section>
            ))
          ) : (
            <div>No content available</div>
          )}

          {contactUsData &&
            contactUsData.map((contact) => (
              <section key={contact.id} className="mb-8">
                <p>Email: {contact.email}</p>
                <p>Phone: {contact.phone}</p>
                <Link to="/contact" className="text-indigo-600 hover:underline">
                  Contact Page
                </Link>
              </section>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
