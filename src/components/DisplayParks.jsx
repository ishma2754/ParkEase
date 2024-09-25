const DisplayParks = ({ park }) => {
    if (!park) return null;
  
    return (
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2">{park.name}</h2>
        <img
          src={park.image_url}
          alt={park.name}
          className="mb-2 rounded h-40 w-full object-cover"
        />
        <p>
          <strong>Complex:</strong> {park.complex}
        </p>
        <p>
          <strong>Price per Hour:</strong> Rs {park.price_per_hour} / hr
        </p>
        <p>
          <strong>Address:</strong> {park.address}
        </p>
        <p>
          <strong>Distance:</strong> {park.distanceText}
        </p>
        <p>
          <strong>Duration:</strong> {park.durationText}
        </p>
      </div>
    );
  };
  
  export default DisplayParks;
  