import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Auth from "./components/Auth";
import Registration from "./pages/Registration";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
