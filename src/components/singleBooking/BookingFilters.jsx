import { useState } from "react";
import styles from "../../style";
import { Button, SelectInput } from "../index";
import {
  generateDurationOptions,
  generateHourOptions,
  getDateRange,
} from "../../utils/index";

import InputField from "../InputField";

const BookingFilters = ({ onSubmit, basements }) => {
  const { min, max } = getDateRange();

  const [formData, setFormData] = useState({
    basement: "Basement 1",
    hour: 8,
    duration: 1,
    date: min,
  });

  const handleSubmit = () => {
    onSubmit(
      formData.basement,
      formData.hour,
      formData.duration,
      formData.date
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "hour" || name === "duration" ? Number(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const hourOptions = generateHourOptions();

  return (
    <div
      className={`${styles.padding} flex flex-col gap-4 max-w-lg mx-auto p-6 rounded-xl  shadow-lg`}
    >
      <div>
        <InputField
          type="date"
          name="date"
          value={formData.date}
          min={min}
          max={max}
          onChange={handleChange}
          className={`text-center px-2 py-2 cursor-pointer rounded-xl w-full font-bold text-gray-900`}
        />
      </div>

      <div className={`flex-wrap ${styles.flexCenter}  text-gray-100`}>
        {basements.map((basement) => (
          <label
            key={basement}
            className="flex items-center cursor-pointer mr-2 mb-2"
          >
            <div
              className={`${
                styles.flexCenter
              } w-32 h-10 border border-gray-900 font-poppins
            ${
              formData.basement === basement
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-200 text-gray-900"
            } 
            text-center rounded-full transition duration-300`}
            >
              <input
                type="radio"
                name="basement"
                value={basement}
                className="hidden"
                checked={formData.basement === basement}
                onChange={handleChange}
              />
              {basement}
            </div>
          </label>
        ))}
      </div>

      <select
        name="hour"
        value={formData.hour}
        onChange={handleChange}
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
        name="duration"
        value={formData.duration}
        className="pl-4 text-center py-2 cursor-pointer rounded-xl w-full bg-gray-800 text-gray-100"
        onChange={handleChange}
      />

      <Button type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default BookingFilters;
