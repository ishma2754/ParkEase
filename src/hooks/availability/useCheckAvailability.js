import { useState } from "react";
const useCheckAvailability = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [allSlotsOccupied, setAllSlotsOccupied] = useState(false)

  const checkAvailability = (basements, selectedBasement, hour, duration) => {
    const spots = basements[selectedBasement].spots;
    const statusList = [];

    let isAllOccupied = true;

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

      statusList.push({ spot, status: isAvailable ? "Available" : "Occupied" });
      if (isAvailable) isAllOccupied = false;
    });

    setAvailableSlots(statusList);
    setAllSlotsOccupied(isAllOccupied)
  };

  return { availableSlots, checkAvailability, allSlotsOccupied };
};

export default useCheckAvailability;
