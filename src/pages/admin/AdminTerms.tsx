import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "../../assets/edit_icon.png";
import DeleteIcon from "../../assets/delete_icon.png";
import {
  deleteTerms,
  getTermsData,
  updateTermsData,
} from "../../services/terms";
import { TermsProps } from "../../types/terms";
import AddTerms from "./modals/AddTerms";
import Swal from "sweetalert2";
import EditTerms from "./modals/EditTerms";

const AdminTerms = () => {
  const [termsData, setTermsData] = useState<TermsProps[]>([]);
  const [isAddTermsModalOpen, setIsAddTermsModalOpen] = useState(false);
  const [isEditTermsModalOpen, setIsEditTermsModalOpen] =
    useState<TermsProps | null>(null);

  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        const response = await getTermsData();
        setTermsData(response.data);
      } catch (error) {
        console.error("Failed to fetch about us data:", error);
      }
    };
    fetchTermsData();
  }, []);

  const handleAddTerms = (newData: TermsProps) => {
    setTermsData((prevData) => [...prevData, newData]);
  };

  const handleDeleteTerms = async (id: number) => {
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
        await deleteTerms(id);
        setTermsData((prevData) =>
          prevData.filter((section) => section.id !== id)
        );
        Swal.fire({
          title: "Deleted!",
          text: "Terms section deleted successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to delete terms data:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete Terms section",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  const handleUpdateTerms = async (id: number, updatedData: TermsProps) => {
    try {
      await updateTermsData(id, updatedData);
      setTermsData((prevData) =>
        prevData.map((section) =>
          section.id === id ? { ...section, ...updatedData } : section
        )
      );
      Swal.fire({
        title: "Success!",
        text: "About Us information updated successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setIsEditTermsModalOpen(null);
    } catch (error) {
      console.error("Failed to update about us data:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update About Us information",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl lg:text-5xl font-extrabold text-gray-300 w-[160px] lg:w-[670px]">
          Terms & Conditions Information
        </h1>
        <div className="flex flex-col gap-2 text-center justify-start items-start lg:flex-row">
          <button
            onClick={() => setIsAddTermsModalOpen(true)}
            className="bg-green-500 text-white text-xs py-1 px-1 lg:py-2 lg:px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all lg:mr-4"
          >
            Add Terms & Conditions
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
        {termsData.map((section) => (
          <div key={section.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <div className="flex gap-4">
                <img
                  src={EditIcon}
                  alt="edit_icon"
                  className="w-7 h-7 cursor-pointer"
                  onClick={() => setIsEditTermsModalOpen(section)}
                />
                <img
                  src={DeleteIcon}
                  alt="delete_icon"
                  className="w-7 h-7 cursor-pointer"
                  onClick={() => handleDeleteTerms(section.id)}
                />
              </div>
            </div>
            <p className="text-gray-700">{section.content}</p>
          </div>
        ))}
      </div>

      {isAddTermsModalOpen && (
        <AddTerms
          onClose={() => setIsAddTermsModalOpen(false)}
          onAdd={handleAddTerms}
        />
      )}

      {isEditTermsModalOpen && (
        <EditTerms
          product={isEditTermsModalOpen}
          onClose={() => setIsEditTermsModalOpen(null)}
          onSave={handleUpdateTerms}
        />
      )}
    </div>
  );
};

export default AdminTerms;
