import { Route, Routes } from "react-router-dom";
import PrivateAdminRoutes from "../components/PrivateAdminRoutes";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminContact from "../pages/admin/AdminContact";
import AdminFaq from "../pages/admin/AdminFaq";
import AdminCareers from "../pages/admin/AdminCareers";
import AdminPrivacyPolicy from "../pages/admin/AdminPrivacyPolicy";
import AdminTerms from "../pages/admin/AdminTerms";
import AdminMessages from "../pages/admin/AdminMessages";
import AdminReviews from "../pages/admin/AdminReviews";
import Admins from "../pages/admin/Admins";
import AdminSettings from "../pages/admin/AdminSettings";
import AdminAbout from "../pages/admin/AdminAbout";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route
        path="/admin_dashboard"
        element={
          <PrivateAdminRoutes>
            <AdminDashboard />
          </PrivateAdminRoutes>
        }
      />
      <Route
        path="/admin_categories"
        element={
          <PrivateAdminRoutes>
            <AdminCategories />
          </PrivateAdminRoutes>
        }
      />
      <Route
        path="/admin_products"
        element={
          <PrivateAdminRoutes>
            <AdminProducts />
          </PrivateAdminRoutes>
        }
      />
      <Route
        path="/admin_users"
        element={
          <PrivateAdminRoutes>
            <AdminUsers />
          </PrivateAdminRoutes>
        }
      />
      <Route
        path="/admin_contact"
        element={
          <PrivateAdminRoutes>
            <AdminContact />
          </PrivateAdminRoutes>
        }
      />
      <Route
        path="/admin_faq"
        element={
          <PrivateAdminRoutes>
            <AdminFaq />
          </PrivateAdminRoutes>
        }
      />
      <Route
        path="/admin_careers"
        element={
          <PrivateAdminRoutes>
            <AdminCareers />
          </PrivateAdminRoutes>
        }
      />
      <Route
        path="/admin_privacy"
        element={
          <PrivateAdminRoutes>
            <AdminPrivacyPolicy />
          </PrivateAdminRoutes>
        }
      />
      <Route
        path="/admin_terms"
        element={
          <PrivateAdminRoutes>
            <AdminTerms />
          </PrivateAdminRoutes>
        }
      />
      <Route
        path="/admin_messages"
        element={
          <PrivateAdminRoutes>
            <AdminMessages />
          </PrivateAdminRoutes>
        }
      />
      <Route
        path="/admin_reviews"
        element={
          <PrivateAdminRoutes>
            <AdminReviews />
          </PrivateAdminRoutes>
        }
      />
      <Route
        path="/admins"
        element={
          <PrivateAdminRoutes>
            <Admins />
          </PrivateAdminRoutes>
        }
      />
      <Route
        path="/admin_settings"
        element={
          <PrivateAdminRoutes>
            <AdminSettings />
          </PrivateAdminRoutes>
        }
      />
      <Route
        path="/admin_about"
        element={
          <PrivateAdminRoutes>
            <AdminAbout />
          </PrivateAdminRoutes>
        }
      />
    </Routes>
  );
}

export default AdminRoutes;
