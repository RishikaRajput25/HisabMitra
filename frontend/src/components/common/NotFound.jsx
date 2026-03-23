import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-bold text-red-500">404</h1>
      <p className="text-xl text-black mt-4">Page Not Found</p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;