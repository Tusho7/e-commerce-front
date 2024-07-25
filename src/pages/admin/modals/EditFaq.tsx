import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Faq } from "../../../types/faq";

interface EditFaqProps {
  faq: Faq;
  onClose: () => void;
  onSave: (updatedData: Faq) => void;
}

const EditFaq = ({ faq, onClose, onSave }: EditFaqProps) => {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);

  const handleSave = () => {
    const updatedData = { ...faq, question, answer };
    onSave(updatedData);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 text-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Faq</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Question
            </label>
            <input
              id="question"
              type="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Answer
            </label>
            <input
              id="answer"
              type="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFaq;
