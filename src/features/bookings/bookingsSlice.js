import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singlePark: null,
  userLocation: "",
  leg: "",
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
    setLeg(state, action) {
      state.leg = action.payload;
    },
    clearBookings(state){
      return initialState
    }
  },
});

export const {
  setSinglePark,
  setBookingDetails,
  setSelectedSlot,
  reSelectedSlot,
  setUserLocation,
  setLeg,
  clearBookings
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
