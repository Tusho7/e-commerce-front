import { useUser } from "../contexts/UseUser";

const Dropdown = () => {
  const { user } = useUser();
  return (
    <div className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
      <div>
        <p className="text-center px-4 py-2 text-sm text-gray-700">
          Welcome,
          <span className="font-semibold text-gray-00">
            {user?.user?.firstName} {user?.user.lastName}
          </span>
        </p>
      </div>
      <div className="w-full h-[1px] bg-gray-300"></div>

      <a
        href="#profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Profile
      </a>
      <a
        href="#favorites"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        My Favorites
      </a>
      <a
        href="#cart"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Cart
      </a>
      <a
        href="#settings"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Settings
      </a>
      <a
        href="#logout"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Logout
      </a>
    </div>
  );
};

export default Dropdown;
