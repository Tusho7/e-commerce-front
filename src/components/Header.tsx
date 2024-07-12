import { useState } from "react";
import UserIcon from "../assets/user.png";
import DropDown from "./DropDown";

const Header = () => {
  const [active, setActive] = useState("MEN");
  const [dropdown, setDropdown] = useState(false);

  const handleClick = (item: string) => {
    setActive(item);
  };

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <div>
      <div className="text-white p-4 flex justify-between items-center">
        <div className="flex justify-between items-center gap-10 text-sm">
          <p
            className={`cursor-pointer ${
              active === "MEN" ? "text-green-400 border-b border-green-400" : ""
            }`}
            onClick={() => handleClick("MEN")}
          >
            MEN
          </p>
          <p
            className={`cursor-pointer ${
              active === "WOMEN"
                ? "text-green-400 border-b border-green-400"
                : ""
            }`}
            onClick={() => handleClick("WOMEN")}
          >
            WOMEN
          </p>
          <p
            className={`cursor-pointer ${
              active === "SALE"
                ? "text-green-400 border-b border-green-400"
                : ""
            }`}
            onClick={() => handleClick("SALE")}
          >
            SALE
          </p>
        </div>

        <div onClick={handleDropdown}>
          <img src={UserIcon} alt="user_icon" className="w-6 h-6" />
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-700"></div>

      {dropdown && <DropDown />}
    </div>
  );
};

export default Header;
