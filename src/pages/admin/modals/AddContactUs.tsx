import { useState } from "react";
import Swal from "sweetalert2";
import { addContactUs } from "../../../services/contact";
import { ContactUsProps } from "../../../types/contactUs";

interface AddContactUsProps {
  onClose: () => void;
  onSave: (newContact: ContactUsProps) => void;
}

const AddContactUs = ({ onClose, onSave }: AddContactUsProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newContact: ContactUsProps = { id: 0, email, phone };
      await addContactUs(newContact);
      window.location.reload();
      onSave(newContact);
      onClose();
      Swal.fire("Success!", "Contact information has been added.", "success");
    } catch (error) {
      console.error("Failed to add contact:", error);
      Swal.fire("Error!", "Failed to add contact information.", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          Add Contact Us Information
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactUs;
