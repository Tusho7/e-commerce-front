import { createContext, useState, useEffect, ReactNode } from "react";
import { Admin, AdminContextType } from "../types/admin";
import { getAdmin } from "../services/admin/api/getAdmin";

export const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      const isLogin = localStorage.getItem("isAdminLogin") === "true";
      if (isLogin) {
        const { data } = await getAdmin();
        setAdmin(data);
      }
    };

    initializeUser();
  }, [setAdmin]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
