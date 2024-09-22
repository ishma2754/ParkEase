import { InputField } from "../components/index";

const SingleSlot = ({ slot }) => {
  return (
    <label className="flex items-center cursor-pointer mb-1">
      <InputField
        type="checkbox"
        className="hidden"
        disabled={slot.status === "Occupied"}
      />
      <div
        className={`flex items-center justify-center w-20 h-20 border-l-2 border-t-2 border-b-2 border-orange-400 bg-gray-900 relative group transition-colors duration-200 ${
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
  );
};

export default SingleSlot;
