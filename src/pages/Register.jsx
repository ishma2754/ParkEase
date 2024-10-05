import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, InputField, Loader } from "../components/index";
import { clearErrors, registerUser } from "../features/authentication/authUserSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "../style";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(clearErrors());
    
    const response = await dispatch(registerUser(formData));
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <Loader />;

  return (
    <div className={`${styles.flexCenter} h-screen bg-gray-950`}>
      <div className="bg-gray-950 p-4 rounded-lg max-w-md booking-card">
        <h2 className="text-2xl text-center text-gray-200 mb-6 text-gradient font-bold font-poppins">
          Register
        </h2>
        {error && <div className="error-message mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="form-label">Name:</label>
            <InputField
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your name"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email:</label>
            <InputField
              type="email"
              name="email"
              id="email" 
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your email"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password:</label>
            <InputField
              type="password"
              name="password"
              id="password" 
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your password"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <div className="flex justify-center">
            <Button type="submit">
              Register
            </Button>
          </div>
        </form>
        
        <p className="text-center mt-4 text-gray-200">
          Already a member?{" "}
          <Link to="/login" className="ml-2 text-blue-500 hover:text-blue-700 font-medium">
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
