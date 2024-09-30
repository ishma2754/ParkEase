import { useMap } from "../MapProvider.jsx";
import { useSelector } from "react-redux";
import { BookingsMap } from "../components";
import styles from "../style.js";

const litresPerKM = 1 / 19;
const petrolCostPerLitre = 100;
const costPerKM = litresPerKM * petrolCostPerLitre;

const MyBookings = () => {
  const { isLoaded } = useMap();

  const { booked } = useSelector((state) => state.booked);

  if (!isLoaded) return <div className="text-gray-200">Loading map...</div>;

  return (
    <div className={`p-5  flex-col ${styles.flexCenter} min-h-screen`}>
      {booked.length === 0 ? (
        <p className={`text-gray-200 font-bold font-poppins text-xl ${styles.flexCenter}`}>
          No bookings found.
        </p>
      ) : (
        booked.map((booking, index) => (
          <div key={index} className="booking-card">
            <figure className="relative">
              <BookingsMap
                userLocation={booking.location}
                selectedPark={booking.park}
              />
            </figure>
            <div className="p-4 text-center text-orange-300 font-poppins tracking-wide mb-2">
              <h2 className="font-bold">{booking.park.name}</h2>
              <p>
                TOTAL COST: Rs{" "}
                {booking.park.price_per_hour * booking.details.duration}
              </p>
              <p>
                Commute Cost: Rs{" "}
                {Math.floor((booking.distance.value / 1000) * costPerKM)}
              </p>
              <p>{booking.distance.text || "N/A"} Far away</p>
              <p>{booking.duration || "N/A"} Far way</p>
              <p>{booking.details.date}</p>
              <p>{booking.details.timeRange}</p>
              <p>{booking.details.basement}</p>
              <p>{booking.slot.spot}</p>
              <p>USERNAME: {booking.userName}</p>
              <p>VEHICLE NO.: {booking.vehicleNumber}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
