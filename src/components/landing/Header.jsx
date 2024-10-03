import { Link, useNavigate } from "react-router-dom";
import styles from "../../style";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/authentication/authUserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };
  return (
    <header className="bg-gray-900 py-2">
      <div
        className={`container mx-auto ${styles.flexCenter}  sm:justify-end  pr-4`}
      >
        <div className="flex gap-x-6">
          {user ? (
            <div className="flex gap-x-2 sm:gap-x-8 items-center">
              <p className="text-xs sm:text-sm hover:text-blue-400 transition-colors text-gray-100">
                Hello, {user.name}
              </p>
              <button
                className="text-xs sm:text-sm hover:text-blue-400 transition-colors text-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
