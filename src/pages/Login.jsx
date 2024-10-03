import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, InputField, Loader } from "../components/index";
import {
  loginUser,
  clearErrors,
  guestLoginUser,
} from "../features/authentication/authUserSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "../style";
import { addBooking } from "../features/mybookings/bookedSlice";
import { clearBookings } from "../features/bookings/bookingsSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { loading, error } = useSelector((state) => state.auth);
  const { tempBooking } = useSelector((state) => state.bookings);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    dispatch(clearErrors());

    const response = await dispatch(loginUser(formData));

    if (response.meta.requestStatus === "fulfilled") {
     
      const user = response.payload.foundUser;
      const userId = user._id;

      if (tempBooking) {
        const bookingData = {
          ...tempBooking,
          userId,
        };

        dispatch(addBooking(bookingData));
        dispatch(clearBookings());
        navigate("/mybookings");
      } else {
        navigate("/");
      }
    }
  };

  const handleGuestLogin = async () => {
    const response = await dispatch(guestLoginUser());

    if (response.meta.requestStatus === "fulfilled") {
      const user = response.payload.foundUser;
      const userId = user._id;

      if (tempBooking) {
        const bookingData = {
          ...tempBooking,
          userId,
        };

        dispatch(addBooking(bookingData));
        dispatch(clearBookings());
        navigate("/mybookings");
      } else {
        navigate("/");
      }
    }
  };
  if (loading) return <Loader />;

  return (
    <div className={`${styles.flexCenter} h-screen bg-gray-950`}>
      <div className="bg-gray-950 p-4 rounded-lg max-w-md booking-card">
        <h2 className="text-2xl text-center text-gray-200 mb-6 text-gradient font-bold font-poppins">
          Login
        </h2>

        {error && <div className="error-message mb-4">{error}</div>}
        <div className="mb-4">
          <label className="form-label">Email:</label>
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter your email"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="mb-4">
          <label className="form-label">Password:</label>
          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter your password"
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <Button onClick={handleSubmit} type="button">
            Login
          </Button>
          <Button
            className="w-full py-2 px-4  text-gray-200 rounded-lg mt-2 hover:bg-pink-400 bg-pink-500"
            onClick={handleGuestLogin}
          >
            GUEST USER
          </Button>
        </div>
        <p className="text-center mt-4 text-gray-200">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
