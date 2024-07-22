import { Link } from "react-router-dom";
import { useUser } from "../contexts/UseUser";
import { logoutUser } from "../services/api/Auth";

const LargeScreenDropdown = () => {
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
    <div className="absolute right-4 mt-44 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-black">
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
      <div className="flex flex-col gap-2 items-start px-4 py-2">
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>

        <p onClick={handleLogout} className="cursor-pointer">
          Logout
        </p>
      </div>
    </div>
  );
};

export default LargeScreenDropdown;
