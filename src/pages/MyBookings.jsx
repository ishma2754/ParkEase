import { useMap } from "../MapProvider.jsx";
import { useSelector } from "react-redux";
import { BookingsMap } from "../components";

const litresPerKM = 1 / 19;
const petrolCostPerLitre = 100;
const costPerKM = litresPerKM * petrolCostPerLitre;

const MyBookings = () => {
  const { isLoaded } = useMap();

  const { booked } = useSelector((state) => state.booked);

  if (!isLoaded) return <div className="text-gray-200">Loading map...</div>;

  return (
    <div className="p-5 flex flex-col items-center justify-center min-h-screen">
      {booked.length === 0 ? (
        <p className="text-gray-200 font-bold font-poppins text-xl flex justify-center">
          No bookings found.
        </p>
      ) : (
        booked.map((booking, index) => (

          <div
            key={index}
            className="w-full shadow-md shadow-cyan-500/50 hover:shadow-lg hover:shadow-gray-200 transition-shadow duration-300 rounded-lg overflow-hidden mb-4"
          >
            <figure className="relative">
              <BookingsMap
                userLocation={booking.location}
                selectedPark={booking.park}
              />
            </figure>
            <div className="p-4 text-center">
              <h2 className="text-gray-200 font-bold font-poppins tracking-wide mb-2">
                PARK NAME: {booking.park.name}
              </h2>
              <p className="font-poppins text-md font-semibold capitalize tracking-wide text-gray-200">
                TOTAL COST: Rs{" "}
                {booking.park.price_per_hour * booking.details.duration}
              </p>
              <p className="font-poppins text-md font-semibold capitalize tracking-wide text-gray-200">
                Commute Cost: Rs {Math.floor(((booking.distance.value) /1000) * costPerKM)}
              </p>
              <p className="font-poppins text-md font-semibold capitalize tracking-wide text-gray-200">
                Distance: {booking.distance.text || "N/A"}
              </p>
              <p className="font-poppins text-md font-semibold capitalize tracking-wide text-gray-200">
                Duration: {booking.duration || "N/A"}
              </p>
              <p className="text-gray-200 font-poppins">
                {booking.details.date}
              </p>
              <p className="text-gray-200 font-poppins">
                {booking.details.timeRange}
              </p>
              <p className="text-gray-200 font-poppins">
                {booking.details.basement}
              </p>
              <p className="text-gray-200 font-poppins">{booking.slot.spot}</p>
              <p className="text-gray-200 font-poppins">
                USERNAME: {booking.userName}
              </p>
              <p className="text-gray-200 font-poppins">
                VEHICLE NO.: {booking.vehicleNumber}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
