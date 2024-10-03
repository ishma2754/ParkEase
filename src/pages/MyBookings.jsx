import { useMap } from "../MapProvider.jsx";
import { useSelector } from "react-redux";
import { BookingsMap } from "../components";

const litresPerKM = 1 / 19;
const petrolCostPerLitre = 100;
const costPerKM = litresPerKM * petrolCostPerLitre;

const MyBookings = () => {
  const { isLoaded } = useMap();

  const { booked } = useSelector((state) => state.booked);
  const user = useSelector((state) => state.auth.user);

  if (!isLoaded) return <div className="text-gray-200">Loading map...</div>;

  const userBookings = booked.filter((booking) => booking.userId === user._id);

  return (
    <div className="p-5 flex flex-col items-center min-h-screen bg-gray-950 ">
      {userBookings.length === 0 ? (
        <p className="text-gray-200 font-bold text-xl">No bookings found.</p>
      ) : (
        userBookings.map((booking, index) => (
          <div
            key={index}
            className="bg-gray-950 shadow-md rounded-lg mb-6 p-4 max-w-sm w-full  shadow-cyan-500/50 hover:shadow-lg hover:shadow-gray-200 transition-shadow duration-300 overflow-hidden"
          >
            <div className="flex justify-between text-gray-200 text-md mb-3 font-bold">
              <div className="text-center">
                <p>{booking.distance.text}</p>
              </div>
              <div className="text-center">
                <p>{booking.duration}</p>
              </div>
              <div className="text-center text-gradient">
                <p>{booking.details.date}</p>
              </div>
            </div>

            <figure className="relative">
              <BookingsMap
                userLocation={booking.location}
                selectedPark={booking.park}
              />
            </figure>

            <div className="p-4 text-center text-gray-200">
              <h2 className="font-bold text-lg mb-1 text-gradient">
                {booking.park.name}
              </h2>
              <p className="text-sm text-gray-200 mb-1">
                Timings:{" "}
                <span className="font-bold">{booking.details.timeRange}</span>
              </p>
              <p className="text-sm text-gray-200 mb-1">
                Total Cost: Rs{" "}
                <span className="font-bold">
                  {booking.park.price_per_hour * booking.details.duration}
                </span>
              </p>
              <p className="text-sm text-gray-200 mb-1">
                Commute Cost: Rs{" "}
                <span className="font-bold">
                  {Math.floor((booking.distance.value / 1000) * costPerKM)}
                </span>
              </p>

              <p className="text-sm mb-1">
                Slot: <span className="font-bold">{booking.slot.spot}</span>
              </p>
              <p className="text-sm mb-1">
                Basement:{" "}
                <span className="font-bold">{booking.details.basement}</span>
              </p>
              <p className="text-sm mb-1">
                Name : <span className="font-bold">{booking.userName}</span>
              </p>

              <p className="text-sm mb-1">
                Vehicle number:{" "}
                <span className="font-bold">{booking.vehicleNumber}</span>
              </p>

              <p className="text-sm text-green-600 font-bold mb-2">BOOKED</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
