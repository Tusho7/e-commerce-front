import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Registration from "./pages/Registration";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </div>
  );
}
export default App;
