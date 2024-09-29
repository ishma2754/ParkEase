import { useDispatch, useSelector } from "react-redux";
import { useMap } from "../MapProvider";
import {
  ParksGrid,
  Sidebar,
  Loader,
  ErrorElement,
  Search,
  Places,
  Button,
} from "../components/index";
import { useEffect, useState, useMemo } from "react";
import { fetchParkingData, selectComplex } from "../features/bookings/parkingSlice";
import { setUserLocation} from "../features/bookings/bookingsSlice";

const Bookings = () => {
  const { isLoaded } = useMap();
  const [userCity, setUserCity] = useState("Bengaluru");
  const [cityLoading, setCityLoading] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, cities } = useSelector((state) => state.parking);
  
  useEffect(() => {
    dispatch(fetchParkingData());
  }, []);

  const handleLocationSelect = (location, city) => {
    setCityLoading(true);
    dispatch(setUserLocation(location));
    setUserCity(city);
    dispatch(selectComplex(""))
    setTimeout(() => {
      setCityLoading(false);
    }, 1000);
  };


 
  const hasParksInCity = useMemo(
    () => userCity && cities.some((city) => city.name === userCity),
    [userCity, cities]
  );

  if (loading || cityLoading) {
    return <Loader />;
  }

  if (!isLoaded) {
    return <Loader />;
  }

  if (error) {
    return <ErrorElement />;
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="mx-auto w-full lg:w-1/3">
          <Places setUserLocation={handleLocationSelect} />
          {!hasParksInCity && userCity && (
            <p className="text-red-500">No services in this area</p>
          )}
          {/* <Search/> */}
        </div>
        <div>
          <Sidebar userCity={userCity} />
        </div>
        <div className="flex-1">
          <ParksGrid userCity={userCity}/>
        </div>
      </div>
    </>
  );
};

export default Bookings;
