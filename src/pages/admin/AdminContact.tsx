import { useEffect, useState } from "react";
import {
  getContactUsData,
  deleteContact,
  editContacUs,
} from "../../services/contact";
import { ContactUsProps } from "../../types/contactUs";
import EditIcon from "../../assets/edit_icon.png";
import DeleteIcon from "../../assets/delete_icon.png";
import Swal from "sweetalert2";
import EditContact from "./modals/EditContact";

const AdminContact = () => {
  const [contactData, setContactData] = useState<ContactUsProps[]>([]);
  const [isEditContactModalOpen, setIsEditContactModalOpen] =
    useState<ContactUsProps | null>(null);

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

  const handleDeleteContact = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will delete the contact information.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteContact(id);
        setContactData(contactData.filter((contact) => contact.id !== id));
        Swal.fire(
          "Deleted!",
          "Contact information has been deleted.",
          "success"
        );
      }
    } catch (error) {
      console.error("Failed to delete contact:", error);
      Swal.fire("Error!", "Failed to delete contact information.", "error");
    }
  };

  const handleEditContact = async (updatedData: ContactUsProps) => {
    try {
      await editContacUs(updatedData.id, updatedData);
      setContactData((prevData) =>
        prevData.map((contact) =>
          contact.id === updatedData.id ? updatedData : contact
        )
      );
      setIsEditContactModalOpen(null);
      Swal.fire("Success!", "Contact information has been updated.", "success");
    } catch (error) {
      console.error("Failed to edit contact:", error);
      Swal.fire("Error!", "Failed to update contact information.", "error");
    }
  };

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
                onClick={() => setIsEditContactModalOpen(contact)}
              />
              <img
                src={DeleteIcon}
                alt="Delete"
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleDeleteContact(contact.id)}
              />
            </div>
          </div>
        ))}
      </div>
      {isEditContactModalOpen && (
        <EditContact
          contact={isEditContactModalOpen}
          onClose={() => setIsEditContactModalOpen(null)}
          onSave={handleEditContact}
        />
      )}
    </div>
  );
};

export default AdminContact;
