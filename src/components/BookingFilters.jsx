import { useState } from "react";
import styles from "../style";
import { Button, SelectInput } from "../components/index";
import {
  generateDurationOptions,
  generateHourOptions,
  getDateRange,
} from "../utils/index";
import InputField from "./InputField";

const BookingFilters = ({ onSubmit, basements }) => {
  const { min, max } = getDateRange();
  const [selectedBasement, setSelectedBasement] = useState("Basement 1");
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedDate, setSelectedDate] = useState(min);

  const handleSubmit = () => {
    if (selectedBasement && selectedHour && selectedDuration && selectedDate) {
      onSubmit(selectedBasement, selectedHour, selectedDuration, selectedDate);
    }
  };

  
  
  // const maxDuration = selectedHour === 22 ? 1 : selectedHour === 21 ? 2 : 3;

  const hourOptions = generateHourOptions();

  return (
    <div
      className={`${styles.padding} flex flex-col gap-4 max-w-lg mx-auto p-6 rounded-xl  shadow-lg`}
    >
      <div>
        <InputField
          type="date"
          value={selectedDate}
          min={min}
          max={max}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={`text-center px-2 py-2 cursor-pointer rounded-xl w-full font-bold text-gray-900`}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center text-gray-100">
        {basements.map((basement, index) => (
          <label
            key={basement}
            className="flex items-center cursor-pointer"
            style={{ marginLeft: index > 0 ? "-1rem" : "0" }}
          >
            <div
              className={`flex items-center justify-center w-32 h-10 border border-gray-100
            ${
              selectedBasement === basement
                ? "bg-gray-900 text-teal-400"
                : "bg-gray-800 text-gray-100"
            } 
            text-center rounded-full transition duration-300`}
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
        className="pl-4 text-center py-2 cursor-pointer rounded-xl w-full bg-gray-800 text-gray-100"
      >
        <option value="">Select Time</option>
        {hourOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.option}
          </option>
        ))}
      </select>

      <SelectInput
        options={generateDurationOptions(3)}
        value={selectedDuration}
        className="pl-4 text-center py-2 cursor-pointer rounded-xl w-full bg-gray-800 text-gray-100"
        onChange={(e) => setSelectedDuration(Number(e.target.value))}
      />

      <p className="text-gray-100">Time</p>
      <Button
        type="submit"
        onClick={handleSubmit}
        className="bg-teal-500 hover:bg-teal-600 text-white"
      >
        Submit
      </Button>
    </div>
  );
};

export default BookingFilters;
