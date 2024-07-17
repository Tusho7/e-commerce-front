export interface Review {
  id: number;
  quote: string;
  user: {
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  createdAt: string;
}
