import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { Loader, ErrorElement } from "./index";

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
            per_hour_rate,
          } = itPark;
          return (
            <Link
              key={id}
              to={`/bookings/${id}`}
              className="w-full bg-yellow-400  shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden"
            >
              <figure className="px-4 pt-4">
                <img
                  src={image_url}
                  alt={name}
                  className="rounded-xl h-64 md:h-48 w-full object-cover"
                />
              </figure>
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold capitalize tracking-wide  text-gray-900 ">
                  {address}
                </h2>
                <p className="text-md font-semibold capitalize tracking-wide  text-gray-900">
                  Total Basements: {basement_total}
                </p>
                <p className="text-md font-semibold  tracking-wide  text-gray-900">
                  ${per_hour_rate} / hr
                </p>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="text-gray-100 flex items-center h-screen  justify-center">
          Service will start soon....
        </div>
      )}
    </div>
  );
};

export default ParksGrid;
