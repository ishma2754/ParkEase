import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  singleParkData: [],
  loading: false,
  error: null,
};

export const fetchSingleParkData = createAsyncThunk(
  "singleParkData/fetchSingleParkData",
  async () => {
    try {
      const singleParkResponse = await axios.get(
        "https://mocki.io/v1/e04a4c28-68fb-470a-ba1e-9487c46ac862"
      );
      const singleParkData = singleParkResponse.data.IT_parks;
      return singleParkData;
    } catch (error) {
      throw new Error("cannot fetch single park data");
    }
  }
);

const singleParkSlice = createSlice({
  name: "singlePark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleParkData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleParkData.fulfilled, (state, action) => {
        state.loading = false;
        state.singleParkData = action.payload;
      })
      .addCase(fetchSingleParkData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default singleParkSlice.reducer;
