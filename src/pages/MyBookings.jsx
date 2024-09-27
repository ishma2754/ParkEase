import { useMap } from "../MapProvider.jsx";
import { useSelector } from "react-redux";
import { BookingsMap } from "../components";

const MyBookings = () => {
  const { isLoaded } = useMap();
  const { singlePark, bookingsDetails, selectedSlot, userDetails } =
    useSelector((state) => state.bookings);

  if (!isLoaded) return <div className="text-gray-200">Loading map...</div>;

  return (
    <div className="flex flex-col ">
      <div className="flex-1 h-full">
      <BookingsMap />
</div>
      <div>
        <p className="text-gray-200">PARK NAME: {singlePark.name}</p>
        <p className="text-gray-200">
          TOTAL COST: Rs {singlePark.price_per_hour * bookingsDetails.duration}
        </p>
        <p className="text-gray-200">DATE: {bookingsDetails.date}</p>
        <p className="text-gray-200">TIMINGS: {bookingsDetails.timeRange}</p>
        <p className="text-gray-200">BASEMENT: {bookingsDetails.basement}</p>
        <p className="text-gray-200">SPOT: {selectedSlot.spot}</p>
        <p className="text-gray-200">USERNAME: {userDetails.userName}</p>
        <p className="text-gray-200">
          VEHICLE NO.: {userDetails.vehicleNumber}
        </p>
      </div>
    </div>
  );
};

export default MyBookings;
