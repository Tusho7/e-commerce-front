import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/admin/users";
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
    console.log("Delete user with ID:", userId);
  };

  const handleBlockUser = async (userId: number) => {
    console.log("Block user with ID:", userId);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.firstName}</td>
                  <td className="py-2 px-4">{user.lastName}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <img
                      src={`${import.meta.env.VITE_API_STORAGE}${
                        user?.profilePicture
                      }`}
                      alt={user.firstName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-2 px-4">
                    {user.isVerified ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4">{user.isBlocked ? "Yes" : "No"}</td>
                  <td className="py-2 px-4">
                    {new Date(user.createdAt).toLocaleDateString("ka-GE")}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(user.updatedAt).toLocaleDateString("ka-GE")}
                  </td>
                  <td className="py-2 px-4">
                    <Dropdown
                      onEdit={() => handleEditUser(user)}
                      onDelete={() => handleDeleteUser(user.id)}
                      onBlock={() => handleBlockUser(user.id)}
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
