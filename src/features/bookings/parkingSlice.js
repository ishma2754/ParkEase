import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cities: [],
  itParks: [],
  selectedCity: "",
  selectedComplex: "",
  searchQuery: "",
  loading: false,
  error: null,
};

export const fetchParkingData = createAsyncThunk(
  "parkingData/fetchParkingData",
  async () => {
    try {
      const urls = [
        "https://mocki.io/v1/95136396-f884-4c1f-9556-561bf2e8ca2a",
        "https://mocki.io/v1/e04a4c28-68fb-470a-ba1e-9487c46ac862",
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
    selectCity: (state, action) => {
      state.selectedCity = action.payload;
      state.selectedComplex = null;
    },
    selectComplex: (state, action) => {
      state.selectedComplex = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
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

export const { selectCity, selectComplex, setSearchQuery } =
  parkingSlice.actions;
export default parkingSlice.reducer;
