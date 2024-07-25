import React, { useState } from "react";
import Swal from "sweetalert2";
import { PrivacyPolicyProps } from "../../../types/privacyPolicy";
import { createPrivacyPolicy } from "../../../services/privacypolicy";

interface AddPrivacyPolicyProps {
  onClose: () => void;
  onAdd: (newData: PrivacyPolicyProps) => void;
}

const AddPrivacyPolicy: React.FC<AddPrivacyPolicyProps> = ({
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleAdd = async () => {
    try {
      const newPrivacyPolicy: PrivacyPolicyProps = { id: 0, title, content };
      await createPrivacyPolicy(newPrivacyPolicy);
      onAdd(newPrivacyPolicy);
      Swal.fire({
        title: "Success!",
        text: "Privacy Policy section added successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      onClose();
    } catch (error) {
      console.error("Failed to add privacy policy data:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add Privacy Policy section",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Add Privacy Policy</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPrivacyPolicy;
