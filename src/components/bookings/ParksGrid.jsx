import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  setSinglePark,
  setDistance,
  setDuration,
} from "../../features/bookings/bookingsSlice";
import { ParkCard, Skeleton } from "../index";
import styles from "../../style";

const ParksGrid = ({ userCity }) => {
  const dispatch = useDispatch();
  const { itParks, selectedComplex, priceSort, loading, distanceFilter } =
    useSelector((state) => state.parking);
  const { userLocation } = useSelector((state) => state.bookings);

  const [parkDistances, setParkDistances] = useState({});
  const [parkDuration, setParkDuration] = useState({});

  const parksInCity = userCity
    ? itParks.filter((itPark) => itPark.city == userCity)
    : itParks;
  const filteredItParks = selectedComplex
    ? parksInCity.filter((itPark) => itPark.complex == selectedComplex)
    : parksInCity;

  const filteredByDistance = filteredItParks.filter((itPark) => {
    const distanceValue = parkDistances[itPark.id]?.value || 0;
    switch (distanceFilter) {
      case "0-5 km":
        return distanceValue >= 0 && distanceValue <= 5000;
      case "5-10 km":
        return distanceValue > 5000 && distanceValue <= 10000;
      case "> 10 km":
        return distanceValue > 10000;
      default:
        return true;
    }
  });

  const sortedParks = filteredByDistance.sort((a, b) => {
    if (priceSort === "low") {
      return a.price_per_hour - b.price_per_hour;
    } else if (priceSort === "high") {
      return b.price_per_hour - a.price_per_hour;
    }
    return 0;
  });

  useEffect(() => {
    if (itParks.length > 0 && userLocation) {
      parksInCity.forEach((park) => {
        fetchDirections(userLocation, park);
      });
    }
  }, [itParks, userLocation]);

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
          const distance = result.routes[0].legs[0].distance;

          const duration = result.routes[0].legs[0].duration.text;

          setParkDistances((prev) => ({
            ...prev,
            [park.id]: distance,
          }));

          setParkDuration((prev) => ({
            ...prev,
            [park.id]: duration,
          }));
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  const handleParkClick = (itPark) => {
    dispatch(setSinglePark(itPark));
    const distanceData = parkDistances[itPark.id];
    dispatch(setDistance(distanceData));
    dispatch(setDuration(parkDuration[itPark.id]));
  };

  return (
    <div className="p-5 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {loading ? (
        Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} />)
      ) : sortedParks.length > 0 ? (
        sortedParks.map((itPark) => (
          <ParkCard
            key={itPark.id}
            park={itPark}
            distanceData={parkDistances[itPark.id] || "Calculating..."}
            durationText={parkDuration[itPark.id] || "calculating"}
            onClick={() => handleParkClick(itPark)}
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
