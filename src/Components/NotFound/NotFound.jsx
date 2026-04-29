import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-[77.9vh] flex items-center justify-center text-white">
      <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md shadow-xl border border-white/10">
        <h1 className="text-7xl font-bold text-blue-400 drop-shadow-lg">404</h1>

        <h2 className="text-2xl mt-4 font-semibold">Oops! Page not found</h2>

        <p className="text-gray-300 mt-2">
          The page you're looking for doesn’t exist in your Todo App
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 transition rounded-full shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
