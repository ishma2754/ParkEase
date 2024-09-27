import { useMap } from "../MapProvider.jsx";
import { useSelector } from "react-redux";
import { BookingsMap } from "../components";

const MyBookings = () => {
  const { isLoaded } = useMap();
  const { singlePark, bookingsDetails, selectedSlot, userDetails, leg } =
    useSelector((state) => state.bookings);

  if (!isLoaded) return <div className="text-gray-200">Loading map...</div>;

  return (
    <div className="p-5">
      <div className="w-full shadow-md shadow-cyan-500/50 hover:shadow-lg hover:shadow-gray-200 transition-shadow duration-300 rounded-lg overflow-hidden">
        <figure className="relative">
          <BookingsMap />
        </figure>
        <div className="p-4 text-center">
          <h2 className="text-gray-200 font-bold font-poppins tracking-wide mb-2">
            PARK NAME: {singlePark.name}
          </h2>
          <p className="font-poppins text-md font-semibold capitalize tracking-wide text-gray-200">
            TOTAL COST: Rs{" "}
            {singlePark.price_per_hour * bookingsDetails.duration}
          </p>
          <p className="font-poppins text-md font-semibold capitalize tracking-wide text-gray-200">
            Distance: {leg.distance.text}
          </p>
          <p className="text-gray-200 font-poppins">{bookingsDetails.date}</p>
          <p className="text-gray-200 font-poppins">
            {bookingsDetails.timeRange}
          </p>
          <p className="text-gray-200 font-poppins">
            {bookingsDetails.basement}
          </p>
          <p className="text-gray-200 font-poppins">{selectedSlot.spot}</p>
          <p className="text-gray-200 font-poppins">
            USERNAME: {userDetails.userName}
          </p>
          <p className="text-gray-200 font-poppins">
            VEHICLE NO.: {userDetails.vehicleNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
