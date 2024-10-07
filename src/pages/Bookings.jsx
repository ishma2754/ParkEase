import { useDispatch, useSelector } from "react-redux";
import { useMap } from "../MapProvider";
import {
  ParksGrid,
  CityFilter,
  Loader,
  ErrorElement,
  Places,
  Skeleton,
} from "../components/index";
import { useEffect, useState, useMemo } from "react";
import {
  fetchParkingData,
  selectComplex,
} from "../features/bookings/parkingSlice";
import { setUserLocation } from "../features/bookings/bookingsSlice";
import styles from "../style";
import { toast } from "react-toastify";

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
    dispatch(selectComplex(""));
    setTimeout(() => {
      setCityLoading(false);
    }, 1000);
    toast.success(`${city} selected successfully`);
  };

  const hasParksInCity = useMemo(
    () => userCity && cities.some((city) => city.name === userCity),
    [userCity, cities]
  );

  if (cityLoading) {
    return (
      <div className="p-5 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
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
