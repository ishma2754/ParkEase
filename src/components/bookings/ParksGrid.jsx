import { useSelector, useDispatch } from "react-redux";
import {
  setSinglePark,
  setDistance,
  setDuration,
} from "../../features/bookings/bookingsSlice";
import { ParkCard } from "../index";
import styles from "../../style";


const ParksGrid = ({ userCity }) => {
  const dispatch = useDispatch();
  const { itParks, selectedComplex, priceSort } = useSelector((state) => state.parking);
  const { userLocation } = useSelector((state) => state.bookings);

  const parksInCity = userCity
    ? itParks.filter((itPark) => itPark.city == userCity)
    : itParks;
  const filteredItParks = selectedComplex
    ? parksInCity.filter((itPark) => itPark.complex == selectedComplex)
    : parksInCity;

  const sortedParks = filteredItParks.sort((a, b) => {
    if(priceSort === "low"){
      return a.price_per_hour - b.price_per_hour
    }else if (priceSort === "high"){
      return b.price_per_hour - a.price_per_hour
    }
    return 0
  })

  const fetchDirections = (userLocation, park) => {
    if (!userLocation) return;
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: userLocation,
        destination: { lat: park.latitude, lng: park.longitude },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          dispatch(setSinglePark(park));
          dispatch(setDistance(result.routes[0].legs[0].distance));
          dispatch(setDuration(result.routes[0].legs[0].duration.text));
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  return (
    <div className="p-5 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {sortedParks.length > 0 ? (
        sortedParks.map((itPark) => (
          <ParkCard
            key={itPark.id}
            park={itPark}
            onClick={() => fetchDirections(userLocation, itPark)}
            containerClassName="booking-card rounded-br-3xl"
            imageClassName="h-40 lg:h-55 md:h-48 park-image z-30"
          />
        ))
      ) : (
        <div className={`text-dimWhite  h-screen  ${styles.flexCenter}`}>
          Service will start soon....
        </div>
      )}
    </div>
  );
};

export default ParksGrid;