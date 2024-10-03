import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


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
    const urls = [
      "https://mocki.io/v1/1cb38734-a6b3-48b6-aa32-ffd6a756a64d",
      "https://mocki.io/v1/3f66c31a-49ef-4b4e-b4f5-043d90cdd466",
    ];

    const fetchData = async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error fetching ${url}: ${res.statusText}`);
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
      throw new Error("Data fetch failed: " + error.message);
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
