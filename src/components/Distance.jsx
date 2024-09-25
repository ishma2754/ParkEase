import { Link } from "react-router-dom";

const commutesPerYear = 260 * 2;
const secondsPerDay = 60 * 60 * 24;

export default function Distance({ leg, park }) {
  if (!leg.distance || !leg.duration) return null;

  const days = Math.floor(
    (commutesPerYear * leg.duration.value) / secondsPerDay
  );

  return (
    <div className="flex flex-col p-2 bg-gray-800 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
      <Link
        key={park.id}
        to={`/bookings/${park.id}`}
        className="flex flex-col w-full overflow-hidden rounded-lg"
      >
        <figure className="relative">
          <img
            src={park.image_url}
            alt={park.name}
            className="h-24 md:h-32 w-full object-cover" // Reduced height for mobile
          />
          <div className="absolute top-1 left-1 bg-gray-800 text-white px-2 py-1 rounded font-semibold">
            Rs {park.price_per_hour} / hr
          </div>
        </figure>
        <div className="p-2 text-center">
          <h2 className="text-gray-200 font-bold tracking-wide mb-1">
            {park.address}
          </h2>
          <p className="text-sm font-semibold capitalize text-gray-200 mb-1">
            Total Basements: {park.basement_total}
          </p>
          <p className="text-sm font-bold">
            Distance: {leg.distance.text} | Duration: {leg.duration.text}
          </p>
        </div>
      </Link>
    </div>
  );
}
