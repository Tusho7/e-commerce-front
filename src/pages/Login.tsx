import { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUser } from "../services/api/getUser";
import { loginUser } from "../services/api/Auth";
import { useUser } from "../contexts/UseUser";
import Loading from "../components/Loading";

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
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Server Error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-gray-400">
      {loading && <Loading />}
      <div className="max-w-lg w-full bg-white p-10 rounded-xl shadow-lg space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">შესვლა</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              ელ-ფოსტა
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="ელ-ფოსტა"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              პაროლი
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="პაროლი"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            შესვლა
          </button>
        </form>
        <div className="text-center">
          <p
            className="text-indigo-600 hover:underline cursor-pointer text-sm mt-4"
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
            <span className="px-2 bg-white text-gray-500">ან</span>
          </div>
        </div>
        <div className="mt-6">
          <Link to="/register">
            <button className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              ახალი ანგარიშის შექმნა
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
