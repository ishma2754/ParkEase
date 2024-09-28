import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCity, selectComplex } from "../features/bookings/parkingSlice";
import { control } from "../assets";
import { SelectInput, Button } from "./index";

const Sidebar = ({userCity}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { cities, selectedCity, selectedComplex } = useSelector(
    (state) => state.parking
  );

  // const handleCityChange = (e) => {
  //   const city = e.target.value;
  //   dispatch(selectCity(city));
  // };

  const handleComplexChange = (e) => {
    const complex = e.target.value;
    dispatch(selectComplex(complex));
  };

  // const complexes = selectedCity
  //   ? cities.find((city) => city.name == selectedCity)?.complex || []
  //   : [];
  const complexes = userCity
  ? cities.find((city) => city.name == userCity)?.complex || []
  : [];

  const handleReset = () => {
    // dispatch(selectCity(""));
    dispatch(selectComplex(""));
  };

  return (
    <div
      className={`p-5 pt-8 rounded-lg  duration-300 shadow-md shadow-cyan-500/50 bg-gray-900 ${
        open ? "w-72" : "w-20"
      } transition-all fixed left-[10px] top-[165px] lg:top-[166px] z-40`}
    >
      <img
        src={control}
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen((prev) => !prev)}
      />
      <div className="flex">
        <h1 className={`text-lg font-bold duration-200  text-gradient`}>
          Filter
        </h1>
      </div>

      {open ? (
        <>
          <div className="pt-6 space-y-4">
          <div className="text-gray-200">{userCity}</div>
            
            {/* <SelectInput
              name="city"
              value={userCity}
              options={cities}
              //onChange={handleCityChange}
              className="bg-gray-800 text-gray-100 font-medium"
            />  */}
            <SelectInput
              name="complex"
              value={selectedComplex || ""}
              onChange={handleComplexChange}
              className="bg-gray-800 text-gray-100 font-medium"
              options={complexes}
              disabled={!userCity}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col  items-center mt-2 cursor-pointer">
          <p className="text-md font-bold text-gray-200">City</p>
          <p className="text-md font-bold text-gray-200">Complex</p>
        </div>
      )}
      <Button
        onClick={handleReset}
        className={`mt-4  ${open ? "block" : "hidden"}`}
      >
        Reset
      </Button>
    </div>
  );
};

export default Sidebar;
