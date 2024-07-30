import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import DropDown from "../components/DropDown";
import UserIcon from "../assets/user.png";
import { useUser } from "../contexts/UseUser";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import VerificationCodeInput from "../components/VerificationCodeInput";
import { logoutUser, UpdateUser } from "../services/api/Auth";

const Settings = () => {
  const { user } = useUser();
  const [dropdown, setDropdown] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);
  const [logout, setLogout] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      await UpdateUser(user?.user.id, formData);
      Swal.fire({
        icon: "success",
        title: "პროფილი განახლებულია",
        text: "თქვენი პროფილი წარმატებით განახლდა",
      });
      if (formData.email) {
        setUpdateComplete(true);
        setLogout(true);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "შეცდომა",
        text: "პროფილის განახლებისას დაფიქსირდა შეცდომა",
      });
    } finally {
      setLoading(false);
      setLogout(false);
    }
  };

  if (updateComplete) {
    return (
      <VerificationCodeInput
        email={formData.email}
        logout={logout}
        className="flex justify-center items-center h-screen"
      />
    );
  }

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
    <div className="">
      <div className="text-white p-4 flex justify-between items-center pb-4 max-w-[1200px] mx-auto">
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

      <div className="max-w-md mx-auto my-10 p-5 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-5">Settings</h2>
        {loading && <Loading />}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={user?.user.email || "Email"}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={user?.user.firstName || "First Name"}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={user?.user.lastName || "Last Name"}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="********"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
