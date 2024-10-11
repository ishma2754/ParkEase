import { useDispatch, useSelector } from "react-redux";
import { useMap } from "../MapProvider"; // Custom hook to manage map state
import {
  ParksGrid,
  CityFilter,
  ErrorElement,
  Places,
  LoadingSkeleton,
} from "../components/index";
import { useEffect, useState, useMemo } from "react";
import {
  fetchParkingData,
  resetFilters,
} from "../features/bookings/parkingSlice"; // Redux actions for fetching data and resetting filters
import { setUserLocation } from "../features/bookings/bookingsSlice"; // Redux action for setting location which user selects in places component
import styles from "../style";
import { toast } from "react-toastify";

const Bookings = () => {
  const dispatch = useDispatch();
  const { isLoaded } = useMap(); // Check if the map is loaded
  const [userCity, setUserCity] = useState("Bengaluru");
  const [cityLoading, setCityLoading] = useState(false); // State to manage loading state when changing cities
  const { cities, loading, error } = useSelector((state) => state.parking);

  // Fetch parking data when the component mounts consisting of cities and complexes and it parks from two apis using promise.all
  useEffect(() => {
    dispatch(fetchParkingData());
  }, [dispatch]);

  // Handler for when user selects a new location by using places from google map api
  const handleLocationSelect = (location, city) => {
    setCityLoading(true); // Set loading state to true while the new city is being processed
    dispatch(setUserLocation(location));
    setUserCity(city); // Update the state with the newly selected city
    dispatch(resetFilters()); // Reset any existing  filters in city filters component
    setTimeout(() => {
      setCityLoading(false);
    }, 1000);
    toast.success(`${city} selected successfully`);
  };

  // Check if there are parks available in the selected city
  // Users can select a city using the Places component, which utilizes the Google Places Autocomplete API.
  // When a location is selected, the city is extracted from the address components.
  // The selected city filters available parking options, showing only relevant parks.
  // The hasParksInCity check confirms if parks are available in the selected city.
  const hasParksInCity = useMemo(
    () => userCity && cities.some((city) => city.name === userCity),
    [userCity, cities]
  );

  if (cityLoading || loading || !isLoaded) {
    return <LoadingSkeleton count={6} />;
  }

  if (error) {
    return <ErrorElement />;
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="mx-auto w-full lg:w-1/3">
          <Places setUserLocation={handleLocationSelect} />
          {/* Display an error message if no parks are found in the selected city */}
          {!hasParksInCity && userCity && (
            <p className={`error-message mt-2 ${styles.flexCenter}`}>
              No services in this area
            </p>
          )}
        </div>
        <div>
          <CityFilter userCity={userCity} />
        </div>
        <div className="flex-1">
          <ParksGrid userCity={userCity} />
        </div>
      </div>
    </>
  );
};

export default Bookings;
