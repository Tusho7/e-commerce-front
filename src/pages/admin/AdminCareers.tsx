import { useEffect, useState } from "react";
import EditIcon from "../../assets/edit_icon.png";
import DeleteIcon from "../../assets/delete_icon.png";
import { Link } from "react-router-dom";
import { CareerProps } from "../../types/careerProps";
import { getCareerData } from "../../services/careers";
import AddCareer from "./modals/AddCareer";

const AdminCareers = () => {
  const [careersData, setCareersData] = useState<CareerProps[]>([]);
  const [isAddCareerModalOpen, setIsAddCareerModalOpen] = useState(false);

  useEffect(() => {
    const fetchCareersData = async () => {
      try {
        const response = await getCareerData();
        setCareersData(response.data);
      } catch (error) {
        console.error("Failed to fetch contact data:", error);
      }
    };
    fetchCareersData();
  }, []);

  const handleAddCareer = (newData: CareerProps) => {
    setCareersData((prevData) => [...prevData, newData]);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl lg:text-5xl font-extrabold text-gray-300 w-[160px] lg:w-[670px]">
          Careers Information
        </h1>
        <div className="flex flex-col gap-2 text-center justify-start items-start lg:flex-row">
          <button
            onClick={() => setIsAddCareerModalOpen(true)}
            className="bg-green-500 text-white text-xs py-1 px-1 lg:py-2 lg:px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all lg:mr-4"
          >
            Add Careers
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
        {careersData.map((career) => (
          <div
            key={career.id}
            className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center"
          >
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">Title: {career.title}</h2>
              <p className="text-gray-700 mt-2">Content: {career.content}</p>
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
              />
            </div>
          </div>
        ))}
      </div>

      {isAddCareerModalOpen && (
        <AddCareer
          onClose={() => setIsAddCareerModalOpen(false)}
          onAdd={handleAddCareer}
        />
      )}
    </div>
  );
};

export default AdminCareers;
