import { useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

export default function Places({ setOffice }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();
    setDropdownVisible(false);

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setOffice({ lat, lng });
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setDropdownVisible(true);
        }}
        disabled={!ready}
        className="w-full p-2 font-semibold text-gray-900 rounded"
        placeholder="Search office address"
      />
      {isDropdownVisible && status === "OK" && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60  overflow-y-auto">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="p-2 cursor-pointer hover:bg-gray-100 text-gray-900"
            >
              {description}
            </li>
          ))}
        </ul>
      )}
      {isDropdownVisible && status !== "OK" && (
        <p className="text-gray-600">No results found</p>
      )}
    </div>
  );
}
