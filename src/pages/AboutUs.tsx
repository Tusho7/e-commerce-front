import { Link } from "react-router-dom";
import DropDown from "../components/DropDown";
import { useEffect, useState } from "react";
import UserIcon from "../assets/user.png";
import Footer from "../components/Footer";
import { AboutUsProps } from "../types/aboutUs";
import { getAboutUsData } from "../services/aboutUs";
import { getContactUsData } from "../services/contact";
import { ContactUsProps } from "../types/contactUs";

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

  return (
    <div>
      <div className="text-white p-4 flex justify-between items-center">
        <div className="flex justify-between items-center gap-10 text-sm">
          <Link to="/home">Home</Link>
        </div>

        <div onClick={handleDropdown}>
          <img src={UserIcon} alt="user_icon" className="w-6 h-6" />
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-700"></div>
      {dropdown && <DropDown />}

      <div className="max-w-4xl mx-auto px-4 py-6 text-white">
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
