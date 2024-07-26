import { Link, useNavigate } from "react-router-dom";
import WeatherComponent from "../../components/Weather";
import { useAdmin } from "../../contexts/UseAdmin";
import { Logout } from "../../services/admin/api/Auth";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin } = useAdmin();
  const adminFullName = admin?.firstName + " " + admin?.lastName;

  const currentDate = new Date().toLocaleDateString("ka-GE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLogout = async () => {
    try {
      await Logout();
      localStorage.clear();
      navigate("/admin_login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const items = [
    { title: "Users", color: "bg-blue-500", path: "/admin_users" },
    { title: "Categories", color: "bg-yellow-500", path: "/admin_categories" },
    { title: "Products", color: "bg-purple-500", path: "/admin_products" },
    { title: "About us", color: "bg-red-500", path: "/admin_about" },
    { title: "Contact", color: "bg-green-500", path: "/admin_contact" },
    { title: "Faq", color: "bg-yellow-500", path: "/admin_faq" },
    { title: "Careers", color: "bg-indigo-500", path: "/admin_careers" },
    { title: "Privacy Policy", color: "bg-pink-500", path: "/admin_privacy" },
    { title: "Terms & Conditions", color: "bg-teal-500", path: "/admin_terms" },
    { title: "Messages", color: "bg-blue-300", path: "/admin_messages" },
    { title: "Reviews", color: "bg-purple-300", path: "/admin_reviews" },
    { title: "Admins", color: "bg-red-300", path: "/admin_admins" },
    { title: "Settings", color: "bg-orange-500", path: "/admin_settings" },
    { title: "Logout", color: "bg-gray-500", path: "", onClick: handleLogout },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col gap-10 text-white">
      <h1 className="text-4xl text-center mb-8 mt-6 font-bold text-white">
        Admin Panel
      </h1>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">{currentDate}</h2>
      </div>
      <section className="flex flex-col md:flex-row justify-between items-center mb-8 bg-gray-100 p-6 rounded-lg shadow-md text-black">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl">
            Welcome, <span className="font-semibold ">{adminFullName}</span>
          </h2>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            onClick={item.onClick}
            className={`${item.color} rounded-3xl shadow-md p-5 text-center text-white transition-transform transform hover:scale-105`}
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>
          </Link>
        ))}
      </div>

      <WeatherComponent />
    </div>
  );
};

export default AdminDashboard;
