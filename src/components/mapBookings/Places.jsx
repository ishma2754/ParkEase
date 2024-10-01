import { useState, useRef, useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {InputField} from "../index"

export default function Places({ setUserLocation }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [focussedIndex, setFocussedIndex] = useState(-1);
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const suggestionRefs = useRef([]);

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();
    setDropdownVisible(false);
    setFocussedIndex(-1);

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);

    const cityComponent = results[0].address_components.find((component) =>
      component.types.includes("locality")
    );
    const city = cityComponent ? cityComponent.long_name : "unknown city";

    setUserLocation({ lat, lng }, city);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setFocussedIndex((prevIndex) => (prevIndex + 1) % data.length);
      e.preventDefault();
    }
    if (e.key === "ArrowUp") {
      setFocussedIndex(
        (prevIndex) => (prevIndex - 1 + data.length) % data.length
      );
      e.preventDefault();
    }
    if (e.key === "Enter") {
      if (focussedIndex >= 0) {
        handleSelect(data[focussedIndex].description);
      }
    }
  };

  useEffect(() => {
    if (focussedIndex >= 0 && suggestionRefs.current[focussedIndex]) {
      suggestionRefs.current[focussedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focussedIndex]);

  return (
    <div className="relative">
      <InputField
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setDropdownVisible(true);
        }}
        disabled={!ready}
        onKeyDown={handleKeyDown}
        className="w-full p-2 font-semibold text-gray-100 rounded  bg-gray-800"
        placeholder="Select your location"
      />
      {isDropdownVisible && status === "OK" && (
        <ul className="absolute z-50 w-full bg-gray-800 scroll-smooth rounded shadow-lg font-poppins max-h-60  overflow-y-auto">
          {data.map(({ place_id, description }, index) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              ref={(el) => (suggestionRefs.current[index] = el)}
              className={`p-2 cursor-pointer hover:text-gray-100 text-gray-200 ${
                index === focussedIndex ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
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
