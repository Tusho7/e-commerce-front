import React, { useState } from "react";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import UserIcon from "../assets/user.png";
import DropDown from "../components/DropDown";
const ContactPage: React.FC = () => {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };
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
      <main className="my-8">
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
