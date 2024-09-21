import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCity, selectComplex } from "../features/bookings/parkingSlice";
import { control } from "../assets";
import { SelectInput, Button } from "./index";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { cities, selectedCity, selectedComplex } = useSelector(
    (state) => state.parking
  );

  const handleCityChange = (e) => {
    const city = e.target.value;
    dispatch(selectCity(city));
  };

  const handleComplexChange = (e) => {
    const complex = e.target.value;
    dispatch(selectComplex(complex));
  };

  const complexes = selectedCity
    ? cities.find((city) => city.name == selectedCity)?.complex || []
    : [];

  const handleReset = () => {
    dispatch(selectCity(""));
    dispatch(selectComplex(""));
  };

  return (
    <div
      className={`bg-gradient-to-r from-teal-400 to-blue-500 p-5 pt-8 rounded-lg  duration-300 ${
        open ? "w-72" : "w-20"
      } transition-all fixed left-1 top-[132px]`}
    >
      <img
        src={control}
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen((prev) => !prev)}
      />
      <div className="flex gap-x-4 items-center">
        <h1
          className={`origin-left font-medium text-xl duration-200 text-gray-900 font-poppins ${
            !open && "scale-0"
          }`}
        >
          Filters
        </h1>
      </div>
      {open ? (
        <div className="pt-6 space-y-4">
          {/** 
          <SearchInput
            name="search"
            value={formData.search}
            onChange={handleChange}
          />
*/}
          <SelectInput
            name="city"
            value={selectedCity || ""}
            options={cities}
            onChange={handleCityChange}
          />
          <SelectInput
            name="complex"
            value={selectedComplex || ""}
            onChange={handleComplexChange}
            options={complexes}
            disabled={!selectedCity}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center mt-8 cursor-pointer">
          {/*<span style={{ fontSize: "30px", marginBottom: "8px" }}>🔍</span>*/}

          <span style={{ fontSize: "30px", marginBottom: "8px" }}>🏙️</span>
          <span style={{ fontSize: "30px", marginBottom: "8px" }}>🏙️</span>
        </div>
      )}
      <Button
      onClick={handleReset}
      className={`mt-4  ${
          open ? "block" : "hidden"
        }`}
      >
        Reset
      </Button>
     
    </div>
  );
};

export default Sidebar;