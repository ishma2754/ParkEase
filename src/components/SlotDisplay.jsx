import { car } from "../assets";

const SlotDisplay = ({ availableSlots }) => {
  const spots = Array.from({ length: 6 }, (_, i) => `A${i + 1}`);

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto p-2 rounded border border-yellow-500 bg-gray-900">
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
            <label key={i} className="flex items-center cursor-pointer mb-1">
              <input
                type="checkbox"
                className="hidden"
                disabled={slot.status === "Occupied"}
              />
              <div
                className={`flex items-center justify-center w-20 h-20 border-l-2 border-t-2 border-b-2 border-orange-400 bg-gray-900 relative group ${
                  slot.status === "Occupied" ? "opacity-50" : "group"
                }`}
              >
                {slot.status === "Occupied" ? (
                  <img
                    src={car}
                    alt="Car Icon"
                    className="w-10 h-10 group-hover:opacity-100"
                  />
                ) : (
                  <div className="text-gray-100">select spot</div>
                )}

                <span className="absolute bottom-1 right-1 text-gray-400 text-sm">
                  {slot.spot}
                </span>
                {slot.status !== "Occupied" && (
                  <div className="absolute inset-0 bg-gray-600 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                )}
              </div>
            </label>
          ))}
        </div>

        <div className="border-l-2 border-dashed border-white h-auto mx-2"></div>

    
        <div className="flex flex-col items-center w-1/2">
          {availableSlots.slice(3, 6).map((slot, i) => (
            <label
              key={i + 3}
              className="flex items-center cursor-pointer mb-1"
            >
              <input
                type="checkbox"
                className="hidden"
                disabled={slot.status === "Occupied"}
              />
              <div
                className={`flex items-center justify-center w-20 h-20 border-r-2 border-t-2 border-b-2 border-orange-400 bg-gray-900 relative group ${
                  slot.status === "Occupied" ? "opacity-50" : "group"
                }`}
              >
                {slot.status === "Occupied" ? (
                  <img
                    src={car}
                    alt="Car Icon"
                    className="w-10 h-10 group-hover:opacity-100"
                  />
                ) : (
                  <div className="text-gray-100">select spot</div>
                )}

                <span className="absolute bottom-1 right-1 text-gray-400 text-sm">
                  {slot.spot}
                </span>
                {slot.status !== "Occupied" && (
                  <div className="absolute inset-0 bg-gray-600 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      <span className="text-white mt-2">Exit</span>
      <span className="text-white">&#8592;</span>
    </div>
  );
};

export default SlotDisplay;
