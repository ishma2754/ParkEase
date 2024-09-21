import { useState } from "react";
import styles from "../style";
import { Button, SelectInput } from "../components/index";
import { generateHourOptions } from "../utils";

const BookingFilters = ({ onSubmit, basements }) => {
  const [selectedBasement, setSelectedBasement] = useState("Basement 1");
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedDuration, setSelectedDuration] = useState(1);

  const handleSubmit = () => {
    if (selectedBasement && selectedHour && selectedDuration) {
      onSubmit(selectedBasement, selectedHour, selectedDuration);
    }
  };

  const maxDuration = selectedHour === 22 ? 1 : selectedHour === 21 ? 2 : 3;

  const hourOptions = generateHourOptions();

  return (
    <div
      className={`${styles.padding} flex flex-col gap-10 items-center max-w-sm lg:w-full mx-auto p-6 rounded-xl bg-gradient-to-r from-teal-400 to-blue-500 `}
    >
      <div>
        <input
          type="date"
          className={`p-2 rounded-md text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full ${styles.paragraph}`}
        />
      </div>
      <div className="flex text-gray-100">
        {basements.map((basement, index) => (
          <label key={basement} className="flex items-center cursor-pointer">
            <div
              className={`flex items-center justify-center w-24 h-10 border border-gray-100
            ${
              selectedBasement === basement
                ? "bg-gray-900 text-gray-100"
                : "bg-gray-100 text-gray-900"
            } 
            text-center rounded-full transition duration-300 ${
              index > 0 ?  "-ml-4" : ""
            }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={selectedBasement === basement}
                onChange={() => setSelectedBasement(basement)}
              />
              {basement}
            </div>
          </label>
        ))}
      </div>

      <select
        name="Hour"
        value={selectedHour}
        onChange={(e) => setSelectedHour(Number(e.target.value))}
        className="lg:w-full w-1/2 rounded-xl cursor-pointer pl-2"
      >
        <option value="">Select Hour</option>
        {hourOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.option}
          </option>
        ))}
      </select>

      <div
        className={`flex items-center justify-center space-x-6 p-4 rounded-lg shadow-xl ${styles.boxShadow}`}
      >
        <input
          type="number"
          min="1"
          max={maxDuration}
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(Number(e.target.value))}
        />
      </div>

      <p className="text-gray-100">Time</p>
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default BookingFilters;
