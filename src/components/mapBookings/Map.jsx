import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setUserLocation,
  setSinglePark,
  setDistance,
  setDuration,
} from "../../features/bookings/bookingsSlice";
import {
  GoogleMap,
  Marker,
  Circle,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Places, DisplayPark } from "../index";
import { useSelector } from "react-redux";
import { flag } from "../../assets";
import {
  mapStyles,
  defaultOptions,
  closeOptions,
  middleOptions,
  farOptions,
} from "../../constants";

const Map = () => {
  const dispatch = useDispatch();
  const { userLocation, singlePark, distance, duration } = useSelector(
    (state) => state.bookings
  );

  // This state holds the data returned by the Google Maps Directions API.
  // Initially set to null, it will be updated when a user selects a destination park,
  // allowing to render a route on the map.
  const [directions, setDirections] = useState(null);

  const [userCity, setUserCity] = useState(null);

  // mapRef: This ref holds the instance of the Google Map. By using useRef, can access the map's methods (like panTo) directly
  // without triggering re-renders. This allows for smoother interactions, as  can immediately pan the map to a selected
  // park's location without the use of state updates.
  const mapRef = useRef();

  const { itParks, cities } = useSelector((state) => state.parking);

  // Memoize the center of the map to avoid recalculating center coordinates on every render

  const center = useMemo(() => ({ lat: 12.9716, lng: 77.5946 }), []);

  // Memoize parks data to prevent unnecessary re-renders
  const parks = useMemo(() => itParks, [itParks]);

  const options = useMemo(
    () => ({
      styles: mapStyles,
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  // Callback to store map reference when loaded
  // onLoad: This callback is triggered when the Google Map component has finished loading. 
  // It saves the map instance in mapRef.current, allowing direct access to map methods (like panTo) 
  // without causing re-renders
  const onLoad = useCallback((map) => (mapRef.current = map), []);


  // Function to fetch directions from the user's location to a specific park
  const fetchDirections = (park) => {
    if (!userLocation) return;
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: userLocation,
        destination: { lat: park.latitude, lng: park.longitude },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        // Callback function to handle the response from the Directions Service
        if (status === "OK" && result) {
          setDirections(result); 
          dispatch(setSinglePark(park));
          dispatch(setDistance(result.routes[0].legs[0].distance)); // Extract the distance as object with text and value from the response
          dispatch(setDuration(result.routes[0].legs[0].duration.text));
        }
      }
    );
  };

  const handleLocationSelect = (position, city) => {
    dispatch(setUserLocation(position));
    setUserCity(city);
    mapRef.current?.panTo(position); // Move the map's center to the user's location
  };

  
  // Check if there are parks available in the selected city
  // Users can select a city using the Places component, which utilizes the Google Places Autocomplete API.
  // When a location is selected, the city is extracted from the address components.
  // The selected city filters available parking options, showing only relevant parks.
  // The hasParksInCity check confirms if parks are available in the selected city.
  const hasParksInCity = useMemo(
    () => userCity && cities.some((city) => city.name === userCity),
    [userCity, cities]
  );

  return (
    <div className="flex flex-col md:flex-row h-full mb-4 rounded-lg">
      <div className="w-full md:w-1/5 p-4 bg-[#14161a] text-gray-200 rounded-lg flex flex-col">
        <h1 className="text-xl mt-2 text-gradient">Parking?</h1>
        <p className="text-lg mb-2">
          Enter your location here{" "}
          <img src={flag} alt="Flag" className="inline-block ml-2 h-6 w-6" />
        </p>

        <Places setUserLocation={handleLocationSelect} />
        {!userLocation && <p>Enter the address of your location</p>}
        {!hasParksInCity && userCity && (
          <p className="error-message mt-3">No services in this area</p>
        )}
        {directions && (
          <div className="flex flex-col md:flex-row mt-4">
            <DisplayPark
              distance={distance}
              duration={duration}
              park={singlePark}
            />
          </div>
        )}
      </div>
      <div className="flex-1 h-full">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="w-full h-full rounded-lg"
          options={options}
          onLoad={onLoad}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              key={directions.routes[0].legs[0].duration.value}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}
          {userLocation && (
            <>
              <Marker position={userLocation} icon={flag} />
              {parks.map((park) => (
                <Marker
                  key={park.id}
                  position={{ lat: park.latitude, lng: park.longitude }}
                  onClick={() => {
                    fetchDirections(park);
                  }}
                  label={{
                    text: park.name,
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                />
              ))}
              <Circle
                center={userLocation}
                radius={15000}
                options={closeOptions}
              />
              <Circle
                center={userLocation}
                radius={30000}
                options={middleOptions}
              />
              <Circle
                center={userLocation}
                radius={45000}
                options={farOptions}
              />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
