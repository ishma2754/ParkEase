import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cities: [],
  itParks: [],
  selectedComplex: "",
  priceSort: "",
  distanceFilter: "",
  loading: false,
  error: null,
};

export const fetchParkingData = createAsyncThunk(
  "parkingData/fetchParkingData",
  async (_, { rejectWithValue }) => {
    const urls = [
      "https://mocki.io/v1/47774adc-934a-4526-ad8b-a9f4d085e083",
      "https://mocki.io/v1/bc7a448a-5db1-445e-bc8c-24f98d799cf7",
    ];

    const fetchData = async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
        return rejectWithValue(`Error fetching ${url}: ${res.statusText}`);
      }
      return res.json();
    };

    try {
      const responses = await Promise.all(urls.map(fetchData));
      return {
        cities: responses[0].cities,
        itParks: responses[1].IT_parks,
      };
    } catch (error) {
      return rejectWithValue("Data fetch failed: " + error.message);
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
    selectDistanceFilter: (state, action) => {
      state.distanceFilter = action.payload;
    },
    resetFilters: (state) => {
      state.selectedComplex = "";
      state.priceSort = "";
      state.distanceFilter = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParkingData.pending, (state) => {
        state.loading = true;
        state.error = null;
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

export const {
  selectComplex,
  selectPriceSort,
  selectDistanceFilter,
  resetFilters,
} = parkingSlice.actions;
export default parkingSlice.reducer;
