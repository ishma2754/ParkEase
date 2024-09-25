import { useLoadScript } from "@react-google-maps/api";
import { Map } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchParkingData } from "../features/bookings/parkingSlice";
import { Loader, ErrorElement } from "../components/index";
const libraries = ["places"];

const MapBookings = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.parking);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    dispatch(fetchParkingData());
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorElement />;
  }
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="flex flex-col h-screen">
      <Map />
    </div>
  );
};

export default MapBookings;
