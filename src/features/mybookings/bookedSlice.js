import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  booked: [],
};

const bookedSlice = createSlice({
  name: "booked",
  initialState,
  reducers: {
    addBooking(state, action) {
      state.booked.push(action.payload);
    },
  },
});

export const {addBooking} = bookedSlice.actions;
export default bookedSlice.reducer;
