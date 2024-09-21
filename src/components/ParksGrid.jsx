import { useSelector} from "react-redux";

import { Link } from "react-router-dom";
import styles from "../style";



const ParksGrid = () => {
  const { itParks, selectedComplex } = useSelector(
    (state) => state.parking
  );

  const filteredItParks = selectedComplex
    ? itParks.filter((itPark) => itPark.complex == selectedComplex)
    : itParks;

  return (
    <div className="p-5 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {filteredItParks.length > 0 ? (
        filteredItParks.map((itPark) => {
          const {
            id,
            name,
            image_url,
            address,
            basement_total,
            price_per_hour,
          } = itPark;
          return (
            <Link
              key={id}
              to={`/bookings/${id}`}
              className="w-full bg-gradient-to-r from-teal-400 to-blue-500 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden rounded-br-3xl"
            >
              <figure className="px-4 pt-4">
                <img
                  src={image_url}
                  alt={name}
                  className="rounded-xl h-64 md:h-48 w-full object-cover"
                />
              </figure>
              <div className="p-4 text-center">
                <h2 className="text-gray-900 font-bold font-poppins tracking-wide" >
                  {address}
                </h2>
                <p className="font-poppins text-md font-semibold capitalize tracking-wide  text-gray-900">
                  Total Basements: {basement_total}
                </p>
                <p className="font-poppins text-md font-semibold  tracking-wide  text-gray-900">
                  ${price_per_hour} / hr
                </p>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="text-dimWhite flex items-center h-screen  justify-center">
          Service will start soon....
        </div>
      )}
    </div>
  );
};

export default ParksGrid;