import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  booked: [],
};

const bookedSlice = createSlice({
  name: "booked",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.booked.push(action.payload);
      toast.success("Booking Confirmed")
    },
  },
});

export const {addBooking} = bookedSlice.actions;
export default bookedSlice.reducer;
