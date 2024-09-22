import { useDispatch, useSelector } from "react-redux";
import { fetchSingleParkData } from "../features/bookings/singleParkSlice";
import {
  InformationSection,
  BookingFilters,
  SlotDisplay,
  Loader,
  ErrorElement,
} from "../components/index";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useCheckAvailability from "../hooks/availability/useCheckAvailability";

const SingleBooking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleParkData, loading, error } = useSelector(
    (state) => state.singlePark
  );

  const { availableSlots, checkAvailability } = useCheckAvailability();

  useEffect(() => {
    dispatch(fetchSingleParkData());
  }, []);

  const singlePark = singleParkData.find((park) => park.id === Number(id));

  const handleBooking = (basement, hour, duration) => {
    if (singlePark) {
      checkAvailability(singlePark.basements, basement, hour, duration);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorElement />;
  if (!singlePark) return <div>No park found with this ID.</div>;

  const basements = Object.keys(singlePark.basements);

  return (
    <div className="container mb-6">
      <div className="mb-6">
        <InformationSection data={singlePark} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <BookingFilters basements={basements} onSubmit={handleBooking} />
        </div>
        <div>
          <SlotDisplay availableSlots={availableSlots} />
        </div>
      </div>
    </div>
  );
};

export default SingleBooking;
