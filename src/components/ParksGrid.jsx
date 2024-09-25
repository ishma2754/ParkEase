import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const ParksGrid = () => {
  const { itParks, selectedComplex, searchQuery } = useSelector(
    (state) => state.parking
  );

  const filteredItParks = selectedComplex
    ? itParks.filter((itPark) => itPark.complex == selectedComplex)
    : itParks;

  

  return (
    <div className="p-5 grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
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
              className="w-full shadow-md shadow-cyan-500/50 hover:shadow-lg hover:shadow-gray-200  transition-shadow duration-300 rounded-lg overflow-hidden rounded-br-3xl"
            >
              <figure className="relative">
                <img
                  src={image_url}
                  alt={name}
                  className="h-40 lg:h-55 md:h-48  w-full object-cover"
                />
                <div className="absolute top-1 left-1 bg-gray-800 text-white px-2 py-1 rounded font-semibold font-poppins tracking-wide">
                  Rs {price_per_hour} / hr
                </div>
              </figure>
              <div className="p-4 text-center">
                <h2 className="text-gray-200 font-bold font-poppins tracking-wide mb-2">
                  {address}
                </h2>
                <p className="font-poppins text-md font-semibold capitalize tracking-wide  text-gray-200">
                  Total Basements: {basement_total}
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
