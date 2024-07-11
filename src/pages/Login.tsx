import { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUser } from "../services/api/getUser";
import { loginUser } from "../services/api/Auth";
import { useUser } from "../contexts/UseUser";
import Loading from "../components/Loading";
import { ErrorResponse } from "../types/error";
import shoesPicture from "../assets/shoes.jpg";

interface LoginProps {
  onForgotPassword: () => void;
}

const Login = ({ onForgotPassword }: LoginProps) => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const email = target.username.value;
    const password = target.password.value;

    try {
      await loginUser(email, password);
      localStorage.setItem("isLogin", "true");
      const { data } = await getUser();
      setUser(data);
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        const errorResponse = error as ErrorResponse;
        if (
          errorResponse.response &&
          errorResponse.response.data &&
          errorResponse.response.data.message
        ) {
          setError(errorResponse.response.data.message);
        } else {
          setError("Server Error. Please try again later.");
        }
      } else {
        setError("Unexpected Error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-[#0E1028]">
      {loading && <Loading />}
      <div className="max-w-lg w-full bg-[#1A1E46] p-10 rounded-[10%] shadow-lg space-y-8 text-white">
        <section className="flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-center">შესვლა</h2>
          <img src={shoesPicture} alt="shoes" className="w-20 h-20 " />
        </section>
        <form
          className="space-y-6 flex flex-col gap-3 justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
            <label htmlFor="username" className="block text-sm font-medium ">
              ელ-ფოსტა
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-1 block w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500 placeholder-gray-500 text-white"
              placeholder="ელ-ფოსტა"
            />
          </div>
          <div className="relative w-full">
            <label htmlFor="password" className="block text-sm font-medium ">
              პაროლი
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500 placeholder-gray-500 text-white"
              placeholder="პაროლი"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="mx-auto w-2/4 py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 ease-in-out"
          >
            შესვლა
          </button>
        </form>
        <div className="text-center">
          <p
            className=" hover:underline cursor-pointer text-sm mt-4"
            onClick={onForgotPassword}
          >
            დაგავიწყდა პაროლი?
          </p>
        </div>
        <div className="relative mt-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#1A1E46]">ან</span>
          </div>
        </div>

        <div className="text-center">
          <p className="hover:underline cursor-pointer text-sm mt-4">
            არ გაქვთ ექაუნთი?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              რეგისტრაცია
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
