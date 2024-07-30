import React, { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { updateAdmin } from "../../services/admin/admins";
import { useAdmin } from "../../contexts/UseAdmin";
import { Logout } from "../../services/admin/api/Auth";
import { Link, useNavigate } from "react-router-dom";

const AdminSettings = () => {
  const navigate = useNavigate();
  const { admin } = useAdmin();

  const [formData, setFormData] = useState({
    email: admin?.email || "",
    password: "",
    firstName: admin?.firstName || "",
    lastName: admin?.lastName || "",
  });

  const adminId = admin?.id;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await updateAdmin(adminId, formData);
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Admin updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        Logout();
        localStorage.clear();
        navigate("/admin_login");
      }
    } catch (error) {
      console.error("Failed to update admin:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update admin.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="p-4 md:px-8 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl lg:text-5xl font-extrabold text-gray-300 w-[160px] lg:w-[670px]">
          Update Admin Settings
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
      <form onSubmit={handleUpdate} className="space-y-4 max-w-[600px] mx-auto">
        <div>
          <label htmlFor="firstName" className="block text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter new password"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
