import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCity,
  selectComplex,
} from "../features/bookings/parkingSlice";
import { control } from "../assets";
import {  SelectInput } from "./index";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { cities, selectedCity, selectedComplex} = useSelector(
    (state) => state.parking
  );

  /*
  useEffect(() => {
    dispatch(fetchParkingData());
    console.log(cities)
  }, []);
*/
  
  const handleCityChange = (e) => {
    const city = e.target.value;
    dispatch(selectCity(city));
  };

  const handleComplexChange = (e) => {
    const complex = e.target.value;
    dispatch(selectComplex(complex));
  };

  const complexes = selectedCity
    ? cities.find((city) => city.name === selectedCity)?.complexes || []
    : [];

  const handleReset = () => {
    dispatch(selectCity(""));
    dispatch(selectComplex(""));
  };

 
  return (
    <div
      className={`bg-gradient-to-r from-pink-500 to-violet-500 p-5 pt-8 rounded-lg  duration-300 ${
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
          className={`origin-left font-medium text-xl duration-200 text-gradient ${
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
          <select
            name="complex"
            value={selectedComplex || ""}
            onChange={handleComplexChange}
            className="w-full  p-1 border border-gray-300 rounded-lg focus:outline-none"
            disabled={!selectedCity}
          >
            <option>Select Complex</option>
            {complexes.map((complex) => (
              <option key={complex} value={complex}>
                {complex}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-8 cursor-pointer">
          {/*<span style={{ fontSize: "30px", marginBottom: "8px" }}>🔍</span>*/}

          <span style={{ fontSize: "30px", marginBottom: "8px" }}>🏙️</span>
          <span style={{ fontSize: "30px", marginBottom: "8px" }}>🏙️</span>
        </div>
      )}
      <button
        type="button"
        onClick={handleReset}
        className={`bg-black-gradient text-white py-1 font-bold px-4 mt-4 rounded-lg ${
          open ? "block" : "hidden"
        }`}
      >
        Reset
      </button>
    </div>
  );
};

export default Sidebar;
