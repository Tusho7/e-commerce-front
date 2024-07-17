import React, { useState } from "react";
import Loading from "../components/Loading";
import { useUser } from "../contexts/UseUser";
import { contact } from "../services/contact";

const ContactUs: React.FC = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const userEmail = user?.user.email || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contact({ name, userEmail, message });
      setSuccess(true);
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 text-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Contact Us</h1>
      {loading && <Loading />}
      <form onSubmit={handleSubmit} className="space-y-4">
        {success && (
          <p className="text-green-500 mb-4">
            Thank you for your message. We will get back to you soon.
          </p>
        )}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full p-2 border rounded-md text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="mt-1 block w-full p-2 border rounded-md text-black"
            rows={4}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-md"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
