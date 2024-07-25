import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Registration from "./pages/Registration";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import FaqPage from "./pages/Faq";
import ContactPage from "./pages/Contact";
import Reviews from "./pages/Reviews";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AboutUs from "./pages/AboutUs";
import ScrollToTop from "./utils/scrollToTop";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/Terms";
import PrivateAdminRoutes from "./components/PrivateAdminRoutes";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFoundPage from "./pages/NotFoundPage";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminContact from "./pages/admin/AdminContact";
import AdminFaq from "./pages/admin/AdminFaq";
import AdminCareers from "./pages/admin/AdminCareers";
import AdminPrivacyPolicy from "./pages/admin/AdminPrivacyPolicy";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/register" element={<Registration />} />

        <Route path="/admin_login" element={<AdminLogin />} />

        <Route
          path="/admin_dashboard"
          element={
            <PrivateAdminRoutes>
              <AdminDashboard />
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
          path="/admin_about"
          element={
            <PrivateAdminRoutes>
              <AdminAbout />
            </PrivateAdminRoutes>
          }
        />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <AboutUs />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <PrivateRoute>
              <Reviews />
            </PrivateRoute>
          }
        />

        <Route
          path="/faq"
          element={
            <PrivateRoute>
              <FaqPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <ContactPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/careers"
          element={
            <PrivateRoute>
              <Careers />
            </PrivateRoute>
          }
        />

        <Route
          path="/privacy"
          element={
            <PrivateRoute>
              <PrivacyPolicy />
            </PrivateRoute>
          }
        />

        <Route
          path="/terms"
          element={
            <PrivateRoute>
              <TermsConditions />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={
            <PrivateRoute>
              <NotFoundPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
export default App;
