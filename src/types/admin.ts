export interface Admin {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface AdminContextType {
  admin: Admin | null;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
}

export interface AdminUpdate {
  email: string;
  password: string;
}
