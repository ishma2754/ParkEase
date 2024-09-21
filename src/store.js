import { configureStore } from "@reduxjs/toolkit";
import parkingReducer from "./features/bookings/parkingSlice";
import singleParkReducer from "./features/bookings/singleParkSlice";

const store = configureStore({
  reducer: {
    parking: parkingReducer,
    singlePark: singleParkReducer,
  },
});

export default store;
