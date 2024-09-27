import { Button, SingleSlot } from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSlot, setUserDetails } from "../features/bookings/bookingsSlice";
import { useState } from "react";
import Modal from "./Modal";

const SlotDisplay = ({ availableSlots, data }) => {
  const dispatch = useDispatch();
  // const [selectedSlot, setSelectedLocalSlot] = useState(null);
  const selectedSlot = useSelector((state) => state.bookings.selectedSlot);
  const duration = useSelector(
    (state) => state.bookings.bookingsDetails.duration
  );
  const [isMOdalOpen, setModalOpen] = useState(false);
  const handleSlotSelect = (slot) => {
    //setSelectedLocalSlot(slot);
    dispatch(setSelectedSlot(slot));
  };

  const handleBooking = (userName, vehicleNumber) => {
    dispatch(setUserDetails({userName, vehicleNumber}))
    setModalOpen(false);
  };
  // const spots = Array.from({ length: 6 }, (_, i) => `A${i + 1}`);
  return (
    <div className="flex flex-col items-center w-full h-full max-w-lg mx-auto py-2 rounded  bg-gray-900">
      <div className="flex flex-col items-center w-full mb-2">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <span className="text-white">Entry</span>
          </div>
          <span className="text-white">&#8594;</span>
        </div>
      </div>

      <div className="flex w-full">
        <div className="flex flex-col items-center w-1/2">
          {availableSlots.slice(0, 3).map((slot, i) => (
            <SingleSlot
              key={i}
              slot={slot}
              isSelected={selectedSlot === slot}
              onSelect={handleSlotSelect}
            />
          ))}
        </div>

        <div className="border-l-2 border-dashed border-white h-auto mx-2"></div>

        <div className="flex flex-col items-center w-1/2">
          {availableSlots.slice(3, 6).map((slot, i) => (
            <SingleSlot
              key={i + 3}
              slot={slot}
              isSelected={selectedSlot === slot}
              onSelect={handleSlotSelect}
            />
          ))}
        </div>
      </div>

      <span className="text-white mt-2">Exit</span>
      <span className="text-white">&#8592;</span>
      {selectedSlot && (
        <>
          <div className="mt-2 font-poppins">
            <span className="text-gray-200"> Selected Slot:</span>
            <span className="text-orange-400"> {selectedSlot.spot}</span>
          </div>
          <div className="mt-2 font-poppins">
            <span className="text-gray-200 mt-2 font-poppins">
              Total Amount:{" "}
            </span>
            <span className="text-orange-400 font-poppins">
              Rs
              {data.price_per_hour && duration
                ? data.price_per_hour * duration
                : 0}
            </span>
          </div>

          <Button onClick={() => setModalOpen(true)} className="mt-2">
            Book Now
          </Button>
        </>
      )}
      <Modal
        isOpen={isMOdalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleBooking}
      />
    </div>
  );
};

export default SlotDisplay;
