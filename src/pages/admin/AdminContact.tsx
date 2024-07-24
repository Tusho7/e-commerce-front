import { useEffect, useState } from "react";
import { getContactUsData } from "../../services/contact";
import { ContactUsProps } from "../../types/contactUs";
import EditIcon from "../../assets/edit_icon.png";
import DeleteIcon from "../../assets/delete_icon.png";

const AdminContact = () => {
  const [contactData, setContactData] = useState<ContactUsProps[]>([]);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await getContactUsData();
        setContactData(response.data);
      } catch (error) {
        console.error("Failed to fetch contact data:", error);
      }
    };
    fetchContactData();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <h1 className="text-2xl lg:text-5xl font-extrabold text-gray-300 mb-12">
        Contact Us Information
      </h1>
      <div className="space-y-6">
        {contactData.map((contact) => (
          <div
            key={contact.id}
            className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center"
          >
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">Email: {contact.email}</h2>
              <p className="text-gray-700 mt-2">Phone: {contact.phone}</p>
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
    </div>
  );
};

export default AdminContact;
