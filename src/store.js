import { configureStore } from "@reduxjs/toolkit";
import parkingReducer from "./features/bookings/parkingSlice";
import singleParkReducer from "./features/bookings/singleParkSlice";
import bookingsReducer from "./features/bookings/bookingsSlice"

const store = configureStore({
  reducer: {
    parking: parkingReducer,
    singlePark: singleParkReducer,
    bookings: bookingsReducer
  },
});

export default store;
