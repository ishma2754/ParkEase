import { createContext, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";

const MapContext = createContext();
const libraries = ["places"];

const MapProvider = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if(loadError){
    return <div>Error loading map</div>
  }
  return (
    <MapContext.Provider value={{ isLoaded, loadError}}>{children}</MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);

export default MapProvider;
