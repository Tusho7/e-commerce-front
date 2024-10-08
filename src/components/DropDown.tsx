import { Link } from "react-router-dom";
import { useUser } from "../contexts/UseUser";
import { logoutUser } from "../services/api/Auth";

const Dropdown = () => {
  const { user } = useUser();

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
    <div className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
      <div className="flex gap-2 items-center px-4 py-2">
        <img
          src={`${import.meta.env.VITE_API_STORAGE}${
            user?.user.profilePicture
          }`}
          alt="profile_picture"
          className="rounded-full w-10 h-10"
        />
        <p className="text-center  text-sm text-gray-700">
          Hi,
          <span className="font-semibold text-gray-00">
            {user?.user?.firstName} {user?.user.lastName}
          </span>
        </p>
      </div>
      <div className="w-full h-[1px] bg-gray-300"></div>

      <Link
        to="/profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Profile
      </Link>
      <Link
        to="/favorites"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        My Favorites
      </Link>
      <Link
        to="/cart"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Cart
      </Link>
      <Link
        to="/settings"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Settings
      </Link>
      <button
        onClick={handleLogout}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );
};

export default Dropdown;
