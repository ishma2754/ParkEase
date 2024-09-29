import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export default function Places({ setUserLocation }) {
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

    const cityComponent = results[0].address_components.find((component) =>
      component.types.includes("locality")
    );
    const city = cityComponent ? cityComponent.long_name : "unknown city";

    setUserLocation({ lat, lng }, city);
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
        className="w-full p-2 font-semibold text-gray-100 rounded  bg-gray-800"
        placeholder="Select your location"
      />
      {isDropdownVisible && status === "OK" && (
        <ul className="absolute z-50 w-full bg-gray-800 scroll-smooth rounded shadow-lg font-poppins max-h-60  overflow-y-auto">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="p-2 cursor-pointer hover:bg-gray-700 hover:text-gray-100 text-gray-200 "
            >
              {description}
            </li>
          ))}
        </ul>
      )}
      {isDropdownVisible && status !== "OK" && (
        <p className="text-gray-200">No results found</p>
      )}
    </div>
  );
}
