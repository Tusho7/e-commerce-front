import { useEffect, useState } from "react";
import EditIcon from "../../assets/edit_icon.png";
import DeleteIcon from "../../assets/delete_icon.png";
import { Link } from "react-router-dom";
import { PrivacyPolicyProps } from "../../types/privacyPolicy";
import {
  deletePrivacyPolicy,
  getprivacyPolicy,
} from "../../services/privacypolicy";
import AddPrivacyPolicy from "./modals/AddPrivacyPolicy";
import Swal from "sweetalert2";

const AdminPrivacyPolicy = () => {
  const [privacyData, setPrivacyData] = useState<PrivacyPolicyProps[]>([]);
  const [isAddPrivacyModalOpen, setIsAddPrivacyModalOpen] = useState(false);

  useEffect(() => {
    const fetchPrivacyData = async () => {
      try {
        const response = await getprivacyPolicy();
        setPrivacyData(response.data);
      } catch (error) {
        console.error("Failed to fetch contact data:", error);
      }
    };
    fetchPrivacyData();
  }, []);

  const handleAddPrivacyPolicy = (newData: PrivacyPolicyProps) => {
    setPrivacyData((prevData) => [...prevData, newData]);
  };

  const handleDeleteAboutUs = async (id: number) => {
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
        await deletePrivacyPolicy(id);
        setPrivacyData((prevData) =>
          prevData.filter((section) => section.id !== id)
        );
        Swal.fire({
          title: "Deleted!",
          text: "Privacy policy section deleted successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to delete privacy policy data:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete Privacy policy section",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl lg:text-5xl font-extrabold text-gray-300 w-[160px] lg:w-[670px]">
          Privacy Policy Information
        </h1>
        <div className="flex flex-col gap-2 text-center justify-start items-start lg:flex-row">
          <button
            onClick={() => setIsAddPrivacyModalOpen(true)}
            className="bg-green-500 text-white text-xs py-1 px-1 lg:py-2 lg:px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all lg:mr-4"
          >
            Add Privacy Policy
          </button>
          <Link
            to="/admin_dashboard"
            className="bg-indigo-600 text-white text-xs py-1 px-1 lg:py-2 lg:px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
          >
            Go to Main Page
          </Link>
        </div>
      </div>
      <div className="space-y-6">
        {privacyData.map((privacy) => (
          <div
            key={privacy.id}
            className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center"
          >
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">Title: {privacy.title}</h2>
              <p className="text-gray-700 mt-2 max-w-[950px]">
                Content: {privacy.content}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={EditIcon}
                alt="Edit"
                className="w-6 h-6 cursor-pointer"
              />
              <img
                src={DeleteIcon}
                alt="Delete"
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleDeleteAboutUs(privacy.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {isAddPrivacyModalOpen && (
        <AddPrivacyPolicy
          onClose={() => setIsAddPrivacyModalOpen(false)}
          onAdd={handleAddPrivacyPolicy}
        />
      )}
    </div>
  );
};

export default AdminPrivacyPolicy;
