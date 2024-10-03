import { useState } from "react";
import { useSelector } from "react-redux";
const useCheckAvailability = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [allSlotsOccupied, setAllSlotsOccupied] = useState(false);

  const bookedSlots = useSelector((state) => state.booked.booked);

  const checkAvailability = (
    basements,
    parkId,
    selectedBasement,
    hour,
    duration,
    date
  ) => {
    const spots = basements[selectedBasement].spots;
    const statusList = [];

    let isAllOccupied = true;

    const filteredBookedSlots = bookedSlots.filter(
      (booking) =>
        booking.park.id === parkId &&
        booking.details.basement === selectedBasement
    );

    console.log("Filtered Booked Slots:", filteredBookedSlots);
    Object.keys(spots).forEach((spot) => {
      const availability = spots[spot].availability;
      let isAvailable = true;

      for (let h = 0; h < duration; h++) {
        const hourToCheck = hour + h;
        const hourString =
          hourToCheck < 10 ? `0${hourToCheck}:00` : `${hourToCheck}:00`;

        if (
          availability[hourString] !== undefined &&
          availability[hourString] !== "Available"
        ) {
          isAvailable = false;
          break;
        }
      }

      const isBooked = filteredBookedSlots.some(
        (booking) =>
          booking.slot.spot === spot &&
          booking.details.date === date &&
          booking.details.hour < hour + duration &&
          booking.details.hour + booking.details.duration > hour
      );

      if (isBooked) {
        isAvailable = false;
      }

      statusList.push({ spot, status: isAvailable ? "Available" : "Occupied" });
      if (isAvailable) isAllOccupied = false;
    });

    setAvailableSlots(statusList);
    setAllSlotsOccupied(isAllOccupied);
  };

  return { availableSlots, checkAvailability, allSlotsOccupied };
};

export default useCheckAvailability;
