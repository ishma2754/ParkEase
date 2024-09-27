import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singlePark: null,
  userLocation: "",
  selectedPark: null,

  bookingsDetails: {
    date: "",
    basement: "",
    hour: "",
    duration: "",
    timeRange: "",
  },
  selectedSlot: null,
  userDetails: {
    userName: "",
    vehicleNumber: "",
  },
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setSinglePark(state, action) {
      state.singlePark = action.payload;
    },
    setBookingDetails(state, action) {
      const { basement, hour, duration, date } = action.payload;
      const endTime = hour + duration;
      state.bookingsDetails = {
        basement,
        hour,
        duration,
        date,
        timeRange: `${hour < 10 ? "0" : ""}${hour}:00 - ${
          endTime < 10 ? "0" : ""
        }${endTime}:00`,
      };
    },
    setSelectedSlot(state, action) {
      state.selectedSlot = action.payload;
    },
    reSelectedSlot(state) {
      state.selectedSlot = null;
    },
    setUserDetails(state, action) {
      const { userName, vehicleNumber } = action.payload;
      state.userDetails = {
        userName,
        vehicleNumber
      };
    },
    setUserLocation(state, action) {
      state.userLocation = action.payload;
    },

    setSelectedPark(state, action) {
      state.selectedPark = action.payload;
    },
  },
});

export const {
  setSinglePark,
  setBookingDetails,
  setSelectedSlot,
  reSelectedSlot,
  setUserDetails,
  setUserLocation,
  setSelectedPark,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
