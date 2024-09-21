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
        "https://mocki.io/v1/5885dd13-577b-4d4e-880b-dd7a4ecb663b"
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
