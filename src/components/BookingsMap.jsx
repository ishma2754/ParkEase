import { useSelector } from "react-redux";
import { useCallback, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { flag } from "../assets";

const BookingsMap = () => {
  const [directions, setDirections] = useState(null);
  const { selectedPark} = useSelector((state) => state.bookings);
  const userLocation = useSelector((state) => state.bookings.userLocation)

  if (!userLocation || !selectedPark) {
    return <div className="text-gray-200">Loading map...</div>;
  }

  console.log("User Location:", userLocation);
  console.log("Selected Park:", selectedPark);

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
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      styles: styles
    }),
    []
  );

  const center = useMemo(
    () => ({ lat: userLocation.lat, lng: userLocation.lng }),
    []
  );

  const park = useMemo(() => selectedPark, [selectedPark]);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    map.panTo(userLocation);
  }, []);

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
        if (status === "OK" && result) {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  return (
    <div className="flex-1 h-96">
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
            options={{
              polylineOptions: {
                strokeColor: "#1976D2",
                strokeWeight: 5,
              },
            }}
          />
        )}
        {userLocation && (
          <>
            <Marker position={userLocation} icon={flag} />

            <Marker
              key={park.id}
              position={{
                lat: park.latitude,
                lng: park.longitude,
              }}
              onClick={() => fetchDirections(park)}
            />
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export default BookingsMap;
