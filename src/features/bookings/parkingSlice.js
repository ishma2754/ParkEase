import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cities: [],
  itParks: [],
  selectedComplex: "",
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

/*
export const fetchParkingData = createAsyncThunk(
  "parkingData/fetchParkingData",
  async () => {
    try {
      const citiesResponse = await axios.get(
        "https://3a6d787dc8464cb0b00c0e55dadfcaae.api.mockbin.io/"
      );
      return {
        cities: citiesResponse.data.cities,
      };
    } catch (error) {
      throw new Error("data fetched failed");
    }
  }
);

export const fetchItParkData = createAsyncThunk(
  "parkingData/fetchItParkData",
  async () => {
    try {
      const itParksResponse = await axios.get(
        "https://1b8aa86a3a41412ab3eb8156338a4c15.api.mockbin.io/"
      );
      return {
        itParks: itParksResponse.data.IT_parks,
      };
    } catch (error) {
      throw new Error("data fetched failed");
    }
  }
);
*/

const parkingSlice = createSlice({
  name: "parking",
  initialState,
  reducers: {
    selectComplex: (state, action) => {
      state.selectedComplex = action.payload;
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
    /*
      .addCase(fetchItParkData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItParkData.fulfilled, (state, action) => {
        state.loading = false;
        state.itParks = action.payload.itParks;
      })
      .addCase(fetchItParkData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      */
  },
});

export const {selectComplex} =
  parkingSlice.actions;
export default parkingSlice.reducer;
