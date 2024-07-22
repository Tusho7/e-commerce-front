import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./contexts/UserContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { DropdownProvider } from "./contexts/DropDownContext.tsx";
import { AdminProvider } from "./contexts/AdminContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <DropdownProvider>
        <AdminProvider>
          <Router>
            <App />
          </Router>
        </AdminProvider>
      </DropdownProvider>
    </UserProvider>
  </React.StrictMode>
);
