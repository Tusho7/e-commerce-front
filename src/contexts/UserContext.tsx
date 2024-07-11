import { createContext, useState, useEffect, ReactNode } from "react";
import { getUser } from "../services/api/getUser";
import { User, UserContextType } from "../types/user";

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      const isLogin = localStorage.getItem("isLogin") === "true";
      if (isLogin) {
        const { data } = await getUser();
        setUser(data);
      }
    };

    initializeUser();
  }, [setUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
