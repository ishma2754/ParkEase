import { InputField } from "../index";
import { car } from "../../assets";
import styles from "../../style";

const SingleSlot = ({ slot, isSelected, onSelect }) => {
  const isOccupied = slot.status === "Occupied";

  const handleChange = () => {
    if(!isOccupied){
      onSelect(slot)
    }
  }
  return (
    <label className="flex items-center cursor-pointer mb-1">
      <InputField
        type="checkbox"
        className="hidden"
        disabled={isOccupied}
        checked={isSelected}
        onChange={handleChange}
      />
      <div
        className={`${styles.flexCenter} w-20 h-20 border-l-2 border-t-2 border-b-2 border-orange-400 bg-gray-900 relative group transition-colors duration-200 ${
          isOccupied ? "opacity-50" : isSelected ? "bg-yellow-400" : ""
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
