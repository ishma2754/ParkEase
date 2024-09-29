import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../features/mybookings/bookedSlice";
import { InputField, Button, Loader } from "../components/index";
import { useNavigate } from "react-router-dom";
import { clearBookings } from "../features/bookings/bookingsSlice";

const Confirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const { singlePark, userLocation, distance, duration, bookingsDetails, selectedSlot } =
    useSelector((state) => state.bookings);
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-center text-gray-200 mb-6">
          Confirm Your Booking
        </h2>
        <div className="mb-4">
          <label className="text-gray-200">Username:</label>
          <InputField
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="input-field w-full mt-1"
            placeholder="Enter your username"
          />
          {errors.userName && (
            <div className="text-red-600">{errors.userName}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="text-gray-200">Vehicle Number:</label>
          <InputField
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className="input-field w-full mt-1"
            placeholder="Enter your vehicle number"
          />
          {errors.vehicleNumber && (
            <div className="text-red-600">{errors.vehicleNumber}</div>
          )}
        </div>
        <div className="mb-4 text-gray-200">
          <p>PARK NAME: {singlePark.name}</p>
          <p>TIME RANGE: {bookingsDetails.timeRange}</p>
          <p>DATE: {bookingsDetails.date}</p>
          <p>
            TOTAL COST: Rs{" "}
            {singlePark.price_per_hour * bookingsDetails.duration}
          </p>
        </div>
        <div className="flex justify-between">
          <Button onClick={handleSubmit} type="button">
            Confirm
          </Button>
          <Button onClick={handleCancel} type="button">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
