import { useDispatch, useSelector } from "react-redux";
import { ParksGrid, Sidebar, Loader, ErrorElement } from "../components/index";
import { useEffect } from "react";
import { fetchParkingData } from "../features/bookings/parkingSlice";

const Bookings = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.parking);
  useEffect(() => {
    dispatch(fetchParkingData());
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorElement />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <ParksGrid />
      </div>
    </div>
  );
};

export default Bookings;
