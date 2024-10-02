import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../features/mybookings/bookedSlice";
import { InputField, Button, Loader } from "../components/index";
import { useNavigate } from "react-router-dom";
import { clearBookings } from "../features/bookings/bookingsSlice";
import { basement } from "../assets";

const Confirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const {
    singlePark,
    userLocation,
    distance,
    duration,
    bookingsDetails,
    selectedSlot,
  } = useSelector((state) => state.bookings);
  const [formData, setFormData] = useState({
    userName: "",
    vehicleNumber: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName) newErrors.userName = "Username is required.";
    if (!formData.vehicleNumber)
      newErrors.vehicleNumber = "Vehicle number is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      const bookingData = {
        park: singlePark,
        slot: selectedSlot,
        details: bookingsDetails,
        location: userLocation,
        distance: distance,
        duration: duration,
        userName: formData.userName,
        vehicleNumber: formData.vehicleNumber,
      };
      dispatch(addBooking(bookingData));
      dispatch(clearBookings());
      navigate("/mybookings");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    dispatch(clearBookings());
    navigate("/");
  };

  if (isLoading) return <Loader />;

  return (
    <div
      className="relative max-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${basement})` }}
    >
      <div className=""></div>
      <div className="flex justify-center max-h-[485px]">
        <div className="bg-gray-950 p-4 rounded-lg shadow-lg w-full max-w-md booking-card border border-gray-200">
          <h2 className="text-2xl text-center text-gray-200 mb-6 text-gradient font-bold font-poppins">
            Confirm Your Booking
          </h2>
          <div className="mb-1">
            <label className="text-gray-200 font-semibold font-poppins">
              Username:
            </label>
            <InputField
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full mt-1 p-2 font-semibold text-gray-100 rounded  bg-gray-800"
              placeholder="Enter your username"
            />
            {errors.userName && (
              <div className="text-red-600">{errors.userName}</div>
            )}
          </div>
          <div className="mb-1">
            <label className="form-label">Vehicle Number:</label>
            <InputField
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your vehicle number"
            />
            {errors.vehicleNumber && (
              <div className="error-message">{errors.vehicleNumber}</div>
            )}
          </div>
          <div className="booking-details">
            <p className="text-gradient">{singlePark.name}</p>
            <p>{bookingsDetails.timeRange}</p>
            <p>{bookingsDetails.date}</p>
            <p>
              Amount: Rs {singlePark.price_per_hour * bookingsDetails.duration}
            </p>
          </div>
          <div className="button-container">
            <Button onClick={handleSubmit} type="button">
              Confirm
            </Button>
            <Button onClick={handleCancel} type="button">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
