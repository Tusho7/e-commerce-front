import { useEffect, useRef, useState } from "react";
import UserIcon from "../assets/user.png";
import { HeaderProps } from "../services/headerAndProductList";
import DropDown from "./DropDown";
import LargeScreenDropdown from "./LargeScreenDropdown";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UseUser";
import { logoutUser } from "../services/api/Auth";

const Header = ({ categories, active, handleClick }: HeaderProps) => {
  const { user } = useUser();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const largeScreenDropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  useEffect(() => {
    const closeLargeScreenDropdown = (e: MouseEvent) => {
      if (
        largeScreenDropdownRef.current &&
        !largeScreenDropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdown(false);
      }
    };

    document.addEventListener("click", closeLargeScreenDropdown);

    return () => {
      document.removeEventListener("click", closeLargeScreenDropdown);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
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
    <div className="bg-gray-900">
      <div className="text-white p-4 flex justify-between items-center  md:px-8 max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center gap-10 text-sm max-w-[1200px] ">
          {categories &&
            categories.map((category) => (
              <p
                key={category.id}
                className={`cursor-pointer ${
                  active === category.name
                    ? "text-green-400 border-b border-green-400"
                    : ""
                }`}
                onClick={() => handleClick(category)}
              >
                {category.name}
              </p>
            ))}
        </div>

        <div className="hidden md:flex gap-3 items-center lg:hidden">
          <Link to="/favorites">My Favorites</Link>
          <Link to="/cart">Cart</Link>
          <div
            onClick={handleDropdown}
            ref={largeScreenDropdownRef}
            className="cursor-pointer"
          >
            <img src={UserIcon} alt="user_icon" className="w-6 h-6" />
          </div>
        </div>
        {isDropdown && <LargeScreenDropdown />}

        <div className="hidden lg:flex gap-2 items-center max-w-[1200px]">
          <section className="flex gap-10 items-center">
            <Link to="/profile">Profile</Link>
            <Link to="/favorites">My Favorites</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/settings">Settings</Link>
            <p onClick={handleLogout}>Logout</p>
          </section>

          <img
            src={`${import.meta.env.VITE_API_STORAGE}${
              user?.user.profilePicture
            }`}
            alt="profile_picture"
            className="rounded-full w-10 h-10"
          />
        </div>

        <div
          ref={dropdownRef}
          onClick={toggleDropdown}
          className="cursor-pointer md:hidden"
        >
          <img src={UserIcon} alt="user_icon" className="w-6 h-6" />
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-700"></div>
      {isOpen && <DropDown />}
    </div>
  );
};

export default Header;
