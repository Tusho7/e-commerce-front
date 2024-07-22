import { useEffect, useState } from "react";
import {
  blockUserById,
  deleteUserById,
  getAllUsers,
} from "../../services/admin/users";
import { UserForAdmin } from "../../types/user";
import Loading from "../../components/Loading";
import Dropdown from "./AdminDropdown";
import UserEditModal from "./modals/UserEdit";
import Swal from "sweetalert2";

const AdminUsers = () => {
  const [users, setUsers] = useState<UserForAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<UserForAdmin | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error fetching data:");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user: UserForAdmin) => {
    setEditingUser(user);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
  };

  const handleSaveUser = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
      Swal.fire("Success", "User updated successfully", "success");
    } catch (err) {
      setError("Error saving user");
      Swal.fire("Error", "Error saving user", "error");
    }
    handleCloseModal();
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!",
      });

      if (result.isConfirmed) {
        await deleteUserById(userId);

        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      Swal.fire("Error", "There was an error deleting the user.", "error");
    }
  };

  const handleBlockUser = async (userId: number) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to block/unblock this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, toggle!",
      });

      if (result.isConfirmed) {
        await blockUserById(userId);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
          )
        );

        Swal.fire("Success", "User blocked/unblocked success", "success");
      }
    } catch (err) {
      console.error("Error blocking user:", err);
      Swal.fire("Error", "Error toggling user status", "error");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const sortedUsers = [...users].sort((a, b) => {
    if (a.isBlocked && !b.isBlocked) {
      return -1;
    } else if (!a.isBlocked && b.isBlocked) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-4xl text-center mb-8 mt-6 font-bold text-white">
        All Users
      </h1>
      <div className="relative">
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  ID
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  First Name
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  Last Name
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  Email
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  Profile Picture
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  Verified
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  Blocked
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  Created At
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  Updated At
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td
                    className={`py-2 px-4 ${
                      user.isBlocked ? "text-red-500" : "text-black"
                    }`}
                  >
                    {user.id}
                  </td>
                  <td
                    className={`py-2 px-4 ${
                      user.isBlocked ? "text-red-500" : "text-black"
                    }`}
                  >
                    {user.firstName}
                  </td>
                  <td
                    className={`py-2 px-4 ${
                      user.isBlocked ? "text-red-500" : "text-black"
                    }`}
                  >
                    {user.lastName}
                  </td>
                  <td
                    className={`py-2 px-4 ${
                      user.isBlocked ? "text-red-500" : "text-black"
                    }`}
                  >
                    {user.email}
                  </td>
                  <td
                    className={`py-2 px-4 ${
                      user.isBlocked ? "text-red-500" : "text-black"
                    }`}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_STORAGE}${
                        user?.profilePicture
                      }`}
                      alt={user.firstName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td
                    className={`py-2 px-4 ${
                      user.isBlocked ? "text-red-500" : "text-black"
                    }`}
                  >
                    {user.isVerified ? "Yes" : "No"}
                  </td>
                  <td
                    className={`py-2 px-4 ${
                      user.isBlocked ? "text-red-500" : "text-black"
                    }`}
                  >
                    {user.isBlocked ? "Yes" : "No"}
                  </td>
                  <td
                    className={`py-2 px-4 ${
                      user.isBlocked ? "text-red-500" : "text-black"
                    }`}
                  >
                    {new Date(user.createdAt).toLocaleDateString("ka-GE")}
                  </td>
                  <td
                    className={`py-2 px-4 ${
                      user.isBlocked ? "text-red-500" : "text-black"
                    }`}
                  >
                    {new Date(user.updatedAt).toLocaleDateString("ka-GE")}
                  </td>
                  <td className="py-2 px-4">
                    <Dropdown
                      onEdit={() => handleEditUser(user)}
                      onDelete={() => handleDeleteUser(user.id)}
                      onBlock={() => handleBlockUser(user.id)}
                      isBlocked={user.isBlocked}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editingUser && (
        <UserEditModal
          user={editingUser}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default AdminUsers;
