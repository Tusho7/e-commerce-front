import { useEffect, useState } from "react";
import { getAboutUsData } from "../../services/aboutUs";
import { Link } from "react-router-dom";
import AddAboutUs from "./modals/AddAboutUs";
import { AboutUsProps } from "../../types/aboutUs";
import EditIcon from "../../assets/edit_icon.png";
import EditAboutUs from "./modals/EditAboutUs";

const AdminAbout = () => {
  const [aboutUsData, setAboutUsData] = useState<AboutUsProps[]>([]);
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const [isEditAboutUsModalOpen, setIsEditAboutUsModalOpen] =
    useState<AboutUsProps | null>(null);

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await getAboutUsData();
        setAboutUsData(response.data);
      } catch (error) {
        console.error("Failed to fetch about us data:", error);
      }
    };
    fetchAboutUsData();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl lg:text-5xl font-extrabold text-gray-300 w-[160px] lg:w-[670px]">
          About Us Information
        </h1>
        <div className="flex flex-col gap-2 text-center justify-start items-start lg:flex-row">
          <button
            onClick={() => setIsAboutUsModalOpen(true)}
            className="bg-green-500 text-white text-xs py-1 px-1 lg:py-2 lg:px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all lg:mr-4"
          >
            Add About Us
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
        {aboutUsData &&
          aboutUsData.map((section) => (
            <div key={section.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <img
                  src={EditIcon}
                  alt="edit_icon"
                  className="w-7 h-7 cursor-pointer"
                  onClick={() => setIsEditAboutUsModalOpen(section)}
                />
              </div>
              <p className="text-gray-700">{section.content}</p>
              {section.title === "Contact Us" && (
                <div className="mt-4">
                  <h1 className="text-lg font-bold">
                    Contact Info is on the Contact Page
                  </h1>
                  <Link to="/contact_page">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 mt-2">
                      Go to Contact Page
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ))}
      </div>

      {isAboutUsModalOpen && <AddAboutUs />}
      {isEditAboutUsModalOpen && (
        <EditAboutUs
          product={isEditAboutUsModalOpen}
          onClose={() => setIsEditAboutUsModalOpen(null)}
        />
      )}
    </div>
  );
};

export default AdminAbout;
