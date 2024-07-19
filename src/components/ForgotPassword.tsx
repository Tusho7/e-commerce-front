import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { forgotPassword } from "../services/api/Auth";
import Loading from "./Loading";

interface ForgotPasswordProps {
  onSuccess: () => void;
}

const ForgotPassword = ({ onSuccess }: ForgotPasswordProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword(email);
      Swal.fire({
        icon: "success",
        title: "წარმატება",
        text: "პაროლის აღდგენის ბმული გაიგზავნა თქვენს ელ-ფოსტაზე.",
      });
      setEmail("");
      onSuccess();
    } catch (error) {
      console.error("Failed to send reset email:", error);
      Swal.fire({
        icon: "error",
        title: "შეცდომა",
        text: "შეცდომა მოხდა, სცადეთ თავიდან.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E1028]">
      {loading && <Loading />}
      <div className="max-w-[350px] md:max-w-lg md:w-full bg-[#1A1E46] text-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold  text-center mb-6">
          დაგავიწყდა პაროლი?
        </h2>
        <form
          className="space-y-4 flex flex-col gap-2 justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2 w-full">
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
          <button
            type="submit"
            className="mx-auto w-2/4 py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 ease-in-out"
          >
            გაგზავნა
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          <span
            onClick={onSuccess}
            className="font-medium cursor-pointer hover:underline"
          >
            უკან დაბრუნება
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
