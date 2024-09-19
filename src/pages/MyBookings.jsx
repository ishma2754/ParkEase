import React from "react";
import { car } from "../assets";

const MyBookings = () => {
  return (
    <>
      <div className="flex flex-col items-center bg-gray-800 p-4 w-1/2 mx-auto">
        <div className="flex flex-col items-center w-full mb-2">
          <div className="flex items-center">
            <div className="flex flex-col items-center mx-4">
              <span className="text-white">Entry</span>
            </div>
            <span className="text-white">&#8594;</span>
          </div>
        </div>

        <div className="flex w-full justify-between">
          <div className="w-1/2 flex flex-col items-center">
            {/* Left Column */}
            {[...Array(6)].map((_, i) => (
              <label key={i} className="flex items-center cursor-pointer mb-4">
                <input type="checkbox" className="hidden" />
                <div className="flex items-center justify-center w-24 h-24 border-l-2 border-t-2 border-b-2 border-yellow-300 bg-gray-900 relative group">
                  <img
                    src={car}
                    alt="Car Icon"
                    className="w-12 h-12  group-hover:opacity-100"
                  />
                  <span className="absolute bottom-2 right-2 text-gray-400 text-sm">{`A${
                    i + 1
                  }`}</span>
                  <div className="absolute inset-0 bg-gray-600 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                </div>
              </label>
            ))}
          </div>

          {/* Dotted Line Separator */}
          <div className="border-l-2 border-dotted border-white mx-2 h-90"></div>

          <div className="w-1/2 flex flex-col items-center">
            {/* Right Column */}
            {[...Array(6)].map((_, i) => (
              <label key={i} className="flex items-center cursor-pointer mb-4">
                <input type="checkbox" className="hidden" />
                <div className="flex items-center justify-center w-24 h-24 border-t-2 border-b-2 border-r-2 border-yellow-300 bg-gray-900 relative group">
                  <img
                    src={car}
                    alt="Car Icon"
                    className="w-12 h-12  group-hover:opacity-100"
                  />
                  <span className="absolute bottom-2 right-2 text-gray-400 text-sm">{`A${
                    i + 7
                  }`}</span>
                  <div className="absolute inset-0 bg-gray-600 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                </div>
              </label>
            ))}
          </div>
        </div>
        <span className="text-white">Exit</span>
        <span className="text-white">&#8592;</span>
      </div>
    </>
  );
};

export default MyBookings;

/** <label class="flex items-center cursor-pointer">
    <input type="checkbox" class="hidden" />
    <div class="flex items-center justify-center w-16 h-16 border-2 border-white bg-black relative">
      <img src="path/to/car-icon.png" alt="Car Icon" class="w-8 h-8" />
      <div class="absolute top-0 left-0 w-full h-full border-t border-white border-l"></div>
      <div class="absolute bottom-0 right-0 w-full h-full border-b border-white border-r"></div>
    </div>
  </label>
   <label class="flex items-center cursor-pointer">
   <input type="checkbox" class="hidden" />
   <div class="flex items-center justify-center w-16 h-16 border-2 border-white bg-black relative">
     <img src="path/to/car-icon.png" alt="Car Icon" class="w-8 h-8" />
     <div class="absolute top-0 left-0 w-full h-full border-t border-white border-l"></div>
     <div class="absolute bottom-0 right-0 w-full h-full border-b border-white border-r"></div>
   </div>
 </label>
 <label class="flex items-center cursor-pointer">
   <input type="checkbox" class="hidden" />
   <div class="flex items-center justify-center w-16 h-16 border-2 border-white bg-black relative">
     <img src="path/to/car-icon.png" alt="Car Icon" class="w-8 h-8" />
     <div class="absolute top-0 left-0 w-full h-full border-t border-white border-l"></div>
     <div class="absolute bottom-0 right-0 w-full h-full border-b border-white border-r"></div>
   </div>
 </label>
 <label class="flex items-center cursor-pointer">
  <input type="checkbox" class="hidden" />
  <div class="flex items-center justify-center w-16 h-16 border-2 border-t border-l border-b  border-white bg-black relative">
    <img src="path/to/car-icon.png" alt="Car Icon" class="w-8 h-8" />
    <div class="absolute inset-0 "></div>
  </div>
</label> */
