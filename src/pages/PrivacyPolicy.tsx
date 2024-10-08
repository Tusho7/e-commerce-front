import { Link } from "react-router-dom";
import UserIcon from "../assets/user.png";
import Footer from "../components/Footer";
import DropDown from "../components/DropDown";
import { useEffect, useState } from "react";
import { getprivacyPolicy } from "../services/privacypolicy";
import { PrivacyPolicyProps } from "../types/privacyPolicy";
import { logoutUser } from "../services/api/Auth";

const PrivacyPolicy = () => {
  const [privacyPolicyData, setPrivacyPolicyData] = useState<
    PrivacyPolicyProps[]
  >([]);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const fetchprivacyPolicy = async () => {
      try {
        const response = await getprivacyPolicy();
        setPrivacyPolicyData(response.data);
      } catch (error) {
        console.error("Error fetching Careers:", error);
      }
    };
    fetchprivacyPolicy();
  }, []);

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

      <div className="max-w-[1200px] mx-auto my-10 px-4 text-white flex flex-col gap-8 min-h-screen md:px-8">
        {privacyPolicyData.length > 0 ? (
          privacyPolicyData.map((section) => (
            <section key={section.id} className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold ">{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))
        ) : (
          <div>No content available</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
