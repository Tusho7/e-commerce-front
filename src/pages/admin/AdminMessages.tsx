import { useEffect, useState } from "react";
import { deleteMessage, getMessages } from "../../services/messages";
import { FiChevronDown, FiChevronUp, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Message } from "../../types/messages";
import Swal from "sweetalert2";

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [expandedMessageIds, setExpandedMessageIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessages();
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    fetchMessages();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedMessageIds((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id: number) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        await deleteMessage(id);
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== id)
        );
        Swal.fire("Deleted!", "The message has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete the message:", error);
        Swal.fire("Error!", "Failed to delete the message.", "error");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl lg:text-5xl font-extrabold text-gray-300 w-[160px] lg:w-[670px]">
          Messages
        </h1>
        <div className="flex flex-col gap-2 text-center justify-start items-start lg:flex-row">
          <Link
            to="/admin_dashboard"
            className="bg-indigo-600 text-white text-xs py-1 px-1 lg:py-2 lg:px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
          >
            Go to Main Page
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {messages.map((message) => {
          const isExpanded = expandedMessageIds.includes(message.id);
          const shouldTruncate = message.message.length > 50;
          const displayedMessage =
            shouldTruncate && !isExpanded
              ? `${message.message.substring(0, 50)}...`
              : message.message;

          return (
            <div
              key={message.id}
              className="bg-gray-50 hover:bg-gray-100 transition-shadow shadow-lg rounded-lg p-6 border border-gray-200"
            >
              <section className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-2">
                  <span className="block text-gray-700">Name:</span>{" "}
                  {message.name}
                </h2>

                <button
                  onClick={() => handleDelete(message.id)}
                  className="text-red-500 flex items-center"
                >
                  <FiTrash2 />
                </button>
              </section>

              <p className="text-gray-600 mb-2">
                <span className="block text-gray-700">Email:</span>{" "}
                {message.email}
              </p>
              <p className="mb-2">
                <span className="block text-gray-700">Message:</span>{" "}
                {displayedMessage}
                {shouldTruncate && (
                  <button
                    onClick={() => toggleExpand(message.id)}
                    className="text-blue-500 ml-2 flex items-center"
                  >
                    {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                    <span className="ml-1">
                      {isExpanded ? "See Less" : "See More"}
                    </span>
                  </button>
                )}
              </p>
              <p className="text-gray-500 text-sm">
                <span className="block text-gray-700">Created At:</span>{" "}
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminMessages;
