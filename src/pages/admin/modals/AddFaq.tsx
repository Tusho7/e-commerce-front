import React, { useState } from "react";
import Swal from "sweetalert2";
import { Faq } from "../../../types/faq";
import { createFaq } from "../../../services/faqs";

interface AddFaqProps {
  onClose: () => void;
  onAdd: (newData: Faq) => void;
}

const AddFaq: React.FC<AddFaqProps> = ({ onClose, onAdd }) => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const handleAdd = async () => {
    try {
      const newFaq: Faq = { id: 0, question, answer };
      await createFaq(newFaq);
      onAdd(newFaq);
      Swal.fire({
        title: "Success!",
        text: "Faq section added successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      onClose();
    } catch (error) {
      console.error("Failed to add faq data:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add Faq section",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Add Faq</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700"
            >
              Question
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-700"
            >
              Answer
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
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

export default AddFaq;
