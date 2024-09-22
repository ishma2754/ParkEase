import { SingleSlot } from "../components/index";
import { useState } from "react";
const SlotDisplay = ({ availableSlots }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
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
            <SingleSlot key={i} slot={slot} isSelected={selectedSlot === slot} onSelect={handleSlotSelect}/>
          ))}
        </div>

        <div className="border-l-2 border-dashed border-white h-auto mx-2"></div>

        <div className="flex flex-col items-center w-1/2">
          {availableSlots.slice(3, 6).map((slot, i) => (
            <SingleSlot key={i + 3} slot={slot} isSelected={selectedSlot === slot} onSelect={handleSlotSelect}/>
          ))}
        </div>
      </div>

      <span className="text-white mt-2">Exit</span>
      <span className="text-white">&#8592;</span>
      {selectedSlot && (
        <div className="text-white mt-2">
          Selected Slot: {selectedSlot.spot} 
        </div>
      )}
    </div>
  );
};

export default SlotDisplay;
