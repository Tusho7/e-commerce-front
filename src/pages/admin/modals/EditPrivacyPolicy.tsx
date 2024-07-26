import React, { useState } from "react";
import { AboutUsProps } from "../../../types/aboutUs";
import { PrivacyPolicyProps } from "../../../types/privacyPolicy";

interface EditPrivacypolicyProps {
  privacy: AboutUsProps;
  onClose: () => void;
  onSave: (id: number, updatedData: PrivacyPolicyProps) => void;
}

const EditPrivacyPolicy: React.FC<EditPrivacypolicyProps> = ({
  privacy,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(privacy.title);
  const [content, setContent] = useState(privacy.content);

  const handleSave = () => {
    onSave(privacy.id, { id: privacy.id, title, content });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Edit Privacy Policy</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              className="mt-1 block w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPrivacyPolicy;
