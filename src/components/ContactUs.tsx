import React, { useState } from "react";
import Swal from "sweetalert2";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire("Success!", "Your message has been sent.", "success");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="h-[100vh] mx-auto p-6 text-white">
      <h1 className="text-2xl font-semibold mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded-md text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded-md text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border rounded-md text-black"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
