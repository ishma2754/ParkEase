import { Map } from "../components";
import { useMap } from "../MapProvider";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchParkingData } from "../features/bookings/parkingSlice";
import { Loader, ErrorElement } from "../components/index";

const MapBookings = () => {
  const { isLoaded } = useMap();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.parking);

  useEffect(() => {
    dispatch(fetchParkingData());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorElement />;
  }
  if (!isLoaded) return <Loader />;
  return (
    <div className="flex flex-col h-screen">
      <Map />
    </div>
  );
};

export default MapBookings;
