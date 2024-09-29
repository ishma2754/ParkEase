import { useDispatch } from 'react-redux';
import { setSinglePark, setLeg } from "../../features/bookings/bookingsSlice"

const useFetchDirections = () => {
  const dispatch = useDispatch();

  const fetchDirections = (userLocation, park, setDirections) => {
    if (!userLocation || !park) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: userLocation,
        destination: { lat: park.latitude, lng: park.longitude },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
          dispatch(setSinglePark(park));
          dispatch(setLeg(result.routes[0].legs[0].distance.text));
        }
      }
    );
  };

  return fetchDirections;
};

export default useFetchDirections;
