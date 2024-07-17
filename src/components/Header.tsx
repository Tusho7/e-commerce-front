import UserIcon from "../assets/user.png";
import { HeaderProps } from "../services/headerAndProductList";
import DropDown from "./DropDown";

const Header = ({
  categories,
  active,
  handleClick,
  handleDropdown,
  dropdown,
}: HeaderProps) => {
  return (
    <div>
      <div className="text-white p-4 flex justify-between items-center">
        <div className="flex justify-between items-center gap-10 text-sm">
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

        <div onClick={handleDropdown} className="cursor-pointer">
          <img src={UserIcon} alt="user_icon" className="w-6 h-6" />
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-700"></div>
      {dropdown && <DropDown />}
    </div>
  );
};

export default Header;
