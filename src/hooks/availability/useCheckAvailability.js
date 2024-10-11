import { useSelector, useDispatch } from "react-redux";
import { setAvailableSlots, setAllSlotsOccupied } from "../../features/bookings/bookingsSlice";

/**
 * Custom hook to check the availability of parking slots in a selected basement of a park.
 * This hook manages the state of available slots and provides a method to check availability based on user input.
 */
const useCheckAvailability = () => {
  const dispatch = useDispatch();

  // const [availableSlots, setAvailableSlots] = useState([]);
  // const [allSlotsOccupied, setAllSlotsOccupied] = useState(false);

  // Selector to access booked slots from the Redux store those which are booked by users and shown on my bookings page
  const bookedSlots = useSelector((state) => state.booked.booked);

  const checkAvailability = (
    basements, //An object containing all the basements and their respective spots.
    parkId,
    selectedBasement, //The specific basement chosen by the user for booking
    hour, //The starting hour for the intended booking
    duration,
    date
  ) => {
    // Retrieve the specific parking spots associated with the selected basement
    const spots = basements[selectedBasement].spots;

    // Array to store the availability status of each individual spot
    const statusList = [];

    //track if all spots are occupied, initialized to true
    let isAllOccupied = true;

    // Filter the booked slots to find any that correspond to the selected park and basement of my bookings of users
    const filteredBookedSlots = bookedSlots.filter(
      (booking) =>
        booking.park.id === parkId &&
        booking.details.basement === selectedBasement
    );

    // Iterate through each spot in the selected basement to determine its availability
    Object.keys(spots).forEach((spot) => {
      const availability = spots[spot].availability; //Get availability information for the current spot
      let isAvailable = true;

      // Check availability for the entire duration of the requested booking

      for (let h = 0; h < duration; h++) {
        // This calculates the specific hour to check by adding the loop index (h) to the starting hour of the booking.
        //For instance, if the user wants to book from 2 PM (14:00) for 3 hours,
        // the loop will check hours 14, 15, and 16.
        const hourToCheck = hour + h; // Calculate the hour to check for each segment of the duration
        // Format the hour into a string (e.g., '14:00' for 2 PM)
        const hourString =
          hourToCheck < 10 ? `0${hourToCheck}:00` : `${hourToCheck}:00`;
        //If hourToCheck is 9, it will be formatted as "09:00".

        if (
          availability[hourString] !== undefined &&
          availability[hourString] !== "Available"
        ) {
          isAvailable = false; // Spot is unavailable if any hour in the duration is occupied
          break; // Exit the loop since found that this spot is not available
        }
      }

      // Check if the current spot is already booked for the requested date and time
      const isBooked = filteredBookedSlots.some(
        (booking) =>
          booking.slot.spot === spot &&
          booking.details.date === date &&
          // The hour + duration gives us the end time of the user's requested booking.
          //If the existing booking starts before this end time, it could potentially overlap
          booking.details.hour < hour + duration && // Check if the booking overlaps with the requested time
          //end time of the existing booking.
          //If this end time is after the user's requested start time, it means that there is an overlap.
          booking.details.hour + booking.details.duration > hour
      );

      if (isBooked) {
        isAvailable = false;
      }

      // Add the spot's availability status to the status list
      statusList.push({ spot, status: isAvailable ? "Available" : "Occupied" });
      if (isAvailable) isAllOccupied = false;
    });

    dispatch(setAvailableSlots(statusList)); // Return an object containing the list of available slots
    dispatch(setAllSlotsOccupied(isAllOccupied));
  };

  return { checkAvailability};
};

export default useCheckAvailability;
