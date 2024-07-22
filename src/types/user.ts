export interface User {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: File;
    isVerified?: boolean;
    password?: string;
    isBlocked: boolean;
    createdAt: string;
  };
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface UserUpdate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserForAdmin {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  profilePicture: string;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isVerified?: boolean;
}

export interface UserEditModalProps {
  user: UserForAdmin;
  onClose: () => void;
  onSave: () => void;
}
