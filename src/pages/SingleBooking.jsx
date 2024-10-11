import { useDispatch, useSelector } from "react-redux";
import { setSinglePark } from "../features/bookings/bookingsSlice";
import {
  BookingFilters,
  SlotDisplay,
  Carousel,
  ParkNotFound,
} from "../components/index";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const SingleBooking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { itParks } = useSelector((state) => state.parking);

  const singlePark = itParks.find((park) => park.id === Number(id));

  useEffect(() => {
    if (singlePark) {
      dispatch(setSinglePark(singlePark));
    }
  }, [singlePark, dispatch]);

  if (!singlePark) return <ParkNotFound />;

  const basements = Object.keys(singlePark.basements);

  return (
    <div className="container mb-6">
      <div className="mb-6 mx-auto">
        <Carousel data={singlePark}  />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <BookingFilters basements={basements} singlePark={singlePark} />
        </div>
        <div className="h-full flex justify-center">
          <SlotDisplay data={singlePark} />
        </div>
      </div>
    </div>
  );
};

export default SingleBooking;
