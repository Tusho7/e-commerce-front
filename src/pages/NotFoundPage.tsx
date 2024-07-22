import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FloatingBubbles from "../components/FloatingBubbles";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">უპს! გვერდი ვერ მოიძებნა.</p>
        <Link
          to="/home"
          className="inline-block mt-4 px-8 py-3 text-lg font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition"
        >
          დაბრუნდი მთავარ გვერდზე
        </Link>
      </motion.div>
      <motion.div
        className="mt-8"
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-500"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </motion.div>
      <FloatingBubbles />
    </div>
  );
};

export default NotFoundPage;
