import { createContext, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";

const MapContext = createContext();
const libraries = ["places"]

const MapProvider = ({ children }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });
  return (
    <MapContext.Provider value={{ isLoaded }}>{children}</MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);

export default MapProvider;
