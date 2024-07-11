import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { ErrorResponse, Link } from "react-router-dom";
import Loading from "../components/Loading";
import { registerUser } from "../services/api/Auth";
import VerificationCodeInput from "../components/VerificationCodeInput";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);

      if (file) {
        formData.append("profilePicture", file);
      }

      await registerUser(formData);
      Swal.fire({
        icon: "success",
        title: "წარმატება",
        text: "გთხოვთ შეამოწმოთ ელ-ფოსტა!.",
      });

      setRegistrationComplete(true);
    } catch (error: unknown) {
      console.error("Registration failed:", error);
      const errorMessage =
        (error as ErrorResponse)?.data?.message || "რეგისტრაცია ვერ მოხერხდა";

      Swal.fire({
        icon: "error",
        title: "შეცდომა",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  if (registrationComplete) {
    return (
      <VerificationCodeInput
        email={email}
        className="min-h-screen flex items-center justify-center bg-gray-900"
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-gray-400">
      {loading && <Loading />}
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          რეგისტრაცია
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="sr-only">
              ელ-ფოსტა
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="ელ-ფოსტა"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="sr-only">
              პაროლი
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="პაროლი"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="firstName" className="sr-only">
              სახელი
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="სახელი"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="sr-only">
              გვარი
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="გვარი"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="profilePicture" className="sr-only">
              Profile Picture
            </label>
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            რეგისტრაცია
          </button>
          <div className="mt-4 text-sm text-center">
            <Link
              to="/"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              გაქვთ ექაუნთი ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
