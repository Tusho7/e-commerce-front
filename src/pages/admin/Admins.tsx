import { useEffect, useState } from "react";
import { deleteAdmin, getAllAdmins } from "../../services/admin/admins";
import { Admin } from "../../types/admin";
import { Link } from "react-router-dom";
import DeleteIcon from "../../assets/delete_icon.png";
import Swal from "sweetalert2";
import { useAdmin } from "../../contexts/UseAdmin";

const Admins = () => {
  const admin = useAdmin();
  const [adminsData, setAdminsData] = useState<Admin[]>([]);
  const adminId = admin?.admin?.id;
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await getAllAdmins();
        setAdminsData(response.data);
      } catch (error) {
        console.error("Failed to fetch admins data:", error);
      }
    };
    fetchAdmins();
  }, []);

  const handleDeleteAdmin = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteAdmin(id);
        setAdminsData((prevData) =>
          prevData.filter((admin) => admin.id !== id)
        );
        Swal.fire({
          title: "Deleted!",
          text: "Admin deleted successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to delete admin:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete admin",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div className="p-4 md:px-8 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-white">
          Admins List
        </h1>
        <Link
          to="/admin_dashboard"
          className="bg-indigo-600 text-white text-sm py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Go to Main Page
        </Link>
      </div>
      {adminsData.length === 0 ? (
        <p className="text-gray-500">No admins available.</p>
      ) : (
        <ul className="space-y-4">
          {adminsData.map((admin) => (
            <li
              key={admin.id}
              className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {admin.firstName} {admin.lastName}
                  </h2>
                  <p className="text-gray-600">{admin.email}</p>
                  <p className="text-gray-400">
                    {new Date(admin.createdAt).toLocaleDateString("ka-GE")}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                {adminId !== admin.id && (
                  <img
                    src={DeleteIcon}
                    alt="delete_icon"
                    className="w-8 h-8 cursor-pointer hover:opacity-75 transition duration-300"
                    onClick={() => handleDeleteAdmin(admin.id)}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admins;
