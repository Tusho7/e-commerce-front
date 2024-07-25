import { useEffect, useState } from "react";
import { editFaq, getFaqs } from "../../services/faqs";
import { Link } from "react-router-dom";
import { Faq } from "../../types/faq";
import EditIcon from "../../assets/edit_icon.png";
import DeleteIcon from "../../assets/delete_icon.png";
import AddFaq from "./modals/AddFaq";
import EditFaq from "./modals/EditFaq";
import Swal from "sweetalert2";

const AdminFaq = () => {
  const [faqData, setFaqData] = useState<Faq[]>([]);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [isEditFaqModalOpen, setIsEditFaqModalOpen] = useState<Faq | null>(
    null
  );

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await getFaqs();
        setFaqData(response.data);
      } catch (error) {
        console.error("Failed to fetch faq data data:", error);
      }
    };
    fetchFaqData();
  }, []);

  const handleAddFAq = (newData: Faq) => {
    setFaqData((prevData) => [...prevData, newData]);
  };

  const handleEditFaq = async (updatedData: Faq) => {
    try {
      await editFaq(updatedData.id, updatedData);
      setFaqData((prevData) =>
        prevData.map((faq) => (faq.id === updatedData.id ? updatedData : faq))
      );
      setIsEditFaqModalOpen(null);
      Swal.fire("Success!", "Faq information has been updated.", "success");
    } catch (error) {
      console.error("Failed to edit faq:", error);
      Swal.fire("Error!", "Failed to update faq information.", "error");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl lg:text-5xl font-extrabold text-gray-300 w-[160px] lg:w-[670px]">
          Faq Information
        </h1>
        <div className="flex flex-col gap-2 text-center justify-start items-start lg:flex-row">
          <button
            onClick={() => setIsFaqModalOpen(true)}
            className="bg-green-500 text-white text-xs py-1 px-1 lg:py-2 lg:px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all lg:mr-4"
          >
            Add Faq
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
        {faqData.map((section, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{section.question}</h2>
              <div className="flex gap-4">
                <img
                  src={EditIcon}
                  alt="edit_icon"
                  className="w-7 h-7 cursor-pointer"
                  onClick={() => setIsEditFaqModalOpen(section)}
                />
                <img
                  src={DeleteIcon}
                  alt="delete_icon"
                  className="w-7 h-7 cursor-pointer"
                />
              </div>
            </div>
            <p className="text-gray-700">{section.answer}</p>
          </div>
        ))}
      </div>

      {isFaqModalOpen && (
        <AddFaq onClose={() => setIsFaqModalOpen(false)} onAdd={handleAddFAq} />
      )}

      {isEditFaqModalOpen && (
        <EditFaq
          faq={isEditFaqModalOpen}
          onClose={() => setIsEditFaqModalOpen(null)}
          onSave={handleEditFaq}
        />
      )}
    </div>
  );
};

export default AdminFaq;
