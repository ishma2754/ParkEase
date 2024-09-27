import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  const [userName, setUserName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const handleConfirm = () => {
    onConfirm(userName, vehicleNumber);
    setUserName("");
    setVehicleNumber("");
  };

  const handleClose = () => {
    setUserName("");
    setVehicleNumber("");
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-55 z-50">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-lg font-bold mb-4">Booking Details</h2>
        <div className="mb-4">
          <label className="block mb-1">User Name</label>
          <InputField
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border border-gray-200 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Vehicle Number</label>
          <InputField
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className="border border-gray-200 p-2 w-full rounded"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-end">
          <Button onClick={handleClose} className="mb-2 sm:mb-0 sm:mr-2">
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm Booking</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
