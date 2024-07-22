import React, { useState } from "react";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import UserIcon from "../assets/user.png";
import DropDown from "../components/DropDown";
import { logoutUser } from "../services/api/Auth";
const ContactPage: React.FC = () => {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

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
      <div className="text-white p-4 flex justify-between items-center md:px-8">
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
      {dropdown && <DropDown />}
      <main className="my-8">
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
