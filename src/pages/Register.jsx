import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, InputField, Loader } from "../components/index"; 
// import { registerUser } from "../features/auth/authSlice"; 
import { useNavigate } from "react-router-dom";
import styles from "../style";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    const isValid = validateForm();
    if (isValid) {
      setIsLoading(true);
      try {
        await dispatch(registerUser(formData)); 
        navigate("/login");
      } catch (error) {
        console.error(error);
        setErrors({ general: "Registration failed. Please try again." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (isLoading) return <Loader />;

  return (
    <div className={`${styles.flexCenter} h-screen bg-gray-950`}>
      <div className="bg-gray-950 p-4 rounded-lg max-w-md booking-card">
        <h2 className="text-2xl text-center text-gray-200 mb-6 text-gradient font-bold font-poppins">Register</h2>
        {errors.general && <div className="error-message mb-4">{errors.general}</div>}
        <div className="mb-4">
          <label className="form-label">Name:</label>
          <InputField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter your name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
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
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        <div className="flex justify-center">
          <Button onClick={handleSubmit} type="button">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
