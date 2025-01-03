import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  singlePark: null,
  userLocation: { lat: 12.9716, lng: 77.5946 },
  distance: {},
  duration: "",
  isAvailableSlots: false,
  availableSlots: [],
  allSlotsOccupied: false,
  bookingsDetails: {
    date: "",
    basement: "",
    hour: "",
    duration: "",
    timeRange: "",
  },
  selectedSlot: null,
  tempBooking: null,
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setSinglePark: (state, action) => {
      state.singlePark = action.payload;
    },
    setBookingDetails: (state, action) => {
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
      toast.success("Booking Details Submitted");
    },
    setSelectedSlot: (state, action) => {
      state.selectedSlot = action.payload;
      toast.success("You have selected a spot");
    },
    reSelectedSlot: (state) => {
      state.selectedSlot = null;
    },
    toggleAvailableSlots: (state, action) => {
      state.isAvailableSlots = action.payload;
    },
    setAvailableSlots: (state, action) => {
      state.availableSlots = action.payload;
    },
    setAllSlotsOccupied: (state, action) => {
      state.allSlotsOccupied = action.payload;
    },
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setTempBooking: (state, action) => {
      state.tempBooking = action.payload;
    },
    clearBookings: (state) => {
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
  toggleAvailableSlots,
  setAllSlotsOccupied,
  setAvailableSlots,
  setTempBooking,
  clearBookings,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
