const Dropdown = () => {
  return (
    <div className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
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
        href="#bag"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Bag
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
