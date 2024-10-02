import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, InputField, Loader } from "../components/index";
import { loginUser } from "../features/authentication/authUserSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "../style";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { loading, error } = useSelector((state) => state.auth);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log("Submitting:", formData);
      try {
        const result = await dispatch(loginUser(formData));
        console.log("Login result:", result);
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/");
        }
      } catch (err) {
        console.error("Login error:", err);
        setErrors({
          general: err.message || "Login failed. Please try again.",
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) return <Loader />;

  return (
    <div className={`${styles.flexCenter} h-screen bg-gray-950`}>
      <div className="bg-gray-950 p-4 rounded-lg max-w-md booking-card">
        <h2 className="text-2xl text-center text-gray-200 mb-6 text-gradient font-bold font-poppins">
          Login
        </h2>
        {errors.general && (
          <div className="error-message mb-4">{errors.general}</div>
        )}
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
        <div className="flex justify-center">
          <Button onClick={handleSubmit} type="button">
            Login
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
