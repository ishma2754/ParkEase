import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singlePark: null,
  userLocation: { lat: 12.9716, lng: 77.5946 },
  distance: {},
  duration: "",
  bookingsDetails: {
    date: "",
    basement: "",
    hour: "",
    duration: "",
    timeRange: "",
  },
  selectedSlot: null,
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

    setUserLocation(state, action) {
      state.userLocation = action.payload;
    },
    setDistance(state, action) {
      state.distance = action.payload;
    },
    setDuration(state, action){
      state.duration = action.payload;
    },
    clearBookings(state) {
      return initialState;
    },
  },
});

export const {
  setSinglePark,
  setBookingDetails,
  setSelectedSlot,
  reSelectedSlot,
  setUserLocation,
  setDistance,
  setDuration,
  clearBookings,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
