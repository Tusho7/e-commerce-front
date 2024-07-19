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

function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/register" element={<Registration />} />

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
      </Routes>
    </div>
  );
}
export default App;
