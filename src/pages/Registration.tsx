import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { ErrorResponse, Link } from "react-router-dom";
import Loading from "../components/Loading";
import { registerUser } from "../services/api/Auth";
import VerificationCodeInput from "../components/VerificationCodeInput";
import shoesPicture from "../assets/shoes.jpg";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-[#0E1028]">
      {loading && <Loading />}
      <div className="w-full md:max-w-[450px]  bg-[#1A1E46] p-5 rounded-lg shadow-lg text-white">
        <section className="flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-center">რეგისტრაცია</h2>
          <img src={shoesPicture} alt="shoes" className="w-20 h-20" />
        </section>
        <form
          className="flex flex-col gap-3 justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
            <label htmlFor="email" className="block text-sm font-medium">
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
              className="mt-1 block w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500 placeholder-gray-500 text-white"
              placeholder="ელ-ფოსტა"
            />
          </div>
          <div className="relative w-full">
            <label htmlFor="password" className="block text-sm font-medium">
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
              className="mt-1 block w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500 placeholder-gray-500 text-white"
              placeholder="პაროლი"
            />
          </div>
          <div className="relative w-full">
            <label htmlFor="firstName" className="block text-sm font-medium">
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
              className="mt-1 block w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500 placeholder-gray-500 text-white"
              placeholder="სახელი"
            />
          </div>
          <div className="relative w-full">
            <label htmlFor="lastName" className="block text-sm font-medium">
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
              className="mt-1 block w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500 placeholder-gray-500 text-white"
              placeholder="გვარი"
            />
          </div>
          <div className="relative w-full">
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium"
            >
              პროფილის სურათი
            </label>
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              className="mt-1 block w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500 placeholder-gray-500 text-white"
            />
          </div>
          {loading && <Loading />}
          <button
            type="submit"
            className="mx-auto w-2/3 py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 ease-in-out"
          >
            რეგისტრაცია
          </button>
        </form>
        <div className="text-center">
          <p className="hover:underline cursor-pointer text-sm mt-4">
            გაქვთ ექაუნთი?{" "}
            <Link
              to="/"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              შესვლა
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
