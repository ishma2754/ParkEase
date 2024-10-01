import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cities: [],
  itParks: [],
  selectedComplex: "",
  priceSort: "",
  loading: false,
  error: null,
};

export const fetchParkingData = createAsyncThunk(
  "parkingData/fetchParkingData",
  async () => {
    try {
      const urls = [
        "https://mocki.io/v1/1cb38734-a6b3-48b6-aa32-ffd6a756a64d",
        "https://mocki.io/v1/3f66c31a-49ef-4b4e-b4f5-043d90cdd466",
      ];

      const [citiesResponse, itParksResponse] = await Promise.all(
        urls.map((url) => axios.get(url))
      );

      return {
        cities: citiesResponse.data.cities,
        itParks: itParksResponse.data.IT_parks,
      };
    } catch (error) {
      throw new Error("data fetched failed");
    }
  }
);

const parkingSlice = createSlice({
  name: "parking",
  initialState,
  reducers: {
    selectComplex: (state, action) => {
      state.selectedComplex = action.payload;
    },
    selectPriceSort: (state, action) => {
      state.priceSort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParkingData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParkingData.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload.cities;
        state.itParks = action.payload.itParks;
      })
      .addCase(fetchParkingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectComplex, selectPriceSort } = parkingSlice.actions;
export default parkingSlice.reducer;
