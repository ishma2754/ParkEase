import { useState, useEffect } from "react";
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
  const [parkDistances, setParkDistances] = useState({});
  const [parkDuration, setParkDuration] = useState({});

  const { itParks, selectedComplex, priceSort, distanceFilter } = useSelector(
    (state) => state.parking
  );
  const { userLocation } = useSelector((state) => state.bookings);

  // Filter parks based on the user's city
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
    // Fetch directions for each park when parks or user location changes
    if (itParks.length > 0 && userLocation) {
      parksInCity.forEach((park) => {
        fetchDirections(userLocation, park);
      });
    }
  }, [itParks, userLocation]);

  // Function to fetch directions from the user's location to a specific park
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
        // Callback function to handle the response from the Directions Service
        if (status === "OK" && result) {
          const distance = result.routes[0].legs[0].distance; // Extract the distance as object with text and value from the response
          const duration = result.routes[0].legs[0].duration.text; // Extract the duration in text format

          //to showcase distances and duration on each parking card
          setParkDistances((prev) => ({
            ...prev,
            [park.id]: distance, // Associate the distance with the park ID
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
    const distanceData = parkDistances[itPark.id]; // Get distance data for the selected park
    dispatch(setDistance(distanceData));
    dispatch(setDuration(parkDuration[itPark.id]));
  };

  return (
    <div className="p-5 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {sortedParks.length > 0 ? (
        sortedParks.map((itPark) => (
          <ParkCard
            key={itPark.id}
            park={itPark}
            distance={parkDistances[itPark.id]?.text || "Calculating..."}
            duration={parkDuration[itPark.id] || "calculating"}
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
