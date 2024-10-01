import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectComplex,
  selectPriceSort,
} from "../../features/bookings/parkingSlice";
import { control, flag } from "../../assets";
import { SelectInput, Button } from "../index";

const CityFilter = ({ userCity }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { cities, selectedComplex, priceSort } = useSelector(
    (state) => state.parking
  );

  const handleComplexChange = (e) => {
    const complex = e.target.value;
    dispatch(selectComplex(complex));
  };

  const handlePriceSort = (e) => {
    const price = e.target.value;
    dispatch(selectPriceSort(price));
  };

  const complexes = userCity
    ? cities.find((city) => city.name == userCity)?.complex || []
    : [];

  const handleReset = () => {
    dispatch(selectComplex(""));
    dispatch(selectPriceSort(""));
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
            <div className="text-gray-200 font-bold font-poppins">{userCity} <img src={flag} alt="Flag" className="inline-block ml-2 h-7 w-7" /></div>
            <SelectInput
              name="complex"
              value={selectedComplex || ""}
              onChange={handleComplexChange}
              className="bg-gray-800 text-gray-100 font-medium"
              options={complexes}
              disabled={!userCity}
            />

            <SelectInput
              name="price"
              value={priceSort || ""}
              onChange={handlePriceSort}
              className="bg-gray-800 text-gray-100 font-medium mt-3"
              options={["low", "high"]}
              disabled={!userCity}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col  items-center mt-2 cursor-pointer text-md font-bold text-gray-200">
          <p className="">City</p>
          <p className="">Complex</p>
          <p className="">Price</p>
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

export default CityFilter;
