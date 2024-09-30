import {useNavigate } from "react-router-dom";
import { ParkCard } from "./index";

export default function DisplayPark({ distance, duration, park }) {
  const navigate = useNavigate()
  if (!distance.text && !duration) return null;

  return (
    <div className="flex flex-col p-4 bg-gray-800 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg border-8 border-orange-600">
      <ParkCard
        park={park}
        distance={distance.text}
        duration={duration}
        showButton={true}
        containerClassName="flex flex-col w-full overflow-hidden rounded-lg relative"
        imageClassName="h-24 md:h-32 park-image"
      />
    </div>
  );
}
