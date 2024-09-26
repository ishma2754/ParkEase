import { useCallback, useMemo, useRef, useState } from "react";

import { Distance } from "../components/index";
import {
  GoogleMap,
  Marker,
  Circle,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Places } from "../components/index";
import { useSelector } from "react-redux";
import { flag } from "../assets";

const Map = () => {
  const [office, setOffice] = useState(null);
  const [directions, setDirections] = useState(null);
  const [selectedPark, setSelectedPark] = useState(null);
  const mapRef = useRef();

  const styles = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [
        {
          color: "#202c3e",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [
        {
          gamma: 0.01,
        },
        {
          lightness: 20,
        },
        {
          weight: "1.39",
        },
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [
        {
          weight: "0.96",
        },
        {
          saturation: "9",
        },
        {
          visibility: "on",
        },
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        {
          lightness: 30,
        },
        {
          saturation: "9",
        },
        {
          color: "#29446b",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          saturation: 20,
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          lightness: 20,
        },
        {
          saturation: -20,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          lightness: 10,
        },
        {
          saturation: -30,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#193a55",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          saturation: 25,
        },
        {
          lightness: 25,
        },
        {
          weight: "0.01",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          lightness: -20,
        },
      ],
    },
  ];

  const { itParks } = useSelector((state) => state.parking);

  const center = useMemo(() => ({ lat: 12.9716, lng: 77.5946 }), []);

  const parks = useMemo(() => itParks, [itParks]);

  const options = useMemo(
    () => ({
      styles: styles,
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const fetchDirections = (park) => {
    if (!office) return;
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: office,
        destination: { lat: park.latitude, lng: park.longitude },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
          setSelectedPark(park);
        }
      }
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-full pb-2">
      <div className="w-full md:w-1/5 p-4 bg-[#14161a] text-gray-200 rounded-lg flex flex-col">
        <h1 className="text-xl mt-2">Parking?</h1>
        <p className="text-lg mb-2">Enter your location here</p>

        <Places
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />
        {!office && <p>Enter the address of your location</p>}
        {directions && (
          <div className="flex flex-col md:flex-row mt-4">
            <Distance leg={directions.routes[0].legs[0]} park={selectedPark} />
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
          {office && (
            <>
              <Marker position={office} icon={flag} />
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
              <Circle center={office} radius={15000} options={closeOptions} />
              <Circle center={office} radius={30000} options={middleOptions} />
              <Circle center={office} radius={45000} options={farOptions} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
