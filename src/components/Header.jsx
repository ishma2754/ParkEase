import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 py-2">
      <div className="container mx-auto flex justify-center sm:justify-end items-center pr-4">
        <div className="flex gap-x-6">
          <Link
            className="text-xs sm:text-sm hover:text-blue-400 transition-colors text-gray-100"
            to="/login"
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className="text-xs sm:text-sm hover:text-blue-400 transition-colors text-gray-100"
          >
            Create Account
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
