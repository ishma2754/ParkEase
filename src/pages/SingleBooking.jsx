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
import { useEffect, useState } from "react";
const SingleBooking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleParkData, loading, error } = useSelector(
    (state) => state.singlePark
  );

  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    dispatch(fetchSingleParkData());
  }, []);

  const singlePark = singleParkData.find((park) => park.id === Number(id));

  const handleBooking = (basement, hour, duration) => {
    const spots = singlePark.basements[basement].spots;
    console.log("Selected basement:", basement);
    console.log("Selected hour:", hour);
    console.log("Selected duration:", duration);
    console.log("Available spots:", spots);
    console.log(spots);
    const statusList = [];

    Object.keys(spots).forEach((spot) => {
      const availability = spots[spot].availability;
      console.log(`Checking spot: ${spot}, availability:`, availability);
      let isAvailable = true;
      for (let h = 0; h < duration; h++) {
        const hourToCheck = hour - 1 + duration;
        console.log(`hourToCheck: ${hourToCheck}`);
        const hourString =
          hourToCheck < 10 ? `0${hourToCheck}:00` : `${hourToCheck}:00`;
        console.log(
          `Hour string: ${hourString}, status: ${availability[hourString]}`
        );
        if (
          availability[hourString] !== undefined &&
          availability[hourString] !== "Available"
        ) {
          isAvailable = false;
          break;
        }
      }
      statusList.push({ spot, status: isAvailable ? "Available" : "Occupied" });
    });
    setAvailableSlots(statusList);
    console.log("Final status list:", statusList);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorElement />;
  if (!singlePark) return <div>No park found with this ID.</div>;

  const basements = Object.keys(singlePark.basements)

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

