import { useDispatch, useSelector } from "react-redux";
import {
  setSinglePark,
  setBookingDetails,
  reSelectedSlot,
} from "../features/bookings/bookingsSlice";
import {
  BookingFilters,
  SlotDisplay,
  Loader,
  ErrorElement,
  Carousel,
} from "../components/index";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useCheckAvailability from "../hooks/availability/useCheckAvailability";

const SingleBooking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAvailableSlots, setIsAvailableSlots] = useState(false);
  const { itParks,  error } = useSelector((state) => state.parking);

  const { availableSlots, checkAvailability, allSlotsOccupied } =
    useCheckAvailability();

  const singlePark = itParks.find((park) => park.id === Number(id));

  useEffect(() => {
    if (singlePark) {
      dispatch(setSinglePark(singlePark));
    }
  }, [singlePark]);

  const handleBooking = (basement, hour, duration, date) => {
    if (singlePark) {
      setIsAvailableSlots(true);
      dispatch(reSelectedSlot());
      checkAvailability(
        singlePark.basements,
        singlePark.id,
        basement,
        hour,
        duration,
        date
      );
      dispatch(setBookingDetails({ basement, hour, duration, date }));
      setTimeout(() => {
        setIsAvailableSlots(false);
      }, 2000);
    }
  };

  
  if (error) return <ErrorElement />;
  if (!singlePark)
    return (
      <div className="text-center mt-6">
        <h2 className="text-2xl font-bold text-red-600">Park Not Found</h2>
        <p className="mt-2 text-gray-600">
          We couldn't find a park with that ID. Please check the URL or return
          to the homepage.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-teal-500 text-white px-4 py-2 rounded"
        >
          Go Back to Home
        </button>
      </div>
    );

  const basements = Object.keys(singlePark.basements);

  return (
    <div className="container mb-6">
      <div className="mb-6 mx-auto">
        <Carousel data={singlePark} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <BookingFilters basements={basements} onSubmit={handleBooking} />
        </div>
        <div className="h-full flex justify-center">
          {isAvailableSlots ? (
            <p className="text-orange-500 text-center font-bold font-poppins ">
              Fetching Availability.Please Wait....
            </p>
          ) : (
            <SlotDisplay
              availableSlots={availableSlots}
              data={singlePark}
              allSlotsOccupied={allSlotsOccupied}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBooking;
