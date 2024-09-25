import { useDispatch, useSelector } from "react-redux";
import { InputField, Dropdown } from "./index";
import { useState } from "react";
import { setSearchQuery } from "../features/bookings/parkingSlice";
const Search = () => {
  const dispatch = useDispatch();
  const { itParks, searchQuery } = useSelector((state) => state.parking);

  const [filteredParks, setFilteredParks] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));
    filterParks(value);
  };

  const filterParks = (value) => {
    if (value) {
      const searchResults = itParks.filter((park) =>
        park.address.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredParks(searchResults);
    } else {
      setFilteredParks([]);
    }
  };
  return (
    <>
      <InputField
        type="search"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search parks..."
        className="p-1 pl-2 border border-gray-300 rounded-lg text-gray-100 w-[280px] sm:w-[400px] bg-gray-800 focus:outline-none focus:border-transparent font-poppins"
      />
      {filteredParks.length > 0 && <Dropdown options={filteredParks} />}
    </>
  );
};

export default Search;
