import { Link } from "react-router-dom";

const ParkCard = ({
  park,
  distance,
  duration,
  onClick,
  containerClassName,
  imageClassName,
}) => {
  return (
    <Link
      to={`/bookings/${park.id}`}
      className={`${containerClassName}`}
      onClick={onClick}
    >
      <figure className="relative">
        <img src={park.image_url} alt={park.name} className={`${imageClassName}}`} />
        <div className="absolute top-1 left-1 bg-gray-800 text-white px-2 py-1 rounded font-semibold font-poppins tracking-wide">
          Rs {park.price_per_hour} / hr
        </div>

        {onClick && (
          <button className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-md font-semibold transition-colors duration-300 hover:bg-orange-600 z-10">
            Click Here
          </button>
        )}
      </figure>
      <div className="p-2 text-center">
        <h2 className="text-gray-200 font-bold tracking-wide mb-1">
          {park.address}
        </h2>
        <p className="text-sm font-semibold capitalize text-gray-200 mb-1">
          Total Basements: {park.basement_total}
        </p>
        {distance && duration && (
          <p className="text-sm font-bold">
            Distance: {distance.text} | Duration: {duration}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ParkCard;
